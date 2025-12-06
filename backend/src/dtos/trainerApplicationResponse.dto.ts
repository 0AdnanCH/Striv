import { TrainerApplicationStatus } from "../constants/enums.constant";
import { ITrainerIdentityInfo, ITrainerPersonalInfo, ITrainerProfessionalInfo, ITrainerWorkInfo } from "../types/trainer.type";

export interface TrainerPersonalInfoResponseDto {
  message: string;
  data: ITrainerPersonalInfo;
}

export interface TrainerProfessionalInfoResponseDto {
  message: string;
  data: ITrainerProfessionalInfo;
}

export interface TrainerWorkInfoResponseDto {
  message: string;
  data: ITrainerWorkInfo;
}

export interface TrainerIdentityInfoResponseDto {
  message: string;
  data: ITrainerIdentityInfo;
}

export interface TrainerFullInfoResponseDto {
  message: string;
  data: {
    personalInfo: ITrainerPersonalInfo | null;
    professionalInfo: ITrainerProfessionalInfo | null;
    workInfo: ITrainerWorkInfo | null;
    identityInfo: ITrainerIdentityInfo | null;
    applicationStep: number;
    applicationStatus: TrainerApplicationStatus;
  };
}