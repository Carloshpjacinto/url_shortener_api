import { Injectable } from '@nestjs/common';
import { CreateUrlShortenerService } from 'src/modules/urls/services/createUrlShortener.service';
import { CreateUrlShortenerDto } from 'src/modules/urls/dto/create-url-shortener.dto';

@Injectable()
export class UrlShortenerAuthUserService {
  constructor(
    private readonly createUrlShortenerService: CreateUrlShortenerService,
  ) {}

  async execute(body: CreateUrlShortenerDto, userId: number | null) {
    return this.createUrlShortenerService.execute(body, userId);
  }
}
