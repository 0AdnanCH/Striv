import { Request, Response, NextFunction } from 'express';
import { getUploadedFile } from '../utils/getUploadedFile.util';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

export function validateProfilePhoto(req: Request, res: Response, next: NextFunction) {
  const file = req.file;

  if (!file) {
    res.status(400).json({ message: 'Profile photo is required' });
    return
  }

  if (!ACCEPTED_IMAGE_TYPES.includes(file.mimetype)) {
    res.status(400).json({ message: 'Invalid file type. Only JPG, PNG, WebP allowed.' });
    return;
  }

  if (file.size > MAX_IMAGE_SIZE) {
    res.status(400).json({ message: 'Profile photo must be under 2MB' });
    return;
  }

  next();
}

export function validateCertificateImages(req: Request, res: Response, next: NextFunction) {
  const files = req.files as Express.Multer.File[];

  if (!files || !Array.isArray(files)) {
    res.status(400).json({ message: 'Certificate images are required' });
    return;
  }

  for (const file of files) {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.mimetype)) {
      res.status(400).json({
        message: `Invalid file type for ${file.originalname}. Only JPG, PNG, WebP allowed.`
      });
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      res.status(400).json({
        message: `${file.originalname} exceeds max size of 2MB`
      });
      return;
    }
  }

  next();
}

export function validateIdentityImages(req: Request, res: Response, next: NextFunction) {
  const files = req.files as Record<string, Express.Multer.File[]> | undefined;
  const frontImage = getUploadedFile(files?.['frontImage']);
  const backImage = getUploadedFile(files?.['backImage']);

  if (!frontImage) {
    res.status(400).json({ message: 'Front image is required' });
    return;
  }

  if (!ACCEPTED_IMAGE_TYPES.includes(frontImage.mimetype)) {
    res.status(400).json({ message: 'Front image must be jpeg, jpg, png or webp' });
    return;
  }

  if (frontImage.size > MAX_IMAGE_SIZE) {
    res.status(400).json({
      message: `Front image must be less than ${MAX_IMAGE_SIZE / (1024 * 1024)} MB`
    });
    return;
  }

  if (backImage) {
    if (!ACCEPTED_IMAGE_TYPES.includes(backImage.mimetype)) {
      res.status(400).json({ message: 'Back image must be jpeg, jpg, png or webp' });
      return;
    }

    if (backImage.size > MAX_IMAGE_SIZE) {
      res.status(400).json({
        message: `Back image must be less than ${MAX_IMAGE_SIZE / (1024 * 1024)} MB`
      });
      return;
    }
  }

  next();
}