import mongoose, { Schema, Model, ObjectId, Document } from 'mongoose';
import { 
  ITrainerApplication, 
  IRejectionDetails 
} from '../types/trainer.type';
import { TrainerApplicationStatus } from '../constants/enums.constant';

export interface TrainerApplicationDocument extends ITrainerApplication, Document<ObjectId> {
  _id: ObjectId;
}

// 1. Define the Sub-schema for Rejection Details (Clean & Strict)
const RejectionDetailsSchema = new Schema<IRejectionDetails>({
  code: { type: String, trim: true },
  reasonTemplate: { type: String, trim: true },
  adminFeedback: { type: String, trim: true },
  failedSections: [{ type: String }] // Array of strings to flag specific steps
}, { _id: false }); // No Need for an _id on this sub-document

// 2. Define the Main Schema
const TrainerApplicationSchema = new Schema<TrainerApplicationDocument>(
  {
    trainerId: {
      type: Schema.Types.ObjectId,
      ref: 'Trainer', // Assuming your main data model is named 'Trainer'
      required: true,
      unique: true, // Optimization: One active application per trainer
      index: true
    },
    status: {
      type: String,
      enum: TrainerApplicationStatus,
      default: TrainerApplicationStatus.NOT_STARTED,
      index: true // Optimization: Crucial for Admin Dashboard filtering
    },
    applicationStep: {
      type: Number,
      enum: [1, 2, 3, 4],
      default: 1
    },
    submissionDate: {
      type: Date
    },
    reviewerId: {
      type: Schema.Types.ObjectId,
      ref: 'Admin', // Assuming you have an Admin model
      default: null
    },
    reviewedAt: {
      type: Date,
      default: null
    },
    rejectionDetails: {
      type: RejectionDetailsSchema,
      default: null
    }
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
    versionKey: false // Optional: disables the __v field if you handle concurrency differently
  }
);

// 3. Database Optimizations (Compound Indexes)

// Scenario: Admin wants to see "All COMPLETED applications sorted by submission date"
// This compound index makes that query instant.
TrainerApplicationSchema.index({ status: 1, submissionDate: -1 });

// 4. Pre-save Hooks (Optional Logic)
// Example: If status changes to COMPLETED, auto-set submissionDate if missing
TrainerApplicationSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === TrainerApplicationStatus.COMPLETED) {
    if (!this.submissionDate) {
      this.submissionDate = new Date();
    }
  }
  next();
});

// 5. Create and Export the Model
export const TrainerApplication: Model<TrainerApplicationDocument> = mongoose.model<TrainerApplicationDocument>(
  'TrainerApplication',
  TrainerApplicationSchema
);