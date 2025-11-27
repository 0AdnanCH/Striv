import { ObjectId } from "mongoose";
import { UserRole } from "../../constants/roles.constants";
import { ChangePasswordDto } from "../../dtos/changePassword.dto";
import { ResendOtpDto, VerifyOtpDto } from "../../dtos/verifyOtp.dto";
import { SignupDto } from "../../dtos/signup.dto";
import { ForgotPasswordDto } from "../../dtos/forgotPassword.dto";
import { ResetPasswordDto } from "../../dtos/resetPassword.dto";
import { SigninDto } from "../../dtos/signin.dto";

export interface IAuthService {
  signup(user: SignupDto): Promise<string>;
  signin(data: SigninDto): Promise<{ token: string; message: string; user: { id: ObjectId; email: string; role: UserRole; first_name: string; last_name: string } }>;
  verifySignUpOtp(data: VerifyOtpDto): Promise<{ message: string; token: string; user: { id: ObjectId; role: UserRole; email: string; first_name: string; last_name: string } }>;
  resendOtp({ email }: ResendOtpDto): Promise<string>;
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
  changePassword(userId: string, data: ChangePasswordDto): Promise<{ message: string }>;
}