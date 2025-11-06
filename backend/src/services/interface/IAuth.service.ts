import { ObjectId } from "mongoose";
import { UserRole } from "../../constants/roles.constants";
import { IUser } from "../../types/user.type";

export interface IAuthService {
  signup(user: IUser): Promise<string>;
  signin(email: string, password: string): Promise<{ token: string; message: string; user: { id: ObjectId; email: string; role: UserRole; first_name: string; last_name: string } }>;
  verifySignUpOtp(email: string, otp: string): Promise<{ message: string; token: string; user: { id: ObjectId; role: UserRole; email: string; first_name: string; last_name: string } }>;
  resendOtp(email: string): Promise<string>;
}