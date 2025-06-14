/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ValidateJwtToken } from 'src/modules/auth/tools/validateToken.tool';
import { FindUserByIdService } from 'src/modules/users/services/findUserById.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly validateJwtToken: ValidateJwtToken,
    private readonly findUserByIdService: FindUserByIdService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.split(' ')[1];

      try {
        const { valid, decoded } = await this.validateJwtToken.execute(token);

        if (valid && decoded) {
          const user = await this.findUserByIdService.execute(
            Number(decoded.sub),
          );
          if (user) {
            request.user = user;
            return true;
          }
        }
        throw new UnauthorizedException('Invalid token or user not found.');
      } catch (error) {
        if (error instanceof UnauthorizedException) {
          throw error;
        }
        throw new UnauthorizedException('Invalid token.');
      }
    }
    return true;
  }
}
