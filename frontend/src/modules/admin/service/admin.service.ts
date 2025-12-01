import { adminApi } from "../api/admin.api";
import type { IAdminSigninData, IAdminAuthServiceResponse } from "../types/admin.types";
import { tokenUtils } from "../../../utils/token.utils";
import { UserRole } from "../../../constants/userRole.constant";

export const adminService = {
  async signin(data: IAdminSigninData): Promise<IAdminAuthServiceResponse> {
    const response = await adminApi.signin(data);
    
    tokenUtils.setToken(response.data.token, UserRole.ADMIN);

    return { message: response.message, admin: response.data.admin, token: response.data.token };
  }
};