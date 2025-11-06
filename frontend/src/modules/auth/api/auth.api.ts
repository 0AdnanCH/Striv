import axiosClient from '../../../api/axiosClient';
import type { SigninData, SignupData, AuthResponse, OtpVerifyData } from '../types/auth.types';

export const authApi = {
  signUp: async (data: SignupData): Promise<{ message: string }> => {
    const response = await axiosClient.post('/auth/signup', data);
    return response.data;
  },

  signIn: async (data: SigninData): Promise<AuthResponse> => {
    const response = await axiosClient.post('/auth/signin', data);
    return response.data;
  },

  verifySignupOtp: async (data: OtpVerifyData): Promise<AuthResponse> => {
    const response = await axiosClient.post('/auth/verify-signup-otp', data);
    return response.data;
  },

  resendOtp: async (email: string): Promise<{ message: string }> => {
    const response = await axiosClient.post('/auth/resend-otp', { email });
    return response.data;
  }
};