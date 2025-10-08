import { IUser } from "../../types/user.type";

export interface IUserRepository {
  findByEmail(email: string): Promise<IUser | null>;
  create(userData: IUser): Promise<IUser>;
}