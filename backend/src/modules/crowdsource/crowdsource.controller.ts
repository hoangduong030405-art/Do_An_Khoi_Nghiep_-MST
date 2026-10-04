import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CrowdsourceService, SubmitPlaceDto } from './crowdsource.service';

@ApiTags('Crowdsourcing (Đóng góp cộng đồng)')
@Controller('api/v1/crowdsource')
export class CrowdsourceController {
  constructor(private readonly crowdsourceService: CrowdsourceService) {}

  @Post('submit')
  @ApiOperation({ summary: 'Người dùng/người dân gửi đề xuất địa điểm, quán ăn Huế mới' })
  async submit(@Body() dto: SubmitPlaceDto) {
    return await this.crowdsourceService.submitContribution(dto);
  }

  @Get('pending')
  @ApiOperation({ summary: 'Admin xem hàng đợi các đề xuất địa danh chờ duyệt' })
  async getPending() {
    return await this.crowdsourceService.getPendingSubmissions();
  }
}
