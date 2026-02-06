import { Router } from 'express';
import { validate } from '../../shared/middlewares/validate';
import { registerClientSchema } from './client.dto';

// 1. Import the CLASSES (The Blueprints)
import { UserRepository } from '../user/user.repository';
import { ClientRepository } from './client.repository';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';

const router = Router();

// =============================================================================
// DEPENDENCY INJECTION (COMPOSITION ROOT)
// =============================================================================

// Step A: Create the Repository
// (This handles database access for Users and Clients)
const userRepository = new UserRepository();
const clientRepository = new ClientRepository();

// Step B: Inject Repositories into the Service
// (Service now has access to both User DB and Client DB)
const clientService = new ClientService(userRepository, clientRepository);

// Step C: Inject Service into the Controller
// (Controller now has access to the Business Logic)
const clientController = new ClientController(clientService);

// =============================================================================
// ROUTE DEFINITIONS
// =============================================================================

/**
 * @route   POST /api/v1/client/register
 * @desc    Register a new client account
 * @access  Public
 */
router.post(
  '/register',
  validate(registerClientSchema), // Step 1: Validate Data
  clientController.register // Step 2: Execute Controller
);

export const clientRoutes = router;