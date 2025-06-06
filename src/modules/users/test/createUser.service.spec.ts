import { CreateUserService } from '../services/createUser.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { hashPassword } from 'src/modules/auth/tools/hashPassword.tool';
import { CreateUserDTO } from '../dto/create-user.dto';
import { userSelectFields } from 'src/modules/users/utils/userSelectFields';

jest.mock('src/modules/auth/tools/hashPassword.tool');

describe('CreateUserService', () => {
  let service: CreateUserService;
  let prisma: PrismaService;

  beforeEach(() => {
    prisma = {
      user: {
        create: jest.fn(),
      },
    } as any;

    service = new CreateUserService(prisma);
  });

  it('deve criar um novo usuário com a senha hasheada', async () => {
    const dto: CreateUserDTO = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'plainPassword',
    };

    const hashedPassword = 'hashedPassword';
    (hashPassword as jest.Mock).mockResolvedValue(hashedPassword);

    const expectedUser = {
      id: 1,
      name: dto.name,
      email: dto.email,
    };

    (prisma.user.create as jest.Mock).mockResolvedValue(expectedUser);

    const result = await service.execute({ ...dto });

    expect(hashPassword).toHaveBeenCalledWith('plainPassword');
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: dto,
      select: userSelectFields,
    });
    expect(result).toEqual(expectedUser);
  });
});
