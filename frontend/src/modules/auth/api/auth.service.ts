import { authApi } from "./auth.api";
import type { SigninData, SignupData, OtpVerifyData, ModifiedAuthResponse, ResetPasswordData, ForgotPasswordData } from '../types/auth.types';
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

  async forgotPassword(data: ForgotPasswordData): Promise<{ message: string }> {
    return authApi.forgotPassword(data);
  },

  async resetPassword(data: Omit<ResetPasswordData, 'token'>): Promise<{ message: string }> {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token || token.trim().length < 10) {
      throw new Error('Invalid or missing password reset token.');
    }

    return await authApi.resetPassword({ ...data, token });
  },

  async googleSignIn(googleIdToken: string): Promise<ModifiedAuthResponse> {
    const response = await authApi.googleSignIn(googleIdToken);
    tokenUtils.setToken(response.data.token);
    return {
      message: response.message,
      user: response.data.user,
      token: response.data.token,
    };
  },

  signOut() {
    tokenUtils.clearToken();
  }
};