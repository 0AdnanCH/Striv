import { ClientSession } from 'mongoose';
import { BaseRepository } from '../../shared/database/base.repository';
import { ClientProfileModel } from './client.model';
import { IClientProfile } from './interfaces/IClientProfile';
import { IClientRepository } from './interfaces/IClientRepository';

export class ClientRepository extends BaseRepository<IClientProfile> implements IClientRepository {
  constructor() {
    super(ClientProfileModel);
  }

  // Add this method to support the Transaction in the Service
  async createWithSession(data: Partial<IClientProfile>, session: ClientSession): Promise<IClientProfile> {
    const [profile] = await this.model.create([data], { session });
    return profile;
  }
}