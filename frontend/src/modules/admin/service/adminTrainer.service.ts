import { adminTrainerApi } from "../api/adminTrainer.api";
import type { GetApplicationDetailsResponse, GetApplicationsParams, GetApplicationsResponse } from "../types/adminTrainer.types";
import type { ApproveApplicationResponse, ITrainerRejectionPayload, RejectApplicationResponse } from "../types/adminTrainerVerification.types";

export const adminTrainerService = {
  /**
   * Orchestrates fetching the application list.
   * Logic: Delegates to API.
   */
  async getApplications(filters: GetApplicationsParams): Promise<GetApplicationsResponse> {
    return await adminTrainerApi.getApplications(filters);
  },

  /**
   * Fetches the complete verification details for a single application.
   * Logic: Delegates to API.
   * @param applicationId - The ID of the TrainerApplication document
   */
  async getApplicationDetails(applicationId: string): Promise<GetApplicationDetailsResponse> {
    return await adminTrainerApi.getApplicationDetails(applicationId);
  },

  /**
   * Approves the application.
   * Logic: Delegates to API.
   * @param applicationId - The ID of the application to be approved
   */
  async approveApplication(applicationId: string): Promise<ApproveApplicationResponse> {
    return await adminTrainerApi.approveApplication(applicationId);
  },

  /**
   * Rejects the application with specific feedback.
   * @param applicationId - The ID of the application
   * @param payload - The structured rejection details (code, feedback, sections)
   */
  async rejectApplication(applicationId: string, payload: ITrainerRejectionPayload): Promise<RejectApplicationResponse> {
    return await adminTrainerApi.rejectApplication(applicationId, payload);
  }
};