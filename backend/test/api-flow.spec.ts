import axios from 'axios';
import { Pool } from 'pg';
import * as FormData from 'form-data';

describe('API Flow Test (Sử dụng PostgreSQL thật)', () => {
  const baseURL = 'http://localhost:3000/api/v1';
  let token = '';
  let pool: Pool;
  let place: any;
  let placeB: any;

  beforeAll(async () => {
    const dbName = process.env.DATABASE_NAME || 'huego_db';
    pool = new Pool({ connectionString: `postgres://postgres:huego_secure_password_2026@localhost:5432/${dbName}` });
    const placeRes = await pool.query(`SELECT id, latitude, longitude, name, "geofenceRadiusMeters" FROM places WHERE slug = 'chua-thien-mu' OR name LIKE '%Thiên Mụ%' LIMIT 1`);
    place = placeRes.rows[0];

    const placeBRes = await pool.query(`SELECT id, latitude, longitude, name FROM places WHERE id != $1 LIMIT 1`, [place.id]);
    placeB = placeBRes.rows[0];
  });

  afterAll(async () => {
    await pool.end();
  });

  it('1. Đăng ký người dùng', async () => {
    const email = 'test.flow.' + Date.now() + '@huego.vn';
    const res = await axios.post(`${baseURL}/auth/register`, { email, password: 'Password123!', fullName: 'User Flow' });
    expect(res.status).toBe(201);
    token = res.data.accessToken;
    expect(token).toBeDefined();
  });

  it('2. Unlock thành công khi ở gần', async () => {
    const headers = { Authorization: 'Bearer ' + token };
    const unlockRes = await axios.post(`${baseURL}/geofencing/unlock`, {
      latitude: place.latitude + 0.0001,
      longitude: place.longitude,
      placeId: place.id,
      accuracy: 10,
    }, { headers });
    expect(unlockRes.status).toBe(201);
    expect(unlockRes.data.unlocked).toBe(true);
    expect(unlockRes.data.rewardPoints).toBe(50);
  });

  it('3. Unlock thất bại vì đã unlock', async () => {
    const headers = { Authorization: 'Bearer ' + token };
    const unlockRes = await axios.post(`${baseURL}/geofencing/unlock`, {
      latitude: place.latitude + 0.0001,
      longitude: place.longitude,
      placeId: place.id,
      accuracy: 10,
    }, { headers });
    expect(unlockRes.status).toBe(201);
    expect(unlockRes.data.unlocked).toBe(false);
    expect(unlockRes.data.message).toContain('trước đó rồi');
  });

  it('4. Unlock thất bại vì quá xa', async () => {
    const headers = { Authorization: 'Bearer ' + token };
    const unlockRes = await axios.post(`${baseURL}/geofencing/unlock`, {
      latitude: place.latitude + 0.1,
      longitude: place.longitude + 0.1
    }, { headers });
    expect(unlockRes.status).toBe(201);
    expect(unlockRes.data.unlocked).toBe(false);
    expect(unlockRes.data.message).toContain('chưa vào đủ gần');
  });

  it('5. User đọc hồ sơ của chính mình qua /gamification/me thành công', async () => {
    const headers = { Authorization: 'Bearer ' + token };
    const meRes = await axios.get(`${baseURL}/gamification/me`, { headers });
    expect(meRes.status).toBe(200);
    expect(meRes.data.points).toBeGreaterThanOrEqual(50);
  });

  it('6. Bảo vệ IDOR: User B không đọc được hồ sơ của User A qua /gamification/profile/:userId', async () => {
    const userARes = await axios.get(`${baseURL}/auth/me`, { headers: { Authorization: 'Bearer ' + token } });
    const userAId = userARes.data.id;

    const emailB = 'test.userb.' + Date.now() + '@huego.vn';
    const resB = await axios.post(`${baseURL}/auth/register`, { email: emailB, password: 'Password123!', fullName: 'User B' });
    const tokenB = resB.data.accessToken;

    try {
      await axios.get(`${baseURL}/gamification/profile/${userAId}`, {
        headers: { Authorization: 'Bearer ' + tokenB }
      });
      throw new Error('Should have failed with 403 Forbidden');
    } catch (err: any) {
      expect(err.response?.status).toBe(403);
      expect(err.response?.data?.message).toContain('Bạn không có quyền');
    }
  });

  it('7. Mở khóa vùng chồng lấn bằng placeId (Đại Nội & Điện Thái Hòa)', async () => {
    const headers = { Authorization: 'Bearer ' + token };
    const daiNoiRes = await pool.query(`SELECT id, latitude, longitude FROM places WHERE slug = 'dai-noi-hue' OR id = '8f8b0596-f5ee-449e-8c31-9cb6be62b662' LIMIT 1`);
    const daiNoi = daiNoiRes.rows[0];

    // Mở khóa Đại Nội chỉ định placeId
    const res1 = await axios.post(`${baseURL}/geofencing/unlock`, {
      latitude: daiNoi.latitude,
      longitude: daiNoi.longitude,
      placeId: daiNoi.id,
      accuracy: 10,
    }, { headers });
    expect(res1.status).toBe(201);
    expect(res1.data.unlocked).toBe(true);

    // Mở khóa tiếp Điện Thái Hòa tại cùng vùng tọa độ
    const thaiHoaRes = await pool.query(`SELECT id, latitude, longitude FROM places WHERE slug = 'dien-thai-hoa' OR id = 'heritage-dien-thai-hoa' LIMIT 1`);
    if (thaiHoaRes.rows.length > 0) {
      const thaiHoa = thaiHoaRes.rows[0];
      const res2 = await axios.post(`${baseURL}/geofencing/unlock`, {
        latitude: thaiHoa.latitude,
        longitude: thaiHoa.longitude,
        placeId: thaiHoa.id,
        accuracy: 10,
      }, { headers });
      expect(res2.status).toBe(201);
      expect(res2.data.unlocked).toBe(true);
    }
  });

  it('8. Ranh giới múi giờ Việt Nam (Asia/Ho_Chi_Minh) & Trần 500 điểm/ngày', async () => {
    const emailCap = 'test.dailycap.' + Date.now() + '@huego.vn';
    const resCap = await axios.post(`${baseURL}/auth/register`, { email: emailCap, password: 'Password123!', fullName: 'User Cap' });
    const tokenCap = resCap.data.accessToken;
    const userIdCap = resCap.data.user.id;
    const headers = { Authorization: 'Bearer ' + tokenCap };

    // Điểm ngày hôm qua (23:30 giờ VN) không được tính vào trần hôm nay
    const VIETNAM_OFFSET_MS = 7 * 60 * 60 * 1000;
    const now = new Date();
    const vnNow = new Date(now.getTime() + VIETNAM_OFFSET_MS);
    // Hôm qua 23:30 giờ VN
    const yesterdayVN = new Date(Date.UTC(vnNow.getUTCFullYear(), vnNow.getUTCMonth(), vnNow.getUTCDate() - 1, 16, 30, 0)); // 16:30 UTC = 23:30 VN

    const dummyPlaceRes = await pool.query(`SELECT id, latitude, longitude, "greenRewardPoints" FROM places WHERE id != $1 AND id != $2 LIMIT 2`, [place.id, placeB.id]);
    const placeC = dummyPlaceRes.rows[0];
    const placeD = dummyPlaceRes.rows[1];

    await pool.query(`DELETE FROM user_unlocks WHERE "userId" = $1`, [userIdCap]);

    await pool.query(`
      INSERT INTO user_unlocks ("id", "userId", "placeId", "pointsAwarded", "distanceMeters", "unlockedAt")
      VALUES (uuid_generate_v4(), $1, $2, 450, 10, NOW() - INTERVAL '2 days');
    `, [userIdCap, placeC.id]);

    // Chèn 480 điểm vào hôm nay
    await pool.query(`
      INSERT INTO user_unlocks ("id", "userId", "placeId", "pointsAwarded", "distanceMeters", "unlockedAt")
      VALUES (uuid_generate_v4(), $1, $2, 480, 10, NOW() - INTERVAL '30 minutes');
    `, [userIdCap, placeD.id]);

    // Mở khóa địa danh 50 điểm -> Vượt quá 500 điểm/ngày
    const resUnlock = await axios.post(`${baseURL}/geofencing/unlock`, {
      latitude: place.latitude + 0.0001,
      longitude: place.longitude,
      placeId: place.id,
      accuracy: 10,
    }, { headers });

    expect(resUnlock.status).toBe(201);
    expect(resUnlock.data.unlocked).toBe(false);
    expect(resUnlock.data.message).toContain('Hôm nay bạn đã nhận 480/500 điểm, mở khóa này');
    expect(resUnlock.data.message).toContain('sẽ vượt giới hạn');
  });

  it('9. Ràng buộc Khóa ngoại (Foreign Key) trên PostgreSQL thật: Chèn placeId không tồn tại bị từ chối', async () => {
    try {
      await pool.query(`
        INSERT INTO user_unlocks ("id", "userId", "placeId", "pointsAwarded", "distanceMeters", "unlockedAt")
        VALUES (uuid_generate_v4(), '00000000-0000-0000-0000-000000000001', 'non-existent-place-id-999', 50, 10, NOW());
      `);
      throw new Error('Chèn thành công bản ghi không tồn tại - Thất bại');
    } catch (err: any) {
      expect(err.code).toBe('23503'); // foreign_key_violation
      expect(err.constraint).toBe('FK_user_unlocks_placeId');
    }
  });

  it('10. Upload ảnh minh chứng: File giả mạo (Text mạo danh .png) bị từ chối bởi Magic Bytes', async () => {
    const form = new FormData();
    const fakePngBuffer = Buffer.from('This is fake text, not a PNG image file');
    form.append('file', fakePngBuffer, { filename: 'fake_image.png', contentType: 'image/png' });

    try {
      await axios.post(`${baseURL}/crowdsource/upload`, form, {
        headers: {
          ...form.getHeaders(),
          Authorization: 'Bearer ' + token,
        },
      });
      throw new Error('Should have failed with 400 Bad Request');
    } catch (err: any) {
      expect(err.response?.status).toBe(400);
      expect(err.response?.data?.message).toContain('magic bytes không đúng');
    }
  });
});
