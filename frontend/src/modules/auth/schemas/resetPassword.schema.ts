import { z } from 'zod';
import { REGEX_LOWERCASE, REGEX_NO_WHITESPACE, REGEX_NUMBER, REGEX_SPECIAL_CHAR, REGEX_UPPERCASE } from '../../../constants/regex.constant';

export const resetPasswordSchema = z
  .object({
    password: z
      .string('Password is required')
      .min(8, 'New password must be at least 8 characters')
      .regex(REGEX_NO_WHITESPACE, 'Must not contain any spaces')
      .regex(REGEX_UPPERCASE, 'Must include at least one uppercase letter')
      .regex(REGEX_LOWERCASE, 'Must include at least one lowercase letter')
      .regex(REGEX_NUMBER, 'Must include at least one number')
      .regex(REGEX_SPECIAL_CHAR, 'Must include at least one special character'),
    confirm_password: z.string('Confirm your password')
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password']
  });

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;