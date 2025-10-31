import { authApi } from "./auth.api";
import type { SignInData, SignUpData, AuthResponse } from '../../types';

export const authService = {
  async signUp(data: SignUpData): Promise<AuthResponse> {
    const response = await authApi.signUp(data);
    localStorage.setItem('access_token', response.token);
    return response;
  },

  async signIn(data: SignInData): Promise<AuthResponse> {
    const response = await authApi.signIn(data);
    localStorage.setItem('access_token', response.token);
    return response;
  },
  
  signOut() {
    localStorage.removeItem('access_token');
  },
}