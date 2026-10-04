import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from '../../database/in-memory-db.service';

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

  constructor(private readonly inMemoryDb: InMemoryDbService) {}

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
}
