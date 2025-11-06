import { UserRole } from "../constants/roles.constants";
import { ObjectId } from "mongoose";
export type GENDER = 'male' | 'female';

export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  gender: GENDER;
  age: number;
  role: UserRole;
  isVerified?: boolean;
  isBlocked?: boolean;
}