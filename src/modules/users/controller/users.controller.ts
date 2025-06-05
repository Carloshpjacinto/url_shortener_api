import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserService } from '../services/createUser.service';
import { CreateUserDTO } from '../dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDTO) {
    return this.createUserService.execute(createUserDto);
  }
}
