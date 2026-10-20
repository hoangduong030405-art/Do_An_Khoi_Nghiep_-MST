import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { Place } from './entities/place.entity';
import { PlaceNarration } from './entities/place-narration.entity';
import { PortalModule } from '../portal/portal.module';

@Module({
  imports: [TypeOrmModule.forFeature([Place, PlaceNarration]), PortalModule],
  controllers: [PlacesController],
  providers: [PlacesService],
  exports: [PlacesService, TypeOrmModule],
})
export class PlacesModule {}
