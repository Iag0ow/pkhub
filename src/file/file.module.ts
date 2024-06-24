import { Module } from '@nestjs/common';
import { FileService } from './services/file.service';
import { FileController } from './controllers/file.controller';

@Module({
  imports: [],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
