import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GeofencingService } from './geofencing.service';
import { Place } from '../places/entities/place.entity';
import { UserUnlock } from './entities/user-unlock.entity';
import { UserPoints } from '../gamification/entities/user-points.entity';
import { Logger } from '@nestjs/common';

const mockPlace = {
  id: '8f8b0596-f5ee-449e-8c31-9cb6be62b662',
  name: 'Đại Nội Huế',
  latitude: 16.4697,
  longitude: 107.5779,
  geofenceRadiusMeters: 35,
  greenRewardPoints: 30,
  qrToken: 'XXXX-XXXX-MOCK-TOKEN-SECRET-TEST',
};

describe('GeofencingService', () => {
  let service: GeofencingService;
  let placeRepo: any;
  let unlockRepo: any;
  let pointsRepo: any;

  beforeEach(async () => {
    placeRepo = {
      find: jest.fn().mockResolvedValue([mockPlace]),
      createQueryBuilder: jest.fn().mockReturnValue({
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(mockPlace),
      }),
      findOne: jest.fn().mockResolvedValue(mockPlace),
    };
    unlockRepo = {
      findOne: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest.fn(),
    };
    pointsRepo = {
      findOne: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeofencingService,
        { provide: getRepositoryToken(Place), useValue: placeRepo },
        { provide: getRepositoryToken(UserUnlock), useValue: unlockRepo },
        { provide: getRepositoryToken(UserPoints), useValue: pointsRepo },
      ],
    }).compile();

    module.useLogger(new Logger());
    service = module.get<GeofencingService>(GeofencingService);
    process.env.MAX_GPS_ACCURACY = '50';
  });

  it('should unlock within 34m', async () => {
    const result = await service.checkAndUnlockMilestone('user1', { latitude: 16.4697 + 0.0003, longitude: 107.5779, timestamp: new Date().toISOString() });
    expect(result.unlocked).toBe(true);
    expect(unlockRepo.save).toHaveBeenCalled();
  });

  it('should reject outside 35m (36m)', async () => {
    const result = await service.checkAndUnlockMilestone('user1', { latitude: 16.4697 + 0.0004, longitude: 107.5779 });
    expect(result.unlocked).toBe(false);
  });

  it('should reject accuracy too large', async () => {
    const result = await service.checkAndUnlockMilestone('user1', { latitude: 16.4697, longitude: 107.5779, accuracy: 60 });
    expect(result.unlocked).toBe(false);
    expect(result.message).toContain('quá thấp');
  });

  it('should reject fast travel (tốc độ bất thường)', async () => {
    const pastDate = new Date();
    pastDate.setMinutes(pastDate.getMinutes() - 5);
    pointsRepo.findOne.mockResolvedValue({ 
      userId: 'user1', points: 100, 
      lastLatitude: 21.0, lastLongitude: 105.8, 
      lastCheckAt: pastDate 
    });

    const result = await service.checkAndUnlockMilestone('user1', { latitude: 16.4697, longitude: 107.5779, timestamp: new Date().toISOString() });
    expect(result.unlocked).toBe(false);
    expect(result.message).toContain('bất thường');
  });

  it('should handle simultaneous unlocks correctly (race condition)', async () => {
    unlockRepo.save.mockRejectedValueOnce({ code: '23505' });
    pointsRepo.findOne.mockResolvedValue({ userId: 'user1', points: 100 });
    const result = await service.checkAndUnlockMilestone('user1', { latitude: 16.4697, longitude: 107.5779 });
    expect(result.unlocked).toBe(false);
    expect(result.message).toContain('đã từng mở khóa');
  });

  it('should unlock via QR Token correctly', async () => {
    const result = await service.checkAndUnlockMilestone('user1', { qrToken: 'XXXX-XXXX-MOCK-TOKEN-SECRET-TEST' });
    expect(result.unlocked).toBe(true);
  });

  it('should reject wrong QR Token', async () => {
    const result = await service.checkAndUnlockMilestone('user1', { qrToken: 'WRONG' });
    expect(result.unlocked).toBe(false);
  });
});
