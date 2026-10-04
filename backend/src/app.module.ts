import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GeofencingModule } from './modules/geofencing/geofencing.module';
import { PlacesModule } from './modules/places/places.module';
import { WeatherModule } from './modules/weather/weather.module';
import { AiAssistantModule } from './modules/ai-assistant/ai-assistant.module';
import { GamificationModule } from './modules/gamification/gamification.module';
import { CrowdsourceModule } from './modules/crowdsource/crowdsource.module';
import { AffiliateModule } from './modules/affiliate/affiliate.module';
import { MobilePreviewModule } from './modules/mobile-preview/mobile-preview.module';
import { ItineraryModule } from './modules/itinerary/itinerary.module';
import { AdminModule } from './modules/admin/admin.module';
import { RandomWheelModule } from './modules/random-wheel/random-wheel.module';
import { InMemoryDbService } from './database/in-memory-db.service';

@Module({
  imports: [
    // Đọc cấu hình môi trường (.env)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Các Modules Nghiệp Vụ Toàn Diện của HUEGO
    GeofencingModule,
    PlacesModule,
    WeatherModule,
    AiAssistantModule,
    GamificationModule,
    CrowdsourceModule,
    AffiliateModule,
    MobilePreviewModule,
    ItineraryModule,
    AdminModule,
    RandomWheelModule,
  ],
  providers: [InMemoryDbService],
  exports: [InMemoryDbService],
})
export class AppModule {}
