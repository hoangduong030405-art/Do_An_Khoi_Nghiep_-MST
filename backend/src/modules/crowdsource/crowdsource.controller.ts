import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors, UploadedFile, Res, BadRequestException, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { CloudflareThrottlerGuard } from '../../common/guards/cloudflare-throttler.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import * as crypto from 'crypto';
import { CrowdsourceService, SubmitPlaceDto } from './crowdsource.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/entities/user.entity';
import { Public } from '../auth/decorators/public.decorator';

function validateImageMagicBytes(buffer: Buffer): 'jpg' | 'png' | 'webp' | null {
  if (buffer.length < 12) return null;
  // JPEG: FF D8 FF
  if (buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) {
    return 'jpg';
  }
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4E &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0D &&
    buffer[5] === 0x0A &&
    buffer[6] === 0x1A &&
    buffer[7] === 0x0A
  ) {
    return 'png';
  }
  // WebP: RIFF .... WEBP
  const riff = buffer.toString('ascii', 0, 4);
  const webp = buffer.toString('ascii', 8, 12);
  if (riff === 'RIFF' && webp === 'WEBP') {
    return 'webp';
  }
  return null;
}

@ApiTags('Crowdsourcing (Đóng góp cộng đồng)')
@Controller('crowdsource')
export class CrowdsourceController {
  constructor(private readonly crowdsourceService: CrowdsourceService) {}

  @Post('upload')
  @UseGuards(CloudflareThrottlerGuard)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({ summary: 'Tải lên ảnh minh chứng địa danh (giới hạn 2MB, chỉ JPG/PNG/WEBP)' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', {
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
        return cb(new BadRequestException('Chỉ chấp nhận file ảnh định dạng JPG, PNG hoặc WEBP.'), false);
      }
      cb(null, true);
    },
    storage: diskStorage({
      destination: (req, file, cb) => {
        const uploadDir = path.resolve(process.cwd(), 'uploads/crowdsource');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
      },
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const randName = crypto.randomBytes(16).toString('hex') + (ext || '.png');
        cb(null, randName);
      },
    }),
  }))
  async uploadImage(@UploadedFile() file: any) {
    if (!file) throw new BadRequestException('Vui lòng chọn file ảnh hợp lệ để tải lên.');

    // Kiểm tra chữ ký nhị phân (Magic Bytes)
    const filePath = file.path;
    try {
      const buffer = fs.readFileSync(filePath);
      const detected = validateImageMagicBytes(buffer);
      if (!detected) {
        try { fs.unlinkSync(filePath); } catch {}
        throw new BadRequestException('Tệp tải lên không phải là ảnh hợp lệ (chữ ký nhị phân magic bytes không đúng).');
      }
    } catch (err: any) {
      try { fs.unlinkSync(filePath); } catch {}
      throw err;
    }

    return {
      success: true,
      filename: file.filename,
      imageUrl: `/api/v1/crowdsource/images/${file.filename}`,
      size: file.size,
      mimetype: file.mimetype,
    };
  }

  @Public()
  @Get('images/:filename')
  @ApiOperation({ summary: 'Xem ảnh minh chứng đã tải lên' })
  async serveImage(@Param('filename') filename: string, @Res() res: Response) {
    if (!/^[a-f0-9]{32}\.(jpg|jpeg|png|webp)$/i.test(filename)) {
      throw new BadRequestException('Tên file ảnh không hợp lệ.');
    }
    const filePath = path.resolve(process.cwd(), 'uploads/crowdsource', filename);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Ảnh không tồn tại trên hệ thống.');
    }
    res.setHeader('X-Content-Type-Options', 'nosniff');
    return res.sendFile(filePath);
  }

  @Post('submit')
  @UseGuards(CloudflareThrottlerGuard)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({ summary: 'Người dùng/người dân gửi đề xuất địa điểm, quán ăn Huế mới' })
  async submit(@Body() dto: SubmitPlaceDto) {
    return await this.crowdsourceService.submitContribution(dto);
  }

  @Get('pending')
  @ApiOperation({ summary: 'Admin xem hàng đợi các đề xuất địa danh chờ duyệt' })
  async getPending() {
    return await this.crowdsourceService.getPendingSubmissions();
  }

  @Post(':id/approve')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Admin duyệt đề xuất và cộng điểm thưởng xanh cho du khách' })
  async approve(@Param('id') id: string, @Body('pointsAwarded') pointsAwarded?: number) {
    return await this.crowdsourceService.approveSubmission(id, pointsAwarded);
  }

  @Post(':id/reject')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Admin từ chối đề xuất' })
  async reject(@Param('id') id: string, @Body('reason') reason?: string) {
    return await this.crowdsourceService.rejectSubmission(id, reason);
  }
}
