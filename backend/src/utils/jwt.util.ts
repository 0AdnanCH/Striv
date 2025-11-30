import jwt from 'jsonwebtoken';
import { env } from '../configs/env.config';
import { UserRole } from '../constants/enums.constant';

const JWT_EXPIRES_IN= '7d';

export interface JwtUserPayload {
  id: string;
  role: UserRole;
}

export const generateToken = (payload: JwtUserPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET as string, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): JwtUserPayload => {
  return jwt.verify(token, env.JWT_SECRET as string) as JwtUserPayload;
};