import { Module } from '@nestjs/common';
import { CrowdsourceController } from './crowdsource.controller';
import { CrowdsourceService } from './crowdsource.service';
import { InMemoryDbService } from '../../database/in-memory-db.service';

@Module({
  controllers: [CrowdsourceController],
  providers: [CrowdsourceService, InMemoryDbService],
  exports: [CrowdsourceService],
})
export class CrowdsourceModule {}
