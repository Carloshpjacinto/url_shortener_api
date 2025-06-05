import { Injectable } from '@nestjs/common';
import { FindUrlByUrlShortService } from 'src/modules/urls/services/findUrlByUrlShort.service';
import { UpdateClickCounterService } from 'src/modules/urls/services/updateClickCounter.service';

@Injectable()
export class RedirectUrlAuthService {
  constructor(
    private readonly findUrlByUrlShortService: FindUrlByUrlShortService,
    private readonly updateClickCounterService: UpdateClickCounterService,
  ) {}

  async execute(urlShortener: string): Promise<string> {
    const url = await this.findUrlByUrlShortService.execute(urlShortener);

    if (!url) {
      if (!url) {
        throw new Error('URL not found');
      }
    }

    if (url.active != true) {
      throw new Error('Url excluida');
    }

    const counterClick = (url.clickCounter += 1);
    await this.updateClickCounterService.execute(urlShortener, counterClick);

    return url.url_original;
  }
}
