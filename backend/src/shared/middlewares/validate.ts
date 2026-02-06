import { Request, Response, NextFunction } from 'express';
import { ZodType, ZodError } from 'zod';

/**
 * Validates the request (body, query, params) against the provided Zod schema.
 * If validation fails, it sends a 400 response immediately.
 */
export const validate = (schema: ZodType) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Validate everything at once
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params
    });

    // 2. If successful, continue to the Controller
    return next();
  } catch (error) {
    // 3. Handle Validation Errors
    if (error instanceof ZodError) {
      // Format the Zod error into a clean object
      const errors = error.issues.map((err) => ({
        field: err.path.join('.').replace('body.', ''), // Removes 'body.' prefix for frontend
        message: err.message
      }));

      // Return 400 Bad Request
      res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors
      });
      return;
    }

    // If it's not a Zod error, pass it to the global error handler
    return next(error);
  }
};