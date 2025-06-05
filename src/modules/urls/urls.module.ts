import { forwardRef, Module } from '@nestjs/common';
import { CreateUrlShortenerService } from './services/createUrlShortener.service';
import { UrlShortenerService } from './services/urlShortener.service';
import { PrismaModule } from '../prisma/prisma.module';
import { FindUrlByUrlShortService } from './services/findUrlByUrlShort.service';
import { UpdateClickCounterService } from './services/updateClickCounter.service';
import { DeleteUrlShortenerService } from './services/deleteUrlShortener.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, forwardRef(() => UsersModule)],
  providers: [
    CreateUrlShortenerService,
    UrlShortenerService,
    FindUrlByUrlShortService,
    UpdateClickCounterService,
    DeleteUrlShortenerService,
  ],
  exports: [
    CreateUrlShortenerService,
    UrlShortenerService,
    FindUrlByUrlShortService,
    UpdateClickCounterService,
    DeleteUrlShortenerService,
  ],
})
export class UrlsModule {}
