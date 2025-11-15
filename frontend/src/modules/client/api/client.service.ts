import { clientApi } from './client.api';
import type { ClientProfile, UpdateClientProfileRequest } from '../types/client.types'; 

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
  }
};
