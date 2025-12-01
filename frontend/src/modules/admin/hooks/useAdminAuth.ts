import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../service/admin.service';
import type { IAdminSigninData, IAdminAuthServiceResponse } from '../types/admin.types';
import { toast } from 'sonner';
import { handleApiError } from '../../../utils/handleApiError.util';
import { useAuthContext } from '../../auth/context/AuthContext';
import { UserRole } from '../../../constants/userRole.constant';

export const useAdminAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, logout: globalLogout } = useAuthContext();
  
  const signin = async (data: IAdminSigninData): Promise<void> => {
    try {
      setLoading(true);

      const response: IAdminAuthServiceResponse = await adminService.signin(data);
      login(response.token, response.admin, UserRole.ADMIN);

      toast.success(response.message);

      navigate('/admin/dashboard');
    } catch (error: any) {
      handleApiError('Admin signin', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    globalLogout(UserRole.ADMIN);
    toast.success('Logged out successfully');
    navigate('/admin/signin', { replace: true });
  };

  return {
    signin,
    logout,
    loading,
  };
};