import { UpdateUserProfileDto, UserProfileDto } from "../../dtos/userProfile.dto"; 

export interface IUserService {
  getCurrentUser(userId: string): Promise<UserProfileDto>;
  updateCurrentUser(userId: string, payload: UpdateUserProfileDto): Promise<UserProfileDto>;
}