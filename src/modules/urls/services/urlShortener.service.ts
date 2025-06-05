import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';

@Injectable()
export class UrlShortenerService {
  private readonly BASE62 =
    'g1FqJkPysGU93TuzR7KnYwdE45vCMQLotSbNAxehHZ2rXiOVj6IBpfWcma8D0l';

  generateCodeFromHash(
    originalUrl: string,
    length: number,
    userId?: number | null,
  ): string {
    const input = `${originalUrl}-${userId ?? null}-${Date.now()}`;
    const hash = createHash('sha256').update(input).digest();
    const base62 = this.base62Encode(hash);
    return base62.slice(0, length);
  }

  private base62Encode(buffer: Buffer): string {
    let num = BigInt('0x' + buffer.toString('hex'));
    let result = '';
    while (num > 0) {
      const remainder = Number(num % 62n);
      result = this.BASE62[remainder] + result;
      num = num / 62n;
    }
    return result || '0';
  }
}
