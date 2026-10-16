import { DataSource } from 'typeorm';
import { User } from '../modules/auth/entities/user.entity';
import { RefreshToken } from '../modules/auth/entities/refresh-token.entity';
import { UserUnlock } from '../modules/geofencing/entities/user-unlock.entity';
import { UserPoints } from '../modules/gamification/entities/user-points.entity';
import 'dotenv/config';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'huego_secure_password_2026',
  database: process.env.DATABASE_NAME || 'huego_db',
  entities: [User, RefreshToken, UserUnlock, UserPoints],
  synchronize: false,
});

async function cleanupDemoAccounts() {
  await AppDataSource.initialize();
  console.log('[CLEANUP:DEMO] Đã kết nối cơ sở dữ liệu PostgreSQL.');

  const userRepo = AppDataSource.getRepository(User);
  const tokenRepo = AppDataSource.getRepository(RefreshToken);
  const unlockRepo = AppDataSource.getRepository(UserUnlock);
  const pointsRepo = AppDataSource.getRepository(UserPoints);

  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);

  // Find demo users created more than 24 hours ago
  const staleDemoUsers = await userRepo
    .createQueryBuilder('user')
    .where("user.email LIKE 'demo.%@huego.vn'")
    .andWhere('user.created_at < :cutoff', { cutoff })
    .getMany();

  console.log(`[CLEANUP:DEMO] Tìm thấy ${staleDemoUsers.length} tài khoản demo hết hạn (> 24h).`);

  for (const u of staleDemoUsers) {
    await tokenRepo.delete({ user_id: u.id });
    await unlockRepo.delete({ userId: u.id });
    await pointsRepo.delete({ userId: u.id });
    await userRepo.delete({ id: u.id });
  }

  console.log(`[CLEANUP:DEMO] Đã dọn dẹp an toàn thành công ${staleDemoUsers.length} tài khoản demo.`);
  await AppDataSource.destroy();
  process.exit(0);
}

cleanupDemoAccounts().catch((err) => {
  console.error('[CLEANUP:DEMO] Lỗi khi dọn dẹp:', err);
  process.exit(1);
});
