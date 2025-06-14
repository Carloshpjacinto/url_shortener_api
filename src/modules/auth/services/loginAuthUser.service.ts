/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { JwtService } from '@nestjs/jwt';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginAuthUserDto } from '../dto/login-auth-user.dto';
import { FindUserByEmailService } from 'src/modules/users/services/findUserByEmail.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class LoginAuthUserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly findUserByEmailService: FindUserByEmailService,
  ) {}

  async execute(body: LoginAuthUserDto) {
    try {
      const user = await this.findUserByEmailService.execute(body.email);

      if (!user || !(await bcrypt.compare(body.password, user.password))) {
        throw new UnauthorizedException('Email or password is incorrect');
      }

      return await this.generateJwtToken(user);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error during login',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async generateJwtToken(user: User, expiresIn: string = '1d') {
    const payload = { sub: user.id, email: user.email };
    const options = {
      expiresIn: expiresIn,
      issuer: 'url_shortener_api',
      audience: 'users',
    };

    return { access_token: this.jwtService.sign(payload, options) };
  }
}
