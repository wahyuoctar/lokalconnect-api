import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../../users/models/user.model';
// import { ERoleNames } from '../enums/role-name.enum';

export const RoleGuard = (...roles): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      if (!roles) return true;

      const request = context.switchToHttp().getRequest();
      const user = request.user as User;

      return roles.some((e) => user.role === e);
    }
  }

  const guard = mixin(RoleGuardMixin);
  return guard;
};
