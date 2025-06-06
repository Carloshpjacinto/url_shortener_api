import { validate } from 'class-validator';
import { ValidateTokenDTO } from '../dto/validate-token-auth.dto';

describe('ValidateTokenDTO', () => {
  it('deve ser válido com valid=true e message como string', async () => {
    const dto = new ValidateTokenDTO();
    dto.valid = true;
    dto.message = 'Token is valid';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('deve ser válido com valid=false e message undefined', async () => {
    const dto = new ValidateTokenDTO();
    dto.valid = false;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('deve falhar se valid não for booleano', async () => {
    const dto = new ValidateTokenDTO();
    dto.valid = 'true';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isBoolean');
  });

  it('deve falhar se valid for vazio (undefined)', async () => {
    const dto = new ValidateTokenDTO();

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('deve falhar se message não for string', async () => {
    const dto = new ValidateTokenDTO();
    dto.valid = true;
    // @ts-expect-error test invalid type
    dto.message = 123;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isString');
  });
});
