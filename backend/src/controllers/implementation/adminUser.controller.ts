import { Request, Response, NextFunction } from "express";
import { IAdminUserController } from "../interface/IAdminUser.controller";
import { IAdminUserService } from "../../services/interface/IAdminUser.service";
import { successResponse } from "../../utils/apiResponse.util";
import { HTTP_STATUS } from "../../constants/httpStatus.constant";
import { RESPONSE_MESSAGES } from "../../constants/responseMessages.constant";
import { FetchUsersQuery } from "../../dtos/adminUser.dto";

export class AdminUserController implements IAdminUserController {
  constructor(private readonly adminUserService: IAdminUserService) {}

  async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { 
        page = 1, 
        limit = 10,
        search = '',
        role = '',
        status = '',
      } = req.query;

      const query: FetchUsersQuery = {
        page: Number(page),
        limit: Number(limit),
        search: String(search),
        role: String(role),
        status: String(status),
      };
      const result = await this.adminUserService.getAllUsers(query);
      successResponse(res, RESPONSE_MESSAGES.USERS_FETCH_SUCCESS, result, HTTP_STATUS.OK);
    } catch (error: any) {
      next(error);
    }
  }
  
  async blockUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await this.adminUserService.blockUser(userId);
      successResponse(res, RESPONSE_MESSAGES.USER_BLOCKED_SUCCESS, user, HTTP_STATUS.OK);
    } catch (error: any) {
      next(error)
    }
  }

  async unblockUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await this.adminUserService.unblockUser(userId);
      successResponse(res, RESPONSE_MESSAGES.USER_UNBLOCKED_SUCCESS, user, HTTP_STATUS.OK);
    } catch (error: any) {
      next(error);
    }
  }
}