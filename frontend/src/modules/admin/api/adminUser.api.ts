import axiosClient from '../../../api/axiosClient';
import { UserRole } from '../../../constants/userRole.constant';
import type { IAdminUser, IFetchUsersParams, IPaginatedUsersResponse } from '../types/adminUser.types';

export const adminUserApi = {
  async getAllUsers(params: IFetchUsersParams): Promise<IPaginatedUsersResponse> {
    const response = await axiosClient.get('/admin/users', {
      params,
      role: UserRole.ADMIN
    });
    return response.data;
  },

  async blockUser(userId: string): Promise<{ message: string; success: boolean; data: IAdminUser }> {
    const response = await axiosClient.patch(`/admin/users/${userId}/block`, {}, { role: UserRole.ADMIN });
    return response.data;
  },

  async unblockUser(userId: string): Promise<{ message: string; success: boolean; data: IAdminUser }> {
    const response = await axiosClient.patch(`/admin/users/${userId}/unblock`, {}, { role: UserRole.ADMIN });
    return response.data;
  }
};