import { Injectable, Optional } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InMemoryDbService } from '../../database/in-memory-db.service';
import { UserPoints } from '../gamification/entities/user-points.entity';

export interface SubmitPlaceDto {
  userId: string;
  placeName: string;
  address: string;
  latitude: number;
  longitude: number;
  environmentType: 'INDOOR' | 'OUTDOOR' | 'SEMI_OUTDOOR';
  reasonRecommendation: string;
  proofImages?: string[];
}

@Injectable()
export class CrowdsourceService {
  private submissions: any[] = [];

  constructor(
    private readonly inMemoryDb: InMemoryDbService,
    @Optional()
    @InjectRepository(UserPoints)
    private readonly pointsRepo?: Repository<UserPoints>,
  ) {}

  async submitContribution(dto: SubmitPlaceDto) {
    const newSubmission = {
      id: `crowd-${Date.now()}`,
      ...dto,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    this.submissions.unshift(newSubmission);

    return {
      success: true,
      submission: newSubmission,
      message:
        'Đề xuất địa điểm của bạn đã được gửi thành công đến ban biên tập HUEGO! Bạn sẽ nhận điểm thưởng xanh khi bài được duyệt.',
    };
  }

  async getPendingSubmissions() {
    return this.submissions;
  }

  async approveSubmission(submissionId: string, pointsAwarded: number = 50) {
    const sub = this.submissions.find(s => s.id === submissionId);
    if (!sub) {
      return { success: false, message: 'Không tìm thấy đề xuất đóng góp' };
    }
    sub.status = 'APPROVED';
    sub.pointsAwarded = pointsAwarded;
    sub.reviewedAt = new Date().toISOString();

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
      message: `Đã duyệt đề xuất "${sub.placeName}" và cộng +${pointsAwarded} Green Points cho người đóng góp.`,
      submission: sub,
    };
  }

  async rejectSubmission(submissionId: string, reason?: string) {
    const sub = this.submissions.find(s => s.id === submissionId);
    if (!sub) {
      return { success: false, message: 'Không tìm thấy đề xuất đóng góp' };
    }
    sub.status = 'REJECTED';
    sub.rejectReason = reason || 'Chưa đủ thông tin kiểm chứng';
    sub.reviewedAt = new Date().toISOString();

    return {
      success: true,
      message: `Đã từ chối đề xuất "${sub.placeName}".`,
      submission: sub,
    };
  }
}
