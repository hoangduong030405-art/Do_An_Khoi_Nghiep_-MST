import { Injectable, Logger } from '@nestjs/common';

export interface HuePlace {
  id: string;
  name: string;
  slug: string;
  categoryCode: string;
  categoryName: string;
  descriptionVi: string;
  descriptionEn: string;
  address: string;
  latitude: number;
  longitude: number;
  geofenceRadiusMeters: number;
  environmentType: 'INDOOR' | 'OUTDOOR' | 'SEMI_OUTDOOR';
  ticketPriceVnd: number;
  greenRewardPoints: number;
  thumbnailUrl: string;
}

@Injectable()
export class InMemoryDbService {
  private readonly logger = new Logger(InMemoryDbService.name);

  // Danh mục địa danh Huế có sẵn tọa độ GPS chuẩn xác
  public places: HuePlace[] = [
    {
      id: '8f8b0596-f5ee-449e-8c31-9cb6be62b662',
      name: 'Đại Nội Huế (Hoàng Thành & Tử Cấm Thành)',
      slug: 'dai-noi-hue',
      categoryCode: 'HISTORICAL',
      categoryName: 'Di tích Cố đô',
      descriptionVi: 'Kinh thành của triều Nguyễn, di sản văn hóa thế giới UNESCO với kiến trúc cung điện vàng son.',
      descriptionEn: 'Imperial City of Hue, UNESCO World Heritage site featuring majestic royal palaces.',
      address: 'Đường 23/8, Phường Thuận Hòa, TP Huế',
      latitude: 16.4697,
      longitude: 107.5779,
      geofenceRadiusMeters: 40,
      environmentType: 'OUTDOOR',
      ticketPriceVnd: 200000,
      greenRewardPoints: 50,
      thumbnailUrl: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375',
    },
    {
      id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
      name: 'Chùa Thiên Mụ (Linh Mụ Tự)',
      slug: 'chua-thien-mu',
      categoryCode: 'HISTORICAL',
      categoryName: 'Di tích Cố đô',
      descriptionVi: 'Ngôi chùa cổ kính hơn 400 năm tuổi soi bóng bên dòng sông Hương thơ mộng.',
      descriptionEn: 'Ancient pagoda over 400 years old reflecting on the Perfume River.',
      address: 'Đồi Hà Khê, Đường Kim Long, TP Huế',
      latitude: 16.4529,
      longitude: 107.5451,
      geofenceRadiusMeters: 35,
      environmentType: 'OUTDOOR',
      ticketPriceVnd: 0,
      greenRewardPoints: 50,
      thumbnailUrl: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647',
    },
    {
      id: '1b34ad29-2342-49cf-91ba-00c71a39fbc4',
      name: 'Bảo tàng Cổ vật Cung đình Huế (Điện Long An)',
      slug: 'bao-tang-co-vat-cung-dinh',
      categoryCode: 'CULTURE_ART',
      categoryName: 'Văn hóa & Nghệ thuật',
      descriptionVi: 'Nơi lưu giữ hàng ngàn cổ vật quý giá của triều đình nhà Nguyễn, không gian trong nhà lý tưởng ngày mưa.',
      descriptionEn: 'Museum preserving royal antiquities, ideal indoor cultural visit.',
      address: 'Số 3 Lê Trực, Phường Đông Ba, TP Huế',
      latitude: 16.4715,
      longitude: 107.5812,
      geofenceRadiusMeters: 30,
      environmentType: 'INDOOR',
      ticketPriceVnd: 50000,
      greenRewardPoints: 30,
      thumbnailUrl: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424',
    },
    {
      id: '4f5e6d7c-8b9a-0123-4567-89abcdef0123',
      name: 'Lăng Khải Định (Ứng Lăng)',
      slug: 'lang-khai-dinh',
      categoryCode: 'HISTORICAL',
      categoryName: 'Di tích Cố đô',
      descriptionVi: 'Tuyệt tác kiến trúc giao thoa Đông - Tây với nghệ thuật khảm sành sứ đỉnh cao.',
      descriptionEn: 'Architectural masterpiece blending Eastern and Western styles.',
      address: 'Xã Thủy Bằng, TP Huế',
      latitude: 16.3991,
      longitude: 107.5905,
      geofenceRadiusMeters: 35,
      environmentType: 'SEMI_OUTDOOR',
      ticketPriceVnd: 150000,
      greenRewardPoints: 50,
      thumbnailUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada',
    },
    {
      id: 'tu-duc-tomb-01',
      name: 'Lăng Tự Đức (Khiêm Lăng)',
      slug: 'lang-tu-duc',
      categoryCode: 'HISTORICAL',
      categoryName: 'Di tích Cố đô',
      descriptionVi: 'Một trong những công trình lăng tẩm đẹp nhất triều Nguyễn, mang đậm nét thi vị lãng mạn bên hồ Lưu Khiêm.',
      descriptionEn: 'Poetic royal tomb set around Luu Khiem lake.',
      address: 'Thôn Thượng Ba, Phường Thủy Xuân, TP Huế',
      latitude: 16.4328,
      longitude: 107.5658,
      geofenceRadiusMeters: 35,
      environmentType: 'SEMI_OUTDOOR',
      ticketPriceVnd: 150000,
      greenRewardPoints: 50,
      thumbnailUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
    },
    {
      id: 'minh-mang-tomb-02',
      name: 'Lăng Minh Mạng (Hiếu Lăng)',
      slug: 'lang-minh-mang',
      categoryCode: 'HISTORICAL',
      categoryName: 'Di tích Cố đô',
      descriptionVi: 'Quy hoạch đăng đối uy nghiêm giữa núi đồi và hồ nước sen ngát hương.',
      descriptionEn: 'Majestic symmetrical royal architecture surrounded by lotus lakes.',
      address: 'Xã Hương Thọ, TP Huế',
      latitude: 16.3888,
      longitude: 107.5702,
      geofenceRadiusMeters: 40,
      environmentType: 'SEMI_OUTDOOR',
      ticketPriceVnd: 150000,
      greenRewardPoints: 50,
      thumbnailUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada',
    },
    {
      id: '5a6b7c8d-9e0f-1a2b-3c4d-5e6f7a8b9c0d',
      name: 'Cầu Tràng Tiền (Lung linh đèn đêm)',
      slug: 'cau-trang-tien',
      categoryCode: 'SCENIC_VIEW',
      categoryName: 'Cảnh quan View Ngày & Đêm',
      descriptionVi: 'Biểu tượng lãng mạn 6 vài 12 nhịp vắt qua sông Hương, đổi màu rực rỡ khi thành phố lên đèn.',
      descriptionEn: 'Historic romantic 6-span bridge crossing the Perfume River.',
      address: 'Cầu Tràng Tiền, TP Huế',
      latitude: 16.4683,
      longitude: 107.5947,
      geofenceRadiusMeters: 40,
      environmentType: 'OUTDOOR',
      ticketPriceVnd: 0,
      greenRewardPoints: 20,
      thumbnailUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592',
    },
    {
      id: 'cau-da-vien-03',
      name: 'Cầu Dã Viên (Ngắm Hoàng Hôn Sông Hương)',
      slug: 'cau-da-vien',
      categoryCode: 'SCENIC_VIEW',
      categoryName: 'Cảnh quan View Ngày & Đêm',
      descriptionVi: 'Địa điểm ngắm hoàng hôn buông xuống cồn Dã Viên thơ mộng bậc nhất cố đô.',
      descriptionEn: 'Stunning sunset viewpoint over Da Vien islet and Perfume River.',
      address: 'Cầu Dã Viên, Phường Vĩnh Ninh, TP Huế',
      latitude: 16.4592,
      longitude: 107.5721,
      geofenceRadiusMeters: 35,
      environmentType: 'OUTDOOR',
      ticketPriceVnd: 0,
      greenRewardPoints: 20,
      thumbnailUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    },
    {
      id: 'doi-vong-canh-04',
      name: 'Đồi Vọng Cảnh (Khúc Uốn Sông Hương)',
      slug: 'doi-vong-canh',
      categoryCode: 'OUTSKIRTS_ECO',
      categoryName: 'Ngoại thành Sinh thái',
      descriptionVi: 'Góc nhìn toàn cảnh ngắm dòng sông Hương uốn lượn mềm mại ôm lấy chân đồi thông reo.',
      descriptionEn: 'Panoramic viewpoint overlooking the winding Perfume River.',
      address: 'Đồi Vọng Cảnh, Phường Thủy Biều, TP Huế',
      latitude: 16.4258,
      longitude: 107.5512,
      geofenceRadiusMeters: 45,
      environmentType: 'OUTDOOR',
      ticketPriceVnd: 0,
      greenRewardPoints: 30,
      thumbnailUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    },
    {
      id: 'doi-thien-an-05',
      name: 'Đồi Thiên An & Hồ Thủy Tiên (Công viên Rồng)',
      slug: 'doi-thien-an-ho-thuy-tien',
      categoryCode: 'OUTSKIRTS_ECO',
      categoryName: 'Ngoại thành Sinh thái',
      descriptionVi: 'Đồi thông Đà Lạt giữa lòng Huế và công viên nước Hồ Thủy Tiên nổi tiếng quốc tế với tượng rồng khổng lồ.',
      descriptionEn: 'Pine hills and the mysterious abandoned dragon water park.',
      address: 'Xã Thủy Bằng, TP Huế',
      latitude: 16.4087,
      longitude: 107.5756,
      geofenceRadiusMeters: 45,
      environmentType: 'OUTDOOR',
      ticketPriceVnd: 0,
      greenRewardPoints: 30,
      thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23',
    },
    {
      id: 'ru-cha-06',
      name: 'Rừng Ngập Mặn Rú Chá (Nguyên Sinh)',
      slug: 'rung-ngap-man-ru-cha',
      categoryCode: 'OUTSKIRTS_ECO',
      categoryName: 'Ngoại thành Sinh thái',
      descriptionVi: 'Khu rừng ngập mặn nguyên sinh duy nhất còn sót lại trên đầm phá Tam Giang, rực rỡ mùa lá vàng.',
      descriptionEn: 'Unique primitive mangrove forest on Tam Giang lagoon.',
      address: 'Xã Hương Phong, TP Huế',
      latitude: 16.5512,
      longitude: 107.6189,
      geofenceRadiusMeters: 50,
      environmentType: 'OUTDOOR',
      ticketPriceVnd: 0,
      greenRewardPoints: 30,
      thumbnailUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b',
    },
    {
      id: 'dam-chuon-07',
      name: 'Đầm Chuồn (Hoàng Hôn Phá Tam Giang)',
      slug: 'dam-chuon-tam-giang',
      categoryCode: 'OUTSKIRTS_ECO',
      categoryName: 'Ngoại thành Sinh thái',
      descriptionVi: 'Trải nghiệm chèo thuyền trên mặt đầm mênh mông, thưởng thức bánh khoái cá kình tươi sống.',
      descriptionEn: 'Tam Giang lagoon sunset experience with local seafood pancakes.',
      address: 'Xã Phú An, Huyện Phú Vang, Thừa Thiên Huế',
      latitude: 16.5168,
      longitude: 107.6321,
      geofenceRadiusMeters: 50,
      environmentType: 'SEMI_OUTDOOR',
      ticketPriceVnd: 0,
      greenRewardPoints: 30,
      thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    },
    {
      id: 'lang-huong-thuy-xuan-08',
      name: 'Làng Hương Trầm Thủy Xuân',
      slug: 'lang-huong-thuy-xuan',
      categoryCode: 'CRAFT_VILLAGE',
      categoryName: 'Làng nghề Truyền thống',
      descriptionVi: 'Làng nghề làm hương trầm truyền thống rực rỡ sắc màu, góc check-in sống ảo quốc dân xứ Huế.',
      descriptionEn: 'Colorful traditional incense making village.',
      address: 'Đường Huyền Trân Công Chúa, Phường Thủy Xuân, TP Huế',
      latitude: 16.4358,
      longitude: 107.5647,
      geofenceRadiusMeters: 30,
      environmentType: 'SEMI_OUTDOOR',
      ticketPriceVnd: 0,
      greenRewardPoints: 10,
      thumbnailUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
    },
    {
      id: 'cafe-muoi-nguyen-hue-09',
      name: 'Cà Phê Muối Xứ Huế (Gốc Nguyễn Huệ)',
      slug: 'ca-phe-muoi-nguyen-hue',
      categoryCode: 'CAFE',
      categoryName: 'Quán Cà Phê & Sống Ảo',
      descriptionVi: 'Quán gốc khai sinh ra thức uống cà phê muối huyền thoại, béo ngậy vị kem mặn đặc trưng.',
      descriptionEn: 'The original birthplace of Hue salted cream coffee.',
      address: 'Số 10 Nguyễn Huệ, Phường Vĩnh Ninh, TP Huế',
      latitude: 16.4589,
      longitude: 107.5898,
      geofenceRadiusMeters: 25,
      environmentType: 'INDOOR',
      ticketPriceVnd: 25000,
      greenRewardPoints: 20,
      thumbnailUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd',
    },
    {
      id: 'cafe-tan-vintage-10',
      name: 'Tân Cafe (Phong Cách Vintage Cố Đô)',
      slug: 'tan-cafe-vintage',
      categoryCode: 'CAFE',
      categoryName: 'Quán Cà Phê & Sống Ảo',
      descriptionVi: 'Không gian trầm mặc hoài niệm thập niên 80s với những mảng tường gạch thô và bàn ghế gỗ xưa.',
      descriptionEn: 'Nostalgic retro cafe with historic brick aesthetics.',
      address: 'Số 14 Đặng Thái Thân, Thuận Hòa, TP Huế',
      latitude: 16.4635,
      longitude: 107.5882,
      geofenceRadiusMeters: 25,
      environmentType: 'INDOOR',
      ticketPriceVnd: 35000,
      greenRewardPoints: 20,
      thumbnailUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24',
    },
    {
      id: 'sline-cafe-garden-11',
      name: 'Sline Cafe & Sân Vườn Hoàng Gia',
      slug: 'sline-cafe-garden',
      categoryCode: 'CAFE',
      categoryName: 'Quán Cà Phê & Sống Ảo',
      descriptionVi: 'Quán cà phê sân vườn xanh mát view hồ Ngự Hà, điểm chụp ảnh áo dài cổ phục lý tưởng.',
      descriptionEn: 'Scenic garden cafe by Ngu Ha lake, perfect for traditional Ao Dai photos.',
      address: 'Đường Lê Huân, Phường Thuận Hòa, TP Huế',
      latitude: 16.4655,
      longitude: 107.5742,
      geofenceRadiusMeters: 25,
      environmentType: 'SEMI_OUTDOOR',
      ticketPriceVnd: 40000,
      greenRewardPoints: 20,
      thumbnailUrl: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8',
    },
    {
      id: '6b7c8d9e-0f1a-2b3c-4d5e-6f7a8b9c0d1e',
      name: 'Không Gian Trà Cung Đình Kim Long',
      slug: 'tra-cung-dinh-kim-long',
      categoryCode: 'CUISINE',
      categoryName: 'Ẩm thực Huế',
      descriptionVi: 'Nhà rường cổ thưởng trà hoa sen, trà quý tộc tiến vua 26 vị thảo mộc và nghe ca Huế ngày mưa.',
      descriptionEn: 'Traditional garden house serving royal 26-herb imperial tea.',
      address: 'Đường Kim Long, Phường Kim Long, TP Huế',
      latitude: 16.4608,
      longitude: 107.5601,
      geofenceRadiusMeters: 25,
      environmentType: 'INDOOR',
      ticketPriceVnd: 60000,
      greenRewardPoints: 20,
      thumbnailUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3',
    },
    {
      id: 'bun-bo-mu-roi-12',
      name: 'Bún Bò Huế Mụ Rơi (Chuẩn Vị Cố Đô)',
      slug: 'bun-bo-mu-roi',
      categoryCode: 'CUISINE',
      categoryName: 'Ẩm thực Huế',
      descriptionVi: 'Hương vị bún bò giò heo nước dùng ngọt thanh từ xương hầm và mắm ruốc sả ớt trứ danh xứ Huế.',
      descriptionEn: 'Legendary traditional Hue beef noodle soup with authentic broth.',
      address: 'Số 40 Nguyễn Du, Phường Phú Cát, TP Huế',
      latitude: 16.4745,
      longitude: 107.5862,
      geofenceRadiusMeters: 25,
      environmentType: 'INDOOR',
      ticketPriceVnd: 45000,
      greenRewardPoints: 20,
      thumbnailUrl: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43',
    },
    {
      id: 'com-hen-hoa-dong-13',
      name: 'Cơm Hến Hoa Đông (Gốc Cồn Hến)',
      slug: 'com-hen-hoa-dong',
      categoryCode: 'CUISINE',
      categoryName: 'Ẩm thực Huế',
      descriptionVi: 'Tô cơm hến cay nồng mộc mạc kèm tóp mỡ giòn rụm và nước canh hến nghi ngút khói giữa lòng cồn Hến.',
      descriptionEn: 'Famous authentic clam rice on Con Hen islet.',
      address: 'Số 64 Kiệt 7 Ưng Bình, Cồn Hến, Vĩ Dạ, TP Huế',
      latitude: 16.4789,
      longitude: 107.6012,
      geofenceRadiusMeters: 25,
      environmentType: 'SEMI_OUTDOOR',
      ticketPriceVnd: 25000,
      greenRewardPoints: 20,
      thumbnailUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624',
    },
    {
      id: 'banh-beo-ba-do-14',
      name: 'Bánh Bèo - Nậm - Lọc Bà Đỏ',
      slug: 'banh-beo-nam-loc-ba-do',
      categoryCode: 'CUISINE',
      categoryName: 'Ẩm thực Huế',
      descriptionVi: 'Thương hiệu bánh Huế gia truyền hơn 30 năm, tôm chấy đỏ au và nước mắm ớt cay xé lưỡi.',
      descriptionEn: 'Famous traditional steamed rice cakes with dried shrimp topping.',
      address: 'Số 8 Nguyễn Bỉnh Khiêm, Phường Phú Cát, TP Huế',
      latitude: 16.4615,
      longitude: 107.5998,
      geofenceRadiusMeters: 25,
      environmentType: 'INDOOR',
      ticketPriceVnd: 50000,
      greenRewardPoints: 20,
      thumbnailUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8',
    },
    {
      id: 'che-hem-hung-vuong-15',
      name: 'Chè Hẻm 20 Món Cố Đô Hùng Vương',
      slug: 'che-hem-hung-vuong',
      categoryCode: 'CUISINE',
      categoryName: 'Ẩm thực Huế',
      descriptionVi: 'Quán chè nằm sâu trong hẻm nhỏ với 20 nồi chè thơm nức: chè bắp, chè hạt sen long nhãn, chè khoai tía...',
      descriptionEn: 'Iconic 20-pot sweet soup alley in Hue.',
      address: 'Kiệt 29 Hùng Vương, Phường Phú Hội, TP Huế',
      latitude: 16.4621,
      longitude: 107.5932,
      geofenceRadiusMeters: 25,
      environmentType: 'INDOOR',
      ticketPriceVnd: 15000,
      greenRewardPoints: 20,
      thumbnailUrl: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc',
    },
    {
      id: 'che-heo-quay-mo-ton-dich-16',
      name: 'Chè Bột Lọc Bọc Heo Quay Mợ Tôn Đích',
      slug: 'che-heo-quay-mo-ton-dich',
      categoryCode: 'CUISINE',
      categoryName: 'Ẩm thực Huế',
      descriptionVi: 'Món chè độc nhất vô nhị kết hợp nhân thịt heo quay giòn mặn trong lớp bột lọc dẻo dai và nước đường gừng.',
      descriptionEn: 'Unique Hue specialty sweet soup with roasted pork filling.',
      address: 'Số 20 Đinh Tiên Hoàng, Thuận Thành, TP Huế',
      latitude: 16.4721,
      longitude: 107.5789,
      geofenceRadiusMeters: 20,
      environmentType: 'INDOOR',
      ticketPriceVnd: 20000,
      greenRewardPoints: 20,
      thumbnailUrl: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc',
    },
    {
      id: 'pho-di-bo-pho-tay-17',
      name: 'Phố Đi Bộ Chu Văn An (Khu Phố Tây Sôi Động)',
      slug: 'pho-di-bo-pho-tay',
      categoryCode: 'SCENIC_VIEW',
      categoryName: 'Cảnh quan View Ngày & Đêm',
      descriptionVi: 'Tuyến phố đêm sầm uất với các quán pub, nhạc sống, ẩm thực đường phố và không khí náo nhiệt của giới trẻ.',
      descriptionEn: 'Vibrant nightlife walking street with bars, live music and street food.',
      address: 'Phố Chu Văn An - Võ Thị Sáu, Phường Phú Hội, TP Huế',
      latitude: 16.4645,
      longitude: 107.5968,
      geofenceRadiusMeters: 40,
      environmentType: 'OUTDOOR',
      ticketPriceVnd: 0,
      greenRewardPoints: 20,
      thumbnailUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
    },
    {
      id: 'tram-xe-dap-hien-nhon-18',
      name: 'Trạm Thuê Xe Đạp Xanh Eco-Bike Cửa Hiển Nhơn',
      slug: 'tram-xe-dap-hien-nhon',
      categoryCode: 'VEHICLE_RENTAL',
      categoryName: 'Tiện ích: Thuê Xe',
      descriptionVi: 'Trạm xe đạp công cộng quét mã QR thông minh ngay cổng ra Hoàng Thành Huế, ưu đãi khách du lịch xanh.',
      descriptionEn: 'Smart public bike sharing station at Hien Nhon Gate.',
      address: 'Đường Đoàn Thị Điểm, Phường Thuận Thành, TP Huế',
      latitude: 16.4705,
      longitude: 107.5815,
      geofenceRadiusMeters: 20,
      environmentType: 'OUTDOOR',
      ticketPriceVnd: 10000,
      greenRewardPoints: 10,
      thumbnailUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e',
    },
    {
      id: 'tram-xe-dap-toa-kham-19',
      name: 'Trạm Thuê Xe Đạp Xanh Bến Tòa Khâm',
      slug: 'tram-xe-dap-toa-kham',
      categoryCode: 'VEHICLE_RENTAL',
      categoryName: 'Tiện ích: Thuê Xe',
      descriptionVi: 'Trạm xe đạp ven bờ sông Hương kết nối trực tiếp với cầu đi bộ gỗ lim ngắm cảnh sông thơ mộng.',
      descriptionEn: 'Public bike rental station along the Perfume River promenade.',
      address: 'Đường Lê Lợi, Phường Phú Hội, TP Huế',
      latitude: 16.4652,
      longitude: 107.5938,
      geofenceRadiusMeters: 20,
      environmentType: 'OUTDOOR',
      ticketPriceVnd: 10000,
      greenRewardPoints: 10,
      thumbnailUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e',
    },
    {
      id: 'cay-xang-le-loi-20',
      name: 'Cây Xăng Petrolimex Trung Tâm Bờ Nam (Lê Lợi)',
      slug: 'cay-xang-petrolimex-le-loi',
      categoryCode: 'GAS_STATION',
      categoryName: 'Tiện ích: Cây Xăng',
      descriptionVi: 'Trạm cấp nhiên liệu tiêu chuẩn hoạt động 24/7 trên trục đường ven sông chính Lê Lợi.',
      descriptionEn: '24/7 central gasoline station on main Le Loi street.',
      address: 'Số 14 Lê Lợi, Phường Vĩnh Ninh, TP Huế',
      latitude: 16.4632,
      longitude: 107.5862,
      geofenceRadiusMeters: 20,
      environmentType: 'OUTDOOR',
      ticketPriceVnd: 0,
      greenRewardPoints: 0,
      thumbnailUrl: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c',
    },
  ];

  // Lưu trữ các bản ghi đã mở khóa
  public unlockedMilestones: Array<{
    userId: string;
    placeId: string;
    unlockedAt: string;
    distanceMeters: number;
    pointsAwarded: number;
  }> = [];

  // Điểm Green Points của người dùng
  public userPoints: Map<string, number> = new Map([
    ['e7b0e774-7243-41bb-9be4-8a4b868e82ef', 125],
  ]);

  // Danh sách Lịch trình cá nhân hóa đang hoạt động
  public userItineraries: Map<string, {
    id: string;
    userId: string;
    title: string;
    items: Array<{
      placeId: string;
      orderIndex: number;
      isVisited: boolean;
      visitedAt?: string;
    }>;
  }> = new Map([
    [
      'itinerary-hue-heritage-01',
      {
        id: 'itinerary-hue-heritage-01',
        userId: 'e7b0e774-7243-41bb-9be4-8a4b868e82ef',
        title: 'Hành Trình Tinh Hoa Cố Đô Huế',
        items: [
          { placeId: '8f8b0596-f5ee-449e-8c31-9cb6be62b662', orderIndex: 1, isVisited: true, visitedAt: '2026-10-01T08:30:00Z' }, // Đại Nội
          { placeId: '1b34ad29-2342-49cf-91ba-00c71a39fbc4', orderIndex: 2, isVisited: true, visitedAt: '2026-10-01T10:15:00Z' }, // Bảo tàng Cổ vật
          { placeId: '5a6b7c8d-9e0f-1a2b-3c4d-5e6f7a8b9c0d', orderIndex: 3, isVisited: false }, // Cầu Tràng Tiền (cần check-in để hoàn thành 100%)
        ],
      },
    ],
  ]);

  // Danh sách Chứng nhận E-Certificate đã cấp
  public issuedCertificates: any[] = [];

  constructor() {
    this.logger.log('Sử dụng Bộ dữ liệu Không gian Bản địa Huế (In-Memory Spatial GIS Engine)');
  }

  /**
   * Tính toán khoảng cách mặt cầu (Haversine Formula) tương đương PostGIS ST_Distance(geography)
   */
  calculateDistanceMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371000; // Bán kính Trái Đất (mét)
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
