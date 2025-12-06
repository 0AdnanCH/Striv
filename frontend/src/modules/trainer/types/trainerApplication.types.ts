import type { GenderType } from "../../../constants/gender.constant";
import type { TrainerApplicationStatusType } from "../constants/trainerApplicationStatus.constant";
import type { DocumentTypeType } from "../constants/trainerDocType.constant";
import type { WeekDayType } from "../constants/weekDay.constant";

export interface PersonalInfoPayload {
  first_name: string;
  last_name: string;
  gender: GenderType;
  age: number;
  phone: string;
  profile_photo?: File | null;
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
  backImage?: File | null;
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
  personalInfo: IPersonalInfo;
}

export interface IPersonalInfoApiResponse {
  message: string;
  data: IPersonalInfo;
}

export interface IProfessionalInfoResponse {
  message: string;
  professionalInfo: IProfessionalInfo;
}

export interface IProfessionalInfoApiResponse {
  message: string;
  data: IProfessionalInfo;
}

export interface IWorkInfoResponse {
  message: string;
  workInfo: IWorkInfo;
}

export interface IWorkInfoApiResponse {
  message: string;
  data: IWorkInfo;
}

export interface IApplicationStep {
  applicationStep: number;
}

export interface ITrainerIdentityResponse {
  message: string;
  identityInfo: ITrainerIdentityInfo;
}

export interface ITrainerIdentityApiResponse {
  message: string;
  data: ITrainerIdentityInfo;
}

export interface ITrainerFullInfo {
  personalInfo: IPersonalInfo | null;
  professionalInfo: IProfessionalInfo | null;
  workInfo: IWorkInfo | null;
  identityInfo: ITrainerIdentityInfo | null;
  applicationStep: number;
  applicationStatus: TrainerApplicationStatusType
}

export interface ITrainerFullInfoResponse {
  message: string;
  trainerInfo: ITrainerFullInfo;
}

export interface ITrainerFullInfoApiResponse {
  message: string;
  data: ITrainerFullInfo;
}