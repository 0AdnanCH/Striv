import { Document, Types } from 'mongoose';

export enum TrainerSpecialization {
  YOGA = 'yoga',
  HIIT = 'hiit',
  STRENGTH = 'strength',
  PILATES = 'pilates',
  NUTRITION = 'nutrition',
  REHABILITATION = 'rehab',
  CROSSFIT = 'crossfit'
}

export enum VerificationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  SUSPENDED = 'suspended' // For bad behavior
}

// Sub-interface for a Certification (Clean structure)
export interface ICertification {
  name: string; // e.g., "NASM Certified Personal Trainer"
  issuingOrganization: string; // e.g., "NASM"
  issueDate: Date;
  expiryDate?: Date; // Important: Certs expire!
  certificateUrl: string; // Link to the uploaded PDF/Image
}

// Sub-interface for Reviews Aggregation (Performance)
export interface IRatingSummary {
  average: number; // e.g., 4.8
  count: number; // e.g., 150 reviews
}

export interface ITrainerProfile extends Document {
  user: Types.ObjectId; // Link to Identity

  // Professional Header
  bio: string;
  headline: string; // e.g., "Elite Strength Coach specializing in rehab"
  experienceYears: number;

  // Searchable Tags
  specializations: TrainerSpecialization[];

  // Credentials (The "Trust" Layer)
  certifications: ICertification[];
  verificationStatus: VerificationStatus;
  rejectionReason?: string; // If admin rejects, explain why

  // Business Logic
  pricing: {
    hourlyRate: number;
  };

  // Social Proof (Aggregated)
  rating: IRatingSummary;
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    website?: string;
  };

  createdAt: Date;
  updatedAt: Date;
}