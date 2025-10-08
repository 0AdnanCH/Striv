import { IUser } from "../../types/user.type";

export interface IAuthService {
  signup(user: IUser): Promise<string>;
  signin(email: string, password: string): Promise<string>;
}