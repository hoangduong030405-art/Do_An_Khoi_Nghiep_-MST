import axios from 'axios';
import { Pool } from 'pg';

describe('QR Check Test (Sử dụng DB thật)', () => {
  const baseURL = 'http://localhost:3000/api/v1';
  let token = '';
  let pool: Pool;
  let place: any;

  beforeAll(async () => {
    const dbName = process.env.DATABASE_NAME || 'huego_db';
    pool = new Pool({ connectionString: `postgres://postgres:huego_secure_password_2026@localhost:5432/${dbName}` });
    const placeRes = await pool.query(`SELECT id, "qrToken", latitude, longitude, name FROM places WHERE name LIKE '%Khải Định%' LIMIT 1`);
    place = placeRes.rows[0];
  });

  afterAll(async () => {
    await pool.end();
  });

  it('1. Đăng ký người dùng', async () => {
    const email = 'test.qr.' + Date.now() + '@huego.vn';
    const res = await axios.post(`${baseURL}/auth/register`, { email, password: 'Password123!', fullName: 'User QR' });
    token = res.data.accessToken;
  });

  it('2. API /places không trả về qrToken', async () => {
    const headers = { Authorization: 'Bearer ' + token };
    const res = await axios.get(`${baseURL}/places`, { headers });
    expect(res.status).toBe(200);
    expect(res.data.length).toBeGreaterThan(0);
    expect(res.data[0].qrToken).toBeUndefined();
  });

  it('3. QR đúng mở khóa thành công dù ở xa', async () => {
    const headers = { Authorization: 'Bearer ' + token };
    const unlockRes = await axios.post(`${baseURL}/geofencing/unlock`, {
      latitude: place.latitude + 1.0, // Rất xa
      longitude: place.longitude + 1.0,
      qrToken: place.qrToken
    }, { headers });
    expect(unlockRes.status).toBe(201);
    expect(unlockRes.data.unlocked).toBe(true);
    expect(unlockRes.data.rewardPoints).toBe(50); // Khải Định is 50
  });

  it('4. QR sai bị từ chối', async () => {
    const headers = { Authorization: 'Bearer ' + token };
    // Create another user to test failure
    const email = 'test.qr.fail.' + Date.now() + '@huego.vn';
    const res = await axios.post(`${baseURL}/auth/register`, { email, password: 'Password123!', fullName: 'User QR Fail' });
    const failToken = res.data.accessToken;

    const unlockRes = await axios.post(`${baseURL}/geofencing/unlock`, {
      latitude: place.latitude + 1.0,
      longitude: place.longitude + 1.0,
      qrToken: 'wrong_token_1234567890'
    }, { headers: { Authorization: 'Bearer ' + failToken } });
    
    expect(unlockRes.status).toBe(201);
    expect(unlockRes.data.unlocked).toBe(false);
    expect(unlockRes.data.message).toContain('không hợp lệ');
  });
});
