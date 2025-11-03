import { useState } from 'react';
import { authService } from '../api/auth/auth.service';
import type { SignUpData, SignInData, AuthResponse, OtpVerifyData } from '../types';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const signUp = async (data: SignUpData): Promise<{ message: string }> => {
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

  const verifySignupOtp = async (data: OtpVerifyData): Promise<AuthResponse> => {
    setLoading(true);
    try {
      return await authService.verifySignupOtp(data);
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async (email: string): Promise<{ message: string }> => {
    setLoading(true);
    try {
      return await authService.resendOtp(email);
    } finally {
      setLoading(false);
    }
  }

  return { signUp, signIn, verifySignupOtp, resendOtp, loading };
};