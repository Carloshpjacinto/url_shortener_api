/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindUserByEmailService } from 'src/modules/users/services/findUserByEmail.service';

@Injectable()
export class ProfileAuthUserService {
  constructor(
    private readonly findUserByEmailService: FindUserByEmailService,
  ) {}

  async execute(body: string) {
    try {
      const user = await this.findUserByEmailService.execute(body);

      if (!user) {
        throw new NotFoundException('User not found.');
      }

      return {
        id: user.id,
        nome: user.name,
        email: user.email,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error while retrieving user',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
