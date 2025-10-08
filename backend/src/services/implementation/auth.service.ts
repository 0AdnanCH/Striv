import { IUser } from "../../types/user.type";
import { IAuthService } from "../interface/IAuthService";
import { IUserRepository } from "../../repositories/interface/IUserRepository";
import { RESPONSE_MESSAGES } from "../../constants/responseMessages.constants";
import BadRequestError from "../../errors/badRequest.error";
import { HTTP_STATUS } from "../../constants/httpStatus.constants";
import { hashPassword, comparePassword } from "../../utils/password.util";

export class AuthService implements IAuthService {
  constructor(private userRepository: IUserRepository) {}

  async signup(user: IUser): Promise<string> {
    const exists = await this.userRepository.findByEmail(user.email);
    if(exists) throw new BadRequestError({ code: HTTP_STATUS.BAD_REQUEST, message: RESPONSE_MESSAGES.USER_ALREADY_EXISTS, logging: false });

    const hashedPassword = await hashPassword(user.password);
    await this.userRepository.create({ ...user, password: hashedPassword });
    return RESPONSE_MESSAGES.REGISTER_SUCCESS;
  }

  async signin(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if(!user) {
      throw new BadRequestError({ code: HTTP_STATUS.UNAUTHORIZED, message: RESPONSE_MESSAGES.INVALID_CREDENTIALS, logging: false });
    }
    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      throw new BadRequestError({ code: HTTP_STATUS.UNAUTHORIZED, message: RESPONSE_MESSAGES.INVALID_CREDENTIALS, logging: false });
    }
    return RESPONSE_MESSAGES.LOGIN_SUCCESS;
  }
}