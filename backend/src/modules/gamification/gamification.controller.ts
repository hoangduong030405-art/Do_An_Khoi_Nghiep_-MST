import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GamificationService } from './gamification.service';

@ApiTags('Gamification & Green Points')
@Controller('api/v1/gamification')
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  @Get('profile/:userId')
  @ApiOperation({ summary: 'Lấy hồ sơ Green Points, huy hiệu và tiến độ hành trình' })
  async getProfile(@Param('userId') userId: string) {
    return await this.gamificationService.getUserGamificationProfile(userId);
  }

  @Post('certificate/:userId')
  @ApiOperation({ summary: 'Xuất Chứng nhận điện tử (E-Certificate) khi đạt mốc' })
  async createCertificate(@Param('userId') userId: string) {
    return await this.gamificationService.generateCertificate(userId);
  }
}
