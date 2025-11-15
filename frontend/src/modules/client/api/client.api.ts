import axiosClient from "../../../api/axiosClient";
import type { ClientProfileResponse, UpdateClientProfileRequest, UpdateClientProfileResponse } from '../types/client.types';

export const clientApi = {
  getProfile: async (): Promise<ClientProfileResponse> => {
    const response = await axiosClient.get('/user/me');
    return response.data;
  },

  updateProfile: async (
    payload: UpdateClientProfileRequest
  ): Promise<UpdateClientProfileResponse> => {
    const response = await axiosClient.patch('/user/me', payload);
    return response.data;
  }
};