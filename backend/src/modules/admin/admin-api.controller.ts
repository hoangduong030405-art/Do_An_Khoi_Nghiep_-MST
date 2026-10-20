import { Body, Controller, Get, NotFoundException, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from '../places/entities/place.entity';
import { PlaceNarration } from '../places/entities/place-narration.entity';
import { UnlockAuditLog } from '../geofencing/entities/unlock-audit-log.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

@Controller('admin/places')
@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminApiController {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepo: Repository<Place>,
    @InjectRepository(PlaceNarration)
    private readonly narrationRepo: Repository<PlaceNarration>,
    @InjectRepository(UnlockAuditLog)
    private readonly auditRepo: Repository<UnlockAuditLog>,
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

    const newToken = crypto.randomBytes(24).toString('hex');
    await this.placeRepo.update({ id: placeId }, { qrToken: newToken });

    return {
      success: true,
      message: `Đã tạo lại QR Token cho ${place.name}`,
      qrToken: newToken,
    };
  }

  @Get('unlock-audit-logs')
  async getUnlockAuditLogs(@Query('limit') limit?: number) {
    return await this.auditRepo.find({
      order: { createdAt: 'DESC' },
      take: limit ? Math.min(Number(limit), 200) : 50,
    });
  }

  @Get('narrations')
  async getNarrations() {
    return await this.narrationRepo.find({
      order: { createdAt: 'ASC' },
    });
  }

  @Patch(':placeId/narration/status')
  async updateNarrationStatus(
    @Param('placeId') placeId: string,
    @Body('status') status: 'draft' | 'verified',
    @Body('lang') lang: string = 'vi',
    @Req() req: any,
  ) {
    const narration = await this.narrationRepo.findOne({
      where: { placeId, lang },
    });
    if (!narration) {
      throw new NotFoundException(`Không tìm thấy thuyết minh của ${placeId}`);
    }

    narration.reviewStatus = status;
    narration.reviewedBy = req.user?.username || req.user?.email || 'admin';
    narration.reviewedAt = new Date();
    await this.narrationRepo.save(narration);

    return {
      success: true,
      message: `Đã cập nhật trạng thái thuyết minh cho ${placeId} thành ${status}`,
      narration,
    };
  }
}
