import { Module } from '@nestjs/common';
import { AiAssistantController } from './ai-assistant.controller';
import { AiAssistantService } from './ai-assistant.service';
import { WeatherModule } from '../weather/weather.module';
import { InMemoryDbService } from '../../database/in-memory-db.service';

@Module({
  imports: [WeatherModule],
  controllers: [AiAssistantController],
  providers: [AiAssistantService, InMemoryDbService],
  exports: [AiAssistantService],
})
export class AiAssistantModule {}
