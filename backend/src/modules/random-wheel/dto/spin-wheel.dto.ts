import { IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class SpinWheelDto {
  @IsOptional()
  @IsString()
  categoryCode?: string; // 'ALL' | 'CAFE' | 'CUISINE' | 'HISTORICAL' | 'SCENIC_VIEW' | 'OUTSKIRTS_ECO' | 'INDOOR'

  @IsOptional()
  @IsString()
  filterTag?: string; // 'CAFE_SONG_AO' | 'CAFE_MUOI' | 'VIEW_DEM_SONG_HUONG' | 'CHECKIN_NGOAI_THANH' | 'INDOOR_RAINY' | 'NEARBY' | 'DAC_SAN_HUE'

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
  @Min(300)
  @Max(50000)
  maxDistanceMeters?: number = 12000; // Bán kính tối đa tìm kiếm (mặc định 12km)

  @IsOptional()
  @IsString()
  placeIds?: string; // Danh sách ID/slug các cột mốc đẩy từ bản đồ vào vòng quay (phân tách bằng dấu phẩy)
}
