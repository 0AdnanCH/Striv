import { Request, Response, NextFunction } from "express";
import { IAuthController } from "../interface/IAuthController";
import { IAuthService } from "../../services/interface/IAuthService";
import { HTTP_STATUS } from "../../constants/httpStatus.constants";

export class AuthController implements IAuthController {
  constructor(private authService: IAuthService) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.authService.signup(req.body);
      res.status(HTTP_STATUS.CREATED).json({ message: result });
    } catch (error: any) {
      next(error);
    }
  }

  async signin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await this.authService.signin(email, password);
      res.status(HTTP_STATUS.OK).json({ message: result });
    } catch (error: any) {
      next(error);
    }
  }
}