import { TrainerIdentityInfoRequestDto, TrainerPersonalInfoRequestDto, TrainerProfessionalInfoRequestDto, TrainerWorkInfoRequestDto } from "../../dtos/trainerApplicationRequest.dto";
import { IUserRepository } from "../../repositories/interface/IUser.repository";
import { ITrainerApplicationService } from "../interface/ITrainerApplication.service";
import { FileService } from "./file.service";
import { Gender, Status, TrainerApplicationStatus } from "../../constants/enums.constant";
import BadRequestError from "../../errors/badRequest.error";
import { HTTP_STATUS } from "../../constants/httpStatus.constant";
import { RESPONSE_MESSAGES } from "../../constants/responseMessages.constant";
import { ITrainerRepository } from "../../repositories/interface/ITrainer.repository";
import { ITrainer, ITrainerKyc, ITrainerIdentityInfo, UploadedFile, ITrainerPersonalInfo, ITrainerProfessionalInfo, ITrainerWorkInfo } from "../../types/trainer.type";
import { ITrainerKycRepository } from "../../repositories/interface/ITrianerKyc.repository";
import { TrainerFullInfoResponseDto, TrainerIdentityInfoResponseDto, TrainerPersonalInfoResponseDto, TrainerProfessionalInfoResponseDto, TrainerWorkInfoResponseDto } from "../../dtos/trainerApplicationResponse.dto";
import { ITrainerApplicationRepository } from "../../repositories/interface/ITrainerApplication.repository";

export class TrainerApplicationService implements ITrainerApplicationService {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _trainerRepository: ITrainerRepository,
    private readonly _trainerKycRepository: ITrainerKycRepository,
    private readonly _fileRepository: FileService,
    private readonly _trainerApplicationRepository: ITrainerApplicationRepository,
  ) {}

  private async _markApplicationCompleted(userId: string) {
    await this._trainerRepository.updateByUserId(userId, {
      applicationStatus: TrainerApplicationStatus.COMPLETED,
      applicationStep: 4
    });
  }

  private _ensureCanSubmitStep(currentStep: number, requiredStep: number, status: TrainerApplicationStatus, message: string) {
    // -----------------------------------------
    // 3️⃣ Onboarding Status Guard
    // Identity can be submitted ONLY when applicationStatus === IN_PROGRESS
    //
    // After submission -> status = COMPLETED
    // After admin review -> status = UNDER_REVIEW | APPROVED | REJECTED
    //
    // So checking "IN_PROGRESS" is better than checking COMPLETED.
    // -----------------------------------------
    if (currentStep !== requiredStep || status !== TrainerApplicationStatus.IN_PROGRESS) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: currentStep > requiredStep ? message : RESPONSE_MESSAGES.COMPLETE_PREVIOUS_STEP,
        logging: false
      });
    }
  }

  async getFullTrainerInfo(userId: string): Promise<TrainerFullInfoResponseDto> {
    const user = await this._userRepository.findById(userId);
    if (!user) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: RESPONSE_MESSAGES.USER_NOT_FOUND,
        logging: false
      });
    }

    const [trainer, trainerKyc] = await Promise.all([this._trainerRepository.findByUserId(userId), this._trainerKycRepository.findByUserId(userId)]);

    let applicationStep = 1;
    let applicationStatus = TrainerApplicationStatus.NOT_STARTED;

    if (trainer) {
      applicationStatus = TrainerApplicationStatus.IN_PROGRESS;

      const application = await this._trainerApplicationRepository.findByTrainerId(trainer._id);

      if (application) {
        applicationStep = application.applicationStep;
        applicationStatus = application.status;
      }
    }

    // A. Personal Info (From User Model)
    const personalInfo: ITrainerPersonalInfo = {
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      gender: user.gender || Gender.MALE,
      age: user.age ?? null,
      phone: user.phone || '',
      profile_photo: user.profile_photo || ''
    };

    // B. Professional & Work Info (From Trainer Model)
    let professionalInfo: ITrainerProfessionalInfo | null = null;
    let workInfo: ITrainerWorkInfo | null = null;

    if (trainer) {
      professionalInfo = {
        specialization: trainer.specialization,
        yearsOfExperience: trainer.yearsOfExperience,
        additionalSkills: trainer.additionalSkills || [],
        certificates: (trainer.certificates || []).map((c) => ({
          title: c.title,
          issuer: c.issuer,
          issuedDate: c.issuedDate,
          fileUrl: c.fileUrl
        })),
        portfolio: trainer.portfolio
      };

      workInfo = {
        pricing: trainer.pricing,
        availability: trainer.availability
      };
    }

    const identityInfo: ITrainerIdentityInfo | null = trainerKyc
      ? {
          documentType: trainerKyc.documentType,
          frontImage: trainerKyc.frontImageUrl,
          backImage: trainerKyc.backImageUrl ?? null
        }
      : null;

    return {
      message: RESPONSE_MESSAGES.TRAINER_INFO_FETCHED_SUCCESS,
      data: {
        personalInfo,
        professionalInfo,
        workInfo,
        identityInfo,
        applicationStep,
        applicationStatus,
      }
    };
  }

  async submitPersonalInfo(
    userId: string, 
    payload: TrainerPersonalInfoRequestDto, 
    profilePhoto?: UploadedFile
  ): Promise<TrainerPersonalInfoResponseDto> {
    const user = await this._userRepository.findById(userId);
    if (!user)
      throw new BadRequestError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: RESPONSE_MESSAGES.USER_NOT_FOUND,
        logging: false
      });

    let finalPhotoUrl = user.profile_photo;

    if (profilePhoto) {
      finalPhotoUrl = await this._fileRepository.uploadUserProfilePhoto(userId, profilePhoto);
    }

    if (!finalPhotoUrl) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.PROFILE_PHOTO_REQUIRED,
        logging: false
      });
    }

    const updateUserPayload: Partial<ITrainerPersonalInfo> = {};
    const { first_name, last_name, gender, phone } = payload;
    const age = Number(payload.age);

    if (first_name && first_name !== user.first_name) updateUserPayload.first_name = first_name;
    if (last_name && last_name !== user.last_name) updateUserPayload.last_name = last_name;
    if (gender && gender !== user.gender) updateUserPayload.gender = gender;
    if (age && age !== user.age) updateUserPayload.age = age;
    if (phone && phone !== user.phone) updateUserPayload.phone = phone;
    if (finalPhotoUrl !== user.profile_photo) updateUserPayload.profile_photo = finalPhotoUrl;

    let updatedUser = user;
    if (Object.keys(updateUserPayload).length > 0) {
      const updated = await this._userRepository.findByIdAndUpdate(userId, updateUserPayload, { new: true });

      if (!updated) {
        throw new BadRequestError({
          statusCode: 404,
          message: RESPONSE_MESSAGES.TRAINER_NOT_FOUND_AFTER_UPDATE,
          logging: false
        });
      }

      updatedUser = updated;
    }

    let trainer = await this._trainerRepository.findByUserId(userId);

    if (!trainer) {
      trainer = await this._trainerRepository.create({
        userId,
        specialization: [],
        yearsOfExperience: 0,
        portfolio: { bio: '', achievements: [], socialLinks: {} },
        additionalSkills: [],
        certificates: []
      } as unknown as ITrainer);
    }

    const NEXT_STEP = 2;

    await this._trainerApplicationRepository.ensureApplicationExists(trainer._id, NEXT_STEP);

    return {
      message: RESPONSE_MESSAGES.TRAINER_PERSONAL_INFO_SUBMITTED,
      data: {
        first_name: updatedUser.first_name || '',
        last_name: updatedUser.last_name || '',
        gender: updatedUser.gender || Gender.MALE,
        age: updatedUser.age ?? 0,
        phone: updatedUser.phone || '',
        profile_photo: updatedUser.profile_photo || ''
      }
    };
  }

  async submitProfessionalInfo(
    userId: string, 
    payload: TrainerProfessionalInfoRequestDto, 
    certificateFiles?: UploadedFile[]
  ): Promise<TrainerProfessionalInfoResponseDto> {
    const user = await this._userRepository.findById(userId);
    if (!user) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: RESPONSE_MESSAGES.USER_NOT_FOUND,
        logging: false
      });
    }

    let trainer = await this._trainerRepository.findByUserId(userId);

    if (!trainer) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.TRAINER_PROFILE_NOT_INITIALIZED,
        logging: false
      });
    }

    const application = await this._trainerApplicationRepository.findByTrainerId(trainer._id);
    if (!application) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.APPLICATION_NOT_STARTED,
        logging: false
      });
    }
    
    const EXPECTED_STEP = 2;

    this._ensureCanSubmitStep(application.applicationStep, EXPECTED_STEP, application.status, RESPONSE_MESSAGES.PROFESSIONAL_INFO_ALREADY_SUBMITTED);

    let uploadedCertificateUrls: string[] = [];

    if (certificateFiles && certificateFiles.length > 0) {
      uploadedCertificateUrls = await this._fileRepository.uploadTrainerCertificates(trainer._id.toString(), certificateFiles);
    }

    const { specialization, yearsOfExperience, portfolio, additionalSkills, certificates } = payload;

    const updatedCertificates =
      certificates?.map((cert, i) => ({
        ...cert,
        fileUrl: uploadedCertificateUrls[i] ?? null
      })) ?? [];

    const updatePayload: ITrainerProfessionalInfo = {
      specialization,
      yearsOfExperience: Number(yearsOfExperience),
      additionalSkills,
      certificates: updatedCertificates,
      portfolio: {
        bio: portfolio.bio,
        achievements: portfolio.achievements ?? [],
        socialLinks: portfolio.socialLinks ?? {}
      },
    };

    const updatedTrainer = await this._trainerRepository.findByIdAndUpdate(trainer._id, updatePayload, { new: true });

    if (!updatedTrainer) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: RESPONSE_MESSAGES.TRAINER_NOT_FOUND_AFTER_UPDATE,
        logging: false
      });
    }

    const NEXT_STEP = 3;
    await this._trainerApplicationRepository.updateStep(trainer._id.toString(), NEXT_STEP);

    return {
      message: RESPONSE_MESSAGES.TRAINER_PROFESSIONAL_INFO_SUBMITTED,
      data: {
        specialization: updatedTrainer.specialization,
        yearsOfExperience: updatedTrainer.yearsOfExperience,
        additionalSkills: updatedTrainer.additionalSkills,
        certificates: updatedTrainer.certificates,
        portfolio: updatedTrainer.portfolio
      }
    };
  }

  async submitWorkInfo(
    userId: string, 
    payload: TrainerWorkInfoRequestDto
  ): Promise<TrainerWorkInfoResponseDto> {
    const user = await this._userRepository.findById(userId);
    if (!user) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: RESPONSE_MESSAGES.USER_NOT_FOUND,
        logging: false
      });
    }

    let trainer = await this._trainerRepository.findByUserId(userId);

    if (!trainer) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.TRAINER_PROFILE_NOT_INITIALIZED,
        logging: false
      });
    }

    const application = await this._trainerApplicationRepository.findByTrainerId(trainer._id);

    if (!application) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.APPLICATION_NOT_STARTED,
        logging: false
      });
    }

    const EXPECTED_STEP = 3;

    this._ensureCanSubmitStep(application.applicationStep, EXPECTED_STEP, application.status, RESPONSE_MESSAGES.WORK_INFO_ALREADY_SUBMITTED);

    const { oneToOnePrice, groupSessionPrice, availability } = payload;

    const updatePayload: ITrainerWorkInfo = {
      pricing: {
        oneToOne: oneToOnePrice,
        groupSession: groupSessionPrice
      },
      availability: availability
    };

    const updatedTrainer = await this._trainerRepository.findByIdAndUpdate(trainer._id.toString(), updatePayload, { new: true });

    if (!updatedTrainer) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: RESPONSE_MESSAGES.TRAINER_NOT_FOUND_AFTER_UPDATE,
        logging: false
      });
    }

    const NEXT_STEP = 4;
    await this._trainerApplicationRepository.updateStep(trainer._id, NEXT_STEP);

    return {
      message: RESPONSE_MESSAGES.TRAINER_WORK_INFO_SUBMITTED,
      data: {
        pricing: updatedTrainer.pricing,
        availability: updatedTrainer.availability
      }
    };
  }

  async submitIdentityInfo(
    userId: string, 
    payload: TrainerIdentityInfoRequestDto, 
    frontImage: UploadedFile, 
    backImage?: UploadedFile): Promise<TrainerIdentityInfoResponseDto> {
    const user = await this._userRepository.findById(userId);
    if (!user) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: RESPONSE_MESSAGES.USER_NOT_FOUND,
        logging: false
      });
    }

    const trainer = await this._trainerRepository.findByUserId(userId);
    if (!trainer) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.TRAINER_PROFILE_NOT_INITIALIZED,
        logging: false
      });
    }

    const application = await this._trainerApplicationRepository.findByTrainerId(trainer._id);
    if (!application) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.APPLICATION_NOT_STARTED,
        logging: false
      });
    }

    const EXPECTED_STEP = 4;
    this._ensureCanSubmitStep(application.applicationStep, EXPECTED_STEP, application.status, RESPONSE_MESSAGES.IDENTITY_INFO_ALREADY_SUBMITTED);

    const { documentType } = payload;

    if (!frontImage) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.FRONT_IMAGE_REQUIRED,
        logging: false
      });
    }

    if (documentType !== 'pan_card' && !backImage) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.BACK_IMAGE_REQUIRED_FOR_SELECTED_DOC,
        logging: false
      });
    }

    const frontUrl = await this._fileRepository.uploadTrainerDocument(userId, frontImage);

    let backUrl: string | null = null;
    if (backImage) {
      backUrl = await this._fileRepository.uploadTrainerDocument(userId, backImage);
    }


    const kycRecord = await this._trainerKycRepository.findByUserId(userId);
    let savedKycRecord: ITrainerKyc | null;

    const kycData = {
      userId,
      documentType,
      frontImageUrl: frontUrl,
      backImageUrl: backUrl,
      status: Status.PENDING, // Internal document verification status
      rejectionReason: null
    };

    if (!kycRecord) {
      savedKycRecord = await this._trainerKycRepository.create(kycData as unknown as ITrainerKyc);
    } else {
      savedKycRecord = await this._trainerKycRepository.updateByUserId(userId, kycData);
    }

    if (!savedKycRecord) {
      throw new BadRequestError({
        statusCode: 404,
        message: RESPONSE_MESSAGES.TRAINER_KYC_NOT_FOUND_AFTER_UPDATE,
        logging: false
      });
    }

    await this._trainerApplicationRepository.submitApplication(trainer._id);

    return {
      message: RESPONSE_MESSAGES.TRAINER_IDENTITY_VERIFICATION_SUBMITTED,
      data: {
        documentType: savedKycRecord.documentType,
        frontImage: savedKycRecord.frontImageUrl,
        backImage: savedKycRecord?.backImageUrl
      }
    };
  }
}