import { SetMetadata } from '@nestjs/common';

export const TENANT_KEY = 'tenantExempt';
export const TenantExcept = () => SetMetadata(TENANT_KEY, true);
