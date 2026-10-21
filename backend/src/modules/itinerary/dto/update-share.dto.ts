import { IsBoolean, IsInt, IsOptional, Max, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateShareDto {
  @ApiPropertyOptional({ description: 'Gia hạn thêm số ngày từ hôm nay (1-365 ngày)' })
  @IsOptional()
  @IsInt({ message: 'expiresInDays phải là số nguyên' })
  @Min(1, { message: 'expiresInDays tối thiểu là 1 ngày' })
  @Max(365, { message: 'expiresInDays tối đa là 365 ngày' })
  expiresInDays?: number;

  @ApiPropertyOptional({ description: 'Cập nhật quyền kèm ghi chú' })
  @IsOptional()
  @IsBoolean({ message: 'includeNotes phải là boolean' })
  includeNotes?: boolean;

  @ApiPropertyOptional({ description: 'Cập nhật quyền cho phép lưu bản sao' })
  @IsOptional()
  @IsBoolean({ message: 'allowCopy phải là boolean' })
  allowCopy?: boolean;
}
