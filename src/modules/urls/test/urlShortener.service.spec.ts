import { UrlShortenerService } from '../services/urlShortener.service';

describe('UrlShortenerService', () => {
  let service: UrlShortenerService;

  beforeEach(() => {
    service = new UrlShortenerService();
  });

  it('deve gerar um código com o comprimento especificado (sem userId)', () => {
    const url = 'https://example.com';
    const length = 6;
    const code = service.generateCodeFromHash(url, length);

    expect(typeof code).toBe('string');
    expect(code.length).toBe(length);
  });

  it('deve gerar um código com o comprimento especificado (com userId)', () => {
    const url = 'https://example.com';
    const userId = 42;
    const length = 8;
    const code = service.generateCodeFromHash(url, length, userId);

    expect(typeof code).toBe('string');
    expect(code.length).toBe(length);
  });

  it('deve gerar códigos diferentes para diferentes URLs', () => {
    const code1 = service.generateCodeFromHash('https://example1.com', 6);
    const code2 = service.generateCodeFromHash('https://example2.com', 6);

    expect(code1).not.toBe(code2);
  });

  it('deve gerar códigos diferentes para diferentes usuários', () => {
    const url = 'https://example.com';
    const code1 = service.generateCodeFromHash(url, 6, 1);
    const code2 = service.generateCodeFromHash(url, 6, 2);

    expect(code1).not.toBe(code2);
  });
});
