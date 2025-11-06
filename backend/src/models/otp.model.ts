import mongoose, { Document, Schema } from "mongoose";

export interface IOTP {
  readonly email: string;
  otp: string;
  expiresAt: Date;
}

export interface OtpDocument extends IOTP, Document {};

const otpSchema = new Schema<OtpDocument>(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true }
  },
  { timestamps: true }
);

otpSchema.index({ email: 1});

const OTPModel = mongoose.model<OtpDocument>('OTP', otpSchema);
export default OTPModel;