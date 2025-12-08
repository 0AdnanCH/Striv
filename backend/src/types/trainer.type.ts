import { ObjectId } from 'mongoose';
import { Gender, WeekDay, DocumentType, Status, TrainerApplicationStatus, } from '../constants/enums.constant'; 

export interface ITrainer {
  userId: ObjectId;
  specialization: string[];
  additionalSkills?: string[];
  yearsOfExperience: number;

  certificates: ICertificateInfo[];
  availability: ITrainerAvailability[];
  pricing: IPricingInfo;
  portfolio: IPortfolioInfo;

  applicationStep: number;
  applicationStatus: TrainerApplicationStatus;
  rejectionReason?: string | null;
}

// ------------------ KYC ------------------

export interface ITrainerKyc {
  userId: ObjectId;
  documentType: DocumentType;

  frontImageUrl: string;
  backImageUrl?: string | null;

  status: Status;
  rejectionReason?: string;

  reviewedBy?: ObjectId;
  reviewedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

export interface ITrainerApplication {
  trainerId: ObjectId; // Reference to the Trainer Data model

  status: TrainerApplicationStatus;
  applicationStep: number;

  // Tracking Dates
  submissionDate?: Date; // When status turned to COMPLETED

  // Admin Review Meta-data
  reviewerId?: ObjectId; // Reference to AdminUser
  reviewedAt?: Date;
  rejectionDetails?: IRejectionDetails;

  // Mongoose Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// ------------------ Certificates ------------------

export interface ICertificateInfo {
  title: string;
  issuer: string;
  issuedDate?: Date | null;
  fileUrl?: string;
}

// ------------------ Pricing ------------------

export interface IPricingInfo {
  oneToOne: number;
  groupSession: number;
}

// ------------------ Availability ------------------

export interface ITrainerAvailability {
  day: WeekDay;
  startTime: string;
  endTime: string;
}

// ------------------ Social / Portfolio ------------------

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

// ------------------ Personal Info ------------------

export interface ITrainerPersonalInfo {
  first_name: string;
  last_name: string;
  gender: Gender;
  age: number | null;
  phone: string;
  profile_photo: string;
}

// ------------------ Professional Info ------------------

export interface ITrainerProfessionalInfo {
  specialization: string[];
  yearsOfExperience: number;
  additionalSkills?: string[];
  certificates?: ICertificateInfo[];
  portfolio: IPortfolioInfo;
}

// ------------------ Work Info ------------------

export interface ITrainerWorkInfo {
  pricing: IPricingInfo;
  availability: ITrainerAvailability[];
}

// ------------------ Identity Info ------------------

export interface ITrainerIdentityInfo {
  documentType: DocumentType;
  frontImage: string;
  backImage?: string | null;
}

export interface IApplicationStep {
  applicationStep: number;
}

export interface IRejectionDetails {
  code?: string; // Machine readable: 'ID_BLURRY', 'CERT_EXPIRED'
  reasonTemplate?: string; // The human-readable standard text
  adminFeedback?: string; // Specific instructions from the admin
  failedSections?: string[]; // e.g., ['identityInfo', 'professionalInfo']
}

export type UploadedFile = Express.Multer.File;