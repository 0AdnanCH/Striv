import mongoose, { Schema } from 'mongoose';
import { ITrainerProfile, TrainerSpecialization, VerificationStatus } from './interfaces';

const trainerProfileSchema = new Schema<ITrainerProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },

    // --- PUBLIC PROFILE ---
    headline: {
      type: String,
      required: true,
      maxlength: 100 // Keep it punchy
    },
    bio: {
      type: String,
      required: true,
      maxlength: 1000
    },
    experienceYears: {
      type: Number,
      default: 0,
      min: 0
    },

    // --- SEARCHABLE FIELDS ---
    specializations: [
      {
        type: String,
        enum: TrainerSpecialization,
        index: true // CRITICAL: Allows filtering by "Yoga"
      }
    ],

    // --- CREDENTIALS ---
    certifications: [
      {
        name: { type: String, required: true },
        issuingOrganization: { type: String, required: true },
        issueDate: { type: Date, required: true },
        expiryDate: { type: Date },
        certificateUrl: { type: String, required: true }
      }
    ],

    // --- ADMIN / VERIFICATION ---
    verificationStatus: {
      type: String,
      enum: VerificationStatus,
      default: VerificationStatus.PENDING,
      index: true // CRITICAL: Admin dashboard "Show me pending trainers"
    },
    rejectionReason: { type: String, select: false }, // Only admin sees this

    // --- BUSINESS ---
    pricing: {
      hourlyRate: { type: Number, required: true },
      currency: { type: String, default: 'INR' }
    },

    // --- SOCIAL PROOF ---
    rating: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0 }
    },

    socialLinks: {
      instagram: String,
      linkedin: String,
      website: String
    }
  },
  {
    timestamps: true
  }
);

// --- SENIOR DEV OPTIMIZATION: Compound Indexes ---
// Optimization for the query: "Show me Approved Yoga Trainers"
trainerProfileSchema.index({ verificationStatus: 1, specializations: 1 });

// Optimization for sorting: "Show me Most Experienced Trainers"
trainerProfileSchema.index({ experienceYears: -1 });

export const TrainerProfileModel = mongoose.model<ITrainerProfile>('TrainerProfile', trainerProfileSchema);