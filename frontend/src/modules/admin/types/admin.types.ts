import { UserRole } from "../../../constants/userRole.constant";

export interface IAdminSigninData {
  email: string;
  password: string;
}

export interface IAdmin {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: typeof UserRole.ADMIN;
}

export interface IAdminAuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    admin: IAdmin;
  };
}

export interface IAdminAuthServiceResponse {
  message: string;
  admin: IAdmin;
  token: string
}

export interface IApiError {
  status: number;
  message: string;
  details?: any;
}