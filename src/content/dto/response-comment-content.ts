import { Comment } from '../schemas/Comment.schema';

export class ResponseCommentContentDTO {
  _id: string;
  userId: string;
  name: string;
  comment: string;
  profilePic?: string;
  createdAt: Date;

  constructor(comment: Comment) {
    this._id = String(comment._id);
    this.userId = String(comment.userId);
    this.name = comment.name;
    this.comment = comment.comment;
    this.profilePic = comment.profilePic;
    this.createdAt = comment.createdAt;
  }
}
