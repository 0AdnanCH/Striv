import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../shared/utils/jwt.util';
import { RefreshTokenModel } from './refresh-token.model';
import { IUser } from '../user/interfaces';
import { env } from '../../configs/env.config';

export class AuthService {
  // Helper: Create a new Refresh Token record in DB
  private async _createRefreshToken(user: IUser) {
    const payload = { id: user.id, role: user.role };
    const token = generateRefreshToken(payload);

    // Save to DB
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 Days
    await RefreshTokenModel.create({
      user: user._id,
      token: token,
      expiresAt: expiresAt
    });

    return token;
  }

  // CALL THIS ON LOGIN
  public async login(user: IUser) {
    const accessToken = generateAccessToken({ id: user.id, role: user.role });
    const refreshToken = await this._createRefreshToken(user);

    return { user, accessToken, refreshToken };
  }

  // CALL THIS ON /refresh-token endpoint
  public async refreshToken(incomingToken: string) {
    // 1. Basic format check
    if (!incomingToken) throw new Error('Token required'); //400

    // 2. Find token in DB (Include revoked ones to detect theft)
    const storedToken = await RefreshTokenModel.findOne({ token: incomingToken });
    if (!storedToken) throw new Error('Invalid token'); // 401

    // 3. SECURITY: Reuse Detection (Token Rotation)
    // If a token that was already used (has a replacement) is used again...
    if (storedToken.replacedByToken) {
      // ... It means IT WAS STOLEN. Revoke ALL tokens for this user immediately.
      await RefreshTokenModel.updateMany({ user: storedToken.user }, { revokedAt: new Date(), replacedByToken: 'THEFT_DETECTED' });
      throw new Error('Security Alert: Token reuse detected. Please login again.'); // 403
    }

    // 4. Check Validity (Revoked manually or Expired)
    if (storedToken.revokedAt || Date.now() >= storedToken.expiresAt.getTime()) {
      throw new Error('Token expired or revoked'); // 401
    }

    // 5. Verify the cryptographic signature
    // (We do this last to save CPU if DB checks fail first)
    let payload;
    try {
      payload = verifyRefreshToken(incomingToken);
    } catch (err) {
      throw new Error('Invalid token signature');
    }

    // 6. ROTATION: Invalidate current token, issue new one
    const newAccessToken = generateAccessToken({ id: payload.id, role: payload.role });
    const newRefreshToken = generateRefreshToken({ id: payload.id, role: payload.role });

    // Update old token
    storedToken.revokedAt = new Date();
    storedToken.replacedByToken = newRefreshToken;
    await storedToken.save();

    // Save new token
    await RefreshTokenModel.create({
      user: storedToken.user,
      token: newRefreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}

export const authService = new AuthService();