import axios from 'axios';
import { Pool } from 'pg';

describe('API Flow Test (Sử dụng DB thật)', () => {
  const baseURL = 'http://localhost:3000/api/v1';
  let token = '';
  let pool: Pool;
  let place: any;

  beforeAll(async () => {
    pool = new Pool({ connectionString: 'postgres://postgres:huego_secure_password_2026@localhost:5432/huego_db' });
    const placeRes = await pool.query(`SELECT id, latitude, longitude, name FROM places WHERE name LIKE '%Thiên Mụ%' LIMIT 1`);
    place = placeRes.rows[0];
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
      longitude: place.longitude
    }, { headers });
    expect(unlockRes.status).toBe(201);
    expect(unlockRes.data.unlocked).toBe(true);
    expect(unlockRes.data.rewardPoints).toBe(50);
  });

  it('3. Unlock thất bại vì đã unlock', async () => {
    const headers = { Authorization: 'Bearer ' + token };
    const unlockRes = await axios.post(`${baseURL}/geofencing/unlock`, {
      latitude: place.latitude + 0.0001,
      longitude: place.longitude
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
});
