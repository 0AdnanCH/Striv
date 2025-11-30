import { z } from 'zod';
import { verifyOtpSchema } from '../schemas/verifyOtp.schema';
import { emailSchema } from '../schemas/email.schema';
import { IAuthUser } from '../types/user.type';

export type VerifyOtpRequestDto = z.infer<typeof verifyOtpSchema>;
export type VerifyOtpResponseDto = {
  message: string;
  token: string;
  user: IAuthUser;
}

export type ResendOtpDto = z.infer<typeof emailSchema>;