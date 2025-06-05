import { Injectable } from '@nestjs/common';
import { FindUserByEmailService } from 'src/modules/users/services/findUserByEmail.service';

@Injectable()
export class ProfileAuthUserService {
  constructor(
    private readonly findUserByEmailService: FindUserByEmailService,
  ) {}

  async execute(body: string) {
    const user = await this.findUserByEmailService.execute(body);

    if (!user) {
      throw new Error('Usuario não encontrado');
    }

    return {
      id: user.id,
      nome: user.name,
      email: user.email,
    };
  }
}
