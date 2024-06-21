import { IsEmail, IsNumber, IsOptional, IsString, IsStrongPassword, MinLength, isString } from "class-validator";
export class UpdateUserDTO {
  
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  profilePic?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  // @IsNumber()
  // role?: number;
  
}