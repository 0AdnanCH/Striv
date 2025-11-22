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
import { ITrainer, ITrainerKyc } from "../../types/trainer.type";
import { ITrainerKycRepository } from "../../repositories/interface/ITrainerKyc.repository";

export class TrainerApplicationService implements ITrainerApplicationService {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _trainerRepository: ITrainerRepository,
    private readonly _trainerKycRepository: ITrainerKycRepository,
    private readonly _fileRepository: FileService,
  ) {}

  async submitPersonalInfo(
    userId: string, 
    payload: TrainerRegistrationStep1Dto
  ): Promise<{ message: string }> {
    const { first_name, last_name, gender, age, phone, profile_photo } = payload;

    const user = await this._userRepository.findById(userId);
    if (!user) throw new BadRequestError({
      statusCode: HTTP_STATUS.NOT_FOUND,
      message: RESPONSE_MESSAGES.USER_NOT_FOUND,
      logging: false,
    });

    // ---- PHOTO UPLOAD ----
    let uploadedPhotoUrl: string | undefined;

    if (profile_photo) {
      uploadedPhotoUrl = await this._fileRepository.uploadUserProfilePhoto(userId, profile_photo);
    }

    const updateUserPayload: Partial<IUser> = {};

    if (first_name && first_name !== user.first_name) updateUserPayload.first_name = first_name;

    if (last_name && last_name !== user.last_name) updateUserPayload.last_name = last_name;

    if (gender && gender !== user.gender) updateUserPayload.gender = gender;

    if (age && age !== user.age) updateUserPayload.age = age;

    if (phone && phone !== user.phone) updateUserPayload.phone = phone;

    if (uploadedPhotoUrl) updateUserPayload.profile_photo = uploadedPhotoUrl;

    if (Object.keys(updateUserPayload).length > 0) {
      await this._userRepository.findByIdAndUpdate(userId, updateUserPayload);
    }

    return {
      message: 'Trainer personal information submitted successfully',
    };
  }

  async submitProfessionalInfo(
    userId: string,
    payload: TrainerProfessionalInfoDto,
    certificateFiles?: Express.Multer.File[]
  ): Promise<{ message: string }> {
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
      yearsOfExperience,
      portfolio,
      additionalSkills,
      certificates
    } = payload;

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
        ...trainer.portfolio,
        ...portfolio
      };
    }

    if (certificates || uploadedCertificateUrls.length > 0) {
      const mergedCertificates = (certificates || []).map((cert, index) => ({
        ...cert,
        fileUrl: uploadedCertificateUrls[index]
      }));

      updatePayload.certificates = [
        ...trainer.certificates,
        ...mergedCertificates
      ];
    }

    if (Object.keys(updatePayload).length > 0) {
      await this._trainerRepository.updateByUserId(userId, updatePayload);
    }

    return {
      message: 'Trainer professional information submitted successfully'
    };
  }

  async submitWorkInfo(
    userId: string, 
    payload: TrainerWorkInfoDto
  ): Promise<{ message: string; }> {
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

    const { pricing, availability } = payload;

    const updatePayload: Partial<ITrainer> = {};

    const pricingChanged = pricing.oneToOne !== trainer.pricing.oneToOne || pricing.groupSession !== trainer.pricing.groupSession;

    if (pricingChanged) {
      updatePayload.pricing = pricing;
    }

    const availabilityChanged = JSON.stringify(availability) !== JSON.stringify(trainer.availability);

    if (availabilityChanged) {
      updatePayload.availability = availability;
    }

    if (Object.keys(updatePayload).length > 0) {
      await this._trainerRepository.updateByUserId(userId, updatePayload);
    }

    return {
      message: 'Trainer work information submitted successfully'
    };
  }

  async submitIdentityInfo(
    userId: string, 
    payload: TrainerKycDto
  ): Promise<{ message: string; }> {
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

    const frontUrl = await this._fileRepository.uploadTrainerDocument(userId, frontImage);
    let backUrl: string | undefined = undefined;
    if (backImage) {
      backUrl = await this._fileRepository.uploadTrainerDocument(userId, backImage);
    }

    if (!kycRecord) {
      await this._trainerKycRepository.create({
        userId,
        documentType,
        frontImageUrl: frontUrl,
        backImageUrl: backUrl || null,
        status: 'pending'
      } as unknown as ITrainerKyc);
    } else {
      await this._trainerKycRepository.updateByUserId(userId, {
        documentType,
        frontImageUrl: frontUrl,
        backImageUrl: backUrl || kycRecord.backImageUrl,
        status: 'pending',
        rejectionReason: null
      });
    }

    return {
      message: 'Trainer identity verification submitted successfully'
    };
  }
}