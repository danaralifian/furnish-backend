import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles.decorator';
import { Role } from 'src/shared/enum/roles';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(
    context: ExecutionContext,
  ): Promise<boolean> | boolean | Observable<boolean> {
    const requiredRoles: unknown = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const request = context
      .switchToHttp()
      .getRequest<Request & { user: { role: Role } }>();
    const user = request.user as { role: Role };

    return (requiredRoles as Role[]).includes(user.role);
  }
}
