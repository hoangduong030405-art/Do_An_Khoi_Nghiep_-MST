import { Controller, Get, Param, Query, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PortalService } from './portal.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('HueGo Web Portal & Museum 3D')
@Controller('api')
@Public()
export class PortalController {
  constructor(private readonly portalService: PortalService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Thống kê tổng quan kho dữ liệu Cố Đô (4.352 địa điểm, 10 bảo vật 3D)' })
  getStats() {
    return this.portalService.getStats();
  }

  @Get('places')
  @ApiOperation({ summary: 'Tìm kiếm, lọc danh mục và phân trang địa điểm Cố Đô' })
  @ApiQuery({ name: 'vertical', required: false, description: 'tour, fnb, cafe, stay, specialty, service, hoặc all' })
  @ApiQuery({ name: 'q', required: false, description: 'Từ khóa tìm kiếm (tên, địa chỉ, danh mục)' })
  @ApiQuery({ name: 'page', required: false, description: 'Số trang (mặc định 1)' })
  @ApiQuery({ name: 'limit', required: false, description: 'Số kết quả mỗi trang (mặc định 20, max 100)' })
  @ApiQuery({ name: 'sortBy', required: false, description: 'rating, reviews, name' })
  getPlaces(@Query() query: { vertical?: string; q?: string; page?: string; limit?: string; sortBy?: string }) {
    return this.portalService.getPlaces(query);
  }

  @Get('places/:id')
  @ApiOperation({ summary: 'Xem chi tiết thông tin một địa điểm du lịch' })
  getPlaceById(@Param('id') id: string) {
    const place = this.portalService.getPlaceById(id);
    if (!place) {
      throw new NotFoundException(`Không tìm thấy địa điểm với mã ${id}`);
    }
    return place;
  }

  @Get('collections')
  @ApiOperation({ summary: 'Lấy các bộ sưu tập khám phá Huế đặc sắc' })
  getCollections() {
    return this.portalService.getCollections();
  }

  @Get('museum')
  @ApiOperation({ summary: 'Danh sách 10 Cổ vật Hoàng cung triều Nguyễn (mô hình 3D WebGL GLB)' })
  getMuseum() {
    return this.portalService.getMuseumArtifacts();
  }

  @Get('guides')
  @ApiOperation({ summary: 'Cẩm nang du lịch Cố Đô Huế theo mùa và kinh nghiệm' })
  getGuides() {
    return this.portalService.getTravelGuides();
  }

  @Get('essentials')
  @ApiOperation({ summary: 'Danh bạ đường dây nóng khẩn cấp và thông tin y tế, cứu nạn tại Huế' })
  getEssentials() {
    return this.portalService.getEssentials();
  }

  @Get('map-points')
  @ApiOperation({ summary: 'Tọa độ GPS rút gọn toàn bộ địa điểm hiển thị trên bản đồ số' })
  @ApiQuery({ name: 'vertical', required: false })
  getMapPoints(@Query('vertical') vertical?: string) {
    return this.portalService.getMapPoints(vertical);
  }

  @Get('heritage-sites')
  @ApiOperation({ summary: 'Top 30 di tích di sản Huế UNESCO được bảo tồn đặc biệt' })
  getHeritageSites() {
    return this.portalService.getHeritageSites();
  }

  @Get('nearby')
  @ApiOperation({ summary: 'Tìm kiếm địa điểm lân cận theo tọa độ GPS và bán kính' })
  @ApiQuery({ name: 'lat', required: true, type: Number })
  @ApiQuery({ name: 'lng', required: true, type: Number })
  @ApiQuery({ name: 'radius', required: false, type: Number, description: 'Bán kính tính theo km (mặc định 5km)' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  getNearby(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('radius') radius?: number,
    @Query('limit') limit?: number,
  ) {
    return this.portalService.getNearby(
      Number(lat) || 16.4637,
      Number(lng) || 107.5909,
      Number(radius) || 5,
      Number(limit) || 30,
    );
  }
}
