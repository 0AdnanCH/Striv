import { Request, Response, NextFunction } from 'express';
import { IClientController } from './interfaces/IClientController';
// import { clientService } from './client.service'; 
import { RegisterClientInput } from './client.dto';
import { IClientService } from './interfaces/IClientService';

export class ClientController implements IClientController {
  // 1. Define the dependency as a private, immutable property
  // usage of underscore (_) denotes it is private internal state
  private readonly _clientService: IClientService;

  // 2. Inject the dependency via the Constructor
  constructor(clientService: IClientService) {
    this._clientService = clientService;
  }
  // Method: Register Client
  // Status: 201 Created
  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // 1. Extract valid data (TypeScript knows this shape because of your DTO)
      const clientData: RegisterClientInput = req.body;

      // 2. Delegate business logic to the Service
      const result = await this._clientService.registerClient(clientData);

      // 3. Send Response (201 Created)
      res.status(201).json({
        success: true,
        message: 'Client account created successfully',
        data: {
          user: result.user,
          profile: result.profile
        }
      });
    } catch (error) {
      // 4. Pass error to Global Error Handler (Shared Middleware)
      next(error);
    }
  };
}