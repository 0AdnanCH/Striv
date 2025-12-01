import axiosClient from "../../../api/axiosClient";
import type { IChangePasswordRequest, IChangePasswordResponse, IClientProfileResponse, IUpdateClientProfileRequest, IUpdateClientProfileResponse } from '../types/client.types';

export const clientApi = {
  getProfile: async (): Promise<IClientProfileResponse> => {
    const response = await axiosClient.get('/user/me');
    return response.data;
  },

  updateProfile: async (
    payload: IUpdateClientProfileRequest
  ): Promise<IUpdateClientProfileResponse> => {
    const response = await axiosClient.patch('/user/me', payload);
    return response.data;
  },

    changePassword: async (
    payload: IChangePasswordRequest
  ): Promise<IChangePasswordResponse> => {
    const response = await axiosClient.patch('/auth/change-password', payload);
    return response.data;
  }
};