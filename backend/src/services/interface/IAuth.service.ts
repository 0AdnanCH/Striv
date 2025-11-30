import { ObjectId } from "mongoose";
import { UserRole } from "../../constants/enums.constant"; 
import { ChangePasswordDto } from "../../dtos/changePassword.dto";
import { ResendOtpDto, VerifyOtpRequestDto, VerifyOtpResponseDto } from "../../dtos/verifyOtp.dto";
import { SignupDto } from "../../dtos/signup.dto";
import { ForgotPasswordDto } from "../../dtos/forgotPassword.dto";
import { ResetPasswordDto } from "../../dtos/resetPassword.dto";
import { SigninRequestDto, SigninResponseDto } from "../../dtos/signin.dto";

export interface IAuthService {
  signup(user: SignupDto): Promise<string>;
  signin(data: SigninRequestDto): Promise<SigninResponseDto>;
  verifySignUpOtp(data: VerifyOtpRequestDto): Promise<VerifyOtpResponseDto>;
  resendOtp({ email }: ResendOtpDto): Promise<string>;
  requestPasswordReset(data: ForgotPasswordDto, meta?: { ip?: string; ua?: string }): Promise<{ message: string }>;
  resetPassword(data: ResetPasswordDto): Promise<{ message: string }>;
  signInWithGoogle(accessToken: string): Promise<SigninResponseDto>;
  changePassword(userId: string, data: ChangePasswordDto): Promise<{ message: string }>;
}