import { FindUserByEmailService } from '../services/findUserByEmail.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';

describe('FindUserByEmailService', () => {
  let service: FindUserByEmailService;
  let prisma: PrismaService;

  beforeEach(() => {
    prisma = {
      user: {
        findUnique: jest.fn(),
      },
    } as any;

    service = new FindUserByEmailService(prisma);
  });

  it('deve retornar o usuário ao buscar pelo email', async () => {
    const email = 'usuario@example.com';
    const mockUser = {
      id: 1,
      email,
      name: 'Usuário Teste',
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    const result = await service.execute(email);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email },
    });
    expect(result).toEqual(mockUser);
  });
});
