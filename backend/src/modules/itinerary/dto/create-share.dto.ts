import { IsBoolean, IsInt, IsOptional, Max, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateShareDto {
  @ApiPropertyOptional({ description: 'Thời hạn liên kết (ngày), mặc định 30, tối đa 365', default: 30 })
  @IsOptional()
  @IsInt({ message: 'expiresInDays phải là số nguyên' })
  @Min(1, { message: 'expiresInDays tối thiểu là 1 ngày' })
  @Max(365, { message: 'expiresInDays tối đa là 365 ngày' })
  expiresInDays?: number;

  @ApiPropertyOptional({ description: 'Cho phép chia sẻ kèm ghi chú của tôi', default: false })
  @IsOptional()
  @IsBoolean({ message: 'includeNotes phải là boolean' })
  includeNotes?: boolean;

  @ApiPropertyOptional({ description: 'Cho phép người khác lưu bản sao lộ trình', default: true })
  @IsOptional()
  @IsBoolean({ message: 'allowCopy phải là boolean' })
  allowCopy?: boolean;
}
