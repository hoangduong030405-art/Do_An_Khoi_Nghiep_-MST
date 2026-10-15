import { IsArray, ArrayMaxSize, IsNumber, IsOptional } from 'class-validator';

export class OptimizeDto {
  @IsArray()
  @ArrayMaxSize(12, { message: 'Không thể tối ưu quá 12 địa điểm cùng lúc.' })
  placeIds: string[];

  @IsOptional()
  @IsNumber()
  startLat?: number;

  @IsOptional()
  @IsNumber()
  startLng?: number;
}
