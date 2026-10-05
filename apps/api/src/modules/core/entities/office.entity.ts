import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Country } from './country.entity';
import { User } from './user.entity';
import { Project } from './project.entity';
import { Beneficiary } from './beneficiary.entity';

@Entity('offices')
export class Office extends BaseEntity {
  @Column({ type: 'uuid' })
  countryId: string;

  @ManyToOne(() => Country, (country) => country.offices)
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  code: string;

  @Column({
    type: 'varchar',
    length: 50,
    enum: ['GLOBAL_HQ', 'REGIONAL', 'COUNTRY', 'FIELD'],
  })
  officeType: string;

  @OneToMany(() => User, (user) => user.office)
  users: User[];

  @OneToMany(() => Project, (project) => project.office)
  projects: Project[];

  @OneToMany(() => Beneficiary, (beneficiary) => beneficiary.office)
  beneficiaries: Beneficiary[];
}
