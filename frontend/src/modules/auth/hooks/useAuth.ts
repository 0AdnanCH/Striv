import { useState } from 'react';
import { authService } from '../service/auth.service';
import type { ISignupData, ISigninData, IOtpVerifyData } from '../types/auth.types';
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useOtpCooldown } from './useOtpCooldown';
import { OTP_COOLDOWN_SECONDS, OTP_COOLDOWN_STORAGE_KEY } from '../../../constants/otp.constant'; 
import { handleApiError } from '../../../utils/handleApiError.util';
import { useGoogleLogin } from '@react-oauth/google';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, login, logout: globalLogout } = useAuthContext();

  const { startCooldown } = useOtpCooldown({
    duration: OTP_COOLDOWN_SECONDS,
    storageKey: OTP_COOLDOWN_STORAGE_KEY,
  });

  const handleGoogleSuccess = async (token: string) => {
    setLoading(true);
    try {
      const response = await authService.googleSignIn(token);
      login(response.token, response.user, response.user.role);
      toast.success(response.message);
      navigate('/');
    } catch (error: any) {
      handleApiError('Google Signin', error);
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const accessToken = tokenResponse?.access_token;
        if (accessToken) {
          await handleGoogleSuccess(accessToken);
        } else {
          toast.error('Unable to authenticate with Google.');
        }
      } catch (error) {
        console.error('Google login error:', error);
        toast.error('Something went wrong during Google Sign-In.');
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      toast.error('Google sign-in was cancelled or failed.');
      setLoading(false);
    }
  });

  const signUp = async (data: ISignupData) => {
    setLoading(true);
    try {
      const response = await authService.signUp(data);
      toast.success(response.message);

      sessionStorage.setItem('signup_email', data.email);

      startCooldown();

      navigate('/verify-signup-otp', { state: { email: data.email } });
    } catch(error: any) {
      handleApiError('Auth Signup', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (data: ISigninData) => {
    setLoading(true);
    try {
      const response = await authService.signIn(data);
      login(response.token, response.user, response.user.role);

      toast.success(response.message);
      navigate('/');
    } catch(error: any) {
      handleApiError('Auth Signin', error);
    } finally {
      setLoading(false);
    }
  };

  const verifySignupOtp = async (data: IOtpVerifyData) => {
    setLoading(true);
    try {
      const response = await authService.verifySignupOtp(data);
      login(response.token, response.user, response.user.role);
      sessionStorage.removeItem('signup_email');
      
      toast.success(response.message);
      navigate('/');
    } catch(error: any) {
      handleApiError('Auth Verify Signup Otp', error);
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

  return { signUp, signIn, verifySignupOtp, resendOtp, logout, googleLogin, loading };
};