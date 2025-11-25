import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../../middlewares/auth.middleware";

export interface IAuthController {
  signup(req: Request, res: Response, next: NextFunction): Promise<void>;
  verifySignUpOtp(req: Request, res: Response, next: NextFunction): Promise<void>;
  signin(req: Request, res: Response, next: NextFunction): Promise<void>;
  resendOtp(req: Request, res: Response, next: NextFunction): Promise<void>;
  forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void>;
  resetPassword(req: Request, res: Response, next: NextFunction): Promise<void>;
  signInWithGoogle(req: Request, res: Response, next: NextFunction): Promise<void>;
  changePassword(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
}