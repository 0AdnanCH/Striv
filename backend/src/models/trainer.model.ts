import { Schema, model, Document, ObjectId } from 'mongoose';
import { ITrainer } from '../types/trainer.type';

export interface TrainerDocument extends ITrainer, Document<ObjectId> {
  _id: ObjectId;
}

const trainerSchema = new Schema<TrainerDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    specialization: { type: [String], default: [] },
    additionalSkills: { type: [String], default: [] },
    yearsOfExperience: { type: Number, min: 0, default: 0 },
    certificates: {
      type: [
        {
          title: { type: String },
          issuer: { type: String },
          issuedDate: { type: Date },
          fileUrl: { type: String }
        }
      ],
      default: []
    },
    pricing: {
      oneToOne: { type: Number, min: 0, default: 0 },
      groupSession: { type: Number, min: 0, default: 0 }
    },

    availability: {
      type: [
        {
          day: {
            type: String,
            enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
          },
          startTime: { type: String },
          endTime: { type: String }
        }
      ],
      default: []
    },

    portfolio: {
      bio: { type: String, default: '' },
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