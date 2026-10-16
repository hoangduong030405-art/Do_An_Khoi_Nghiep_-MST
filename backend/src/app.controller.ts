import { Controller, Get, HttpCode, HttpStatus, Param, Res, Optional, Inject } from '@nestjs/common';
import { Response } from 'express';
import { Public } from './modules/auth/decorators/public.decorator';
import { GamificationService } from './modules/gamification/gamification.service';

@Controller()
export class AppController {
  constructor(
    @Optional()
    @Inject(GamificationService)
    private readonly gamificationService?: GamificationService,
  ) {}

  @Public()
  @Get('health')
  @HttpCode(HttpStatus.OK)
  getHealth() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  @Public()
  @Get('verify/:code')
  async verifyPage(@Param('code') code: string, @Res() res: Response) {
    let certData: any = null;
    if (this.gamificationService) {
      certData = await this.gamificationService.verifyCertificate(code);
    }

    if (!certData || !certData.valid) {
      return res.status(404).send(`
        <!DOCTYPE html>
        <html lang="vi">
        <head>
          <meta charset="UTF-8">
          <title>Xác thực Chứng nhận - HUEGO</title>
          <style>
            body { font-family: sans-serif; background: #0F172A; color: white; display:flex; align-items:center; justify-content:center; min-height:100vh; margin:0; }
            .box { background: #1E293B; border-radius: 16px; padding: 32px; max-width: 450px; text-align: center; border: 1px solid #EF4444; }
            h2 { color: #EF4444; }
          </style>
        </head>
        <body>
          <div class="box">
            <h2>⚠️ Không Tìm Thấy Chứng Nhận</h2>
            <p>Mã chứng nhận <strong>${code}</strong> không tồn tại trên hệ thống hoặc đã bị thu hồi.</p>
            <a href="/app/" style="color:#D4AF37; text-decoration:none; font-weight:bold;">← Quay lại ứng dụng HUEGO</a>
          </div>
        </body>
        </html>
      `);
    }

    return res.status(200).send(`
      <!DOCTYPE html>
      <html lang="vi">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Xác Thực E-Certificate HUEGO - ${certData.certificateCode}</title>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background: radial-gradient(circle at top, #2D154B 0%, #110724 100%);
            color: #F8FAFC;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
            box-sizing: border-box;
          }
          .cert-card {
            background: #1E1633;
            border: 2px solid #D4AF37;
            border-radius: 24px;
            padding: 36px 28px;
            max-width: 480px;
            width: 100%;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0,0,0,0.6), inset 0 0 15px rgba(212,175,55,0.2);
          }
          .gold-seal { font-size: 48px; margin-bottom: 8px; }
          .cert-heading { font-family: 'Cinzel', serif; font-size: 15px; color: #D4AF37; letter-spacing: 2px; }
          .cert-title { font-family: 'Cinzel', serif; font-size: 22px; color: #FFF; margin: 8px 0 16px; font-weight: 900; }
          .badge-status {
            display: inline-block;
            background: #065F46;
            color: #6EE7B7;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 0.5px;
            margin-bottom: 20px;
          }
          .info-table {
            background: rgba(255,255,255,0.05);
            border-radius: 14px;
            padding: 16px;
            text-align: left;
            font-size: 13px;
            margin-bottom: 20px;
          }
          .info-row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.08); }
          .info-row:last-child { border-bottom: none; }
          .label { color: #94A3B8; }
          .val { font-weight: 700; color: #F1F5F9; }
          .code-chip {
            background: rgba(212,175,55,0.15);
            border: 1px dashed #D4AF37;
            color: #D4AF37;
            padding: 10px;
            border-radius: 12px;
            font-family: monospace;
            font-size: 14px;
            font-weight: 700;
            word-break: break-all;
            margin-bottom: 20px;
          }
          .btn-home {
            display: inline-block;
            background: linear-gradient(135deg, #D4AF37, #B45309);
            color: #000;
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: 800;
            text-decoration: none;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="cert-card">
          <div class="gold-seal">👑</div>
          <div class="cert-heading">HỆ THỐNG XÁC THỰC CỐ ĐÔ HUẾ</div>
          <div class="cert-title">${certData.title}</div>
          <div class="badge-status">✓ CHỨNG NHẬN HỢP LỆ & CHÍNH THỨC</div>
          
          <div class="code-chip">${certData.certificateCode}</div>

          <div class="info-table">
            <div class="info-row"><span class="label">Người nhận:</span><span class="val">${certData.recipientName}</span></div>
            <div class="info-row"><span class="label">Cột mốc di tích:</span><span class="val">${certData.unlockedCount} địa danh</span></div>
            <div class="info-row"><span class="label">Điểm tích lũy:</span><span class="val">${certData.greenPoints} Green Points</span></div>
            <div class="info-row"><span class="label">Ngày cấp:</span><span class="val">${new Date(certData.issuedDate).toLocaleDateString('vi-VN')}</span></div>
            <div class="info-row"><span class="label">Đơn vị xác thực:</span><span class="val">${certData.issuer}</span></div>
          </div>

          <a href="/app/" class="btn-home">Trải Nghiệm Ứng Dụng HUEGO</a>
        </div>
      </body>
      </html>
    `);
  }
}