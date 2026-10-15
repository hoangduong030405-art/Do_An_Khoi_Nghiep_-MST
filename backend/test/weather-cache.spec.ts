import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from '../src/modules/weather/weather.service';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('WeatherService Caching', () => {
  let service: WeatherService;

  beforeEach(async () => {
    // Reset env
    process.env.OPENWEATHER_API_KEY = 'test_key';

    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherService],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
    // Suppress warnings in test output
    jest.spyOn(service['logger'], 'warn').mockImplementation(() => {});
    jest.spyOn(service['logger'], 'error').mockImplementation(() => {});
    
    // We mock redis connect to do nothing
    jest.spyOn(service as any, 'onModuleInit').mockImplementation(async () => {
      (service as any).isRedisConnected = false;
    });

    await service.onModuleInit();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('gọi hai lần liên tiếp chỉ phát sinh một lời gọi API, lần 2 dùng cache', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        weather: [{ main: 'Clear', description: 'Trời quang' }],
        main: { temp: 30.5, humidity: 60 }
      }
    });

    const res1 = await service.getWeatherByLocation(16.47, 107.59);
    expect(res1.source).toBe('live');
    expect(res1.tempCelsius).toBe(30.5);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);

    const res2 = await service.getWeatherByLocation(16.47, 107.59);
    expect(res2.source).toBe('cache');
    expect(res2.tempCelsius).toBe(30.5);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1); // Still 1!
  });

  it('khi API lỗi, trả về cache gần nhất kèm trường stale: true', async () => {
    // Setup initial cache
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        weather: [{ main: 'Rain', description: 'Mưa' }],
        main: { temp: 25.0, humidity: 80 }
      }
    });

    await service.getWeatherByLocation(16.47, 107.59); // populate cache

    // Simulate time passing beyond TTL (20 mins)
    const cachedEntry = (service as any).memoryCache.get('weather_16.47_107.59');
    cachedEntry.updatedAt = Date.now() - 25 * 60 * 1000;

    // Next call will try to fetch because TTL expired, but we make it fail
    mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

    const res = await service.getWeatherByLocation(16.47, 107.59);
    
    expect(res.source).toBe('stale');
    expect(res.stale).toBe(true);
    expect(res.tempCelsius).toBe(25.0); // Should return old data
    expect(mockedAxios.get).toHaveBeenCalledTimes(2); // Initial success + 1 failure
  });
  
  it('không có cache và API lỗi -> trả trạng thái không rõ', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

    const res = await service.getWeatherByLocation(16.48, 107.60); // Different location, no cache
    
    expect(res.source).toBe('stale');
    expect(res.stale).toBe(true);
    expect(res.condition).toBe('Unknown');
  });
});
