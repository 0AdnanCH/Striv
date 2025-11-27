import { z } from 'zod';
import { signinSchema } from '../schemas/signin.schema';

export type SigninDto = z.infer<typeof signinSchema>;