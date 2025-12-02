import { HTTP_STATUS } from "../../constants/httpStatus.constant";
import { RESPONSE_MESSAGES } from "../../constants/responseMessages.constant";
import { FetchUsersQuery } from "../../dtos/adminUser.dto";
import BadRequestError from "../../errors/badRequest.error";
import { UserDocument } from "../../models/user.model";
import { IUserRepository } from "../../repositories/interface/IUser.repository";
import { PaginatedResult } from "../../types/pagination.types";
import { IAdminUserService } from "../interface/IAdminUser.service";
import { UserRole } from "../../constants/enums.constant";

export class AdminUserService implements IAdminUserService {
  constructor(private readonly _userRepository: IUserRepository) {}

  async getAllUsers(query: FetchUsersQuery): Promise<PaginatedResult<UserDocument>> {
    return await this._userRepository.findWithFilters(query);
  }

  async blockUser(userId: string): Promise<UserDocument> {
    const user = await this._userRepository.findOneAndUpdate(
      { _id: userId, role: { $ne: UserRole.ADMIN } },
      { isBlocked: true },
      { new: true }
    );

    if (!user) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: RESPONSE_MESSAGES.USER_NOT_FOUND,
        logging: false
      });
    }

    return user;
  }

  async unblockUser(userId: string): Promise<UserDocument> {
    const user = await this._userRepository.findOneAndUpdate(
      { _id: userId, role: { $ne: UserRole.ADMIN } }, 
      { isBlocked: false }, 
      { new: true }
    );

    if (!user) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: RESPONSE_MESSAGES.USER_NOT_FOUND,
        logging: false
      });
    }

    return user;
  }
}