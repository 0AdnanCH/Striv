import { useMemo } from 'react';
import { handleApiError } from '../../../utils/handleApiError.util';
import { toast } from 'sonner';
import type { 
  IdentityInfoPayload,
  PersonalInfoPayload, 
  ProfessionalInfoPayload,
  WorkInfoPayload, 
  ITrainerIdentityInfo,
  IWorkInfo,
  IProfessionalInfo,
  IPersonalInfo
} from '../types/trainerApplication.types';

import { trainerApplicationApi, useFetchFullInfoQuery, useSubmitIdentityInfoMutation, useSubmitPersonalInfoMutation, useSubmitProfessionalInfoMutation, useSubmitWorkInfoMutation } from '../api/trainerApplication.api';
import { useDispatch } from 'react-redux';

export function useTrainerApplication() {
  const dispatch = useDispatch();

  const {
    data: trainerInfo,
    isLoading: isFetching,
    isError,
  } = useFetchFullInfoQuery();


  const [
    submitPersonalInfoMutation,
    { isLoading: submittingPersonal }
  ] = useSubmitPersonalInfoMutation();

  const [
    submitProfessionalInfoMutation,
    { isLoading: submittingProfessional }
  ] = useSubmitProfessionalInfoMutation();

  const [
    submitWorkInfoMutation,
    { isLoading: submittingWork }
  ] = useSubmitWorkInfoMutation();

  const [
    submitIdentityInfoMutation,
    { isLoading: submittingIdentity }
  ] = useSubmitIdentityInfoMutation();

  const loading = useMemo(() =>
    isFetching ||
    submittingPersonal ||
    submittingProfessional ||
    submittingWork ||
    submittingIdentity,
  [
    isFetching,
    submittingPersonal,
    submittingProfessional,
    submittingWork,
    submittingIdentity
  ]);


  const submitPersonalInfo = async (payload: PersonalInfoPayload): Promise<IPersonalInfo | undefined> => {
    try {
      const { message, data } = await submitPersonalInfoMutation(payload).unwrap();
      toast.success(message);

      return data;
    } catch (err: any) {
      handleApiError('Trainer Personal Info POST', err);
    }
  };

  const submitProfessionalInfo = async (payload: ProfessionalInfoPayload): Promise<IProfessionalInfo | undefined> => {
    try {
      const { message, data } = await submitProfessionalInfoMutation(payload).unwrap();
      toast.success(message);

      return data;
    } catch (err: any) {
      handleApiError('Trainer Professional Info POST', err);
    }
  };

  const submitWorkInfo = async (payload: WorkInfoPayload): Promise<IWorkInfo | undefined> => {
    try {
      const { message, data } = await submitWorkInfoMutation(payload).unwrap();
      toast.success(message);


      return data;
    } catch (err: any) {
      handleApiError('Trainer Work Info POST', err);
    }
  };

  const submitIdentityInfo = async (payload: IdentityInfoPayload): Promise<ITrainerIdentityInfo | undefined> => {
    try {
      const { message, data } = await submitIdentityInfoMutation(payload).unwrap();
      toast.success(message);

      dispatch(trainerApplicationApi.util.invalidateTags(['TrainerApplication']));

      return data;
    } catch (err: any) {
      handleApiError('Trainer Identity Info POST', err);
      console.log(err)
    }
  };

  return {
    loading,
    trainerInfo,
    isError,
    submitPersonalInfo,
    submitProfessionalInfo,
    submitWorkInfo,
    submitIdentityInfo
  };
}