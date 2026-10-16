import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamificationController } from './gamification.controller';
import { GamificationService } from './gamification.service';
import { Place } from '../places/entities/place.entity';
import { UserUnlock } from '../geofencing/entities/user-unlock.entity';
import { UserPoints } from './entities/user-points.entity';
import { Certificate } from './entities/certificate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Place, UserUnlock, UserPoints, Certificate])],
  controllers: [GamificationController],
  providers: [GamificationService],
  exports: [GamificationService],
})
export class GamificationModule {}
