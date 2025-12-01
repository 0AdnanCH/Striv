import { useState, useEffect, useCallback } from 'react';
import { clientService } from '../service/client.service';
import type { IClientProfile } from '../types/client.types';
import { toast } from 'sonner';
import { handleApiError } from '../../../utils/handleApiError.util';
import { useAuthContext } from '../../auth/context/AuthContext';

export const useClientProfile = () => {
  const { updateUser } = useAuthContext();
  const [profile, setProfile] = useState<IClientProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingField, setUpdatingField] = useState<string | null>(null);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await clientService.getProfile();
        setProfile(data);
      } catch (error: any) {
        handleApiError('Client Profile Fetch', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle updating fields
  const handleFieldUpdate = useCallback(
    async (field: string, value: string | number) => {
      if(!profile) return;

      setUpdatingField(field);

      const previousValue = profile[field as keyof IClientProfile];
      setProfile((prev) => (prev ? { ...prev, [field]: value } : prev));

      try {
        await clientService.updateProfile({ [field]: value });
        if (field === 'first_name' || field === 'last_name') {
          updateUser({ [field]: value });
        }
        toast.success(`${field.replace('_', ' ')} updated!`);
      } catch (error: any) {
        setProfile((prev) => (prev ? { ...prev, [field]: previousValue } : prev));
        handleApiError('Update Client Profile', error);
      } finally {
        setUpdatingField(null);
      }
    },
    [profile]
  );

  return {
    profile,
    loading,
    updatingField,
    handleFieldUpdate
  };
};