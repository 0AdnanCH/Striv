import { HTTP_STATUS } from '../../constants/httpStatus.constants';
import { RESPONSE_MESSAGES } from '../../constants/responseMessages.constants';
import BadRequestError from '../../errors/badRequest.error';
import { fileRepository } from '../../repositories/implementation/file.repository'; 
import { generateFileName } from '../../utils/generateFileName.util';

export class FileService {
  async uploadTrainerDocument(trainerId: string, file: Express.Multer.File) {
    const fileName = generateFileName(file.originalname);

    const key = `trainer/${trainerId}/documents/${fileName}`;

    const url = await fileRepository.upload(key, file.buffer, file.mimetype);

    return url;
  }

  async uploadUserProfilePhoto(userId: string, file: Express.Multer.File) {
    const fileName = generateFileName(file.originalname);
    const key = `users/${userId}/profile/${fileName}`;

    const url = await fileRepository.upload(key, file.buffer, file.mimetype);

    return url;
  }

  async uploadTrainerCertificates(trainerId: string, files: Express.Multer.File | Express.Multer.File[]) {
    const fileList = Array.isArray(files) ? files : [files];

    if (fileList.length === 0) {
      throw new BadRequestError({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.NO_CERTIFICATE_FILES_PROVIDED,
        logging: false
      });
    }

    const uploads = await Promise.all(
      fileList.map(async (file) => {
        const fileName = generateFileName(file.originalname);
        const key = `trainer/${trainerId}/certificates/${fileName}`;

        const url = await fileRepository.upload(key, file.buffer, file.mimetype);

        return url;
      })
    );

    return uploads;
  }
}