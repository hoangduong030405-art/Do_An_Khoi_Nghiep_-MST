import { DataSource } from 'typeorm';
import { Place } from '../modules/places/entities/place.entity';
import { UserUnlock } from '../modules/geofencing/entities/user-unlock.entity';
import { UserPoints } from '../modules/gamification/entities/user-points.entity';
import { CrowdsourceSubmission } from '../modules/crowdsource/entities/crowdsource-submission.entity';
import { Coupon } from '../modules/affiliate/entities/coupon.entity';
import { User } from '../modules/auth/entities/user.entity';
import { InMemoryDbService } from './in-memory-db.service';
import 'dotenv/config';
import * as crypto from 'crypto';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'huego_postgres_admin',
  database: process.env.DATABASE_NAME || 'huego_db',
  entities: [Place, UserUnlock, UserPoints, CrowdsourceSubmission, Coupon, User],
  synchronize: false,
});

async function run() {
  await AppDataSource.initialize();
  // await AppDataSource.dropDatabase();
  await AppDataSource.synchronize();
  console.log('Database connected');

  const inMemoryDb = new InMemoryDbService();
  const places = inMemoryDb.places;

  const placeRepo = AppDataSource.getRepository(Place);
  
  for (const p of places) {
    const existing = await placeRepo.findOne({ where: { slug: p.slug } });
    if (existing) {
      // Upsert, keep existing qrToken
      await placeRepo.update({ id: existing.id }, { 
        ...p, 
        qrToken: existing.qrToken || crypto.randomBytes(16).toString('hex') 
      });
    } else {
      const entity = placeRepo.create({
        ...p,
        qrToken: crypto.randomBytes(16).toString('hex')
      });
      await placeRepo.save(entity);
    }
  }
  
  console.log(`Seeded ${places.length} places`);

  const pointsRepo = AppDataSource.getRepository(UserPoints);
  const userRepo = AppDataSource.getRepository(User);
  const demoUserId = 'e7b0e774-7243-41bb-9be4-8a4b868e82ef'; // From InMemoryDbService
  const existingUser = await userRepo.findOne({ where: { email: 'tourist.demo@huego.vn' } });
  
  if (!existingUser) {
    // Note: In real app, password should be hashed. Here we use plain or whatever AuthService expects.
    // Let's assume AuthService uses bcrypt, we should hash it or AuthService has a register method.
    // Wait, let's just use bcrypt to hash 'Huego@2026'
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('Huego@2026', 10);
    
    await userRepo.save(userRepo.create({
      id: demoUserId,
      email: 'tourist.demo@huego.vn',
      passwordHash: hashedPassword,
      fullName: 'Quản trị viên Huego',
      role: 'ADMIN' as any,
    }));
  }

  const existingPoints = await pointsRepo.findOne({ where: { userId: demoUserId } });
  if (!existingPoints) {
    await pointsRepo.save(pointsRepo.create({ userId: demoUserId, points: 125 }));
  }
  
  console.log('Seeded UserPoints');
  process.exit(0);
}

run().catch(console.error);
