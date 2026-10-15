import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../modules/auth/entities/user.entity';

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const host = configService.get<string>('DATABASE_HOST');
  if (!host) {
    throw new Error('Thiếu biến môi trường DATABASE_HOST');
  }

  const portRaw = configService.get<string>('DATABASE_PORT');
  if (!portRaw) {
    throw new Error('Thiếu biến môi trường DATABASE_PORT');
  }
  const port = parseInt(portRaw, 10);
  if (isNaN(port)) {
    throw new Error('Biến môi trường DATABASE_PORT không hợp lệ (phải là số)');
  }

  const username = configService.get<string>('DATABASE_USER');
  if (!username) {
    throw new Error('Thiếu biến môi trường DATABASE_USER');
  }

  const password = configService.get<string>('DATABASE_PASSWORD');
  if (!password) {
    throw new Error('Thiếu biến môi trường DATABASE_PASSWORD');
  }

  const database = configService.get<string>('DATABASE_NAME');
  if (!database) {
    throw new Error('Thiếu biến môi trường DATABASE_NAME');
  }

  return {
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,
    entities: [User, __dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    // Tuyệt đối KHÔNG bật true. Schema do backend/database/seeds/*.sql quản lý.
    // true khiến TypeORM tự ý sửa/xoá cột không có trong entity, gây mất dữ liệu.
    synchronize: false,
    retryAttempts: 5,
    retryDelay: 3000,
  };
};
