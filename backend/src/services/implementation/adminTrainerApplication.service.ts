import { IAdminTrainerApplicationService } from '../interface/IAdminTrainerApplication.service';
import { ITrainerApplicationRepository } from '../../repositories/interface/ITrainerApplication.repository';
import { GetApplicationsFilterDto, PaginatedApplicationResponseDto, TrainerApplicationListItemDto } from '../../dtos/getTrainerApplications.dto';
import { ITrainerRepository } from '../../repositories/interface/ITrainer.repository';
import { IUserRepository } from '../../repositories/interface/IUser.repository';
import { ITrainerKycRepository } from '../../repositories/interface/ITrianerKyc.repository';
import BadRequestError from '../../errors/badRequest.error';
import { HTTP_STATUS } from '../../constants/httpStatus.constant';
import { ITrainerApplicationDetailsResponse } from '../../dtos/trainerVerification.dto';
import { DocumentType, Gender, TrainerApplicationStatus, UserRole } from '../../constants/enums.constant';
import mongoose, { ClientSession, ObjectId } from 'mongoose';
import { IRejectionPayload } from '../../dtos/adminTrainerApplicationRejection.dto';

export class AdminTrainerApplicationService implements IAdminTrainerApplicationService {
  constructor(
    private readonly _trainerApplicationRepository: ITrainerApplicationRepository,
    private readonly _trainerRepository: ITrainerRepository,
    private readonly _userRepository: IUserRepository,
    private readonly _trainerKycRepository: ITrainerKycRepository,
  ) {}

  /**
   * Fetches paginated, sorted, and filtered trainer applications.
   * Logic: Handles input sanitization and DTO mapping.
   */
  async listApplications(filters: GetApplicationsFilterDto): Promise<PaginatedApplicationResponseDto> {
    const page = Math.max(filters.page || 1, 1);
    const limit = Math.max(filters.limit || 10, 1);
    const search = filters.search?.trim() || '';

    // 2. Call Repository (The heavy lifting happens here)
    const result = await this._trainerApplicationRepository.findWithAggregation({
      page,
      limit,
      search,
      status: filters.status,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
    });

    return {
      data: result.data,
      meta: {
        total: result.total,
        page,
        limit,
        totalPages: Math.ceil(result.total / limit)
      }
    };
  }

  async getTrainerApplicationDetails(applicationId: string): Promise<ITrainerApplicationDetailsResponse> {
    // 1. Fetch Application first (Primary Entry Point)
    const application = await this._trainerApplicationRepository.findById(applicationId);
    if (!application) {
      throw new BadRequestError({ 
        statusCode:HTTP_STATUS.NOT_FOUND, 
        message: 'Trainer Application not found', 
        logging: false 
      });
    }

    // 2. Fetch Trainer Data (We need userId from here)
    const trainer = await this._trainerRepository.findById(application.trainerId);
    if (!trainer) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: 'Linked Trainer profile not found',
        logging: false
      });
    }

    const userId = trainer.userId;

    // 3. Parallel Fetching: Get User Info and KYC Info simultaneously
    // This is faster than awaiting them sequentially
    const [user, kyc] = await Promise.all([
      this._userRepository.findById(userId),
      this._trainerKycRepository.findOne({ userId: userId }) 
    ]);

    if (!user) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: 'Linked User account not found',
        logging: false
      });
    }

    // 4. Data Aggregation & Mapping
    // We map DB entities to our Clean Frontend DTO
    
    const response: ITrainerApplicationDetailsResponse = {
      applicationId: application._id.toString(),
      status: application.status,
      submissionDate: application.submissionDate || null,

      // --- 1. Personal Info (From User Collection) ---
      personal: {
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email,
        gender: user.gender || Gender.MALE,
        age: user.age || 0,
        phone: user.phone || '',
        profile_photo: user.profile_photo || ''
      },

      // --- 2. Professional Info (From Trainer Collection) ---
      professional: {
        specialization: trainer.specialization,
        yearsOfExperience: trainer.yearsOfExperience,
        additionalSkills: trainer.additionalSkills,
        certificates: trainer.certificates.map((cert) => ({
          title: cert.title || '',
          issuer: cert.issuer || '',
          issuedDate: cert.issuedDate || null,
          fileUrl: cert.fileUrl || ''
        })),
        portfolio: {
          bio: trainer.portfolio.bio,
          achievements: trainer.portfolio.achievements,
          socialLinks: {
            instagram: trainer.portfolio.socialLinks?.instagram || null,
            linkedin: trainer.portfolio.socialLinks?.linkedin || null,
            website: trainer.portfolio.socialLinks?.website || null,
            youtube: trainer.portfolio.socialLinks?.youtube || null
          }
        }
      },

      // --- 3. Work Info (From Trainer Collection) ---
      work: {
        pricing: {
          oneToOne: trainer.pricing.oneToOne,
          groupSession: trainer.pricing.groupSession
        },
        availability: trainer.availability.map((slot) => ({
          day: slot.day,
          startTime: slot.startTime,
          endTime: slot.endTime
        }))
      },

      // --- 4. Identity Info (From TrainerKYC Collection) ---
      identity: {
        isKycSubmitted: !!kyc, // Boolean flag if KYC exists
        documentType: kyc?.documentType || DocumentType.AADHAAR,
        frontImage: kyc?.frontImageUrl || '',
        backImage: kyc?.backImageUrl || null
      }
    };

    return response;
  }

  /**
   * Approves a trainer application and promotes the user.
   * Performs an Atomic Transaction.
   * * @param applicationId - The ID of the application to approve
   * @param adminId - The ID of the admin performing the action (reviewer)
   */
  async approveApplication(applicationId: string, adminId: string): Promise<undefined> {
    // Start a Session for Atomicity
    const session: ClientSession = await mongoose.startSession();
    session.startTransaction();

    try {
      // Fetch Application & Validation (Read operations don't strictly need the session lock yet, but good for consistency)
      const application = await this._trainerApplicationRepository.findById(applicationId);
      
      if (!application) {
        throw new BadRequestError({
          statusCode: HTTP_STATUS.NOT_FOUND,
          message: 'Trainer Application not found',
          logging: false
        });
      }

      // Business Rule: Prevent double approval
      if (application.status === TrainerApplicationStatus.APPROVED) {
        throw new BadRequestError({
          statusCode: HTTP_STATUS.CONFLICT,
          message: 'Application is already approved',
          logging: false,
        });
      }

      // Resolve Relationships
      // The Application stores the TrainerID, we need to find the Trainer to get the UserID
      const trainerId = application.trainerId;

      const trainer = await this._trainerRepository.findById(trainerId);
      if (!trainer) {
        throw new BadRequestError({
          statusCode: HTTP_STATUS.NOT_FOUND,
          message: 'Associated Trainer profile data missing',
          logging: false,
        });
      }

      const userId = trainer.userId;

      // --- ATOMIC UPDATES START HERE ---

      // Update Application Status
      await this._trainerApplicationRepository.updateStatus(
        applicationId, 
        TrainerApplicationStatus.APPROVED, 
        adminId, 
        session
      );

      // Promote User Role
      const updatedUser = await this._userRepository.updateRole(
        userId, 
        UserRole.TRAINER, 
        session
      );

      if (!updatedUser) {
        throw new BadRequestError({
          statusCode: HTTP_STATUS.NOT_FOUND,
          message: 'Associated User not found for promotion',
          logging: false,
        });
      }

      // Commit Transaction
      await session.commitTransaction();
      
      // Log success (or send email notification here, outside the transaction)
      console.info(`Trainer Application ${applicationId} approved by Admin ${adminId}`);

    } catch (error) {
      // Rollback on Error
      // If ANY step above failed, the database reverts to its state before we started
      await session.abortTransaction();
      console.error("Transaction aborted:", error);
      throw error; // Re-throw to controller
    } finally {
      session.endSession();
    }
  }

  /**
   * Rejects a trainer application with feedback.
   * Uses Atomic Transaction.
   * * @param applicationId - The ID of the application
   * @param rejectionData - The feedback payload from frontend
   * @param adminId - The reviewer ID
   */
  async rejectApplication(
    applicationId: string, 
    rejectionData: IRejectionPayload, 
    adminId: string
  ): Promise<void> {
    const session: ClientSession = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1. Fetch Application & Validate
      const application = await this._trainerApplicationRepository.findById(applicationId);
      
      if (!application) {
        throw new BadRequestError({
          statusCode: HTTP_STATUS.NOT_FOUND,
          message: 'Trainer Application not found',
          logging: false,
        });
      }

      if (application.status === TrainerApplicationStatus.REJECTED) {
        throw new BadRequestError({
          statusCode: HTTP_STATUS.CONFLICT,
          message: 'Application is already rejected',
          logging: false
        });
      }
      if (application.status === TrainerApplicationStatus.APPROVED) {
        throw new BadRequestError({
          statusCode: HTTP_STATUS.CONFLICT,
          message: 'Cannot reject an already approved application',
          logging: false
        });
      }

      // 3. Prepare Rejection Details
      const rejectionDetails = {
        code: rejectionData.code || "DATA_INVALID",
        reasonTemplate: rejectionData.reasonTemplate || "Verification Failed",
        adminFeedback: rejectionData.adminFeedback,
        failedSections: rejectionData.failedSections
      };

      // --- ATOMIC UPDATES ---

      // Update Application (Status + Feedback)
      await this._trainerApplicationRepository.rejectApplication(
        applicationId,
        rejectionDetails,
        adminId,
        session
      );

      // 6. Commit Transaction
      await session.commitTransaction();
      
      console.info(`Trainer Application ${applicationId} rejected by Admin ${adminId}`);

    } catch (error) {
      await session.abortTransaction();
      console.error("Rejection Transaction aborted:", error);
      throw error;
    } finally {
      session.endSession();
    }
  }
}
