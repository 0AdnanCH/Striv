import { randomBytes, createHash } from "crypto";

export const CryptoUtil = {
  randomToken(size = 32) {
    return randomBytes(size).toString('hex');
  },
  sha256(input: string) {
    return createHash('sha256').update(input).digest('hex');
  }
};