import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
export class CreateContentDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  image: string;

  private _userId: Types.ObjectId | string;

  set userId(userId: Types.ObjectId | string) {
    this._userId = userId;
  }

  get userId(): Types.ObjectId | string {
    return this._userId;
  }
}
