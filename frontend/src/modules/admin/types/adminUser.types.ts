import type { UserRoleType } from "../../../constants/userRole.constant";

export interface IAdminUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRoleType;
  isVerified: boolean;
  isBlocked: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IFetchUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRoleType;
  status?: string;
}

export interface IPaginatedUsersResponse {
  data: {
    users: IAdminUser[];
    total: number;
    page: number;
    limit: number;
  };
  message: string;
  success: string;
}