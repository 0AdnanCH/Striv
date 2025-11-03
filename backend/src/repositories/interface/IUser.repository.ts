import { UserDocument } from "../../models/user.model";
import { IUser } from "../../types/user.type";
import { IBaseRepository } from "./IBase.repository";

export interface IUserRepository extends IBaseRepository<UserDocument> {
  findByEmail(email: string): Promise<UserDocument | null>;
  updateByEmail(email: string, updateData: Partial<IUser>): Promise<UserDocument | null>;
}