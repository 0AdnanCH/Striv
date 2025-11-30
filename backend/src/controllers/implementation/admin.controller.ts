import { Request, Response, NextFunction } from "express";
import { IAdminController } from "../interface/IAdmin.controller";
import { IAdminService } from "../../services/interface/IAdmin.service";
import { successResponse } from "../../utils/apiResponse.util";
import { HTTP_STATUS } from "../../constants/httpStatus.constant";
import { RESPONSE_MESSAGES } from "../../constants/responseMessages.constant";

export class AdminController implements IAdminController {
  constructor(private readonly adminService: IAdminService) {};

  async signin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await this.adminService.signin({ email, password });
      successResponse(res, RESPONSE_MESSAGES.ADMIN_SIGNIN_SUCCESS, result, HTTP_STATUS.OK);
    } catch (error: any) {
      next(error);
    }
  }
}