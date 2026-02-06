import { Router } from 'express';
import { authController } from './auth.controller';

const router = Router();

// ... (Your existing Login / Register routes would be here)

/**
 * @route   POST /api/v1/auth/refresh-token
 * @desc    Get a new Access Token using a valid Refresh Token (Cookie/Body)
 * @access  Public (No Auth Middleware required)
 */
router.post('/refresh-token', authController.refreshToken);

// Example of a Logout route (Highly recommended to add)
// You need this to clear the cookie and revoke the token in DB
// router.post('/logout', authController.logout);

export const authRoutes = router;