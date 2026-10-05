import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SyncService } from './sync.service';
import { SyncController } from './sync.controller';
import { SyncProcessor } from './sync.processor';
import { ProcessedSyncTransaction } from '../core/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProcessedSyncTransaction]),
    BullModule.registerQueue({
      name: 'sync',
    }),
  ],
  controllers: [SyncController],
  providers: [SyncService, SyncProcessor],
  exports: [SyncService],
})
export class SyncModule {}
