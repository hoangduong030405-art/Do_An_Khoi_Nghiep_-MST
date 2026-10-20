import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlacesService } from './places.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Places & Heritage Map')
@Controller('places')
@Public()
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

  @Get(':id/narration')
  @ApiOperation({ summary: 'Lấy bản thuyết minh âm thanh văn hóa của địa danh (Place Audio Narration)' })
  @ApiParam({ name: 'id', description: 'Mã địa danh (placeId)' })
  @ApiQuery({ name: 'lang', required: false, description: 'Ngôn ngữ: vi hoặc en', example: 'vi' })
  async getNarration(@Param('id') id: string, @Query('lang') lang?: string) {
    return await this.placesService.getPlaceNarration(id, lang || 'vi');
  }
}
