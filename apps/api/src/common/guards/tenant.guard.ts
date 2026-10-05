import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TENANT_KEY } from '../decorators/tenant-except.decorator';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isTenantExempt = this.reflector.getAllAndOverride<boolean>(TENANT_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isTenantExempt) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const countryId = request.headers['x-country-id'] || request.user?.office?.countryId;
    const officeId = request.headers['x-office-id'] || request.user?.officeId;

    if (!countryId || !officeId) {
      throw new BadRequestException('Tenant context (country_id and office_id) is required');
    }

    request.tenantContext = {
      countryId,
      officeId,
      currency: request.headers['x-currency'] || 'USD',
    };

    return true;
  }
}
