import { ClientSession } from 'mongoose';
import { BaseRepository } from '../../shared/database/base.repository'; 
import { IUserRepository } from './interfaces';
import { IUser } from './interfaces';
import { UserModel } from './user.model';

export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
  constructor() {
    super(UserModel);
  }

  /**
   * OPTIMIZATION: Uses MongoDB's .exists() which is lighter than .findOne()
   * because it returns an _id or null, not the full document.
   */
  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.model.exists({ email });
    return !!result;
  }

  /**
   * CRITICAL FOR DATA INTEGRITY:
   * Handles saving the user within a transaction session.
   * This is used by ClientService & TrainerService.
   */
  async createWithSession(data: Partial<IUser>, session: ClientSession): Promise<IUser> {
    const [user] = await this.model.create([data], { session });
    return user;
  }

  /**
   * SECURITY:
   * The password field is { select: false } in the schema.
   * We must explicitly .select('+password') to retrieve it for login verification.
   */
  async findByEmailWithPassword(email: string): Promise<IUser | null> {
    return this.model.findOne({ email }).select('+password').exec();
  }
}