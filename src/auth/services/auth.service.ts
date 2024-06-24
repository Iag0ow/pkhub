import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/schemas/User.schema';
import { UserService } from 'src/user/services/user.service';
import { ResponseAuthDTO } from '../dto/response-auth-login-dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailer: MailerService,
  ) {}
  async createToken(user: User): Promise<string> {
    return this.jwtService.sign(
      {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      {
        subject: String(user._id),
        expiresIn: '1d',
        algorithm: 'HS256',
        issuer: 'pkhub',
      },
    );
  }
  checkToken(token: string, options?: any | null) {
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }
    try {
      const payload = this.jwtService.verify(token, options);
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
    const user = await this.userService.findByEmail(email);
    const token = this.jwtService.sign(
      {
        id: user._id,
      },
      {
        subject: String(user._id),
        expiresIn: '2m',
        issuer: 'pkhubForgot',
        audience: 'pkhubForgot',
        algorithm: 'HS256',
      },
    );

    await this.mailer.sendMail({
      to: email,
      subject: 'Recuperação de senha',
      template: 'forgot-password',
      context: {
        name: user.name,
        token: token,
      },
    });

    return {
      message: 'Successfully sent email',
    };
  }

  async resetPassword(password: string, token: string) {
    const decoded = this.checkToken(token, {
      issuer: 'pkhubForgot',
      audience: 'pkhubForgot',
    });
    password = await bcrypt.hash(password, 12);
    await this.userService.updateUserPassword(decoded.id, password);
    return {
      message: 'Successfully updated password',
    };
  }
}
