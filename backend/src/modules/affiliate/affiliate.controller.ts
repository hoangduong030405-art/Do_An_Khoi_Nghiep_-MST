import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AffiliateService } from './affiliate.service';

@ApiTags('Affiliate Partners (Đối tác Doanh thu)')
@Controller('api/v1/affiliate')
export class AffiliateController {
  constructor(private readonly affiliateService: AffiliateService) {}

  @Get('partners')
  @ApiOperation({ summary: 'Lấy danh sách ưu đãi từ các đối tác lưu trú, ẩm thực, xe đạp xanh' })
  async getPartners() {
    return await this.affiliateService.getPartners();
  }

  @Post('click/:partnerId/:userId')
  @ApiOperation({ summary: 'Ghi nhận lượt click link affiliate và tính hoa hồng' })
  async trackClick(
    @Param('partnerId') partnerId: string,
    @Param('userId') userId: string,
  ) {
    return await this.affiliateService.trackAffiliateClick(partnerId, userId);
  }
}
