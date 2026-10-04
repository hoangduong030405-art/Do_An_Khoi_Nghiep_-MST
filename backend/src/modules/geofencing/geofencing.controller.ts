import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GeofencingService } from './geofencing.service';
import { VerifyGpsDto } from './dto/verify-gps.dto';

@ApiTags('Geofencing & GPS Unlock')
@Controller('api/v1/geofencing')
export class GeofencingController {
  constructor(private readonly geofencingService: GeofencingService) {}

  @Post('unlock')
  @ApiOperation({
    summary: 'Kiểm tra tọa độ GPS và mở khóa địa danh (Geofencing 35m)',
    description: 'Tự động kiểm tra khoảng cách PostGIS và cộng Green Points nếu hợp lệ.',
  })
  @ApiResponse({ status: 200, description: 'Kiểm tra thành công.' })
  async verifyAndUnlock(@Body() dto: VerifyGpsDto) {
    return await this.geofencingService.checkAndUnlockMilestone(dto);
  }

  @Post('check-in-itinerary')
  @ApiOperation({
    summary: 'Check-in địa điểm theo Lịch trình & Tự động xuất Chứng nhận khi hoàn thành 100%',
    description: 'Xác thực tọa độ GPS của người dùng với các mốc trong lộ trình, nếu đạt 100% sẽ cấp E-Certificate ngay lập tức.',
  })
  @ApiResponse({ status: 200, description: 'Check-in thành công hoặc hoàn thành toàn bộ lộ trình' })
  async checkInItinerary(@Body() dto: VerifyGpsDto) {
    return await this.geofencingService.checkInItineraryMilestone(dto);
  }

  @Get('unlocked-history/:userId')
  @ApiOperation({ summary: 'Lịch sử các cột mốc đã mở khóa của người dùng' })
  async getHistory(@Param('userId') userId: string) {
    return await this.geofencingService.getUserUnlockedHistory(userId);
  }
}
