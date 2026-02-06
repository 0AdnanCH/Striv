import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';
import { env } from '../../configs/env.config';

export class AuthController {
  
  // ... existing login code ...

  public refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. Get token from Cookie (Preferred) or Body
      const token = req.cookies?.refreshToken || req.body.refreshToken;

      const result = await authService.refreshToken(token);

      // We check NODE_ENV.
      // If we are in 'production', secure is TRUE (HTTPS required).
      // If we are in 'development', secure is FALSE (HTTP allowed).
      const isProduction = env.NODE_ENV === 'production';

      // 2. Send new Refresh Token as Cookie
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: isProduction, // <--- DYNAMIC SWITCH
        sameSite: isProduction ? 'strict' : 'lax', // 'lax' is often better for local dev compatibility
        path: '/', // Ensure cookie is available for all routes
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      });

      // 3. Send new Access Token in JSON
      res.status(200).json({
        success: true,
        accessToken: result.accessToken
      });
    } catch (error) {
      next(error);
    }
  };
}

export const authController = new AuthController();