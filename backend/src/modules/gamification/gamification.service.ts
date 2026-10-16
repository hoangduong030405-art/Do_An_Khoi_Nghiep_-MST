import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from '../places/entities/place.entity';
import { UserUnlock } from '../geofencing/entities/user-unlock.entity';
import { UserPoints } from './entities/user-points.entity';
import { Certificate } from './entities/certificate.entity';
import * as crypto from 'crypto';

@Injectable()
export class GamificationService {
  constructor(
    @InjectRepository(Place) private readonly placeRepo: Repository<Place>,
    @InjectRepository(UserUnlock) private readonly unlockRepo: Repository<UserUnlock>,
    @InjectRepository(UserPoints) private readonly pointsRepo: Repository<UserPoints>,
    @InjectRepository(Certificate) private readonly certRepo: Repository<Certificate>,
  ) {}

  async getUserGamificationProfile(userId: string) {
    let userPoints = await this.pointsRepo.findOne({ where: { userId } });
    const points = userPoints ? userPoints.points : 0;
    const unlockedList = await this.unlockRepo.find({ where: { userId } });
    const unlocked = unlockedList.length;
    const totalPlaces = await this.placeRepo.count();
    const progressPercent = totalPlaces > 0 ? Math.round((unlocked / totalPlaces) * 100) : 0;

    const badges = [
      { title: 'Khám Phá Sơ Khởi', badgeCode: 'NEWBIE_EXPLORER', description: 'Mở khóa địa danh đầu tiên tại Huế', requiredPoints: 25, isUnlocked: points >= 25 },
      { title: 'Chiến Binh Du Lịch Xanh', badgeCode: 'GREEN_TRAVELER', description: 'Tích lũy 100 Điểm Xanh bằng xe đạp và đi bộ', requiredPoints: 100, isUnlocked: points >= 100 },
      { title: 'Học Giả Cố Đô', badgeCode: 'HUE_HERITAGE_MASTER', description: 'Mở khóa toàn bộ di tích Đại Nội và Lăng Tẩm', requiredPoints: 250, isUnlocked: points >= 250 },
    ];

    return {
      totalPoints: points,
      points,
      user: { id: userId, fullName: 'Du Khách Cố Đô', greenPoints: points, currentLevel: points >= 200 ? 3 : points >= 100 ? 2 : 1 },
      stats: { totalUnlockedPlaces: unlocked, totalSystemPlaces: totalPlaces, progressPercent },
      badges,
      unlockedPlaces: unlockedList,
      canGenerateCertificate: unlocked >= 3 && points >= 60,
      pointsToNextCertificate: Math.max(0, 60 - points),
    };
  }

  async generateCertificate(userId: string) {
    const unlockedList = await this.unlockRepo.find({ where: { userId } });
    let userPoints = await this.pointsRepo.findOne({ where: { userId } });
    const points = userPoints ? userPoints.points : 0;

    if (unlockedList.length < 3 || points < 60) {
      throw new BadRequestException('Bạn cần mở khóa tối thiểu 3 địa danh VÀ đạt ít nhất 60 Green Points để nhận Chứng nhận E-Certificate Du Lịch Xanh.');
    }

    let existingCert = await this.certRepo.findOne({ where: { userId } });
    if (existingCert) {
      return {
        certificateCode: existingCert.code,
        recipientName: existingCert.recipientName,
        title: existingCert.title,
        unlockedCount: existingCert.unlockedCount,
        greenPoints: existingCert.greenPoints,
        issuedDate: existingCert.issuedAt ? existingCert.issuedAt.toISOString() : new Date().toISOString(),
        verificationUrl: `/verify/${existingCert.code}`,
        pdfUrl: `/api/v1/gamification/certificate/${existingCert.code}/pdf`,
        isExisting: true,
      };
    }

    const secret = process.env.JWT_SECRET || 'huego_secure_secret_cert_2026';
    const randPart = crypto.randomBytes(8).toString('hex').toUpperCase(); // 16 ký tự hex ngẫu nhiên
    const hmacSig = crypto.createHmac('sha256', secret).update(userId + ':' + Date.now()).digest('hex');
    const certCode = `HUEGO-CERT-${randPart}-${hmacSig.substring(0, 8).toUpperCase()}`;

    const newCert = this.certRepo.create({
      code: certCode,
      userId,
      recipientName: 'Đại sứ Khám phá Cố Đô',
      title: 'ĐẠI SỨ DU LỊCH XANH CỐ ĐÔ HUẾ',
      unlockedCount: unlockedList.length,
      greenPoints: points,
      hmacSignature: hmacSig,
    });
    await this.certRepo.save(newCert);

    return {
      certificateCode: certCode,
      recipientName: newCert.recipientName,
      title: newCert.title,
      unlockedCount: newCert.unlockedCount,
      greenPoints: newCert.greenPoints,
      issuedDate: newCert.issuedAt ? newCert.issuedAt.toISOString() : new Date().toISOString(),
      verificationUrl: `/verify/${certCode}`,
      pdfUrl: `/api/v1/gamification/certificate/${certCode}/pdf`,
      message: 'Chúc mừng bạn đã nhận Chứng nhận E-Certificate Du Lịch Xanh!',
    };
  }

  async verifyCertificate(code: string) {
    const cert = await this.certRepo.findOne({ where: { code } });
    if (!cert) {
      return { valid: false, message: 'Chứng nhận không tồn tại hoặc mã không hợp lệ trên hệ thống HUEGO.' };
    }
    return {
      valid: true,
      certificateCode: cert.code,
      code: cert.code,
      recipientName: cert.recipientName,
      title: cert.title,
      issuedDate: cert.issuedAt,
    };
  }

  async generateCertificatePdfBuffer(code: string): Promise<Buffer> {
    const { generateCertificatePdf } = require('./pdf-certificate.helper');
    const cert = await this.certRepo.findOne({ where: { code } });
    if (!cert) {
      throw new NotFoundException('Không tìm thấy chứng nhận tương ứng.');
    }
    const unlocks = await this.unlockRepo.find({ where: { userId: cert.userId } });
    const placeIds = unlocks.map(u => u.placeId);
    let placeMap: Record<string, string> = {};
    if (this.placeRepo && placeIds.length > 0) {
      const places = await this.placeRepo.find();
      places.forEach(p => {
        placeMap[p.id] = p.name;
        placeMap[p.slug] = p.name;
      });
    }

    return await generateCertificatePdf({
      recipientName: cert.recipientName,
      title: cert.title,
      certCode: cert.code,
      points: cert.greenPoints,
      unlockedCount: cert.unlockedCount,
      places: unlocks.map(u => ({ 
        name: placeMap[u.placeId] || u.placeId, 
        pointsAwarded: u.pointsAwarded 
      })),
      issuedDate: cert.issuedAt ? cert.issuedAt.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    });
  }
}

