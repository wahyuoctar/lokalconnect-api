import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../../users/models/user.model';

export const PermissionGuard = (
  ...permissions: string[]
): Type<CanActivate> => {
  class PermissionGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      if (!permissions) return true;

      const request = context.switchToHttp().getRequest();
      const user = request.user as User;

      if (user.role === 'admin') {
        return true;
      }

      // return permissions.some((permission) => {
      //   return user.organizationRole.permissions
      //     .map((userPermissions) => userPermissions.name)
      //     .some((userPermissionName) => userPermissionName == permission);
      // });
      return true;
    }
  }

  const guard = mixin(PermissionGuardMixin);
  return guard;
};
