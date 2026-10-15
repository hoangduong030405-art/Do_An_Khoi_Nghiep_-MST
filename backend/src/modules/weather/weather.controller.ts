import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WeatherService } from './weather.service';

@ApiTags('Smart Weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('hue-current')
  @ApiOperation({ summary: 'Lấy thời tiết thực tế tại Thành phố Huế & Khuyến nghị thông minh' })
  @ApiResponse({ status: 200, description: 'Lấy thời tiết thành công.' })
  async getCurrentHueWeather() {
    return await this.weatherService.getCurrentHueWeather();
  }
}
