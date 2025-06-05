import { Module } from '@nestjs/common';
import { CreateUrlShortenerService } from './services/createUrlShortener.service';
import { UrlShortenerService } from './services/urlShortener.service';
import { PrismaModule } from '../prisma/prisma.module';
import { FindUrlByUrlShortService } from './services/findUrlByUrlShort.service';
import { UpdateClickCounterService } from './services/updateClickCounter.service';

@Module({
  imports: [PrismaModule],
  providers: [
    CreateUrlShortenerService,
    UrlShortenerService,
    FindUrlByUrlShortService,
    UpdateClickCounterService,
  ],
  exports: [
    CreateUrlShortenerService,
    UrlShortenerService,
    FindUrlByUrlShortService,
    UpdateClickCounterService,
  ],
})
export class UrlsModule {}
