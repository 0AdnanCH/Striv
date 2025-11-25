import { TrainerKycDto, TrainerRegistrationStep1Dto, TrainerWorkInfoDto } from '../../dtos/trainerApplication.dto';
import { TrainerProfessionalInfoDto } from '../../schemas/trainerProfessionalInfo.schema';
import { PersonalInfoResponse, ProfessionalInfoResponse, TrainerFullInfo, TrainerKycResponse, WorkInfoResponse } from '../../types/trainer.type';

export interface ITrainerApplicationService {
  getFullTrainerInfo(userId: string): Promise<TrainerFullInfo>;
  submitPersonalInfo(
    userId: string,
    payload: TrainerRegistrationStep1Dto
  ): Promise<PersonalInfoResponse>;
  submitProfessionalInfo(userId: string, payload: TrainerProfessionalInfoDto, certificateFiles?: Express.Multer.File[]): Promise<ProfessionalInfoResponse>;
  submitWorkInfo(userId: string, payload: TrainerWorkInfoDto): Promise<WorkInfoResponse>;
  submitIdentityInfo(userId: string, payload: TrainerKycDto): Promise<TrainerKycResponse>;
}