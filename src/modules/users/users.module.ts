import { Module } from '@nestjs/common';
import { CreateUserService } from './services/createUser.service';
import { UsersController } from './controller/users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { FindUserByEmailService } from './services/findUserByEmail.service';
import { UpdateUserService } from './services/updateUser.service';
import { FindUserByIdService } from './services/findUserById.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [
    CreateUserService,
    FindUserByEmailService,
    UpdateUserService,
    FindUserByIdService,
  ],
  exports: [CreateUserService, FindUserByEmailService, FindUserByIdService],
})
export class UsersModule {}
