import { z } from 'zod';
import { RESPONSE_MESSAGES } from '../constants/responseMessages.constant';
import { PASSWORD_REGEX } from '../constants/regex.constant';

export const changePasswordSchema = z
  .object({
    currentPassword: z.string(RESPONSE_MESSAGES.INVALID_CREDENTIALS).min(1, RESPONSE_MESSAGES.INVALID_CREDENTIALS),
    newPassword: z.string(RESPONSE_MESSAGES.INVALID_CREDENTIALS).regex(PASSWORD_REGEX, RESPONSE_MESSAGES.INVALID_CREDENTIALS),
    confirmPassword: z.string(RESPONSE_MESSAGES.INVALID_CREDENTIALS).regex(PASSWORD_REGEX, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    error: RESPONSE_MESSAGES.INVALID_CREDENTIALS,
    path: ['confirmPassword']
  });
