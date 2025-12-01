import { clientApi } from '../api/client.api';
import type { IChangePasswordRequest, IChangePasswordResponse, IClientProfile, IUpdateClientProfileRequest } from '../types/client.types'; 

export const clientService = {
  async getProfile(): Promise<IClientProfile> {
    const response = await clientApi.getProfile();

    return {
      ...response.data,
      age: response.data.age ?? undefined,
      height: response.data.height ?? undefined,
      weight: response.data.weight ?? undefined,
    };
  },

  async updateProfile(
    updates: IUpdateClientProfileRequest
  ): Promise<IClientProfile> {
    const response = await clientApi.updateProfile(updates);

    return {
      ...response.data,
      age: response.data.age ?? undefined,
      height: response.data.height ?? undefined,
      weight: response.data.weight ?? undefined
    };
  },

    async changePassword(
    payload: IChangePasswordRequest
  ): Promise<IChangePasswordResponse> {
    const response = await clientApi.changePassword(payload);
    return response;
  }

};
