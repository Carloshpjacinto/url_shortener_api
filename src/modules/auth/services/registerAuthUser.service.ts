import { Injectable } from '@nestjs/common';
import { CreateUserService } from 'src/modules/users/services/createUser.service';
import { CreateUserDTO } from 'src/modules/users/dto/create-user.dto';

@Injectable()
export class RegisterAuthUserService {
  constructor(private readonly createUserService: CreateUserService) {}

  async execute(body: CreateUserDTO) {
    return this.createUserService.execute(body);
  }
}
