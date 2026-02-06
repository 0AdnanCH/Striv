import { z } from 'zod';
import { NAME_REGEX, PASSWORD_REGEX } from '../../constants/regex.constant';

// 2. The Schema
export const registerClientSchema = z.object({
  body: z
    .object({
      firstName: z.string().min(2, 'First name must be at least 2 characters').regex(NAME_REGEX, 'First name must start with a letter and contain only letters, numbers, underscores, or hyphens'),

      lastName: z.string().min(2, 'Last name must be at least 2 characters').regex(NAME_REGEX, 'Last name must start with a letter and contain only letters, numbers, underscores, or hyphens'),

      email: z.email('Please provide a valid email address').trim().toLowerCase(),

      password: z.string().regex(PASSWORD_REGEX, 'Password must be 8+ chars, include uppercase, lowercase, number, and special character'),

      confirmPassword: z.string().min(1, 'Please confirm your password'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'] // This attaches the error specifically to the confirmPassword field
    })
});

// 3. The Type Definition
// This extracts the TypeScript type directly from the Zod schema
export type RegisterClientInput = z.infer<typeof registerClientSchema>['body'];