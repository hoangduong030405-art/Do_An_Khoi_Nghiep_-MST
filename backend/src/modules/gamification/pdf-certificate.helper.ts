export interface CertificatePdfData {
  recipientName: string;
  title: string;
  certCode: string;
  points: number;
  unlockedCount: number;
  places?: any[];
  issuedDate: string;
}

export function generateCertificatePdf(data: CertificatePdfData): Buffer {
  const { recipientName, title, certCode, points, unlockedCount, places, issuedDate } = data;
  const lines: string[] = [
    '================================================================================',
    '                   SO DU LICH & HE THONG DU LICH XANH HUEGO',
    '                 CHUNG NHAN DI SAN DU LICH XANH CO DO HUE',
    '================================================================================',
    '',
    `  Nguoi nhan       : ${recipientName.toUpperCase()}`,
    `  Danh hieu        : ${title}`,
    `  Ma chung nhan    : ${certCode}`,
    `  Tong diem xanh   : +${points} Green Points (GP)`,
    `  Dia danh mo khoa : ${unlockedCount} cot moc di tich Hue`,
    `  Ngay cap         : ${issuedDate}`,
    '',
    '--------------------------------------------------------------------------------',
    '  DANH SACH COT MOC DA CHINH PHUC VA DONG GOP:',
    '--------------------------------------------------------------------------------',
  ];

  if (places && places.length > 0) {
    places.forEach((p, idx) => {
      lines.push(`  [${idx + 1}] ${p.name || p.placeName || p.id} (+${p.pointsAwarded || p.rewardPoints || 30} GP)`);
    });
  } else {
    lines.push('  - Dai Noi Hue (+50 GP)');
    lines.push('  - Chua Thien Mu (+50 GP)');
    lines.push('  - Cau Trang Tien (+20 GP)');
  }

  lines.push('');
  lines.push('--------------------------------------------------------------------------------');
  lines.push('  XAC THUC CHUNG NHAN TRUC TUYEN (SCAN QR / URL):');
  lines.push(`  https://huego.vn/verify/${certCode}`);
  lines.push('  Xac thuc so hoa tren co so du lieu PostgreSQL - Ban quyen HueGO 2026');
  lines.push('================================================================================');

  // Build minimal valid standard PDF 1.4 document
  let textStream = 'BT /F1 12 Tf 50 720 Td 16 TL\n';
  lines.forEach(l => {
    const escaped = l.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    textStream += `(${escaped}) '\n`;
  });
  textStream += 'ET';

  const streamLength = Buffer.byteLength(textStream, 'utf-8');

  const obj1 = '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n';
  const obj2 = '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n';
  const obj3 = '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n';
  const obj4 = `4 0 obj\n<< /Length ${streamLength} >>\nstream\n${textStream}\nendstream\nendobj\n`;
  const obj5 = '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>\nendobj\n';

  const header = '%PDF-1.4\n';
  const offset1 = Buffer.byteLength(header, 'utf-8');
  const offset2 = offset1 + Buffer.byteLength(obj1, 'utf-8');
  const offset3 = offset2 + Buffer.byteLength(obj2, 'utf-8');
  const offset4 = offset3 + Buffer.byteLength(obj3, 'utf-8');
  const offset5 = offset4 + Buffer.byteLength(obj4, 'utf-8');
  const xrefOffset = offset5 + Buffer.byteLength(obj5, 'utf-8');

  const pad = (n: number) => String(n).padStart(10, '0');
  const xref = `xref\n0 6\n0000000000 65535 f \n${pad(offset1)} 00000 n \n${pad(offset2)} 00000 n \n${pad(offset3)} 00000 n \n${pad(offset4)} 00000 n \n${pad(offset5)} 00000 n \n`;
  const trailer = `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return Buffer.from(header + obj1 + obj2 + obj3 + obj4 + obj5 + xref + trailer, 'utf-8');
}
