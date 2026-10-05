import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Office } from './office.entity';
import { User } from './user.entity';

@Entity('beneficiaries')
export class Beneficiary extends BaseEntity {
  @Column({ type: 'uuid' })
  officeId: string;

  @ManyToOne(() => Office, (office) => office.beneficiaries)
  @JoinColumn({ name: 'office_id' })
  office: Office;

  @Column({ type: 'varchar', length: 100, unique: true, name: 'beneficiary_code' })
  beneficiaryCode: string;

  @Column({ type: 'varchar', length: 100, name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', length: 100, name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar', length: 20 })
  gender: string;

  @Column({ type: 'date', name: 'date_of_birth', nullable: true })
  dateOfBirth?: Date;

  @Column({ type: 'varchar', length: 100, name: 'vulnerability_status', nullable: true })
  vulnerabilityStatus?: string;

  @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326, nullable: true })
  location?: string;

  @Column({ type: 'boolean', default: true, name: 'is_encrypted' })
  isEncrypted: boolean;

  @Column({ type: 'uuid', name: 'created_by' })
  createdBy: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  creator: User;
}
