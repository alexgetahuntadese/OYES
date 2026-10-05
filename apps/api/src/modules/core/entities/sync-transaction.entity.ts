import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('processed_sync_transactions')
export class ProcessedSyncTransaction {
  @PrimaryColumn({ type: 'varchar', length: 100, name: 'client_tx_id' })
  clientTxId: string;

  @Column({ type: 'uuid', name: 'device_id' })
  deviceId: string;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @Column({ type: 'varchar', length: 100 })
  entity: string;

  @Column({ type: 'varchar', length: 20, enum: ['CREATE', 'UPDATE', 'DELETE'] })
  operation: string;

  @Column({ type: 'jsonb' })
  payload: Record<string, any>;

  @Column({ type: 'timestamp with time zone', name: 'processed_at' })
  processedAt: Date;

  @Column({ type: 'timestamp with time zone', name: 'client_timestamp' })
  clientTimestamp: Date;
}
