import { useEffect, useState } from 'react';
import { trainerRegistrationService } from '../service/trainerApplication.service';
import { handleApiError } from '../../../utils/handleApiError.util';
import { toast } from 'sonner';
import type { IdentityInfoPayload, PersonalInfoPayload, ProfessionalInfoPayload, ITrainerFullInfo, WorkInfoPayload } from '../types/trainerApplication.types';
import { useTrainerContext } from '../context/TrainerContext';
import { useNavigate } from 'react-router-dom';

export function useTrainerApplication() {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const navigate = useNavigate();
  const { setTrainerFullInfo } = useTrainerContext();

  const goNext = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const goPrev = () => setCurrentStep((prev) => Math.max(prev - 1, 1));


  const submitPersonalInfo = async (data: PersonalInfoPayload) => {
    try {
      setLoading(true);
      const res = await trainerRegistrationService.submitPersonalInfo(data);
      toast.success(res.message);

      setTrainerFullInfo((prev) => {
        if (!prev) return { trainer: { ...res.data }, kyc: null };
        return { ...prev, trainer: { ...prev.trainer, ...res.data } };
      });
      
      goNext();
      return res
    } catch (err) {
      handleApiError('Trainer Personal Info POST', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const submitProfessionalInfo = async (data: ProfessionalInfoPayload) => {
    try {
      setLoading(true);
      const res = await trainerRegistrationService.submitProfessionalInfo(data);
      toast.success(res.message);
      console.log(res.message, res.data)

      setTrainerFullInfo((prev) => {
        const updated = res.data; 

        if (!prev) {
          return {
            trainer: {
              specialization: updated.specialization,
              yearsOfExperience: updated.yearsOfExperience,
              additionalSkills: updated.additionalSkills,
              certificates: updated.certificates ?? [],
              portfolio: updated.portfolio,
              registrationStep: updated.registrationStep,
            },
            kyc: null
          };
        }

        return {
          ...prev,
          trainer: {
            ...prev.trainer!,
            specialization: updated.specialization,
            yearsOfExperience: updated.yearsOfExperience,
            additionalSkills: updated.additionalSkills,
            certificates: updated.certificates ?? [],
            portfolio: updated.portfolio,
            registrationStep: updated.registrationStep
          }
        };
      });

      goNext();
      return res;
    } catch (err) {
      handleApiError('Trainer Professional Info POST', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const submitWorkInfo = async (data: WorkInfoPayload) => {
    try {
      setLoading(true);
      const res = await trainerRegistrationService.submitWorkInfo(data);
      toast.success(res.message);

      setTrainerFullInfo((prev) => {
        if (!prev) {
          return {
            trainer: {
              pricing: res.data.pricing,
              availability: res.data.availability,
              registrationStep: res.data.registrationStep
            },
            kyc: null
          };
        }

        return {
          ...prev,
          trainer: {
            ...prev.trainer,
            pricing: res.data.pricing,
            availability: res.data.availability,
            registrationStep: res.data.registrationStep
          }
        };
      });

      goNext();
      return res;
    } catch (err) {
      handleApiError('Trainer Work Info POST', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const submitIdentityInfo = async (data: IdentityInfoPayload) => {
    try {
      setLoading(true);
      const res = await trainerRegistrationService.submitIdentityInfo(data);
      toast.success("Your identity verification has been submitted. The admin will review it shortly and you will be notified once it's approved or if any changes are needed.");

      setTrainerFullInfo((prev) => {
        const prevData = prev ?? { trainer: null, kyc: null };
        return {
          ...prevData,
          kyc: {
            ...prevData.kyc,
            documentType: res.data.documentType ?? prevData.kyc?.documentType ?? undefined,
            frontImage: res.data.frontImage ?? prevData.kyc?.frontImage ?? undefined,
            backImage: res.data.backImage ?? prevData.kyc?.backImage ?? null,
          }
        };
      });

      setTimeout(() => {
        navigate('/')
      }, 1200);

      return res;
    } catch (err) {
      handleApiError('Trainer Identity Info POST', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchTrainerFullInfo = async (): Promise<ITrainerFullInfo> => {
    try {
      setLoading(true);
      const data = await trainerRegistrationService.fetchTrainerFullInfo();
      setTrainerFullInfo(data);
      setCurrentStep(data.trainer?.registrationStep || currentStep);
      return data;
    } catch (err) {
      handleApiError('Fetch Trainer Full Info', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainerFullInfo();
  }, []); 

  return {
    loading,
    currentStep,
    goNext,
    goPrev,
    submitPersonalInfo,
    submitProfessionalInfo,
    submitWorkInfo,
    submitIdentityInfo,
    fetchTrainerFullInfo
  };
}