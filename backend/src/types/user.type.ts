import { UserRole } from "../constants/roles.constants";
import { UserProfileDto } from "../dtos/userProfile.dto";
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
  phone?: string;
  profile_photo?: string;
  role: UserRole;
  isVerified?: boolean;
  isBlocked?: boolean;
  authProvider: 'local' | 'google';
  googleId?: string;
};

export interface UserProfileUpdateResponse {
  message: string;
  user: UserProfileDto;
};

export interface UserProfileFetchResponse extends UserProfileUpdateResponse {};

export interface SignupData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  gender: GENDER;
  age: number;
}