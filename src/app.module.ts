import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UrlsModule } from './modules/urls/urls.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    PrometheusModule.register(),
    UsersModule,
    AuthModule,
    PrismaModule,
    UrlsModule,
  ],
})
export class AppModule {}
