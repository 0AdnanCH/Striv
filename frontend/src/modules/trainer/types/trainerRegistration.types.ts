export interface PersonalInfoPayload {
  first_name: string;
  last_name: string;
  gender: 'male' | 'female';
  age: number;
  phone: string;
  profile_photo: File;
}

export interface SocialLinks {
  website?: string | null;
  instagram?: string | null;
  youtube?: string | null;
  linkedin?: string | null;
}

export interface PortfolioInfo {
  bio: string;
  achievements?: string[];
  socialLinks?: SocialLinks;
}

export interface ProfessionalInfoPayload {
  specialization: string[];
  yearsOfExperience: number;

  portfolio: PortfolioInfo

  additionalSkills?: string[];

  certificates?: {
    title: string;
    issuer: string;
    certificateImage: File;
    issuedDate?: string | null;
  }[];
}


export type TrainerDayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface TrainerAvailability {
  day: TrainerDayOfWeek;
  startTime: string; 
  endTime: string; 
}

export interface WorkInfoPayload {
  oneToOnePrice: number;
  groupSessionPrice: number;
  availability: TrainerAvailability[];
}

export type DocumentType =
  | 'aadhaar'
  | 'driving_license'
  | 'pan_card';


export interface IdentityInfoPayload {
  documentType: DocumentType
  frontImage: File;
  backImage?: File;
}

export interface PricingInfo {
  oneToOne: number;
  groupSession: number;
}

export interface ApiMessageResponse {
  message: string;
}

export interface ResponseCertificateInfo {
  title: string;
  issuer: string;
  issuedDate?: Date | null; 
  fileUrl: string;
}

export interface ResponseProfessionalInfo {
  specialization?: string[];
  additionalSkills?: string[];
  yearsOfExperience?: number;

  certificates?: ResponseCertificateInfo[];

  availability?: TrainerAvailability[];

  pricing?: PricingInfo;

  portfolio?: PortfolioInfo;

  registrationStep?: number;
}

export interface ResponsePersonalInfo {
  first_name?: string;
  last_name?: string;
  gender?: 'male' | 'female';
  age?: number;
  phone?: string;
  profile_photo?: string;
}

export interface ResponseIdentityInfo {
  documentType?: DocumentType;
  frontImage?: string;
  backImage?: string | null;
}

export interface Trainer extends ResponsePersonalInfo, ResponseProfessionalInfo {};

export interface TrainerFullInfo {
  trainer?: Trainer | null;
  kyc?: ResponseIdentityInfo | null;
}

export interface FetchTrainerFullInfoApiResponse extends ApiMessageResponse {
  data: TrainerFullInfo;
}

export interface PersonalInfoResponse {
  message: string;
  data: {
    first_name: string;
    last_name: string;
    gender: 'male' | 'female';
    age: number;
    phone: string;
    profile_photo: string;
    registrationStep: number;
  };
}

export interface PersonalInfoApiResponse extends ApiMessageResponse {
  data: {
    first_name: string;
    last_name: string;
    gender: 'male' | 'female';
    age: number;
    phone: string;
    profile_photo: string;
    registrationStep: number;
  } 
}

export interface ProfessionalInfoResponse {
  message: string;
  data: {
    specialization: string[];
    yearsOfExperience: number;
    additionalSkills: string[];
    certificates?: {
      title: string;
      issuer: string;
      issuedDate?: Date | null;
      fileUrl: string;
    }[];
    portfolio: {
      bio: string;
      achievements?: string[];
      socialLinks?: {
        website?: string | null;
        instagram?: string | null;
        youtube?: string | null;
        linkedin?: string | null;
      };
    };
    registrationStep: number;
  };
}

export interface WorkInfoResponse {
  message: string;
  data: {
    pricing: {
      oneToOne: number;
      groupSession: number;
    };
    availability: TrainerAvailability[];
    registrationStep: number;
  };
}

export type TrainerStatus = 'pending' | 'approved' | 'rejected';

export interface TrainerKycResponse {
  message: string;
  data: {
    documentType?: DocumentType;
    frontImage?: string;
    backImage?: string | null;
    status?: TrainerStatus;
  };
}