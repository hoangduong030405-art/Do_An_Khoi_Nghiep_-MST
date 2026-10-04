import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { InMemoryDbService } from '../../database/in-memory-db.service';
import { CrowdsourceModule } from '../crowdsource/crowdsource.module';

@Module({
  imports: [CrowdsourceModule],
  controllers: [AdminController],
  providers: [InMemoryDbService],
})
export class AdminModule {}
