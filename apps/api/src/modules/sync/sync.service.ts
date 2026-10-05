import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProcessedSyncTransaction } from '../core/entities';

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);

  constructor(
    @InjectQueue('sync') private syncQueue: Queue,
    @InjectRepository(ProcessedSyncTransaction)
    private processedSyncRepository: Repository<ProcessedSyncTransaction>,
  ) {}

  async processSyncPayload(payload: any) {
    this.logger.log(`Processing sync payload from device ${payload.deviceId}`);

    const results = {
      success: [],
      duplicates: [],
      errors: [],
    };

    for (const transaction of payload.transactions) {
      try {
        const existing = await this.processedSyncRepository.findOne({
          where: { clientTxId: transaction.clientTxId },
        });

        if (existing) {
          results.duplicates.push(transaction.clientTxId);
          this.logger.warn(`Duplicate transaction: ${transaction.clientTxId}`);
          continue;
        }

        await this.syncQueue.add('process-transaction', {
          ...transaction,
          deviceId: payload.deviceId,
          userId: payload.userId,
          clientTimestamp: transaction.timestamp,
        });

        results.success.push(transaction.clientTxId);
      } catch (error) {
        this.logger.error(`Error queuing transaction ${transaction.clientTxId}:`, error);
        results.errors.push({
          clientTxId: transaction.clientTxId,
          error: error.message,
        });
      }
    }

    return results;
  }

  async markTransactionProcessed(clientTxId: string, transactionData: any) {
    const processed = this.processedSyncRepository.create({
      clientTxId,
      deviceId: transactionData.deviceId,
      userId: transactionData.userId,
      entity: transactionData.entity,
      operation: transactionData.operation,
      payload: transactionData.payload,
      clientTimestamp: new Date(transactionData.clientTimestamp),
      processedAt: new Date(),
    });

    await this.processedSyncRepository.save(processed);
    this.logger.log(`Transaction ${clientTxId} marked as processed`);
  }

  async getSyncStatus(deviceId: string) {
    const processed = await this.processedSyncRepository.find({
      where: { deviceId },
      order: { processedAt: 'DESC' },
      take: 100,
    });

    return {
      deviceId,
      totalProcessed: processed.length,
      lastSyncAt: processed[0]?.processedAt || null,
      recentTransactions: processed,
    };
  }
}
