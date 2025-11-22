import { KycDocumentType } from "../types/trainer.type"; 

export interface TrainerRegistrationStep1Dto {
  first_name: string;
  last_name: string;
  gender: 'male' | 'female';
  age: number;
  phone: string;
  profile_photo: Express.Multer.File; 
}

export interface TrainerWorkInfoDto {
  pricing: {
    oneToOne: number;
    groupSession: number;
  };
  availability: {
    day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
    startTime: string;
    endTime: string; 
  }[];
}

export interface TrainerKycDto {
  documentType: KycDocumentType;
  frontImage: Express.Multer.File; 
  backImage?: Express.Multer.File; 
}