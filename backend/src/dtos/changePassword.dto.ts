import { z } from 'zod';
import { RESPONSE_MESSAGES } from '../constants/responseMessages.constants';

const passwordRegex = /^(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}\[\]~])[A-Za-z\d!@#$%^&*()_\-+=<>?{}\[\]~]{8,}$/;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string(RESPONSE_MESSAGES.INVALID_CREDENTIALS).min(1, RESPONSE_MESSAGES.INVALID_CREDENTIALS),
    newPassword: z.string(RESPONSE_MESSAGES.INVALID_CREDENTIALS).regex(passwordRegex, RESPONSE_MESSAGES.INVALID_CREDENTIALS),
    confirmPassword: z.string(RESPONSE_MESSAGES.INVALID_CREDENTIALS).regex(passwordRegex, RESPONSE_MESSAGES.INVALID_CREDENTIALS)
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

export type ChangePasswordDto = z.infer<typeof changePasswordSchema>;
