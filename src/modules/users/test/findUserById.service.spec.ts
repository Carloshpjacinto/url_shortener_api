import { FindUserByIdService } from '../services/findUserById.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';

describe('FindUserByIdService', () => {
  let service: FindUserByIdService;
  let prisma: PrismaService;

  beforeEach(() => {
    prisma = {
      user: {
        findUnique: jest.fn(),
      },
    } as any;

    service = new FindUserByIdService(prisma);
  });

  it('deve retornar o usuário ao buscar pelo ID', async () => {
    const id = 123;
    const mockUser = {
      id,
      name: 'Carlos',
      email: 'carlos@example.com',
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    const result = await service.execute(id);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id },
    });
    expect(result).toEqual(mockUser);
  });
});
