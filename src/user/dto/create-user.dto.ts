import { IsEmail, IsString, IsStrongPassword, MinLength, isString } from "class-validator";

export class CreateUserDTO {

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  password: string;
}