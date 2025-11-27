import { z } from 'zod';
import { verifyOtpSchema } from '../schemas/verifyOtp.schema';
import { emailSchema } from '../schemas/email.schema';

export type VerifyOtpDto = z.infer<typeof verifyOtpSchema>;

export type ResendOtpDto = z.infer<typeof emailSchema>;