import { ClientSession } from 'mongoose';
import { IUser } from '../interfaces';
// Assuming you have this generic interface from previous step
import { IBaseRepository } from '../../../shared/database/base.interface';

export interface IUserRepository extends IBaseRepository<IUser> {
  /**
   * High-performance check to see if an email is taken.
   * much faster than finding the whole object.
   */
  existsByEmail(email: string): Promise<boolean>;

  /**
   * Used specifically for Registration inside a Transaction.
   * Passes the Mongoose 'session' to ensure atomicity.
   */
  createWithSession(data: Partial<IUser>, session: ClientSession): Promise<IUser>;

  /**
   * For Login: Finds user and specifically explicitly selects the password
   * (since it's hidden by default in the model).
   */
  findByEmailWithPassword(email: string): Promise<IUser | null>;
}
