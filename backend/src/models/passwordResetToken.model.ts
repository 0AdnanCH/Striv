import { Schema, Document, model, ObjectId } from 'mongoose';
import { IPasswordResetToken } from '../types/passwordResetToken.types';

export interface PasswordResetTokenDocument extends IPasswordResetToken, Document {
  _id: ObjectId;
};

const PasswordResetTokenSchema = new Schema<PasswordResetTokenDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },

    tokenHash: {
      type: String,
      required: true,
      index: true
    },

    expiresAt: {
      type: Date,
      required: true,
      index: true // ✅ Required for TTL
    },

    usedAt: {
      type: Date
    },

    createdIp: String,
    createdUserAgent: String
  },
  {
    timestamps: true
  }
);

PasswordResetTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const PasswordResetToken = model<PasswordResetTokenDocument>('PasswordResetToken', PasswordResetTokenSchema);