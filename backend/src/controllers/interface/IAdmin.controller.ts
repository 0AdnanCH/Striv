import { Request, Response, NextFunction } from "express";

export interface IAdminController {
  signin(req: Request, res: Response, next: NextFunction): Promise<void>;
}