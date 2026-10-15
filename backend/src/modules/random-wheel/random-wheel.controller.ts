import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RandomWheelService } from './random-wheel.service';
import { SpinWheelDto } from './dto/spin-wheel.dto';

@ApiTags('Random Wheel – Vòng Quay Quyết Định Điểm Đến')
@Controller('random-wheel')
export class RandomWheelController {
  constructor(private readonly wheelService: RandomWheelService) {}

  @Get('filters')
  @ApiOperation({ summary: 'Lấy danh sách các bộ lọc & tiêu chí nhanh cho Vòng Quay' })
  async getFilters() {
    return this.wheelService.getWheelFilters();
  }

  @Get('spin')
  @ApiOperation({ summary: 'Kích hoạt quay vòng quay ngẫu nhiên theo danh mục hoặc tiêu chí' })
  @ApiResponse({ status: 200, description: 'Trả về danh sách nan quạt, góc quay và kết quả chiến thắng' })
  async spin(@Query() dto: SpinWheelDto) {
    return this.wheelService.spinWheel(dto);
  }
}
