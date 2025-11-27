import { z } from 'zod';
import { RESPONSE_MESSAGES } from '../constants/responseMessages.constants';

export const verifyOtpSchema = z.object({
  email: z.email(RESPONSE_MESSAGES.INVALID_CREDENTIALS),
  otp: z
    .string(RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .length(6, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
    .regex(/^\d{6}$/, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
});