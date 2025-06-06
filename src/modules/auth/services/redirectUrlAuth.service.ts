/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindUrlByUrlShortService } from 'src/modules/urls/services/findUrlByUrlShort.service';
import { UpdateClickCounterService } from 'src/modules/urls/services/updateClickCounter.service';

@Injectable()
export class RedirectUrlAuthService {
  constructor(
    private readonly findUrlByUrlShortService: FindUrlByUrlShortService,
    private readonly updateClickCounterService: UpdateClickCounterService,
  ) {}

  async execute(urlShortener: string): Promise<string> {
    try {
      const url = await this.findUrlByUrlShortService.execute(urlShortener);

      if (!url) {
        if (!url) {
          throw new HttpException('URL not found', HttpStatus.NOT_FOUND);
        }
      }

      if (url.active != true) {
        throw new HttpException('URL deleted.', HttpStatus.NOT_FOUND);
      }

      const counterClick = (url.clickCounter += 1);
      await this.updateClickCounterService.execute(urlShortener, counterClick);

      return url.url_original;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
