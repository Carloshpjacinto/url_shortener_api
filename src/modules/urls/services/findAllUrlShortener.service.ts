/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class FindAllUrlShortenerService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: number, page: number = 1, limit: number = 10) {
    try {
      const offSet = (page - 1) * limit;

      const total = await this.prisma.url.count({
        where: { userId: userId, active: true },
      });

      const data = await this.prisma.url.findMany({
        where: { userId: userId, active: true },
        take: limit,
        skip: offSet,
      });

      return {
        total,
        page,
        per_page: limit,
        data,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error while listing user URLs',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
