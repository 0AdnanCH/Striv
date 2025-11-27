import { z } from 'zod';
import { signupSchema } from '../schemas/signup.schema';

export type AdminSigninDto = z.infer<typeof signupSchema>;