import { UpdateUrlShortenerService } from '../services/updateUrlShortener.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { FindUrlByUrlShortService } from '../services/findUrlByUrlShort.service';

describe('UpdateUrlShortenerService', () => {
  let service: UpdateUrlShortenerService;
  let prisma: PrismaService;
  let findUrlByUrlShortService: FindUrlByUrlShortService;

  beforeEach(() => {
    prisma = {
      url: {
        update: jest.fn(),
      },
    } as any;

    findUrlByUrlShortService = {
      execute: jest.fn(),
    } as any;

    service = new UpdateUrlShortenerService(prisma, findUrlByUrlShortService);
  });

  it('deve atualizar a URL encurtada com sucesso', async () => {
    const oldUrl = 'http://localhost:3000/shortened/abc123';
    const newUrl = 'http://localhost:3000/shortened/xyz789';
    const userId = 1;

    (findUrlByUrlShortService.execute as jest.Mock).mockResolvedValue({
      url_shortened: oldUrl,
      userId,
      active: true,
    });

    const updatedUrl = {
      id: 1,
      url_shortened: newUrl,
      url_original: 'https://example.com',
      clickCounter: 5,
      active: true,
    };

    (prisma.url.update as jest.Mock).mockResolvedValue(updatedUrl);

    const result = await service.execute(oldUrl, newUrl, userId);

    expect(prisma.url.update).toHaveBeenCalledWith({
      where: { url_shortened: oldUrl },
      data: { url_shortened: newUrl },
    });

    expect(result).toEqual(updatedUrl);
  });

  it('deve lançar erro se a URL não for encontrada', async () => {
    (findUrlByUrlShortService.execute as jest.Mock).mockResolvedValue(null);

    await expect(
      service.execute(
        'http://localhost:3000/shortened/abc123',
        'http://localhost:3000/shortened/xyz789',
        1,
      ),
    ).rejects.toThrow('URL not found.');
  });

  it('deve lançar erro se a URL estiver inativa', async () => {
    (findUrlByUrlShortService.execute as jest.Mock).mockResolvedValue({
      active: false,
      userId: 1,
    });

    await expect(
      service.execute(
        'http://localhost:3000/shortened/abc123',
        'http://localhost:3000/shortened/xyz789',
        1,
      ),
    ).rejects.toThrow('URL deleted.');
  });

  it('deve lançar erro se o usuário não for o dono da URL', async () => {
    (findUrlByUrlShortService.execute as jest.Mock).mockResolvedValue({
      active: true,
      userId: 2,
    });

    await expect(
      service.execute(
        'http://localhost:3000/shortened/abc123',
        'http://localhost:3000/shortened/xyz789',
        1,
      ),
    ).rejects.toThrow('You do not have permission to delete this URL.');
  });

  it('deve lançar erro se o formato da nova URL for inválido', async () => {
    (findUrlByUrlShortService.execute as jest.Mock).mockResolvedValue({
      active: true,
      userId: 1,
    });

    await expect(
      service.execute(
        'http://localhost:3000/shortened/abc123',
        'http://google.com/wrongformat',
        1,
      ),
    ).rejects.toThrow(
      'Invalid URL format. Use: http://localhost:3000/shortened/{code}',
    );
  });

  it('deve lançar erro se o código da nova URL for repetitivo ou inválido', async () => {
    (findUrlByUrlShortService.execute as jest.Mock).mockResolvedValue({
      active: true,
      userId: 1,
    });

    await expect(
      service.execute(
        'http://localhost:3000/shortened/abc123',
        'http://localhost:3000/shortened/aaaaaa',
        1,
      ),
    ).rejects.toThrow(
      'Invalid code: it cannot contain repeated characters or repetitive patterns, nor be shorter than 6 characters.',
    );
  });
});
