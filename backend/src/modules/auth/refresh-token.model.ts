import mongoose, { Schema, Document } from 'mongoose';

export interface IRefreshToken extends Document {
  user: mongoose.Types.ObjectId;
  token: string;
  expiresAt: Date;
  revokedAt?: Date;
  replacedByToken?: string; // Critical for "Token Rotation" security
  createdAt: Date;
  isValid: boolean; // Virtual helper
}

const RefreshTokenSchema = new Schema<IRefreshToken>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    revokedAt: { type: Date },
    replacedByToken: { type: String }
  },
  { timestamps: true }
);

// Virtual: Check if token is valid (not expired, not revoked)
RefreshTokenSchema.virtual('isValid').get(function (this: IRefreshToken) {
  return !this.revokedAt && !this.replacedByToken && Date.now() < this.expiresAt.getTime();
});

// Optimization: Auto-delete tokens from DB after 7 days (TTL Index)
RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const RefreshTokenModel = mongoose.model<IRefreshToken>('RefreshToken', RefreshTokenSchema);