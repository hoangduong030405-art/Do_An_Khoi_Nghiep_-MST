import axios from 'axios';

describe('Rate Limit IP Throttling Test', () => {
  const baseURL = 'http://localhost:3000/api/v1';

  it('gọi liên tiếp quá ngưỡng giới hạn vào /ai-guide/chat từ một IP phải nhận HTTP 429', async () => {
    let got429 = false;
    const testIp = '203.0.113.' + Math.floor(Math.random() * 200 + 10);
    for (let i = 0; i < 20; i++) {
      try {
        await axios.post(`${baseURL}/ai-guide/chat`, {
          prompt: 'Hello',
        }, {
          headers: {
            'X-Forwarded-For': testIp,
          }
        });
      } catch (err: any) {
        if (err.response?.status === 429) {
          got429 = true;
          expect(err.response.status).toBe(429);
          break;
        }
      }
    }
    expect(got429).toBe(true);
  });
});
