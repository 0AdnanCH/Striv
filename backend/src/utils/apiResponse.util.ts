import { Response } from "express";

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errorCode?: string;
}

export const successResponse = <T>(
  res: Response,
  message: string,
  data: T,
  statusCode: number = 200,
): Response<ApiResponse<T>> => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  res: Response,
  message: string,
  errorCode: string,
  statusCode: number = 400,
): Response<ApiResponse> => {
  return res.status(statusCode).json({
    success: false,
    message,
    errorCode,
  });
};