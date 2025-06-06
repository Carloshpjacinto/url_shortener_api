import { UpdateClickCounterService } from '../services/updateClickCounter.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';

describe('UpdateClickCounterService', () => {
  let service: UpdateClickCounterService;
  let prisma: PrismaService;

  beforeEach(() => {
    prisma = {
      url: {
        update: jest.fn(),
      },
    } as any;

    service = new UpdateClickCounterService(prisma);
  });

  it('deve atualizar o contador de cliques da URL', async () => {
    const shortUrl = 'abc123';
    const newClickCount = 42;

    const updatedUrl = {
      id: 1,
      url_shortened: shortUrl,
      clickCounter: newClickCount,
      url_original: 'https://example.com',
      active: true,
    };

    (prisma.url.update as jest.Mock).mockResolvedValue(updatedUrl);

    const result = await service.execute(shortUrl, newClickCount);

    expect(prisma.url.update).toHaveBeenCalledWith({
      where: { url_shortened: shortUrl },
      data: { clickCounter: newClickCount },
    });

    expect(result).toEqual(updatedUrl);
  });
});
