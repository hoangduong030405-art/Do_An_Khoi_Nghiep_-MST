import { Test, TestingModule } from '@nestjs/testing';
import { ItineraryService } from '../src/modules/itinerary/itinerary.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Itinerary } from '../src/modules/itinerary/entities/itinerary.entity';
import { ItineraryStop } from '../src/modules/itinerary/entities/itinerary-stop.entity';
import { ItineraryShare } from '../src/modules/itinerary/entities/itinerary-share.entity';
import { Place } from '../src/modules/places/entities/place.entity';
import { User } from '../src/modules/auth/entities/user.entity';
import { WeatherService } from '../src/modules/weather/weather.service';

describe('Itinerary Optimizer Test', () => {
  let service: ItineraryService;
  let placeRepoMock: any;

  beforeEach(async () => {
    placeRepoMock = {
      findByIds: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItineraryService,
        { provide: getRepositoryToken(Itinerary), useValue: {} },
        { provide: getRepositoryToken(ItineraryStop), useValue: {} },
        { provide: getRepositoryToken(ItineraryShare), useValue: {} },
        { provide: getRepositoryToken(Place), useValue: placeRepoMock },
        { provide: getRepositoryToken(User), useValue: {} },
        { provide: WeatherService, useValue: {} },
      ],
    }).compile();

    service = module.get<ItineraryService>(ItineraryService);
  });

  const placesDS1 = [
    { id: '1', name: 'A', latitude: 0, longitude: 0 },
    { id: '2', name: 'B', latitude: 0, longitude: 10 },
    { id: '3', name: 'C', latitude: 10, longitude: 10 },
  ];

  const placesDS2 = [
    { id: 'A', latitude: 16.4673, longitude: 107.5905 }, // Đại Nội Huế
    { id: 'B', latitude: 16.4533, longitude: 107.5819 }, // Lăng Tự Đức (gần)
    { id: 'C', latitude: 16.3888, longitude: 107.5750 }, // Lăng Minh Mạng (xa)
    { id: 'D', latitude: 16.4355, longitude: 107.5683 }, // Đồi Vọng Cảnh
  ];

  const placesDS3 = [
    { id: 'P1', latitude: 10, longitude: 10 },
    { id: 'P2', latitude: 10.1, longitude: 10 },
    { id: 'P3', latitude: 10.1, longitude: 10.1 },
    { id: 'P4', latitude: 10, longitude: 10.1 },
  ];

  it('Bộ dữ liệu 1: A -> B -> C', async () => {
    placeRepoMock.findByIds.mockResolvedValue(placesDS1);
    // Xuất phát tại A (0,0)
    const result = await service.optimizeRoute(['1', '2', '3'], 0, 0) as any;
    expect(result.optimizedRoute).toEqual(['1', '2', '3']);
    // Tổng quãng đường từ 0,0 -> 0,0 -> 0,10 -> 10,10
    expect(result.totalDistanceKm).toBeGreaterThan(0);
  });

  it('Bộ dữ liệu 2: Đại Nội -> Tự Đức -> Vọng Cảnh -> Minh Mạng', async () => {
    placeRepoMock.findByIds.mockResolvedValue(placesDS2);
    // Xuất phát từ Đại Nội
    const result = await service.optimizeRoute(['A', 'B', 'C', 'D'], 16.4673, 107.5905) as any;
    // Đại Nội (A) -> Tự Đức (B) hoặc Vọng Cảnh (D). 
    // Từ Đại Nội đến B: ~1.8km, đến D: ~4km. Nên chọn A.
    // Kết quả đúng sẽ xếp A lên đầu.
    expect(result.optimizedRoute[0]).toBe('A');
    // Minh Mạng (C) xa nhất, có thể ở cuối.
    expect(result.optimizedRoute[3]).toBe('C');
  });

  it('Bộ dữ liệu 3: Hình vuông', async () => {
    placeRepoMock.findByIds.mockResolvedValue(placesDS3);
    // Xuất phát từ P1 (10,10)
    const result = await service.optimizeRoute(['P1', 'P2', 'P3', 'P4'], 10, 10) as any;
    // Optimal path is P1 -> P2 -> P3 -> P4 or P1 -> P4 -> P3 -> P2
    expect(result.optimizedRoute[0]).toBe('P1');
    const last = result.optimizedRoute[3];
    expect(['P2', 'P4']).toContain(last); // It visits adjacent nodes, ends at P2 or P4
  });
});
