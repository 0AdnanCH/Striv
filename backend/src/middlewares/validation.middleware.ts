import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";
import { HTTP_STATUS } from "../constants/httpStatus.constants";
import { errorMessage } from "../utils/errorFormatter.util";

const validate = (schema: ZodType<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error: any) {
      let err = error;
      if(error instanceof ZodError) {
        err = error.issues[0].message;
      }
      res.status(HTTP_STATUS.BAD_REQUEST).json(errorMessage(err));
    }
  }
}

export default validate;