import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Delete,
  Query,
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
  ) {}

  @Post('register')
  register(@Body() CreateUser: CreateUserDTO) {
    return this.createUserService.execute(CreateUser);
  }

  @Post('login')
  login(@Body() loginAuthUser: LoginAuthUserDto) {
    return this.loginAuthUserService.execute(loginAuthUser);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  profile(@UserRequest('email') email: string) {
    if (!email) {
      throw new Error(
        'Você precisa estar autenticado para acessar seu perfil.',
      );
    }
    return this.profileAuthUserService.execute(email);
  }

  @UseGuards(AuthGuard)
  @Post('url')
  urlShortener(
    @Body() createUrlShortenerDto: CreateUrlShortenerDto,
    @UserRequest('id') id: number | null,
  ) {
    return this.createUrlShortenerService.execute(createUrlShortenerDto, id);
  }

  @Post('redirect')
  redirect(@Body('urlShortener') urlShortener: string) {
    return this.redirectUrlAuthService.execute(urlShortener);
  }

  @UseGuards(AuthGuard)
  @Delete('url')
  deleteUrl(
    @Body('urlShortener') urlShortener: string,
    @UserRequest('id') id: number | null,
  ) {
    if (!id) {
      throw new Error('Você precisa estar autenticado para excluir essa url.');
    }
    return this.deleteUrlShortenerService.execute(urlShortener, id);
  }

  @UseGuards(AuthGuard)
  @Get('url')
  findAllUrl(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @UserRequest('id') id: number | null,
  ) {
    if (!id) {
      throw new Error('Você precisa estar autenticado para ver as URLS');
    }
    return this.findAllUrlShortenerService.execute(
      id,
      Number(page),
      Number(limit),
    );
  }
}
