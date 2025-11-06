import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../api/admin.service';
import type { AdminSigninData, ModifiedAdminAuthResponse } from '../types/admin.types';
import { toast } from 'sonner';
import { handleApiError } from '../../../utils/handleApiError.util';
import { useAuthContext } from '../../auth/context/AuthContext';

export const useAdminAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, logout: globalLogout } = useAuthContext();
  
  const signin = async (data: AdminSigninData): Promise<void> => {
    try {
      setLoading(true);

      const response: ModifiedAdminAuthResponse = await adminService.signin(data);
      login(response.token, response.admin, 'admin');

      toast.success(response.message);

      navigate('/admin/dashboard');
    } catch (error: any) {
      handleApiError('Admin signin', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    globalLogout('admin');
    toast.success('Logged out successfully');
    navigate('/admin/signin', { replace: true });
  };

  return {
    signin,
    logout,
    loading,
  };
};