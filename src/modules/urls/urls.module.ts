import { Module } from '@nestjs/common';
import { CreateUrlShortenerService } from './services/createUrlShortener.service';
import { UrlShortenerService } from './services/urlShortener.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CreateUrlShortenerService, UrlShortenerService],
  exports: [CreateUrlShortenerService, UrlShortenerService],
})
export class UrlsModule {}
