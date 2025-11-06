import { useState } from 'react';
import { authService } from '../api/auth.service';
import type { SignupData, SigninData, OtpVerifyData, ModifiedAuthResponse } from '../types/auth.types';
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, login, logout: globalLogout } = useAuthContext();

  const signUp = async (data: SignupData): Promise<{ message: string }> => {
    setLoading(true);
    try {
      const response = await authService.signUp(data);
      toast.success(response.message);

      sessionStorage.setItem('signup_email', data.email);
      navigate('/verify-signup-otp', { state: { email: data.email } });
      return response
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (data: SigninData): Promise<ModifiedAuthResponse> => {
    setLoading(true);
    try {
      const response = await authService.signIn(data);
      login(response.token, response.user, response.user.role);

      toast.success(response.message);
      navigate('/');

      return response;
    } finally {
      setLoading(false);
    }
  };

  const verifySignupOtp = async (data: OtpVerifyData): Promise<ModifiedAuthResponse> => {
    setLoading(true);
    try {
      const response = await authService.verifySignupOtp(data);
      login(response.token, response.user, response.user.role);
      sessionStorage.removeItem('signup_email');
      
      toast.success(response.message);
      navigate('/');

      return response;
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async (email: string): Promise<{ message: string }> => {
    setLoading(true);
    try {
      const response = await authService.resendOtp(email);
      toast.success(response.message);
      return response;
    } finally {
      setLoading(false);
    }
  }

  const logout = () => {
    if(!user) return;

    globalLogout(user.role);

    toast.success('Logged out successfully');
    navigate('/', { replace: true });
  };

  return { signUp, signIn, verifySignupOtp, resendOtp, logout, loading };
};