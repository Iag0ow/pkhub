import { Content } from '../schemas/Content.schema';

export class ResponseLikeContentDTO {
  _id: string;
  likes: string[];
  totalLikes: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(content: Content) {
    this._id = String(content._id);
    this.likes = content.likes;
    this.totalLikes = content.likes.length;
    this.createdAt = content.createdAt;
    this.updatedAt = content.updatedAt;
  }
}
