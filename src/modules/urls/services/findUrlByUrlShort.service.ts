import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindUrlByUrlShortService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(urlShortener: string) {
    return await this.prisma.url.findUnique({
      where: { url_shortened: urlShortener, active: true },
    });
  }
}
