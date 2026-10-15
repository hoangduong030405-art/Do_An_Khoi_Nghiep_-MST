import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeofencingController } from './geofencing.controller';
import { GeofencingService } from './geofencing.service';
import { Place } from '../places/entities/place.entity';
import { UserUnlock } from './entities/user-unlock.entity';
import { UserPoints } from '../gamification/entities/user-points.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Place, UserUnlock, UserPoints])],
  controllers: [GeofencingController],
  providers: [GeofencingService],
  exports: [GeofencingService],
})
export class GeofencingModule {}
