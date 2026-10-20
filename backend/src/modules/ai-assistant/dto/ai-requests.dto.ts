import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class AskGuideDto {
  @ApiProperty({
    description: 'Câu hỏi hoặc yêu cầu của du khách gửi cho trợ lý AI (tối đa 500 ký tự)',
    example: 'Kể cho tôi nghe về lịch sử Cầu Tràng Tiền và những món ăn vặt ngon nhất quanh chân cầu.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500, { message: 'Câu hỏi không được vượt quá 500 ký tự' })
  question: string;

  @ApiProperty({
    description: 'Ngôn ngữ phản hồi (vi hoặc en)',
    example: 'vi',
    required: false,
  })
  @IsString()
  @IsOptional()
  language?: string = 'vi';

  @ApiProperty({
    description: 'Tên địa điểm gần du khách nhất hiện tại (nếu có GPS)',
    example: 'Cầu Tràng Tiền',
    required: false,
  })
  @IsString()
  @IsOptional()
  currentNearbyPlace?: string;
}

export class AdaptItineraryDto {
  @ApiProperty({
    description: 'Danh sách các điểm trong lịch trình hiện tại',
    example: [
      { timeSlot: '08:30 - 11:30', placeName: 'Đại Nội Huế', envType: 'OUTDOOR' },
      { timeSlot: '14:00 - 16:30', placeName: 'Đồi Vọng Cảnh & Lăng Tự Đức', envType: 'OUTDOOR' },
    ],
  })
  currentItinerary: Array<{
    timeSlot: string;
    placeName: string;
    envType: 'INDOOR' | 'OUTDOOR' | 'SEMI_OUTDOOR';
  }>;

  @ApiProperty({
    description: 'Mức ngân sách của du khách: LOW, MEDIUM, LUXURY',
    example: 'MEDIUM',
    required: false,
  })
  @IsString()
  @IsOptional()
  userBudget?: string = 'MEDIUM';
}

export class ExplainPlaceStoryDto {
  @ApiProperty({
    description: 'ID của địa điểm cần thuyết minh',
    example: '8f8b0596-f5ee-449e-8c31-9cb6be62b662',
  })
  @IsString()
  @IsNotEmpty()
  placeId: string;

  @ApiProperty({
    description: 'Thời điểm hoặc bối cảnh tham quan: MORNING, AFTERNOON, NIGHT, RAINY',
    example: 'AFTERNOON',
    required: false,
  })
  @IsString()
  @IsOptional()
  visitingContext?: string = 'AFTERNOON';

  @ApiProperty({
    description: 'Phong cách thuyết minh: DEEP_CULTURE, QUICK_STORY, ROMANTIC',
    example: 'DEEP_CULTURE',
    required: false,
  })
  @IsString()
  @IsOptional()
  tone?: string = 'DEEP_CULTURE';

  @ApiProperty({
    description: 'Ngôn ngữ thuyết minh: vi hoặc en',
    example: 'vi',
    required: false,
  })
  @IsString()
  @IsOptional()
  language?: string = 'vi';
}

