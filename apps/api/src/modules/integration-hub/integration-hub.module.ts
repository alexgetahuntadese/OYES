import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { IntegrationHubService } from './integration-hub.service';
import { IntegrationHubController } from './integration-hub.controller';

@Module({
  imports: [EventEmitterModule],
  controllers: [IntegrationHubController],
  providers: [IntegrationHubService],
  exports: [IntegrationHubService],
})
export class IntegrationHubModule {}
