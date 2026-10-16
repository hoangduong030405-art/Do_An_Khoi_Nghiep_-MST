import { Controller, Get, Param, Post, ForbiddenException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GamificationService } from './gamification.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Gamification & Green Points')
@Controller('gamification')
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  @Get('me')
  @ApiOperation({ summary: 'Lấy hồ sơ Green Points, huy hiệu và tiến độ hành trình của chính mình' })
  async getMyProfile(@CurrentUser() user: any) {
    return await this.gamificationService.getUserGamificationProfile(user.id);
  }

  @Get('profile/:userId')
  @ApiOperation({ summary: 'Lấy hồ sơ Green Points, huy hiệu và tiến độ hành trình' })
  async getProfile(@CurrentUser() user: any, @Param('userId') userId: string) {
    if (user.id !== userId) {
      throw new ForbiddenException('Bạn không có quyền xem hồ sơ của người khác');
    }
    return await this.gamificationService.getUserGamificationProfile(userId);
  }

  @Post('certificate/:userId')
  @ApiOperation({ summary: 'Xuất Chứng nhận điện tử (E-Certificate) khi đạt mốc' })
  async createCertificate(@CurrentUser() user: any, @Param('userId') userId: string) {
    if (user.id !== userId) {
      throw new ForbiddenException('Bạn không có quyền tạo chứng nhận cho người khác');
    }
    return await this.gamificationService.generateCertificate(userId);
  }

  @Public()
  @Get('verify/:code')
  @ApiOperation({ summary: 'Tra cứu và xác thực tính hợp lệ của Chứng nhận E-Certificate' })
  async verifyCertificate(@Param('code') code: string) {
    return await this.gamificationService.verifyCertificate(code);
  }
}
