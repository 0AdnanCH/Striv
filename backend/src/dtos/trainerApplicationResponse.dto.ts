import { IRegistrationStep, ITrainerIdentityInfo, ITrainerPersonalInfo, ITrainerProfessionalInfo, ITrainerWorkInfo } from "../types/trainer.type";

export interface TrainerPersonalInfoResponseDto {
  message: string;
  data: ITrainerPersonalInfo & IRegistrationStep;
}

export interface TrainerProfessionalInfoResponseDto {
  message: string;
  data: ITrainerProfessionalInfo & IRegistrationStep;
}

export interface TrainerWorkInfoResponseDto {
  message: string;
  data: ITrainerWorkInfo & IRegistrationStep;
}

export interface TrainerIdentityInfoResponseDto {
  message: string;
  data: ITrainerIdentityInfo;
}

export interface TrainerFullInfoResponseDto {
  message: string;
  data: {
    trainer: ITrainerPersonalInfo & ITrainerProfessionalInfo & ITrainerWorkInfo & IRegistrationStep | null;
    kyc: ITrainerIdentityInfo | null;
  };
}