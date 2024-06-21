import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { IsObjectId } from 'src/decorators/objectid.decorator';

export class CreateContentDTO {
  
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsEmail()
  image: string;

  private _userId: Types.ObjectId | string;

  set userId(userId: Types.ObjectId | string) {
    this._userId = userId;
  }

  get userId(): Types.ObjectId | string {
    return this._userId;
  }
}
