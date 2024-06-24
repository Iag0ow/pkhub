import { BadRequestException, Injectable } from '@nestjs/common';
import { writeFile, existsSync, mkdirSync } from 'fs';
import { writeFile as writeFilePromise } from 'fs/promises';
import { ObjectId } from 'mongoose';
import { join } from 'path';

@Injectable()
export class FileService {
  constructor() {}

  async uploadFile(userId: ObjectId, photo: Express.Multer.File) {
    const storagePath = join(process.cwd(), 'storage');
    const userPhotosPath = join(storagePath, 'UserPhotos');
    const filePath = join(userPhotosPath, userId + '.jpg');

    try {
      if (!existsSync(storagePath)) {
        mkdirSync(storagePath);
      }

      if (!existsSync(userPhotosPath)) {
        mkdirSync(userPhotosPath);
      }

      await writeFilePromise(filePath, photo.buffer);
    } catch (error) {
      throw new BadRequestException('Error uploading file');
    }

    return {
      message: 'File uploaded successfully',
    };
  }
}
