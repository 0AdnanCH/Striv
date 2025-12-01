import { z } from "zod";
import { OTP_REGEX } from "../../../constants/regex.constant";

export const otpSchema = z.object({
  otp: z
    .string()
    .min(6, 'Please enter a valid 6-digit OTP')
    .regex(OTP_REGEX, 'OTP must be 6 digits')
});

export type OtpSchemaType = z.infer<typeof otpSchema>;