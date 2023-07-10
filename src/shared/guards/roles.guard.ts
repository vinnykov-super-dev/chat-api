import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const user = context.switchToWs().getClient().handshake.user;

    return matchRoles(roles, user.role);
  }
}

function matchRoles(roles: string[], userRole: string): boolean {
  return roles.includes(userRole);
}
