import { s3Provider } from '../../providers/s3.provider';

export class FileRepository {
  upload = s3Provider.uploadFile.bind(s3Provider);
  delete = s3Provider.deleteFile.bind(s3Provider);
}

export const fileRepository = new FileRepository();