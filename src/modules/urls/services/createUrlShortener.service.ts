/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUrlShortenerDto } from '../dto/create-url-shortener.dto';
import { UrlShortenerService } from './urlShortener.service';
import { Url } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class CreateUrlShortenerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly urlShortenerService: UrlShortenerService,
  ) {}

  async execute(
    createUrlShortenerDto: CreateUrlShortenerDto,
    userId: number | null,
  ): Promise<Url> {
    try {
      const { url } = createUrlShortenerDto;

      const code = this.urlShortenerService.generateCodeFromHash(
        url,
        6,
        userId ?? null,
      );

      const data: any = {
        url_original: url,
        url_shortened: `http://localhost:3000/shortened/${code}`,
        clickCounter: 0,
        active: true,
      };

      if (userId !== undefined && userId !== null) {
        data.user = { connect: { id: userId } };
      }

      return await this.prisma.url.create({ data });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Shortened URL already exists.');
      }

      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error while creating shortened URL',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
