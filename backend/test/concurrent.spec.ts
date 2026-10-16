import axios from 'axios';
import { Pool } from 'pg';

describe('Concurrent Test (Sử dụng DB thật)', () => {
  const baseURL = 'http://localhost:3000/api/v1';
  let token = '';
  let pool: Pool;
  let place: any;
  let userId: string;

  beforeAll(async () => {
    const dbName = process.env.DATABASE_NAME || 'huego_db';
    pool = new Pool({ connectionString: `postgres://postgres:huego_secure_password_2026@localhost:5432/${dbName}` });
    const placeRes = await pool.query(`SELECT id, latitude, longitude, name FROM places WHERE name LIKE '%Vọng Cảnh%' LIMIT 1`);
    place = placeRes.rows[0];
  });

  afterAll(async () => {
    await pool.end();
  });

  it('Gửi 10 yêu cầu unlock đồng thời, chỉ 1 yêu cầu thành công', async () => {
    const email = 'test.concurrent.' + Date.now() + '@huego.vn';
    const res = await axios.post(`${baseURL}/auth/register`, { email, password: 'Password123!', fullName: 'User Concurrent' });
    token = res.data.accessToken;
    userId = (await axios.get(`${baseURL}/auth/me`, { headers: { Authorization: 'Bearer ' + token } })).data.id;

    const headers = { Authorization: 'Bearer ' + token };
    const payload = { latitude: place.latitude + 0.0001, longitude: place.longitude };

    // Send 10 concurrent requests
    const promises = Array.from({ length: 10 }).map(() => axios.post(`${baseURL}/geofencing/unlock`, payload, { headers }));
    const results = await Promise.all(promises);

    const unlocked = results.filter(r => r.data.unlocked === true);
    const failed = results.filter(r => r.data.unlocked === false);

    expect(unlocked.length).toBe(1);
    expect(failed.length).toBe(9);

    const profileRes = await axios.get(`${baseURL}/gamification/me`, { headers });
    expect(profileRes.data.user.greenPoints).toBe(30); // Đồi Vọng Cảnh is 30 points
  });
});
