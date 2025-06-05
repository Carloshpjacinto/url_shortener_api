import { forwardRef, Module } from '@nestjs/common';
import { LoginAuthUserService } from './services/loginAuthUser.service';
import { AuthController } from './controller/auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { RegisterAuthUserService } from './services/registerAuthUser.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [LoginAuthUserService, RegisterAuthUserService],
})
export class AuthModule {}
