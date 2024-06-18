import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthLoginDTO } from '../dto/auth-login.dto';
import { AuthForgotDTO } from '../dto/auth-forgot.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: AuthLoginDTO) {
    return this.authService.login(body.email, body.password);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: AuthForgotDTO) {
    return body;
  }
  @Post('reset-password')
  async resetPassword(@Body() body: AuthForgotDTO) {

    return this.authService.login(body.email, body.token);;
  }

}
