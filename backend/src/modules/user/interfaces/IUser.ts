import { Document } from "mongoose";
import { AuthProvider, UserRole } from "../../../constants/enums.constant";

export interface IUser extends Document {
  email: string;
  password?: string;
  role: UserRole;

  firstName?: string;
  lastName?: string;
  profilePhoto?: string;

  isVerified?: boolean;
  isBlocked?: boolean;

  authProvider: AuthProvider;
  googleId?: string;

  createdAt: Date;
  updatedAt: Date;
};