import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class AuthService {
  constructor( private readonly jwtService: JwtService, private readonly userService: UserService ) {}
  async createToken(body: any){
    const token = await this.jwtService.signAsync(body);
    body.token = token;
    return body;
  }

  async checkToken(token: string) {
    const decoded = await this.jwtService.verifyAsync(token);
    return decoded;
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!await bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.createToken({  });

    return {
      name: user.name,
      msg: 'Login realizado com sucesso'
    };
  }

  async forgotPassword(body: any) {
    return body;
  }

  async resetPassword(body: any) {
    return body;
  }

}
