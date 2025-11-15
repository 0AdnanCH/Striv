import { Response, NextFunction } from 'express';
import { IUserController } from '../interface/IUser.controller';
import { IUserService } from '../../services/interface/IUser.service'; 
import { successResponse } from '../../utils/apiResponse.util';
import { HTTP_STATUS } from '../../constants/httpStatus.constants';
import { AuthenticatedRequest } from '../../middlewares/auth.middleware';
import { UpdateUserProfileDto } from '../../dtos/userProfile.dto';

export class UserController implements IUserController {
  constructor(private readonly _userService: IUserService) {}

  async getMyProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return next({
          statusCode: HTTP_STATUS.UNAUTHORIZED,
          message: 'Unauthorized: user information missing'
        });
      }

      const profile = await this._userService.getCurrentUser(userId);

      successResponse(res, 'Profile fetched successfully', profile, HTTP_STATUS.OK);
    } catch (error: any) {
      next(error);
    }
  }

  async updateMyProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new Error('Authenticated user missing');
      }

      const updated = await this._userService.updateCurrentUser(userId, req.body);
      successResponse(res, 'Profile updated successfully', updated, HTTP_STATUS.OK);
    } catch (error: any) {
      next(error);
    }
  }
}