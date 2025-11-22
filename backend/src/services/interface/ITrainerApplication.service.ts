import { TrainerKycDto, TrainerRegistrationStep1Dto, TrainerWorkInfoDto } from '../../dtos/trainerApplication.dto';
import { TrainerProfessionalInfoDto } from '../../schemas/trainerProfessionalInfo.schema';

export interface ITrainerApplicationService {
  submitPersonalInfo(userId: string, payload: TrainerRegistrationStep1Dto): Promise<{ message: string }>;
  submitProfessionalInfo(userId: string, payload: TrainerProfessionalInfoDto, certificateFiles?: Express.Multer.File[]): Promise<{ message: string }>;
  submitWorkInfo(userId: string, payload: TrainerWorkInfoDto): Promise<{ message: string }>;
  submitIdentityInfo(userId: string, payload: TrainerKycDto): Promise<{ message: string }>;
}