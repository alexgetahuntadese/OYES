import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { IntegrationHubService, HubEvent } from './integration-hub.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('integration-hub')
@UseGuards(JwtAuthGuard)
export class IntegrationHubController {
  constructor(private readonly integrationHubService: IntegrationHubService) {}

  @Post('emit')
  async emitEvent(@Body() body: { event: HubEvent; data: any }) {
    await this.integrationHubService.emitEvent(body.event, body.data);
    return { success: true, message: 'Event emitted successfully' };
  }

  @Get('events')
  async getEventHistory(@Body() filters?: any) {
    return this.integrationHubService.getEventHistory(filters);
  }

  @Get('health')
  getHealth() {
    return { status: 'ok', message: 'Integration Hub is running' };
  }
}
