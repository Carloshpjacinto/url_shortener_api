import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { LoginAuthUserService } from '../services/loginAuthUser.service';
import { LoginAuthUserDto } from '../dto/login-auth-user.dto';
import { CreateUserService } from 'src/modules/users/services/createUser.service';
import { CreateUserDTO } from 'src/modules/users/dto/create-user.dto';
import { UserRequest } from 'src/shared/decorators/user.decorator';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ProfileAuthUserService } from '../services/profileAuthUser.service';
import { CreateUrlShortenerDto } from 'src/modules/urls/dto/create-url-shortener.dto';
import { UrlShortenerAuthUserService } from '../services/urlShortenerAuth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginAuthUserService: LoginAuthUserService,
    private readonly createUserService: CreateUserService,
    private readonly profileAuthUserService: ProfileAuthUserService,
    private readonly urlShortenerAuthUserService: UrlShortenerAuthUserService,
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
    return this.profileAuthUserService.execute(email);
  }

  @UseGuards(AuthGuard)
  @Post('url')
  urlShortener(
    @Body() createUrlShortenerDto: CreateUrlShortenerDto,
    @UserRequest('id') id: number | null,
  ) {
    return this.urlShortenerAuthUserService.execute(createUrlShortenerDto, id);
  }
}
