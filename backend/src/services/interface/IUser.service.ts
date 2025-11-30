 
import { UpdateUserProfileRequestDto, UpdateUserProfileResponseDto } from "../../dtos/updateUserProfile.dto";
import { UserProfileResponseDto } from "../../dtos/userProfile.dto";

export interface IUserService {
  getCurrentUser(userId: string): Promise<UserProfileResponseDto>;
  updateCurrentUser(userId: string, payload: UpdateUserProfileRequestDto): Promise<UpdateUserProfileResponseDto>;
}