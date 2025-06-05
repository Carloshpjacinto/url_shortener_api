import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateClickCounterService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(urlShort: string, newClickCounetr: number) {
    return await this.prisma.url.update({
      where: { url_shortened: urlShort },
      data: { clickCounter: newClickCounetr },
    });
  }
}
