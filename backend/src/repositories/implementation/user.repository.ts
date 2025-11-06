import { IUserRepository } from "../interface/IUser.repository";
import { BaseRepository } from "../base.repository";
import { IUser } from "../../types/user.type";
import { User, UserDocument } from "../../models/user.model";
import { FetchUsersQuery } from "../../dtos/adminUser.dto";
import { PaginatedResult } from "../../types/pagination.types";

export class UserRepository extends BaseRepository<UserDocument> implements IUserRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return await User.findOne({ email }).lean();
  }

  async updateByEmail(email: string, updateData: Partial<IUser>): Promise<UserDocument | null> {
    return await this.model.findOneAndUpdate({ email }, updateData, { new: true });
  }

  async findWithFilters({ page = 1, limit = 10, search, role, status }: FetchUsersQuery): Promise<PaginatedResult<UserDocument>> {
    const filter: Record<string, any> = {};

    if(search) {
      filter.$or = [
        { first_name: { $regex: search, $options: "i" } },
        { last_name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if(role) filter.role = role.toLowerCase();
    if(status) filter.isVerified = status.toLowerCase() === 'verified';

    const skip = (page - 1) * limit;
    const users = await this.model.find(filter).skip(skip).limit(limit);
    const total = await this.model.countDocuments(filter);

    return { users, total, page, limit };
  }
}