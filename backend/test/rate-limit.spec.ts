import axios from 'axios';

describe('Rate Limit IP Throttling Test (Cloudflare & Proxy Isolation)', () => {
  const baseURL = 'http://localhost:3000/api/v1';

  beforeAll(() => {
    // Kích hoạt nhận diện IP sau proxy / Cloudflare Tunnel
    process.env.BEHIND_CLOUDFLARE = 'true';
    process.env.TRUST_PROXY = 'true';
  });

  it('1. Một IP (IP_A) gửi quá số lượng request tối đa sẽ nhận HTTP 429', async () => {
    const ipA = `203.0.113.${Math.floor(Math.random() * 100 + 10)}`;
    let got429 = false;

    for (let i = 0; i < 15; i++) {
      try {
        await axios.post(
          `${baseURL}/auth/demo`,
          {},
          {
            headers: {
              'CF-Connecting-IP': ipA,
              'X-Forwarded-For': ipA,
            },
          },
        );
      } catch (err: any) {
        if (err.response?.status === 429) {
          got429 = true;
          expect(err.response.status).toBe(429);
          break;
        }
      }
    }
    expect(got429).toBe(true);
  }, 10000);

  it('2. Hai IP khác nhau không chặn lẫn nhau (IP_B gửi thành công dù IP_A bị 429)', async () => {
    const ipA = `198.51.100.${Math.floor(Math.random() * 100 + 10)}`;
    const ipB = `198.51.100.${Math.floor(Math.random() * 100 + 110)}`;

    // Bước 1: Gửi liên tục từ IP_A đến khi bị 429
    let ipABlocked = false;
    for (let i = 0; i < 15; i++) {
      try {
        await axios.post(
          `${baseURL}/auth/demo`,
          {},
          {
            headers: {
              'CF-Connecting-IP': ipA,
              'X-Forwarded-For': ipA,
            },
          },
        );
      } catch (err: any) {
        if (err.response?.status === 429) {
          ipABlocked = true;
          break;
        }
      }
    }
    expect(ipABlocked).toBe(true);

    // Bước 2: IP_B gửi request ngay sau đó -> Phải thành công (HTTP 200), không bị ảnh hưởng bởi IP_A
    const resB = await axios.post(
      `${baseURL}/auth/demo`,
      {},
      {
        headers: {
          'CF-Connecting-IP': ipB,
          'X-Forwarded-For': ipB,
        },
      },
    );
    expect(resB.status).toBe(200);
    expect(resB.data?.accessToken).toBeDefined();
  }, 10000);
});
