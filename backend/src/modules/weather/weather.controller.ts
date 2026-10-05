import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WeatherService } from './weather.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Smart Weather')
@Controller('api/v1/weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  // Thời tiết là dữ liệu công khai, khách xem trước không cần token.
  @Public()
  @Get('hue-current')
  @ApiOperation({ summary: 'Lấy thời tiết thực tế tại Thành phố Huế & Khuyến nghị thông minh' })
  @ApiResponse({ status: 200, description: 'Lấy thời tiết thành công.' })
  async getCurrentHueWeather() {
    return await this.weatherService.getCurrentHueWeather();
  }
}
