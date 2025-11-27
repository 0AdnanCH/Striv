import { z } from 'zod';
import { emailSchema } from '../schemas/email.schema';

export type ForgotPasswordDto = z.infer<typeof emailSchema>;