import { FetchUsersQuery } from "../../dtos/adminUser.dto";
import { UserDocument } from "../../models/user.model";
import { PaginatedResult } from "../../types/pagination.types";

export interface IAdminUserService {
  getAllUsers(query: FetchUsersQuery): Promise<PaginatedResult<UserDocument>>;
  blockUser(userId: string): Promise<UserDocument>;
  unblockUser(userId: string): Promise<UserDocument>;
}