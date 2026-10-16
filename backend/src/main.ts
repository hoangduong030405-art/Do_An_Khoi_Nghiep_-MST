import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const logger = new Logger('HUEGO_Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.setGlobalPrefix('api/v1', {
    exclude: [
      'admin/(.*)', 'admin',
      'verify/(.*)', 'verify',
      'app/(.*)', 'app',
      'flutter/(.*)', 'flutter',
      'random-wheel/(.*)', 'random-wheel',
      'api/(.*)', 'api',
    ],
  });

  // Tự động validate DTO cho mọi request
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Phục vụ ứng dụng Flutter đã biên dịch bằng ServeStaticModule trong app.module.ts

  // Thiết lập Swagger UI tài liệu hóa API
  const config = new DocumentBuilder()
    .setTitle('HUEGO API - Khám Phá Huế Thông Minh')
    .setDescription(
      'Hệ sinh thái API định vị GPS Geofencing, AI Guide, Lịch trình theo thời tiết, Lập lộ trình tối ưu và Tích điểm Du lịch Xanh.',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`=======================================================`);
  logger.log(` 🚀 HUEGO Backend Server chạy tại: http://localhost:${port}`);
  logger.log(` 🌐 Web Portal Khám phá Cố Đô: http://localhost:${port}`);
  logger.log(` 🏛️ Bảo tàng số Cổ vật Hoàng Cung 3D: http://localhost:${port}/museum.html`);
  logger.log(` 🗺️ Bản đồ số Du lịch Huế: http://localhost:${port}/map.html`);
  logger.log(` 📖 Cẩm nang Du lịch Cố Đô: http://localhost:${port}/hue.html`);
  logger.log(` 📱 Ứng dụng Flutter Web: http://localhost:${port}/flutter`);
  logger.log(` 📲 Trình giả lập Mobile Phone: http://localhost:${port}/app`);
  logger.log(` 👑 Cổng Quản Trị Admin: http://localhost:${port}/admin`);
  logger.log(` 📜 Chứng Nhận E-Certificate: http://localhost:${port}/admin/cert-preview`);
  logger.log(` 📚 Tài liệu API Swagger: http://localhost:${port}/api/docs`);
  logger.log(`=======================================================`);
}
bootstrap();
