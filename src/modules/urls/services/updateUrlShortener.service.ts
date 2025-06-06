/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaService } from 'src/modules/prisma/prisma.service';
import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindUrlByUrlShortService } from './findUrlByUrlShort.service';

@Injectable()
export class UpdateUrlShortenerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly findUrlByUrlShortService: FindUrlByUrlShortService,
  ) {}

  async execute(oldUrl: string, newUrl: string, userId: number) {
    try {
      const url = await this.findUrlByUrlShortService.execute(oldUrl);

      if (!url) {
        throw new NotFoundException('URL not found.');
      }

      if (url.active !== true) {
        throw new BadRequestException('URL deleted.');
      }

      if (url.userId !== userId) {
        throw new ForbiddenException(
          'You do not have permission to edit this URL.',
        );
      }

      const regex = /^http:\/\/localhost:3000\/shortened\/([a-zA-Z0-9_-]+)$/;
      const match = newUrl.match(regex);

      if (!match) {
        throw new BadRequestException(
          'Invalid URL format. Use: http://localhost:3000/shortened/{code}',
        );
      }

      const code = match[1];

      if (this.isRepeating(code) || code.length !== 6) {
        throw new BadRequestException(
          'Invalid code: it cannot contain repeated characters or repetitive patterns, nor be shorter than 6 characters.',
        );
      }

      return await this.prisma.url.update({
        where: { url_shortened: oldUrl },
        data: { url_shortened: newUrl },
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error while updating the shortened URL',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private isRepeating(code: string): boolean {
    if (/^([a-zA-Z0-9_-])\1+$/.test(code)) return true;

    const len = code.length;
    for (let i = 1; i <= Math.floor(len / 2); i++) {
      if (len % i !== 0) continue;

      const pattern = code.slice(0, i);
      const repeated = pattern.repeat(len / i);
      if (repeated === code) return true;
    }

    return false;
  }
}
