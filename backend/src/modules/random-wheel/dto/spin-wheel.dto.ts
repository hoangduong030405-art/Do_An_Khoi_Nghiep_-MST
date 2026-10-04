import { IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class SpinWheelDto {
  @IsOptional()
  @IsString()
  categoryCode?: string; // Ví dụ: 'CAFE', 'CUISINE', 'SCENIC_VIEW', 'OUTSKIRTS_ECO'

  @IsOptional()
  @IsString()
  filterTag?: string; // Ví dụ: 'CAFE_SONG_AO', 'VIEW_DEM_SONG_HUONG', 'DAC_SAN_HUE'

  @IsOptional()
  @IsString()
  budgetTier?: 'BUDGET' | 'STANDARD' | 'LUXURY';

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  userLat?: number; // Vị trí GPS hiện tại của người dùng (Latitude)

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  userLng?: number; // Vị trí GPS hiện tại của người dùng (Longitude)

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(500)
  @Max(25000)
  maxDistanceMeters?: number = 8000; // Bán kính tối đa tìm kiếm (mặc định 8km)
}
