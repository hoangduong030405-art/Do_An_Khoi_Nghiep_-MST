import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { CloudflareThrottlerGuard } from '../../common/guards/cloudflare-throttler.guard';
import { Response } from 'express';
import { AiAssistantService } from './ai-assistant.service';
import { AskGuideDto, AdaptItineraryDto, ExplainPlaceStoryDto } from './dto/ai-requests.dto';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('AI Tour Guide (Mệ Huế)')
@Controller('ai-guide')
export class AiAssistantController {
  constructor(private readonly aiAssistantService: AiAssistantService) {}

  @Get('tts')
  @Public()
  @ApiOperation({
    summary: 'Phát trực tiếp luồng âm thanh giọng đọc tiếng Việt chuẩn (Vietnamese TTS Audio Stream)',
  })
  async streamTts(
    @Query('text') text: string,
    @Query('lang') lang: string,
    @Res() res: Response,
  ) {
    const audioBuffer = await this.aiAssistantService.generateTtsAudio(text, lang || 'vi');
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', audioBuffer.length);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.end(audioBuffer);
  }

  @Post('chat')
  @ApiBearerAuth()
  @UseGuards(CloudflareThrottlerGuard)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({
    summary: 'Trò chuyện hỏi đáp về văn hóa, lịch sử, ẩm thực với Hướng dẫn viên Mệ Huế (Yêu cầu JWT & Rate Limit)',
  })
  @ApiResponse({ status: 200, description: 'Phản hồi thành công từ Trợ lý AI.' })
  async chat(@Body() dto: AskGuideDto, @Req() req: any) {
    const userId = req.user?.id || req.user?.userId || req.headers['x-user-id'] || 'anonymous';
    return await this.aiAssistantService.chatWithGuide(dto, userId);
  }

  @Post('place-story')
  @Public()
  @ApiOperation({
    summary: 'Thuyết minh và kể chuyện văn hóa địa điểm nổi bật Cố Đô (Audio Narrative & Lore)',
  })
  @ApiResponse({ status: 200, description: 'Trả về kịch bản audio, câu chuyện lịch sử bí ẩn và món ăn ghép đôi.' })
  async explainPlaceStory(@Body() dto: ExplainPlaceStoryDto) {
    return await this.aiAssistantService.narratePlaceStory(dto);
  }

  @Post('adapt-itinerary')
  @Public()
  @ApiOperation({
    summary: 'Tự động điều chỉnh lịch trình thông minh theo thời tiết Huế thời gian thực',
  })
  @ApiResponse({ status: 200, description: 'Đã tối ưu hóa lịch trình.' })
  async adaptItinerary(@Body() dto: AdaptItineraryDto) {
    return await this.aiAssistantService.adaptItineraryByWeather(dto);
  }
}
