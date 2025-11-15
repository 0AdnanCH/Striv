export interface ClientProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;

  gender?: string;
  age?: number;
  height?: number;
  weight?: number;

  picture?: string;
}

export interface ClientProfileResponse {
  message: string;
  data: ClientProfile;
}

export interface UpdateClientProfileRequest {
  first_name?: string;
  last_name?: string;
  gender?: string;
  age?: number;
  height?: number;
  weight?: number;
}

export interface UpdateClientProfileResponse extends ClientProfileResponse {};