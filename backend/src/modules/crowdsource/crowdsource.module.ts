import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrowdsourceController } from './crowdsource.controller';
import { CrowdsourceService } from './crowdsource.service';
import { InMemoryDbService } from '../../database/in-memory-db.service';
import { UserPoints } from '../gamification/entities/user-points.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserPoints])],
  controllers: [CrowdsourceController],
  providers: [CrowdsourceService, InMemoryDbService],
  exports: [CrowdsourceService],
})
export class CrowdsourceModule {}
