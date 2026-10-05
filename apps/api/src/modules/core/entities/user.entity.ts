import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Office } from './office.entity';
import { Volunteer } from './volunteer.entity';
import { SystemAuditLog } from './system-audit-log.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'uuid' })
  officeId: string;

  @ManyToOne(() => Office, (office) => office.users)
  @JoinColumn({ name: 'office_id' })
  office: Office;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, name: 'password_hash' })
  passwordHash: string;

  @Column({ type: 'varchar', length: 150, name: 'full_name' })
  fullName: string;

  @Column({
    type: 'varchar',
    length: 50,
    enum: ['SUPER_ADMIN', 'HQ_STAFF', 'FIELD_OFFICER', 'PARTNER', 'VOLUNTEER'],
  })
  userType: string;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;

  @OneToMany(() => Volunteer, (volunteer) => volunteer.user)
  volunteers: Volunteer[];

  @OneToMany(() => SystemAuditLog, (auditLog) => auditLog.user)
  auditLogs: SystemAuditLog[];
}
