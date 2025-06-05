/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
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

  execute(
    createUrlShortenerDto: CreateUrlShortenerDto,
    userId: number | null,
  ): Promise<Url> {
    const { url } = createUrlShortenerDto;

    const code = this.urlShortenerService.generateCodeFromHash(
      url,
      6,
      userId ?? null,
    );

    const data: any = {
      url_original: url,
      url_shortened: `http://localhost:${3000}/shortened/${code}`,
      clickCounter: 0,
      active: true,
    };

    if (userId !== undefined) {
      data.user = { connect: { id: userId } };
    }

    return this.prisma.url.create({ data });
  }
}
