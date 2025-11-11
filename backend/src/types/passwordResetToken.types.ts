import { ObjectId } from "mongoose";

export interface IPasswordResetToken {
  userId: ObjectId;
  tokenHash: string;
  expiresAt: Date;
  usedAt?: Date;
  createdIp?: string;
  createdUserAgent?: string;
  createdAt: Date;
  updatedAt: Date;
};