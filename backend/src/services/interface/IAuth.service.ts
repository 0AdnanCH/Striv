import { ObjectId } from "mongoose";
import { UserRole } from "../../constants/roles.constants";
import { IUser } from "../../types/user.type";
import type { ForgotPasswordDto, ResetPasswordDto } from "../../dtos/auth.dto";

export interface IAuthService {
  signup(user: IUser): Promise<string>;
  signin(email: string, password: string): Promise<{ token: string; message: string; user: { id: ObjectId; email: string; role: UserRole; first_name: string; last_name: string } }>;
  verifySignUpOtp(email: string, otp: string): Promise<{ message: string; token: string; user: { id: ObjectId; role: UserRole; email: string; first_name: string; last_name: string } }>;
  resendOtp(email: string): Promise<string>;
  requestPasswordReset(data: ForgotPasswordDto, meta?: { ip?: string; ua?: string }): Promise<{ message: string }>;
  resetPassword(data: ResetPasswordDto): Promise<{ message: string }>;
  signInWithGoogle(accessToken: string): Promise<{
    message: string;
    token: string;
    user: {
      id: string;
      email: string;
      role: string;
      first_name: string;
      last_name: string;
      picture?: string;
    };
  }>;
}