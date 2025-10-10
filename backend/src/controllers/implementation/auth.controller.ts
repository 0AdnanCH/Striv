import { Request, Response, NextFunction } from "express";
import { IAuthController } from "../interface/IAuthController";
import { IAuthService } from "../../services/interface/IAuthService";
import { HTTP_STATUS } from "../../constants/httpStatus.constants";
import { successResponse } from "../../utils/apiResponse";

export class AuthController implements IAuthController {
  constructor(private authService: IAuthService) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const message = await this.authService.signup(req.body);
      successResponse(res, message, null, HTTP_STATUS.CREATED);
    } catch (error: any) {
      next(error);
    }
  }

  async verifySignUpOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, otp } = req.body;
      const message = await this.authService.verifySignUpOtp(email, otp);
      successResponse(res, message, null, HTTP_STATUS.OK);
    } catch (error: any) {
      next(error);
    }
  }

  async signin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const message = await this.authService.signin(email, password);
      successResponse(res, message, null, HTTP_STATUS.OK);
    } catch (error: any) {
      next(error);
    }
  }

  async resendOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;
      const message = await this.authService.resendOtp(email);
      successResponse(res, message, null, HTTP_STATUS.OK);
    } catch (error: any) {
      next(error)
    }
  }
}