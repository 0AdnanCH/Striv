import { Request, Response, NextFunction } from 'express';
import { getUploadedFile } from '../utils/getUploadedFile.util';
import { AuthenticatedRequest } from './auth.middleware';
import BadRequestError from '../errors/badRequest.error';
import { HTTP_STATUS } from '../constants/httpStatus.constant';
import { RESPONSE_MESSAGES } from '../constants/responseMessages.constant';
import { UploadedFile } from '../types/trainer.type';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

export function validateProfilePhoto(req: AuthenticatedRequest, _res: Response, next: NextFunction) {
  const file = req.file;

  if (!file) return next();

  if (!ACCEPTED_IMAGE_TYPES.includes(file.mimetype)) {
    throw new BadRequestError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: RESPONSE_MESSAGES.INVALID_IMAGE_TYPE,
      logging: false
    });
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new BadRequestError({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: RESPONSE_MESSAGES.IMAGE_TOO_LARGE,
      logging: false
    });
  }

  next();
}

export function validateCertificateImages(req: Request, res: Response, next: NextFunction) {
  const files = req.files as UploadedFile[];

  if (!files || files.length === 0) {
    return next();
  }

  for (const file of files) {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.mimetype)) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: `Invalid file type for ${file.originalname}. Only JPG, PNG, WebP allowed.`,
        logging: false
      });
    }

    if (file.size > MAX_IMAGE_SIZE) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: `${file.originalname} exceeds max size of 2MB`,
        logging: false
      });
    }
  }

  next();
}

export function validateIdentityImages(req: Request, _res: Response, next: NextFunction) {
  const files = req.files as Record<string, UploadedFile[]> | undefined;
  const frontImage = getUploadedFile(files?.['frontImage']);
  const backImage = getUploadedFile(files?.['backImage']);

  if (frontImage) {
    if (!ACCEPTED_IMAGE_TYPES.includes(frontImage.mimetype)) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.INVALID_IMAGE_TYPE,
        logging: false
      });
    }

    if (frontImage.size > MAX_IMAGE_SIZE) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.IMAGE_TOO_LARGE,
        logging: false
      });
    }
  }

  if (backImage) {
    if (!ACCEPTED_IMAGE_TYPES.includes(backImage.mimetype)) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.INVALID_IMAGE_TYPE,
        logging: false
      });
    }

    if (backImage.size > MAX_IMAGE_SIZE) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.IMAGE_TOO_LARGE,
        logging: false
      });
    }
  }

  next();
}