import { IsEmail, IsJWT } from "class-validator";

export class AuthForgotDTO {

  @IsEmail()
  email: string;
  
}