import { z } from "zod";
import { updateUserProfileSchema } from "../schemas/updateUserProfile.schema";

export interface UserProfileDto {
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

export type UpdateUserProfileDto = z.infer<typeof updateUserProfileSchema>;