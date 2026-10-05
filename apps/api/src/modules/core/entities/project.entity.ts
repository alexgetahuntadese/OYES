import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Programme } from './programme.entity';
import { Office } from './office.entity';

@Entity('projects')
export class Project extends BaseEntity {
  @Column({ type: 'uuid' })
  programmeId: string;

  @ManyToOne(() => Programme, (programme) => programme.projects)
  @JoinColumn({ name: 'programme_id' })
  programme: Programme;

  @Column({ type: 'uuid' })
  officeId: string;

  @ManyToOne(() => Office, (office) => office.projects)
  @JoinColumn({ name: 'office_id' })
  office: Office;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'date', name: 'start_date' })
  startDate: Date;

  @Column({ type: 'date', name: 'end_date' })
  endDate: Date;

  @Column({
    type: 'varchar',
    length: 50,
    default: 'DRAFT',
    enum: ['DRAFT', 'APPROVED', 'ACTIVE', 'SUSPENDED', 'CLOSED'],
  })
  status: string;

  @Column({ type: 'numeric', precision: 15, scale: 2, name: 'total_budget' })
  totalBudget: number;

  @Column({ type: 'varchar', length: 3, default: 'USD' })
  currency: string;
}
