import { z } from 'zod';
import { signinSchema } from '../schemas/signin.schema';
import { IAuthUser } from '../types/user.type';

export type SigninRequestDto = z.infer<typeof signinSchema>;

export type SigninResponseDto = {
  message: string;
  token: string;
  user: IAuthUser;
};