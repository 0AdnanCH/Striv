import { z } from 'zod';
import { changePasswordSchema } from '../schemas/changePassword.schema'; 

export type ChangePasswordDto = z.infer<typeof changePasswordSchema>;
