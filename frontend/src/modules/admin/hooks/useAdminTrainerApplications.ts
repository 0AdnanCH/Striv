import { useState, useEffect, useCallback } from 'react';
import { adminTrainerService } from '../service/adminTrainer.service'; 
import type { 
  GetApplicationsParams, 
  TrainerApplicationListItem, 
  PaginationMeta
} from '../types/adminTrainer.types';
import type { TrainerApplicationStatusType } from '../../trainer/constants/trainerApplicationStatus.constant';

export const useAdminTrainerApplications = () => {
  const [data, setData] = useState<TrainerApplicationListItem[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({ total: 0, page: 1, limit: 10, totalPages: 0 });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<GetApplicationsParams>({
    page: 1,
    limit: 5,
    search: ''
  });

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await adminTrainerService.getApplications(filters);
      setData(response.data.data);
      setMeta(response.data.meta);
    } catch (err: any) {
      console.error('Failed to fetch applications:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // We use a debounce for search to prevent API spamming while typing
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchApplications();
    }, 500); // 500ms delay

    return () => clearTimeout(debounceTimer);
  }, [fetchApplications]);

  // 5. Actions (Public Interface)
  const setPage = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const setSearch = (term: string) => {
    setFilters((prev) => ({ ...prev, search: term, page: 1 }));
  };

  const setStatus = (status: string) => {
    setFilters((prev) => ({
      ...prev,
      status: status as TrainerApplicationStatusType,
      page: 1
    }));
  };

  const refresh = () => {
    fetchApplications();
  };

  return {
    data,
    meta,
    loading,
    error,
    filters,
    actions: {
      setPage,
      setSearch,
      setStatus,
      refresh
    }
  };
};