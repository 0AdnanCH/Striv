import { Document, Types } from 'mongoose';
import { Gender } from '../../../constants/enums.constant';

// Enums for strict data control
export enum FitnessGoal {
  WEIGHT_LOSS = 'weight_loss',
  MUSCLE_GAIN = 'muscle_gain',
  ENDURANCE = 'endurance',
  FLEXIBILITY = 'flexibility',
  GENERAL_HEALTH = 'general_health'
}

export enum ActivityLevel {
  SEDENTARY = 'sedentary', // Little to no exercise
  LIGHTLY_ACTIVE = 'lightly_active', // 1-3 days/week
  MODERATELY_ACTIVE = 'moderately_active', // 3-5 days/week
  VERY_ACTIVE = 'very_active', // 6-7 days/week
  SUPER_ACTIVE = 'super_active' // Physical job + training
}

// The Interface
export interface IClientProfile extends Document {
  user: Types.ObjectId; // Reference to the Identity User

  // Track where they are in the flow
  onboardingStep: number; // 1: Account Created, 2: Health Data, 3: Goals, 4: Complete

  // Physical Stats
  dateOfBirth: Date;
  gender: Gender;
  height: number; // Stored in cm
  weight: number; // Stored in kg

  // Fitness Logic
  bmi?: number; // Calculated (Optional storage)
  fitnessGoals: FitnessGoal[];
  activityLevel: ActivityLevel;

  // Medical / Safety (Crucial for liability)
  medicalConditions?: string[];
  injuries?: string[];

  // Metadata
  createdAt: Date;
  updatedAt: Date;
}
