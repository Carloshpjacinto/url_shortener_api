import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
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
    const user = await this.findUserByIdService.execute(id);

    const url = await this.findUrlByUrlShortService.execute(urlShortener);

    if (!user || user.id != url?.userId) {
      throw new Error('Você não tem permissão para exluir essa URL');
    }
    return await this.prisma.url.update({
      where: { url_shortened: urlShortener },
      data: { active: false },
    });
  }
}
