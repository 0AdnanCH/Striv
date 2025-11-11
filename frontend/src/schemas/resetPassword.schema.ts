import { z } from 'zod';

const passwordRegex = /^(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}\[\]~])[A-Za-z\d!@#$%^&*()_\-+=<>?{}\[\]~]{8,}$/;

export const resetPasswordSchema = z
  .object({
    password: z
      .string({ error: (iss) => (iss.input === undefined ? 'Password is required' : 'Password must be at least 8 characters and include uppercase, lowercase, number, and symbol') })
      .regex(passwordRegex, 'Password must be at least 8 characters and include uppercase, lowercase, number, and symbol'),
    confirm_password: z.string('Confirm your password')
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password']
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;