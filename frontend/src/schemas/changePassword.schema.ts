import { z } from 'zod';
import { REGEX_LOWERCASE, REGEX_NO_WHITESPACE, REGEX_NUMBER, REGEX_SPECIAL_CHAR, REGEX_UPPERCASE } from '../constants/regex.constant';

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),

    newPassword: z
      .string('Password is required')
      .min(8, 'New password must be at least 8 characters')
      .regex(REGEX_NO_WHITESPACE, 'Must not contain any spaces')
      .regex(REGEX_UPPERCASE, 'Must include at least one uppercase letter')
      .regex(REGEX_LOWERCASE, 'Must include at least one lowercase letter')
      .regex(REGEX_NUMBER, 'Must include at least one number')
      .regex(REGEX_SPECIAL_CHAR, 'Must include at least one special character'),

    confirmPassword: z.string().min(1, 'Please confirm your new password')
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'New password and confirm password do not match',
    path: ['confirmPassword']
  });

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;