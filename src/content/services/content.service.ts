import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Content } from '../schemas/Content.schema';
import { Model } from 'mongoose';
import { ResponseContentDTO } from '../dto/response-create-content.dto';
import { CreateContentDTO } from '../dto/create-content.dto';

@Injectable()
export class ContentService {
  constructor(@InjectModel(Content.name) private readonly contentModel: Model<Content>) {}

  async getContents() {
    return await this.contentModel.find();
  }

  async postContent(content: CreateContentDTO) {
    const newContent = await this.contentModel.create(content);
    return new ResponseContentDTO(newContent);
  }

  // TODO: ANTES DE DELETAR, VERIFICAR SE O USUARIO É O DONO DO POST
  async deleteContent(userId: string, contentId: string) {
    try {
      const propertyUser = await this.contentModel.findOne({ _id: contentId, userId: userId });
      if (!propertyUser) {
        throw new NotFoundException(`Content with ID ${contentId} not found`);
      }
      await this.contentModel.deleteOne({ _id: contentId });
      return { message: 'Content deleted successfully' };
    } catch (error) {
        throw new BadRequestException(error); 
    }
  }

  async deleteAllContents() {
    await this.contentModel.deleteMany({});
  }
}
