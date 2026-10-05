import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GamificationService } from './gamification.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Gamification & Green Points')
@Controller('api/v1/gamification')
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  // TODO(phase4): Phải bắt buộc token và so sánh userId trong token với :userId.
  // Hiện để @Public() vì app Flutter chưa có màn hình đăng nhập. Đây là nợ bảo mật
  // tạm thời: bất kỳ ai cũng đọc được hồ sơ của user khác theo id.
  @Public()
  @Get('profile/:userId')
  @ApiOperation({ summary: 'Lấy hồ sơ Green Points, huy hiệu và tiến độ hành trình' })
  async getProfile(@Param('userId') userId: string) {
    return await this.gamificationService.getUserGamificationProfile(userId);
  }

  // TODO(phase4): Phải bắt buộc token và so sánh userId trong token với :userId.
  @Public()
  @Post('certificate/:userId')
  @ApiOperation({ summary: 'Xuất Chứng nhận điện tử (E-Certificate) khi đạt mốc' })
  async createCertificate(@Param('userId') userId: string) {
    return await this.gamificationService.generateCertificate(userId);
  }
}
