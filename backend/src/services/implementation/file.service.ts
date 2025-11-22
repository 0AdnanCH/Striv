import { fileRepository } from '../../repositories/implementation/file.repository'; 
import { generateFileName } from '../../utils/generateFileName.util';

export class FileService {
  async uploadTrainerDocument(trainerId: string, file: Express.Multer.File) {
    const fileName = generateFileName(file.originalname);

    const key = `trainer/${trainerId}/documents/${fileName}`;

    return await fileRepository.upload(key, file.buffer, file.mimetype);
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
      throw new Error('No certificate files provided for upload.');
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