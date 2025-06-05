import { forwardRef, Module } from '@nestjs/common';
import { LoginAuthUserService } from './services/loginAuthUser.service';
import { AuthController } from './controller/auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ProfileAuthUserService } from './services/profileAuthUser.service';
import { ValidateJwtToken } from './tools/validateToken.tool';
import { UrlsModule } from '../urls/urls.module';
import { RedirectUrlAuthService } from './services/redirectUrlAuth.service';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => UsersModule),
    forwardRef(() => UrlsModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [
    LoginAuthUserService,
    ValidateJwtToken,
    ProfileAuthUserService,
    RedirectUrlAuthService,
  ],
  exports: [ValidateJwtToken],
})
export class AuthModule {}
