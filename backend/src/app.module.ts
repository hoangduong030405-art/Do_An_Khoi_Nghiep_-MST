import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { getTypeOrmConfig } from './database/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './app.controller';
import { GeofencingModule } from './modules/geofencing/geofencing.module';
import { PlacesModule } from './modules/places/places.module';
import { WeatherModule } from './modules/weather/weather.module';
import { AiAssistantModule } from './modules/ai-assistant/ai-assistant.module';
import { GamificationModule } from './modules/gamification/gamification.module';
import { CrowdsourceModule } from './modules/crowdsource/crowdsource.module';
import { AffiliateModule } from './modules/affiliate/affiliate.module';
import { MobilePreviewModule } from './modules/mobile-preview/mobile-preview.module';
import { ItineraryModule } from './modules/itinerary/itinerary.module';
import { AdminModule } from './modules/admin/admin.module';
import { RandomWheelModule } from './modules/random-wheel/random-wheel.module';
import { PortalModule } from './modules/portal/portal.module';
import { InMemoryDbService } from './database/in-memory-db.service';

@Module({
  imports: [
    // Đọc cấu hình môi trường (.env)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, '..', '..', '..', 'mobile', 'build', 'web'),
        serveRoot: '/flutter',
      },
      {
        rootPath: join(__dirname, '..', '..', '..', 'web-hue4u', 'public'),
        serveRoot: '/',
        exclude: ['/api/(.*)', '/flutter/(.*)', '/admin/(.*)', '/s/(.*)', '/s'],
        serveStaticOptions: {
          setHeaders: (res, filePath: string) => {
            if (filePath.endsWith('.html') || filePath.endsWith('.json')) {
              res.setHeader('Cache-Control', 'no-cache, must-revalidate');
            } else if (filePath.match(/\.(css|js|webp|svg|png|jpg|glb|woff2?)$/)) {
              res.setHeader('Cache-Control', 'public, max-age=86400');
            }
          },
        },
      },
    ),

    // Kết nối PostgreSQL qua TypeORM (synchronize: false tuyệt đối)
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        getTypeOrmConfig(configService),
    }),

    // Module Xác thực và Phân quyền JWT
    AuthModule,

    // Rate limiting
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),

    // Các Modules Nghiệp Vụ Toàn Diện của HUEGO
    GeofencingModule,
    PlacesModule,
    WeatherModule,
    AiAssistantModule,
    GamificationModule,
    CrowdsourceModule,
    AffiliateModule,
    MobilePreviewModule,
    ItineraryModule,
    AdminModule,
    RandomWheelModule,
    PortalModule,
  ],
  controllers: [AppController],
  providers: [InMemoryDbService],
  exports: [InMemoryDbService],
})
export class AppModule {}
