import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Request,
  Response,
  Req,
  Ip,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Response as ExpressResponse, Request as ExpressRequest } from 'express';
import { ItineraryService } from './itinerary.service';
import { Public } from '../auth/decorators/public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CloudflareThrottlerGuard } from '../../common/guards/cloudflare-throttler.guard';

@ApiTags('Shared Itinerary (Lộ Trình Công Khai)')
@Controller('shared')
export class SharedItineraryController {
  constructor(private readonly itineraryService: ItineraryService) {}

  @Public()
  @UseGuards(CloudflareThrottlerGuard)
  @Get(':token')
  @ApiOperation({ summary: 'Xem dữ liệu lộ trình công khai theo token (không cần đăng nhập)' })
  async getShared(
    @Param('token') token: string,
    @Req() req: ExpressRequest,
    @Response({ passthrough: true }) res: ExpressResponse,
    @Ip() ip: string,
  ) {
    // Tiêu đề bảo mật bắt buộc
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');

    const clientIp = (req.headers['cf-connecting-ip'] as string) ||
      (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
      ip ||
      req.ip ||
      '127.0.0.1';

    return this.itineraryService.getSharedItinerary(token, clientIp);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':token/copy')
  @ApiOperation({ summary: 'Lưu bản sao lộ trình được chia sẻ vào tài khoản của tôi' })
  async copyShared(@Request() req, @Param('token') token: string) {
    return this.itineraryService.copySharedItinerary(req.user.id, token);
  }
}
