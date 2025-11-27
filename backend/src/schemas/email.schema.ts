import { z } from 'zod';
import { RESPONSE_MESSAGES } from '../constants/responseMessages.constants';

export const emailSchema = z.object({
  email: z.email(RESPONSE_MESSAGES.INVALID_CREDENTIALS).min(1, 'Email is required')
});
