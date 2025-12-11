import axiosClient from "../../../api/axiosClient";
import { UserRole } from "../../../constants/userRole.constant";
import type { GetApplicationsParams, GetApplicationsResponse } from "../types/adminTrainer.types";

export const adminTrainerApi = {
  /**
   * Fetches paginated trainer applications with filters
   * URL: /admin/trainer/applications
   */
  async getApplications(params: GetApplicationsParams): Promise<GetApplicationsResponse> {
    const response = await axiosClient.get<GetApplicationsResponse>(
      '/admin/trainer/applications', 
      { 
        params: params,
        role: UserRole.ADMIN
      }
    );
    return response.data;
  }
};