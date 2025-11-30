import { ObjectId } from "mongoose";
import { AuthProvider, Gender, UserRole } from "../constants/enums.constant";

export interface IUser {
  first_name?: string;
  last_name?: string;
  email: string;
  password?: string;
  gender?: Gender;
  age?: number;
  height?: number;
  weight?: number;
  phone?: string;
  profile_photo?: string;
  role: UserRole;
  isVerified?: boolean;
  isBlocked?: boolean;
  authProvider: AuthProvider;
  googleId?: string;
};

export interface IUserProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  gender?: string;
  age?: number;
  height?: number;
  weight?: number;
}

export interface IAuthUser {
  id: ObjectId;
  email: string;
  role: UserRole;
  first_name: string;
  last_name: string;
}