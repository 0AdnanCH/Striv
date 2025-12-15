import axiosClient from "../../../api/axiosClient";
import { UserRole } from "../../../constants/userRole.constant";
import type { GetApplicationDetailsResponse, GetApplicationsParams, GetApplicationsResponse } from "../types/adminTrainer.types";
import type { ApproveApplicationResponse, ITrainerRejectionPayload, RejectApplicationResponse } from "../types/adminTrainerVerification.types";

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
  },

  /**
   * Fetches full aggregate details of a trainer application for verification
   * URL: /admin/trainer/application/:id/details
   */
  async getApplicationDetails(applicationId: string): Promise<GetApplicationDetailsResponse> {
    const response = await axiosClient.get<GetApplicationDetailsResponse>(
      `/admin/trainer/application/${applicationId}/details`,
      { 
        role: UserRole.ADMIN 
      }
    );
    return response.data;
  },

  /**
   * Approves a trainer application and promotes the user to Trainer role.
   * URL: /admin/trainer/application/:id/approve
   * Method: PATCH
   */
  async approveApplication(applicationId: string): Promise<ApproveApplicationResponse> {
    const response = await axiosClient.patch<ApproveApplicationResponse>(
      `/admin/trainer/application/${applicationId}/approve`,
      {}, 
      { 
        role: UserRole.ADMIN 
      }
    );
    return response.data;
  },

  /**
   * Rejects a trainer application and requests changes.
   * URL: /admin/trainer/application/:id/reject
   * Method: PATCH
   * Body: { feedback: IRejectionPayload }
   */
  async rejectApplication(applicationId: string, rejectionData: ITrainerRejectionPayload): Promise<RejectApplicationResponse> {
    const response = await axiosClient.patch<RejectApplicationResponse>(
      `/admin/trainer/application/${applicationId}/reject`,
      { 
        feedback: rejectionData
      }, 
      { 
        role: UserRole.ADMIN 
      }
    );
    return response.data;
  }
};