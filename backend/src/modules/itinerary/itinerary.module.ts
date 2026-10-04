import { Module } from '@nestjs/common';
import { ItineraryController } from './itinerary.controller';
import { ItineraryService } from './itinerary.service';
import { InMemoryDbService } from '../../database/in-memory-db.service';
import { WeatherModule } from '../weather/weather.module';

@Module({
  imports: [WeatherModule],
  controllers: [ItineraryController],
  providers: [ItineraryService, InMemoryDbService],
  exports: [ItineraryService],
})
export class ItineraryModule {}
