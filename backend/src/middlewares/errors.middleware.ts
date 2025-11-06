import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom.error";
import { HTTP_STATUS } from "../constants/httpStatus.constants";
import { RESPONSE_MESSAGES } from "../constants/responseMessages.constants";
import { ApiResponse } from "../utils/apiResponse.util";

export const errorHandler = (err: Error, req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  // Handled errors
  if(err instanceof CustomError) {
    const { statusCode, errors, logging } = err;
    const errorItem = Array.isArray(errors) ? errors[0] : errors;

    if(logging) {
      console.error(JSON.stringify({
        code: statusCode,
        errors,
        stack: err.stack
      }, null, 2));
    }
    
    res.status(statusCode).json({
      success: false,
      message: errorItem?.message || RESPONSE_MESSAGES.SERVER_ERROR,
      errorCode: errorItem?.code || 'CUSTOM ERROR',
    });
    return;
  }

  // Unhandled errors
  console.error(JSON.stringify(err, null, 2));
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: RESPONSE_MESSAGES.SERVER_ERROR,
    errorCode: 'INTERNAL_SERVER_ERROR',
  });
};