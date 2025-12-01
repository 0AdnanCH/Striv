import type { UserRoleType } from "../../../constants/userRole.constant";

export interface ISignupData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  gender: string;
  age: number;
}

export interface ISigninData {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRoleType;
}

export interface IAuthResponse {
  message: string;
  data: {
    user: IUser;
    token: string;
  };
}

export interface IAuthServiceResponse {
  message: string;
  user: IUser;
  token: string;
}

export interface IOtpVerifyData {
  email: string;
  otp: string;
}

export interface IAuthContextType {
  user: IUser | null;
  token: string | null;
  login: (token: string, user: IUser, role?: UserRoleType) => void;
  logout: (role?: UserRoleType) => void;
  loading: boolean;
  updateUser: (updated: Partial<IUser>) => void;
}

export interface IResetPasswordData {
  token: string;
  password: string;
}

export interface IForgotPasswordData {
  email: string;
}