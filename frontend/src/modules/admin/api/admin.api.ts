import axiosClient from "../../../api/axiosClient";
import type { AdminSigninData, AdminAuthResponse } from "../types/admin.types";

export const adminApi = {
  async signin(data: AdminSigninData): Promise<AdminAuthResponse> {
    const response = await axiosClient.post('/admin/signin', data, { role: 'admin' });
    return response.data;
  }
}