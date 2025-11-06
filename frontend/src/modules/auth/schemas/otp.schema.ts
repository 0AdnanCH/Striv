import { z } from "zod";

export const otpSchema = z.object({
  otp: z
    .string()
    .min(6, 'Please enter a valid 6-digit OTP')
    .regex(/^\d{6}$/, 'OTP must be 6 digits')
});

export type OtpSchema = z.infer<typeof otpSchema>;