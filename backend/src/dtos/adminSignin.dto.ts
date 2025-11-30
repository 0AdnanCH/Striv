import { z } from 'zod';
import { signupSchema } from '../schemas/signup.schema';
import { IAuthUser } from '../types/user.type';

export type AdminSigninRequestDto = z.infer<typeof signupSchema>;
export type AdminSigninResponseDto = {
  token: string;
  admin: IAuthUser;

};