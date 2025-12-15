import { useState, useCallback } from 'react';
import type { ITrainerFullInfo } from '../types/trainerApplication.types';  
import { TrainerApplicationStatus } from '../constants/trainerApplicationStatus.constant'; 

export const useTrainerApplicationHub = (initialData: ITrainerFullInfo) => {
  // --- State ---
  const [formData, setFormData] = useState<ITrainerFullInfo>(initialData);
  const [editingSections, setEditingSections] = useState<{ [key: string]: boolean }>({
    personal: false,
    professional: false,
    work: false,
    identity: false
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // --- Computed Properties ---
  const isApplicationEditable = formData.applicationStatus === TrainerApplicationStatus.REVISION_REQUIRED;
  const hasActiveEdits = Object.values(editingSections).some((isEditing) => isEditing);

  // --- Layout Handlers ---
  const toggleSectionEdit = useCallback((section: string) => {
    setEditingSections((prev) => ({ ...prev, [section]: true }));
  }, []);

  const handleCancelSection = useCallback(
    (sectionKey: string, dataKey: keyof ITrainerFullInfo) => {
      setEditingSections((prev) => ({ ...prev, [sectionKey]: false }));
      setFormData((prev) => ({ ...prev, [dataKey]: initialData[dataKey] }));
    },
    [initialData]
  );

  const handleCancelAll = useCallback(() => {
    if (window.confirm('Discard all changes?')) {
      setFormData(initialData);
      setEditingSections({ personal: false, professional: false, work: false, identity: false });
    }
  }, [initialData]);

  const openConfirmModal = () => setShowConfirmModal(true);
  const closeConfirmModal = () => setShowConfirmModal(false);

  // --- Data Update Handlers ---
  const updateSection = useCallback((section: keyof ITrainerFullInfo, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...(prev[section] as any), [field]: value }
    }));
  }, []);

  const updatePortfolio = useCallback((field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      professionalInfo: {
        ...prev.professionalInfo!,
        portfolio: { ...prev.professionalInfo!.portfolio, [field]: value }
      }
    }));
  }, []);

  const updateSocial = useCallback((field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      professionalInfo: {
        ...prev.professionalInfo!,
        portfolio: {
          ...prev.professionalInfo!.portfolio,
          socialLinks: { ...prev.professionalInfo!.portfolio.socialLinks, [field]: value }
        }
      }
    }));
  }, []);

  return {
    state: {
      formData,
      editingSections,
      showConfirmModal
    },
    computed: {
      isApplicationEditable,
      hasActiveEdits
    },
    actions: {
      toggleSectionEdit,
      handleCancelSection,
      handleCancelAll,
      updateSection,
      updatePortfolio,
      updateSocial,
      openConfirmModal,
      closeConfirmModal,
      setFormData 
    }
  };
};
