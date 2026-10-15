import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ItineraryService } from './itinerary.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateItineraryDto } from './dto/create-itinerary.dto';
import { UpdateStopsDto } from './dto/update-stops.dto';
import { OptimizeDto } from './dto/optimize.dto';

@ApiTags('Itinerary (Lộ Trình)')
@Controller('itinerary')
export class ItineraryController {
  constructor(private readonly itineraryService: ItineraryService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Tạo lộ trình mới' })
  async createItinerary(@Request() req, @Body() dto: CreateItineraryDto) {
    return this.itineraryService.createItinerary(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Liệt kê lộ trình của tôi' })
  async getMyItineraries(@Request() req) {
    return this.itineraryService.getMyItineraries(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Xem chi tiết lộ trình' })
  async getItinerary(@Request() req, @Param('id') id: string) {
    return this.itineraryService.getItinerary(req.user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id/stops')
  @ApiOperation({ summary: 'Cập nhật danh sách điểm đến (thêm, xóa, đổi thứ tự)' })
  async updateStops(@Request() req, @Param('id') id: string, @Body() dto: UpdateStopsDto) {
    return this.itineraryService.updateStops(req.user.id, id, dto.placeIds);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Xóa lộ trình' })
  async deleteItinerary(@Request() req, @Param('id') id: string) {
    return this.itineraryService.deleteItinerary(req.user.id, id);
  }

  @Post('optimize')
  @ApiOperation({ summary: 'Tối ưu thứ tự theo Nearest Neighbor + 2-Opt' })
  async optimizeRoute(@Body() dto: OptimizeDto) {
    return this.itineraryService.optimizeRoute(dto.placeIds, dto.startLat, dto.startLng);
  }

  @Get(':id/weather-suggestions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Gợi ý đổi điểm dựa theo thời tiết' })
  async getWeatherSuggestions(@Request() req, @Param('id') id: string) {
    return this.itineraryService.getWeatherSuggestions(req.user.id, id);
  }

  @Put(':id/swap-stop')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Xác nhận thay một điểm bằng điểm gợi ý' })
  async swapStop(@Request() req, @Param('id') id: string, @Body() body: { oldPlaceId: string, newPlaceId: string }) {
    if (!body.oldPlaceId || !body.newPlaceId) throw new BadRequestException('oldPlaceId and newPlaceId are required');
    return this.itineraryService.swapStop(req.user.id, id, body.oldPlaceId, body.newPlaceId);
  }
}
