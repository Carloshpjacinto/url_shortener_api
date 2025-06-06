import { CreateUrlShortenerService } from '../services/createUrlShortener.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UrlShortenerService } from '../services/urlShortener.service';
import { CreateUrlShortenerDto } from '../dto/create-url-shortener.dto';

describe('CreateUrlShortenerService', () => {
  let service: CreateUrlShortenerService;
  let prisma: PrismaService;
  let urlShortenerService: UrlShortenerService;

  beforeEach(() => {
    prisma = {
      url: {
        create: jest.fn(),
      },
    } as any;

    urlShortenerService = {
      generateCodeFromHash: jest.fn(),
    } as any;

    service = new CreateUrlShortenerService(prisma, urlShortenerService);
  });

  it('deve criar URL encurtada sem userId', async () => {
    const dto: CreateUrlShortenerDto = { url: 'https://example.com' };
    const code = 'def456';

    (urlShortenerService.generateCodeFromHash as jest.Mock).mockReturnValue(
      code,
    );

    const expectedUrl = {
      id: 2,
      url_original: dto.url,
      url_shortened: `http://localhost:3000/shortened/${code}`,
      clickCounter: 0,
      active: true,
    };

    (prisma.url.create as jest.Mock).mockResolvedValue(expectedUrl);

    const result = await service.execute(dto, null);

    expect(urlShortenerService.generateCodeFromHash).toHaveBeenCalledWith(
      dto.url,
      6,
      null,
    );
    expect(prisma.url.create).toHaveBeenCalledWith({
      data: {
        url_original: dto.url,
        url_shortened: `http://localhost:3000/shortened/${code}`,
        clickCounter: 0,
        active: true,
      },
    });
    expect(result).toEqual(expectedUrl);
  });

  it('deve criar URL encurtada com userId', async () => {
    const dto: CreateUrlShortenerDto = { url: 'https://example.com' };
    const userId = 123;
    const code = 'abc123';

    (urlShortenerService.generateCodeFromHash as jest.Mock).mockReturnValue(
      code,
    );

    const expectedUrl = {
      id: 1,
      url_original: dto.url,
      url_shortened: `http://localhost:3000/shortened/${code}`,
      clickCounter: 0,
      active: true,
    };

    (prisma.url.create as jest.Mock).mockResolvedValue(expectedUrl);

    const result = await service.execute(dto, userId);

    expect(urlShortenerService.generateCodeFromHash).toHaveBeenCalledWith(
      dto.url,
      6,
      userId,
    );
    expect(prisma.url.create).toHaveBeenCalledWith({
      data: {
        url_original: dto.url,
        url_shortened: `http://localhost:3000/shortened/${code}`,
        clickCounter: 0,
        active: true,
        user: { connect: { id: userId } },
      },
    });
    expect(result).toEqual(expectedUrl);
  });
});
