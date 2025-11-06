import { HTTP_STATUS } from "../../constants/httpStatus.constants";
import { RESPONSE_MESSAGES } from "../../constants/responseMessages.constants";
import { FetchUsersQuery } from "../../dtos/adminUser.dto";
import BadRequestError from "../../errors/badRequest.error";
import { UserDocument } from "../../models/user.model";
import { IUserRepository } from "../../repositories/interface/IUser.repository";
import { PaginatedResult } from "../../types/pagination.types";
import { IAdminUserService } from "../interface/IAdminUser.service";

export class AdminUserService implements IAdminUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async getAllUsers(query: FetchUsersQuery): Promise<PaginatedResult<UserDocument>> {
    return await this.userRepository.findWithFilters(query);
  }

  async blockUser(userId: string): Promise<UserDocument> {
    const user = await this.userRepository.findOneAndUpdate(
      { _id: userId, role: { $ne: 'admin' } },
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
    const user = await this.userRepository.findOneAndUpdate(
      { _id: userId, role: { $ne: 'admin' } }, 
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