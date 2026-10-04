import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlacesService } from './places.service';

@ApiTags('Places & Heritage Map')
@Controller('api/v1/places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy toàn bộ địa danh kèm tọa độ GPS hiển thị trên bản đồ số Huế' })
  @ApiQuery({ name: 'category', required: false, description: 'Lọc theo danh mục: HISTORICAL, CUISINE, ECO_GREEN...' })
  @ApiQuery({ name: 'envType', required: false, description: 'Lọc theo không gian: INDOOR, OUTDOOR' })
  async getPlaces(@Query('category') category?: string, @Query('envType') envType?: string) {
    return await this.placesService.getAllPlaces(category, envType);
  }

  @Get('nearby')
  @ApiOperation({ summary: 'Tìm các địa điểm du lịch gần vị trí du khách hiện tại (Radar GIS)' })
  @ApiQuery({ name: 'lng', type: Number, example: 107.5779 })
  @ApiQuery({ name: 'lat', type: Number, example: 16.4697 })
  @ApiQuery({ name: 'radius', type: Number, required: false, example: 3000 })
  async getNearby(
    @Query('lng') lng: number,
    @Query('lat') lat: number,
    @Query('radius') radius: number = 3000,
  ) {
    return await this.placesService.getNearbyPlaces(Number(lng), Number(lat), Number(radius));
  }
}
