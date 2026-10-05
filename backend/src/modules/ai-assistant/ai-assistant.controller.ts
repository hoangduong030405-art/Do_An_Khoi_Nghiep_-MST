import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AiAssistantService } from './ai-assistant.service';
import { AskGuideDto, AdaptItineraryDto, ExplainPlaceStoryDto } from './dto/ai-requests.dto';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('AI Tour Guide (Mệ Huế)')
@Controller('api/v1/ai-guide')
export class AiAssistantController {
  constructor(private readonly aiAssistantService: AiAssistantService) {}

  // TODO(phase4): Khi có rate limit theo user, chuyển sang bắt buộc token.
  // Hiện @Public() để app Flutter gọi được; endpoint này tốn khoản Gemini API key.
  @Public()
  @Post('chat')
  @ApiOperation({
    summary: 'Trò chuyện hỏi đáp về văn hóa, lịch sử, ẩm thực với Hướng dẫn viên Mệ Huế',
  })
  @ApiResponse({ status: 200, description: 'Phản hồi thành công từ Trợ lý AI.' })
  async chat(@Body() dto: AskGuideDto) {
    return await this.aiAssistantService.chatWithGuide(dto);
  }

  @Post('place-story')
  @ApiOperation({
    summary: 'Thuyết minh và kể chuyện văn hóa địa điểm nổi bật Cố Đô (Audio Narrative & Lore)',
  })
  @ApiResponse({ status: 200, description: 'Trả về kịch bản audio, câu chuyện lịch sử bí ẩn và món ăn ghép đôi.' })
  async explainPlaceStory(@Body() dto: ExplainPlaceStoryDto) {
    return await this.aiAssistantService.narratePlaceStory(dto);
  }

  @Post('adapt-itinerary')
  @ApiOperation({
    summary: 'Tự động điều chỉnh lịch trình thông minh theo thời tiết Huế thời gian thực',
  })
  @ApiResponse({ status: 200, description: 'Đã tối ưu hóa lịch trình.' })
  async adaptItinerary(@Body() dto: AdaptItineraryDto) {
    return await this.aiAssistantService.adaptItineraryByWeather(dto);
  }
}
