import { IUserProfile } from "../types/user.type";

export type UserProfileResponseDto = {
  message: string;
  user: IUserProfile
}