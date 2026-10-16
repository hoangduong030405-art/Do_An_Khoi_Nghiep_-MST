import { Body, Controller, Get, Param, Post, Query, ForbiddenException, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { UserThrottlerGuard } from './guards/user-throttler.guard';
import { GeofencingService } from './geofencing.service';
import { VerifyGpsDto } from './dto/verify-gps.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Geofencing & GPS Unlock')
@Controller('geofencing')
@UseGuards(UserThrottlerGuard)
export class GeofencingController {
  constructor(private readonly geofencingService: GeofencingService) {}

  @Get('nearby')
  @ApiOperation({ summary: 'Lấy danh sách các địa danh quanh tọa độ hiện tại kèm khoảng cách' })
  async getNearby(
    @CurrentUser() user: any,
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('radius') radius?: number,
  ) {
    return await this.geofencingService.getNearbyPlaces(user?.id, Number(lat), Number(lng), radius ? Number(radius) : 1000);
  }

  @Post('unlock')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({
    summary: 'Kiểm tra tọa độ GPS và mở khóa địa danh (Geofencing 35m)',
    description: 'Tự động kiểm tra khoảng cách PostGIS và cộng Green Points nếu hợp lệ.',
  })
  @ApiResponse({ status: 200, description: 'Kiểm tra thành công.' })
  async verifyAndUnlock(@CurrentUser() user: any, @Body() dto: VerifyGpsDto) {
    return await this.geofencingService.checkAndUnlockMilestone(user.id, dto);
  }

  @Post('check-in-itinerary')
  @ApiOperation({
    summary: 'Check-in địa điểm theo Lịch trình & Tự động xuất Chứng nhận khi hoàn thành 100%',
    description: 'Xác thực tọa độ GPS của người dùng với các mốc trong lộ trình, nếu đạt 100% sẽ cấp E-Certificate ngay lập tức.',
  })
  @ApiResponse({ status: 200, description: 'Check-in thành công hoặc hoàn thành toàn bộ lộ trình' })
  async checkInItinerary(@CurrentUser() user: any, @Body() dto: VerifyGpsDto) {
    return await this.geofencingService.checkInItineraryMilestone(user.id, dto);
  }

  @Get('unlocked-history/:userId')
  @ApiOperation({ summary: 'Lịch sử các cột mốc đã mở khóa của người dùng' })
  async getHistory(@CurrentUser() user: any, @Param('userId') userId: string) {
    if (user.id !== userId) {
      throw new ForbiddenException('Bạn không có quyền xem lịch sử của người khác');
    }
    return await this.geofencingService.getUserUnlockedHistory(userId);
  }
}
