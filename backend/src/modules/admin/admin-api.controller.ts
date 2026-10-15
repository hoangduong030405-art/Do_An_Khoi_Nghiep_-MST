import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from '../places/entities/place.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

@Controller('admin/places')
@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminApiController {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepo: Repository<Place>,
  ) {}

  @Get('qr-tokens')
  async getQrTokens() {
    const places = await this.placeRepo.createQueryBuilder('place')
      .select(['place.id', 'place.name', 'place.slug', 'place.qrToken'])
      .getMany();
    
    return places.map(p => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      qrToken: p.qrToken,
    }));
  }

  @Post(':placeId/qr-token/regenerate')
  async regenerateQrToken(@Param('placeId') placeId: string) {
    const place = await this.placeRepo.findOne({ where: { id: placeId } });
    if (!place) {
      return { success: false, message: 'Địa điểm không tồn tại' };
    }

    const newToken = crypto.randomBytes(16).toString('hex');
    await this.placeRepo.update({ id: placeId }, { qrToken: newToken });

    return {
      success: true,
      message: `Đã tạo lại QR Token cho ${place.name}`,
      qrToken: newToken,
    };
  }
}
