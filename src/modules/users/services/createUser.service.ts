import { User } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { userSelectFields } from 'src/modules/utils/userSelectFields';

@Injectable()
export class CreateUserService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(body: CreateUserDTO): Promise<User> {
    return await this.prisma.user.create({
      data: body,
      select: userSelectFields,
    });
  }
}
