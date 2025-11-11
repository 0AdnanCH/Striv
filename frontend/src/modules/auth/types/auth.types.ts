export interface SignupData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  gender: string;
  age: number;
}

export interface SigninData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: 'admin' | 'trainer' | 'client';
}

export interface AuthResponse {
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface ModifiedAuthResponse {
  message: string;
  user: User;
  token: string
}

export interface OtpVerifyData {
  email: string;
  otp: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User, role?: 'admin' | 'trainer' | 'client') => void;
  logout: (role?: 'admin' | 'trainer' | 'client') => void;
  loading: boolean;
}

export interface ResetPasswordData {
  token: string;
  password: string;
}