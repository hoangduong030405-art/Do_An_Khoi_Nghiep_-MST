import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ItineraryService } from './itinerary.service';
import { GenerateItineraryDto } from './dto/generate-itinerary.dto';

@ApiTags('Itinerary & AI Route Planner (Lập Lịch Trình)')
@Controller('api/v1/itinerary')
export class ItineraryController {
  constructor(private readonly itineraryService: ItineraryService) {}

  @Post('generate')
  @ApiOperation({
    summary: 'Tạo lịch trình khám phá Huế thông minh tối ưu theo thời gian, ngân sách và thời tiết',
    description: 'Tự động gom cụm địa lý theo bờ sông Hương để giảm quãng đường di chuyển và tối đa hóa điểm Du lịch Xanh.',
  })
  @ApiResponse({ status: 200, description: 'Lập lịch trình thành công.' })
  async generate(@Body() dto: GenerateItineraryDto) {
    return await this.itineraryService.generatePersonalizedItinerary(dto);
  }
}
