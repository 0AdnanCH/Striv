import { Request, Response, NextFunction } from 'express';

export interface IAdminUserController {
  getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
  blockUser(req: Request, res: Response, next: NextFunction): Promise<void>;
  unblockUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}