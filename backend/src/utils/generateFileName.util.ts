import crypto from 'crypto';

export const generateFileName = (originalFileName: string) => {
  const ext = originalFileName.split('.').pop();
  const unique = crypto.randomBytes(16).toString('hex');
  return `${unique}.${ext}`;
};