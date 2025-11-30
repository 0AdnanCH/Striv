import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";
import { HTTP_STATUS } from "../constants/httpStatus.constant";
import { errorResponse } from "../utils/apiResponse.util";
import { RESPONSE_MESSAGES } from "../constants/responseMessages.constant";

const validate = (schema: ZodType<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error: any) {
      let err = error;
      if(error instanceof ZodError) {
        err = error.issues[0].message;
        errorResponse(res, err, 'VALIDATION_ERROR', HTTP_STATUS.BAD_REQUEST);
        return;
      }
      errorResponse(res, RESPONSE_MESSAGES.INVALID_REQ_DATA, 'BAD_REQUEST', HTTP_STATUS.BAD_REQUEST);
    }
  }
}

export default validate;