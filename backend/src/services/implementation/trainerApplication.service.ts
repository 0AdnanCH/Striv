import { TrainerKycDto, TrainerRegistrationStep1Dto, TrainerWorkInfoDto } from "../../dtos/trainerApplication.dto";
import { IUserRepository } from "../../repositories/interface/IUser.repository";
import { ITrainerApplicationService } from "../interface/ITrainerApplication.service";
import { FileService } from "./file.service";
import { UserRole } from "../../constants/roles.constants";
import BadRequestError from "../../errors/badRequest.error";
import { HTTP_STATUS } from "../../constants/httpStatus.constants";
import { RESPONSE_MESSAGES } from "../../constants/responseMessages.constants";
import { IUser } from "../../types/user.type";
import { ITrainerRepository } from "../../repositories/interface/ITrainer.repository";
import { TrainerProfessionalInfoDto } from "../../schemas/trainerProfessionalInfo.schema";
import { ITrainer, ITrainerKyc, PersonalInfoResponse, ProfessionalInfoResponse, ResponseIdentityInfo, ResponsePersonalInfo, ResponseProfessionalInfo, TrainerFullInfo, TrainerKycResponse, WorkInfoResponse } from "../../types/trainer.type";
import { ITrainerKycRepository } from "../../repositories/interface/ITrainerKyc.repository";

export class TrainerApplicationService implements ITrainerApplicationService {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _trainerRepository: ITrainerRepository,
    private readonly _trainerKycRepository: ITrainerKycRepository,
    private readonly _fileRepository: FileService,
  ) {}

  async getFullTrainerInfo(
    userId: string
  ): Promise<TrainerFullInfo> {
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
      return {
        trainer: null,
        kyc: null,
      }
    }

    const kyc = await this._trainerKycRepository.findByUserId(userId);

    const personalInfo: ResponsePersonalInfo = {
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      gender: user.gender,
      age: user.age,
      phone: user.phone || '',
      profile_photo: user.profile_photo || ''
    };

    const professionalInfo: ResponseProfessionalInfo = {
      specialization: trainer.specialization,
      additionalSkills: trainer.additionalSkills,
      yearsOfExperience: trainer.yearsOfExperience,

      certificates: (trainer.certificates || []).map((c) => ({
        title: c.title,
        issuer: c.issuer,
        issuedDate: c.issuedDate,
        fileUrl: c.fileUrl
      })),

      availability: trainer.availability,
      pricing: trainer.pricing,
      portfolio: trainer.portfolio,

      registrationStep: trainer.registrationStep
    };

    const identityInfo: ResponseIdentityInfo = {
      documentType: kyc?.documentType,
      frontImage: kyc?.frontImageUrl,
      backImage: kyc?.backImageUrl || undefined
    };

    return {
      trainer: {
        ...personalInfo,
        ...professionalInfo
      },
      kyc: identityInfo
    };
  }

  async submitPersonalInfo(
    userId: string, 
    payload: TrainerRegistrationStep1Dto
  ): Promise<PersonalInfoResponse> {
    const { first_name, last_name, gender, phone, profile_photo } = payload;
    const age = Number(payload.age);
    console.log(first_name, last_name, gender, phone)

    const user = await this._userRepository.findById(userId);
    if (!user) throw new BadRequestError({
      statusCode: HTTP_STATUS.NOT_FOUND,
      message: RESPONSE_MESSAGES.USER_NOT_FOUND,
      logging: false,
    });

    // ---- PHOTO UPLOAD ----
    let finalPhotoUrl = user.profile_photo;

    if (profile_photo) {
      finalPhotoUrl = await this._fileRepository.uploadUserProfilePhoto(userId, profile_photo);
    }

    if (!finalPhotoUrl) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: 'Profile photo is required'
      });
    }

    const updateUserPayload: Partial<IUser> = {};

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
          message: 'User not found after update'
        });
      }

      updatedUser = updated;
    }

    const trainer = await this._trainerRepository.findByUserId(userId);
    const NEXT_STEP = 2;

    if (trainer && trainer.registrationStep < NEXT_STEP) {
      await this._trainerRepository.updateByUserId(userId, {
        registrationStep: NEXT_STEP
      });
    }

    return {
      message: 'Trainer personal information submitted successfully',
      data: {
        first_name: updatedUser.first_name || '',
        last_name: updatedUser.last_name || '',
        gender: updatedUser.gender || 'male',
        age: updatedUser.age || (undefined as unknown as any),
        phone: updatedUser.phone || '',
        profile_photo: updatedUser.profile_photo || '',
        registrationStep: NEXT_STEP
      }
    };
  }

  async submitProfessionalInfo(
    userId: string,
    payload: TrainerProfessionalInfoDto,
    certificateFiles?: Express.Multer.File[]
  ): Promise<ProfessionalInfoResponse> {
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
      trainer = await this._trainerRepository.create({
        userId,
        specialization: [],
        yearsOfExperience: 0,
        portfolio: { bio: '', achievements: [], socialLinks: {} },
        additionalSkills: [],
        certificates: []
      } as unknown as ITrainer);
    }

    let uploadedCertificateUrls: string[] = [];

    if (certificateFiles && certificateFiles.length > 0) {
      uploadedCertificateUrls = await this._fileRepository.uploadTrainerCertificates(
        trainer._id.toString(), 
        certificateFiles
      );
    }

    const {
      specialization,
      portfolio,
      additionalSkills,
      certificates
    } = payload;
    const yearsOfExperience = Number(payload.yearsOfExperience);

    console.log(certificates)

    const updatePayload: Partial<ITrainer> = {};

    if (specialization && specialization.join(',') !== trainer.specialization.join(',')) {
      updatePayload.specialization = specialization;
    }

    if (yearsOfExperience !== trainer.yearsOfExperience) {
      updatePayload.yearsOfExperience = yearsOfExperience;
    }

    if (additionalSkills && trainer.additionalSkills && additionalSkills.join(',') !== trainer.additionalSkills.join(',')) {
      updatePayload.additionalSkills = additionalSkills;
    }

    if (portfolio) {
      updatePayload.portfolio = {
        bio: portfolio.bio ?? '',
        achievements: portfolio.achievements ?? [],
        socialLinks: portfolio.socialLinks ?? {}
      };
    }

    if (certificates) {
      updatePayload.certificates = (certificates || []).map((cert, index) => ({
        ...cert,
        fileUrl: uploadedCertificateUrls[index]
      }));
    }

    const NEXT_STEP = 3;
    if(trainer.registrationStep < NEXT_STEP) {
      updatePayload.registrationStep = NEXT_STEP;
    }
      
    let updatedTrainer = trainer;

    if (Object.keys(updatePayload).length > 0) {
      const updated = await this._trainerRepository.findByIdAndUpdate(trainer._id.toString(), updatePayload, { new: true });

      if (!updated) {
        throw new BadRequestError({
          statusCode: 404,
          message: 'Trainer not found after update'
        });
      }

      updatedTrainer = updated;
    }

    console.log(updatedTrainer.certificates)

    return {
      message: 'Trainer professional information submitted successfully',
      data: {
        specialization: updatedTrainer.specialization,
        yearsOfExperience: updatedTrainer.yearsOfExperience,
        additionalSkills: updatedTrainer.additionalSkills || [],
        certificates: updatedTrainer.certificates,
        portfolio: updatedTrainer.portfolio,
        registrationStep: updatedTrainer.registrationStep
      }
    };
  }

  async submitWorkInfo(
    userId: string, 
    payload: TrainerWorkInfoDto
  ): Promise<WorkInfoResponse> {
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
      trainer = await this._trainerRepository.create({
        userId,
        specialization: [],
        yearsOfExperience: 0,
        additionalSkills: [],
        certificates: [],
        pricing: {
          oneToOne: 0,
          groupSession: 0
        },
        availability: [],
        portfolio: {
          bio: '',
          achievements: [],
          socialLinks: {}
        }
      } as unknown as ITrainer);
    }

    const { oneToOnePrice, groupSessionPrice , availability } = payload;

    const updatePayload: Partial<ITrainer> = {};

    const pricingChanged = oneToOnePrice !== trainer.pricing.oneToOne || groupSessionPrice !== trainer.pricing.groupSession;

    if (pricingChanged) {
      updatePayload.pricing = {
        oneToOne: oneToOnePrice,
        groupSession: groupSessionPrice,
      };
    }

    const availabilityChanged = JSON.stringify(availability) !== JSON.stringify(trainer.availability);

    if (availabilityChanged) {
      updatePayload.availability = availability;
    }
    
    const NEXT_STEP = 4;
    if (trainer.registrationStep < NEXT_STEP) {
      updatePayload.registrationStep = NEXT_STEP;
    }

    let updatedTrainer = trainer;

    if (Object.keys(updatePayload).length > 0) {
      const updated = await this._trainerRepository.findByIdAndUpdate(trainer._id.toString(), updatePayload, { new: true });

      if (!updated) {
        throw new BadRequestError({
          statusCode: 404,
          message: 'Trainer not found after update'
        });
      }

      updatedTrainer = updated;
    }

    return {
      message: 'Trainer work information submitted successfully',
      data: {
        pricing: updatedTrainer.pricing,
        availability: updatedTrainer.availability,
        registrationStep: updatedTrainer.registrationStep
      }
    };
  }

  async submitIdentityInfo(
    userId: string, 
    payload: TrainerKycDto
  ): Promise<TrainerKycResponse> {
    const user = await this._userRepository.findById(userId);
    if (!user) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: RESPONSE_MESSAGES.USER_NOT_FOUND,
        logging: false
      });
    }

    const { documentType, frontImage, backImage } = payload;

    let kycRecord = await this._trainerKycRepository.findByUserId(userId);

    let existingFrontUrl = kycRecord?.frontImageUrl ?? null;
    let existingBackUrl = kycRecord?.backImageUrl ?? null;

    let finalFrontUrl = existingFrontUrl;
    let finalBackUrl = existingBackUrl;

    if(frontImage) {
      finalFrontUrl = await this._fileRepository.uploadTrainerDocument(userId, frontImage);
    }

    
    if (backImage) {
      finalBackUrl = await this._fileRepository.uploadTrainerDocument(userId, backImage);
    }

    if (!finalFrontUrl) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: 'Front image is required'
      });
    }

    if (documentType !== 'pan_card' && !finalBackUrl) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: 'Back image is required for the selected document type'
      });
    }

    if (!kycRecord) {
      await this._trainerKycRepository.create({
        userId,
        documentType,
        frontImageUrl: finalFrontUrl,
        backImageUrl: finalBackUrl || null,
        status: 'pending'
      } as unknown as ITrainerKyc);
    } else {
      await this._trainerKycRepository.updateByUserId(userId, {
        documentType,
        frontImageUrl: finalFrontUrl,
        backImageUrl: finalBackUrl || null,
        status: 'pending',
        rejectionReason: null
      });
    }

    return {
      message: 'Trainer identity verification submitted successfully',
      data: {
        documentType: kycRecord?.documentType,
        frontImage: kycRecord?.frontImageUrl,
        backImage: kycRecord?.backImageUrl,
        status: kycRecord?.status
      }
    };
  }
}