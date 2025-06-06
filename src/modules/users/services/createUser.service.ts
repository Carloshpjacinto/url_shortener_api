/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { User } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { userSelectFields } from 'src/modules/users/utils/userSelectFields';
import { hashPassword } from 'src/modules/auth/tools/hashPassword.tool';

@Injectable()
export class CreateUserService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(body: CreateUserDTO): Promise<User> {
    try {
      await hashPassword(body.password);

      return await this.prisma.user.create({
        data: body,
        select: userSelectFields,
      });
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new ConflictException('Email already in use.');
      }

      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error while creating user',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
