import { TrainerApplicationStatus } from "../constants/enums.constant"; 

export interface GetApplicationsFilterDto {
  page?: number;
  limit?: number;
  search?: string;
  status?: TrainerApplicationStatus;
  sortBy?: 'submissionDate' | 'firstName' | 'email';
  sortOrder?: 'asc' | 'desc';
}

export interface TrainerApplicationListItemDto {
  applicationId: string;
  fullName: string;
  email: string;
  profilePhoto: string;
  status: TrainerApplicationStatus;
  submittedAt: Date;
  currentStep: number;
}

export interface PaginatedApplicationResponseDto {
  data: TrainerApplicationListItemDto[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
