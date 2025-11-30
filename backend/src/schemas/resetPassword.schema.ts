import { z } from 'zod';
import { RESPONSE_MESSAGES } from '../constants/responseMessages.constant';

export const resetPasswordSchema = z.object({
  token: z.string().min(10, RESPONSE_MESSAGES.INVALID_CREDENTIALS),
  password: z.string().min(8, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
});