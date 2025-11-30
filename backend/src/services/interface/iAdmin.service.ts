import { AdminSigninRequestDto, AdminSigninResponseDto } from "../../dtos/adminSignin.dto"; 

export interface IAdminService {
  signin(data: AdminSigninRequestDto): Promise<AdminSigninResponseDto>;
}