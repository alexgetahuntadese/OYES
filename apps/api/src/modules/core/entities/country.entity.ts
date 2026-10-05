import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Office } from './office.entity';
import { Programme } from './programme.entity';

@Entity('countries')
export class Country extends BaseEntity {
  @Column({ type: 'varchar', length: 3, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 3, default: 'ETB' })
  defaultCurrency: string;

  @OneToMany(() => Office, (office) => office.country)
  offices: Office[];

  @OneToMany(() => Programme, (programme) => programme.country)
  programmes: Programme[];
}
