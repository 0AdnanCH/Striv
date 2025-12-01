import axiosClient from '../../../api/axiosClient'; 
import { UserRole } from '../../../constants/userRole.constant';
import type { ITrainerFullInfoResponse, IPersonalInfoResponse, IProfessionalInfoResponse, ITrainerIdentityResponse, WorkInfoPayload, IWorkInfoResponse } from '../types/trainerApplication.types';  

export const trainerRegistrationAPI = {
  async submitPersonalInfo(formData: FormData): Promise<IPersonalInfoResponse> {

    const response = await axiosClient.post(
      '/trainer/application/personal-info', 
      formData, 
      {
        role: UserRole.CLIENT,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return response.data;
  },

  async submitProfessionalInfo(formData: FormData): Promise<IProfessionalInfoResponse> {
    const response = await axiosClient.post(
      '/trainer/application/professional-info',
      formData,
      {
        role: UserRole.CLIENT,
        headers: { 
          'Content-Type': 'multipart/form-data' 
        }
      }
    );

    return response.data;
  },

  async submitWorkInfo(data: WorkInfoPayload): Promise<IWorkInfoResponse> {
    const response = await axiosClient.post(
      '/trainer/application/work-info',
      data,
      {
        role: UserRole.CLIENT
      }
    );
    return response.data;
  },

  async submitIdentityInfo(formData: FormData): Promise<ITrainerIdentityResponse> {
    const response = await axiosClient.post(
      '/trainer/application/identity',
      formData,
      {
        role: UserRole.CLIENT,
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    );
    return response.data;
  },

  async fetchTrainerFullInfo(): Promise<ITrainerFullInfoResponse> {
    const response = await axiosClient.get(
      '/trainer/application/me', 
      {
        role: UserRole.CLIENT
      }
    );

    return response.data;
  }
};
