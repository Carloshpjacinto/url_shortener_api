import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Delete,
  Query,
  Patch,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginAuthUserService } from '../services/loginAuthUser.service';
import { LoginAuthUserDto } from '../dto/login-auth-user.dto';
import { CreateUserService } from 'src/modules/users/services/createUser.service';
import { CreateUserDTO } from 'src/modules/users/dto/create-user.dto';
import { UserRequest } from 'src/shared/decorators/user.decorator';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ProfileAuthUserService } from '../services/profileAuthUser.service';
import { CreateUrlShortenerDto } from 'src/modules/urls/dto/create-url-shortener.dto';
import { CreateUrlShortenerService } from 'src/modules/urls/services/createUrlShortener.service';
import { RedirectUrlAuthService } from '../services/redirectUrlAuth.service';
import { DeleteUrlShortenerService } from 'src/modules/urls/services/deleteUrlShortener.service';
import { FindAllUrlShortenerService } from 'src/modules/urls/services/findAllUrlShortener.service';
import { UpdateUrlShortenerService } from 'src/modules/urls/services/updateUrlShortener.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginAuthUserService: LoginAuthUserService,
    private readonly createUserService: CreateUserService,
    private readonly profileAuthUserService: ProfileAuthUserService,
    private readonly createUrlShortenerService: CreateUrlShortenerService,
    private readonly redirectUrlAuthService: RedirectUrlAuthService,
    private readonly deleteUrlShortenerService: DeleteUrlShortenerService,
    private readonly findAllUrlShortenerService: FindAllUrlShortenerService,
    private readonly updateUrlShortenerService: UpdateUrlShortenerService,
  ) {}

  @ApiOperation({ summary: 'Register user' })
  @Post('register')
  register(@Body() CreateUser: CreateUserDTO) {
    return this.createUserService.execute(CreateUser);
  }

  @ApiOperation({ summary: 'User login' })
  @Post('login')
  login(@Body() loginAuthUser: LoginAuthUserDto) {
    return this.loginAuthUserService.execute(loginAuthUser);
  }

  @ApiOperation({ summary: 'Get user profile via token' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Get('profile')
  profile(@UserRequest('email') email: string) {
    if (!email) {
      throw new UnauthorizedException(
        'You need to be authenticated to access your profile.',
      );
    }
    return this.profileAuthUserService.execute(email);
  }

  @ApiOperation({ summary: 'Shorten URL' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Post('url')
  urlShortener(
    @Body() createUrlShortenerDto: CreateUrlShortenerDto,
    @UserRequest('id') id: number | null,
  ) {
    return this.createUrlShortenerService.execute(createUrlShortenerDto, id);
  }

  @ApiOperation({ summary: 'Redirect to original URL' })
  @Post('redirect')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        urlShortener: {
          type: 'string',
          example: 'http://localhost:3000/shortened/xyz123',
        },
      },
      required: ['urlShortener'],
    },
  })
  redirect(@Body('urlShortener') urlShortener: string) {
    return this.redirectUrlAuthService.execute(urlShortener);
  }

  @ApiOperation({ summary: 'Delete URL' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        urlShortener: {
          type: 'string',
          example: 'http://localhost:3000/shortened/xyz123',
        },
      },
      required: ['urlShortener'],
    },
  })
  @Delete('url')
  deleteUrl(
    @Body('urlShortener') urlShortener: string,
    @UserRequest('id') id: number | null,
  ) {
    if (!id) {
      throw new UnauthorizedException(
        'You need to be authenticated to delete this URL.',
      );
    }
    return this.deleteUrlShortenerService.execute(urlShortener, id);
  }

  @ApiOperation({ summary: 'Get all URLs of an authenticated user' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Get('url')
  findAllUrl(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @UserRequest('id') id: number | null,
  ) {
    if (!id) {
      throw new UnauthorizedException(
        'You need to be authenticated to view the URLs.',
      );
    }
    return this.findAllUrlShortenerService.execute(
      id,
      Number(page),
      Number(limit),
    );
  }

  @ApiOperation({ summary: 'Update URLs of an authenticated user' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        oldUrl: {
          type: 'string',
          example: 'http://localhost:3000/shortened/xyz123',
        },
        newUrl: {
          type: 'string',
          example: 'http://localhost:3000/shortened/lkjhgf',
        },
      },
      required: ['oldUrl', 'newUrl'],
    },
  })
  @Patch('url')
  updateUrl(
    @Body('oldUrl') oldUrl: string,
    @Body('newUrl') newUrl: string,
    @UserRequest('id') userId: number,
  ) {
    if (!userId) {
      throw new UnauthorizedException(
        'You need to be authenticated to update this URL.',
      );
    }
    return this.updateUrlShortenerService.execute(oldUrl, newUrl, userId);
  }
}
