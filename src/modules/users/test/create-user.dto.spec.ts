import { CreateUserDTO } from '../dto/create-user.dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

describe('CreateUserDTO', () => {
  it('deve validar com dados corretos', async () => {
    const dto = plainToInstance(CreateUserDTO, {
      name: 'Carlos',
      email: 'carlos@example.com',
      password: 'senha123',
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('deve falhar se faltar algum campo', async () => {
    const dto = plainToInstance(CreateUserDTO, {
      email: 'carlos@example.com',
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);

    const properties = errors.map((err) => err.property);
    expect(properties).toContain('name');
    expect(properties).toContain('password');
  });

  it('deve falhar com email inválido', async () => {
    const dto = plainToInstance(CreateUserDTO, {
      name: 'Carlos',
      email: 'email-invalido',
      password: 'senha123',
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('email');
  });
});
