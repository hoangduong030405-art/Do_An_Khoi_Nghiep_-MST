import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminApiController } from './admin-api.controller';
import { InMemoryDbService } from '../../database/in-memory-db.service';
import { CrowdsourceModule } from '../crowdsource/crowdsource.module';
import { AuthModule } from '../auth/auth.module';
import { Place } from '../places/entities/place.entity';
import { PlaceNarration } from '../places/entities/place-narration.entity';
import { UnlockAuditLog } from '../geofencing/entities/unlock-audit-log.entity';

@Module({
  imports: [CrowdsourceModule, AuthModule, TypeOrmModule.forFeature([Place, UnlockAuditLog, PlaceNarration])],
  controllers: [AdminController, AdminApiController],
  providers: [InMemoryDbService],
})
export class AdminModule {}
