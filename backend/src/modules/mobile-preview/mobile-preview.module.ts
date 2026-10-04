import { Module } from '@nestjs/common';
import { MobilePreviewController } from './mobile-preview.controller';

@Module({
  controllers: [MobilePreviewController],
})
export class MobilePreviewModule {}
