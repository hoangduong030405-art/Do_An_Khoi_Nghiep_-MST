import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsBoolean, IsString, Max, Min } from 'class-validator';

export class VerifyGpsDto {
  @ApiProperty({
    description: 'Vĩ độ (Latitude) gửi từ GPS điện thoại',
    example: 16.4697,
  })
  @IsNumber()
  @Min(-90)
  @Max(90)
  @IsOptional()
  latitude?: number;

  @ApiProperty({
    description: 'Kinh độ (Longitude) gửi từ GPS điện thoại',
    example: 107.5779,
  })
  @IsNumber()
  @Min(-180)
  @Max(180)
  @IsOptional()
  longitude?: number;

  @IsOptional()
  @IsNumber()
  accuracy?: number;

  @IsOptional()
  @IsBoolean()
  isMockLocation?: boolean;

  @IsOptional()
  @IsString()
  timestamp?: string;

  @IsOptional()
  @IsString()
  qrToken?: string;

  @ApiProperty({
    description: 'ID của Lịch trình đang thực hiện (Tùy chọn)',
    example: 'itinerary-hue-heritage-01',
    required: false,
  })
  itineraryId?: string;
}
