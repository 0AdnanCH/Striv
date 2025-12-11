import type { TrainerApplicationStatusType } from "../../trainer/constants/trainerApplicationStatus.constant";

export interface GetApplicationsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: TrainerApplicationStatusType;
  sortBy?: 'submissionDate' | 'firstName' | 'email';
  sortOrder?: 'asc' | 'desc';
}

export interface TrainerApplicationListItem {
  _id: string;
  fullName: string;
  email: string;
  profilePhoto: string;
  status: TrainerApplicationStatusType;
  submittedAt: string; // ISO Date string
  currentStep: number;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetApplicationsResponse {
  success: boolean;
  message: string;
  data: {
    data: TrainerApplicationListItem[];
    meta: PaginationMeta;
  };
}