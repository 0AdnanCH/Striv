export interface AdminSigninData {
  email: string;
  password: string;
}

export interface Admin {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: 'admin';
}

export interface AdminAuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    admin: Admin;
  };
}

export interface ModifiedAdminAuthResponse {
  message: string;
  admin: Admin;
  token: string
}

export interface ApiError {
  status: number;
  message: string;
  details?: any;
}