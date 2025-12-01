import type { GenderType } from "../../../constants/gender.constant";
import type { UserRoleType } from "../../../constants/userRole.constant";

export interface IClientProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRoleType;

  gender?: GenderType;
  age?: number;
  height?: number;
  weight?: number;

  picture?: string;
}

export interface IClientProfileResponse {
  message: string;
  data: IClientProfile;
}

export interface IUpdateClientProfileRequest {
  first_name?: string;
  last_name?: string;
  gender?: string;
  age?: number;
  height?: number;
  weight?: number;
}

export interface IUpdateClientProfileResponse extends IClientProfileResponse {};

export interface IChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IChangePasswordResponse {
  message: string;
}