export type ROLE = 'client' | 'trainer' | 'admin';
export type GENDER = 'male' | 'female';

export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  gender: GENDER;
  age: number;
  role?: ROLE;
  isVerified?: boolean;
}