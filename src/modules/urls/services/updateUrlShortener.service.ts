import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { FindUrlByUrlShortService } from './findUrlByUrlShort.service';

@Injectable()
export class UpdateUrlShortenerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly findUrlByUrlShortService: FindUrlByUrlShortService,
  ) {}

  async execute(oldUrl: string, newUrl: string, userId: number) {
    const url = await this.findUrlByUrlShortService.execute(oldUrl);

    if (!url) {
      throw new Error('Url não encontrada');
    }

    if (url.active != true) {
      throw new Error('Url não disponivel');
    }

    if (url.userId != userId) {
      throw new Error('Você não tem permissão para excluir essa URL');
    }

    const regex = /^http:\/\/localhost:3000\/shortened\/([a-zA-Z0-9_-]+)$/;

    const match = newUrl.match(regex);

    if (!match) {
      throw new Error(
        'Formato de URL inválido. Use: http://localhost:3000/shortened/{code}',
      );
    }

    const code = match[1];

    if (this.isRepeating(code) || code.length !== 6) {
      throw new Error(
        'Código inválido: não pode conter caracteres repetidos ou padrões repetitivos nem ter menos de 6 caracteres.',
      );
    }

    return await this.prisma.url.update({
      where: { url_shortened: oldUrl },
      data: { url_shortened: newUrl },
    });
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
