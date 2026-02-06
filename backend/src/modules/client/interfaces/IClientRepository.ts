import { ClientSession } from 'mongoose';
import { IClientProfile } from './IClientProfile';
import { IBaseRepository } from '../../../shared/database/base.interface';

export interface IClientRepository extends IBaseRepository<IClientProfile> {
  /**
   * Creates a client profile within a specific transaction session.
   * This is required to ensure Atomicity when creating User + Profile together.
   */
  createWithSession(data: Partial<IClientProfile>, session: ClientSession): Promise<IClientProfile>;
}