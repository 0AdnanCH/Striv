import { useState } from 'react';
import { authService } from '../service/auth.service';
import type { IForgotPasswordData } from '../types/auth.types';

export function useForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const forgotPassword = async (data: IForgotPasswordData) => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await authService.forgotPassword(data);
      setMessage(response.message);
    } catch (error: any) {
      console.error('Forgot password error:', error);
      setMessage(error.response?.data?.message || 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return {
    forgotPassword,
    loading,
    message
  };
}