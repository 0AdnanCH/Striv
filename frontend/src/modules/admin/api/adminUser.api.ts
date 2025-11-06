import axiosClient from '../../../api/axiosClient';
import type { AdminUser, FetchUsersParams, PaginatedUsersResponse } from '../types/adminUser.types';

export const adminUserApi = {
  async getAllUsers(params: FetchUsersParams): Promise<PaginatedUsersResponse> {
    const response = await axiosClient.get('/admin/users', {
      params,
      role: 'admin'
    });
    return response.data;
  },

  async blockUser(userId: string): Promise<{ message: string; success: boolean; data: AdminUser }> {
    const response = await axiosClient.patch(`/admin/users/${userId}/block`, {}, { role: 'admin' });
    return response.data;
  },

  async unblockUser(userId: string): Promise<{ message: string; success: boolean; data: AdminUser }> {
    const response = await axiosClient.patch(`/admin/users/${userId}/unblock`, {}, { role: 'admin' });
    return response.data;
  }
};