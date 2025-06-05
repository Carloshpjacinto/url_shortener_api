import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { hashPassword } from 'src/shared/tools/hashPassword.tool';
import { UpdateUserDto } from '../dto/update-user.dto';
import { userSelectFields } from 'src/modules/utils/userSelectFields';

@Injectable()
export class UpdateUserService {
  constructor(private readonly prisma: PrismaService) {}

  async update(id: number, body: UpdateUserDto) {
    await this.isIdExists(id);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    if (body.password) body.password = await hashPassword(body.password);

    return await this.prisma.user.update({
      where: { id },
      data: body,
      select: userSelectFields,
    });
  }

  private async isIdExists(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
