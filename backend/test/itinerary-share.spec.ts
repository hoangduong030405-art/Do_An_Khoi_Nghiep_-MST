import axios from 'axios';
import { Pool } from 'pg';
import * as crypto from 'crypto';
import { resolvePublicBaseUrl } from '../src/modules/itinerary/utils/share-url.util';

describe('Itinerary Share Flow & Privacy Test (PostgreSQL Thật)', () => {
  const baseURL = 'http://localhost:3000/api/v1';
  const publicBaseURL = 'http://localhost:3000';
  let pool: Pool;

  let userAToken: string;
  let userAId: string;
  let userBToken: string;
  let userBId: string;

  let placeA: any;
  let placeB: any;
  let itineraryAId: string;
  let rawShareToken: string = '';
  let shareUrl: string = '';

  beforeAll(async () => {
    const dbName = process.env.DATABASE_NAME || 'huego_db_lock_demo';
    pool = new Pool({
      connectionString: `postgres://postgres:huego_secure_password_2026@localhost:5432/${dbName}`,
    });

    // 1. Tạo 2 users riêng biệt
    const emailA = `test.user.a.${Date.now()}@huego.vn`;
    const regA = await axios.post(`${baseURL}/auth/register`, {
      email: emailA,
      password: 'Password123!',
      fullName: 'Hoàng Thái Tử An',
    });
    userAToken = regA.data.accessToken;
    userAId = regA.data.user.id;

    const emailB = `test.user.b.${Date.now()}@huego.vn`;
    const regB = await axios.post(`${baseURL}/auth/register`, {
      email: emailB,
      password: 'Password123!',
      fullName: 'Du Khách Bình',
    });
    userBToken = regB.data.accessToken;
    userBId = regB.data.user.id;

    // Lấy 2 địa danh thực tế từ CSDL
    const placesRes = await pool.query('SELECT id, name FROM places LIMIT 2');
    placeA = placesRes.rows[0];
    placeB = placesRes.rows[1];

    // Tạo lộ trình A cho User A
    const itinRes = await axios.post(
      `${baseURL}/itinerary`,
      {
        title: 'Hành Trình Di Sản Cố Đô Của An <script>alert("xss")</script>',
        date: '2026-11-01',
        placeIds: [placeA.id, placeB.id],
      },
      { headers: { Authorization: `Bearer ${userAToken}` } },
    );
    itineraryAId = itinRes.data.id;

    // Thêm ghi chú riêng tư vào stop đầu tiên trực tiếp trong DB để kiểm tra bảo mật
    await pool.query(
      'UPDATE itinerary_stops SET note = $1 WHERE "itineraryId" = $2 AND "placeId" = $3',
      ['Ghi chú riêng tư: Mua quà cho gia đình', itineraryAId, placeA.id],
    );
  });

  afterAll(async () => {
    await pool.end();
  });

  // (a) Chủ tạo link, nhận shareUrl, token thô không có trong DB (chỉ băm SHA-256)
  it('(a) Chủ tạo link chia sẻ, nhận shareUrl đầy đủ, chỉ lưu hash trong DB', async () => {
    const res = await axios.post(
      `${baseURL}/itinerary/${itineraryAId}/share`,
      {
        expiresInDays: 30,
        includeNotes: false,
        allowCopy: true,
      },
      { headers: { Authorization: `Bearer ${userAToken}` } },
    );

    expect(res.status).toBe(201);
    expect(res.data.shareUrl).toBeDefined();
    expect(res.data.expiresAt).toBeDefined();
    expect(res.data.allowCopy).toBe(true);
    expect(res.data.includeNotes).toBe(false);

    shareUrl = res.data.shareUrl;
    const parts = shareUrl.split('/s/');
    expect(parts.length).toBe(2);
    rawShareToken = parts[1];
    expect(rawShareToken.length).toBeGreaterThanOrEqual(30);

    const expectedHash = crypto.createHash('sha256').update(rawShareToken).digest('hex');
    const dbCheck = await pool.query(
      'SELECT * FROM itinerary_shares WHERE "itineraryId" = $1 AND "revokedAt" IS NULL',
      [itineraryAId],
    );
    expect(dbCheck.rows.length).toBe(1);
    expect(dbCheck.rows[0].tokenHash).toBe(expectedHash);
    expect(JSON.stringify(dbCheck.rows[0])).not.toContain(rawShareToken);
  });

  // (b) GET công khai trả đúng dữ liệu, KHÔNG có email, userId, qrToken, điểm
  it('(b) GET /api/v1/shared/:token trả dữ liệu công khai, không lộ thông tin nhạy cảm', async () => {
    const res = await axios.get(`${baseURL}/shared/${rawShareToken}`);
    expect(res.status).toBe(200);

    const data = res.data;
    expect(data.title).toContain('Hành Trình Di Sản Cố Đô Của An');
    expect(data.sharedBy).toBe('Hoàng Thái Tử An');
    expect(data.stops.length).toBe(2);
    expect(data.totalDistanceKm).toBeGreaterThanOrEqual(0);
    expect(data.allowCopy).toBe(true);

    const rawJson = JSON.stringify(data);
    expect(rawJson).not.toContain(userAId);
    expect(rawJson).not.toContain('@huego.vn');
    expect(rawJson).not.toContain('qrToken');
    expect(rawJson).not.toContain('greenPoints');
    expect(rawJson).not.toContain('green_points');
  });

  // (c) includeNotes=false thì không trả ghi chú, bằng true thì có
  it('(c) includeNotes=false không trả ghi chú, PATCH sang true thì có trả', async () => {
    const resOff = await axios.get(`${baseURL}/shared/${rawShareToken}`);
    expect(resOff.data.stops[0].note).toBeUndefined();

    const patchRes = await axios.patch(
      `${baseURL}/itinerary/${itineraryAId}/share`,
      { includeNotes: true },
      { headers: { Authorization: `Bearer ${userAToken}` } },
    );
    expect(patchRes.status).toBe(200);
    expect(patchRes.data.includeNotes).toBe(true);

    const resOn = await axios.get(`${baseURL}/shared/${rawShareToken}`);
    expect(resOn.data.stops[0].note).toBe('Ghi chú riêng tư: Mua quà cho gia đình');
  });

  // (d) token sai, hết hạn, đã thu hồi đều trả CÙNG một phản hồi 404
  it('(d) Token sai, hết hạn, đã thu hồi đều trả CÙNG một phản hồi 404 thống nhất', async () => {
    // 1. Token sai
    try {
      await axios.get(`${baseURL}/shared/invalid-random-token-12345`);
      fail('Cần trả về 404 cho token sai');
    } catch (err: any) {
      expect(err.response.status).toBe(404);
      expect(err.response.data.message).toBe('Liên kết không tồn tại hoặc đã hết hạn');
    }

    // 2. Tạo link hết hạn ngay
    const expiredRes = await axios.post(
      `${baseURL}/itinerary/${itineraryAId}/share`,
      { expiresInDays: 1 },
      { headers: { Authorization: `Bearer ${userAToken}` } },
    );
    const expToken = expiredRes.data.shareUrl.split('/s/')[1];
    await pool.query(
      'UPDATE itinerary_shares SET "expiresAt" = now() - interval \'1 day\' WHERE "tokenHash" = $1',
      [crypto.createHash('sha256').update(expToken).digest('hex')],
    );

    try {
      await axios.get(`${baseURL}/shared/${expToken}`);
      fail('Cần trả về 404 cho token hết hạn');
    } catch (err: any) {
      expect(err.response.status).toBe(404);
      expect(err.response.data.message).toBe('Liên kết không tồn tại hoặc đã hết hạn');
    }

    // 3. Link đã thu hồi
    await axios.delete(`${baseURL}/itinerary/${itineraryAId}/share`, {
      headers: { Authorization: `Bearer ${userAToken}` },
    });

    try {
      await axios.get(`${baseURL}/shared/${expToken}`);
      fail('Cần trả về 404 cho link đã thu hồi');
    } catch (err: any) {
      expect(err.response.status).toBe(404);
      expect(err.response.data.message).toBe('Liên kết không tồn tại hoặc đã hết hạn');
    }
  });

  // (e) user B không tạo/xem/thu hồi link của lộ trình user A (403/404)
  it('(e) User B không thể tạo, xem trạng thái, hoặc thu hồi link của User A (403)', async () => {
    const newShare = await axios.post(
      `${baseURL}/itinerary/${itineraryAId}/share`,
      { expiresInDays: 30, allowCopy: true },
      { headers: { Authorization: `Bearer ${userAToken}` } },
    );
    rawShareToken = newShare.data.shareUrl.split('/s/')[1];

    try {
      await axios.post(
        `${baseURL}/itinerary/${itineraryAId}/share`,
        { expiresInDays: 30 },
        { headers: { Authorization: `Bearer ${userBToken}` } },
      );
      fail('User B phải nhận 403');
    } catch (err: any) {
      expect(err.response.status).toBe(403);
    }

    try {
      await axios.get(`${baseURL}/itinerary/${itineraryAId}/share`, {
        headers: { Authorization: `Bearer ${userBToken}` },
      });
      fail('User B phải nhận 403');
    } catch (err: any) {
      expect(err.response.status).toBe(403);
    }

    try {
      await axios.delete(`${baseURL}/itinerary/${itineraryAId}/share`, {
        headers: { Authorization: `Bearer ${userBToken}` },
      });
      fail('User B phải nhận 403');
    } catch (err: any) {
      expect(err.response.status).toBe(403);
    }
  });

  // (f) sau khi chủ sửa lộ trình, link hiển thị bản mới
  it('(f) Sau khi chủ sửa lộ trình, link công khai phản ánh bản mới nhất (Dynamic)', async () => {
    await axios.put(
      `${baseURL}/itinerary/${itineraryAId}/stops`,
      { placeIds: [placeA.id] },
      { headers: { Authorization: `Bearer ${userAToken}` } },
    );

    const res = await axios.get(`${baseURL}/shared/${rawShareToken}`);
    expect(res.data.stops.length).toBe(1);
    expect(res.data.stops[0].placeId).toBe(placeA.id);
  });

  // (g) xóa lộ trình thì link vô hiệu (CASCADE)
  it('(g) Xóa lộ trình thì link chia sẻ lập tức vô hiệu hóa', async () => {
    const tempItin = await axios.post(
      `${baseURL}/itinerary`,
      { title: 'Lộ trình tạm', date: '2026-11-05', placeIds: [placeA.id] },
      { headers: { Authorization: `Bearer ${userAToken}` } },
    );
    const tempShare = await axios.post(
      `${baseURL}/itinerary/${tempItin.data.id}/share`,
      {},
      { headers: { Authorization: `Bearer ${userAToken}` } },
    );
    const tempToken = tempShare.data.shareUrl.split('/s/')[1];

    await axios.delete(`${baseURL}/itinerary/${tempItin.data.id}`, {
      headers: { Authorization: `Bearer ${userAToken}` },
    });

    try {
      await axios.get(`${baseURL}/shared/${tempToken}`);
      fail('Link phải vô hiệu sau khi xóa lộ trình');
    } catch (err: any) {
      expect(err.response.status).toBe(404);
    }
  });

  // (h) sao chép: cần JWT, allowCopy=false bị từ chối, bản sao thuộc về người sao chép
  it('(h) Sao chép lộ trình sang tài khoản người xem (yêu cầu JWT, kiểm tra allowCopy)', async () => {
    try {
      await axios.post(`${baseURL}/shared/${rawShareToken}/copy`);
      fail('Cần 401 khi không có JWT');
    } catch (err: any) {
      expect(err.response.status).toBe(401);
    }

    const copyRes = await axios.post(
      `${baseURL}/shared/${rawShareToken}/copy`,
      {},
      { headers: { Authorization: `Bearer ${userBToken}` } },
    );
    expect(copyRes.status).toBe(201);
    expect(copyRes.data.newItineraryId).toBeDefined();
    expect(copyRes.data.title).toContain('Bản sao:');

    const bItin = await axios.get(`${baseURL}/itinerary/${copyRes.data.newItineraryId}`, {
      headers: { Authorization: `Bearer ${userBToken}` },
    });
    expect(bItin.data.userId).toBe(userBId);

    await axios.patch(
      `${baseURL}/itinerary/${itineraryAId}/share`,
      { allowCopy: false },
      { headers: { Authorization: `Bearer ${userAToken}` } },
    );

    try {
      await axios.post(
        `${baseURL}/shared/${rawShareToken}/copy`,
        {},
        { headers: { Authorization: `Bearer ${userBToken}` } },
      );
      fail('Phải bị từ chối khi allowCopy = false');
    } catch (err: any) {
      expect(err.response.status).toBe(400);
      expect(err.response.data.message).toContain('không cho phép sao chép');
    }
  });

  // (j) viewCount tăng tối đa 1 lần mỗi IP mỗi giờ
  it('(j) viewCount tăng tối đa 1 lần cho cùng một IP trong vòng 1 giờ', async () => {
    const hash = crypto.createHash('sha256').update(rawShareToken).digest('hex');
    const beforeRes = await pool.query(
      'SELECT "viewCount" FROM itinerary_shares WHERE "tokenHash" = $1',
      [hash],
    );
    const initialCount = beforeRes.rows[0].viewCount;

    // Xem 3 lần liên tiếp với cùng header IP giả lập
    const simIp = '198.51.100.42';
    await axios.get(`${baseURL}/shared/${rawShareToken}`, { headers: { 'cf-connecting-ip': simIp } });
    await axios.get(`${baseURL}/shared/${rawShareToken}`, { headers: { 'cf-connecting-ip': simIp } });
    await axios.get(`${baseURL}/shared/${rawShareToken}`, { headers: { 'cf-connecting-ip': simIp } });

    const dbRes = await pool.query(
      'SELECT "viewCount" FROM itinerary_shares WHERE "tokenHash" = $1',
      [hash],
    );
    expect(dbRes.rows[0].viewCount).toBe(initialCount + 1);
  });

  // (k) token chứa ký tự XSS trong tiêu đề lộ trình được thoát đúng trên trang /s/:token
  it('(k) Trang /s/:token thoát ký tự XSS an toàn và không thực thi mã độc', async () => {
    const pageRes = await axios.get(`${publicBaseURL}/s/${rawShareToken}`);
    expect(pageRes.status).toBe(200);
    expect(pageRes.headers['content-type']).toContain('text/html');

    const html = pageRes.data;
    expect(html).not.toContain('<script>alert("xss")</script>');
    expect(html).toContain('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
  });

  // (l) Tiêu đề phản hồi có Referrer-Policy, X-Robots-Tag, Cache-Control đúng
  it('(l) Phản hồi trang công khai và API có đầy đủ các tiêu đề an toàn', async () => {
    const pageRes = await axios.get(`${publicBaseURL}/s/${rawShareToken}`);
    expect(pageRes.headers['referrer-policy']).toBe('strict-origin');
    expect(pageRes.headers['x-robots-tag']).toBe('noindex, nofollow');
    expect(pageRes.headers['cache-control']).toContain('no-store');
    expect(pageRes.headers['x-content-type-options']).toBe('nosniff');

    const apiRes = await axios.get(`${baseURL}/shared/${rawShareToken}`);
    expect(apiRes.headers['referrer-policy']).toBe('no-referrer');
    expect(apiRes.headers['x-robots-tag']).toBe('noindex, nofollow');
    expect(apiRes.headers['cache-control']).toContain('no-store');
  });

  // (m) Khóa ngoại: không tạo được share cho itineraryId không tồn tại
  it('(m) Không thể tạo share cho itineraryId không tồn tại trong CSDL', async () => {
    const fakeUuid = '00000000-0000-0000-0000-000000000000';
    try {
      await axios.post(
        `${baseURL}/itinerary/${fakeUuid}/share`,
        {},
        { headers: { Authorization: `Bearer ${userAToken}` } },
      );
      fail('Cần trả về 404 cho itinerary không tồn tại');
    } catch (err: any) {
      expect([404, 400]).toContain(err.response.status);
    }
  });

  // (i) Rate limit trả 429 khi vượt quá giới hạn (dùng IP riêng để không ảnh hưởng bài test khác)
  it('(i) Rate limit trả 429 khi gửi lượng yêu cầu dồn dập từ cùng IP', async () => {
    const spamIp = '203.0.113.88';
    let hit429 = false;
    for (let i = 0; i < 110; i++) {
      try {
        await axios.get(`${baseURL}/shared/${rawShareToken}`, {
          headers: { 'cf-connecting-ip': spamIp },
        });
      } catch (err: any) {
        if (err.response && err.response.status === 429) {
          hit429 = true;
          break;
        }
      }
    }
    expect(hit429).toBe(true);
  });

  // (n) Quyền riêng tư: Không rò rỉ tọa độ xuất phát GPS hoặc thông tin nhạy cảm của người dùng
  it('(n) Không rò rỉ tọa độ xuất phát GPS hoặc thông tin cá nhân của chủ sở hữu khi chia sẻ', async () => {
    const gpsLat = 16.489123;
    const gpsLng = 107.561234;
    // Tối ưu lộ trình với tọa độ xuất phát GPS (yêu cầu JWT)
    const optRes = await axios.post(
      `${baseURL}/itinerary/optimize`,
      {
        placeIds: [placeA.id, placeB.id],
        startLat: gpsLat,
        startLng: gpsLng,
      },
      { headers: { Authorization: `Bearer ${userAToken}` } },
    );
    expect(optRes.status).toBe(201);

    // Tạo lộ trình từ kết quả tối ưu
    const gpsItin = await axios.post(
      `${baseURL}/itinerary`,
      {
        title: 'Hành Trình Xuất Phát Từ Khách Sạn Riêng',
        date: '2026-11-10',
        placeIds: optRes.data.optimizedRoute,
      },
      { headers: { Authorization: `Bearer ${userAToken}` } },
    );

    const gpsShare = await axios.post(
      `${baseURL}/itinerary/${gpsItin.data.id}/share`,
      { expiresInDays: 30, includeNotes: false },
      { headers: { Authorization: `Bearer ${userAToken}` } },
    );
    const gpsToken = gpsShare.data.shareUrl.split('/s/')[1];

    // Kiểm tra dữ liệu JSON công khai
    const sharedJsonRes = await axios.get(`${baseURL}/shared/${gpsToken}`);
    const jsonStr = JSON.stringify(sharedJsonRes.data);
    expect(jsonStr).not.toContain(String(gpsLat));
    expect(jsonStr).not.toContain(String(gpsLng));
    expect(jsonStr).not.toContain(userAId);
    expect(jsonStr).not.toContain('email');

    // Kiểm tra HTML trang công khai
    const sharedHtmlRes = await axios.get(`${publicBaseURL}/s/${gpsToken}`);
    const htmlStr = sharedHtmlRes.data;
    expect(htmlStr).not.toContain(String(gpsLat));
    expect(htmlStr).not.toContain(String(gpsLng));
    expect(htmlStr).not.toContain(userAId);
  });

  // (o) Link đúng sau Proxy (X-Forwarded-* tạo link đúng https khi có cờ TRUST_PROXY / BEHIND_CLOUDFLARE)
  it('(o) Header X-Forwarded-* tạo shareUrl chuẩn HTTPS khi proxy trust được kích hoạt', async () => {
    // 1. Kiểm tra unit test hàm resolvePublicBaseUrl
    const originalEnv = { ...process.env };
    try {
      // Trường hợp 1: Có cấu hình PUBLIC_BASE_URL thì luôn ưu tiên dùng
      process.env.PUBLIC_BASE_URL = 'https://huego.vn';
      expect(resolvePublicBaseUrl({ headers: {} })).toBe('https://huego.vn');

      // Trường hợp 2: Không có PUBLIC_BASE_URL, TRUST_PROXY=true -> tin X-Forwarded-*
      delete process.env.PUBLIC_BASE_URL;
      process.env.TRUST_PROXY = 'true';
      delete process.env.BEHIND_CLOUDFLARE;
      const proxyReq = {
        headers: {
          'x-forwarded-proto': 'https',
          'x-forwarded-host': 'du-lich-hue.vn',
        },
        protocol: 'http',
      };
      expect(resolvePublicBaseUrl(proxyReq)).toBe('https://du-lich-hue.vn');

      // Trường hợp 3: Không có cờ proxy trust -> KHÔNG tin X-Forwarded-*, dùng origin/host gốc
      process.env.TRUST_PROXY = 'false';
      process.env.BEHIND_CLOUDFLARE = 'false';
      const untrustedReq = {
        headers: {
          'x-forwarded-proto': 'https',
          'x-forwarded-host': 'attacker-spoofed.com',
          host: 'localhost:3000',
        },
        protocol: 'http',
      };
      expect(resolvePublicBaseUrl(untrustedReq)).toBe('http://localhost:3000');
    } finally {
      process.env = originalEnv;
    }

    // 2. Kiểm tra qua API HTTP thật
    const resProxy = await axios.post(
      `${baseURL}/itinerary/${itineraryAId}/share`,
      { expiresInDays: 7 },
      { headers: { Authorization: `Bearer ${userAToken}` } },
    );
    expect(resProxy.status).toBe(201);
    expect(resProxy.data.shareUrl).toContain('/s/');
  });

  // (p) Hạn mức tạo share và copy trong database bền vững, không reset sau khởi động lại
  it('(p) Hạn mức chia sẻ được lưu trữ bền vững trong bảng itinerary_shares của PostgreSQL', async () => {
    const countRes = await pool.query(
      `SELECT count(*) FROM itinerary_shares WHERE "ownerId" = $1 AND (timezone('Asia/Ho_Chi_Minh', timezone('UTC', "createdAt")))::date = (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Ho_Chi_Minh')::date`,
      [userAId],
    );
    expect(parseInt(countRes.rows[0].count, 10)).toBeGreaterThan(0);
  });
});
