import { UpdateUserService } from '../services/updateUser.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { hashPassword } from 'src/modules/auth/tools/hashPassword.tool';
import { UpdateUserDto } from '../dto/update-user.dto';
import { userSelectFields } from 'src/modules/users/utils/userSelectFields';

jest.mock('src/modules/auth/tools/hashPassword.tool');

describe('UpdateUserService', () => {
  let service: UpdateUserService;
  let prisma: PrismaService;

  beforeEach(() => {
    prisma = {
      user: {
        findUnique: jest.fn(),
        update: jest.fn(),
      },
    } as any;

    service = new UpdateUserService(prisma);
  });

  it('deve atualizar o usuário com senha hasheada', async () => {
    const id = 1;
    const dto: UpdateUserDto = {
      name: 'Novo Nome',
      password: 'novaSenha',
    };

    const hashed = 'senhaHasheada';
    const updatedUser = {
      id,
      name: dto.name,
      email: 'user@example.com',
    };

    (hashPassword as jest.Mock).mockResolvedValue(hashed);
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id });
    (prisma.user.update as jest.Mock).mockResolvedValue(updatedUser);

    const result = await service.execute(id, { ...dto });

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id } });
    expect(hashPassword).toHaveBeenCalledWith('novaSenha');
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id },
      data: { ...dto, password: hashed },
      select: userSelectFields,
    });
    expect(result).toEqual(updatedUser);
  });

  it('deve lançar erro se o usuário não for encontrado', async () => {
    const id = 999;
    const dto: UpdateUserDto = { name: 'Alguém' };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(service.execute(id, dto)).rejects.toThrow('User not found');
    expect(prisma.user.update).not.toHaveBeenCalled();
  });
});
