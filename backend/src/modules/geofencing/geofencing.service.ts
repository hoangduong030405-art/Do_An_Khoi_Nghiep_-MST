import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from '../places/entities/place.entity';
import { UserUnlock } from './entities/user-unlock.entity';
import { UserPoints } from '../gamification/entities/user-points.entity';
import { VerifyGpsDto } from './dto/verify-gps.dto';

@Injectable()
export class GeofencingService {
  private readonly logger = new Logger(GeofencingService.name);

  constructor(
    @InjectRepository(Place) private readonly placeRepo: Repository<Place>,
    @InjectRepository(UserUnlock) private readonly unlockRepo: Repository<UserUnlock>,
    @InjectRepository(UserPoints) private readonly pointsRepo: Repository<UserPoints>,
  ) {}

  calculateDistanceMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371000;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  async checkAndUnlockMilestone(userId: string, dto: VerifyGpsDto) {
    if (dto.qrToken) {
      return this.unlockByQrToken(userId, dto.qrToken);
    }

    const { latitude, longitude, accuracy, isMockLocation, timestamp } = dto;
    if (latitude === undefined || longitude === undefined || isNaN(latitude) || isNaN(longitude)) {
      throw new BadRequestException('Tọa độ không hợp lệ.');
    }
    
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      throw new BadRequestException('Tọa độ ngoài khoảng hợp lệ.');
    }

    const MAX_ACCURACY = parseInt(process.env.MAX_GPS_ACCURACY || '50', 10);
    if (accuracy && accuracy > MAX_ACCURACY) {
      return { unlocked: false, message: `Độ chính xác GPS quá thấp (${accuracy}m). Yêu cầu <= ${MAX_ACCURACY}m.` };
    }

    if (isMockLocation) {
      this.logger.warn(`Phát hiện giả lập GPS từ user ${userId}`);
      return { unlocked: false, message: 'Phát hiện sử dụng vị trí giả lập. Vui lòng tắt Fake GPS.' };
    }

    // Tốc độ di chuyển (chống dịch chuyển tức thời)
    let userPoints = await this.pointsRepo.findOne({ where: { userId } });
    if (!userPoints) {
      userPoints = this.pointsRepo.create({ userId, points: 0 });
      await this.pointsRepo.save(userPoints);
    }

    const currentTime = timestamp ? new Date(timestamp) : new Date();
    
    if (userPoints.lastLatitude && userPoints.lastLongitude && userPoints.lastCheckAt) {
      const distanceSinceLast = this.calculateDistanceMeters(
        latitude, longitude, userPoints.lastLatitude, userPoints.lastLongitude
      );
      const timeDiffSeconds = (currentTime.getTime() - userPoints.lastCheckAt.getTime()) / 1000;
      
      const MIN_DISTANCE_M = parseInt(process.env.FAST_TRAVEL_MIN_DISTANCE_M || '300', 10);
      const MIN_TIME_S = parseInt(process.env.FAST_TRAVEL_MIN_TIME_S || '5', 10);

      if (distanceSinceLast > MIN_DISTANCE_M && timeDiffSeconds > MIN_TIME_S) {
        const speedKmH = (distanceSinceLast / 1000) / (timeDiffSeconds / 3600);
        if (speedKmH > 120) {
          this.logger.warn(`Tốc độ bất thường: user ${userId} di chuyển ${speedKmH.toFixed(2)} km/h`);
          return { unlocked: false, message: 'Phát hiện dịch chuyển bất thường. Vui lòng chờ vài phút trước khi check-in tiếp.' };
        }
      }
    }

    // Cập nhật vị trí gần nhất
    userPoints.lastLatitude = latitude;
    userPoints.lastLongitude = longitude;
    userPoints.lastCheckAt = currentTime;
    await this.pointsRepo.save(userPoints);

    this.logger.log(`Tín hiệu GPS nhận được: User=${userId}, Lat=${latitude}, Lng=${longitude}, Acc=${accuracy}`);

    const places = await this.placeRepo.find();
    
    const matchedPlaces = places.map((p) => {
      const distance = this.calculateDistanceMeters(latitude, longitude, p.latitude, p.longitude);
      return { ...p, distanceMeters: Math.round(distance * 10) / 10 };
    })
    .filter((p) => p.distanceMeters <= p.geofenceRadiusMeters)
    .sort((a, b) => a.distanceMeters - b.distanceMeters);

    if (matchedPlaces.length === 0) {
      return { unlocked: false, message: 'Bạn chưa vào đủ gần bán kính mở khóa của bất kỳ di tích nào (yêu cầu <= 35m).' };
    }

    const place = matchedPlaces[0];
    return this.processUnlock(userId, place, place.distanceMeters);
  }

  private async unlockByQrToken(userId: string, qrToken: string) {
    if (!qrToken || qrToken.length < 16) {
      return { unlocked: false, message: 'Mã QR không hợp lệ hoặc đã hết hạn.' };
    }
    // We cannot search directly because timingSafeEqual needs to happen in JS
    // But searching all places might be slow. So we query by exact match, then verify timingSafeEqual
    const place = await this.placeRepo.createQueryBuilder('place')
      .addSelect('place.qrToken') // it's excluded by default
      .where('place.qrToken = :token', { token: qrToken })
      .getOne();

    if (!place || !place.qrToken) {
      return { unlocked: false, message: 'Mã QR không hợp lệ hoặc đã hết hạn.' };
    }
    
    try {
      const bufferToken = Buffer.from(qrToken, 'utf-8');
      const bufferPlaceToken = Buffer.from(place.qrToken, 'utf-8');
      if (bufferToken.length !== bufferPlaceToken.length || !require('crypto').timingSafeEqual(bufferToken, bufferPlaceToken)) {
        return { unlocked: false, message: 'Mã QR không hợp lệ hoặc đã hết hạn.' };
      }
    } catch {
      return { unlocked: false, message: 'Mã QR không hợp lệ.' };
    }
    
    return this.processUnlock(userId, place, 0); // distance 0 for QR
  }

  private async processUnlock(userId: string, place: Place, distanceMeters: number) {
    try {
      await this.unlockRepo.save(this.unlockRepo.create({
        userId,
        placeId: place.id,
        distanceMeters,
        pointsAwarded: place.greenRewardPoints,
      }));

      let userPoints = await this.pointsRepo.findOne({ where: { userId } });
      if (!userPoints) {
        userPoints = this.pointsRepo.create({ userId, points: 0 });
      }
      userPoints.points += place.greenRewardPoints;
      await this.pointsRepo.save(userPoints);

      return {
        unlocked: true, placeId: place.id, placeName: place.name, thumbnailUrl: place.thumbnailUrl,
        distanceMeters, rewardPoints: place.greenRewardPoints,
        totalGreenPoints: userPoints.points,
        message: `Chúc mừng bạn đã mở khóa cột mốc [${place.name}] và nhận được +${place.greenRewardPoints} Điểm Du Lịch Xanh!`,
      };
    } catch (error: any) {
      if (error.code === '23505') {
        return { unlocked: false, placeName: place.name, message: `Bạn đã từng mở khóa và nhận điểm tại [${place.name}] trước đó rồi.` };
      }
      throw error;
    }
  }

  async checkInItineraryMilestone(userId: string, dto: VerifyGpsDto) {
    return { checkInSuccess: false, message: 'Not implemented' };
  }

  async getUserUnlockedHistory(userId: string) {
    return this.unlockRepo.find({ where: { userId } });
  }
}
