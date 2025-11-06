import { z } from 'zod';

/** Validation schema for SignIn form */
export const signinSchema = z.object({
  email: z.email({ message: 'Enter a valid email address' }),
  password: z.string('Password is required').min(1, { message: 'Password is required' })
});

export type SigninSchema = z.infer<typeof signinSchema>;