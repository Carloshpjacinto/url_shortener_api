import { Module } from '@nestjs/common';
import { CreateUserService } from './services/createUser.service';
import { UsersController } from './controller/users.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [CreateUserService],
})
export class UsersModule {}
