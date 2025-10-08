import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { CustomError } from "../errors/custom.error";
import { HTTP_STATUS } from "../constants/httpStatus.constants";
import { RESPONSE_MESSAGES } from "../constants/responseMessages.constants";
import { errorMessage } from "../utils/errorFormatter.util";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Handled errors
  if(err instanceof CustomError) {
    const { statusCode, errors, logging } = err;
    if(logging) {
      console.error(JSON.stringify({
        code: statusCode,
        errors: errors,
        stack: err.stack
      }, null, 2));
    }
    res.status(statusCode).json({ errors });
    return;
  }

  // Unhandled errors
  console.error(JSON.stringify(err, null, 2));
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorMessage(RESPONSE_MESSAGES.SERVER_ERROR));
}