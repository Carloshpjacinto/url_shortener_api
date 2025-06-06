import { FindAllUrlShortenerService } from '../services/findAllUrlShortener.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';

describe('FindAllUrlShortenerService', () => {
  let service: FindAllUrlShortenerService;
  let prisma: PrismaService;

  beforeEach(() => {
    prisma = {
      url: {
        count: jest.fn(),
        findMany: jest.fn(),
      },
    } as any;

    service = new FindAllUrlShortenerService(prisma);
  });

  it('deve retornar URLs paginadas de um usuário', async () => {
    const userId = 1;
    const page = 2;
    const limit = 5;
    const mockData = [
      { id: 6, url_shortened: 'short1', active: true },
      { id: 7, url_shortened: 'short2', active: true },
    ];

    (prisma.url.count as jest.Mock).mockResolvedValue(12);
    (prisma.url.findMany as jest.Mock).mockResolvedValue(mockData);

    const result = await service.execute(userId, page, limit);

    expect(prisma.url.count).toHaveBeenCalledWith({
      where: { userId: userId, active: true },
    });

    expect(prisma.url.findMany).toHaveBeenCalledWith({
      where: { userId: userId, active: true },
      take: limit,
      skip: (page - 1) * limit,
    });

    expect(result).toEqual({
      total: 12,
      page,
      per_page: limit,
      data: mockData,
    });
  });
});
