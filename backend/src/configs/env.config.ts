import dotenv from 'dotenv';
dotenv.config();

export const env = {
  get PORT() {
    return process.env.PORT;
  },
  get MONGO_URI() {
    return process.env.MONGO_URI;
  },
  get JWT_SECRET() {
    return process.env.JWT_SECRET;
  },
  get BCRYPT_SALT_ROUNDS() {
    return Number(process.env.BCRYPT_SALT_ROUNDS ?? 10);
  },
  get RESET_TOKEN_TTL_MINUTES() {
    return Number(process.env.RESET_TOKEN_TTL_MINUTES ?? 10);
  },
  get APP_URL() {
    return process.env.APP_URL ?? 'http://localhost:5173';
  },
  get GOOGLE_USERINFO_URL() {
    return process.env.GOOGLE_USERINFO_URL ?? 'https://www.googleapis.com/oauth2/v3/userinfo';
  },
  get AWS_REGION() {
    return process.env.AWS_REGION;
  },
  get AWS_ACCESS_KEY() {
    return process.env.AWS_ACCESS_KEY;
  },
  get AWS_SECRET_KEY() {
    return process.env.AWS_SECRET_KEY;
  },
  get AWS_S3_BUCKET() {
    return process.env.AWS_S3_BUCKET;
  },
};