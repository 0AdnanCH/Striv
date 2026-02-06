import { IUser } from '../../user/interfaces'
import { IClientProfile } from './IClientProfile';
import { RegisterClientInput } from '../client.dto';

export interface IRegistrationResult {
  user: IUser;
  profile: IClientProfile;
}

export interface IClientService {
  /**
   * Orchestrates the registration of a new client.
   * - Checks email availability
   * - Hashes password
   * - Creates User and Profile atomically (Transaction)
   */
  registerClient(input: RegisterClientInput): Promise<IRegistrationResult>;
}