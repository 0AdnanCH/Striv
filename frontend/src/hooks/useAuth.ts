import { useState } from 'react';
import { authService } from '../api/auth/auth.service';
import type { SignUpData, SignInData, AuthResponse } from '../types';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const signUp = async (data: SignUpData): Promise<AuthResponse> => {
    setLoading(true);
    try {
      return await authService.signUp(data);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (data: SignInData): Promise<AuthResponse> => {
    setLoading(true);
    try {
      return await authService.signIn(data);
    } finally {
      setLoading(false);
    }
  };

  return { signUp, signIn, loading };
};