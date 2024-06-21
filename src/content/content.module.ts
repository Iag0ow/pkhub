import { Module } from '@nestjs/common';
import { ContentController } from './controllers/content.controller';
import { ContentService } from './services/content.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Content, ContentSchema } from './schemas/Content.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
     name: Content.name, 
     schema: ContentSchema 
    }]),
    AuthModule
  ],
  controllers: [ContentController],
  providers: [ContentService],
  exports: [ContentService]
})
export class ContentModule {}
