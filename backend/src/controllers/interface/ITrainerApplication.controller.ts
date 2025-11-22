import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../../middlewares/auth.middleware";

export interface ITrainerApplicationController {
  submitPersonalInfo(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
  submitProfessionalInfo(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
  submitWorkInfo(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
  submitIdentityInfo(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
}