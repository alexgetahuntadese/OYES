import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface TenantContext {
  countryId: string;
  officeId: string;
  currency: string;
}

export const Tenant = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): TenantContext => {
    const request = ctx.switchToHttp().getRequest();
    return {
      countryId: request.headers['x-country-id'] || request.user?.office?.countryId,
      officeId: request.headers['x-office-id'] || request.user?.officeId,
      currency: request.headers['x-currency'] || 'USD',
    };
  },
);
