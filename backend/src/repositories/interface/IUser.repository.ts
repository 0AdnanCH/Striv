import { FetchUsersQuery } from "../../dtos/adminUser.dto";
import { UserDocument } from "../../models/user.model";
import { PaginatedResult } from "../../types/pagination.types";
import { IUser } from "../../types/user.type";
import { IBaseRepository } from "./IBase.repository";
import { ObjectId } from "mongoose";

export interface IUserRepository extends IBaseRepository<UserDocument> {
  findByEmail(email: string): Promise<UserDocument | null>;
  updateByEmail(email: string, updateData: Partial<IUser>): Promise<UserDocument | null>;
  findWithFilters(query: FetchUsersQuery): Promise<PaginatedResult<UserDocument>>;
  updatePassword(userId: string | ObjectId, hashedPassword: string, session?: any): Promise<void>;
}