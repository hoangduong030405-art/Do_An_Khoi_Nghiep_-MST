import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { CrowdsourceService, SubmitPlaceDto } from './crowdsource.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/entities/user.entity';

@ApiTags('Crowdsourcing (Đóng góp cộng đồng)')
@Controller('crowdsource')
export class CrowdsourceController {
  constructor(private readonly crowdsourceService: CrowdsourceService) {}

  @Post('submit')
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({ summary: 'Người dùng/người dân gửi đề xuất địa điểm, quán ăn Huế mới' })
  async submit(@Body() dto: SubmitPlaceDto) {
    return await this.crowdsourceService.submitContribution(dto);
  }

  @Get('pending')
  @ApiOperation({ summary: 'Admin xem hàng đợi các đề xuất địa danh chờ duyệt' })
  async getPending() {
    return await this.crowdsourceService.getPendingSubmissions();
  }

  @Post(':id/approve')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Admin duyệt đề xuất và cộng điểm thưởng xanh cho du khách' })
  async approve(@Param('id') id: string, @Body('pointsAwarded') pointsAwarded?: number) {
    return await this.crowdsourceService.approveSubmission(id, pointsAwarded);
  }

  @Post(':id/reject')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Admin từ chối đề xuất' })
  async reject(@Param('id') id: string, @Body('reason') reason?: string) {
    return await this.crowdsourceService.rejectSubmission(id, reason);
  }
}
