import { FindUrlByUrlShortService } from '../services/findUrlByUrlShort.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';

describe('FindUrlByUrlShortService', () => {
  let service: FindUrlByUrlShortService;
  let prisma: PrismaService;

  beforeEach(() => {
    prisma = {
      url: {
        findUnique: jest.fn(),
      },
    } as any;

    service = new FindUrlByUrlShortService(prisma);
  });

  it('deve retornar a URL ativa correspondente ao código encurtado', async () => {
    const shortCode = 'abc123';
    const mockUrl = {
      id: 1,
      url_shortened: shortCode,
      url_original: 'https://example.com',
      active: true,
    };

    (prisma.url.findUnique as jest.Mock).mockResolvedValue(mockUrl);

    const result = await service.execute(shortCode);

    expect(prisma.url.findUnique).toHaveBeenCalledWith({
      where: { url_shortened: shortCode, active: true },
    });

    expect(result).toEqual(mockUrl);
  });
});
