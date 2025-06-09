import { RedirectUrlAuthService } from '../services/redirectUrlAuth.service';
import { FindUrlByUrlShortService } from 'src/modules/urls/services/findUrlByUrlShort.service';
import { UpdateClickCounterService } from 'src/modules/urls/services/updateClickCounter.service';

describe('RedirectUrlAuthService', () => {
  let service: RedirectUrlAuthService;
  let findUrlByUrlShortService: FindUrlByUrlShortService;
  let updateClickCounterService: UpdateClickCounterService;

  beforeEach(() => {
    findUrlByUrlShortService = {
      execute: jest.fn(),
    } as any;

    updateClickCounterService = {
      execute: jest.fn(),
    } as any;

    service = new RedirectUrlAuthService(
      findUrlByUrlShortService,
      updateClickCounterService,
    );
  });

  it('deve retornar a URL original e atualizar o contador de cliques', async () => {
    const urlShortener = 'abc123';
    const urlData = {
      url_original: 'https://example.com',
      url_shortened: urlShortener,
      active: true,
      clickCounter: 3,
    };

    (findUrlByUrlShortService.execute as jest.Mock).mockResolvedValue(urlData);
    (updateClickCounterService.execute as jest.Mock).mockResolvedValue(
      undefined,
    );

    const result = await service.execute(urlShortener);

    expect(findUrlByUrlShortService.execute).toHaveBeenCalledWith(urlShortener);
    expect(updateClickCounterService.execute).toHaveBeenCalledWith(
      urlShortener,
      4,
    );
    expect(result).toBe('https://example.com');
  });

  it('deve lançar erro se a URL não for encontrada', async () => {
    const urlShortener = 'notfound123';
    (findUrlByUrlShortService.execute as jest.Mock).mockResolvedValue(null);

    await expect(service.execute(urlShortener)).rejects.toThrowError(
      'URL not found',
    );
  });

  it('deve lançar erro se a URL estiver desativada', async () => {
    const urlShortener = 'abc123';
    const urlData = {
      url_original: 'https://example.com',
      url_shortened: urlShortener,
      active: false,
      clickCounter: 3,
    };

    (findUrlByUrlShortService.execute as jest.Mock).mockResolvedValue(urlData);

    await expect(service.execute(urlShortener)).rejects.toThrowError(
      'URL deleted.',
    );
  });
});
