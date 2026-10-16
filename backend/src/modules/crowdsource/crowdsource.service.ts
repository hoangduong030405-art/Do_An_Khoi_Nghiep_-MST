import { Injectable, Optional } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InMemoryDbService } from '../../database/in-memory-db.service';
import { UserPoints } from '../gamification/entities/user-points.entity';
import { CrowdsourceSubmission } from './entities/crowdsource-submission.entity';

export interface SubmitPlaceDto {
  userId: string;
  placeName: string;
  address: string;
  latitude: number;
  longitude: number;
  environmentType?: 'INDOOR' | 'OUTDOOR' | 'SEMI_OUTDOOR';
  reasonRecommendation: string;
  proofImages?: string[];
  imageUrl?: string;
}

@Injectable()
export class CrowdsourceService {
  constructor(
    private readonly inMemoryDb: InMemoryDbService,
    @Optional()
    @InjectRepository(UserPoints)
    private readonly pointsRepo?: Repository<UserPoints>,
    @Optional()
    @InjectRepository(CrowdsourceSubmission)
    private readonly submissionRepo?: Repository<CrowdsourceSubmission>,
  ) {}

  async submitContribution(dto: SubmitPlaceDto) {
    if (this.submissionRepo && typeof this.submissionRepo.save === 'function') {
      const entity = this.submissionRepo.create({
        userId: dto.userId,
        name: dto.placeName,
        address: dto.address,
        description: dto.reasonRecommendation || (dto as any).description || 'Đề xuất từ người dùng HUEGO',
        latitude: dto.latitude,
        longitude: dto.longitude,
        environmentType: dto.environmentType || 'OUTDOOR',
        imageUrl: dto.imageUrl || (dto.proofImages && dto.proofImages.length > 0 ? dto.proofImages[0] : undefined),
        status: 'PENDING',
      });
      const saved = await this.submissionRepo.save(entity);
      return {
        success: true,
        id: saved.id,
        submission: {
          id: saved.id,
          placeName: saved.name,
          address: saved.address,
          status: saved.status,
          imageUrl: saved.imageUrl,
          createdAt: saved.submittedAt ? saved.submittedAt.toISOString() : new Date().toISOString(),
        },
        message: 'Đề xuất địa điểm của bạn đã được lưu thành công vào cơ sở dữ liệu HUEGO!',
      };
    }

    const newSubmission = {
      id: `crowd-${Date.now()}`,
      ...dto,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    return {
      success: true,
      submission: newSubmission,
      message: 'Đề xuất địa điểm của bạn đã được gửi thành công đến ban biên tập HUEGO!',
    };
  }

  async getPendingSubmissions() {
    if (this.submissionRepo && typeof this.submissionRepo.find === 'function') {
      const subs = await this.submissionRepo.find({ order: { submittedAt: 'DESC' } });
      return subs.map(s => ({
        id: s.id,
        userId: s.userId,
        placeName: s.name,
        address: s.address,
        reasonRecommendation: s.description,
        latitude: s.latitude,
        longitude: s.longitude,
        environmentType: s.environmentType,
        imageUrl: s.imageUrl,
        status: s.status,
        pointsAwarded: s.pointsAwarded,
        createdAt: s.submittedAt ? s.submittedAt.toISOString() : new Date().toISOString(),
      }));
    }
    return [];
  }

  async approveSubmission(submissionId: string, pointsAwarded: number = 50) {
    if (this.submissionRepo && typeof this.submissionRepo.findOne === 'function') {
      const sub = await this.submissionRepo.findOne({ where: { id: submissionId } });
      if (!sub) {
        return { success: false, message: 'Không tìm thấy đề xuất đóng góp trong cơ sở dữ liệu' };
      }
      if (sub.status === 'APPROVED') {
        return { success: false, message: 'Đề xuất này đã được phê duyệt và cộng điểm trước đó rồi.' };
      }

      sub.status = 'APPROVED';
      sub.pointsAwarded = pointsAwarded;
      await this.submissionRepo.save(sub);

      if (this.pointsRepo && sub.userId) {
        try {
          let userPts = await this.pointsRepo.findOne({ where: { userId: sub.userId } });
          if (!userPts) {
            userPts = this.pointsRepo.create({ userId: sub.userId, points: 0 });
          }
          userPts.points += pointsAwarded;
          await this.pointsRepo.save(userPts);
        } catch (err) {
          console.warn('Lỗi cộng điểm đóng góp crowdsource:', err);
        }
      }

      return {
        success: true,
        message: `Đã duyệt đề xuất "${sub.name}" và cộng +${pointsAwarded} Green Points cho người đóng góp.`,
        submission: {
          id: sub.id,
          placeName: sub.name,
          status: sub.status,
          pointsAwarded,
        },
      };
    }

    return { success: false, message: 'Không tìm thấy repository' };
  }

  async rejectSubmission(submissionId: string, reason?: string) {
    if (this.submissionRepo && typeof this.submissionRepo.findOne === 'function') {
      const sub = await this.submissionRepo.findOne({ where: { id: submissionId } });
      if (!sub) {
        return { success: false, message: 'Không tìm thấy đề xuất đóng góp' };
      }
      sub.status = 'REJECTED';
      await this.submissionRepo.save(sub);

      return {
        success: true,
        message: `Đã từ chối đề xuất "${sub.name}".`,
        submission: { id: sub.id, placeName: sub.name, status: sub.status },
      };
    }

    return { success: false, message: 'Không tìm thấy repository' };
  }
}
