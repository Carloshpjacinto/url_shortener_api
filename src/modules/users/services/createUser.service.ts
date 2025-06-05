import { User } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { hashPassword } from 'src/shared/tools/hashPassword.tool';
import { userSelectFields } from 'src/modules/utils/userSelectFields';

@Injectable()
export class CreateUserService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(body: CreateUserDTO): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    body.password = await hashPassword(body.password);
    return await this.prisma.user.create({
      data: body,
      select: userSelectFields,
    });
  }
}
