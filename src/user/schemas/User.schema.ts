import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Role } from '../../global/enums/role.enum';

@Schema({ timestamps: true })
export class User {
  _id?: mongoose.ObjectId | string;

  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ default: 1 })
  role?: Role;

  @Prop({ required: true })
  password?: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ default: null, required: false })
  profilePic?: string;

  @Prop({ default: null, required: false })
  bio?: string;

  @Prop({ default: null, required: false })
  token?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
