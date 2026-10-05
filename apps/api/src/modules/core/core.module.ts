import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
} from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Country,
      Office,
      User,
      Programme,
      Project,
      Beneficiary,
      Volunteer,
      SystemAuditLog,
      ProcessedSyncTransaction,
    ]),
  ],
  exports: [
    TypeOrmModule,
  ],
})
export class CoreModule {}
