import { Module } from '@nestjs/common';
import { GamificationController } from './gamification.controller';
import { GamificationService } from './gamification.service';
import { InMemoryDbService } from '../../database/in-memory-db.service';

@Module({
  controllers: [GamificationController],
  providers: [GamificationService, InMemoryDbService],
  exports: [GamificationService],
})
export class GamificationModule {}
