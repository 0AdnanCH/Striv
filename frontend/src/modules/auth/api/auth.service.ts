import { authApi } from "./auth.api";
import type { SigninData, SignupData, OtpVerifyData, ModifiedAuthResponse, ResetPasswordData } from '../types/auth.types';
import { tokenUtils } from "../../../utils/token.utils";

export const authService = {
  async signUp(data: SignupData): Promise<{ message: string }> {
    const response = await authApi.signUp(data);
    return response;
  },

  async signIn(data: SigninData): Promise<ModifiedAuthResponse> {
    const response = await authApi.signIn(data);
    tokenUtils.setToken(response.data.token);
    return { message: response.message, user: response.data.user, token: response.data.token };
  },

  async verifySignupOtp(data: OtpVerifyData): Promise<ModifiedAuthResponse> {
    const response = await authApi.verifySignupOtp(data);
    tokenUtils.setToken(response.data.token);
    return { message: response.message, user: response.data.user, token: response.data.token };
  },

  async resendOtp(email: string): Promise<{ message: string }> {
    return await authApi.resendOtp(email);
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    return authApi.forgotPassword(email);
  },

  async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
    return authApi.resetPassword(data);
  },

  signOut() {
    tokenUtils.clearToken();
  }
};