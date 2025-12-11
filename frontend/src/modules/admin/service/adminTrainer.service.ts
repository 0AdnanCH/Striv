import { adminTrainerApi } from "../api/adminTrainer.api";
import type { GetApplicationsParams, GetApplicationsResponse } from "../types/adminTrainer.types";

export const adminTrainerService = {
  /**
   * Orchestrates fetching the application list.
   * Logic: Delegates to API.
   */
  async getApplications(filters: GetApplicationsParams): Promise<GetApplicationsResponse> {
    const response = await adminTrainerApi.getApplications(filters);
    return response;
  }
};