import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItineraryController } from './itinerary.controller';
import { ItineraryService } from './itinerary.service';
import { WeatherModule } from '../weather/weather.module';
import { Itinerary } from './entities/itinerary.entity';
import { ItineraryStop } from './entities/itinerary-stop.entity';
import { Place } from '../places/entities/place.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Itinerary, ItineraryStop, Place]),
    WeatherModule
  ],
  controllers: [ItineraryController],
  providers: [ItineraryService],
  exports: [ItineraryService],
})
export class ItineraryModule {}
