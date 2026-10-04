import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID, Max, Min } from 'class-validator';

export class VerifyGpsDto {
  @ApiProperty({
    description: 'ID người dùng thực hiện check-in',
    example: 'e7b0e774-7243-41bb-9be4-8a4b868e82ef',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'Vĩ độ (Latitude) gửi từ GPS điện thoại',
    example: 16.4697,
  })
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @ApiProperty({
    description: 'Kinh độ (Longitude) gửi từ GPS điện thoại',
    example: 107.5779,
  })
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;

  @ApiProperty({
    description: 'ID của Lịch trình đang thực hiện (Tùy chọn)',
    example: 'itinerary-hue-heritage-01',
    required: false,
  })
  itineraryId?: string;
}
