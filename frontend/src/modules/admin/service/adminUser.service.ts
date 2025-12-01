import { adminUserApi } from '../api/adminUser.api';
import type { IAdminUser, IFetchUsersParams, IPaginatedUsersResponse } from '../types/adminUser.types';

export const adminUserService = {
  async fetchUsers(params: IFetchUsersParams): Promise<IPaginatedUsersResponse> {
    return await adminUserApi.getAllUsers(params); 
  },

  async blockUser(userId: string): Promise<{ message: string; user: IAdminUser }> {
    const response = await adminUserApi.blockUser(userId);
    return { message: response.message, user: response.data };
  },

  async unblockUser(userId: string): Promise<{ message: string; user: IAdminUser }> {
    const response = await adminUserApi.unblockUser(userId);
    return { message: response.message, user: response.data };
  }
};