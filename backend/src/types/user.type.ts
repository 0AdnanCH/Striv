import { UserRole } from "../constants/roles.constants";
export type GENDER = 'male' | 'female';

export interface IUser {
  first_name?: string;
  last_name?: string;
  email: string;
  password?: string;
  gender?: GENDER;
  age?: number;
  height?: number;
  weight?: number;
  role: UserRole;
  isVerified?: boolean;
  isBlocked?: boolean;
  authProvider: 'local' | 'google';
  googleId?: string;
}