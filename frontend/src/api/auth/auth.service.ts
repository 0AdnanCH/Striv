import { authApi } from "./auth.api";
import type { SignInData, SignUpData, AuthResponse, OtpVerifyData } from '../../types';

export const authService = {
  async signUp(data: SignUpData): Promise<{ message: string }> {
    const response = await authApi.signUp(data);
    return response;
  },

  async signIn(data: SignInData): Promise<AuthResponse> {
    const response = await authApi.signIn(data);
    localStorage.setItem('access_token', response.token);
    return response;
  },

  async verifySignupOtp(data: OtpVerifyData): Promise<AuthResponse> {
    const response = await authApi.verifySignupOtp(data);
    localStorage.setItem('access_token', response.token);
    return response;
  },

  async resendOtp(email: string): Promise<{ message: string }> {
    const response = await authApi.resendOtp(email);
    return response;
  },
  
  signOut() {
    localStorage.removeItem('access_token');
  },
}