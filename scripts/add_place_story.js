const fs = require('fs');
let code = fs.readFileSync('web-hue4u/server.js', 'utf8');

const target = '    // GET /api/heritage-sites';
const insert = `    // POST /api/v1/ai-guide/place-story (Thuyết minh AI di tích & địa danh lịch sử)
    if (pathname === '/api/v1/ai-guide/place-story' && req.method === 'POST') {
      let bodyData = '';
      req.on('data', chunk => { bodyData += chunk; });
      req.on('end', () => {
        try {
          const parsed = JSON.parse(bodyData || '{}');
          const placeName = parsed.placeName || 'Địa danh Cố Đô';
          
          res.writeHead(200);
          res.end(JSON.stringify({
            available: true,
            placeName: placeName,
            audioNarrationScript: \`Chào mừng quý khách đến với \${placeName}. Đây là một trong những điểm đến văn hóa, di sản tiêu biểu của Cố Đô Huế. Nơi đây lưu giữ những giá trị kiến trúc cung đình tinh hoa và trầm tích lịch sử hàng trăm năm của triều đại nhà Nguyễn. Xin kính mời quý khách dạo bước tham quan và cảm nhận trọn vẹn nét đẹp trầm mặc của di tích này.\`,
            secretHistoricalFact: 'Di tích lịch sử - văn hóa đặc sắc gắn liền với nghệ thuật kiến trúc và phong thủy Cố Đô Huế.'
          }));
        } catch (e) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Dữ liệu không hợp lệ' }));
        }
      });
      return;
    }\n\n`;

if (code.includes(target) && !code.includes('/api/v1/ai-guide/place-story')) {
  code = code.replace(target, insert + target);
  fs.writeFileSync('web-hue4u/server.js', code, 'utf8');
  console.log('SUCCESS: Injected place-story endpoint into server.js');
} else {
  console.log('ALREADY_PRESENT_OR_NOT_FOUND');
}
