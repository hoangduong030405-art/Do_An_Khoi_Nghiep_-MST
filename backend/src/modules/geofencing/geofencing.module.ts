import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeofencingController } from './geofencing.controller';
import { GeofencingService } from './geofencing.service';
import { Place } from '../places/entities/place.entity';
import { PlaceNarration } from '../places/entities/place-narration.entity';
import { UserUnlock } from './entities/user-unlock.entity';
import { UserPoints } from '../gamification/entities/user-points.entity';
import { UnlockAuditLog } from './entities/unlock-audit-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Place, PlaceNarration, UserUnlock, UserPoints, UnlockAuditLog])],
  controllers: [GeofencingController],
  providers: [GeofencingService],
  exports: [GeofencingService, TypeOrmModule],
})
export class GeofencingModule {}
