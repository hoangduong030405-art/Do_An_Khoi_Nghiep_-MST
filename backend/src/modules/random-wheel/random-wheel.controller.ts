import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RandomWheelService } from './random-wheel.service';
import { SpinWheelDto } from './dto/spin-wheel.dto';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Random Wheel – Vòng Quay Quyết Định Điểm Đến')
@Controller('random-wheel')
@Public()
export class RandomWheelController {
  constructor(private readonly wheelService: RandomWheelService) {}

  @Get('filters')
  @ApiOperation({ summary: 'Lấy danh sách các bộ lọc & tiêu chí nhanh cho Vòng Quay' })
  async getFilters() {
    return this.wheelService.getWheelFilters();
  }

  @Get('candidates')
  @ApiOperation({ summary: 'Lọc các cột mốc bản đồ đưa vào Vòng Quay theo tiêu chí' })
  @ApiResponse({ status: 200, description: 'Danh sách các cột mốc (nan quạt) đã lọc theo yêu cầu' })
  async getCandidates(@Query() dto: SpinWheelDto) {
    return this.wheelService.getWheelCandidates(dto);
  }

  @Get('spin')
  @ApiOperation({ summary: 'Kích hoạt quay vòng quay ngẫu nhiên theo danh mục hoặc tiêu chí (GET)' })
  @ApiResponse({ status: 200, description: 'Trả về danh sách nan quạt, góc quay và kết quả chiến thắng' })
  async spin(@Query() dto: SpinWheelDto) {
    return this.wheelService.spinWheel(dto);
  }

  @Post('spin')
  @ApiOperation({ summary: 'Kích hoạt quay vòng quay ngẫu nhiên từ các cột mốc bản đồ (POST)' })
  @ApiResponse({ status: 200, description: 'Trả về danh sách nan quạt, góc quay và kết quả chiến thắng' })
  async spinPost(@Body() dto: SpinWheelDto) {
    return this.wheelService.spinWheel(dto);
  }
}
