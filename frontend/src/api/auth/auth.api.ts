import axiosClient from '../axiosClient';
import type { SignInData, SignUpData, AuthResponse } from '../../types';

export const authApi = {
  signUp: async (data: SignUpData): Promise<AuthResponse> => {
    const response = await axiosClient.post('/auth/signup', data);
    return response.data;
  },

  signIn: async (data: SignInData): Promise<AuthResponse> => {
    const response = await axiosClient.post('/auth/signin', data);
    return response.data;
  },
};