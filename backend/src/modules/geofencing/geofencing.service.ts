import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InMemoryDbService } from '../../database/in-memory-db.service';
import { VerifyGpsDto } from './dto/verify-gps.dto';

@Injectable()
export class GeofencingService {
  private readonly logger = new Logger(GeofencingService.name);

  constructor(private readonly inMemoryDb: InMemoryDbService) {}

  /**
   * Kiểm tra tọa độ GPS của người dùng với các địa danh trong bán kính Geofence
   * Sử dụng thuật toán đo khoảng cách mặt cầu Haversine (tương đương PostGIS ST_DWithin)
   */
  async checkAndUnlockMilestone(dto: VerifyGpsDto) {
    const { userId, latitude, longitude } = dto;
    this.logger.log(`Tín hiệu GPS nhận được: User=${userId}, Lat=${latitude}, Lng=${longitude}`);

    // Tìm các địa danh trong bán kính Geofence
    const matchedPlaces = this.inMemoryDb.places
      .map((p) => {
        const distance = this.inMemoryDb.calculateDistanceMeters(
          latitude,
          longitude,
          p.latitude,
          p.longitude,
        );
        return { ...p, distanceMeters: Math.round(distance * 10) / 10 };
      })
      .filter((p) => p.distanceMeters <= p.geofenceRadiusMeters)
      .sort((a, b) => a.distanceMeters - b.distanceMeters);

    if (matchedPlaces.length === 0) {
      return {
        unlocked: false,
        message: 'Bạn chưa vào đủ gần bán kính mở khóa của bất kỳ di tích nào (yêu cầu <= 35m). Hãy tiếp tục di chuyển nhé!',
      };
    }

    const place = matchedPlaces[0];

    // Kiểm tra xem đã mở khóa trước đó chưa
    const alreadyUnlocked = this.inMemoryDb.unlockedMilestones.some(
      (m) => m.userId === userId && m.placeId === place.id,
    );

    if (alreadyUnlocked) {
      return {
        unlocked: false,
        placeName: place.name,
        message: `Bạn đã từng mở khóa và nhận điểm tại [${place.name}] trước đó rồi.`,
      };
    }

    // 1. Ghi nhận mở khóa
    this.inMemoryDb.unlockedMilestones.push({
      userId,
      placeId: place.id,
      unlockedAt: new Date().toISOString(),
      distanceMeters: place.distanceMeters,
      pointsAwarded: place.greenRewardPoints,
    });

    // 2. Tích điểm Green Points
    const currentPoints = this.inMemoryDb.userPoints.get(userId) || 0;
    const newPoints = currentPoints + place.greenRewardPoints;
    this.inMemoryDb.userPoints.set(userId, newPoints);

    this.logger.log(`[Thành công] User ${userId} mở khóa: ${place.name} (+${place.greenRewardPoints} GP)`);

    return {
      unlocked: true,
      placeId: place.id,
      placeName: place.name,
      thumbnailUrl: place.thumbnailUrl,
      distanceMeters: place.distanceMeters,
      rewardPoints: place.greenRewardPoints,
      totalGreenPoints: newPoints,
      message: `Chúc mừng bạn đã mở khóa cột mốc [${place.name}] và nhận được +${place.greenRewardPoints} Điểm Du Lịch Xanh!`,
    };
  }

  /**
   * TÍNH NĂNG TRỌNG TÂM: Check-in GPS theo Lịch trình & Tự động cấp Chứng nhận khi đạt 100%
   */
  async checkInItineraryMilestone(dto: VerifyGpsDto) {
    const { userId, latitude, longitude, itineraryId = 'itinerary-hue-heritage-01' } = dto;
    this.logger.log(`Check-in Lịch trình: User=${userId}, Itinerary=${itineraryId}, Lat=${latitude}, Lng=${longitude}`);

    const itinerary = this.inMemoryDb.userItineraries.get(itineraryId);
    if (!itinerary) {
      throw new BadRequestException('Không tìm thấy lịch trình du lịch tương ứng.');
    }

    // Tìm các điểm chưa check-in trong lịch trình
    const unvisitedItems = itinerary.items.filter((item) => !item.isVisited);
    if (unvisitedItems.length === 0) {
      return {
        itineraryCompleted: true,
        progressPercent: 100,
        message: 'Lịch trình này đã hoàn thành 100% trước đó!',
      };
    }

    // Tìm xem người dùng có đang nằm trong bán kính geofence của điểm chưa check-in nào không
    let matchedItem: any = null;
    let matchedPlace: any = null;
    let shortestDistance = Infinity;

    for (const item of unvisitedItems) {
      const place = this.inMemoryDb.places.find((p) => p.id === item.placeId);
      if (place) {
        const dist = this.inMemoryDb.calculateDistanceMeters(
          latitude,
          longitude,
          place.latitude,
          place.longitude,
        );
        if (dist <= place.geofenceRadiusMeters && dist < shortestDistance) {
          shortestDistance = dist;
          matchedItem = item;
          matchedPlace = place;
        }
      }
    }

    if (!matchedItem || !matchedPlace) {
      return {
        checkInSuccess: false,
        itineraryCompleted: false,
        message: 'Bạn chưa đến đủ gần địa điểm tiếp theo trong lịch trình (yêu cầu <= 35m). Hãy di chuyển tới gần hơn nhé!',
      };
    }

    // 1. Ghi nhận check-in điểm này trong lịch trình
    matchedItem.isVisited = true;
    matchedItem.visitedAt = new Date().toISOString();

    // 2. Tích điểm Green Points
    const currentPoints = this.inMemoryDb.userPoints.get(userId) || 125;
    const newPoints = currentPoints + matchedPlace.greenRewardPoints;
    this.inMemoryDb.userPoints.set(userId, newPoints);

    // 3. Tính toán tiến độ hoàn thành lịch trình
    const totalItems = itinerary.items.length;
    const visitedCount = itinerary.items.filter((item) => item.isVisited).length;
    const progressPercent = Math.round((visitedCount / totalItems) * 100);

    const is100Percent = visitedCount === totalItems;
    let certificate = null;

    // 4. NẾU ĐẠT 100% HOÀN THÀNH -> TỰ ĐỘNG XUẤT CHỨNG NHẬN ĐIỆN TỬ (E-CERTIFICATE)
    if (is100Percent) {
      const certCode = `HUEGO-CERT-${Date.now().toString(36).toUpperCase()}`;
      certificate = {
        certificateCode: certCode,
        recipientName: 'Nguyễn Cố Đô',
        itineraryTitle: itinerary.title,
        completedDate: new Date().toISOString(),
        totalPlacesCompleted: totalItems,
        totalGreenPointsEarned: newPoints,
        carbonSavedKg: 5.6,
        qrVerificationUrl: `https://verify.huego.vn/cert/${certCode}`,
        digitalSignature: `HMAC_SHA256_${Buffer.from(certCode + userId).toString('base64').substring(0, 20)}`,
        shareText: `Tôi vừa hoàn thành xuất sắc 100% Hành trình Cố Đô Huế trên ứng dụng HUEGO và nhận Chứng nhận Du lịch Xanh Cố Đô! #HUEGO #DuLichHue #GreenTourism`,
      };
      this.inMemoryDb.issuedCertificates.push(certificate);
      this.logger.log(`[CHỨNG NHẬN CẤP THÀNH CÔNG] Mã: ${certCode} cho User ${userId}`);
    }

    return {
      checkInSuccess: true,
      placeName: matchedPlace.name,
      distanceMeters: Math.round(shortestDistance * 10) / 10,
      pointsEarned: matchedPlace.greenRewardPoints,
      totalGreenPoints: newPoints,
      progressPercent,
      visitedCount,
      totalCount: totalItems,
      itineraryCompleted: is100Percent,
      certificate,
      message: is100Percent
        ? `XUẤT SẮC! Bạn đã hoàn thành 100% lịch trình [${itinerary.title}]. Hệ thống đã tự động xuất Chứng nhận Vinh danh Du lịch Cố Đô dành cho bạn!`
        : `Check-in thành công tại [${matchedPlace.name}] (+${matchedPlace.greenRewardPoints} GP). Tiến độ hành trình: ${progressPercent}%.`,
    };
  }

  async getUserUnlockedHistory(userId: string) {
    return this.inMemoryDb.unlockedMilestones
      .filter((m) => m.userId === userId)
      .map((m) => {
        const place = this.inMemoryDb.places.find((p) => p.id === m.placeId);
        return {
          ...m,
          placeName: place?.name,
          thumbnailUrl: place?.thumbnailUrl,
          address: place?.address,
        };
      });
  }
}
