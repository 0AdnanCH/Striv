import { HTTP_STATUS } from "../../constants/httpStatus.constants";
import { RESPONSE_MESSAGES } from "../../constants/responseMessages.constants";
import { UpdateUserProfileDto, UserProfileDto } from "../../dtos/userProfile.dto";
import BadRequestError from "../../errors/badRequest.error";
import { IUserRepository } from "../../repositories/interface/IUser.repository";
import { IUserService } from "../interface/IUser.service";

export class UserService implements IUserService {
  constructor(private readonly _userRepository: IUserRepository) {}

  async getCurrentUser(userId: string): Promise<UserProfileDto> {
    const user = await this._userRepository.findById(userId);

    if (!user) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: RESPONSE_MESSAGES.USER_NOT_FOUND,
        logging: false
      });
    }

    return this._toProfileResponse(user);
  }

  async updateCurrentUser(userId: string, payload: UpdateUserProfileDto): Promise<UserProfileDto> {
    if (!userId) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: 'Missing user id',
        logging: false
      });
    }

    const updatePayload: Partial<UpdateUserProfileDto> = {};

    if (payload.first_name !== undefined) updatePayload.first_name = payload.first_name;
    if (payload.last_name !== undefined) updatePayload.last_name = payload.last_name;
    if (payload.gender !== undefined) updatePayload.gender = payload.gender;
    if (payload.age !== undefined) updatePayload.age = payload.age;
    if (payload.height !== undefined) updatePayload.height = payload.height;
    if (payload.weight !== undefined) updatePayload.weight = payload.weight;

    if (Object.keys(updatePayload).length === 0) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: 'Nothing to update',
        logging: false
      });
    }

    const updated = await this._userRepository.findByIdAndUpdate(userId, updatePayload, { new: true });

    if (!updated) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: RESPONSE_MESSAGES.USER_NOT_FOUND,
        logging: false
      });
    }

    return this._toProfileResponse(updated);
  }

  private _toProfileResponse(user: any): UserProfileDto {
    return {
      id: user._id.toString(),
      email: user.email,
      first_name: user.first_name ?? '',
      last_name: user.last_name ?? '',
      role: user.role,
      gender: user.gender ?? undefined,
      age: user.age ?? undefined,
      height: user.height ?? undefined,
      weight: user.weight ?? undefined
    };
  }
}