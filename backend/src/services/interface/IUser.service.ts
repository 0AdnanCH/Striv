import { UpdateUserProfileDto, UserProfileDto } from "../../dtos/userProfile.dto"; 
import { UserProfileFetchResponse, UserProfileUpdateResponse } from "../../types/user.type";

export interface IUserService {
  getCurrentUser(userId: string): Promise<UserProfileFetchResponse>;
  updateCurrentUser(userId: string, payload: UpdateUserProfileDto): Promise<UserProfileUpdateResponse>;
}