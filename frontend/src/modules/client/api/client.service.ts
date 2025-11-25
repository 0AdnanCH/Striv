import { clientApi } from './client.api';
import type { ChangePasswordRequest, ChangePasswordResponse, ClientProfile, UpdateClientProfileRequest } from '../types/client.types'; 

export const clientService = {
  async getProfile(): Promise<ClientProfile> {
    const response = await clientApi.getProfile();

    return {
      ...response.data,
      age: response.data.age ?? undefined,
      height: response.data.height ?? undefined,
      weight: response.data.weight ?? undefined,
    };
  },

  async updateProfile(
    updates: UpdateClientProfileRequest
  ): Promise<ClientProfile> {
    const response = await clientApi.updateProfile(updates);

    return {
      ...response.data,
      age: response.data.age ?? undefined,
      height: response.data.height ?? undefined,
      weight: response.data.weight ?? undefined
    };
  },

    async changePassword(
    payload: ChangePasswordRequest
  ): Promise<ChangePasswordResponse> {
    const response = await clientApi.changePassword(payload);
    return response; // { message }
  }

};
