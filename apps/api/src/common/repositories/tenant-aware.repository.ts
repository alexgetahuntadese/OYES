import { Repository, SelectQueryBuilder } from 'typeorm';
import { TenantContext } from '../decorators/tenant.decorator';

export class TenantAwareRepository<T> extends Repository<T> {
  constructor(tenantContext: TenantContext) {
    super();
    this.tenantContext = tenantContext;
  }

  protected tenantContext: TenantContext;

  createTenantQueryBuilder(alias: string): SelectQueryBuilder<T> {
    const qb = this.createQueryBuilder(alias);

    // Apply tenant filtering based on entity structure
    // This is a base implementation - specific repositories may override
    if (this.tenantContext.officeId) {
      qb.andWhere(`${alias}.officeId = :officeId`, {
        officeId: this.tenantContext.officeId,
      });
    }

    if (this.tenantContext.countryId) {
      qb.andWhere(`${alias}.countryId = :countryId`, {
        countryId: this.tenantContext.countryId,
      });
    }

    return qb;
  }

  async findAllTenantFiltered(): Promise<T[]> {
    return this.createTenantQueryBuilder('entity').getMany();
  }

  async findOneTenantFiltered(id: string): Promise<T | null> {
    return this.createTenantQueryBuilder('entity')
      .andWhere('entity.id = :id', { id })
      .getOne();
  }
}
