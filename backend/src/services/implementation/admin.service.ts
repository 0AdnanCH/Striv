import { IAdminService } from "../interface/IAdmin.service"; 
import { IAuthService } from "../interface/IAuth.service";
import { IUserRepository } from "../../repositories/interface/IUser.repository";
import { AdminSigninDto } from "../../schemas/auth.schema";
import { UserRole } from "../../constants/roles.constants";
import BadRequestError from "../../errors/badRequest.error";
import { Request, Response, NextFunction } from "express";
import { UserDocument } from "../../models/user.model";
import { HTTP_STATUS } from "../../constants/httpStatus.constants";
import { RESPONSE_MESSAGES } from "../../constants/responseMessages.constants";

export class AdminService implements IAdminService {
  constructor(private readonly authService: IAuthService, private userRepository: IUserRepository) {}

  async signin(data: AdminSigninDto): Promise<{ token: string; admin: Pick<UserDocument, "id" | "email" | "first_name" | "last_name" | "role">; }> {
 
    const { email, password } = data;

    const authResponse = await this.authService.signin(email, password);

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