import { TrainerIdentityInfoRequestDto, TrainerPersonalInfoRequestDto, TrainerProfessionalInfoRequestDto, TrainerWorkInfoRequestDto } from '../../dtos/trainerApplicationRequest.dto';
import { TrainerFullInfoResponseDto, TrainerIdentityInfoResponseDto, TrainerPersonalInfoResponseDto, TrainerProfessionalInfoResponseDto, TrainerWorkInfoResponseDto } from '../../dtos/trainerApplicationResponse.dto';
import { UploadedFile } from '../../types/trainer.type';

export interface ITrainerApplicationService {
  getFullTrainerInfo(userId: string): Promise<TrainerFullInfoResponseDto>;
  submitPersonalInfo(
    userId: string,
    payload: TrainerPersonalInfoRequestDto,
    profilePhoto?: UploadedFile
  ): Promise<TrainerPersonalInfoResponseDto>;
  submitProfessionalInfo(userId: string, payload: TrainerProfessionalInfoRequestDto, certificateFiles?: UploadedFile[]): Promise<TrainerProfessionalInfoResponseDto>;
  submitWorkInfo(userId: string, payload: TrainerWorkInfoRequestDto): Promise<TrainerWorkInfoResponseDto>;
  submitIdentityInfo(userId: string, payload: TrainerIdentityInfoRequestDto, frontImage?: UploadedFile, backImage?: UploadedFile): Promise<TrainerIdentityInfoResponseDto>;
}