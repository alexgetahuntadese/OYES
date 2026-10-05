import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { SyncService } from './sync.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('sync')
@UseGuards(JwtAuthGuard)
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Post('push')
  async pushSync(@Body() payload: any) {
    return this.syncService.processSyncPayload(payload);
  }

  @Get('status')
  async getSyncStatus(@Query('deviceId') deviceId: string) {
    return this.syncService.getSyncStatus(deviceId);
  }
}
