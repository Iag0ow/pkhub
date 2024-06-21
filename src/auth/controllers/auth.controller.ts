import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthLoginDTO } from '../dto/auth-login.dto';
import { AuthForgotDTO } from '../dto/auth-forgot.dto';
import { AuthResetDTO } from '../dto/auth-reset.dto';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/services/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() body: AuthLoginDTO) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  async create(@Body() body: CreateUserDTO) {
    return this.userService.register(body);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: AuthForgotDTO) {
    return this.authService.forgotPassword(body.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: AuthResetDTO) {
    return this.authService.resetPassword(body.password, body.token);;
  }
  @Get('check')
  async check(@Request() req: any) {
    return req.user;
  }

}
