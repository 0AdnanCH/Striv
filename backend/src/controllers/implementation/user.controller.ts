import { Response, NextFunction } from 'express';
import { IUserController } from '../interface/IUser.controller';
import { IUserService } from '../../services/interface/IUser.service'; 
import { successResponse } from '../../utils/apiResponse.util';
import { HTTP_STATUS } from '../../constants/httpStatus.constant';
import { AuthenticatedRequest } from '../../middlewares/auth.middleware';
import { RESPONSE_MESSAGES } from '../../constants/responseMessages.constant';

export class UserController implements IUserController {
  constructor(private readonly _userService: IUserService) {}

  async getMyProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return next({
          statusCode: HTTP_STATUS.UNAUTHORIZED,
          message: RESPONSE_MESSAGES.UNAUTHORIZED_USER_INFO_MISSING
        });
      }

      const { message, user } = await this._userService.getCurrentUser(userId);

      successResponse(res, message, user, HTTP_STATUS.OK);
    } catch (error: any) {
      next(error);
    }
  }

  async updateMyProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return next({
          statusCode: HTTP_STATUS.UNAUTHORIZED,
          message: RESPONSE_MESSAGES.UNAUTHORIZED_USER_INFO_MISSING
        });
      }

      const { message, user } = await this._userService.updateCurrentUser(userId, req.body);
      successResponse(res, message, user, HTTP_STATUS.OK);
    } catch (error: any) {
      next(error);
    }
  }
}