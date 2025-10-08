import { IUserRepository } from "../interface/IUserRepository";
import { BaseRepository } from "../base.repository";
import { IUser } from "../../types/user.type";
import { User, UserDocument } from "../../models/user.model";

export class UserRepository extends BaseRepository<UserDocument> implements IUserRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email }).lean();
  }
}