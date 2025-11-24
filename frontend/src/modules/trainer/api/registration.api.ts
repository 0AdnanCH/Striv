import axiosClient from '../../../api/axiosClient'; 
import type { ApiMessageResponse, TrainerWorkInfoPayload } from '../types/trainerRegistration.types';  

export const trainerRegistrationAPI = {
  async submitPersonalInfo(formData: FormData): Promise<ApiMessageResponse> {

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

  async submitProfessionalInfo(formData: FormData): Promise<ApiMessageResponse> {
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

  async submitWorkInfo(data: TrainerWorkInfoPayload): Promise<ApiMessageResponse> {
    const response = await axiosClient.post(
      '/trainer/application/work-info',
      data,
      {
        role: 'client'
      }
    );
    return response.data;
  },

  async submitIdentityInfo(formData: FormData): Promise<ApiMessageResponse> {
    const response = await axiosClient.post(
      '/trainer/application/identity',
      formData,
      {
        role: 'client',
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    );
    return response.data;
  }
};
