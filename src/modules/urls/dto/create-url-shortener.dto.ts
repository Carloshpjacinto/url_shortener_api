import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateUrlShortenerDto {
  @ApiProperty({ example: 'http://localhost:3000/shortened/xyz123' })
  @IsUrl()
  @IsNotEmpty()
  url: string;
}
