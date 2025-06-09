import { Module } from '@nestjs/common';
import { CreateUserService } from './services/createUser.service';
import { PrismaModule } from '../prisma/prisma.module';
import { FindUserByEmailService } from './services/findUserByEmail.service';
import { FindUserByIdService } from './services/findUserById.service';

@Module({
  imports: [PrismaModule],
  providers: [CreateUserService, FindUserByEmailService, FindUserByIdService],
  exports: [CreateUserService, FindUserByEmailService, FindUserByIdService],
})
export class UsersModule {}
