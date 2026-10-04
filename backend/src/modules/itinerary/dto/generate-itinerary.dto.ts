import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class GenerateItineraryDto {
  @ApiProperty({
    description: 'Số ngày lưu trú tại Huế (1 đến 5 ngày)',
    example: 2,
    default: 2,
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  durationDays: number;

  @ApiProperty({
    description: 'Ngân sách dự kiến: BUDGET (Tiết kiệm), STANDARD (Tiêu chuẩn), LUXURY (Nghỉ dưỡng)',
    example: 'STANDARD',
    default: 'STANDARD',
  })
  @IsString()
  @IsNotEmpty()
  budget: 'BUDGET' | 'STANDARD' | 'LUXURY';

  @ApiProperty({
    description: 'Sở thích trọng tâm: HERITAGE (Di tích lịch sử), CUISINE (Ẩm thực), ECO_GREEN (Du lịch xanh/Đạp xe), HEALING (Chữa lành/Nhà vườn)',
    example: 'ECO_GREEN',
    default: 'ECO_GREEN',
  })
  @IsString()
  @IsNotEmpty()
  preference: 'HERITAGE' | 'CUISINE' | 'ECO_GREEN' | 'HEALING';

  @ApiProperty({
    description: 'Phương tiện di chuyển chính: BICYCLE (Xe đạp xanh), WALKING (Đi bộ), MOTORBIKE, TAXI',
    example: 'BICYCLE',
    default: 'BICYCLE',
  })
  @IsString()
  @IsOptional()
  transportMode?: 'BICYCLE' | 'WALKING' | 'MOTORBIKE' | 'TAXI' = 'BICYCLE';
}
