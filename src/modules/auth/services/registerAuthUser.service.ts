import { Injectable } from '@nestjs/common';
import { CreateUserService } from 'src/modules/users/services/createUser.service';
import { CreateUserDTO } from 'src/modules/users/dto/create-user.dto';
import { hashPassword } from '../tools/hashPassword.tool';

@Injectable()
export class RegisterAuthUserService {
  constructor(private readonly createUserService: CreateUserService) {}

  async execute(body: CreateUserDTO) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    body.password = await hashPassword(body.password);
    return this.createUserService.execute(body);
  }
}
