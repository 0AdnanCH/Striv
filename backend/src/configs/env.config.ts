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
  }
}