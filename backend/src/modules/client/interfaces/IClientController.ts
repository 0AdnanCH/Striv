import { Request, Response, NextFunction } from 'express';

export interface IClientController {
  /**
   * Handles the registration request for new clients.
   * Expects validated data in req.body.
   */
  register(req: Request, res: Response, next: NextFunction): Promise<void>;
}