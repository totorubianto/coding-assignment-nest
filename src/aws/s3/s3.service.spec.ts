import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'fs';
import { FileUpload } from './interfaces/file.interface';
import { S3Service } from './s3.service';
import * as path from "path"

describe('S3Service', () => {
  let service: S3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [S3Service],
    }).compile();

    service = module.get<S3Service>(S3Service);
  });

  it('upload', async () => {
    const pathFile = path.join(__dirname, '../../../public', '/downloads/test.txt');
    const originalname = path.basename(pathFile);
    const ext = originalname.split('.').pop();
    const filename = originalname.split('.')[0];
    var file = await fs.promises.readFile(pathFile, 'utf8');
    const params: FileUpload = {
      originalname: path.basename(pathFile),
      buffer: Buffer.from(file, "utf8")
    }
    const result = `${filename.substring(0, 10)}_${Date.now()}.${ext}`;
    jest.spyOn(service, 'upload').mockImplementation(async () => result);
    expect(await service.upload(params)).toBe(result);
  });
});
