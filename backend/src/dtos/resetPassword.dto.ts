import { z } from 'zod';
import { resetPasswordSchema } from '../schemas/resetPassword.schema';

export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;