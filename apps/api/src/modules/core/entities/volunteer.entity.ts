import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('volunteers')
export class Volunteer extends BaseEntity {
  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, (user) => user.volunteers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', length: 50, unique: true, name: 'registration_code' })
  registrationCode: string;

  @Column({ type: 'text', array: true, nullable: true })
  skills?: string[];

  @Column({ type: 'text', array: true, nullable: true })
  qualifications?: string[];

  @Column({
    type: 'varchar',
    length: 50,
    default: 'AVAILABLE',
    enum: ['AVAILABLE', 'UNAVAILABLE', 'DEPLOYED'],
    name: 'availability_status',
  })
  availabilityStatus: string;

  @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326, name: 'gps_home_location', nullable: true })
  gpsHomeLocation?: string;
}
