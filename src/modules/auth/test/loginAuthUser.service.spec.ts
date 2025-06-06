import { JwtService } from '@nestjs/jwt';
import { LoginAuthUserService } from '../services/loginAuthUser.service';
import { FindUserByEmailService } from 'src/modules/users/services/findUserByEmail.service';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

describe('LoginAuthUserService', () => {
  let service: LoginAuthUserService;
  let jwtService: JwtService;
  let findUserByEmailService: FindUserByEmailService;

  beforeEach(() => {
    jwtService = {
      sign: jest.fn(),
    } as any;

    findUserByEmailService = {
      execute: jest.fn(),
    } as any;

    service = new LoginAuthUserService(jwtService, findUserByEmailService);
  });

  it('deve lançar UnauthorizedException se usuário não existir', async () => {
    const dto = { email: 'test@example.com', password: '123456' };

    (findUserByEmailService.execute as jest.Mock).mockResolvedValue(null);

    await expect(service.execute(dto)).rejects.toThrow(UnauthorizedException);
    expect(findUserByEmailService.execute).toHaveBeenCalledWith(dto.email);
  });

  it('deve lançar UnauthorizedException se senha estiver incorreta', async () => {
    const dto = { email: 'test@example.com', password: 'wrongpass' };
    const userMock = {
      id: 1,
      email: 'test@example.com',
      password: await bcrypt.hash('correctpass', 10),
    };

    (findUserByEmailService.execute as jest.Mock).mockResolvedValue(userMock);
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation(async (pass, hash) => false);

    await expect(service.execute(dto)).rejects.toThrow(UnauthorizedException);
    expect(findUserByEmailService.execute).toHaveBeenCalledWith(dto.email);
  });

  it('deve retornar token JWT quando usuário e senha estiverem corretos', async () => {
    const dto = { email: 'test@example.com', password: 'correctpass' };
    const userMock = {
      id: 1,
      email: 'test@example.com',
      password: await bcrypt.hash(dto.password, 10),
    };
    const token = 'jwt.token.here';

    (findUserByEmailService.execute as jest.Mock).mockResolvedValue(userMock);
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation(async (pass, hash) => pass === dto.password);
    (jwtService.sign as jest.Mock).mockReturnValue(token);

    const result = await service.execute(dto);

    expect(findUserByEmailService.execute).toHaveBeenCalledWith(dto.email);
    expect(jwtService.sign).toHaveBeenCalledWith(
      { sub: userMock.id, email: userMock.email },
      {
        expiresIn: '1d',
        issuer: 'url_shortener_api',
        audience: 'users',
      },
    );
    expect(result).toEqual({ access_token: token });
  });
});
