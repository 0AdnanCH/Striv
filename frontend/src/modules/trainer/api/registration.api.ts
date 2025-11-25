import axiosClient from '../../../api/axiosClient'; 
import type { FetchTrainerFullInfoApiResponse, PersonalInfoApiResponse, ProfessionalInfoResponse, TrainerKycResponse, WorkInfoPayload, WorkInfoResponse } from '../types/trainerRegistration.types';  

export const trainerRegistrationAPI = {
  async submitPersonalInfo(formData: FormData): Promise<PersonalInfoApiResponse> {

    const response = await axiosClient.post(
      '/trainer/application/personal-info', 
      formData, 
      {
        role: 'client',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return response.data;
  },

  async submitProfessionalInfo(formData: FormData): Promise<ProfessionalInfoResponse> {
    const response = await axiosClient.post(
      '/trainer/application/professional-info',
      formData,
      {
        role: 'client',
        headers: { 
          'Content-Type': 'multipart/form-data' 
        }
      }
    );

    return response.data;
  },

  async submitWorkInfo(data: WorkInfoPayload): Promise<WorkInfoResponse> {
    const response = await axiosClient.post(
      '/trainer/application/work-info',
      data,
      {
        role: 'client'
      }
    );
    return response.data;
  },

  async submitIdentityInfo(formData: FormData): Promise<TrainerKycResponse> {
    const response = await axiosClient.post(
      '/trainer/application/identity',
      formData,
      {
        role: 'client',
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    );
    return response.data;
  },

  async fetchTrainerFullInfo(): Promise<FetchTrainerFullInfoApiResponse> {
    const response = await axiosClient.get('/trainer/application/me', {
      role: 'client' 
    });

    return response.data;
  }
};
