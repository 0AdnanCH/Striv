import axiosClient from "../../../api/axiosClient";
import { UserRole } from "../../../constants/userRole.constant";
import type { IAdminSigninData, IAdminAuthResponse } from "../types/admin.types";

export const adminApi = {
  async signin(data: IAdminSigninData): Promise<IAdminAuthResponse> {
    const response = await axiosClient.post('/admin/signin', data, { role: UserRole.ADMIN });
    return response.data;
  }
}