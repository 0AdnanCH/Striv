import { useState } from 'react';
import type { ResetPasswordData } from '../types/auth.types';
import { authService } from '../api/auth.service';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { handleApiError } from '../../../utils/handleApiError.util';

export function useResetPassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const resetPassword = async (data: Omit<ResetPasswordData, 'token'>) => {
    setLoading(true);
    try {
      const response = await authService.resetPassword(data);
      toast.success(response.message || 'Your password has been reset successfully!');
      setTimeout(() => {
        navigate('/signin', { replace: true });
      }, 1000);
    } catch (error: any) {
      handleApiError('Reset Password', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    resetPassword,
    loading
  };
}
