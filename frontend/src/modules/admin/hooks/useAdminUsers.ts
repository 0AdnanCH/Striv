import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { adminUserService } from '../service/adminUser.service';
import type { IAdminUser } from '../types/adminUser.types';

export const useAdminUsers = (intitialPage = 1, limit = 10) => {
  // -- STATE MANAGEMENT --
  const [users, setUsers] = useState<IAdminUser[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(intitialPage);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- API CALL ---
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page,
        limit,
        search: search.trim(),
        ...filters
      };

      const response = await adminUserService.fetchUsers(params);

      setUsers(response.data.users || []);
      setTotal(response.data.total || 0);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch users');
      setUsers([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, filters]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // -- HANDLES --
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= Math.ceil(total / limit)) {
      setPage(newPage);
    }
  };

  const handleSearch = (query: string) => {
    setSearch(query);
    setPage(1);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  // ---------- HANDLE BLOCK USER  ----------
  const handleBlockUser = useCallback(async (userId: string) => {
    try {
      const { message } = await adminUserService.blockUser(userId);

      setUsers((prevUsers) => prevUsers.map((u) => (u._id === userId ? { ...u, isBlocked: true } : u)));

      toast.success(message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to block user');
    }
  }, []);

  // ---------- UNBLOCK USER ----------
  const handleUnblockUser = useCallback(async (userId: string) => {
    try {
      const { message } = await adminUserService.unblockUser(userId);

      setUsers((prevUsers) => prevUsers.map((u) => (u._id === userId ? { ...u, isBlocked: false } : u)));

      toast.success(message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to unblock user');
    }
  }, []);

  return {
    users,
    total,
    page,
    loading,
    error,
    search,
    filters,
    handlePageChange,
    handleSearch,
    handleFilterChange,
    handleBlockUser,
    handleUnblockUser,
    refetch: fetchUsers
  };
}