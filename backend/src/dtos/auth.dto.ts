import { z } from 'zod';

export const ForgotPasswordDto = z.object({
  email: z.email({ message: 'Please provide a valid email address' }).min(1, 'Email is required')
});

export type ForgotPasswordDto = z.infer<typeof ForgotPasswordDto>;

export const ResetPasswordDto = z.object({
  token: z.string().min(10, 'Invalid or malformed token'),

  password: z.string().min(8, 'Password must be at least 8 characters long')
});

export type ResetPasswordDto = z.infer<typeof ResetPasswordDto>;