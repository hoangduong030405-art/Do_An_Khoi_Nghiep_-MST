import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from '../places/entities/place.entity';
import { UserUnlock } from '../geofencing/entities/user-unlock.entity';
import { UserPoints } from './entities/user-points.entity';

@Injectable()
export class GamificationService {
  constructor(
    @InjectRepository(Place) private readonly placeRepo: Repository<Place>,
    @InjectRepository(UserUnlock) private readonly unlockRepo: Repository<UserUnlock>,
    @InjectRepository(UserPoints) private readonly pointsRepo: Repository<UserPoints>,
  ) {}

  async getUserGamificationProfile(userId: string) {
    let userPoints = await this.pointsRepo.findOne({ where: { userId } });
    const points = userPoints ? userPoints.points : 0;
    const unlocked = await this.unlockRepo.count({ where: { userId } });
    const totalPlaces = await this.placeRepo.count();
    const progressPercent = totalPlaces > 0 ? Math.round((unlocked / totalPlaces) * 100) : 0;

    const badges = [
      { title: 'Khám Phá Sơ Khởi', badgeCode: 'NEWBIE_EXPLORER', description: 'Mở khóa địa danh đầu tiên tại Huế', requiredPoints: 25, isUnlocked: points >= 25 },
      { title: 'Chiến Binh Du Lịch Xanh', badgeCode: 'GREEN_TRAVELER', description: 'Tích lũy 100 Điểm Xanh bằng xe đạp và đi bộ', requiredPoints: 100, isUnlocked: points >= 100 },
      { title: 'Học Giả Cố Đô', badgeCode: 'HUE_HERITAGE_MASTER', description: 'Mở khóa toàn bộ di tích Đại Nội và Lăng Tẩm', requiredPoints: 250, isUnlocked: points >= 250 },
    ];

    return {
      user: { id: userId, fullName: 'Nguyễn Cố Đô', greenPoints: points, currentLevel: points >= 200 ? 3 : points >= 100 ? 2 : 1 },
      stats: { totalUnlockedPlaces: unlocked, totalSystemPlaces: totalPlaces, progressPercent },
      badges,
      canGenerateCertificate: progressPercent >= 80 || points >= 200,
      pointsToNextCertificate: Math.max(0, 200 - points),
    };
  }

  async generateCertificate(userId: string) {
    const certCode = `HUEGO-GREEN-${Date.now().toString(36).toUpperCase()}`;
    return {
      certificateCode: certCode,
      recipientName: 'Nguyễn Cố Đô',
      issuedDate: new Date().toISOString(),
      title: 'ĐẠI SỨ DU LỊCH XANH CỐ ĐÔ HUẾ',
      verificationQrUrl: `https://verify.huego.vn/cert/${certCode}`,
      message: 'Chứng nhận hoàn thành xuất sắc lộ trình khám phá di sản và bảo vệ môi trường Huế.',
    };
  }
}
