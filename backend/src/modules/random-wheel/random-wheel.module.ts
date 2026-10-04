import { Module } from '@nestjs/common';
import { RandomWheelController } from './random-wheel.controller';
import { RandomWheelService } from './random-wheel.service';
import { InMemoryDbService } from '../../database/in-memory-db.service';

@Module({
  controllers: [RandomWheelController],
  providers: [RandomWheelService, InMemoryDbService],
  exports: [RandomWheelService],
})
export class RandomWheelModule {}
