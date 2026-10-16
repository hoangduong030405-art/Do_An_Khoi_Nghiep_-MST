import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { Public } from '../auth/decorators/public.decorator';
import * as path from 'path';
import * as fs from 'fs';

@Controller('app')
@Public()
export class MobilePreviewController {
  @Get()
  getMobileApp(@Res() res: Response) {
    const candidates = [
      path.resolve(process.cwd(), '..', 'web-hue4u', 'public', 'app', 'index.html'),
      path.resolve(process.cwd(), 'web-hue4u', 'public', 'app', 'index.html'),
      path.resolve(__dirname, '..', '..', '..', '..', '..', 'web-hue4u', 'public', 'app', 'index.html'),
      path.resolve(__dirname, '..', '..', '..', 'web-hue4u', 'public', 'app', 'index.html'),
    ];
    for (const p of candidates) {
      if (fs.existsSync(p)) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.sendFile(p);
      }
    }
    res.status(404).send('HUEGO App not found');
  }

  @Get('connect')
  getConnectGuide(@Res() res: Response) {
    const wifiUrl = 'http://localhost:3000/app';
    const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Kết Nối Điện Thoại – HUEGO App</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { background: radial-gradient(circle at top, #1E102D 0%, #0F172A 100%); color: #F8FAFC; font-family: 'Plus Jakarta Sans', sans-serif; margin: 0; padding: 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; box-sizing: border-box; }
    .card-wrap { max-width: 600px; width: 100%; background: #1E293B; border: 1px solid #334155; border-radius: 28px; padding: 32px; text-align: center; box-shadow: 0 25px 60px rgba(0,0,0,0.6); }
    h1 { color: #D4AF37; font-size: 24px; margin-bottom: 6px; font-weight: 800; }
    p.sub { color: #94A3B8; font-size: 14px; margin-bottom: 24px; }
    .url-box { background: #020617; border: 1px dashed #475569; padding: 12px; border-radius: 12px; font-family: monospace; font-size: 14px; color: #38BDF8; margin: 16px 0; word-break: break-all; }
  </style>
</head>
<body>
  <div class="card-wrap">
    <h1>HUEGO MOBILE APP</h1>
    <p class="sub">Truy cập ứng dụng trực tiếp trên máy tính hoặc điện thoại</p>
    <div class="url-box">${wifiUrl}</div>
    <a href="/app" style="color:#D4AF37; font-weight:bold; text-decoration:none;">👉 Mở Ứng Dụng Ngay</a>
  </div>
</body>
</html>`;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  }
}
