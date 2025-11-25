import { Request, Response, NextFunction } from "express";
import { IAuthController } from "../interface/IAuth.controller";
import { IAuthService } from "../../services/interface/IAuth.service";
import { HTTP_STATUS } from "../../constants/httpStatus.constants";
import { successResponse } from "../../utils/apiResponse.util";
import { AuthenticatedRequest } from "../../middlewares/auth.middleware";
import BadRequestError from "../../errors/badRequest.error";
import { RESPONSE_MESSAGES } from "../../constants/responseMessages.constants";

export class AuthController implements IAuthController {
  constructor(private readonly _authService: IAuthService) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const message = await this._authService.signup(req.body);
      successResponse(res, message, null, HTTP_STATUS.CREATED);
    } catch (error: any) {
      next(error);
    }
  }

  async verifySignUpOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, otp } = req.body;
      const { message, token, user } = await this._authService.verifySignUpOtp(email, otp);
      successResponse(res, message, { token, user }, HTTP_STATUS.OK);
    } catch (error: any) {
      next(error);
    }
  }

  async signin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const { message, token, user } = await this._authService.signin(email, password);
      successResponse(res, message, { token, user }, HTTP_STATUS.OK);
    } catch (error: any) {
      next(error);
    }
  }

  async resendOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;
      const message = await this._authService.resendOtp(email);
      successResponse(res, message, null, HTTP_STATUS.OK);
    } catch (error: any) {
      next(error)
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const meta = { ip: req.ip, ua: req.headers['user-agent'] as string };
      const result = await this._authService.requestPasswordReset(req.body, meta);
      successResponse(res, result.message, null, HTTP_STATUS.OK);
    } catch (error: any) {
      next(error)
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._authService.resetPassword(req.body);
      successResponse(res, result.message, null, HTTP_STATUS.OK);
    } catch (error: any) {
      next(error);
    }
  }

  async signInWithGoogle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { token: googleAccessToken } = req.body;
      const { message, token: appJwtToken, user } = await this._authService.signInWithGoogle(googleAccessToken);
      successResponse(res, message, { token: appJwtToken, user }, HTTP_STATUS.OK);
    } catch (error: any) {
      next(error);
    }
  }

  async changePassword(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;

      if(!userId) {
        return next(new BadRequestError({
          statusCode: HTTP_STATUS.UNAUTHORIZED,
          message: RESPONSE_MESSAGES.TOKEN_MISSING,
          logging: false
        }));
      } 

      const { message } = await this._authService.changePassword(userId, req.body);
      successResponse(res, message, null, HTTP_STATUS.OK);
    } catch (error: any) {
      next(error)
    }
  }
}