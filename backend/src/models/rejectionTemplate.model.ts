import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import { IRejectionTemplate } from '../types/rejectionTemplate.types';

export interface RejectionTemplateDocument extends IRejectionTemplate, Document<ObjectId> {
  _id: ObjectId;
}

const RejectionTemplateSchema = new Schema<RejectionTemplateDocument>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true // e.g., 'CERT_EXPIRED'
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      enum: ['PERSONAL', 'PROFESSIONAL', 'WORK', 'IDENTITY', 'GENERAL'],
      required: true,
      index: true // Indexed for filtering dropdowns by tab
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Optimization: Most common query will be "Get active reasons for Identity category"
RejectionTemplateSchema.index({ category: 1, isActive: 1 });

export const RejectionTemplateModel = mongoose.model<RejectionTemplateDocument>(
  'RejectionTemplate',
  RejectionTemplateSchema
);