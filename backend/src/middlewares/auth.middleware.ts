import { Request, Response, NextFunction } from 'express';
import BadRequestError from '../errors/badRequest.error';
import { HTTP_STATUS } from '../constants/httpStatus.constants';
import { RESPONSE_MESSAGES } from '../constants/responseMessages.constants';
import { verifyToken } from '../utils/jwt.util';
import { JwtUserPayload } from '../utils/jwt.util';

export interface AuthenticatedRequest extends Request {
  user?: { id: string; role: JwtUserPayload['role'] };
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: RESPONSE_MESSAGES.TOKEN_MISSING,
        logging: false
      });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token || token === 'undefined' || token === 'null') {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: RESPONSE_MESSAGES.INVALID_OR_EXPIRED_TOKEN,
        logging: false
      });
    }

    const decoded = verifyToken(token);

    req.user = decoded;
    next();
  } catch (err: any) {
    if (err instanceof BadRequestError) {
      return next(err);
    }
    console.error(err)
    next(
      new BadRequestError({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: err.message || RESPONSE_MESSAGES.INVALID_OR_EXPIRED_TOKEN,
        logging: false
      })
    );
  }
};

export const authorizeRoles =
  (...allowedRoles: JwtUserPayload['role'][]) =>
  (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: RESPONSE_MESSAGES.TOKEN_MISSING,
        logging: false
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: RESPONSE_MESSAGES.FORBIDDEN,
        logging: false
      });
    }

    next();
  };