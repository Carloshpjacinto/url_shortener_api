import { DeleteUrlShortenerService } from '../services/deleteUrlShortener.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { FindUserByIdService } from 'src/modules/users/services/findUserById.service';
import { FindUrlByUrlShortService } from '../services/findUrlByUrlShort.service';

describe('DeleteUrlShortenerService', () => {
  let service: DeleteUrlShortenerService;
  let prisma: PrismaService;
  let findUserByIdService: FindUserByIdService;
  let findUrlByUrlShortService: FindUrlByUrlShortService;

  beforeEach(() => {
    prisma = {
      url: {
        update: jest.fn(),
      },
    } as any;

    findUserByIdService = {
      execute: jest.fn(),
    } as any;

    findUrlByUrlShortService = {
      execute: jest.fn(),
    } as any;

    service = new DeleteUrlShortenerService(
      prisma,
      findUserByIdService,
      findUrlByUrlShortService,
    );
  });

  it('deve desativar a URL se o usuário for o dono', async () => {
    const userId = 1;
    const urlShort = 'short123';

    const user = { id: userId };
    const url = { userId: userId };

    (findUserByIdService.execute as jest.Mock).mockResolvedValue(user);
    (findUrlByUrlShortService.execute as jest.Mock).mockResolvedValue(url);

    const expected = { success: true };

    (prisma.url.update as jest.Mock).mockResolvedValue(expected);

    const result = await service.execute(urlShort, userId);

    expect(findUserByIdService.execute).toHaveBeenCalledWith(userId);
    expect(findUrlByUrlShortService.execute).toHaveBeenCalledWith(urlShort);
    expect(prisma.url.update).toHaveBeenCalledWith({
      where: { url_shortened: urlShort },
      data: { active: false },
    });
    expect(result).toEqual(expected);
  });

  it('deve lançar erro se o usuário não for o dono da URL', async () => {
    const userId = 1;
    const urlShort = 'short123';

    const user = { id: userId };
    const url = { userId: 999 };

    (findUserByIdService.execute as jest.Mock).mockResolvedValue(user);
    (findUrlByUrlShortService.execute as jest.Mock).mockResolvedValue(url);

    await expect(service.execute(urlShort, userId)).rejects.toThrowError(
      'You do not have permission to delete this URL.',
    );
  });
});
