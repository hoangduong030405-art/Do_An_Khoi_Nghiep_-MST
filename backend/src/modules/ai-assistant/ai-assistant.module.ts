import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiAssistantController } from './ai-assistant.controller';
import { AiAssistantService } from './ai-assistant.service';
import { WeatherModule } from '../weather/weather.module';
import { InMemoryDbService } from '../../database/in-memory-db.service';
import { Place } from '../places/entities/place.entity';
import { PlaceNarration } from '../places/entities/place-narration.entity';

@Module({
  imports: [
    WeatherModule,
    TypeOrmModule.forFeature([Place, PlaceNarration]),
  ],
  controllers: [AiAssistantController],
  providers: [AiAssistantService, InMemoryDbService],
  exports: [AiAssistantService],
})
export class AiAssistantModule {}
