import { Schema, model, Document, ObjectId } from 'mongoose';
import { ITrainer } from '../types/trainer.type';

export interface TrainerDocument extends ITrainer, Document<ObjectId> {
  _id: ObjectId;
}

const trainerSchema = new Schema<TrainerDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    specialization: { type: [String], required: true },
    additionalSkills: { type: [String], default: [] },
    yearsOfExperience: { type: Number, required: true, min: 0 },
    certificates: [
      {
        title: { type: String, required: true },
        issuer: { type: String, required: true },
        issuedDate: { type: Date, required: false },
        fileUrl: { type: String, required: true }
      }
    ],
    pricing: {
      oneToOne: { type: Number, required: true, min: 0 },
      groupSession: { type: Number, required: true, min: 0 }
    },

    portfolio: {
      bio: { type: String, required: true },
      achievements: { type: [String], default: [] },
      socialLinks: {
        website: { type: String, default: null },
        instagram: { type: String, default: null },
        youtube: { type: String, default: null },
        linkedin: { type: String, default: null }
      }
    },
    verificationStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    rejectionReason: { type: String, default: null }
  },
  { timestamps: true }
);

export const Trainer = model<TrainerDocument>('Trainer', trainerSchema);