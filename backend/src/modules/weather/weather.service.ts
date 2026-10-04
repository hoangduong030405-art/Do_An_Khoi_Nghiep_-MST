import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

export interface WeatherCondition {
  condition: string;
  description: string;
  tempCelsius: number;
  isRaining: boolean;
  isExtremelyHot: boolean; // > 37 độ C
  humidity: number;
  recommendation: string;
}

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);

  // Tọa độ trung tâm Thành phố Huế
  private readonly HUE_LAT = 16.4673;
  private readonly HUE_LNG = 107.5905;

  async getCurrentHueWeather(): Promise<WeatherCondition> {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey || apiKey === 'your_openweather_api_key_here') {
      // Dữ liệu mô phỏng thời tiết mưa đặc trưng Huế khi chưa có API Key
      return {
        condition: 'Rain',
        description: 'Mưa ngâu xứ Huế, tiết trời se lạnh dịu dàng',
        tempCelsius: 24.5,
        isRaining: true,
        isExtremelyHot: false,
        humidity: 88,
        recommendation: 'Trời đang có mưa Huế. Nên ưu tiên ghé thăm các điểm trong nhà, bảo tàng cổ vật và thưởng trà.',
      };
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.HUE_LAT}&lon=${this.HUE_LNG}&appid=${apiKey}&units=metric&lang=vi`;
      const response = await axios.get(url);
      const data = response.data;

      const mainCondition = data.weather[0].main;
      const isRaining = mainCondition.toLowerCase().includes('rain') || mainCondition.toLowerCase().includes('drizzle');
      const tempCelsius = data.main.temp;
      const isExtremelyHot = tempCelsius >= 37;

      let recommendation = 'Thời tiết thuận lợi cho các hoạt động tham quan ngoài trời.';
      if (isRaining) {
        recommendation = 'Trời đang mưa Huế. Khuyến nghị chuyển sang các địa điểm tham quan trong nhà hoặc thưởng trà cung đình.';
      } else if (isExtremelyHot) {
        recommendation = 'Trời nắng gắt. Khuyến nghị tránh hoạt động ngoài trời lúc giữa trưa, ưu tiên di chuyển bằng xe điện hoặc nghỉ chân tại các nhà vườn có bóng râm.';
      }

      return {
        condition: mainCondition,
        description: data.weather[0].description,
        tempCelsius: Math.round(tempCelsius * 10) / 10,
        isRaining,
        isExtremelyHot,
        humidity: data.main.humidity,
        recommendation,
      };
    } catch (error) {
      this.logger.warn(`Không thể lấy thời tiết từ OpenWeatherMap: ${error.message}. Sử dụng dữ liệu fallback.`);
      return {
        condition: 'Clouds',
        description: 'Mây rải rác, khí hậu mát mẻ',
        tempCelsius: 26.0,
        isRaining: false,
        isExtremelyHot: false,
        humidity: 75,
        recommendation: 'Thời tiết mát mẻ, rất lý tưởng để đạp xe xanh quanh bờ sông Hương và Đại Nội.',
      };
    }
  }
}
