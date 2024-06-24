import { IsJWT, IsString, MinLength } from 'class-validator';

export class AuthResetDTO {
  @IsString()
  @MinLength(3)
  password: string;

  @IsJWT()
  token: string;
}
