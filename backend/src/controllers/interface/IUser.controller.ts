import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../../middlewares/auth.middleware";

export interface IUserController {
  getMyProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
  updateMyProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
}