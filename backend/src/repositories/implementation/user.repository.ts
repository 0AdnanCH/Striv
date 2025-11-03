import { IUserRepository } from "../interface/IUser.repository";
import { BaseRepository } from "../base.repository";
import { IUser } from "../../types/user.type";
import { User, UserDocument } from "../../models/user.model";

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
}