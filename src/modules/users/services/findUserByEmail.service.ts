import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindUserByEmailService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(body: string) {
    return await this.prisma.user.findUnique({
      where: { email: body },
    });
  }
}
