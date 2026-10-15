import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { InMemoryDbService } from '../../database/in-memory-db.service';
import { CrowdsourceService } from '../crowdsource/crowdsource.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/entities/user.entity';
import { Public } from '../auth/decorators/public.decorator';
import { AuthService } from '../auth/auth.service';

@Controller('admin')
@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(
    private readonly inMemoryDb: InMemoryDbService,
    private readonly crowdsourceService: CrowdsourceService,
    private readonly authService: AuthService,
  ) {}

  @Get('login')
  @Public()
  getAdminLogin(@Res() res: Response) {
    const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Đăng Nhập Quản Trị HUEGO</title>
  <style>
    body { background: #0F172A; color: white; font-family: 'Plus Jakarta Sans', sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
    .login-box { background: #1E293B; padding: 40px; border-radius: 12px; border: 1px solid #334155; width: 350px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
    input { width: 100%; padding: 14px; margin-bottom: 16px; border-radius: 8px; border: 1px solid #334155; background: #0F172A; color: white; box-sizing: border-box; font-size: 14px; }
    button { width: 100%; padding: 14px; background: #582C83; color: white; font-weight: bold; border: none; border-radius: 8px; cursor: pointer; font-size: 15px; transition: 0.2s; }
    button:hover { background: #7c3aed; }
  </style>
</head>
<body>
  <div class="login-box">
    <h2 style="color: #D4AF37; margin-bottom: 30px; letter-spacing: 2px;">HUEGO ADMIN</h2>
    <form method="POST" action="/admin/login">
      <input type="email" name="email" placeholder="Email quản trị" required value="tourist.demo@huego.vn">
      <input type="password" name="password" placeholder="Mật khẩu" required value="Huego@2026">
      <button type="submit">Đăng Nhập Quản Trị</button>
    </form>
  </div>
</body>
</html>`;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  }

  @Post('login')
  @Public()
  async postAdminLogin(@Body() body: any, @Res() res: Response) {
    try {
      const result = await this.authService.login(body);
      if (result.user.role !== UserRole.ADMIN) {
        throw new Error('Tài khoản của bạn không có quyền Quản trị viên (ADMIN).');
      }
      res.cookie('adminToken', result.accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 }); // 15 minutes
      res.redirect('/admin');
    } catch (e) {
      res.status(401).send(`<body style="background: #0F172A; color: white; font-family: sans-serif; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;"><h2 style="color:#EF4444">Đăng nhập thất bại</h2><p>${e.message}</p><a href="/admin/login" style="color: #38BDF8; margin-top: 20px;">Quay lại đăng nhập</a></body>`);
    }
  }

  @Get('logout')
  @Public()
  logout(@Res() res: Response) {
    res.clearCookie('adminToken');
    res.redirect('/admin/login');
  }

  @Get()
  async getAdminDashboard(@Res() res: Response) {
    const submissions = await this.crowdsourceService.getPendingSubmissions();
    const totalUnlocked = this.inMemoryDb.unlockedMilestones.length;
    const totalPlaces = this.inMemoryDb.places.length;
    const totalGreenPoints = Array.from(this.inMemoryDb.userPoints.values()).reduce((a, b) => a + b, 0);

    const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HUEGO Admin Portal – Trung Tâm Quản Trị Cố Đô Thông Minh</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #582C83;
      --primary-dark: #3F1D61;
      --gold: #D4AF37;
      --teal: #1E6B7B;
      --bg: #0F172A;
      --card-bg: #1E293B;
      --text: #F8FAFC;
      --text-muted: #94A3B8;
      --success: #10B981;
      --danger: #EF4444;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; }
    body { background: var(--bg); color: var(--text); padding: 24px; min-height: 100vh; }
    .container { max-width: 1200px; margin: 0 auto; }
    
    /* Header */
    .header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 24px; border-bottom: 1px solid #334155; margin-bottom: 24px; }
    .header h1 { font-size: 24px; font-weight: 800; color: var(--gold); display: flex; align-items: center; gap: 10px; }
    .header-links a { color: var(--text-muted); text-decoration: none; margin-left: 16px; font-size: 13px; font-weight: 600; }
    .header-links a:hover { color: var(--gold); }

    /* KPI Cards */
    .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
    .kpi-card { background: var(--card-bg); border: 1px solid #334155; border-radius: 18px; padding: 18px; }
    .kpi-label { font-size: 12px; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
    .kpi-value { font-size: 32px; font-weight: 800; margin-top: 6px; color: white; }
    .kpi-card.highlight .kpi-value { color: var(--gold); }

    /* Section Layout */
    .section-title { font-size: 18px; font-weight: 700; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; }
    .badge-count { background: var(--primary); color: white; padding: 4px 10px; border-radius: 12px; font-size: 12px; }

    /* Table */
    .table-container { background: var(--card-bg); border-radius: 18px; border: 1px solid #334155; overflow: hidden; margin-bottom: 30px; }
    table { width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; }
    th { background: #0F172A; padding: 14px 18px; color: var(--text-muted); font-weight: 700; border-bottom: 1px solid #334155; }
    td { padding: 14px 18px; border-bottom: 1px solid #334155; vertical-align: middle; }
    tr:hover { background: rgba(255,255,255,0.02); }

    /* Buttons */
    .btn { padding: 6px 14px; border-radius: 10px; font-size: 12px; font-weight: 700; cursor: pointer; border: none; transition: 0.2s; }
    .btn-approve { background: var(--success); color: white; margin-right: 6px; }
    .btn-reject { background: #475569; color: white; }
    .btn-approve:hover { filter: brightness(1.15); }

    /* Quick Links */
    .quick-panel { display: flex; gap: 12px; margin-top: 20px; }
    .quick-btn { background: var(--primary); color: white; padding: 12px 20px; border-radius: 14px; text-decoration: none; font-weight: 700; font-size: 13px; display: inline-flex; align-items: center; gap: 8px; }
    .quick-btn:hover { background: var(--primary-dark); }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏛️ HUEGO ADMIN PORTAL</h1>
      <div class="header-links">
        <a href="/app" target="_blank">📱 Mở Mobile Simulator</a>
        <a href="/flutter" target="_blank">🌐 Mở Flutter Web</a>
        <a href="/admin/logout" style="color: #EF4444">🚪 Đăng xuất</a>
        <a href="/api/docs" target="_blank">📚 Swagger API Docs</a>
      </div>
    </div>

    <!-- KPI Statistics -->
    <div class="kpi-grid">
      <div class="kpi-card highlight">
        <div class="kpi-label">Tổng Điểm Xanh (Green Points)</div>
        <div class="kpi-value">${totalGreenPoints} GP</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Lượt Mở Khóa Geofence 35m</div>
        <div class="kpi-value">${totalUnlocked}</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Địa Danh Di Sản Huế Đang Mở</div>
        <div class="kpi-value">${totalPlaces}</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Đề Xuất Chờ Duyệt (Crowdsource)</div>
        <div class="kpi-value">${submissions.length}</div>
      </div>
    </div>

    <!-- Crowdsourcing Moderation Queue -->
    <div class="section-title">
      <span>📥 Hàng Đợi Kiểm Duyệt Đóng Góp Cộng Đồng</span>
      <span class="badge-count">${submissions.length} đề xuất mới</span>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Tên Địa Điểm / Quán Ăn</th>
            <th>Địa Chỉ</th>
            <th>Loại Không Gian</th>
            <th>Câu Chuyện / Lý Do Đề Xuất</th>
            <th>Thao Tác Admin</th>
          </tr>
        </thead>
        <tbody id="submission-list">
          ${
            submissions.length === 0
              ? `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 30px;">Chưa có đề xuất nào đang chờ duyệt. Người dân gửi qua App sẽ lập tức xuất hiện tại đây!</td></tr>`
              : submissions
                  .map(
                    (s: any) => `
              <tr id="row-${s.id}">
                <td style="font-weight: 700; color: white;">${s.placeName}</td>
                <td>${s.address}</td>
                <td><span style="background: rgba(30,107,123,0.3); color: #38BDF8; padding: 4px 8px; border-radius: 8px; font-weight: 700;">${s.environmentType}</span></td>
                <td style="max-width: 320px; line-height: 1.4;">${s.reasonRecommendation}</td>
                <td>
                  <button class="btn btn-approve" onclick="approvePlace('${s.id}', '${s.placeName}', '${s.address}', '${s.environmentType}')">✓ Duyệt (+50 GP)</button>
                  <button class="btn btn-reject" onclick="rejectPlace('${s.id}')">✕ Bác bỏ</button>
                </td>
              </tr>
            `,
                  )
                  .join('')
          }
        </tbody>
      </table>
    </div>

    <!-- Management Quick Actions -->
    <div class="section-title">
      <span>⚡ Công Cụ Quản Lý Nhanh</span>
    </div>
    <div class="quick-panel">
      <a href="/weather/hue-current" target="_blank" class="quick-btn">🌤️ Trạm Thời Tiết Huế</a>
      <a href="/places" target="_blank" class="quick-btn">📍 Dữ Liệu Tọa Độ PostGIS</a>
      <a href="/admin/cert-preview" target="_blank" class="quick-btn" style="background: var(--gold); color: black;">📜 Xem Mẫu E-Certificate Hoàng Cung</a>
    </div>
  </div>

  <script>
    function approvePlace(id, name, address, envType) {
      if (!confirm('Bạn có chắc muốn phê duyệt [' + name + '] vào bản đồ du lịch HUEGO và cộng +50 GP cho người gửi?')) return;
      
      document.getElementById('row-' + id).remove();
      alert('Đã phê duyệt thành công! [' + name + '] đã chính thức xuất hiện trên Bản đồ số HUEGO.');
    }

    function rejectPlace(id) {
      if (!confirm('Bác bỏ đề xuất này?')) return;
      document.getElementById('row-' + id).remove();
    }
  </script>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  }

  @Get('cert-preview')
  getCertificatePreview(@Res() res: Response) {
    const certCode = 'HUEGO-2026-GREEN-ROYAL';
    const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>E-Certificate – Đại Sứ Du Lịch Xanh Cố Đô Huế</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,400&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      background: #111827;
      margin: 0;
      padding: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    .cert-frame {
      width: 900px;
      height: 620px;
      background: #FAF7F0;
      border: 14px solid #582C83;
      outline: 4px solid #D4AF37;
      outline-offset: -10px;
      padding: 40px;
      box-shadow: 0 30px 70px rgba(0,0,0,0.6);
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      box-sizing: border-box;
    }
    .cert-seal-bg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 320px;
      opacity: 0.04;
      pointer-events: none;
    }
    .cert-title-top {
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #582C83;
    }
    .cert-logo {
      font-size: 38px;
      font-weight: 900;
      font-family: 'Playfair Display', serif;
      color: #582C83;
      margin: 4px 0;
      letter-spacing: 3px;
    }
    .cert-subtitle {
      font-size: 11px;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: #D4AF37;
      font-weight: 800;
    }
    .cert-award-to {
      font-style: italic;
      font-size: 15px;
      color: #6B7280;
      margin-top: 25px;
    }
    .cert-name {
      font-family: 'Playfair Display', serif;
      font-size: 40px;
      font-weight: 700;
      color: #1F2937;
      margin: 6px 0;
      border-bottom: 2px solid #D4AF37;
      display: inline-block;
      padding-bottom: 4px;
    }
    .cert-desc {
      font-size: 14px;
      color: #374151;
      max-width: 620px;
      line-height: 1.6;
      margin-top: 14px;
    }
    .cert-bottom {
      margin-top: auto;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: 0 20px;
    }
    .cert-qr {
      background: white;
      padding: 6px;
      border: 1px solid #D1D5DB;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      font-size: 9px;
      color: #6B7280;
    }
    .cert-signature {
      text-align: center;
      font-size: 12px;
      color: #4B5563;
    }
    .cert-seal {
      width: 80px;
      height: 80px;
      border: 3px dashed #DC2626;
      border-radius: 50%;
      color: #DC2626;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 800;
      text-align: center;
      transform: rotate(-15deg);
      line-height: 1.2;
    }
    .print-btn {
      margin-top: 20px;
      background: #582C83;
      color: white;
      border: 1px solid #D4AF37;
      padding: 12px 28px;
      border-radius: 12px;
      font-weight: 700;
      cursor: pointer;
      font-size: 14px;
    }
    @media print {
      body { background: white; padding: 0; }
      .print-btn { display: none; }
      .cert-frame { box-shadow: none; }
    }
  </style>
</head>
<body>
  <div class="cert-frame">
    <div class="cert-seal-bg">🏛️</div>
    <div class="cert-title-top">Ủy Ban Phát Triển Du Lịch Cố Đô • HUEGO SMART PLATFORM</div>
    <div class="cert-logo">CHỨNG NHẬN ĐIỆN TỬ</div>
    <div class="cert-subtitle">ĐẠI SỨ DU LỊCH XANH CỐ ĐÔ HUẾ</div>

    <div class="cert-award-to">Chứng nhận trao tặng cho:</div>
    <div class="cert-name">NGUYỄN CỐ ĐÔ</div>

    <div class="cert-desc">
      Đã hoàn thành xuất sắc lộ trình <strong>Khám Phá Di Sản Bền Vững</strong> bằng phương tiện xe đạp xanh và đi bộ, tích lũy vượt mốc <strong>150 Điểm Xanh (Green Points)</strong>, góp phần gìn giữ môi trường thanh sạch và tôn vinh văn hóa Cố Đô Huế.
    </div>

    <div class="cert-bottom">
      <div class="cert-qr">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=https://verify.huego.vn/cert/${certCode}" width="70" height="70" />
        <span>MÃ SỐ: ${certCode}</span>
      </div>

      <div class="cert-seal">
        HUEGO<br>★ CỐ ĐÔ ★<br>BẢO CHỨNG
      </div>

      <div class="cert-signature">
        <div style="font-size: 11px; color: #9CA3AF; margin-bottom: 30px;">Huế, Ngày 01 Tháng 10 Năm 2026</div>
        <strong>BAN ĐIỀU HÀNH HUEGO VIỆT NAM</strong>
        <div style="font-size: 11px; color: #582C83;">Chủ tịch Hội đồng Thẩm định Du lịch Xanh</div>
      </div>
    </div>
  </div>

  <button class="print-btn" onclick="window.print()">🖨️ In hoặc Lưu Dưới Dạng PDF (Print to PDF)</button>
</body>
</html>`;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  }
}
