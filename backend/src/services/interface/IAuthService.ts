import { IUser } from "../../types/user.type";

export interface IAuthService {
  signup(user: IUser): Promise<string>;
  signin(email: string, password: string): Promise<string>;
  verifySignUpOtp(email: string, otp: string): Promise<string>;
  resendOtp(email: string): Promise<string>;
}