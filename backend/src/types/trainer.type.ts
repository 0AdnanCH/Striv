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

  pricing: PricingInfo;

  portfolio: PortfolioInfo;

  verificationStatus: TrainerStatus;
  rejectionReason?: string | null;
}

export enum KycDocumentType {
  AADHAAR = 'aadhaar',
  PASSPORT = 'passport',
  DRIVING_LICENSE = 'driving_license',
  PAN_CARD = 'pan_card'
}

export interface ITrainerKYC {
  userId: ObjectId;
  documentType: KycDocumentType;

  frontImageUrl: string;
  backImageUrl?: string;

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

