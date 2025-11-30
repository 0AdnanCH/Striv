import { z } from 'zod';
import { updateUserProfileSchema } from '../schemas/updateUserProfile.schema';
import { IUserProfile } from '../types/user.type';

export type UpdateUserProfileRequestDto = z.infer<typeof updateUserProfileSchema>;
export type UpdateUserProfileResponseDto = {
  message: string;
  user: IUserProfile;
};
