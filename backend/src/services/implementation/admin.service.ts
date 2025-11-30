import { IAdminService } from "../interface/IAdmin.service"; 
import { IAuthService } from "../interface/IAuth.service";
import { IUserRepository } from "../../repositories/interface/IUser.repository";
import { AdminSigninRequestDto, AdminSigninResponseDto } from "../../dtos/adminSignin.dto"; 
import { UserRole } from "../../constants/enums.constant";
import BadRequestError from "../../errors/badRequest.error";
import { HTTP_STATUS } from "../../constants/httpStatus.constant";
import { RESPONSE_MESSAGES } from "../../constants/responseMessages.constant";

export class AdminService implements IAdminService {
  constructor(private readonly _authService: IAuthService, private userRepository: IUserRepository) {}

  async signin(data: AdminSigninRequestDto): Promise<AdminSigninResponseDto> {
 
    const { email } = data;

    const authResponse = await this._authService.signin(data);

    const user = await this.userRepository.findByEmail(email);
    if(!user) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: RESPONSE_MESSAGES.USER_NOT_FOUND,
        logging: false,
      });
    }

    if(user.role !== UserRole.ADMIN) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: RESPONSE_MESSAGES.FORBIDDEN,
        logging: false,
      })
    }

    return {
      token: authResponse.token,
      admin: authResponse.user
    };

  }
}