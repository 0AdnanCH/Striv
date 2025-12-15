import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner'; 
import { adminTrainerService } from '../service/adminTrainer.service';
import type { 
  VerificationState, 
  RejectionFeedback, 
  ITrainerRejectionPayload
} from '../types/adminTrainerVerification.types';
import type { GetApplicationDetailsResponse } from '../types/adminTrainer.types';
import { handleApiError } from '../../../utils/handleApiError.util';

export const useTrainerVerification = () => {
  const navigate = useNavigate();

  // --- Data State ---
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trainerData, setTrainerData] = useState<GetApplicationDetailsResponse['data'] | null>(null);

  // ---  UI State ---
  const [activeTab, setActiveTab] = useState<keyof VerificationState>('personal');

  // ---  Verification Logic State ---
  const [verificationStatus, setVerificationStatus] = useState<VerificationState>({
    personal: 'PENDING',
    professional: 'PENDING',
    work: 'PENDING',
    identity: 'PENDING'
  });

  const [feedback, setFeedback] = useState<RejectionFeedback>({
    personal: '',
    professional: '',
    work: '',
    identity: ''
  });

  // --- Computed Values ---
  const isAllValid = Object.values(verificationStatus).every((s) => s === 'VALID');
  const hasRejections = Object.values(verificationStatus).some((s) => s === 'INVALID');
  const completedCount = Object.values(verificationStatus).filter((s) => s === 'VALID').length;

  const loadApplicationData = useCallback(async (applicationId: string) => {
    if (!applicationId) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await adminTrainerService.getApplicationDetails(applicationId);

      if (response.success) {
        setTrainerData(response.data);
        // Optional: Reset verification status here if needed
      } else {
        setError(response.message || 'Failed to fetch application details');
        toast.error(response.message || 'Error loading data');
      }
    } catch (err: any) {
      const msg = err.message || 'An unexpected error occurred';
      setError(msg);
      toast.error('Failed to load application data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // --- Handlers ---
  const handleVerifySection = useCallback((section: keyof VerificationState, isValid: boolean) => {
    setVerificationStatus((prev) => ({
      ...prev,
      [section]: isValid ? 'VALID' : 'INVALID'
    }));

    if (isValid) {
      setFeedback((prev) => ({ ...prev, [section]: '' }));
    }
  }, []);

  const handleFeedbackChange = useCallback((section: keyof VerificationState, value: string) => {
    setFeedback((prev) => ({ ...prev, [section]: value }));
  }, []);

  // --- HELPER: Validation Strategy ---
  /**
   * Validates that every section marked as INVALID has a corresponding reason.
   * Returns true if valid, otherwise triggers a toast and returns false.
   */
  const validateRejectionInput = (): boolean => {
    // Get all sections that are strictly INVALID
    const invalidSections = (Object.keys(verificationStatus) as Array<keyof VerificationState>)
      .filter((key) => verificationStatus[key] === 'INVALID');

    // Check if there are any rejections at all
    if (invalidSections.length === 0) {
       toast.error("Please flag at least one section to request changes.");
       return false;
    }

    // Find the first invalid section that is missing feedback
    const missingFeedbackSection = invalidSections.find(
      (section) => !feedback[section] || feedback[section].trim().length === 0
    );

    // Alert the user specifically
    if (missingFeedbackSection) {
      const sectionName = missingFeedbackSection.charAt(0).toUpperCase() + missingFeedbackSection.slice(1);
      
      toast.error(`Please provide a rejection reason for the ${sectionName} section.`);
      
      // Auto-switch to that tab so the user can see it immediately
      setActiveTab(missingFeedbackSection);
      
      return false;
    }

    return true;
  };

  // --- HELPER: Payload Factory ---
  /**
   * Transforms UI State (verificationStatus + feedback) into Backend DTO.
   * This decouples the UI from the API contract.
   */
  const createRejectionPayload = (): ITrainerRejectionPayload  => {
    // Identify which sections failed
    const failedSections = (Object.keys(verificationStatus) as Array<keyof VerificationState>).filter((key) => verificationStatus[key] === 'INVALID');

    // Aggregate Feedback: Combine distinct comments into one readable string
    // Format: "IDENTITY: Image is blurry. \n PROFESSIONAL: Certificate expired."
    const aggregatedFeedback = Object.entries(feedback)
      .filter(([key, value]) => failedSections.includes(key as keyof VerificationState) && value.trim().length > 0)
      .map(([key, value]) => `${key.toUpperCase()}: ${value.trim()}`)
      .join('\n\n');

    // 3. Construct the Payload matching the backend
    return {
      code: 'DATA_CORRECTION_REQUIRED',
      reasonTemplate: 'Application Data Needs Correction',
      adminFeedback: aggregatedFeedback,
      failedSections: failedSections
    };
  };

  /**
   * Submits the approval request to the backend.
   * STRICT: Only proceeds if trainerData exists AND all sections are VALID.
   */
  const submitApproval = async () => {
    if (!trainerData) return;

    if (!isAllValid) {
      toast.error('Cannot approve: All sections must be marked as VALID.');
      return;
    }
    try {
      setIsSubmitting(true);

      // Call Service
      const response = await adminTrainerService.approveApplication(trainerData.applicationId);

      toast.success(response.message);

      navigate('/admin/trainer-application-list');
    } catch (error: any) {
      // Robust Error Handling
      handleApiError('Approve Request Of Trainer Verification', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitRejection = async () => {
    if (!trainerData) return;

    const payload = createRejectionPayload();

    if (!validateRejectionInput()) {
      return; // Stop if validation failed
    }

    try {
      setIsSubmitting(true);

      const response = await adminTrainerService.rejectApplication(trainerData.applicationId, payload);

      console.log('Submitting Rejection:', feedback);

      toast.success(response.message);
      navigate('/admin/trainer-application-list');
    } catch (error: any) {
      handleApiError('Reject Request Of Trainer Verification', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // Data & Load Function
    trainerData,
    isLoading,
    isSubmitting,
    error,
    loadApplicationData,

    // UI & Logic
    activeTab,
    setActiveTab,
    verificationStatus,
    feedback,
    isAllValid,
    hasRejections,
    completedCount,
    handleVerifySection,
    handleFeedbackChange,
    submitApproval,
    submitRejection
  };
};