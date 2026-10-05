import { Processor, Process, OnQueueActive, OnQueueCompleted, OnQueueFailed } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { SyncService } from './sync.service';

@Processor('sync')
export class SyncProcessor {
  private readonly logger = new Logger(SyncProcessor.name);

  constructor(private readonly syncService: SyncService) {}

  @Process('process-transaction')
  async handleTransaction(job: Job) {
    this.logger.log(`Processing transaction: ${job.data.clientTxId}`);

    const { entity, operation, payload, clientTxId } = job.data;

    switch (entity) {
      case 'beneficiaries':
        await this.processBeneficiary(operation, payload);
        break;
      case 'projects':
        await this.processProject(operation, payload);
        break;
      case 'attendance':
        await this.processAttendance(operation, payload);
        break;
      default:
        this.logger.warn(`Unknown entity type: ${entity}`);
    }

    await this.syncService.markTransactionProcessed(clientTxId, job.data);

    return { success: true, clientTxId };
  }

  private async processBeneficiary(operation: string, payload: any) {
    this.logger.log(`Processing beneficiary ${operation}: ${payload.beneficiaryCode}`);
    // TODO: Implement beneficiary processing logic
    // This would inject the BeneficiaryService and call appropriate methods
  }

  private async processProject(operation: string, payload: any) {
    this.logger.log(`Processing project ${operation}: ${payload.code}`);
    // TODO: Implement project processing logic
  }

  private async processAttendance(operation: string, payload: any) {
    this.logger.log(`Processing attendance ${operation}`);
    // TODO: Implement attendance processing logic
  }

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.log(`Processing job ${job.id} of type ${job.name}`);
  }

  @OnQueueCompleted()
  onCompleted(job: Job, result: any) {
    this.logger.log(`Completed job ${job.id} with result:`, result);
  }

  @OnQueueFailed()
  onFailed(job: Job, error: Error) {
    this.logger.error(`Failed job ${job.id} with error:`, error.message);
  }
}
