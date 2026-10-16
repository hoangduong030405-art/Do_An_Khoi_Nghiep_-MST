import axios from 'axios';
import { Pool } from 'pg';

describe('Crowdsource Flow Test (Sử dụng PostgreSQL thật)', () => {
  const baseURL = 'http://localhost:3000/api/v1';
  let pool: Pool;
  let userToken: string;
  let userId: string;
  let adminToken: string;
  let submissionId: string;

  beforeAll(async () => {
    const dbName = process.env.DATABASE_NAME || 'huego_db';
    pool = new Pool({
      connectionString: `postgres://postgres:huego_secure_password_2026@localhost:5432/${dbName}`,
    });

    // Tạo user thường
    const email = `test.crowd.${Date.now()}@huego.vn`;
    const regRes = await axios.post(`${baseURL}/auth/register`, {
      email,
      password: 'Password123!',
      fullName: 'Du Khách Đóng Góp',
    });
    userToken = regRes.data.accessToken;
    userId = regRes.data.user.id;

    // Đăng nhập tài khoản admin
    const adminRes = await axios.post(`${baseURL}/auth/login`, {
      email: 'tourist.demo@huego.vn',
      password: 'Huego@2026',
    });
    adminToken = adminRes.data.accessToken;
  });

  afterAll(async () => {
    await pool.end();
  });

  it('1. Du khách gửi đề xuất địa điểm mới vào CSDL', async () => {
    const res = await axios.post(
      `${baseURL}/crowdsource/submit`,
      {
        userId,
        placeName: 'Tiệm Bánh Ép Cầu Hai Nổi Tiếng',
        address: '12 Bà Triệu, TP Huế',
        latitude: 16.4630,
        longitude: 107.5950,
        environmentType: 'INDOOR',
        categoryCode: 'CUISINE',
        description: 'Bánh ép nóng giòn ăn kèm rau sống chua ngọt gia truyền xứ Huế.',
      },
      { headers: { Authorization: `Bearer ${userToken}` } },
    );

    expect(res.status).toBe(201);
    expect(res.data.id).toBeDefined();
    submissionId = res.data.id;

    // Kiểm tra trực tiếp trong PostgreSQL thật
    const dbRes = await pool.query(
      `SELECT * FROM crowdsource_submissions WHERE id = $1`,
      [submissionId],
    );
    expect(dbRes.rows.length).toBe(1);
    expect(dbRes.rows[0].status).toBe('PENDING');
    expect(dbRes.rows[0].name).toBe('Tiệm Bánh Ép Cầu Hai Nổi Tiếng');
  });

  it('2. Admin duyệt đề xuất và cộng điểm thưởng xanh', async () => {
    const approveRes = await axios.post(
      `${baseURL}/crowdsource/${submissionId}/approve`,
      { pointsAwarded: 30 },
      { headers: { Authorization: `Bearer ${adminToken}` } },
    );

    expect(approveRes.status).toBe(201);
    expect(approveRes.data.success).toBe(true);

    // Kiểm tra trong PostgreSQL thật
    const dbSub = await pool.query(
      `SELECT status, "pointsAwarded" FROM crowdsource_submissions WHERE id = $1`,
      [submissionId],
    );
    expect(dbSub.rows[0].status).toBe('APPROVED');
    expect(dbSub.rows[0].pointsAwarded).toBe(30);

    // Kiểm tra điểm thưởng xanh của người dùng trong bảng user_points
    const dbPts = await pool.query(
      `SELECT points FROM user_points WHERE "userId" = $1`,
      [userId],
    );
    expect(dbPts.rows[0].points).toBe(30);
  });

  it('3. Không cho phép duyệt lần thứ hai để tránh cộng điểm 2 lần', async () => {
    const secondApproveRes = await axios.post(
      `${baseURL}/crowdsource/${submissionId}/approve`,
      { pointsAwarded: 30 },
      { headers: { Authorization: `Bearer ${adminToken}` } },
    );

    // Endpoint trả về success: false hoặc cảnh báo không cộng lại
    expect(secondApproveRes.data.success).toBe(false);
    expect(secondApproveRes.data.message).toContain('trước đó rồi');

    // Kiểm tra lại điểm trong DB: vẫn là 30, không bị nhân đôi lên 60
    const dbPts = await pool.query(
      `SELECT points FROM user_points WHERE "userId" = $1`,
      [userId],
    );
    expect(dbPts.rows[0].points).toBe(30);
  });
});
