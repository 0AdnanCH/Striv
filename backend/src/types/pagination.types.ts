export interface PaginatedResult<T> {
  users: T[];
  total: number;
  page: number;
  limit: number;
}