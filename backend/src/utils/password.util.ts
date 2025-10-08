import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
};

export const comparePassword = async (password: string, hashPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashPassword);
};