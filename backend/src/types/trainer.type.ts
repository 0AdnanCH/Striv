import { ObjectId } from 'mongoose';

export interface CertificateInfo {
  title: string;
  issuer: string;
  issuedDate?: Date | null;
  fileUrl: string;
}

export interface PricingInfo {
  oneToOne: number;
  groupSession: number;
}

export interface TrainerAvailability {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  startTime: string;
  endTime: string;
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

export type TrainerStatus = 'pending' | 'approved' | 'rejected';
export enum KycStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export interface ITrainer {
  userId: ObjectId;
  specialization: string[];
  additionalSkills?: string[];
  yearsOfExperience: number;

  certificates: CertificateInfo[];

  availability: TrainerAvailability[];

  pricing: PricingInfo;

  portfolio: PortfolioInfo;

  registrationStep: number;
  verificationStatus: TrainerStatus;
  rejectionReason?: string | null;
}

export enum KycDocumentType {
  AADHAAR = 'aadhaar',
  DRIVING_LICENSE = 'driving_license',
  PAN_CARD = 'pan_card'
}

export interface ITrainerKyc {
  userId: ObjectId;
  documentType: KycDocumentType;

  frontImageUrl: string;
  backImageUrl?: string | null;

  status: KycStatus;
  rejectionReason?: string;

  reviewedBy?: ObjectId;
  reviewedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

export interface TrainerProfessionalInfo {
  specialization: string[];
  additionalSkills?: string[];
  yearsOfExperience: number;
  certificates?: CertificateInfo[];
  portfolio: PortfolioInfo;
}

// export interface TrainerFullInfo {
//   trainer: ITrainer;
//   kyc: ITrainerKyc;
// }

export interface ResponsePersonalInfo {
  first_name: string;
  last_name: string;
  gender: 'male' | 'female' | undefined;
  age: number | undefined;
  phone: string;
  profile_photo: string;
}

export interface ResponseProfessionalInfo {
  specialization: string[];
  additionalSkills?: string[];
  yearsOfExperience: number;

  certificates: ResponseCertificateInfo[];

  availability: TrainerAvailability[];

  pricing: PricingInfo;

  portfolio: PortfolioInfo;

  registrationStep: number;
}

export interface ResponseCertificateInfo {
  title: string;
  issuer: string;
  issuedDate?: Date | null;
  fileUrl: string;
}

export interface ResponseIdentityInfo {
  documentType?: KycDocumentType;
  frontImage?: string;
  backImage?: string;
}

export interface Trainer extends ResponsePersonalInfo, ResponseProfessionalInfo {}

export interface TrainerFullInfo {
  trainer?: Trainer | null;
  kyc?: ResponseIdentityInfo | null;
}

export interface PersonalInfoResponse {
  message: string;
  data: {
    first_name: string;
    last_name: string;
    gender: string;
    age: number;
    phone: string;
    profile_photo: string;
    registrationStep: number;
  };
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
export interface TrainerKycResponse {
  message: string;
  data: {
    documentType?: KycDocumentType;
    frontImage?: string;
    backImage?: string | null;
    status?: TrainerStatus;
  };
}
