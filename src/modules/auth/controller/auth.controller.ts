import { Controller, Post, Body } from '@nestjs/common';
import { LoginAuthUserService } from '../services/loginAuthUser.service';
import { LoginAuthUserDto } from '../dto/login-auth-user.dto';
import { CreateUserService } from 'src/modules/users/services/createUser.service';
import { CreateUserDTO } from 'src/modules/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginAuthUserService: LoginAuthUserService,
    private readonly createUserService: CreateUserService,
  ) {}

  @Post('register')
  register(@Body() CreateUser: CreateUserDTO) {
    return this.createUserService.execute(CreateUser);
  }

  @Post('login')
  login(@Body() loginAuthUser: LoginAuthUserDto) {
    return this.loginAuthUserService.execute(loginAuthUser);
  }
}
