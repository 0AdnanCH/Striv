import { ObjectId } from 'mongoose';

export interface CertificateInfo {
  title: string;
  issuer: string;
  issuedDate?: Date | null;
  fileUrl?: string;
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

export interface ITrainerKyc {
  userId: ObjectId;
  documentType: 'aadhaar' | 'driving_license' | 'pan_card';

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

export interface ResponsePersonalInfo {
  first_name?: string;
  last_name?: string;
  gender?: 'male' | 'female' ;
  age?: number ;
  phone?: string;
  profile_photo?: string;
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
  fileUrl?: string;
}

export interface ResponseIdentityInfo {
  documentType?: 'aadhaar' | 'driving_license' | 'pan_card';
  frontImage?: string;
  backImage?: string;
}

export type UploadedFile = Express.Multer.File;