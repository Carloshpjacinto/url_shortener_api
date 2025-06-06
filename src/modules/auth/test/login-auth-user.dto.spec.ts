import { validate } from 'class-validator';
import { LoginAuthUserDto } from '../dto/login-auth-user.dto';

describe('LoginAuthUserDto', () => {
  it('deve ser válido com email e senha corretos', async () => {
    const dto = new LoginAuthUserDto();
    dto.email = 'user@example.com';
    dto.password = 'securePassword123';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('deve falhar se o email estiver vazio', async () => {
    const dto = new LoginAuthUserDto();
    dto.email = '';
    dto.password = 'somePassword';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('deve falhar se o email for inválido', async () => {
    const dto = new LoginAuthUserDto();
    dto.email = 'invalid-email';
    dto.password = 'somePassword';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isEmail');
  });

  it('deve falhar se a senha estiver vazia', async () => {
    const dto = new LoginAuthUserDto();
    dto.email = 'user@example.com';
    dto.password = '';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });
});
