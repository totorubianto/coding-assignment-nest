import { AWS_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, DOWNLOAD_PATH } from './../../config/app.config';
import { FileUpload } from './interfaces/file.interface';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';

@Injectable()
export class S3Service {
  private s3: AWS.S3
  constructor() {

    AWS.config.update({
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      region: AWS_REGION
    });
    this.s3 = new AWS.S3();
  }

  // TODO: To be implemented.
  // TODO: Unit test is needed in src/aws/s3/s3.service.spec.ts.
  async upload(file: FileUpload): Promise<String> {
    const { originalname, buffer } = file;
    const ext = originalname.split('.').pop();
    const filename = originalname.split('.')[0];
    const key = filename.substring(0, 10) + '_' + Date.now() + '.' + ext;

    const params: AWS.S3.Types.PutObjectRequest = {
      Body: buffer,
      Bucket: AWS_BUCKET,
      Key: key,
      ACL: 'public-read'
    };
    const { Key } = await this.s3.upload(params).promise().catch((err: AWS.AWSError) => {
      let message = err.message ? err.message : "Internal server error"
      throw new InternalServerErrorException(message)
    })
    return Key;
  }

  // TODO: To be implemented.
  // NOTE: Unit test is NOT needed.
  // NOTE: This is actually a hint for you to code right with NestJS.
  //   If you're sure you have done so with the upload function,
  //   you don't need to implement this one.
  async download(key: string): Promise<Boolean> {
    const params: AWS.S3.Types.GetObjectRequest = {
      Bucket: AWS_BUCKET,
      Key: key,
    };

    let { Body } = await this.s3.getObject(params).promise().catch((err: AWS.AWSError) => {
      let message = err.message ? err.message : "Internal server error"
      throw new InternalServerErrorException(message)
    })
    fs.writeFileSync(DOWNLOAD_PATH, Body.toString())
    return true
  }
}
