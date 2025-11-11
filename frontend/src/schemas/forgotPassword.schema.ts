import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.email({ message: 'Please enter a valid email' }).min(1, 'Email is required')
});
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;