import { z } from 'zod';
import { signupSchema } from '../schemas/signup.schema';

export type SignupDto = z.infer<typeof signupSchema>;