import { z } from 'zod';

export const emailSchema = z.object({
  email: z.email({ message: 'Please enter a valid email' }).min(1, 'Email is required')
});

export type EmailSchemaType = z.infer<typeof emailSchema>;