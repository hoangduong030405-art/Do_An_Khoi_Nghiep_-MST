import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import axios from 'axios';
import { createClient } from 'redis';

export interface WeatherCondition {
  condition: string;
  description: string;
  tempCelsius: number;
  isRaining: boolean;
  isExtremelyHot: boolean; // > 37 độ C
  humidity: number;
  recommendation: string;
  source?: 'live' | 'cache' | 'stale';
  stale?: boolean;
}

@Injectable()
export class WeatherService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(WeatherService.name);

  // Tọa độ trung tâm Thành phố Huế
  private readonly HUE_LAT = 16.4673;
  private readonly HUE_LNG = 107.5905;

  private memoryCache: Map<string, { data: WeatherCondition, updatedAt: number }> = new Map();
  private redisClient: any;
  private isRedisConnected = false;

  async onModuleInit() {
    try {
      this.redisClient = createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379'
      });
      
      this.redisClient.on('error', (err) => {
        this.logger.warn(`Lỗi kết nối Redis: ${err.message}. Chuyển sang In-Memory Cache.`);
        this.isRedisConnected = false;
      });

      this.redisClient.on('ready', () => {
        this.logger.log('Đã kết nối thành công tới Redis cho Weather Cache.');
        this.isRedisConnected = true;
      });

      await this.redisClient.connect();
    } catch (e) {
      this.logger.warn(`Không thể khởi tạo Redis: ${e.message}. Sử dụng In-Memory Cache.`);
      this.isRedisConnected = false;
    }
  }

  async onModuleDestroy() {
    if (this.isRedisConnected && this.redisClient) {
      await this.redisClient.quit();
    }
  }

  private async getCache(key: string): Promise<{ data: WeatherCondition, updatedAt: number } | null> {
    if (this.isRedisConnected) {
      try {
        const val = await this.redisClient.get(key);
        if (val) return JSON.parse(val);
      } catch (e) {
        this.logger.error(`Lỗi đọc Redis cache: ${e.message}`);
      }
    }
    return this.memoryCache.get(key) || null;
  }

  private async setCache(key: string, data: WeatherCondition, updatedAt: number) {
    const payload = { data, updatedAt };
    if (this.isRedisConnected) {
      try {
        await this.redisClient.set(key, JSON.stringify(payload)); // Not setting TTL to allow stale fallback
      } catch (e) {
        this.logger.error(`Lỗi ghi Redis cache: ${e.message}`);
      }
    }
    this.memoryCache.set(key, payload);
  }

  async getCurrentHueWeather(): Promise<WeatherCondition> {
    return this.getWeatherByLocation(this.HUE_LAT, this.HUE_LNG);
  }

  async getWeatherByLocation(lat: number, lng: number): Promise<WeatherCondition> {
    const roundedLat = Math.round(lat * 100) / 100;
    const roundedLng = Math.round(lng * 100) / 100;
    const cacheKey = `weather_${roundedLat}_${roundedLng}`;

    const cached = await this.getCache(cacheKey);
    const now = Date.now();
    const TTL = 20 * 60 * 1000; // 20 phút

    // Nếu cache còn hạn
    if (cached && now - cached.updatedAt < TTL) {
      return { ...cached.data, source: 'cache' };
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    const isKeyMissing = !apiKey || apiKey === 'your_openweather_api_key_here';

    let newData: WeatherCondition | null = null;

    if (!isKeyMissing) {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${roundedLat}&lon=${roundedLng}&appid=${apiKey}&units=metric&lang=vi`;
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

        newData = {
          condition: mainCondition,
          description: data.weather[0].description,
          tempCelsius: Math.round(tempCelsius * 10) / 10,
          isRaining,
          isExtremelyHot,
          humidity: data.main.humidity,
          recommendation,
        };
      } catch (error) {
        this.logger.warn(`Lỗi lấy thời tiết live: ${error.message}`);
      }
    } else {
      this.logger.warn(`Thiếu API Key OpenWeatherMap. Không thể lấy dữ liệu live.`);
    }

    if (newData) {
      await this.setCache(cacheKey, newData, now);
      return { ...newData, source: 'live' };
    }

    // Fallback: nếu lỗi hoặc thiếu khóa
    if (cached) {
      return { ...cached.data, source: 'stale', stale: true };
    }

    // Không có cache, báo "không rõ"
    return {
      condition: 'Unknown',
      description: 'Trạng thái không rõ',
      tempCelsius: 0,
      isRaining: false,
      isExtremelyHot: false,
      humidity: 0,
      recommendation: 'Không thể lấy thông tin thời tiết lúc này.',
      source: 'stale',
      stale: true,
    };
  }
}
