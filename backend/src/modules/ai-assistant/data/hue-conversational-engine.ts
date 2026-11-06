import * as fs from 'fs';
import * as path from 'path';
import { PlaceNarration } from '../../places/entities/place-narration.entity';
import { Place } from '../../places/entities/place.entity';
import { HUE_HERITAGE_STORIES, HeritageNarrationItem } from './hue-heritage-stories';

export interface MatchedPlaceContext {
  placeId: string;
  placeName: string;
  address: string;
  ticketPriceVnd?: number;
  environmentType?: string;
  categoryCode?: string;
  shortText: string;
  longText: string;
  sources: string;
  story?: HeritageNarrationItem;
}

interface RawCatalogPlace {
  id: string;
  name?: string;
  name_vi?: string;
  vertical?: string;
  category?: string;
  subcategory?: string[];
  address?: string;
  description?: string;
  googleRating?: number;
  googleReviewCount?: number;
  priceRange?: string;
}

let cachedCatalogPlaces: RawCatalogPlace[] | null = null;

function loadCatalogPlaces(): RawCatalogPlace[] {
  if (cachedCatalogPlaces) return cachedCatalogPlaces;
  try {
    const candidatePaths = [
      path.join(process.cwd(), 'data', 'places_all.json'),
      path.join(process.cwd(), '..', 'web-hue4u', 'data', 'places_all.json'),
      path.join(__dirname, '..', '..', '..', '..', 'data', 'places_all.json'),
    ];
    for (const p of candidatePaths) {
      if (fs.existsSync(p)) {
        cachedCatalogPlaces = JSON.parse(fs.readFileSync(p, 'utf8'));
        return cachedCatalogPlaces || [];
      }
    }
  } catch (_) {}
  cachedCatalogPlaces = [];
  return cachedCatalogPlaces;
}

/**
 * Bỏ dấu tiếng Việt để so khớp linh hoạt cả khi người dùng gõ không dấu
 */
export function removeAccents(str: string): string {
  return (str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

/**
 * Bản đồ từ khóa nhận diện địa danh di sản Huế -> khóa HUE_HERITAGE_STORIES & tên địa danh
 */
export const LANDMARK_KEYWORD_MAP: Array<{
  keywords: string[];
  storyKey?: string;
  matchNames: string[];
  matchIds?: string[];
  defaultHours: string;
  defaultTicket: string;
  defaultAddress: string;
  transportTip: string;
}> = [
  {
    keywords: ['đại nội', 'hoàng thành', 'tử cấm thành', 'kinh thành huế', 'dai noi', 'hoang thanh'],
    storyKey: 'dai-noi',
    matchNames: ['đại nội'],
    matchIds: ['8f8b0596-f5ee-449e-8c31-9cb6be62b662'],
    defaultHours: 'Mùa hè: 06:30 – 17:30 | Mùa đông: 07:00 – 17:00 (Có mở cửa Đại Nội về đêm tại một số khu vực từ 19:00 – 22:00)',
    defaultTicket: '200.000 VNĐ/người lớn, 40.000 VNĐ/trẻ em (7–12 tuổi). Gợi ý: Mua vé tuyến combo Đại Nội + 2 lăng (Minh Mạng, Khải Định) chỉ 420.000 VNĐ hoặc combo 4 điểm 530.000 VNĐ sẽ tiết kiệm hơn.',
    defaultAddress: 'Đường 23 Tháng 8, Phường Thuận Hòa, Trung tâm bờ Bắc TP Huế',
    transportTip: 'Từ cầu Tràng Tiền hoặc bến Tòa Khâm bờ Nam, bạn đi qua cầu Phú Xuân hoặc cầu Trường Tiền rồi rẽ trái dọc bờ sông Hương chừng 1,5km là tới Cửa Ngọ Môn. Có thể đi xe đạp xanh Eco-Bike, xích lô hoặc taxi.',
  },
  {
    keywords: ['điện thái hòa', 'thái hòa', 'ngai vàng', 'dien thai hoa'],
    storyKey: 'dai-noi',
    matchNames: ['thái hòa'],
    matchIds: ['heritage-dien-thai-hoa'],
    defaultHours: '07:00 – 17:30 hằng ngày (nằm ngay trục chính sau cổng Ngọ Môn trong Đại Nội Huế)',
    defaultTicket: 'Đã bao gồm trong vé tham quan Đại Nội Huế (200.000 VNĐ/người lớn)',
    defaultAddress: 'Trung tâm Hoàng Thành (Đại Nội Huế), Phường Thuận Hòa, TP Huế',
    transportTip: 'Bước qua cổng Ngọ Môn và cầu Trung Đạo bắc qua hồ Thái Dịch là đứng ngay trước sân Đại Triều Nghi của Điện Thái Hòa.',
  },
  {
    keywords: ['ngọ môn', 'cổng ngọ môn', 'lầu ngũ phụng', 'ngo mon'],
    storyKey: 'dai-noi',
    matchNames: ['ngọ môn'],
    matchIds: ['heritage-ngo-mon'],
    defaultHours: '07:00 – 17:30 hằng ngày (bên ngoài quảng trường Ngọ Môn tham quan tự do 24/24)',
    defaultTicket: 'Chụp ảnh phía trước quảng trường Ngọ Môn miễn phí; vào bên trong Đại Nội vé 200.000 VNĐ/người lớn',
    defaultAddress: 'Đường 23 Tháng 8 (Cổng chính phía Nam Hoàng thành Huế)',
    transportTip: 'Nằm ngay đối diện Kỳ Đài (Cột Cờ Huế) bên bờ Bắc sông Hương, rất thuận tiện đi bộ hoặc đạp xe từ cầu Phú Xuân.',
  },
  {
    keywords: ['cửu đỉnh', 'thế miếu', 'thế tổ miếu', 'cuu dinh'],
    storyKey: 'dai-noi',
    matchNames: ['cửu đỉnh'],
    matchIds: ['heritage-cuu-dinh'],
    defaultHours: '07:00 – 17:30 hằng ngày (trong khuôn viên Đại Nội)',
    defaultTicket: 'Đã bao gồm trong vé Đại Nội Huế (200.000 VNĐ/người lớn)',
    defaultAddress: 'Trước sân Thế Tổ Miếu, góc Tây Nam Hoàng thành Huế',
    transportTip: 'Từ Điện Thái Hòa rẽ sang phía bên trái (hướng Tây) qua Hiển Lâm Các là thấy 9 chiếc đỉnh đồng Cửu Đỉnh uy nghiêm.',
  },
  {
    keywords: ['thiên mụ', 'linh mụ', 'tháp phước duyên', 'đồi hà khê', 'thien mu', 'linh mu'],
    storyKey: 'thien-mu',
    matchNames: ['thiên mụ'],
    matchIds: ['1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d'],
    defaultHours: '06:00 – 18:00 hằng ngày',
    defaultTicket: 'Miễn phí hoàn toàn vé vào cổng',
    defaultAddress: 'Đồi Hà Khê, Đường Nguyễn Phúc Nguyên, Phường Kim Long, TP Huế (cách trung tâm ~5km về phía Tây)',
    transportTip: 'Bạn có thể đạp xe dọc đường Kim Long rợp bóng cây bên bờ Bắc sông Hương, đi taxi/xe máy khoảng 10 phút, hoặc trải nghiệm thuyền rồng ngược dòng sông Hương lên bến chùa.',
  },
  {
    keywords: ['bảo tàng cổ vật', 'điện long an', 'long an', 'cổ vật cung đình', 'bao tang co vat'],
    storyKey: 'bao-tang-co-vat',
    matchNames: ['cổ vật'],
    matchIds: ['1b34ad29-2342-49cf-91ba-00c71a39fbc4'],
    defaultHours: '07:00 – 17:30 hằng ngày',
    defaultTicket: '50.000 VNĐ/người lớn (hoặc miễn phí khi mua vé tuyến combo Đại Nội)',
    defaultAddress: 'Số 3 Lê Trực, Phường Đông Ba (sát bên cửa Hiển Nhơn của Đại Nội Huế)',
    transportTip: 'Nằm ngay cạnh Đại Nội Huế (cách Cửa Hiển Nhơn chỉ vài bước chân), rất lý tưởng để kết hợp tham quan ngay sau khi rời Hoàng Thành hoặc ghé trú mưa.',
  },
  {
    keywords: ['khải định', 'ứng lăng', 'thiên định', 'cửu long ẩn vân', 'khai dinh', 'ung lang'],
    storyKey: 'lang-khai-dinh',
    matchNames: ['khải định'],
    matchIds: ['4f5e6d7c-8b9a-0123-4567-89abcdef0123'],
    defaultHours: '07:00 – 17:30 hằng ngày',
    defaultTicket: '150.000 VNĐ/người lớn, 30.000 VNĐ/trẻ em',
    defaultAddress: 'Triền núi Châu Chữ, Xã Thủy Bằng, TP Huế (cách trung tâm ~10km về phía Tây Nam)',
    transportTip: 'Đi theo trục đường Điện Biên Phủ – Minh Mạng lên hướng Quốc lộ 49 khoảng 20 phút đi xe máy/ô tô. Đường nhựa đẹp, hai bên nhiều đồi thông thoáng mát.',
  },
  {
    keywords: ['tự đức', 'khiêm lăng', 'lưu khiêm', 'xung khiêm', 'tu duc', 'khiem lang'],
    storyKey: 'lang-tu-duc',
    matchNames: ['tự đức'],
    matchIds: ['tu-duc-tomb-01'],
    defaultHours: '07:00 – 17:30 hằng ngày',
    defaultTicket: '150.000 VNĐ/người lớn, 30.000 VNĐ/trẻ em',
    defaultAddress: 'Thôn Thượng Ba, Đường Đoàn Nhữ Hài, Phường Thủy Xuân, TP Huế (cách trung tâm ~6km)',
    transportTip: 'Đi theo đường Lê Lợi – Điện Biên Phủ – Huyền Trân Công Chúa. Ngay trên cung đường này bạn có thể kết hợp ghé Làng hương Thủy Xuân và Đồi Vọng Cảnh chỉ cách đó 1km!',
  },
  {
    keywords: ['minh mạng', 'hiếu lăng', 'tân nguyệt', 'sùng ân', 'minh mang', 'hieu lang'],
    storyKey: 'lang-minh-mang',
    matchNames: ['minh mạng'],
    matchIds: ['minh-mang-tomb-02'],
    defaultHours: '07:00 – 17:30 hằng ngày',
    defaultTicket: '150.000 VNĐ/người lớn, 30.000 VNĐ/trẻ em',
    defaultAddress: 'Núi Cẩm Kê, Xã Hương Thọ, TP Huế (cách trung tâm ~12km, gần ngã ba Bằng Lãng)',
    transportTip: 'Đi theo hướng cầu Tuần (Quốc lộ 49) qua sông Hương khoảng 20–25 phút. Thường kết hợp đi chung tuyến Lăng Khải Định – Lăng Minh Mạng trong 1 buổi.',
  },
  {
    keywords: ['gia long', 'thiên thọ lăng', 'thien tho lang', 'lang gia long'],
    matchNames: ['gia long'],
    matchIds: ['heritage-lang-gia-long'],
    defaultHours: '07:00 – 17:30 hằng ngày',
    defaultTicket: '150.000 VNĐ/người lớn',
    defaultAddress: 'Quần sơn Thiên Thọ, Xã Hương Thọ, TP Huế (cách trung tâm ~16km)',
    transportTip: 'Đi qua cầu phao hoặc đường bộ qua xã Hương Thọ. Không gian núi rừng thông và hồ nước cực kỳ yên bình, hoang sơ và hùng vĩ.',
  },
  {
    keywords: ['đồng khánh', 'tư lăng', 'dong khanh', 'tu lang'],
    matchNames: ['đồng khánh'],
    matchIds: ['heritage-lang-dong-khanh'],
    defaultHours: '07:00 – 17:30 hằng ngày',
    defaultTicket: '100.000 VNĐ/người lớn',
    defaultAddress: 'Làng Cư Sĩ, Phường Thủy Xuân, TP Huế (nằm ngay sát bên cạnh Lăng Tự Đức)',
    transportTip: 'Nằm ngay cạnh Lăng Tự Đức trên trục đường Đoàn Nhữ Hài – Huyền Trân Công Chúa, vừa hoàn thành trùng tu tuyệt đẹp.',
  },
  {
    keywords: ['thiệu trị', 'xương lăng', 'thieu tri', 'xuong lang'],
    matchNames: ['thiệu trị'],
    matchIds: ['heritage-lang-thieu-tri'],
    defaultHours: '07:00 – 17:30 hằng ngày',
    defaultTicket: '50.000 VNĐ/người lớn',
    defaultAddress: 'Làng Cư Chánh, Xã Thủy Bằng, TP Huế (cách trung tâm ~8km)',
    transportTip: 'Nằm giữa cánh đồng lúa thanh bình xã Thủy Bằng, rất tiện ghé trên đường từ Lăng Tự Đức sang Lăng Khải Định.',
  },
  {
    keywords: ['dục đức', 'an lăng', 'thành thái', 'duy tân', 'duc duc', 'an lang'],
    matchNames: ['dục đức'],
    matchIds: ['heritage-lang-duc-duc'],
    defaultHours: '07:00 – 17:00 hằng ngày',
    defaultTicket: '50.000 VNĐ/người lớn',
    defaultAddress: 'Phường An Cựu, TP Huế (chỉ cách trung tâm ~2km)',
    transportTip: 'Nằm ngay gần đường Duy Tân trong nội thành bờ Nam, nơi an nghỉ của 3 vị vua yêu nước: Dục Đức, Thành Thái và Duy Tân.',
  },
  {
    keywords: ['tràng tiền', 'trường tiền', 'cầu tràng tiền', 'cầu trường tiền', 'trang tien', 'truong tien'],
    storyKey: 'cau-trang-tien',
    matchNames: ['tràng tiền'],
    matchIds: ['5a6b7c8d-9e0f-1a2b-3c4d-5e6f7a8b9c0d'],
    defaultHours: 'Tham quan tự do 24/24 (Đèn LED nghệ thuật đổi màu bật từ 18:30 – 23:00 mỗi tối)',
    defaultTicket: 'Miễn phí hoàn toàn',
    defaultAddress: 'Bắc qua sông Hương, nối đường Trần Hưng Đạo (bờ Bắc) và đường Lê Lợi – Hùng Vương (bờ Nam)',
    transportTip: 'Nằm ngay trái tim thành phố Huế. Buổi chiều tối đi bộ dọc cầu gỗ lim Nguyễn Đình Chiểu ngắm cầu Tràng Tiền và ghé chợ Đông Ba ngay đầu cầu phía Bắc là tuyệt nhất.',
  },
  {
    keywords: ['vọng cảnh', 'đồi vọng cảnh', 'vong canh'],
    storyKey: 'doi-vong-canh',
    matchNames: ['vọng cảnh'],
    matchIds: ['doi-vong-canh-04'],
    defaultHours: 'Mở cửa tự do cả ngày (Đẹp nhất lúc bình minh 05:30 – 07:00 và hoàng hôn 16:30 – 18:00)',
    defaultTicket: 'Miễn phí hoàn toàn',
    defaultAddress: 'Cuối đường Huyền Trân Công Chúa, Phường Thủy Biều, TP Huế (cách trung tâm ~7km)',
    transportTip: 'Đi thẳng đường Huyền Trân Công Chúa qua Làng hương Thủy Xuân chừng 800m là tới chân đồi. Gửi xe dưới chân đồi rồi đi bộ vài phút lên rừng thông ngắm khúc uốn sông Hương.',
  },
  {
    keywords: ['làng hương', 'thủy xuân', 'hương trầm', 'lang huong', 'thuy xuan'],
    storyKey: 'lang-huong-thuy-xuan',
    matchNames: ['làng hương', 'thủy xuân'],
    matchIds: ['lang-huong-thuy-xuan-08'],
    defaultHours: '07:00 – 18:30 hằng ngày (Rực rỡ nhất khi nắng đẹp từ 08:00 – 16:30)',
    defaultTicket: 'Miễn phí tham quan (Thuê áo dài/cổ phục chụp ảnh từ 80.000 – 150.000 VNĐ/bộ)',
    defaultAddress: 'Đường Huyền Trân Công Chúa, Phường Thủy Xuân (sát bên Lăng Tự Đức và Đồi Vọng Cảnh)',
    transportTip: 'Nằm ngay mặt tiền đường Huyền Trân Công Chúa, cách trung tâm 6km. Đi xe máy/taxi kết hợp tuyến Lăng Tự Đức – Làng hương Thủy Xuân – Đồi Vọng Cảnh chỉ trong 1 buổi chiều.',
  },
  {
    keywords: ['trà cung đình', 'nhà rường kim long', 'kim long', 'tra cung dinh'],
    storyKey: 'tra-cung-dinh-kim-long',
    matchNames: ['trà cung đình', 'kim long'],
    matchIds: ['6b7c8d9e-0f1a-2b3c-4d5e-6f7a8b9c0d1e'],
    defaultHours: '07:30 – 21:00 hằng ngày',
    defaultTicket: 'Thưởng trà tại chỗ từ 40.000 – 80.000 VNĐ/ấm kèm bánh mứt Huế',
    defaultAddress: 'Đường Kim Long – Nguyễn Phúc Nguyên (trên trục đường từ Đại Nội đi Chùa Thiên Mụ)',
    transportTip: 'Từ Đại Nội đi dọc bờ Bắc sông Hương về hướng Chùa Thiên Mụ sẽ đi ngang qua vùng nhà vườn Kim Long cổ kính.',
  },
  {
    keywords: ['cung an định', 'an định', 'cung an dinh'],
    matchNames: ['an định'],
    matchIds: ['heritage-cung-an-dinh'],
    defaultHours: '07:00 – 17:30 hằng ngày',
    defaultTicket: '50.000 VNĐ/người lớn',
    defaultAddress: 'Số 179B Phan Đình Phùng, Phường Phú Nhuận, bờ sông An Cựu, TP Huế',
    transportTip: 'Chỉ cách cầu Tràng Tiền khoảng 1,8km về phía Nam dọc bờ sông An Cựu, đi xe đạp hoặc xe máy mất 5 phút.',
  },
  {
    keywords: ['chợ đông ba', 'đông ba', 'cho dong ba'],
    matchNames: ['đông ba'],
    matchIds: ['heritage-cho-dong-ba'],
    defaultHours: '05:00 – 19:00 hằng ngày (Khu ẩm thực chiều hoạt động nhộn nhịp từ 14:00 – 18:30)',
    defaultTicket: 'Miễn phí vào cổng',
    defaultAddress: 'Số 2 Trần Hưng Đạo, Phường Phú Hòa (ngay sát chân cầu Tràng Tiền phía bờ Bắc)',
    transportTip: 'Từ cầu Tràng Tiền đi thẳng sang bờ Bắc rồi rẽ phải 200m trên đường Trần Hưng Đạo là tới cổng chợ Đông Ba.',
  },
  {
    keywords: ['hồ tịnh tâm', 'tịnh tâm', 'ho tinh tam'],
    matchNames: ['tịnh tâm'],
    matchIds: ['heritage-ho-tinh-tam'],
    defaultHours: 'Tham quan tự do cả ngày (Mùa sen nở rộ đẹp nhất từ tháng 5 đến tháng 7)',
    defaultTicket: 'Miễn phí',
    defaultAddress: 'Đường Đinh Tiên Hoàng – Đoàn Thị Điểm, phía Đông Bắc Hoàng thành Huế',
    transportTip: 'Nằm ngay trong Kinh thành Huế, cách Đại Nội chỉ 500m về phía Bắc, rất tiện đạp xe dạo mát.',
  },
  {
    keywords: ['cầu ngói thanh toàn', 'thanh toàn', 'cau ngoi thanh toan'],
    matchNames: ['thanh toàn'],
    matchIds: ['heritage-cau-ngoi-thanh-toan'],
    defaultHours: 'Tham quan tự do cả ngày (Có Nhà trưng bày nông cụ mở cửa 07:30 – 17:00)',
    defaultTicket: 'Miễn phí qua cầu',
    defaultAddress: 'Làng Thanh Thủy Chánh, Xã Thủy Thanh, Thị xã Hương Thủy (cách trung tâm Huế ~8km về phía Đông Nam)',
    transportTip: 'Đi theo đường Hoàng Quốc Việt – Tỉnh lộ 10A qua những cánh đồng lúa xanh mướt khoảng 15–20 phút.',
  },
  {
    keywords: ['phá tam giang', 'đầm chuồn', 'rú chá', 'tam giang', 'dam chuon', 'ru cha'],
    matchNames: ['tam giang', 'đầm chuồn', 'rú chá'],
    matchIds: ['dam-chuon-07', 'ru-cha-06', 'nature-pha-tam-giang'],
    defaultHours: 'Đẹp nhất lúc bình minh (05:00 – 07:00) hoặc hoàng hôn (15:30 – 18:30)',
    defaultTicket: 'Vào rừng ngập mặn Rú Chá miễn phí; thuê thuyền gỗ dạo Đầm Chuồn ngắm hoàng hôn và ăn hải sản nhà chồ khoảng 150.000 – 250.000 VNĐ/người.',
    defaultAddress: 'Xã Hương Phong & Xã Phú An, cách trung tâm TP Huế khoảng 12–14km về phía Đông (hướng biển Thuận An)',
    transportTip: 'Đi theo Quốc lộ 49 về hướng biển Thuận An, ghé rừng ngập mặn Rú Chá chụp ảnh lúc 15h30 rồi qua Đầm Chuồn ngắm hoàng hôn và ăn bánh khoái cá kình lúc 17h00.',
  },
  {
    keywords: ['thiên an', 'đồi thiên an', 'hồ thủy tiên', 'thien an', 'ho thuy tien'],
    matchNames: ['thiên an', 'thủy tiên'],
    matchIds: ['doi-thien-an-05'],
    defaultHours: '06:00 – 18:00 hằng ngày',
    defaultTicket: 'Miễn phí tham quan rừng thông Đồi Thiên An và Đan viện Thiên An',
    defaultAddress: 'Xã Thủy Bằng, TP Huế (trên đường lên Lăng Khải Định, cách trung tâm ~7km)',
    transportTip: 'Nằm ngay trên trục đường Minh Mạng dẫn lên Lăng Khải Định, rừng thông mát rượi như Đà Lạt thu nhỏ giữa lòng Huế.',
  },
  {
    keywords: ['điện hòn chén', 'hòn chén', 'dien hon chen'],
    matchNames: ['hòn chén'],
    matchIds: ['heritage-dien-hon-chen'],
    defaultHours: '07:00 – 17:00 hằng ngày',
    defaultTicket: '50.000 VNĐ/người lớn',
    defaultAddress: 'Núi Ngọc Trản, Xã Hương Thọ, bờ sông Hương, TP Huế',
    transportTip: 'Có thể đi thuyền rồng dọc sông Hương hoặc đi đường bộ qua bến đò Hàm Long sang Điện Hòn Chén.',
  },
  {
    keywords: ['núi ngự bình', 'ngự bình', 'nui ngu binh'],
    matchNames: ['ngự bình'],
    matchIds: ['nature-nui-ngu-binh'],
    defaultHours: 'Tự do cả ngày (Đẹp nhất sáng sớm hoặc chiều hoàng hôn)',
    defaultTicket: 'Miễn phí',
    defaultAddress: 'Phường An Cựu – Thủy Xuân, phía Nam Kinh thành Huế (cao 105m)',
    transportTip: 'Cách trung tâm chỉ 4km về phía Nam, đường dễ đi giữa rừng thông xanh mát, nhìn xuống toàn cảnh thành phố Huế và sông Hương.',
  },
  {
    keywords: ['chùa từ đàm', 'từ đàm', 'chua tu dam'],
    matchNames: ['từ đàm'],
    matchIds: ['heritage-chua-tu-dam'],
    defaultHours: '06:00 – 20:00 hằng ngày',
    defaultTicket: 'Miễn phí',
    defaultAddress: 'Số 1 Sư Liễu Quán, Phường Trường An, TP Huế',
    transportTip: 'Nằm ngay trung tâm bờ Nam gần đàn Nam Giao, thuận tiện đi xe máy hoặc xe đạp.',
  },
  {
    keywords: ['chùa báo quốc', 'báo quốc', 'chua bao quoc'],
    matchNames: ['báo quốc'],
    matchIds: ['heritage-chua-bao-quoc'],
    defaultHours: '06:00 – 19:00 hằng ngày',
    defaultTicket: 'Miễn phí',
    defaultAddress: 'Đồi Hàm Long, Đường Báo Quốc, Phường Phường Đúc, TP Huế',
    transportTip: 'Gần ga Huế và cầu Dã Viên, nằm trên đồi Hàm Long cổ kính yên tĩnh.',
  },
];

/**
 * Nhận diện câu hỏi đang hỏi về khía cạnh cụ thể nào của địa danh
 */
function detectLandmarkSubIntent(qNorm: string, qNoAccent: string): {
  asksHours: boolean;
  asksTicket: boolean;
  asksLocation: boolean;
  asksPhoto: boolean;
  asksSecret: boolean;
  asksNearbyFood: boolean;
  asksHistory: boolean;
} {
  return {
    asksHours: /giờ mở cửa|mấy giờ|mở cửa|đóng cửa|thời gian mở|buổi nào đẹp|đi lúc nào|gio mo cua|may gio/.test(qNorm) || /gio mo cua|may gio/.test(qNoAccent),
    asksTicket: /giá vé|vé vào|bao nhiêu tiền|miễn phí không|mua vé|vé tham quan|chi phí|gia ve|bao nhieu tien/.test(qNorm) || /gia ve|ve tham quan/.test(qNoAccent),
    asksLocation: /ở đâu|địa chỉ|đường nào|cách đi|đi bằng gì|đi thế nào|bao xa|tới đó|o dau|dia chi|duong đi/.test(qNorm) || /o dau|dia chi/.test(qNoAccent),
    asksPhoto: /chụp ảnh|check-in|check in|sống ảo|góc chụp|mặc gì|áo dài|cổ phục|chup anh|goc chup/.test(qNorm) || /chup anh|goc chup/.test(qNoAccent),
    asksSecret: /bí ẩn|ít người biết|giai thoại|đặc biệt|kiến trúc|độc đáo|tại sao|vì sao|chi tiết|bi an|kien truc/.test(qNorm) || /bi an|giai thoai|kien truc/.test(qNoAccent),
    asksNearbyFood: /ăn gì gần|quán ăn gần|xung quanh có gì ăn|ăn uống quanh|đặc sản gần|an gi gan/.test(qNorm),
    asksHistory: /lịch sử|năm nào|xây năm|khởi công|ai xây|vua nào|triều đại|nguồn gốc|kể về|giới thiệu|là gì|lich su|nam nao|xay dung/.test(qNorm) || /lich su|nam nao|xay dung/.test(qNoAccent),
  };
}

/**
 * Tìm các địa danh mà câu hỏi thực sự nhắc đến (hoặc hỏi "ở đây/gần đây")
 */
export function matchQuestionLandmarks(
  question: string,
  nearbyPlaceName: string | undefined,
  narrations: PlaceNarration[],
  places: Place[],
): {
  contextText: string;
  usedPlaceIds: string[];
  matchedContexts: MatchedPlaceContext[];
} {
  const qNorm = (question || '').toLowerCase().trim();
  const qNoAccent = removeAccents(qNorm);

  const placeMap = new Map<string, Place>();
  for (const p of places) {
    placeMap.set(p.id, p);
  }

  const narrationByPlaceId = new Map<string, PlaceNarration>();
  for (const n of narrations) {
    narrationByPlaceId.set(n.placeId, n);
  }

  const matchedRuleIndices = new Set<number>();

  // 1. Khớp theo từ khóa địa danh trong câu hỏi
  LANDMARK_KEYWORD_MAP.forEach((rule, idx) => {
    const hit = rule.keywords.some((kw) => {
      const kwNoAccent = removeAccents(kw);
      return qNorm.includes(kw) || (kwNoAccent.length >= 6 && qNoAccent.includes(kwNoAccent));
    });
    if (hit) matchedRuleIndices.add(idx);
  });

  // 2. Xử lý trường hợp hỏi "cồn hến / cơm hến" trong DB place_narrations
  const mentionsConHen = qNorm.includes('cồn hến') || qNoAccent.includes('con hen');

  // 3. CHỈ dùng nearbyPlaceName khi người dùng thực sự hỏi về địa điểm hiện tại ("ở đây", "chỗ này", "nơi này", "gần đây", "điểm này")
  const asksAboutCurrentLocation =
    /ở đây|chỗ này|nơi này|địa điểm này|điểm này|quanh đây|gần đây|đang đứng|ngay đây/.test(qNorm) ||
    /o day|cho nay|noi nay|gan day|quanh day/.test(qNoAccent);

  if (matchedRuleIndices.size === 0 && asksAboutCurrentLocation && nearbyPlaceName) {
    const nearbyLower = nearbyPlaceName.toLowerCase();
    LANDMARK_KEYWORD_MAP.forEach((rule, idx) => {
      if (rule.matchNames.some((mn) => nearbyLower.includes(mn)) || rule.keywords.some((kw) => nearbyLower.includes(kw))) {
        matchedRuleIndices.add(idx);
      }
    });
  }

  const usedPlaceIds: string[] = [];
  const matchedContexts: MatchedPlaceContext[] = [];
  const contextParts: string[] = [];

  for (const idx of matchedRuleIndices) {
    const rule = LANDMARK_KEYWORD_MAP[idx];
    const story = rule.storyKey ? HUE_HERITAGE_STORIES[rule.storyKey] : undefined;

    // Tìm Place & PlaceNarration tương ứng trong DB
    let matchedPlace: Place | undefined;
    let matchedNar: PlaceNarration | undefined;

    if (rule.matchIds) {
      for (const id of rule.matchIds) {
        if (placeMap.has(id)) {
          matchedPlace = placeMap.get(id);
          matchedNar = narrationByPlaceId.get(id);
          break;
        }
        if (narrationByPlaceId.has(id)) {
          matchedNar = narrationByPlaceId.get(id);
          matchedPlace = placeMap.get(id);
          break;
        }
      }
    }

    if (!matchedPlace) {
      for (const p of places) {
        const pLower = (p.name || '').toLowerCase();
        if (rule.matchNames.some((mn) => pLower.includes(mn))) {
          matchedPlace = p;
          matchedNar = narrationByPlaceId.get(p.id);
          break;
        }
      }
    }

    const placeId = matchedNar?.placeId || matchedPlace?.id || (rule.matchIds ? rule.matchIds[0] : rule.storyKey || 'hue-heritage');
    const placeName = matchedPlace?.name || story?.placeName || rule.keywords[0];
    const address = matchedPlace?.address || rule.defaultAddress;
    const shortText = matchedNar?.shortText || story?.audioNarrationScript || `${placeName} tọa lạc tại ${address}.`;
    const longText = matchedNar?.longText || story?.secretHistoricalFact || '';
    const sources = matchedNar?.sources || 'Trung tâm Bảo tồn Di tích Cố đô Huế & Đại Nam Thực Lục';

    if (!usedPlaceIds.includes(placeId)) {
      usedPlaceIds.push(placeId);
      matchedContexts.push({
        placeId,
        placeName,
        address,
        ticketPriceVnd: matchedPlace?.ticketPriceVnd,
        environmentType: matchedPlace?.environmentType,
        categoryCode: matchedPlace?.categoryCode,
        shortText,
        longText,
        sources,
        story,
      });

      contextParts.push(
        `[Địa danh: ${placeName}]\n` +
          `- Địa chỉ: ${address}\n` +
          `- Giờ mở cửa tham khảo: ${rule.defaultHours}\n` +
          `- Giá vé tham khảo: ${rule.defaultTicket}\n` +
          `- Cách di chuyển: ${rule.transportTip}\n` +
          `- Thuyết minh chính thức: ${shortText}\n` +
          (longText ? `- Tư liệu & Bí ẩn lịch sử: ${longText}\n` : '') +
          (story?.photoSpotAdvice ? `- Góc chụp ảnh đẹp: ${story.photoSpotAdvice}\n` : '') +
          (story?.localSpecialtyPairing ? `- Ẩm thực kết hợp gần đó: ${story.localSpecialtyPairing}\n` : '') +
          `- Nguồn tài liệu xác thực: ${sources}`,
      );
    }
  }

  if (mentionsConHen) {
    const conHenNar = narrations.find((n) => n.placeId.includes('com-hen') || (placeMap.get(n.placeId)?.name || '').toLowerCase().includes('hến'));
    if (conHenNar && !usedPlaceIds.includes(conHenNar.placeId)) {
      const p = placeMap.get(conHenNar.placeId);
      usedPlaceIds.push(conHenNar.placeId);
      matchedContexts.push({
        placeId: conHenNar.placeId,
        placeName: p?.name || 'Cồn Hến & Cơm Hến Hoa Đông',
        address: p?.address || '64 Kiệt 7 Ưng Bình, Cồn Hến, Vĩ Dạ, TP Huế',
        shortText: conHenNar.shortText,
        longText: conHenNar.longText,
        sources: conHenNar.sources,
      });
      contextParts.push(
        `[Địa danh: ${p?.name || 'Cồn Hến'}]\n` +
          `- Địa chỉ: ${p?.address || 'Cồn Hến, Vĩ Dạ, TP Huế'}\n` +
          `- Thuyết minh chính thức: ${conHenNar.shortText}\n` +
          `- Chi tiết: ${conHenNar.longText}\n` +
          `- Nguồn: ${conHenNar.sources}`,
      );
    }
  }

  return {
    contextText: contextParts.join('\n\n'),
    usedPlaceIds,
    matchedContexts,
  };
}

/**
 * Trả lời tự nhiên, đúng trọng tâm câu hỏi của người dùng
 */
export function buildNaturalHueResponse(
  question: string,
  matchedContexts: MatchedPlaceContext[],
  currentNearbyPlace?: string,
  liveWeather?: { tempCelsius?: number; description?: string; isRaining?: boolean; isExtremelyHot?: boolean } | null,
): string {
  const qNorm = (question || '').toLowerCase().trim();
  const qNoAccent = removeAccents(qNorm);

  // =========================================================================
  // 1. CHÀO HỎI / CẢM ƠN / TẠM BIỆT / HỎI VỀ MỆ HUẾ (Khi không kèm câu hỏi chuyên môn)
  // =========================================================================
  const isPureGreeting =
    (/^(xin chào|chào|dạ chào|hello|hi|hey|alo|mệ ơi|o huế ơi)\b/i.test(qNorm) &&
      qNorm.length < 35 &&
      !/ở đâu|ăn gì|giá vé|mấy giờ|lịch trình|lăng|chùa|đại nội|bún|bánh|chè|cà phê/.test(qNorm)) ||
    /^(bạn là ai|mệ là ai|mệ tên gì|giới thiệu về mệ|mệ biết làm gì)[!.,?\s]*$/i.test(qNorm);

  if (isPureGreeting) {
    return (
      `Dạ, Mệ chào người con thương quý nhen! 👑 Mệ là **Mệ Huế** — hướng dẫn viên bản địa của ứng dụng **HUEGO**.\n\n` +
      `Mệ có thể giúp bạn ngay những việc ni:\n` +
      `• **Kể chuyện lịch sử & kiến trúc** Đại Nội, 7 lăng tẩm triều Nguyễn, Chùa Thiên Mụ, Cầu Tràng Tiền...\n` +
      `• **Báo giá vé, giờ mở cửa, góc chụp ảnh cổ phục** đẹp nhất từng di tích.\n` +
      `• **Chỉ điểm quán ngon chuẩn vị Huế** (bún bò, cơm hến, bánh bèo nậm lọc, bánh ép, chè cung đình, cà phê muối).\n` +
      `• **Lên lịch trình 1–3 ngày** hoặc đổi điểm đi chơi hợp thời tiết nắng mưa.\n\n` +
      `Hôm nay bạn đang muốn đi thăm lăng tẩm, kiếm món chi ngon, hay lên lịch trình khám phá Huế rứa?`
    );
  }

  if (/^(cảm ơn|cám ơn|thank|thanks|tuyệt quá|hay quá|ok cảm ơn|dạ cảm ơn)/i.test(qNorm) && qNorm.length < 40) {
    return `Dạ không có chi mô nhen! Đi chơi Huế mà cần tìm quán ăn ngon, hỏi giá vé lăng tẩm hay nghe thêm chuyện thâm cung bí sử triều Nguyễn thì cứ ới Mệ liền nghe. Chúc bạn có những kỷ niệm thật thương nơi đất Cố Đô! 🌸`;
  }

  if (/^(tạm biệt|bye|hẹn gặp lại|chào tạm biệt)/i.test(qNorm) && qNorm.length < 40) {
    return `Dạ Mệ chào tạm biệt bạn nhen! Chúc bạn thượng lộ bình an, nhớ giữ những bức ảnh thật thơ và hương vị Huế thương trong lòng. Khi mô quay lại Cố Đô nhớ ghé thăm Mệ nghe! 💜`;
  }

  // =========================================================================
  // 2. KHI CÂU HỎI NHẮC ĐẾN ĐỊA DANH CỤ THỂ TRONG CƠ SỞ DỮ LIỆU DI SẢN
  // =========================================================================
  if (matchedContexts.length > 0) {
    const sub = detectLandmarkSubIntent(qNorm, qNoAccent);

    // Nếu người dùng hỏi so sánh hoặc hỏi nhiều địa danh cùng lúc (VD: Đại Nội và Lăng Tự Đức)
    if (matchedContexts.length > 1) {
      const parts = matchedContexts.map((ctx, idx) => {
        const rule = LANDMARK_KEYWORD_MAP.find((r) => r.matchNames.some((mn) => ctx.placeName.toLowerCase().includes(mn)));
        let detail = ctx.shortText;
        if (sub.asksTicket && rule) {
          detail = `Giá vé: ${rule.defaultTicket}. Địa chỉ: ${ctx.address}.`;
        } else if (sub.asksHours && rule) {
          detail = `Giờ mở cửa: ${rule.defaultHours}. Địa chỉ: ${ctx.address}.`;
        }
        return `${idx + 1}. **${ctx.placeName}**:\n${detail}`;
      });
      return (
        `Dạ thưa bạn, bạn đang hỏi về ${matchedContexts.map((c) => `**${c.placeName}**`).join(' và ')}. Mệ tổng hợp rõ ràng từng điểm để bạn dễ nắm bắt và sắp xếp hành trình nhen:\n\n` +
        parts.join('\n\n') +
        `\n\n*(Nguồn tư liệu xác thực: ${matchedContexts[0].sources})*`
      );
    }

    // Trường hợp 1 địa danh cụ thể: trả lời trúng phóc khía cạnh người dùng hỏi
    const ctx = matchedContexts[0];
    const rule = LANDMARK_KEYWORD_MAP.find((r) => r.matchNames.some((mn) => ctx.placeName.toLowerCase().includes(mn)));

    // 2a. Hỏi về GIỜ MỞ CỬA / THỜI ĐIỂM THAM QUAN
    if (sub.asksHours && !sub.asksHistory) {
      const hours = rule?.defaultHours || 'Mùa hè từ 07:00 – 17:30, mùa đông từ 07:30 – 17:00 hằng ngày';
      const photoAdvice = ctx.story?.photoSpotAdvice
        ? `\n• **Thời điểm vàng để ngắm cảnh & chụp ảnh**: ${ctx.story.photoSpotAdvice}`
        : '';
      return (
        `Dạ thưa bạn, về thời gian mở cửa và khung giờ tham quan đẹp nhất tại **${ctx.placeName}**:\n\n` +
        `• **Giờ mở cửa**: ${hours}.\n` +
        `• **Địa chỉ**: ${ctx.address}.\n` +
        `• **Giá vé**: ${rule?.defaultTicket || 'Theo quy định của Trung tâm Bảo tồn Di tích Cố đô Huế'}.` +
        photoAdvice +
        `\n\nBạn nên đi vào buổi sáng sớm (07:00 – 09:30) hoặc buổi chiều (15:30 – 17:15) để trời dịu mát và ánh nắng lên hình đẹp nhất nhen!`
      );
    }

    // 2b. Hỏi về GIÁ VÉ / CHI PHÍ
    if (sub.asksTicket && !sub.asksHistory) {
      const ticket = rule?.defaultTicket || (ctx.ticketPriceVnd ? `${ctx.ticketPriceVnd.toLocaleString('vi-VN')} VNĐ/người` : 'Miễn phí hoặc theo quy định tại quầy vé');
      return (
        `Dạ thưa bạn, thông tin giá vé tham quan **${ctx.placeName}** hiện tại như sau nhen:\n\n` +
        `• **Mức vé**: ${ticket}.\n` +
        `• **Giờ đón khách**: ${rule?.defaultHours || '07:00 – 17:30 hằng ngày'}.\n` +
        `• **Địa chỉ**: ${ctx.address}.\n\n` +
        `💡 **Mẹo tiết kiệm từ Mệ Huế**: Nếu bạn dự định đi cả Đại Nội và các lăng (Minh Mạng, Tự Đức, Khải Định), bạn nên mua **vé tuyến gộp (Combo 3 điểm: 420.000đ hoặc Combo 4 điểm: 530.000đ)** ngay tại quầy vé hoặc qua cổng vé điện tử Huế-S để tiết kiệm hơn mua lẻ từng điểm nhen!`
      );
    }

    // 2c. Hỏi về ĐỊA CHỈ / ĐƯỜNG ĐI / CÁCH DI CHUYỂN
    if (sub.asksLocation && !sub.asksHistory) {
      return (
        `Dạ, đường đi và vị trí của **${ctx.placeName}** rất dễ tìm nhen:\n\n` +
        `• **Địa chỉ chính xác**: ${ctx.address}.\n` +
        `• **Hướng dẫn di chuyển**: ${rule?.transportTip || 'Bạn có thể di chuyển thuận tiện bằng xe máy, taxi hoặc xe đạp xanh từ trung tâm thành phố.'}\n` +
        `• **Giờ mở cửa**: ${rule?.defaultHours || '07:00 – 17:30'}.\n` +
        (ctx.story?.localSpecialtyPairing ? `• **Gợi ý ăn uống gần đó**: ${ctx.story.localSpecialtyPairing}` : '')
      );
    }

    // 2d. Hỏi về CHỤP ẢNH / CHECK-IN / TRANG PHỤC
    if (sub.asksPhoto) {
      const photoSpot = ctx.story?.photoSpotAdvice || 'Khu vực cổng chính và trục sân chầu lúc nắng sớm (07:30 – 09:00) hoặc hoàng hôn (16:15 – 17:15) lên màu rêu phong tuyệt đẹp.';
      return (
        `Dạ, chụp ảnh tại **${ctx.placeName}** thì chuẩn chất thơ Cố Đô luôn nhen! Mệ mách bạn bí quyết để có bộ ảnh để đời:\n\n` +
        `• **Góc máy & Thời điểm đẹp nhất**: ${photoSpot}\n` +
        `• **Trang phục hợp cảnh**: Áo dài ngũ thân truyền thống, cổ phục Nhật Bình (tông màu đỏ, vàng hoàng lưu ly, xanh ngọc hoặc trắng tinh khôi).\n` +
        (ctx.story?.ecoGreenTip ? `• **Lưu ý nhỏ khi tham quan**: ${ctx.story.ecoGreenTip}` : '')
      );
    }

    // 2e. Hỏi về ĂN UỐNG QUANH ĐỊA ĐIỂM ĐÓ
    if (sub.asksNearbyFood) {
      const pairing = ctx.story?.localSpecialtyPairing || 'Xung quanh khu vực này có nhiều quán bánh bèo, nậm, lọc, bún bò Huế và chè truyền thống rất ngon.';
      return (
        `Dạ, tham quan **${ctx.placeName}** xong mà đi thưởng thức ẩm thực quanh đó là chuẩn bài luôn nhen:\n\n` +
        `• **Gợi ý sát điểm đến**: ${pairing}\n` +
        `• **Địa chỉ khu vực**: Quanh ${ctx.address}.\n\n` +
        `Nếu bạn muốn ăn món cụ thể như bún bò, bánh ép, cơm hến hay uống cà phê muối gần đây thì nhắn Mệ chỉ tên quán chi tiết liền nghe!`
      );
    }

    // 2f. Hỏi về BÍ ẨN / KIẾN TRÚC / CHUYỆN ÍT NGƯỜI BIẾT
    if (sub.asksSecret) {
      const secret = ctx.story?.secretHistoricalFact || ctx.longText || ctx.shortText;
      return (
        `Dạ, về những nét kiến trúc độc đáo và giai thoại bí ẩn của **${ctx.placeName}**, Mệ kể bạn nghe điều thú vị ni nhen:\n\n` +
        `${secret}\n\n` +
        `• **Tổng quan lịch sử**: ${ctx.shortText}\n` +
        `*(Nguồn tư liệu xác thực: ${ctx.sources})*`
      );
    }

    // 2g. Hỏi LỊCH SỬ / NĂM XÂY DỰNG / TỔNG QUAN ĐỊA DANH
    const extraSecret = ctx.story?.secretHistoricalFact
      ? `\n\n✨ **Điểm đặc biệt ít người biết**: ${ctx.story.secretHistoricalFact}`
      : ctx.longText && ctx.longText !== ctx.shortText
        ? `\n\n📜 **Chi tiết lịch sử**: ${ctx.longText}`
        : '';
    const extraPractical = rule
      ? `\n\n📌 **Thông tin tham quan thực tế**:\n• **Địa chỉ**: ${ctx.address}\n• **Giờ mở cửa**: ${rule.defaultHours}\n• **Giá vé**: ${rule.defaultTicket}`
      : '';

    return (
      `Dạ thưa bạn, Mệ xin chia sẻ chi tiết về **${ctx.placeName}** nhen:\n\n` +
      `${ctx.shortText}` +
      extraSecret +
      extraPractical +
      `\n\n*(Nguồn tư liệu xác thực: ${ctx.sources})*`
    );
  }

  // =========================================================================
  // 3. CÂU HỎI VỀ CÁC VỊ VUA TRIỀU NGUYỄN (1802 - 1945)
  // =========================================================================
  if (/13 đời vua|13 vị vua|các vua nhà nguyễn|các vị vua triều nguyễn|danh sách vua nguyễn|vua triều nguyễn/.test(qNorm) || /13 doi vua|13 vi vua/.test(qNoAccent)) {
    return (
      `Dạ thưa bạn, vương triều nhà Nguyễn trị vì tại kinh đô Phú Xuân (Huế) suốt **143 năm (1802 – 1945)** với **13 vị hoàng đế** theo thứ tự niên đại như sau nhen:\n\n` +
      `1. **Vua Gia Long** (1802 – 1820) — Vị vua sáng lập triều Nguyễn, thống nhất sơn hà, khởi công xây dựng Kinh thành Huế năm 1804.\n` +
      `2. **Vua Minh Mạng** (1820 – 1841) — Vị hoàng đế kiệt xuất hoàn thiện quy mô Đại Nội và cải cách hành chính đại tài.\n` +
      `3. **Vua Thiệu Trị** (1841 – 1847) — Vị vua hiền hòa, thi sĩ tài hoa, xây tháp Phước Duyên chùa Thiên Mụ và điện Long An.\n` +
      `4. **Vua Tự Đức** (1847 – 1883) — Trị vì lâu nhất (36 năm), chủ nhân Khiêm Lăng thơ mộng.\n` +
      `5. **Vua Dục Đức** (1883 — tại vị 3 ngày).\n` +
      `6. **Vua Hiệp Hòa** (1883 — tại vị 4 tháng).\n` +
      `7. **Vua Kiến Phúc** (1883 – 1884).\n` +
      `8. **Vua Hàm Nghi** (1884 – 1885) — Vị vua trẻ yêu nước phát chiếu Cần Vương chống Pháp.\n` +
      `9. **Vua Đồng Khánh** (1885 – 1889).\n` +
      `10. **Vua Thành Thái** (1889 – 1907) — Vị vua yêu nước, cấp tiến (xây cầu Tràng Tiền, chợ Đông Ba).\n` +
      `11. **Vua Duy Tân** (1907 – 1916) — Vị vua thiếu niên anh hùng khởi nghĩa chống thực dân.\n` +
      `12. **Vua Khải Định** (1916 – 1925) — Chủ nhân Ứng Lăng giao thoa kiến trúc Đông – Tây.\n` +
      `13. **Vua Bảo Đại** (1926 – 1945) — Vị hoàng đế cuối cùng thoái vị tại Ngọ Môn ngày 30/8/1945.\n\n` +
      `Bạn muốn nghe sâu hơn về cuộc đời hay lăng tẩm của vị vua nào, cứ nhắn Mệ kể tiếp nhen!`
    );
  }

  // =========================================================================
  // 4. CÂU HỎI VỀ ẨM THỰC & MÓN NGON CỤ THỂ XỨ HUẾ
  // =========================================================================
  // 4.1. Bún bò Huế
  if (/bún bò|bun bo/.test(qNorm) || /bun bo/.test(qNoAccent)) {
    return (
      `Dạ, nhắc tới **Bún bò Huế** là nhắc tới linh hồn ẩm thực Cố Đô! Tô bún bò chuẩn vị Huế dùng sợi bún nhỏ, nước lèo trong veo ninh từ xương ống bò và giò heo cùng sả cây thơm lừng, dậy mùi mắm ruốc Huế đặc trưng và chút ớt chưng cay nồng.\n\n` +
      `🍜 **Những quán bún bò ngon trứ danh người dân bản địa hay ăn**:\n` +
      `1. **Bún bò Mụ Rơi**: Số 40 Nguyễn Chí Diểu (hoặc đường Nguyễn Du, gần Đại Nội) — nước dùng ngọt thanh, chả cua và nạm gân mềm rụm (bán sáng: 06:00 – 10:00).\n` +
      `2. **Bún bò Bà Tuyết**: Số 47 Nguyễn Công Trứ, Phú Hội — đầy đặn giò heo, tiết mềm, chả cua (06:00 – 22:00).\n` +
      `3. **Bún bò O Phụng (Chú Vọng)**: Số 14 Nguyễn Du — nổi tiếng tô bún giò gân đậm đà buổi chiều.\n` +
      `4. **Bún bò Mệ Kéo**: Số 20 Bạch Đằng (bờ Bắc) — quán gánh truyền thống hơn 70 năm tuổi.\n\n` +
      `• **Giá tham khảo**: 35.000đ – 55.000đ/tô. Khi ăn bạn nhớ thêm chút ớt sa tế sả và rau sống bắp chuối bào mới đúng điệu Huế nhen!`
    );
  }

  // 4.2. Cơm hến / Bún hến
  if (/cơm hến|bún hến|mì hến|com hen|bun hen/.test(qNorm) || /com hen|bun hen/.test(qNoAccent)) {
    return (
      `Dạ, **Cơm hến – Bún hến** là món ăn dân dã mà tinh tế bậc nhất của vùng Cồn Hến bên sông Hương! Một tô cơm hến đúng chuẩn phải dùng cơm trắng để nguội, trộn cùng hến xào măng khô, tóp mỡ chiên giòn, đậu phộng rang, mắm ruốc, ớt màu cay xè và chan chén nước luộc hến nóng hổi thơm mùi gừng.\n\n` +
      `🥣 **Địa chỉ ăn Cơm hến ngon chuẩn gốc**:\n` +
      `1. **Cơm hến Hoa Đông (Gốc Cồn Hến)**: Số 64 Kiệt 7 Ưng Bình, Cồn Hến, Vĩ Dạ (mở 06:30 – 21:00).\n` +
      `2. **Cơm hến Bà Cam**: Số 49 Tùng Thiện Vương, Vĩ Dạ.\n` +
      `3. **Quán Nhỏ (Trung tâm bờ Nam)**: Số 11 Ngô Quyền (trong sân khách sạn Festival, mở buổi sáng 06:00 – 10:30).\n` +
      `4. **Cơm hến Hàn Mặc Tử**: Dọc đường Hàn Mặc Tử, Vĩ Dạ.\n\n` +
      `• **Giá tham khảo**: Chỉ từ 15.000đ – 25.000đ/tô, ăn kèm một ly chè bắp Cồn Hến ngọt mát là tròn vị nhen!`
    );
  }

  // 4.3. Bánh bèo, nậm, lọc, ram ít, bánh khoái, bánh ướt, bánh ép
  if (/bánh bèo|bánh nậm|bánh lọc|bánh bột lọc|ram ít|bánh khoái|bánh ướt|nem lụi|bánh ép|banh beo|banh nam|banh loc|banh ep|banh khoai|nem lui/.test(qNorm) || /banh beo|banh loc|banh ep|banh khoai/.test(qNoAccent)) {
    if (/bánh ép|banh ep/.test(qNorm) || /banh ep/.test(qNoAccent)) {
      return (
        `Dạ, **Bánh ép Huế** là món ăn vặt "gây thương nhớ" số 1 của giới trẻ Cố Đô! Bột lọc tươi được ép nóng trực tiếp trên khuôn gang cùng trứng, thịt heo ướp sả, pate, bò khô rồi cuộn với đu đủ chua, dưa leo, rau răm chấm nước mắm tỏi ớt chua ngọt hoặc mắm nêm.\n\n` +
        `🥞 **Top quán bánh ép ngon chuẩn vị**:\n` +
        `1. **Bánh ép Cây Dừa (Trong Thành Nội)**: Số 69 – 73 Nhật Lệ, Thuận Thành (14:00 – 21:00).\n` +
        `2. **Bánh ép Gia Di**: Số 101 Bà Triệu hoặc số 4 Phùng Chí Kiên — không gian sạch đẹp, có cả bánh ép dẻo và bánh ép khô.\n` +
        `3. **Bánh ép Chị Huệ**: Số 118 Lê Ngô Cát (trên đường đi Lăng Tự Đức & Đồi Vọng Cảnh).\n\n` +
        `• **Giá tham khảo**: Chỉ 25.000đ – 40.000đ là ăn no nê luôn nhen!`
      );
    }

    if (/bánh khoái|nem lụi|bánh ướt|banh khoai|nem lui|banh uot/.test(qNorm) || /banh khoai|nem lui|banh uot/.test(qNoAccent)) {
      return (
        `Dạ, **Bánh khoái – Nem lụi – Bánh ướt thịt nướng** là bộ ba món ngon trứ danh nhờ chén **nước lèo** nấu từ gan heo, thịt băm, mè rang và đậu phộng béo bùi đặc sánh!\n\n` +
        `🌯 **Địa chỉ ngon nhất tại Huế**:\n` +
        `1. **Bánh khoái Hồng Mai**: Số 110 Đinh Tiên Hoàng (gần cửa Thượng Tứ) — vỏ bánh giòn rụm, nhân tôm tươi, thịt, giá đỗ và trứng.\n` +
        `2. **Bánh khoái Lạc Thiện**: Số 6 Đinh Tiên Hoàng — quán gia truyền lâu đời nổi tiếng với du khách quốc tế.\n` +
        `3. **Bánh ướt thịt nướng & Bún thịt nướng Huyền Anh**: Số 50 Kim Long (trên đường đi Chùa Thiên Mụ, mở 08:30 – 20:30).\n` +
        `4. **Nem lụi Tài Phú**: Số 2 Điện Biên Phủ, Vĩnh Ninh.`
      );
    }

    return (
      `Dạ, bộ tứ **Bánh bèo chén – Bánh nậm – Bánh bột lọc – Bánh ram ít** chính là tinh hoa quà chiều của người Huế! Bánh bèo chén mỏng mịn rắc tôm chấy đỏ au và tóp mỡ, bánh nậm gói lá dong thơm dịu, còn bánh lọc nhân tôm thịt rim đậm đà.\n\n` +
      `🍽️ **Những quán bánh Huế ngon nức tiếng**:\n` +
      `1. **Quán Bà Đỏ**: Số 8 Nguyễn Bỉnh Khiêm, Phú Cát (mở 08:00 – 21:00) — đầy đủ khay bánh bèo, nậm, lọc, ram ít, bánh cuốn tôm chua.\n` +
      `2. **Bánh O Lé (Nhà vườn Kim Long)**: Kiệt 104 Kim Long.\n` +
      `3. **Phố bánh Chi Lăng – Nguyễn Bỉnh Khiêm** hoặc **Cung An Định (đường Ngự Bình, An Cựu)** — nơi có các mệ gánh bánh truyền thống từ 15:00 chiều.\n` +
      `4. **Quán Hàng Me Mẹ**: Số 12 Võ Thị Sáu, Phú Hội.`
    );
  }

  // 4.4. Chè Huế / Chè heo quay
  if (/\bchè\b|chè huế|chè hẻm|chè heo quay|chè bột lọc|chè cung đình|che hue|che hem|che heo quay/.test(qNorm) || /\bche hue\b|\bche hem\b/.test(qNoAccent)) {
    return (
      `Dạ, xứ Huế được mệnh danh là kinh đô của hàng chục loại chè từ cung đình đến dân gian! Độc đáo nhất phải kể đến **Chè bột lọc bọc heo quay** (vị mặn béo của thịt quay hòa quyện vị ngọt thanh của đường phèn gừng), **Chè hạt sen bọc nhãn lồng**, **Chè đậu ngự** và **Chè khoai tía**.\n\n` +
      `🍧 **Địa chỉ ăn chè ngon nhất ở Huế**:\n` +
      `1. **Chè Mợ Tôn Đích**: Trước cổng Công viên Thương Bạc (đường Trần Hưng Đạo, mở từ 18:00 – 22:30) — nổi tiếng nhất với chè bột lọc heo quay và mâm chè 20 món.\n` +
      `2. **Chè Hẻm Hùng Vương**: Số 1 Kiệt 29 Hùng Vương, Phú Hội (mở 10:00 – 22:00).\n` +
      `3. **Chè Cầm**: Số 10 Nguyễn Sinh Cung, Vĩ Dạ.\n` +
      `4. **Chè Ông Lạc**: Số 36 Thanh Tịnh (nổi tiếng chè trái cây và chè đậu).\n\n` +
      `• **Giá tham khảo**: Chỉ 15.000đ – 25.000đ/ly, gọi khay chè thập cẩm nhiều chén nhỏ thử được đủ vị luôn nhen!`
    );
  }

  // 4.5. Cà phê muối & Quán Cafe đẹp
  if (/cà phê|cafe|coffee|uống nước|quán nước|ca phe/.test(qNorm) || /ca phe|cafe/.test(qNoAccent)) {
    return (
      `Dạ, Huế chính là nơi khai sinh ra món **Cà phê muối** nổi tiếng khắp Việt Nam! Vị đắng dịu của cà phê phin truyền thống hòa quyện cùng lớp kem sữa béo ngậy và chút muối tinh mằn mặn làm dậy lên hương thơm rất riêng.\n\n` +
      `☕ **Top quán Cà phê Muối & Cà phê đẹp tại Huế**:\n` +
      `1. **Cà phê Muối (Quán gốc đầu tiên ở Huế)**: Số 10 Nguyễn Lương Định (cơ sở 1) và **Số 142 Đặng Thái Thân** (cơ sở 2 ngay sát bờ tường Đại Nội Huế) — giá chỉ 18.000đ – 25.000đ/ly.\n` +
      `2. **Tân. Cafe**: Số 14 Phạm Hồng Thái hoặc 86 Đinh Tiên Hoàng — không gian hoài cổ đậm chất Huế xưa.\n` +
      `3. **Giao Hòa / Thành Cafe**: Khu vực đường Đinh Tiên Hoàng – Phượng Bay trong Thành Nội.\n` +
      `4. **Mắt Biếc Cafe (Làng cổ Bao Vinh)**: Ngắm sông Hương thơ mộng trong bối cảnh phim Mắt Biếc.`
    );
  }

  // 4.6. Ăn chay Huế
  if (/ăn chay|quán chay|cơm chay|món chay|an chay|quan chay/.test(qNorm) || /an chay|quan chay/.test(qNoAccent)) {
    return (
      `Dạ, Huế là đất Phật nên ẩm thực chay ở Huế cực kỳ phong phú và thanh tao! Ngay cả bún bò chay, bánh bèo nậm lọc chay hay lẩu nấm chay đều được chế biến rất khéo léo.\n\n` +
      `🪷 **Những quán chay ngon & thanh tịnh tại Huế**:\n` +
      `1. **Chay Liên Hoa**: Số 3 Lê Quý Đôn, Phú Nhuận — không gian nhà vườn rộng rãi, thực đơn hơn 60 món chay Huế (bánh bèo, bánh lọc chay, lẩu chay).\n` +
      `2. **Nhà hàng Chay Sân Mây**: Số 8 Thanh Hương (hoặc khu vực Lê Lợi) — không gian thiền định sang trọng.\n` +
      `3. **Quán Chay Bồ Đề**: Số 11 Lê Lợi (gần cầu Trường Tiền).\n` +
      `4. **Quán Chay Bà Minh / Chay Thanh Liễu**: Đường Ngô Quyền và khu vực quanh chùa Từ Đàm.`
    );
  }

  // 4.7. Đặc sản mua về làm quà
  if (/làm quà|mua quà|quà huế|mang về|đặc sản làm quà|mua gi ve|lam qua/.test(qNorm) || /mua qua|lam qua/.test(qNoAccent)) {
    return (
      `Dạ, đi Huế về mà mua quà biếu gia đình, bạn bè thì Mệ gợi ý những thức quà tinh hoa, dễ đóng gói mang lên máy bay/tàu hỏa ni nhen:\n\n` +
      `🎁 **Top đặc sản Huế mua làm quà chuẩn gốc**:\n` +
      `1. **Mè xửng Thiên Hương** (Mè xửng giòn hoặc mè xửng dẻo truyền thống) — mua tại số 20 Chi Lăng hoặc chợ Đông Ba.\n` +
      `2. **Trà Cung Đình Huế** (Đức Phượng, Nhất Diệp) — thảo mộc 16–26 vị tốt cho giấc ngủ và sức khỏe.\n` +
      `3. **Tôm chua Huế** (Tôm chua Trọng Tín, Cô Ri) & **Mắm ruốc Bà Duệ**.\n` +
      `4. **Bánh bột lọc gói lá chuối hút chân không** (Quán Bà Đỏ – 8 Nguyễn Bỉnh Khiêm có đóng hộp mang đi).\n` +
      `5. **Trầm hương Làng Thủy Xuân**, **Dầu tràm Đan Viện Thiên An**, và **Nón lá bài thơ xứ Huế**.`
    );
  }

  // 4.8. Câu hỏi tổng quát về Ẩm thực / Ăn gì ở Huế / Ăn vặt
  if (/ẩm thực|ăn gì|món ngon|quán ngon|ăn vặt|ăn sáng|ăn trưa|ăn tối|ăn đêm|đặc sản|am thuc|an gi|mon ngon|an vat/.test(qNorm) || /am thuc|an gi|mon ngon|an vat/.test(qNoAccent)) {
    if (/ăn sáng|buổi sáng ăn gì|an sang/.test(qNorm)) {
      return (
        `Dạ, buổi sáng ở Huế người dân thường bắt đầu ngày mới bằng những món nóng hổi, đậm đà ni nhen:\n\n` +
        `1. **Bún bò Huế**: Quán Mụ Rơi (40 Nguyễn Chí Diểu) hoặc Bà Tuyết (47 Nguyễn Công Trứ).\n` +
        `2. **Cơm hến – Bún hến**: Quán Hoa Đông (Cồn Hến) hoặc Quán Nhỏ (11 Ngô Quyền).\n` +
        `3. **Xôi thịt hon hoặc Bánh canh Nam Phổ**: Khu vực đường Hàn Thuyên – Đinh Tiên Hoàng.\n` +
        `4. Nhâm nhi thêm một ly **Cà phê muối** tại 142 Đặng Thái Thân trước khi vào tham quan Đại Nội là tuyệt vời nhất!`
      );
    }

    if (/ăn tối|ăn đêm|khuya|buổi tối ăn gì|an toi|an dem/.test(qNorm)) {
      return (
        `Dạ, buổi tối và ban đêm ở Huế có rất nhiều món ngon ấm bụng để bạn vừa ăn vừa dạo phố:\n\n` +
        `1. **Bánh khoái & Nem lụi**: Quán Hồng Mai (110 Đinh Tiên Hoàng) hoặc Tài Phú (2 Điện Biên Phủ).\n` +
        `2. **Cơm Âm Phủ hoặc Cơm niêu Huế**: Quán Âm Phủ (51 Nguyễn Thái Học) hoặc Không Gian Xưa (Lê Lợi – Điện Biên Phủ).\n` +
        `3. **Chè bột lọc bọc heo quay & Chè 20 món**: Quán Mợ Tôn Đích (trước công viên Thương Bạc) hoặc Chè Hẻm (1 Kiệt 29 Hùng Vương).\n` +
        `4. **Bánh mì Tràng Tiền & Bánh canh Hàn Thuyên**: Bán từ 20:00 đến khuya ngay chân cầu Tràng Tiền và đường Hàn Thuyên.`
      );
    }

    return (
      `Dạ, ẩm thực Huế là sự giao thoa tuyệt vời giữa tinh hoa cung đình và hương vị dân gian! Mệ gợi ý danh sách **"Bản đồ món ngon phải thử"** chia theo từng thức quà để bạn dễ chọn nhen:\n\n` +
      `• 🍜 **Món nước đậm đà**: **Bún bò Huế** (Mụ Rơi - 40 Nguyễn Chí Diểu, Bà Tuyết - 47 Nguyễn Công Trứ) & **Cơm hến, Bún hến** (Hoa Đông - Cồn Hến).\n` +
      `• 🥟 **Các loại bánh Huế**: **Bánh bèo, nậm, lọc, ram ít** (Bà Đỏ - 8 Nguyễn Bỉnh Khiêm), **Bánh khoái** (Hồng Mai - 110 Đinh Tiên Hoàng), **Bánh ép dẻo** (Cây Dừa - 69 Nhật Lệ).\n` +
      `• 🍧 **Quà ngọt & Thức uống**: **Chè bột lọc bọc heo quay** (Mợ Tôn Đích - công viên Thương Bạc), **Chè Hẻm** (Kiệt 29 Hùng Vương) và **Cà phê muối** (142 Đặng Thái Thân).\n\n` +
      `Bạn đang thèm món nước, các loại bánh, chè ngọt hay quán cà phê để Mệ chỉ đường chi tiết cho nhen?`
    );
  }

  // =========================================================================
  // 5. CÂU HỎI VỀ LỊCH TRÌNH DU LỊCH & HOẠT ĐỘNG BUỔI TỐI / CA HUẾ
  // =========================================================================
  if (/buổi tối|ban đêm|tối đi đâu|tối chơi gì|về đêm|ca huế|thuyền rồng|phố đi bộ|buoi toi|ban dem|ca hue|thuyen rong/.test(qNorm) || /buoi toi|ban dem|ca hue|thuyen rong/.test(qNoAccent)) {
    return (
      `Dạ, buổi tối ở Huế vừa có nét thơ mộng trầm mặc bên sông Hương, vừa có những góc phố rất vui nhộn! Mệ gợi ý lịch trình buổi tối lý tưởng cho bạn nhen:\n\n` +
      `🌙 **Trải nghiệm buổi tối đặc sắc tại Huế (18:00 – 22:30)**:\n` +
      `1. **18:30 – 19:30 | Dạo Cầu Gỗ Lim & Cầu Tràng Tiền**: Đi bộ dưới ánh đèn LED đổi màu lung linh soi bóng xuống sông Hương và phố đi bộ Nguyễn Đình Chiểu.\n` +
      `2. **19:30 – 20:30 | Nghe Ca Huế trên thuyền rồng sông Hương**: Xuất phát tại **Bến Tòa Khâm (49 Lê Lợi)** các suất 19:00 và 20:00 (giá vé ghép đoàn khoảng 100.000đ – 150.000đ/người, kèm thả hoa đăng cầu bình an).\n` +
      `3. **20:30 – 22:00 | Thưởng thức Chè Huế & Dạo Phố Đêm**: Ghé ăn chè bột lọc heo quay Mợ Tôn Đích, dạo **Phố đêm Hoàng Thành** hoặc **Phố đi bộ Chu Văn An – Phạm Ngũ Lão – Võ Thị Sáu** (cuối tuần rất sôi động).`
    );
  }

  if (/lịch trình|kế hoạch|đi mấy ngày|1 ngày|một ngày|2 ngày|hai ngày|3 ngày|ba ngày|nửa ngày|gợi ý lịch|lich trinh|1 ngay|2 ngay|3 ngay/.test(qNorm) || /lich trinh|1 ngay|2 ngay|3 ngay/.test(qNoAccent)) {
    if (/2 ngày|hai ngày|3 ngày|ba ngày|2n1d|3n2d|2 ngay|3 ngay/.test(qNorm)) {
      return (
        `Dạ, với quỹ thời gian **2 đến 3 ngày ở Huế**, bạn sẽ khám phá được trọn vẹn cả Hoàng cung, Lăng tẩm, Chùa cổ lẫn thiên nhiên Phá Tam Giang! Mệ thiết kế lịch trình chuẩn nhất cho bạn nhen:\n\n` +
        `🗓️ **NGÀY 1: Trái tim Kinh Đô & Dòng Hương Giang**\n` +
        `• **Sáng (07:30 – 11:30)**: Ăn bún bò Huế -> Tham quan **Đại Nội Huế** (Ngọ Môn, Điện Thái Hòa, Thế Miếu, Cung Diên Thọ) & **Bảo tàng Cổ vật Cung đình** -> Uống cà phê muối Đặng Thái Thân.\n` +
        `• **Chiều (14:30 – 18:00)**: Viếng **Chùa Thiên Mụ** -> Ghé **Nhà vườn Kim Long** thưởng trà & ăn bánh ướt thịt nướng -> Mua đặc sản tại **Chợ Đông Ba**.\n` +
        `• **Tối**: Ăn bánh bèo nậm lọc Bà Đỏ -> Dạo **Cầu Tràng Tiền**, Cầu Gỗ Lim & nghe **Ca Huế trên sông Hương**.\n\n` +
        `🗓️ **NGÀY 2: Tuyệt tác Lăng Tẩm & Hoàng hôn Đồi Vọng Cảnh**\n` +
        `• **Sáng (08:00 – 11:30)**: Tham quan **Lăng Minh Mạng** (kiến trúc đăng đối uy nghiêm) & **Lăng Khải Định** (kiến trúc khảm sành sứ Đông – Tây).\n` +
        `• **Chiều (14:30 – 18:00)**: Thăm **Lăng Tự Đức** thơ mộng -> Chụp ảnh tại **Làng hương Thủy Xuân** -> Ngắm hoàng hôn sông Hương từ **Đồi Vọng Cảnh**.\n` +
        `• **Tối**: Thưởng thức bánh khoái Hồng Mai, chè heo quay Mợ Tôn Đích & dạo phố đi bộ Chu Văn An.\n\n` +
        `*(Nếu có thêm Ngày 3: Buổi sáng ghé **Cung An Định** & **Đồi Thiên An**, buổi chiều về rừng ngập mặn **Rú Chá – Đầm Chuồn Phá Tam Giang** ngắm hoàng hôn và ăn hải sản!)*`
      );
    }

    return (
      `Dạ, nếu bạn có **1 ngày khám phá Huế**, Mệ sắp xếp lộ trình tối ưu cung đường di chuyển để bạn đi được hết những điểm tinh hoa nhất mà không bị mệt nhen:\n\n` +
      `☀️ **BUỔI SÁNG (07:30 – 11:30): Hoàng Cung Triều Nguyễn**\n` +
      `• **07:30**: Ăn sáng **Bún bò Huế** (Mụ Rơi hoặc Bà Tuyết) và uống **Cà phê muối** (142 Đặng Thái Thân).\n` +
      `• **08:30 – 11:00**: Tham quan **Đại Nội Huế** (Cổng Ngọ Môn, Điện Thái Hòa, Thế Miếu, Cửu Đỉnh, Cung Diên Thọ) và **Bảo tàng Cổ vật Cung đình Huế**.\n\n` +
      `🌤️ **BUỔI TRƯA (11:30 – 14:00): Tinh hoa Bánh Huế**\n` +
      `• Ăn trưa **Bánh bèo – Nậm – Lọc – Ram ít Bà Đỏ** (8 Nguyễn Bỉnh Khiêm) hoặc **Cơm hến Hoa Đông**.\n\n` +
      `🌅 **BUỔI CHIỀU (14:30 – 18:00): Lăng Tẩm – Làng Nghề – Hoàng Hôn**\n` +
      `• **14:30**: Tham quan **Lăng Khải Định** hoặc **Lăng Tự Đức**.\n` +
      `• **16:00**: Check-in rực rỡ tại **Làng hương Thủy Xuân** và đón hoàng hôn trên **Đồi Vọng Cảnh** (hoặc **Chùa Thiên Mụ**).\n\n` +
      `🌙 **BUỔI TỐI (19:00 – 21:30): Nhịp thở Sông Hương**\n` +
      `• Dạo bộ **Cầu Tràng Tiền – Cầu Gỗ Lim**, ăn **Chè bột lọc heo quay** và nghe **Ca Huế trên thuyền rồng**!`
    );
  }

  // =========================================================================
  // 6. CÂU HỎI VỀ THỜI TIẾT / TRỜI MƯA / MÙA ĐẸP NHẤT ĐI HUẾ
  // =========================================================================
  if (/mưa|nắng|thời tiết|nhiệt độ|mùa nào|tháng mấy|mua hue|thoi tiet/.test(qNorm) || /thoi tiet|troi mua/.test(qNoAccent)) {
    const weatherInfo = liveWeather?.tempCelsius
      ? `Hiện tại thời tiết ở Huế đang khoảng **${liveWeather.tempCelsius}°C** (${liveWeather.description || 'dịu mát'}). `
      : '';

    return (
      `Dạ, ${weatherInfo}mưa nắng xứ Huế vốn mang nét thi vị rất riêng! Mệ gợi ý cho bạn cách chọn điểm đi chơi chuẩn nhất theo thời tiết nhen:\n\n` +
      `• 🌧️ **Nếu gặp ngày mưa Huế hoặc nắng gắt**: Bạn nên ưu tiên các điểm **trong nhà (Indoor)** như:\n` +
      `  1. **Bảo tàng Cổ vật Cung đình Huế (Điện Long An - 3 Lê Trực)**: Ngắm cổ vật hoàng cung trong tòa điện gỗ lim 128 cột.\n` +
      `  2. **Cung An Định (179B Phan Đình Phùng)**: Lâu đài kiến trúc châu Âu tân cổ điển với bích họa Khải Tường Lâu.\n` +
      `  3. **Không gian Trà Cung Đình Kim Long** hoặc quán **Cà phê Muối (142 Đặng Thái Thân)** ngồi nhâm nhi trà nóng ngắm mưa rơi.\n` +
      `• ☀️ **Mùa đẹp nhất đi Huế**: Từ **tháng 1 đến tháng 8** (đặc biệt tháng 3 – tháng 5 tiết trời xuân hè trong xanh, mùa sen nở trong Đại Nội và Hồ Tịnh Tâm, cùng các kỳ Festival Huế rực rỡ).`
    );
  }

  // =========================================================================
  // 7. CÂU HỎI VỀ PHƯƠNG TIỆN DI CHUYỂN / THUÊ XE ĐẠP / XÍCH LÔ / LƯU TRÚ
  // =========================================================================
  if (/xe đạp|thuê xe|xe máy|xích lô|di chuyển|đi lại|taxi|xe buýt|thue xe|xe dap|xich lo/.test(qNorm) || /thue xe|xe dap|xich lo/.test(qNoAccent)) {
    return (
      `Dạ, di chuyển khám phá Huế rất nhẹ nhàng và thuận tiện, đặc biệt ứng dụng HUEGO rất khuyến khích **Du lịch Xanh** để tích lũy Green Points! Mệ gợi ý các phương tiện phổ biến nhất nhen:\n\n` +
      `🚲 **1. Xe đạp xanh công cộng (Eco-Bike)**:\n` +
      `• Có các trạm ngay tại **Bến Tòa Khâm (Lê Lợi)**, **Cầu Trường Tiền**, **Cửa Hiển Nhơn (Đại Nội)** và dọc công viên hai bờ sông Hương.\n` +
      `• Giá thuê chỉ khoảng **20.000đ – 40.000đ/giờ**, cực kỳ hợp để đạp vòng quanh Thành Nội, Kim Long và cầu Tràng Tiền.\n\n` +
      `🛵 **2. Thuê xe máy tự túc**:\n` +
      `• Rất tiện khi đi các lăng tẩm ở xa (Minh Mạng, Khải Định, Đồi Vọng Cảnh, Đầm Chuồn). Giá thuê từ **120.000đ – 150.000đ/ngày** tại khu phố Phạm Ngũ Lão – Chu Văn An – Hùng Vương.\n\n` +
      `🛺 **3. Xích lô Huế & Xe buýt 2 tầng mui trần**:\n` +
      `• Đi xích lô dạo quanh bốn cửa Hoàng Thành hoặc đi xe buýt 2 tầng xuất phát từ Bến Tòa Khâm có thuyết minh tự động rất thú vị!`
    );
  }

  if (/khách sạn|homestay|nhà nghỉ|resort|lưu trú|chỗ ở|ngủ ở đâu|khach san|luu tru/.test(qNorm) || /khach san|homestay|luu tru/.test(qNoAccent)) {
    return (
      `Dạ, tùy theo sở thích mà bạn có thể chọn khu vực lưu trú tại Huế rất đa dạng nhen:\n\n` +
      `🏨 **1. Khu vực Trung tâm bờ Nam (Lê Lợi, Chu Văn An, Võ Thị Sáu, Phạm Ngũ Lão)**:\n` +
      `• Gần cầu Tràng Tiền, phố đi bộ và bến thuyền, buổi tối rất nhộn nhịp.\n` +
      `• Gợi ý: *Azerai La Résidence Hue, Silk Path Grand Hue, Saigon Morin, Eldora Hotel*, hoặc các homestay xinh xắn trong hẻm Chu Văn An – Nguyễn Công Trứ.\n\n` +
      `🌿 **2. Khu vực Nhà vườn Kim Long – Thủy Biều – Thủy Xuân**:\n` +
      `• Không gian yên tĩnh giữa vườn thanh trà, gần Chùa Thiên Mụ và Lăng Tự Đức.\n` +
      `• Gợi ý: *Hue Ecolodge (Thủy Biều), Pilgrimage Village Boutique Resort & Spa (Thủy Xuân), Ancient Hue Garden Houses (Kim Long)*.`
    );
  }

  // =========================================================================
  // 8. CÂU HỎI VỀ TÍNH NĂNG HUEGO: GREEN POINTS / MỞ KHÓA GPS / QR / CHỨNG NHẬN
  // =========================================================================
  if (/green point|điểm xanh|mở khóa|check-in|check in|chứng nhận|certificate|mã qr|geofenc|diem xanh|mo khoa|chung nhan/.test(qNorm) || /diem xanh|mo khoa|chung nhan/.test(qNoAccent)) {
    return (
      `Dạ, tính năng **Du lịch Xanh (Green Points)** là điểm đặc biệt nhất của **HUEGO** đó bạn:\n\n` +
      `• 📍 **Mở khóa bằng GPS Geofencing**: Khi bạn đến thực tế trong bán kính di tích (35m – 150m) và bấm **"Check-in Mở Khóa GPS"**, hệ thống PostGIS sẽ xác thực vị trí, mở khóa bài thuyết minh âm thanh di sản và cộng ngay **+20 đến +50 Green Points (GP)**.\n` +
      `• 📱 **Mã QR dự phòng**: Nếu GPS trong nhà bị yếu, bạn có thể quét hoặc nhập mã QR đặt tại điểm di tích để mở khóa.\n` +
      `• 🏅 **Chứng nhận Du lịch Xanh (E-Certificate)**: Khi tích lũy đủ **200 GP** (hoặc mở khóa đạt tiến độ hành trình), bạn sẽ được cấp **Chứng nhận điện tử PDF có gắn mã QR xác thực** vinh danh Đại sứ Du lịch Xanh Cố Đô!`
    );
  }

  // =========================================================================
  // 9. TÌM KIẾM ĐỘNG TRONG 4.352 ĐỊA ĐIỂM THẬT CỦA HUEGO (places_all.json)
  // =========================================================================
  const catalog = loadCatalogPlaces();
  if (catalog.length > 0) {
    const stopWords = new Set([
      'cho', 'toi', 'hoi', 've', 'o', 'hue', 'co', 'gi', 'ngon', 'dep', 'nao', 'dau',
      'di', 'den', 'la', 'nhung', 'cac', 'mot', 'nhieu', 'nhat', 'me', 'oi', 'ban',
      'minh', 'muon', 'tim', 'quan', 'duong', 'phuong', 'thanh', 'pho', 'chao', 'xin',
    ]);
    const rawTokens = qNorm
      .replace(/[.,?!;:"'()[\]{}]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length >= 3 && !stopWords.has(removeAccents(w)));

    if (rawTokens.length > 0) {
      const scored: Array<{ place: RawCatalogPlace; score: number }> = [];
      for (const item of catalog) {
        const nameLower = (item.name_vi || item.name || '').toLowerCase();
        const addrLower = (item.address || '').toLowerCase();
        const descLower = (item.description || '').toLowerCase();

        let score = 0;
        for (const tk of rawTokens) {
          if (nameLower.includes(tk)) score += 3;
          else if (addrLower.includes(tk)) score += 1.5;
          else if (descLower.includes(tk)) score += 1;
        }
        if (score >= 3) {
          scored.push({ place: item, score: score + (item.googleRating || 0) * 0.1 });
        }
      }

      scored.sort((a, b) => b.score - a.score);
      const topMatches = scored.slice(0, 4);
      if (topMatches.length > 0) {
        const listStr = topMatches
          .map(({ place }, i) => {
            const title = place.name_vi || place.name;
            const rating = place.googleRating ? ` (⭐ ${place.googleRating}/5)` : '';
            const addr = place.address ? ` — 📍 *${place.address}*` : '';
            const desc = place.description ? `\n  ${place.description}` : '';
            return `${i + 1}. **${title}**${rating}${addr}${desc}`;
          })
          .join('\n');

        return (
          `Dạ, theo yêu cầu của bạn, Mệ tìm thấy trong cơ sở dữ liệu Cố Đô những địa điểm phù hợp nhất tại Huế như sau nhen:\n\n` +
          `${listStr}\n\n` +
          `Bạn muốn Mệ chỉ đường chi tiết tới điểm nào hay ghép vào lịch trình tham quan hôm nay không nợ?`
        );
      }
    }
  }

  // =========================================================================
  // 10. PHẢN HỒI TỰ NHIÊN KHI CÂU HỎI MỞ / CHƯA RÕ Ý ĐỊNH
  // =========================================================================
  return (
    `Dạ Mệ nghe câu hỏi của bạn rồi nhen! Về **"${question.trim()}"**, để Mệ tư vấn sát ý bạn nhất, bạn có thể cho Mệ biết thêm là bạn đang quan tâm tới:\n\n` +
    `• 🏛️ **Lịch sử, giá vé, giờ mở cửa** của một di tích cụ thể (như *Đại Nội, Lăng Tự Đức, Lăng Khải Định, Lăng Minh Mạng, Chùa Thiên Mụ, Cung An Định*)?\n` +
    `• 🍜 **Địa chỉ quán ăn ngon chuẩn Huế** (như *bún bò, cơm hến, bánh bèo nậm lọc, bánh khoái, bánh ép, chè heo quay, cà phê muối*)?\n` +
    `• 🗺️ Hay **Lịch trình tham quan Huế** trong 1 buổi, 1 ngày, 2 ngày?\n\n` +
    `Bạn cứ nhắn tên món ăn hoặc điểm đến, Mệ chỉ tận nơi liền nghe!`
  );
}
