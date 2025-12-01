import type { GenderType } from "../../../constants/gender.constant";
import type { DocumentTypeType } from "../constants/trainerDocType.constant";
import type { WeekDayType } from "../constants/weekDay.constant";

export interface PersonalInfoPayload {
  first_name: string;
  last_name: string;
  gender: GenderType;
  age: number;
  phone: string;
  profile_photo: File;
}

export interface ProfessionalInfoPayload {
  specialization: string[];
  yearsOfExperience: number;

  portfolio: IPortfolioInfo;

  additionalSkills?: string[];

  certificates?: {
    title: string;
    issuer: string;
    certificateImage: File;
    issuedDate?: string | null;
  }[];
}

export interface WorkInfoPayload {
  oneToOnePrice: number;
  groupSessionPrice: number;
  availability: ITrainerAvailability[];
}

export interface IdentityInfoPayload {
  documentType: DocumentTypeType;
  frontImage: File;
  backImage?: File;
}


// Types according to the backend
export interface ISocialLinks {
  website?: string | null;
  instagram?: string | null;
  youtube?: string | null;
  linkedin?: string | null;
}

export interface IPortfolioInfo {
  bio: string;
  achievements?: string[];  
  socialLinks?: ISocialLinks;
}

export interface ITrainerAvailability {
  day: WeekDayType;
  startTime: string;
  endTime: string;
}

export interface ICertificateInfo {
  title: string;
  issuer: string;
  issuedDate?: Date | null;
  fileUrl?: string;
}

export interface IPricingInfo {
  oneToOne: number;
  groupSession: number;
}

export interface IPersonalInfo {
  first_name: string;
  last_name: string;
  gender: GenderType;
  age: number | null;
  phone: string;
  profile_photo: string;
}

export interface IProfessionalInfo {
  specialization: string[];
  yearsOfExperience: number;
  additionalSkills?: string[];
  certificates?: ICertificateInfo[];
  portfolio: IPortfolioInfo;
}

export interface IWorkInfo {
  pricing: IPricingInfo;
  availability: ITrainerAvailability[];
}

export interface ITrainerIdentityInfo {
  documentType: DocumentTypeType;
  frontImage: string;
  backImage?: string | null;
}

export interface IPersonalInfoResponse {
  message: string;
  data: IPersonalInfo & IRegistrationStep;
}

export interface IProfessionalInfoResponse {
  message: string;
  data: IProfessionalInfo & IRegistrationStep;
}

export interface IWorkInfoResponse {
  message: string;
  data: IWorkInfo & IRegistrationStep;
}

export interface IRegistrationStep {
  registrationStep: number;
}

export interface ITrainerIdentityResponse {
  message: string;
  data: ITrainerIdentityInfo;
}

export interface ITrainer extends IPersonalInfo, IProfessionalInfo, IWorkInfo, IRegistrationStep {}

export interface ITrainerFullInfo {
  trainer: ITrainer | null;
  kyc: ITrainerIdentityInfo | null;
}

export interface ITrainerFullInfoResponse {
  message: string;
  data: ITrainerFullInfo;
}