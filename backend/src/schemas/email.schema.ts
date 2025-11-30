import { z } from 'zod';
import { RESPONSE_MESSAGES } from '../constants/responseMessages.constant';

export const emailSchema = z.object({
  email: z.email(RESPONSE_MESSAGES.INVALID_CREDENTIALS).min(1, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
});