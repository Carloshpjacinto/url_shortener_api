import { ProfileAuthUserService } from '../services/profileAuthUser.service';
import { FindUserByEmailService } from 'src/modules/users/services/findUserByEmail.service';

describe('ProfileAuthUserService', () => {
  let service: ProfileAuthUserService;
  let findUserByEmailService: FindUserByEmailService;

  beforeEach(() => {
    findUserByEmailService = {
      execute: jest.fn(),
    } as any;

    service = new ProfileAuthUserService(findUserByEmailService);
  });

  it('deve retornar os dados do usuário quando encontrado', async () => {
    const email = 'test@example.com';
    const userMock = {
      id: 1,
      name: 'Carlos',
      email: 'test@example.com',
    };

    (findUserByEmailService.execute as jest.Mock).mockResolvedValue(userMock);

    const result = await service.execute(email);

    expect(findUserByEmailService.execute).toHaveBeenCalledWith(email);
    expect(result).toEqual({
      id: userMock.id,
      nome: userMock.name,
      email: userMock.email,
    });
  });

  it('deve lançar erro quando o usuário não for encontrado', async () => {
    const email = 'notfound@example.com';

    (findUserByEmailService.execute as jest.Mock).mockResolvedValue(null);

    await expect(service.execute(email)).rejects.toThrowError(
      'User not found.',
    );
    expect(findUserByEmailService.execute).toHaveBeenCalledWith(email);
  });
});
