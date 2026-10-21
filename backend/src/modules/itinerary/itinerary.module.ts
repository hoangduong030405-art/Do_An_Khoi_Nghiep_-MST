import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItineraryController } from './itinerary.controller';
import { SharedItineraryController } from './shared-itinerary.controller';
import { PublicShareViewController } from './public-share-view.controller';
import { ItineraryService } from './itinerary.service';
import { WeatherModule } from '../weather/weather.module';
import { Itinerary } from './entities/itinerary.entity';
import { ItineraryStop } from './entities/itinerary-stop.entity';
import { ItineraryShare } from './entities/itinerary-share.entity';
import { Place } from '../places/entities/place.entity';
import { User } from '../auth/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Itinerary, ItineraryStop, ItineraryShare, Place, User]),
    WeatherModule,
  ],
  controllers: [
    ItineraryController,
    SharedItineraryController,
    PublicShareViewController,
  ],
  providers: [ItineraryService],
  exports: [ItineraryService],
})
export class ItineraryModule {}
