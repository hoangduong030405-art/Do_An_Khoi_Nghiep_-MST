import { Injectable, BadRequestException, Logger, Optional } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from '../places/entities/place.entity';
import { PlaceNarration } from '../places/entities/place-narration.entity';
import { UserUnlock } from './entities/user-unlock.entity';
import { UserPoints } from '../gamification/entities/user-points.entity';
import { UnlockAuditLog } from './entities/unlock-audit-log.entity';
import { VerifyGpsDto } from './dto/verify-gps.dto';

@Injectable()
export class GeofencingService {
  private readonly logger = new Logger(GeofencingService.name);

  constructor(
    @InjectRepository(Place) private readonly placeRepo: Repository<Place>,
    @InjectRepository(UserUnlock) private readonly unlockRepo: Repository<UserUnlock>,
    @InjectRepository(UserPoints) private readonly pointsRepo: Repository<UserPoints>,
    @Optional()
    @InjectRepository(UnlockAuditLog) private readonly auditRepo?: Repository<UnlockAuditLog>,
    @Optional()
    @InjectRepository(PlaceNarration) private readonly narrationRepo?: Repository<PlaceNarration>,
  ) {}

  private async recordAudit(
    userId: string | null,
    placeId: string | null,
    reason: string,
    message: string,
    lat?: number,
    lng?: number,
    accuracy?: number,
  ) {
    if (this.auditRepo && typeof this.auditRepo.save === 'function') {
      try {
        await this.auditRepo.save(
          this.auditRepo.create({
            userId: userId || undefined,
            placeId: placeId || undefined,
            reason,
            message,
            latitude: lat,
            longitude: lng,
            accuracy,
          }),
        );
      } catch (err: any) {
        this.logger.warn(`Failed to record audit log: ${err.message}`);
      }
    }
  }

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
      const msg = `Độ chính xác GPS quá thấp (${accuracy}m). Yêu cầu <= ${MAX_ACCURACY}m.`;
      await this.recordAudit(userId, null, 'BAD_ACCURACY', msg, latitude, longitude, accuracy);
      return { unlocked: false, message: msg };
    }

    if (isMockLocation) {
      this.logger.warn(`Phát hiện giả lập GPS từ user ${userId}`);
      const msg = 'Phát hiện sử dụng vị trí giả lập. Vui lòng tắt Fake GPS.';
      await this.recordAudit(userId, null, 'MOCK_LOCATION', msg, latitude, longitude, accuracy);
      return { unlocked: false, message: msg };
    }

    // Tốc độ di chuyển (chống dịch chuyển tức thời)
    let userPoints = await this.pointsRepo.findOne({ where: { userId } });
    if (!userPoints) {
      try {
        userPoints = this.pointsRepo.create({ userId, points: 0 });
        await this.pointsRepo.save(userPoints);
      } catch (err: any) {
        if (err.code === '23505') {
          userPoints = await this.pointsRepo.findOne({ where: { userId } });
        } else {
          throw err;
        }
      }
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
          const msg = 'Phát hiện dịch chuyển bất thường. Vui lòng chờ vài phút trước khi check-in tiếp.';
          await this.recordAudit(userId, null, 'SPEED_ANOMALY', msg, latitude, longitude, accuracy);
          return { unlocked: false, message: msg };
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

    // 1. Nếu client chỉ định rõ placeId (người dùng chọn từ danh sách hoặc chỉ định cụ thể)
    if (dto.placeId) {
      const targetPlace = places.find(p => p.id === dto.placeId || p.slug === dto.placeId);
      if (!targetPlace) {
        return { unlocked: false, message: 'Địa danh yêu cầu không tồn tại trong hệ thống.' };
      }
      const distance = this.calculateDistanceMeters(latitude, longitude, targetPlace.latitude, targetPlace.longitude);
      const distRounded = Math.round(distance * 10) / 10;
      if (distRounded > targetPlace.geofenceRadiusMeters) {
        const msg = `Bạn đang cách [${targetPlace.name}] ${Math.round(distance)}m, nằm ngoài bán kính mở khóa (${targetPlace.geofenceRadiusMeters}m).`;
        await this.recordAudit(userId, targetPlace.id, 'OUT_OF_RANGE', msg, latitude, longitude, accuracy);
        return { unlocked: false, message: msg };
      }
      return this.processUnlock(userId, targetPlace, distRounded, latitude, longitude, accuracy);
    }

    // 2. Nếu không truyền placeId: tìm tất cả địa danh trong bán kính
    const matchedPlaces = places.map((p) => {
      const distance = this.calculateDistanceMeters(latitude, longitude, p.latitude, p.longitude);
      return { ...p, distanceMeters: Math.round(distance * 10) / 10 };
    })
    .filter((p) => p.distanceMeters <= p.geofenceRadiusMeters)
    .sort((a, b) => a.distanceMeters - b.distanceMeters);

    if (matchedPlaces.length === 0) {
      const msg = 'Bạn chưa vào đủ gần bán kính mở khóa của bất kỳ di tích nào.';
      await this.recordAudit(userId, null, 'OUT_OF_RANGE', msg, latitude, longitude, accuracy);
      return { unlocked: false, message: msg };
    }

    // Lọc bỏ các địa danh người dùng đã mở khóa trước đó
    let userUnlocks: UserUnlock[] = [];
    if (this.unlockRepo && typeof this.unlockRepo.find === 'function') {
      userUnlocks = await this.unlockRepo.find({ where: { userId } });
    }
    const unlockedIds = new Set(userUnlocks.map(u => u.placeId));
    const availablePlaces = matchedPlaces.filter(p => !unlockedIds.has(p.id) && !unlockedIds.has(p.slug));

    if (availablePlaces.length === 0) {
      const msg = matchedPlaces.length === 1
        ? `Bạn đã từng mở khóa và nhận điểm tại [${matchedPlaces[0].name}] trước đó rồi.`
        : `Bạn đã từng mở khóa tất cả các địa danh [${matchedPlaces.map(p => p.name).join(', ')}] trong khu vực này trước đó rồi.`;
      return {
        unlocked: false,
        message: msg,
        alreadyUnlocked: matchedPlaces.map(p => ({ id: p.id, name: p.name })),
      };
    }

    // Nếu chỉ có đúng 1 địa danh chưa mở khóa trong bán kính: tự động mở khóa
    if (availablePlaces.length === 1) {
      const place = availablePlaces[0];
      return this.processUnlock(userId, place, place.distanceMeters, latitude, longitude, accuracy);
    }

    // Nếu có từ 2 địa danh chưa mở khóa trở lên (vùng chồng lấn như Đại Nội và Điện Thái Hòa):
    // Trả về danh sách để client hiển thị cho người dùng chọn, KHÔNG tự ý chọn
    return {
      unlocked: false,
      requiresSelection: true,
      message: `Phát hiện ${availablePlaces.length} địa danh đủ điều kiện mở khóa quanh tọa độ của bạn. Vui lòng chọn địa danh muốn check-in.`,
      eligiblePlaces: availablePlaces.map(p => ({
        id: p.id,
        slug: p.slug,
        name: p.name,
        rewardPoints: p.greenRewardPoints,
        distanceMeters: p.distanceMeters,
        geofenceRadiusMeters: p.geofenceRadiusMeters,
        thumbnailUrl: p.thumbnailUrl,
      })),
    };
  }

  private async unlockByQrToken(userId: string, qrToken: string) {
    if (!qrToken || qrToken.length < 16) {
      const msg = 'Mã QR không hợp lệ hoặc đã hết hạn.';
      await this.recordAudit(userId, null, 'INVALID_QR', msg);
      return { unlocked: false, message: msg };
    }
    const place = await this.placeRepo.createQueryBuilder('place')
      .addSelect('place.qrToken')
      .where('place.qrToken = :token', { token: qrToken })
      .getOne();

    if (!place || !place.qrToken) {
      const msg = 'Mã QR không hợp lệ hoặc đã hết hạn.';
      await this.recordAudit(userId, null, 'INVALID_QR', msg);
      return { unlocked: false, message: msg };
    }
    
    try {
      const bufferToken = Buffer.from(qrToken, 'utf-8');
      const bufferPlaceToken = Buffer.from(place.qrToken, 'utf-8');
      if (bufferToken.length !== bufferPlaceToken.length || !require('crypto').timingSafeEqual(bufferToken, bufferPlaceToken)) {
        const msg = 'Mã QR không hợp lệ hoặc đã hết hạn.';
        await this.recordAudit(userId, place.id, 'INVALID_QR', msg);
        return { unlocked: false, message: msg };
      }
    } catch {
      const msg = 'Mã QR không hợp lệ.';
      await this.recordAudit(userId, place.id, 'INVALID_QR', msg);
      return { unlocked: false, message: msg };
    }
    
    return this.processUnlock(userId, place, 0); // distance 0 for QR
  }

  private async processUnlock(
    userId: string,
    place: Place,
    distanceMeters: number,
    lat?: number,
    lng?: number,
    acc?: number,
  ) {
    // Kiểm tra giới hạn điểm cộng tối đa trong ngày (MAX_DAILY_GREEN_POINTS)
    // Tính theo múi giờ Asia/Ho_Chi_Minh (UTC+7) trực tiếp bằng truy vấn SQL
    const MAX_DAILY = parseInt(process.env.MAX_DAILY_GREEN_POINTS || '500', 10);

    let todayUnlocks: UserUnlock[] = [];
    if (this.unlockRepo && typeof this.unlockRepo.createQueryBuilder === 'function') {
      todayUnlocks = await this.unlockRepo
        .createQueryBuilder('unlock')
        .where('unlock.userId = :userId', { userId })
        .andWhere(
          "(timezone('Asia/Ho_Chi_Minh', timezone('UTC', unlock.unlockedAt)))::date = (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Ho_Chi_Minh')::date",
        )
        .getMany();
    } else if (this.unlockRepo && typeof this.unlockRepo.find === 'function') {
      // Dự phòng cho môi trường in-memory / unit-test mock
      const VIETNAM_OFFSET_MS = 7 * 60 * 60 * 1000;
      const now = new Date();
      const vnTime = new Date(now.getTime() + VIETNAM_OFFSET_MS);
      const startOfDay = new Date(Date.UTC(vnTime.getUTCFullYear(), vnTime.getUTCMonth(), vnTime.getUTCDate(), 0, 0, 0) - VIETNAM_OFFSET_MS);
      todayUnlocks = (await this.unlockRepo.find({ where: { userId } as any })).filter(u => new Date(u.unlockedAt) >= startOfDay);
    } else {
      todayUnlocks = [];
    }

    const currentDailyPoints = todayUnlocks.reduce((sum, u) => sum + (u.pointsAwarded || 0), 0);
    if (currentDailyPoints + place.greenRewardPoints > MAX_DAILY) {
      const msg = `Hôm nay bạn đã nhận ${currentDailyPoints}/${MAX_DAILY} điểm, mở khóa này sẽ vượt giới hạn (${place.greenRewardPoints} điểm).`;
      await this.recordAudit(userId, place.id, 'DAILY_LIMIT_EXCEEDED', msg, lat, lng, acc);
      return { unlocked: false, message: msg };
    }

    try {
      await this.unlockRepo.save(this.unlockRepo.create({
        userId,
        placeId: place.id,
        distanceMeters,
        pointsAwarded: place.greenRewardPoints,
      }));

      let userPoints = await this.pointsRepo.findOne({ where: { userId } });
      if (!userPoints) {
        try {
          userPoints = this.pointsRepo.create({ userId, points: place.greenRewardPoints });
          await this.pointsRepo.save(userPoints);
        } catch (err: any) {
          if (err.code === '23505') {
            userPoints = await this.pointsRepo.findOne({ where: { userId } });
            if (userPoints) {
              userPoints.points += place.greenRewardPoints;
              await this.pointsRepo.save(userPoints);
            }
          }
        }
      } else {
        userPoints.points += place.greenRewardPoints;
        await this.pointsRepo.save(userPoints);
      }

      let narrationShort: string | null = null;
      let narrationStatus: string | null = null;
      let narrationDisclaimer: string | null = null;

      if (this.narrationRepo && typeof this.narrationRepo.findOne === 'function') {
        try {
          const narration = await this.narrationRepo.findOne({
            where: { placeId: place.id, lang: 'vi' },
          });
          if (narration) {
            const isDemoMode = process.env.DEMO_MODE !== 'false';
            if (isDemoMode) {
              narrationShort = narration.shortText;
              narrationStatus = narration.reviewStatus;
              narrationDisclaimer = narration.reviewStatus === 'draft' ? 'Nội dung đang chờ kiểm duyệt' : null;
            } else if (narration.reviewStatus === 'verified') {
              narrationShort = narration.shortText;
              narrationStatus = 'verified';
              narrationDisclaimer = null;
            }
          }
        } catch (err: any) {
          this.logger.warn(`Could not load narration for place ${place.id}: ${err.message}`);
        }
      }

      return {
        unlocked: true, placeId: place.id, placeName: place.name, thumbnailUrl: place.thumbnailUrl,
        distanceMeters, rewardPoints: place.greenRewardPoints,
        totalGreenPoints: userPoints.points,
        narrationShort,
        narrationStatus,
        narrationDisclaimer,
        message: `Chúc mừng bạn đã mở khóa cột mốc [${place.name}] và nhận được +${place.greenRewardPoints} Điểm Du Lịch Xanh!`,
      };
    } catch (error: any) {
      if (error.code === '23505') {
        const msg = `Bạn đã từng mở khóa và nhận điểm tại [${place.name}] trước đó rồi.`;
        await this.recordAudit(userId, place.id, 'ALREADY_UNLOCKED', msg, lat, lng, acc);
        return { unlocked: false, placeName: place.name, message: msg };
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

  async getNearbyPlaces(userId: string, lat: number, lng: number, maxRadiusMeters: number = 1000) {
    if (isNaN(lat) || isNaN(lng)) return [];
    const places = await this.placeRepo.find();
    let unlockedIds = new Set<string>();
    if (userId && this.unlockRepo && typeof this.unlockRepo.find === 'function') {
      const unlocks = await this.unlockRepo.find({ where: { userId } });
      unlockedIds = new Set(unlocks.map(u => u.placeId));
    }
    return places.map(p => {
      const distance = this.calculateDistanceMeters(lat, lng, p.latitude, p.longitude);
      const distRounded = Math.round(distance * 10) / 10;
      return {
        id: p.id,
        slug: p.slug,
        name: p.name,
        categoryName: p.categoryName,
        thumbnailUrl: p.thumbnailUrl,
        rewardPoints: p.greenRewardPoints,
        geofenceRadiusMeters: p.geofenceRadiusMeters,
        distanceMeters: distRounded,
        canUnlock: distRounded <= p.geofenceRadiusMeters,
        isUnlocked: unlockedIds.has(p.id) || unlockedIds.has(p.slug),
      };
    })
    .filter(p => p.distanceMeters <= maxRadiusMeters)
    .sort((a, b) => a.distanceMeters - b.distanceMeters);
  }
}
