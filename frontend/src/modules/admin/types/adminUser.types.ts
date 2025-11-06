export interface AdminUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: 'admin' | 'trainer' | 'client';
  isVerified: boolean;
  isBlocked: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface FetchUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
}

export interface PaginatedUsersResponse {
  data: {
    users: AdminUser[];
    total: number;
    page: number;
    limit: number;
  };
  message: string;
  success: string;
}