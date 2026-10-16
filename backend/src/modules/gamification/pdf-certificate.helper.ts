import * as PDFDocument from 'pdfkit';
import * as QRCode from 'qrcode';
import * as path from 'path';
import * as fs from 'fs';

export interface CertificatePdfData {
  recipientName: string;
  title: string;
  certCode: string;
  points: number;
  unlockedCount: number;
  places?: any[];
  issuedDate: string;
  baseUrl?: string;
}

export async function generateCertificatePdf(data: CertificatePdfData): Promise<Buffer> {
  const { recipientName, title, certCode, points, unlockedCount, places, issuedDate } = data;

  return new Promise(async (resolve, reject) => {
    try {
      const doc = new (PDFDocument as any)({
        size: 'A4',
        margin: 40,
        info: {
          Title: `Chứng nhận Di sản Du lịch Xanh Huế - ${certCode}`,
          Author: 'HUEGO Green Heritage Platform',
        },
      });

      const buffers: Buffer[] = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        resolve(Buffer.concat(buffers));
      });
      doc.on('error', reject);

      // Locate Unicode Font
      let regularFont = 'backend/assets/fonts/Roboto-Regular.ttf';
      let boldFont = 'backend/assets/fonts/Roboto-Bold.ttf';
      if (!fs.existsSync(regularFont)) {
        regularFont = path.resolve(__dirname, '../../../../assets/fonts/Roboto-Regular.ttf');
        boldFont = path.resolve(__dirname, '../../../../assets/fonts/Roboto-Bold.ttf');
      }
      if (!fs.existsSync(regularFont) && fs.existsSync('C:\\Windows\\Fonts\\arial.ttf')) {
        regularFont = 'C:\\Windows\\Fonts\\arial.ttf';
        boldFont = 'C:\\Windows\\Fonts\\arialbd.ttf';
      }

      if (fs.existsSync(regularFont)) {
        doc.registerFont('UnicodeRegular', regularFont);
      }
      if (fs.existsSync(boldFont)) {
        doc.registerFont('UnicodeBold', boldFont);
      }

      const fontRegular = fs.existsSync(regularFont) ? 'UnicodeRegular' : 'Helvetica';
      const fontBold = fs.existsSync(boldFont) ? 'UnicodeBold' : 'Helvetica-Bold';

      // 1. Viền ngoài chứng nhận (Border sang trọng)
      doc.rect(20, 20, 555, 802).lineWidth(3).strokeColor('#854d0e').stroke();
      doc.rect(25, 25, 545, 792).lineWidth(1).strokeColor('#ca8a04').stroke();

      // 2. Tiêu đề chính
      doc.font(fontBold).fontSize(14).fillColor('#854d0e')
        .text('SỞ DU LỊCH THỪA THIÊN HUẾ - NỀN TẢNG DU LỊCH XANH HUEGO', 40, 50, { align: 'center' });
      
      doc.moveDown(0.5);
      doc.font(fontBold).fontSize(20).fillColor('#15803d')
        .text('CHỨNG NHẬN DI SẢN DU LỊCH XANH CỐ ĐÔ', { align: 'center' });

      doc.moveDown(0.3);
      doc.font(fontRegular).fontSize(11).fillColor('#64748b')
        .text('Vinh danh đóng góp gìn giữ di sản & phát triển giao thông bền vững', { align: 'center' });

      doc.moveDown(1);
      // Đường kẻ trang trí
      doc.moveTo(100, doc.y).lineTo(495, doc.y).lineWidth(1).strokeColor('#e2e8f0').stroke();
      doc.moveDown(1);

      // 3. Thông tin người nhận
      doc.font(fontRegular).fontSize(12).fillColor('#334155').text('Trân trọng trao tặng chứng nhận cho:', 50, doc.y);
      doc.moveDown(0.4);
      doc.font(fontBold).fontSize(18).fillColor('#0f172a').text(recipientName.toUpperCase(), 50, doc.y);

      doc.moveDown(0.8);
      doc.font(fontRegular).fontSize(12).fillColor('#334155');
      doc.text(`Danh hiệu đại sứ: `, 50, doc.y, { continued: true });
      doc.font(fontBold).fillColor('#b45309').text(title);

      doc.moveDown(0.4);
      doc.font(fontRegular).fillColor('#334155');
      doc.text(`Điểm xanh tích lũy: `, 50, doc.y, { continued: true });
      doc.font(fontBold).fillColor('#16a34a').text(`+${points} Green Points (GP)`);

      doc.moveDown(0.4);
      doc.font(fontRegular).fillColor('#334155');
      doc.text(`Cột mốc đã mở khóa: `, 50, doc.y, { continued: true });
      doc.font(fontBold).fillColor('#0f172a').text(`${unlockedCount} di tích Cố đô`);

      doc.moveDown(0.4);
      doc.font(fontRegular).fillColor('#334155');
      doc.text(`Ngày cấp chứng nhận: `, 50, doc.y, { continued: true });
      doc.font(fontBold).fillColor('#0f172a').text(issuedDate);

      doc.moveDown(0.4);
      doc.font(fontRegular).fillColor('#334155');
      doc.text(`Mã chứng nhận số: `, 50, doc.y, { continued: true });
      doc.font(fontBold).fillColor('#6366f1').text(certCode);

      doc.moveDown(1);
      // 4. Danh sách các địa danh đã chinh phục
      doc.font(fontBold).fontSize(13).fillColor('#1e293b').text('DANH SÁCH ĐỊA DANH ĐÃ CHINH PHỤC:');
      doc.moveDown(0.4);
      
      doc.font(fontRegular).fontSize(10).fillColor('#475569');
      if (places && places.length > 0) {
        places.forEach((p, index) => {
          const pName = p.name || p.placeName || p.id;
          const pPoints = p.pointsAwarded || p.rewardPoints || 30;
          doc.text(`  ${index + 1}. ${pName} (+${pPoints} GP)`);
        });
      } else {
        doc.text('  1. Đại Nội Huế (+50 GP)');
        doc.text('  2. Chùa Thiên Mụ (+50 GP)');
        doc.text('  3. Cầu Tràng Tiền (+20 GP)');
      }

      // 5. Sinh mã QR trỏ tới URL xác thực (đọc từ biến môi trường PUBLIC_BASE_URL hoặc baseUrl)
      const originUrl = (data.baseUrl || process.env.PUBLIC_BASE_URL || 'http://localhost:3000').replace(/\/+$/, '');
      const verifyUrl = `${originUrl}/verify/${certCode}`;
      const qrImageBuffer = await QRCode.toBuffer(verifyUrl, {
        width: 120,
        margin: 1,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      });

      const qrY = 660;
      doc.image(qrImageBuffer, 430, qrY, { width: 100, height: 100 });

      // Ghi chú dưới QR
      doc.font(fontRegular).fontSize(9).fillColor('#64748b')
        .text('Quét mã QR để xác thực trực tuyến', 380, qrY + 105, { width: 180, align: 'center' });

      // Chữ ký bảo mật và bản quyền phía dưới góc trái
      doc.font(fontRegular).fontSize(9).fillColor('#94a3b8')
        .text('Hệ thống Chứng nhận Số hóa Di sản HUEGO', 50, 750)
        .text(`Xác thực tại: ${verifyUrl}`, 50, 765)
        .text('Dữ liệu được bảo chứng bởi công nghệ PostgreSQL & Mã băm HMAC', 50, 780);

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
