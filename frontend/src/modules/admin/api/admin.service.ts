import { adminApi } from "./admin.api";
import type { AdminSigninData, ModifiedAdminAuthResponse } from "../types/admin.types";
import { tokenUtils } from "../../../utils/token.utils";

export const adminService = {
  async signin(data: AdminSigninData): Promise<ModifiedAdminAuthResponse> {
    const response = await adminApi.signin(data);
    
    tokenUtils.setToken(response.data.token, 'admin');

    return { message: response.message, admin: response.data.admin, token: response.data.token };
  }
};