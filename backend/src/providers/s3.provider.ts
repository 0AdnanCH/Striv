import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '../configs/aws.config';
import { env } from '../configs/env.config';

export class S3Provider {
  private _bucket = env.AWS_S3_BUCKET!;

  async uploadFile(key: string, fileBuffer: Buffer, mimeType: string) {
    const command = new PutObjectCommand({
      Bucket: this._bucket,
      Key: key,
      Body: fileBuffer,
      ContentType: mimeType
    });

    await s3Client.send(command);

    return `https://${this._bucket}.s3.amazonaws.com/${key}`;
  }

  async deleteFile(key: string) {
    const command = new DeleteObjectCommand({
      Bucket: this._bucket,
      Key: key
    });

    await s3Client.send(command);
  }
}

export const s3Provider = new S3Provider();