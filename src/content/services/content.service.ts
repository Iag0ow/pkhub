import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Content } from '../schemas/Content.schema';
import { Model } from 'mongoose';
import { ResponseContentDTO } from '../dto/response-create-content.dto';
import { CreateContentDTO } from '../dto/create-content.dto';
import { ResponseLikeContentDTO } from '../dto/response-like-content';
import { Comment } from '../schemas/Comment.schema';
import { UserService } from 'src/user/services/user.service';
import { ResponseCommentContentDTO } from '../dto/response-comment-content';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Content.name) private readonly contentModel: Model<Content>,
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    private readonly userService: UserService,
  ) {}

  async getContents() {
    return await this.contentModel.find();
  }

  async postContent(content: CreateContentDTO) {
    const newContent = await this.contentModel.create(content);
    return new ResponseContentDTO(newContent);
  }

  async commentContent(userId: string, contentId: string, text: any) {
    const content = await this.contentModel.findOne({ _id: contentId });
    if (!content) {
      throw new NotFoundException(`Content with ID ${contentId} not found`);
    }

    const user = await this.userService.getUser(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const userComment = {
      userId: user._id,
      name: user.name,
      comment: text.comment,
      profilePic: user.profilePic,
      createdAt: new Date(),
    };
    const newComent = new this.commentModel(userComment);
    content.comments.push(newComent);
    await content.save();

    return new ResponseCommentContentDTO(newComent);
  }

  async likeContent(userId: string, contentId: string) {
    const content = await this.contentModel.findOne({ _id: contentId });
    if (!content) {
      throw new NotFoundException(`Content with ID ${contentId} not found`);
    }
    if (content.likes.includes(userId)) {
      content.likes = content.likes.filter(
        (userIdLike) => userIdLike !== userId,
      );
      await content.save();
      return new ResponseLikeContentDTO(content);
    }
    content.likes.push(userId);
    await content.save();
    return new ResponseLikeContentDTO(content);
  }

  async deleteContent(userId: string, contentId: string) {
    const propertyUser = await this.contentModel.findOne({
      _id: contentId,
      userId: userId,
    });
    if (!propertyUser) {
      throw new NotFoundException(`Content with ID ${contentId} not found`);
    }
    await this.contentModel.deleteOne({ _id: contentId });
    return { message: 'Content deleted successfully' };
  }

  async deleteComment(userId: string, contentId: string, commentId: string) {
    const content = await this.contentModel.findOne({ _id: contentId });
    if (!content) {
      throw new NotFoundException(`Content with ID ${contentId} not found`);
    }

    const comment = content.comments.find(
      (comment) => comment._id.toString() === commentId,
    );
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${commentId} not found`);
    }
    if (comment.userId.toString() !== userId) {
      throw new ForbiddenException(
        `User with ID ${userId} is not authorized to delete this comment`,
      );
    }

    content.comments = content.comments.filter(
      (comment) => comment._id.toString() !== commentId,
    );

    await content.save();

    return { message: 'Comment deleted successfully' };
  }

  async deleteAllContents() {
    await this.contentModel.deleteMany({});
    return { message: 'All Content deleted successfully' };
  }
}
