import mongoose, { Schema } from 'mongoose';
import { IClientProfile, FitnessGoal, ActivityLevel } from './interfaces';
import { Gender } from '../../constants/enums.constant';

const clientProfileSchema = new Schema<IClientProfile>(
  {
    // Link to the Identity Layer
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true // CRITICAL: One User = One Client Profile
    },

    // Track where they are in the flow
    onboardingStep: {
      type: Number,
      default: 1, // 1: Account Created, 2: Health Data, 3: Goals, 4: Complete
      index: true
    },

    // Physical Data
    dateOfBirth: {
      type: Date
    },
    gender: {
      type: String,
      enum: Gender
    },
    height: {
      type: Number,
      min: 50, // Sanity check: 50cm
      max: 300 // Sanity check: 300cm
    },
    weight: {
      type: Number,
      min: 20,
      max: 500
    },

    // Fitness Context (Used for matching with Trainers)
    fitnessGoals: [
      {
        type: String,
        enum: FitnessGoal
      }
    ],
    activityLevel: {
      type: String,
      enum: ActivityLevel,
      default: ActivityLevel.SEDENTARY
    },

    // Safety Data
    medicalConditions: [{ type: String, trim: true }],
    injuries: [{ type: String, trim: true }]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Ensure 'age' shows up when you convert to JSON
    toObject: { virtuals: true }
  }
);

// This calculates age on the fly whenever you fetch the document.
clientProfileSchema.virtual('age').get(function (this: IClientProfile) {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

export const ClientProfileModel = mongoose.model<IClientProfile>('ClientProfile', clientProfileSchema);
