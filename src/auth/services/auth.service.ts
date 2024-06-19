import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/schemas/User.schema';
import { UserService } from 'src/user/services/user.service';
import { ResponseAuthDTO } from '../dto/response-auth-login-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async createToken(user: User): Promise<string> {
    return this.jwtService.sign(
      {
        name: user.name,
        email: user.email,
      },
      {
        subject: String(user._id),
        expiresIn: '1d',
        algorithm: 'HS256',
        issuer: 'pkhub',
      },
    );
  }
  checkToken(token: string) {
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const payload = this.jwtService.verify(token);
      return payload;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return new ResponseAuthDTO(user, await this.createToken(user));
  }

  async forgotPassword(email: string) {
    return email;
  }

  async resetPassword(password: string, token: string) {
    return password;
  }
}
