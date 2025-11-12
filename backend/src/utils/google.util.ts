import axios from 'axios';
import { env } from '../configs/env.config';

export interface GoogleUserInfo {
  sub: string;
  email: string;
  email_verified: boolean;
  given_name: string;
  family_name: string;
}

export async function verifyGoogleAccessToken(accessToken: string): Promise<GoogleUserInfo> {
  try {
    const response = await axios.get<GoogleUserInfo>(env.GOOGLE_USERINFO_URL, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!response.data.email_verified) {
      throw new Error('Google account not verified.');
    }

    return response.data;
  } catch (error: any) {
    console.error('Google token verification failed:', error.response?.data || error.message);
    throw new Error('Invalid or expired Google token.');
  }
}