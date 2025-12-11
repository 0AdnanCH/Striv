import { Request, Response, NextFunction } from 'express';

export interface IAdminTrainerApplicationController {
  getApplications(req: Request, res: Response, next: NextFunction): Promise<void>;
}