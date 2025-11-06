import { adminUserApi } from './adminUser.api';
import type { AdminUser, FetchUsersParams, PaginatedUsersResponse } from '../types/adminUser.types';

export const adminUserService = {
  async fetchUsers(params: FetchUsersParams): Promise<PaginatedUsersResponse> {
    return await adminUserApi.getAllUsers(params); 
  },

  async blockUser(userId: string): Promise<{ message: string; user: AdminUser }> {
    const response = await adminUserApi.blockUser(userId);
    return { message: response.message, user: response.data };
  },

  async unblockUser(userId: string): Promise<{ message: string; user: AdminUser }> {
    const response = await adminUserApi.unblockUser(userId);
    return { message: response.message, user: response.data };
  }
};