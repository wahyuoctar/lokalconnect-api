import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuardOptional extends AuthGuard('jwt') {
  handleRequest<TUser = any>(_err: any, user: any): TUser {
    return user;
  }
}
