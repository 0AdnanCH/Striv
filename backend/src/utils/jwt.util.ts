import jwt, { JwtPayload } from 'jsonwebtoken';
import { env } from '../configs/env.config';

const JWT_EXPIRES_IN= '7d';

export interface JwtUserPayload {
  id: string;
  role: 'admin' | 'trainer' | 'client';
}

export const generateToken = (payload: JwtUserPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET as string, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): JwtUserPayload => {
  return jwt.verify(token, env.JWT_SECRET as string) as JwtUserPayload;
};