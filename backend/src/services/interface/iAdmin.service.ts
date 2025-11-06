import { AdminSigninDto } from "../../schemas/auth.schema";
import { UserDocument } from "../../models/user.model";

export interface IAdminService {
  signin(data: AdminSigninDto): Promise<{
    token: string;
    admin: Pick<UserDocument, 'id' | 'email' | 'first_name' | 'last_name' | 'role'>
  }>;
}