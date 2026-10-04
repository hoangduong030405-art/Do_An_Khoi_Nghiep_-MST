import { Module } from '@nestjs/common';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { InMemoryDbService } from '../../database/in-memory-db.service';

@Module({
  controllers: [PlacesController],
  providers: [PlacesService, InMemoryDbService],
  exports: [PlacesService],
})
export class PlacesModule {}
