import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { EventEmitterModule } from '@nestjs/event-emitter';
import {
  Country,
  Office,
  User,
  Programme,
  Project,
  Beneficiary,
  Volunteer,
  SystemAuditLog,
  ProcessedSyncTransaction,
} from './modules/core/entities';
import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './modules/core/core.module';
import { SyncModule } from './modules/sync/sync.module';
import { IntegrationHubModule } from './modules/integration-hub/integration-hub.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'oyes_emis',
      entities: [
        Country,
        Office,
        User,
        Programme,
        Project,
        Beneficiary,
        Volunteer,
        SystemAuditLog,
        ProcessedSyncTransaction,
      ],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV !== 'production',
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
      },
    }),
    EventEmitterModule.forRoot(),
    CommonModule,
    CoreModule,
    AuthModule,
    SyncModule,
    IntegrationHubModule,
  ],
})
export class AppModule {}
