import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from 'mongoose';
import { Comment, CommentSchema } from "./Comment.schema";

@Schema({ timestamps: true })
export class Content {

  _id?: mongoose.ObjectId | string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  userId: string;

  @Prop()
  likes: Array<string>;

  @Prop({ type: [CommentSchema], default: [] })
  comments: Array<Comment>;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}


export const ContentSchema = SchemaFactory.createForClass(Content);