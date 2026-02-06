import jwt from 'jsonwebtoken';
import { env } from '../../configs/env.config';
import { UserRole } from '../../constants/enums.constant'; 

// Access Token: Short life (Security)
const ACCESS_TOKEN_EXPIRE = '15m';
// Refresh Token: Long life (Convenience)
const REFRESH_TOKEN_EXPIRE = '7d';

export interface JwtUserPayload {
  id: string;
  role: UserRole;
}

// 1. Generate Short-Lived Access Token
export const generateAccessToken = (payload: JwtUserPayload): string => {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET as string, { expiresIn: ACCESS_TOKEN_EXPIRE });
};

// 2. Generate Long-Lived Refresh Token
// Note: We use a DIFFERENT secret key for refresh tokens
export const generateRefreshToken = (payload: JwtUserPayload): string => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET as string, { expiresIn: REFRESH_TOKEN_EXPIRE });
};

// 3. Verify Access Token
export const verifyAccessToken = (token: string): JwtUserPayload => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET as string) as JwtUserPayload;
};

// 4. Verify Refresh Token
export const verifyRefreshToken = (token: string): JwtUserPayload => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET as string) as JwtUserPayload;
};