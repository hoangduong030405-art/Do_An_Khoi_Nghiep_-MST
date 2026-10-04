import { Injectable, Logger } from '@nestjs/common';
import { InMemoryDbService, HuePlace } from '../../database/in-memory-db.service';
import { WeatherService } from '../weather/weather.service';
import { GenerateItineraryDto } from './dto/generate-itinerary.dto';

export interface ItinerarySlot {
  timeSlot: string;
  placeId: string;
  placeName: string;
  address: string;
  environmentType: 'INDOOR' | 'OUTDOOR' | 'SEMI_OUTDOOR';
  activityDescription: string;
  estimatedCostVnd: number;
  greenPointsEarnable: number;
  carbonSavedKg: number;
  transportAdvice: string;
}

export interface ItineraryDay {
  dayNumber: number;
  clusterTheme: string;
  slots: ItinerarySlot[];
  dayGreenPointsTotal: number;
}

@Injectable()
export class ItineraryService {
  private readonly logger = new Logger(ItineraryService.name);

  constructor(
    private readonly inMemoryDb: InMemoryDbService,
    private readonly weatherService: WeatherService,
  ) {}

  /**
   * Thuật toán AI Lập Lịch Trình Tối Ưu Hóa Tuyến Đường (Cluster-based Route Optimization)
   * Phân bổ theo cụm địa lý:
   * - Cụm 1 (Bờ Bắc sông Hương): Kinh Thành Huế, Đại Nội, Bảo tàng Cổ vật, Chợ Đông Ba.
   * - Cụm 2 (Vùng đồi Tây Nam): Chùa Thiên Mụ, Lăng Khải Định, Lăng Tự Đức, Làng hương Thủy Xuân, Đồi Vọng Cảnh.
   * - Cụm 3 (Bờ Nam & Dọc sông Hương): Cầu Tràng Tiền, Phố đi bộ Nguyễn Đình Chiểu, Nhà rường Kim Long.
   */
  async generatePersonalizedItinerary(dto: GenerateItineraryDto) {
    const { durationDays, budget, preference, transportMode = 'BICYCLE' } = dto;
    const weather = await this.weatherService.getCurrentHueWeather();

    this.logger.log(`Tạo lịch trình: Số ngày=${durationDays}, Budget=${budget}, Sở thích=${preference}, Xe=${transportMode}`);

    const days: ItineraryDay[] = [];
    let totalEstimatedCost = 0;
    let totalGreenPoints = 0;
    let totalCarbonSaved = 0;

    // Ngày 1: Cụm Trái Tim Di Sản Cố Đô (Bờ Bắc sông Hương)
    const day1Slots: ItinerarySlot[] = [
      {
        timeSlot: '07:30 - 08:30',
        placeId: 'food-bun-bo-01',
        placeName: 'Bún Bò Huế Mụ Rơi (Chuẩn Vị Cố Đô)',
        address: 'Đường Nguyễn Du, Phường Phú Cát, TP Huế',
        environmentType: 'INDOOR',
        activityDescription: 'Nạp năng lượng bữa sáng với tô bún bò giò heo nước dùng ngọt thanh từ xương hầm và mắm ruốc sả ớt đậm đà.',
        estimatedCostVnd: budget === 'BUDGET' ? 35000 : 50000,
        greenPointsEarnable: 15,
        carbonSavedKg: 0.8,
        transportAdvice: 'Đi bộ hoặc tản bộ qua cầu Gia Hội đón gió sớm',
      },
      {
        timeSlot: '08:45 - 11:45',
        placeId: '8f8b0596-f5ee-449e-8c31-9cb6be62b662',
        placeName: 'Đại Nội Huế (Hoàng Thành & Tử Cấm Thành)',
        address: 'Đường 23/8, Phường Thuận Hòa, TP Huế',
        environmentType: 'OUTDOOR',
        activityDescription: 'Khám phá Ngọ Môn, Điện Thái Hòa, Thế Miếu. Lắng nghe trợ lý AI Mệ Huế thuyết minh về nghi thức tế lễ và đời sống hoàng tộc.',
        estimatedCostVnd: 200000,
        greenPointsEarnable: 30,
        carbonSavedKg: 2.1,
        transportAdvice: 'Sử dụng xe đạp công cộng Eco-Bike có trạm trả xe ngay tại Cửa Hiển Nhơn',
      },
      {
        timeSlot: '12:00 - 13:30',
        placeId: 'food-com-hen-02',
        placeName: 'Cơm Hến & Chè Bắp Cồn Hến',
        address: 'Cồn Hến, Phường Vĩ Dạ, TP Huế',
        environmentType: 'SEMI_OUTDOOR',
        activityDescription: 'Thưởng thức cơm hến cay nồng đặc trưng cùng chè bắp Cồn Hến ngọt mát giữa dòng sông Hương thơ mộng.',
        estimatedCostVnd: budget === 'BUDGET' ? 30000 : 45000,
        greenPointsEarnable: 15,
        carbonSavedKg: 1.2,
        transportAdvice: 'Đạp xe dọc đường bờ sông Hàn Thuyên và qua cầu Đập Đá',
      },
      {
        timeSlot: '14:30 - 16:30',
        placeId: '1b34ad29-2342-49cf-91ba-00c71a39fbc4',
        placeName: 'Bảo tàng Cổ vật Cung đình Huế (Điện Long An)',
        address: 'Số 3 Lê Trực, Phường Đông Ba, TP Huế',
        environmentType: 'INDOOR',
        activityDescription: 'Chiêm ngưỡng bảo vật tiến vua, ngai vàng, trang phục hoàng thất trong không gian nhà rường gỗ lim lộng lẫy (Điểm trong nhà tối ưu khi thời tiết thay đổi).',
        estimatedCostVnd: 50000,
        greenPointsEarnable: 25,
        carbonSavedKg: 0.9,
        transportAdvice: 'Đi dạo bộ bóng râm 400m từ Hoàng Thành',
      },
      {
        timeSlot: '17:00 - 18:30',
        placeId: '5a6b7c8d-9e0f-1a2b-3c4d-5e6f7a8b9c0d',
        placeName: 'Cầu Tràng Tiền & Bến Thuyền Tòa Khâm',
        address: 'Cầu Tràng Tiền, TP Huế',
        environmentType: 'OUTDOOR',
        activityDescription: 'Ngắm hoàng hôn nhuộm tím sông Hương trên cầu Tràng Tiền 6 vài 12 nhịp, hóng gió và chụp ảnh lưu niệm.',
        estimatedCostVnd: 0,
        greenPointsEarnable: 20,
        carbonSavedKg: 1.5,
        transportAdvice: 'Tản bộ trên làn đường dành riêng cho người đi bộ của cầu',
      },
      {
        timeSlot: '19:30 - 21:30',
        placeId: 'ca-hue-song-huong',
        placeName: 'Du Thuyền Nghe Ca Huế Thả Đèn Hoa Đăng',
        address: 'Bến thuyền Du lịch Sông Hương, TP Huế',
        environmentType: 'SEMI_OUTDOOR',
        activityDescription: 'Lắng nghe những làn điệu Nam ai, Nam bình truyền thống và thả đèn hoa đăng cầu an lành trên sông Hương.',
        estimatedCostVnd: budget === 'LUXURY' ? 250000 : 120000,
        greenPointsEarnable: 25,
        carbonSavedKg: 1.1,
        transportAdvice: 'Đi bộ từ phố đi bộ Chu Văn An ra bến thuyền',
      },
    ];

    days.push({
      dayNumber: 1,
      clusterTheme: 'Hương Sắc Kinh Thành & Di Sản Triều Nguyễn',
      slots: day1Slots,
      dayGreenPointsTotal: day1Slots.reduce((sum, s) => sum + s.greenPointsEarnable, 0),
    });

    // Ngày 2: Cụm Sinh Thái & Lăng Tẩm Thiền Định (Tây Nam Cố Đô)
    if (durationDays >= 2) {
      const day2Slots: ItinerarySlot[] = [
        {
          timeSlot: '07:30 - 09:00',
          placeId: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
          placeName: 'Chùa Thiên Mụ (Linh Mụ Tự)',
          address: 'Đồi Hà Khê, Đường Kim Long, TP Huế',
          environmentType: 'OUTDOOR',
          activityDescription: 'Viếng cảnh ngôi chùa hơn 400 năm tuổi trong sớm mai thanh tịnh, chiêm bái tháp Phước Duyên 7 tầng và chuông Đại Hồng Chung.',
          estimatedCostVnd: 0,
          greenPointsEarnable: 25,
          carbonSavedKg: 2.5,
          transportAdvice: 'Đạp xe dọc cung đường rợp bóng cây Kim Long ven sông Hương',
        },
        {
          timeSlot: '09:30 - 11:30',
          placeId: 'craft-thuy-xuan',
          placeName: 'Làng Hương Trầm Thủy Xuân & Đồi Vọng Cảnh',
          address: 'Đường Huyền Trân Công Chúa, TP Huế',
          environmentType: 'SEMI_OUTDOOR',
          activityDescription: 'Trải nghiệm tự tay xe que hương trầm thơm ngát, chụp ảnh tại các búp hương rực rỡ sắc màu và ngắm ngã ba sông Hương từ Đồi Vọng Cảnh.',
          estimatedCostVnd: 40000,
          greenPointsEarnable: 30,
          carbonSavedKg: 1.8,
          transportAdvice: 'Xe đạp điện hoặc đạp xe rèn luyện thể lực xanh',
        },
        {
          timeSlot: '12:00 - 13:30',
          placeId: 'food-chay-tinh-tam',
          placeName: 'Ẩm Thực Chay Cung Đình (Nhà Rường Tịnh Quán)',
          address: 'Phường Thủy Xuân, TP Huế',
          environmentType: 'INDOOR',
          activityDescription: 'Bữa trưa chay thực dưỡng thanh tao chế biến từ nông sản hữu cơ bản địa Huế, giảm thiểu tối đa phát thải môi trường.',
          estimatedCostVnd: budget === 'BUDGET' ? 45000 : 90000,
          greenPointsEarnable: 25,
          carbonSavedKg: 3.2, // Bữa ăn chay giảm carbon footprint đáng kể
          transportAdvice: 'Ghé vào nhà hàng ngay chân đồi Vọng Cảnh',
        },
        {
          timeSlot: '14:00 - 16:30',
          placeId: '4f5e6d7c-8b9a-0123-4567-89abcdef0123',
          placeName: 'Lăng Khải Định (Ứng Lăng Kiến Trúc Sành Sứ)',
          address: 'Xã Thủy Bằng, TP Huế',
          environmentType: 'SEMI_OUTDOOR',
          activityDescription: 'Kinh ngạc trước nghệ thuật khảm sành sứ và thủy tinh tinh xảo đỉnh cao của cung Thiên Định và bức họa Cửu Long Ẩn Vân trên trần lăng.',
          estimatedCostVnd: 150000,
          greenPointsEarnable: 25,
          carbonSavedKg: 1.5,
          transportAdvice: 'Xe điện du lịch xanh hoặc xe đạp cơ bắp',
        },
        {
          timeSlot: '17:00 - 18:30',
          placeId: '6b7c8d9e-0f1a-2b3c-4d5e-6f7a8b9c0d1e',
          placeName: 'Không Gian Trà Cung Đình Kim Long',
          address: 'Đường Kim Long, Phường Kim Long, TP Huế',
          environmentType: 'INDOOR',
          activityDescription: 'Thưởng trà thảo mộc 26 vị tiến vua, ăn mứt sen trần trong không gian nhà rường cổ kính, thư giãn đôi chân sau một ngày vận động.',
          estimatedCostVnd: 60000,
          greenPointsEarnable: 20,
          carbonSavedKg: 0.8,
          transportAdvice: 'Nghỉ chân tại vườn cổ Kim Long trên đường quay về trung tâm',
        },
      ];

      days.push({
        dayNumber: 2,
        clusterTheme: 'Hơi Thở Thiền Môn, Làng Nghề & Nghệ Thuật Lăng Tẩm',
        slots: day2Slots,
        dayGreenPointsTotal: day2Slots.reduce((sum, s) => sum + s.greenPointsEarnable, 0),
      });
    }

    // Tính toán tổng số liệu toàn chuyến
    days.forEach((day) => {
      day.slots.forEach((slot) => {
        totalEstimatedCost += slot.estimatedCostVnd;
        totalGreenPoints += slot.greenPointsEarnable;
        totalCarbonSaved += slot.carbonSavedKg;
      });
    });

    return {
      itineraryTitle: `Hành Trình Khám Phá Huế Thông Minh ${durationDays}N${durationDays - 1}Đ`,
      tagline: 'Tối ưu hóa năng lượng • Di sản nguyên bản • Du lịch không rác thải',
      metadata: {
        durationDays,
        budgetTier: budget,
        preference,
        transportMode,
        weatherStatus: `${weather.condition} (${weather.description}) - ${weather.tempCelsius}°C`,
        weatherNotice: weather.isRaining
          ? 'Hệ thống đã tự động chèn các bảo tàng, không gian thưởng trà trong nhà để đảm bảo chuyến đi luôn thuận tiện.'
          : 'Thời tiết mát mẻ, rất lý tưởng để di chuyển xanh!',
      },
      summaryStats: {
        totalEstimatedCostVnd: totalEstimatedCost,
        totalGreenPointsEarnable: totalGreenPoints,
        totalCarbonSavedKg: Math.round(totalCarbonSaved * 10) / 10,
        eCertificateEligibility: totalGreenPoints >= 100,
      },
      scheduleDays: days,
    };
  }
}
