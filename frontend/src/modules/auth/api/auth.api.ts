import axiosClient from '../../../api/axiosClient';
import type { ISigninData, ISignupData, IAuthResponse, IOtpVerifyData, IResetPasswordData, IForgotPasswordData } from '../types/auth.types';

export const authApi = {
  signUp: async (data: ISignupData): Promise<{ message: string }> => {
    const response = await axiosClient.post('/auth/signup', data);
    return response.data;
  },

  signIn: async (data: ISigninData): Promise<IAuthResponse> => {
    const response = await axiosClient.post('/auth/signin', data);
    return response.data;
  },

  verifySignupOtp: async (data: IOtpVerifyData): Promise<IAuthResponse> => {
    const response = await axiosClient.post('/auth/verify-signup-otp', data);
    return response.data;
  },

  resendOtp: async (email: string): Promise<{ message: string }> => {
    const response = await axiosClient.post('/auth/resend-otp', { email });
    return response.data;
  },

  forgotPassword: async (data: IForgotPasswordData): Promise<{ message: string }> => {
    const response = await axiosClient.post('/auth/forgot-password', data);
    return response.data;
  },

  resetPassword: async (data: IResetPasswordData): Promise<{ message: string }> => {
    const response = await axiosClient.post('/auth/reset-password', data);
    return response.data;
  },

  googleSignIn: async (token: string): Promise<IAuthResponse> => {
    const response = await axiosClient.post('/auth/google-signin', { token });
    return response.data;
  }
};