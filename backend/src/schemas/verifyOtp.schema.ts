import { z } from 'zod';
import { RESPONSE_MESSAGES } from '../constants/responseMessages.constant';
import { OTP_REGEX } from '../constants/regex.constant';

export const verifyOtpSchema = z.object({
  email: z.email(RESPONSE_MESSAGES.INVALID_CREDENTIALS),
  otp: z
    .string(RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .length(6, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .regex(OTP_REGEX, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
});