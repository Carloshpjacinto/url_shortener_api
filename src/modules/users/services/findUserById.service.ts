import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindUserByIdService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }
}
