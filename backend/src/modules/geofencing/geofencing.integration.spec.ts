import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { DataSource } from 'typeorm';
import { Place } from '../places/entities/place.entity';
import { UserPoints } from '../gamification/entities/user-points.entity';
import { UserUnlock } from './entities/user-unlock.entity';
import { User } from '../auth/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

describe('Geofencing (Integration)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;
  let placeId: string;
  const demoUserId = 'e7b0e774-7243-41bb-9be4-8a4b868e82ef'; // Use existing seeded user or mock

  beforeAll(async () => {
    process.env.FAST_TRAVEL_MIN_DISTANCE_M = '300';
    process.env.FAST_TRAVEL_MIN_TIME_S = '5';
    process.env.MAX_GPS_ACCURACY = '50';
    process.env.JWT_SECRET = 'super_secret_jwt_key_for_huego';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    
    dataSource = app.get<DataSource>(DataSource);
    const jwtService = app.get<JwtService>(JwtService);
    jwtToken = jwtService.sign({ sub: demoUserId, email: 'demo@example.com', role: 'TOURIST' });
    
    // Ensure User exists
    const userRepo = dataSource.getRepository(User);
    const existingUser = await userRepo.findOne({ where: { id: demoUserId } });
    if (!existingUser) {
      await userRepo.save(userRepo.create({
        id: demoUserId,
        email: 'demo@example.com',
        fullName: 'Demo User',
        role: 'TOURIST' as any,
      }));
    }

    // Reset data for the test user
    await dataSource.getRepository(UserUnlock).delete({ userId: demoUserId });
    await dataSource.getRepository(UserPoints).delete({ userId: demoUserId });

    // Ensure we have a place to test
    const place = await dataSource.getRepository(Place).findOne({ where: { slug: 'dai-noi-hue' } });
    if (place) {
      placeId = place.id;
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it('1. Should unlock successfully and award points', async () => {
    const pointBefore = await dataSource.getRepository(UserPoints).findOne({ where: { userId: demoUserId } });
    const pointsInitial = pointBefore ? pointBefore.points : 0;
    
    const res = await request(app.getHttpServer())
      .post('/api/v1/geofencing/unlock')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        latitude: 16.4697, // Exactly at Dai Noi
        longitude: 107.5779,
        timestamp: new Date().toISOString(),
      });

    expect(res.status).toBe(201); // or 200 based on NestJS POST default
    expect(res.body.unlocked).toBe(true);
    expect(res.body.rewardPoints).toBe(30); // Dynamic point check
    expect(res.body.totalGreenPoints).toBe(pointsInitial + 30);

    // Verify in DB
    const points = await dataSource.getRepository(UserPoints).findOne({ where: { userId: demoUserId } });
    expect(points.points).toBe(pointsInitial + 30);
  });

  it('2. Should reject simultaneous unlocks (race condition) and enforce UNIQUE constraint', async () => {
    // Pick another place
    const place2 = await dataSource.getRepository(Place).findOne({ where: { slug: 'chua-thien-mu' } });
    const pointBefore = await dataSource.getRepository(UserPoints).findOne({ where: { userId: demoUserId } });
    const pointsInitial = pointBefore ? pointBefore.points : 0;

    const reqData = {
      latitude: place2.latitude,
      longitude: place2.longitude,
      timestamp: new Date().toISOString(),
    };

    // Send 3 requests concurrently
    const responses = await Promise.all([
      request(app.getHttpServer()).post('/api/v1/geofencing/unlock').set('Authorization', `Bearer ${jwtToken}`).send(reqData),
      request(app.getHttpServer()).post('/api/v1/geofencing/unlock').set('Authorization', `Bearer ${jwtToken}`).send(reqData),
      request(app.getHttpServer()).post('/api/v1/geofencing/unlock').set('Authorization', `Bearer ${jwtToken}`).send(reqData),
    ]);

    // Only one should succeed
    const successes = responses.filter(r => r.body && r.body.unlocked === true);
    const failures = responses.filter(r => r.body && r.body.unlocked === false);
    
    if (successes.length === 0) {
      console.log('NO SUCCESSES. Responses:', responses.map(r => r.body || r.error || r.status));
    }

    expect(successes.length).toBe(1);
    expect(failures.length).toBe(2);
    expect(failures[0].body.message).toContain('đã từng mở khóa');

    // DB Points should only increase by place2.greenRewardPoints ONCE
    const pointAfter = await dataSource.getRepository(UserPoints).findOne({ where: { userId: demoUserId } });
    expect(pointAfter.points).toBe(pointsInitial + place2.greenRewardPoints);

    // Should only have 1 unlock record
    const unlocks = await dataSource.getRepository(UserUnlock).find({ where: { userId: demoUserId, placeId: place2.id } });
    expect(unlocks.length).toBe(1);
  });

  it('3. Should not trigger fast-travel on GPS drift (jumping few meters in few seconds)', async () => {
    // Current time
    const t1 = new Date();
    // Simulate check-in at Dai Noi
    await request(app.getHttpServer()).post('/api/v1/geofencing/unlock').set('Authorization', `Bearer ${jwtToken}`).send({
      latitude: 16.4697, longitude: 107.5779, timestamp: t1.toISOString()
    });

    // 2 seconds later, drifted by 10 meters (still inside Dai Noi radius)
    const t2 = new Date(t1.getTime() + 2000); // 2s
    const res = await request(app.getHttpServer()).post('/api/v1/geofencing/unlock').set('Authorization', `Bearer ${jwtToken}`).send({
      latitude: 16.4697 + 0.0001, // ~11m
      longitude: 107.5779,
      timestamp: t2.toISOString()
    });

    // Should NOT say "tốc độ bất thường", just normal rejection if already unlocked or unlock success.
    // Since we already unlocked Dai Noi, it should return 'Bạn đã từng mở khóa' but NOT 'dịch chuyển bất thường'
    expect(res.body.message).not.toContain('bất thường');
  });

  it('4. Should apply Rate Limiting (Throttler) by User', async () => {
    // Send 10 requests to exhaust the limit
    for (let i = 0; i < 10; i++) {
      await request(app.getHttpServer()).post('/api/v1/geofencing/unlock').set('Authorization', `Bearer ${jwtToken}`).send({
        latitude: 16.4697, longitude: 107.5779,
      });
    }

    // Next request should fail with 429 Too Many Requests
    const res = await request(app.getHttpServer()).post('/api/v1/geofencing/unlock').set('Authorization', `Bearer ${jwtToken}`).send({
      latitude: 16.4697, longitude: 107.5779,
    });
    
    expect(res.status).toBe(429);
  });

  it('5. Should securely verify QR Token with timingSafeEqual', async () => {
    // Generate a new token for a new user to bypass rate limit
    const jwtService = app.get<JwtService>(JwtService);
    const mockUserId = '11111111-2222-3333-4444-555555555555';
    const userRepo = dataSource.getRepository(User);
    await userRepo.save(userRepo.create({ id: mockUserId, email: 'new@example.com', fullName: 'Mock', role: 'TOURIST' as any }));

    const newToken = jwtService.sign({ sub: mockUserId, email: 'new@example.com', role: 'TOURIST' });

    const place = await dataSource.getRepository(Place).findOne({ where: { slug: 'dai-noi-hue' }, select: ['id', 'qrToken'] });
    
    // 1. Correct Token
    const resSuccess = await request(app.getHttpServer()).post('/api/v1/geofencing/unlock').set('Authorization', `Bearer ${newToken}`).send({
      qrToken: place.qrToken
    });
    // Since we already unlocked Dai Noi, it might return 'đã từng mở khóa', but unlocked is false.
    // However, the qrToken itself was accepted.
    expect(resSuccess.body.message).not.toContain('không hợp lệ');

    // 2. Wrong Token
    const resFail = await request(app.getHttpServer()).post('/api/v1/geofencing/unlock').set('Authorization', `Bearer ${newToken}`).send({
      qrToken: crypto.randomBytes(16).toString('hex')
    });
    expect(resFail.body.unlocked).toBe(false);
    expect(resFail.body.message).toContain('không hợp lệ');
  });
});
