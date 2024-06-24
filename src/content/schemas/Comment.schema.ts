import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
@Schema({ timestamps: true })
export class Comment {
  _id?: mongoose.Types.ObjectId | string;

  @Prop()
  userId: string;

  @Prop()
  name: string;

  @Prop({ required: true })
  comment: string;

  @Prop()
  profilePic?: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
