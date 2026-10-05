import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Country } from './country.entity';
import { Project } from './project.entity';

@Entity('programmes')
export class Programme extends BaseEntity {
  @Column({ type: 'uuid' })
  countryId: string;

  @ManyToOne(() => Country, (country) => country.programmes)
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 100, name: 'thematic_area' })
  thematicArea: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @OneToMany(() => Project, (project) => project.programme)
  projects: Project[];
}
