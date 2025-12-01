import { z } from 'zod';
import { IAuthUser } from '../types/user.type';
import { signinSchema } from '../schemas/signin.schema';

export type AdminSigninRequestDto = z.infer<typeof signinSchema>;
export type AdminSigninResponseDto = {
  token: string;
  admin: IAuthUser;

};