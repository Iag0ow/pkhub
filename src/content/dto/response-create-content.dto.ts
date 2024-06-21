import { Content } from "../schemas/Content.schema";

export class ResponseContentDTO {
  _id: string;
  title: string;
  description: string;
  image: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(content: Content) {
    this._id = String(content._id);
    this.title = content.title;
    this.description = content.description;
    this.image = content.image;
    this.userId = String(content.userId);
    this.createdAt = content.createdAt;
    this.updatedAt = content.updatedAt;
  }
}
