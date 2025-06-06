import { validate } from 'class-validator';
import { CreateUrlShortenerDto } from '../dto/create-url-shortener.dto';

describe('CreateUrlShortenerDto', () => {
  it('deve ser válido com uma URL válida', async () => {
    const dto = new CreateUrlShortenerDto();
    dto.url = 'https://example.com/shortened/abc123'; // URL pública válida

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('deve falhar se a URL estiver vazia', async () => {
    const dto = new CreateUrlShortenerDto();
    dto.url = '';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.isNotEmpty).toBeDefined();
  });

  it('deve falhar se a URL for inválida', async () => {
    const dto = new CreateUrlShortenerDto();
    dto.url = 'not-a-url';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.isUrl).toBeDefined();
  });
});
