/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaService } from 'src/modules/prisma/prisma.service';
import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindUserByIdService } from 'src/modules/users/services/findUserById.service';
import { FindUrlByUrlShortService } from './findUrlByUrlShort.service';

@Injectable()
export class DeleteUrlShortenerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly findUserByIdService: FindUserByIdService,
    private readonly findUrlByUrlShortService: FindUrlByUrlShortService,
  ) {}

  async execute(urlShortener: string, id: number) {
    try {
      const user = await this.findUserByIdService.execute(id);
      const url = await this.findUrlByUrlShortService.execute(urlShortener);

      if (!url) {
        throw new NotFoundException('URL not found.');
      }

      if (!user || user.id !== url.userId) {
        throw new ForbiddenException(
          'You do not have permission to delete this URL.',
        );
      }

      return await this.prisma.url.update({
        where: { url_shortened: urlShortener },
        data: { active: false },
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; // repassa os erros esperados
      }

      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error while deleting the URL',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
