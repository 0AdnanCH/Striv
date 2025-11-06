export interface FetchUsersQuery {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
}