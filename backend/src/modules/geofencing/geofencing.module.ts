import { Module } from '@nestjs/common';
import { GeofencingController } from './geofencing.controller';
import { GeofencingService } from './geofencing.service';
import { InMemoryDbService } from '../../database/in-memory-db.service';

@Module({
  controllers: [GeofencingController],
  providers: [GeofencingService, InMemoryDbService],
  exports: [GeofencingService, InMemoryDbService],
})
export class GeofencingModule {}
