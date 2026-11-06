export interface HeritageNarrationContent {
  placeName: string;
  audioNarrationScript: string;
  secretHistoricalFact: string;
  photoSpotAdvice: string;
  localSpecialtyPairing: string;
  ecoGreenTip: string;
}

export type HeritageNarrationItem = HeritageNarrationContent;

export interface BilingualHeritageStory {
  idKeys: string[];
  nameRegex: RegExp;
  kind: 'HERITAGE' | 'WAR_NATURE';
  vi: HeritageNarrationContent;
  en: HeritageNarrationContent;
}

/**
 * Danh mục chuẩn mực các bài thuyết minh riêng biệt dành cho:
 * 1. Di tích lịch sử Cố Đô (Đại Nội, lăng tẩm, cung điện, chùa cổ, công trình lịch sử...)
 * 2. Điểm du lịch thiên nhiên & danh thắng gắn liền với chiến tranh (Hải Vân, Bạch Mã, Đồi Vọng Cảnh/Bunker, Chín Hầm, Cầu Tràng Tiền, Kỳ Đài, Thuận An...)
 *
 * TUYỆT ĐỐI KHÔNG thuyết minh cho các điểm dịch vụ, quán ăn, quán cà phê, khách sạn hoặc cảnh quan thiên nhiên thuần túy không liên quan đến chiến tranh.
 */
export const BILINGUAL_HERITAGE_AND_NATURE_STORIES: BilingualHeritageStory[] = [
  // =========================================================================
  // I. QUẦN THỂ DI TÍCH LỊCH SỬ CỐ ĐÔ HUẾ
  // =========================================================================

  // 1. ĐẠI NỘI HUẾ
  {
    idKeys: ['1', 'dai-noi', 'dai-noi-hue', 'heritage-dai-noi-hue', '8f8b0596-f5ee-449e-8c31-9cb6be62b662'],
    nameRegex: /đại nội|hoàng thành|tử cấm thành|imperial city|citadel/i,
    kind: 'HERITAGE',
    vi: {
      placeName: 'Đại Nội Huế (Hoàng Thành & Tử Cấm Thành)',
      audioNarrationScript:
        'Dạ, kính chào quý khách đã đến với Đại Nội Huế – trái tim quyền lực của vương triều nhà Nguyễn suốt 143 năm từ năm 1802 đến 1945. Công trình được vua Gia Long khởi công khảo sát phong thủy năm 1804 và hoàn thành quy mô bề thế dưới triều vua Minh Mạng vào năm 1833. Đại Nội gồm hai vòng thành đồng tâm là Hoàng Thành và Tử Cấm Thành với hơn 100 công trình kiến trúc cung điện, miếu đường uy nghiêm như Ngọ Môn, Điện Thái Hòa, Thế Tổ Miếu, Hiển Lâm Các, Cung Diên Thọ và Điện Kiến Trung. Năm 1993, Quần thể Di tích Cố đô Huế tự hào trở thành Di sản Văn hóa Thế giới đầu tiên của Việt Nam được UNESCO vinh danh.',
      secretHistoricalFact:
        'Sân Đại Triều Nghi trước Điện Thái Hòa được lát đá Thanh nguyên khối đẽo gọt độ nghiêng mai rùa thoát nước tức thì. Đặc biệt, nghệ thuật âm học cổ truyền giúp tiếng xướng truyền chỉ lệnh của quan tán truyền vang rền khắp khoảng sân rộng mà không cần bất kỳ công cụ trợ âm nào.',
      photoSpotAdvice:
        'Từ 07h30–09h30 sáng hoặc 16h00–17h15 chiều, đứng tại bậc thềm Ngọ Môn, hành lang đỏ Tử Cấm Thành hoặc trước Điện Kiến Trung để đón ánh nắng xiên tôn lên mái ngói hoàng lưu ly vàng rực.',
      localSpecialtyPairing:
        'Rời Đại Nội qua Cửa Hiển Nhơn hoặc Cửa Nhà Đồ, mời bạn ghé đường Mai Thúc Loan thưởng thức bánh bèo, nậm, lọc hoặc uống cà phê muối tại 142 Đặng Thái Thân.',
      ecoGreenTip:
        'Khuôn viên Đại Nội rộng hơn 36 hecta; bạn hãy trải nghiệm xe điện hoàng cung hoặc xe đạp xanh và mang theo bình nước cá nhân để bảo vệ môi trường di sản.',
    },
    en: {
      placeName: 'Imperial City of Hue (The Citadel & Forbidden Purple City)',
      audioNarrationScript:
        'Welcome to the Imperial City of Hue, the political and cultural heart of the Nguyen Dynasty for 143 years from 1802 to 1945. Surveyed by Emperor Gia Long in 1804 and completed on a grand scale under Emperor Minh Mang in 1833, this UNESCO World Heritage site comprises two concentric enclosures: the Imperial Citadel and the Forbidden Purple City. Within its walls stand over one hundred royal architectural masterpieces, including the Meridian Gate (Ngo Mon), Thai Hoa Palace, The To Mieu Temple, Hien Lam Pavilion, Dien Tho Palace, and Kien Trung Palace.',
      secretHistoricalFact:
        'The Great Court Yard in front of Thai Hoa Palace is paved with Thanh Hoa bluestone engineered with a subtle turtle-shell curvature for instant rainwater drainage. Its traditional acoustic design allowed royal heralds to project imperial decrees across the vast courtyard without amplification.',
      photoSpotAdvice:
        'Visit between 7:30–9:30 AM or 4:00–5:15 PM to capture golden sunlight illuminating the yellow glazed royal roof tiles at Ngo Mon Gate, the red corridors, and Kien Trung Palace.',
      localSpecialtyPairing:
        'After exploring the Citadel, stroll along Dang Thai Than Street for an authentic Hue salted coffee or sample steamed rice cakes (Banh Beo, Nam, Loc) on Mai Thuc Loan Street.',
      ecoGreenTip:
        'Covering more than 36 hectares, the Imperial City is best explored on foot, by electric royal buggy, or via eco-bike while carrying a reusable water bottle.',
    },
  },

  // 2. CỔNG NGỌ MÔN
  {
    idKeys: ['heritage-ngo-mon', 'ngo-mon'],
    nameRegex: /ngọ môn|ngo mon|meridian gate/i,
    kind: 'HERITAGE',
    vi: {
      placeName: 'Cổng Ngọ Môn – Đại Nội Huế',
      audioNarrationScript:
        'Dạ thưa quý khách, trước mắt chúng ta là Ngọ Môn – cổng chính phía Nam của Hoàng Thành Huế, được vua Minh Mạng cho xây dựng vào năm 1833. Ngọ Môn vừa là cổng thành uy nghiêm với hệ đài cổng hình chữ U bằng đá Thanh và gạch vồ, vừa là lễ đài lộng lẫy với Lầu Ngũ Phụng ("năm chim phụng cùng bay") gồm 9 bộ mái lợp ngói lưu ly vàng và xanh. Cổng có 5 lối đi: Ngọ Môn chính giữa xưa kia chỉ dành cho Hoàng đế, Tả – Hữu Giáp Môn dành cho quan văn võ, và Tả – Hữu Dịch Môn dành cho binh lính, voi ngựa. Ngày 30 tháng 8 năm 1945, tại lầu Ngũ Phụng này đã diễn ra lễ thoái vị của vua Bảo Đại, khép lại chế độ quân chủ phong kiến Việt Nam.',
      secretHistoricalFact:
        'Bộ khung Lầu Ngũ Phụng được dựng bằng đúng 100 cây cột gỗ lim vững chãi liên kết hoàn toàn bằng mộng gỗ truyền thống, đứng vững trước gió bão miền Trung suốt gần hai thế kỷ.',
      photoSpotAdvice:
        'Chụp góc chính diện từ cầu Kim Thủy qua hồ sen phía trước Ngọ Môn để lấy trọn bóng Lầu Ngũ Phụng in xuống mặt nước.',
      localSpecialtyPairing:
        'Thưởng thức chè hạt sen long nhãn mát lành tại khu vực Cửa Ngăn sau khi tham quan.',
      ecoGreenTip:
        'Khi bước lên Lầu Ngũ Phụng, xin đi nhẹ nhàng và không tựa người lên hệ lan can gỗ cổ.',
    },
    en: {
      placeName: 'Ngo Mon Gate (Meridian Gate of the Imperial City)',
      audioNarrationScript:
        'Standing before you is Ngo Mon, the grand southern entrance to the Hue Imperial Citadel, constructed in 1833 under Emperor Minh Mang. Combining a massive U-shaped stone-and-brick rampart with the ornate Five Phoenixes Pavilion (Lau Ngu Phung) above, the gate features five passageways. Historically, the central yellow-tiled portal was reserved exclusively for the Emperor, the flanking gates for civil and military mandarins, and the outer arched passages for soldiers, horses, and royal elephants. On August 30, 1945, Emperor Bao Dai abdicated from this pavilion, marking the end of Vietnam’s feudal monarchy.',
      secretHistoricalFact:
        'The Five Phoenixes Pavilion is supported by exactly 100 ironwood columns joined entirely with traditional mortise-and-tenon carpentry, withstanding nearly two centuries of central Vietnam typhoons.',
      photoSpotAdvice:
        'Stand on the Kim Thuy bridge in front of the lotus ponds to capture a symmetrical reflection of Ngo Mon Gate in the water.',
      localSpecialtyPairing:
        'Cool down with a bowl of imperial lotus seed sweet soup (Che Hat Sen) near Ngan Gate.',
      ecoGreenTip:
        'Please walk gently on the wooden stairs of the pavilion and avoid leaning on the antique timber railings.',
    },
  },

  // 3. ĐIỆN THÁI HÒA
  {
    idKeys: ['heritage-dien-thai-hoa', 'dien-thai-hoa'],
    nameRegex: /điện thái hòa|thai hoa palace/i,
    kind: 'HERITAGE',
    vi: {
      placeName: 'Điện Thái Hòa – Trung Tâm Hoàng Thành Huế',
      audioNarrationScript:
        'Dạ thưa quý khách, Điện Thái Hòa được vua Gia Long khởi dựng vào tháng 2 năm 1805 và được vua Minh Mạng cho dời về vị trí hiện nay, đại trùng tu hoàn chỉnh năm 1833. Đây là cung điện quan trọng bậc nhất của Hoàng Thành, nơi cử hành lễ Đăng Quang của 13 vị hoàng đế triều Nguyễn, các buổi Đại Triều mỗi tháng hai lần (mồng 1 và ngày Rằm) và tiếp đón sứ thần ngoại giao. Ngôi điện xây theo thức "trùng thiềm điệp ốc" (mái chồng nhà nối) với 80 cột gỗ lim sơn son thếp vàng hình rồng vờn mây, chính giữa đặt Bảo Tọa (Ngai vàng) uy nghiêm của bậc Thiên tử.',
      secretHistoricalFact:
        'Trên các mảng cổ diêm của Điện Thái Hòa được trang trí theo lối "nhất thi nhất họa" (mỗi ô một bài thơ chữ Hán kèm một bức tranh) với 197 bài thơ ngự chế ca ngợi cảnh thái bình và đạo trị quốc.',
      photoSpotAdvice:
        'Đứng tại cầu Trung Đạo bắc qua hồ Thái Dịch để chụp toàn cảnh Điện Thái Hòa soi bóng mặt hồ cá vàng.',
      localSpecialtyPairing:
        'Sau khi chiêm ngưỡng Điện Thái Hòa, bạn có thể ghé thưởng thức trà cung đình và bánh in hoàng gia tại khu dịch vụ di sản.',
      ecoGreenTip:
        'Không gian bên trong Điện Thái Hòa bảo tồn ngai vàng quốc bảo, vui lòng không chụp ảnh có đèn flash.',
    },
    en: {
      placeName: 'Thai Hoa Palace (Palace of Supreme Harmony)',
      audioNarrationScript:
        'Welcome to Thai Hoa Palace, originally built by Emperor Gia Long in 1805 and relocated to its current grand site by Emperor Minh Mang in 1833. As the ceremonial centerpiece of the Nguyen Court, this palace hosted the coronations of all 13 Nguyen Emperors, twice-monthly Great Court assemblies, and royal receptions for foreign envoys. Built in the traditional double-roof "trung thiem diep oc" style, the hall is supported by 80 lacquered ironwood columns gilded with swirling clouds and dragons, presiding over the original Golden Throne of Vietnam.',
      secretHistoricalFact:
        'The interior friezes of Thai Hoa Palace feature the unique "nhat thi nhat hoa" art form—pairing one classical royal poem with one painting across 197 gilded panels celebrating peace and statecraft.',
      photoSpotAdvice:
        'Capture the full grandeur of Thai Hoa Palace from the Trung Dao stone bridge spanning Thai Dich Lake.',
      localSpecialtyPairing:
        'Enjoy a cup of royal herbal tea and mung-bean imperial cakes at the heritage tea pavilion nearby.',
      ecoGreenTip:
        'To preserve the centuries-old gilded lacquer and National Treasure throne inside, please turn off camera flash.',
    },
  },

  // 4. THẾ TỔ MIẾU & CỬU ĐỈNH
  {
    idKeys: ['heritage-cuu-dinh', 'cuu-dinh', 'the-mieu', 'the-to-mieu'],
    nameRegex: /cửu đỉnh|thế miếu|thế tổ miếu|nine dynastic urns/i,
    kind: 'HERITAGE',
    vi: {
      placeName: 'Thế Tổ Miếu & Cửu Đỉnh Triều Nguyễn',
      audioNarrationScript:
        'Dạ thưa quý khách, Thế Tổ Miếu được vua Minh Mạng cho xây dựng năm 1821–1822 là nơi thờ tự các vị hoàng đế triều Nguyễn. Ngay trước sân Thế Miếu là Cửu Đỉnh – chín chiếc đỉnh đồng khổng lồ được vua Minh Mạng truyền chỉ đúc từ cuối năm 1835 và hoàn thành năm 1837. Mỗi đỉnh nặng từ 1,9 đến 2,6 tấn, mang thụy hiệu của một vị hoàng đế (Cao Đỉnh, Nhân Đỉnh, Chương Đỉnh, Anh Đỉnh, Nghị Đỉnh, Thuần Đỉnh, Tuyên Đỉnh, Dụ Đỉnh và Huyền Đỉnh). Năm 2024, những bản đúc nổi trên Cửu Đỉnh đã được UNESCO ghi danh là Di sản Tư liệu Thế giới.',
      secretHistoricalFact:
        'Trên thân 9 chiếc đỉnh đồng chạm nổi tổng cộng 162 họa tiết (mỗi đỉnh 18 hình), hợp thành một bộ "Bách khoa toàn thư bằng đồng" khắc họa trọn vẹn bầu trời, sông núi, biển đảo, sản vật và vũ khí của nước Đại Nam thống nhất thế kỷ 19.',
      photoSpotAdvice:
        'Chụp góc chéo dọc hàng 9 đỉnh đồng đặt song song với lầu Hiển Lâm Các cao vút phía đối diện.',
      localSpecialtyPairing:
        'Ghé phố Đặng Thái Thân hoặc Lê Huân ngay ngoài cửa Hiển Nhơn thưởng thức bún thịt nướng và nem lụi Huế.',
      ecoGreenTip:
        'Cửu Đỉnh là Bảo vật Quốc gia và Di sản Tư liệu UNESCO, xin quý khách tuyệt đối không chạm tay hoặc cọ xát đồng xu lên bề mặt đồng.',
    },
    en: {
      placeName: 'The To Mieu Temple & The Nine Dynastic Urns',
      audioNarrationScript:
        'Built between 1821 and 1822 under Emperor Minh Mang, The To Mieu is the ancestral temple dedicated to the Emperors of the Nguyen Dynasty. Aligned across its courtyard stand the Nine Dynastic Urns (Cuu Dinh), cast in bronze between 1835 and 1837. Weighing between 1.9 and 2.6 tons each, every urn corresponds to the posthumous title of a Nguyen Emperor. In 2024, the bronze relief castings on the Nine Dynastic Urns were inscribed on the UNESCO Memory of the World Register.',
      secretHistoricalFact:
        'Across the nine bronze urns are 162 intricate relief carvings—18 per urn—forming a 19th-century "Bronze Encyclopedia of Vietnam" depicting celestial bodies, mountains, rivers, seas, flora, fauna, and royal vessels.',
      photoSpotAdvice:
        'Frame the row of Nine Bronze Urns with the towering three-story Hien Lam Pavilion in the background.',
      localSpecialtyPairing:
        'Sample grilled lemongrass pork skewers (Nem Lui) on Le Huan Street just outside the Citadel walls.',
      ecoGreenTip:
        'As National Treasures and UNESCO Documentary Heritage, please refrain from touching or rubbing the bronze surfaces.',
    },
  },

  // 5. CHÙA THIÊN MỤ
  {
    idKeys: ['2', 'thien-mu', 'chua-thien-mu', 'heritage-chua-thien-mu', '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d'],
    nameRegex: /thiên mụ|linh mụ|thien mu/i,
    kind: 'HERITAGE',
    vi: {
      placeName: 'Chùa Thiên Mụ (Linh Mụ Tự)',
      audioNarrationScript:
        'Dạ thưa quý khách, chào mừng người ghé thăm Chùa Thiên Mụ – đệ nhất cổ tự xứ Huế tọa lạc trên đồi Hà Khê, phường Kim Long, soi bóng xuống dòng sông Hương thơ mộng. Chùa được chúa Tiên Nguyễn Hoàng khởi lập năm Tân Sửu 1601 sau lời truyền tụng về bà lão áo đỏ báo mộng tụ linh khí cho non nước. Biểu tượng nổi bật nhất trước chùa là Tháp Phước Duyên hình bát giác 7 tầng cao 21 mét, được vua Thiệu Trị xây dựng năm 1844. Phía sau tháp là Đại Hồng Chung đúc năm 1710 nặng hơn 2 tấn cùng nhà bia đá dựng trên lưng rùa cẩm thạch từ năm 1715 thời chúa Nguyễn Phúc Chu.',
      secretHistoricalFact:
        'Trong khuôn viên chùa hiện lưu giữ chiếc xe ô tô Austin màu xanh lam biển số DBA-008 – bảo vật đã đưa Bồ tát Thích Quảng Đức đến địa điểm vị pháp thiêu thân tại Sài Gòn ngày 11/6/1963 trong phong trào đấu tranh Phật giáo vì hòa bình và bình đẳng tôn giáo.',
      photoSpotAdvice:
        'Đứng từ bậc thềm bến thuyền sông Hương chụp ngược lên Tháp Phước Duyên 7 tầng giữa hai hàng thông xanh vào buổi chiều hoàng hôn.',
      localSpecialtyPairing:
        'Ngay dưới chân đồi Hà Khê có món tàu hũ nước đường gừng nóng hổi và bánh ướt thịt nướng Kim Long trứ danh.',
      ecoGreenTip:
        'Chùa Thiên Mụ là chốn thiền môn tôn nghiêm, xin quý khách mặc trang phục lịch sự kín đáo và giữ giọng nói nhẹ nhàng.',
    },
    en: {
      placeName: 'Thien Mu Pagoda (Pagoda of the Celestial Lady)',
      audioNarrationScript:
        'Welcome to Thien Mu Pagoda, the oldest and most iconic Buddhist temple in Hue, perched atop Ha Khe Hill overlooking the poetic Perfume River. Founded in 1601 by Lord Nguyen Hoang following a legend of a celestial lady foretelling the rise of a righteous lord, the pagoda is crowned by the 21-meter, seven-story octagonal Phuoc Duyen Tower built in 1844 under Emperor Thieu Tri. Behind the tower stand the two-ton Great Bronze Bell cast in 1710 and the marble turtle stele erected in 1715.',
      secretHistoricalFact:
        'Preserved inside the pagoda grounds is the pale-blue Austin Westminster sedan (license plate DBA-008) that carried Venerable Thich Quang Duc to his historic self-immolation for peace and religious freedom in Saigon on June 11, 1963.',
      photoSpotAdvice:
        'Stand on the stone steps leading down to the Perfume River boat pier at sunset to frame Phuoc Duyen Tower against the glowing sky.',
      localSpecialtyPairing:
        'At the foot of Ha Khe Hill, enjoy a warm bowl of ginger-syrup silken tofu or Kim Long grilled pork rice-paper rolls.',
      ecoGreenTip:
        'As an active Buddhist monastery, please dress modestly covering shoulders and knees and maintain a peaceful atmosphere.',
    },
  },

  // 6. BẢO TÀNG CỔ VẬT CUNG ĐÌNH HUẾ (ĐIỆN LONG AN)
  {
    idKeys: ['3', 'bao-tang-co-vat', 'bao-tang-co-vat-cung-dinh', 'heritage-bao-tang-co-vat-cung-dinh-hue', '1b34ad29-2342-49cf-91ba-00c71a39fbc4'],
    nameRegex: /bảo tàng cổ vật|điện long an|royal antiquities|long an palace/i,
    kind: 'HERITAGE',
    vi: {
      placeName: 'Bảo tàng Cổ vật Cung đình Huế (Điện Long An)',
      audioNarrationScript:
        'Dạ thưa quý khách, hiện bạn đang đứng trước Điện Long An tại số 3 đường Lê Trực – trụ sở của Bảo tàng Cổ vật Cung đình Huế (thành lập từ năm 1923 với tên gọi Musée Khải Định). Điện Long An được xây dựng năm 1845 dưới triều vua Thiệu Trị làm nơi nghỉ ngơi và đọc sách của nhà vua. Đây là kiệt tác kiến trúc gỗ trùng thiềm điệp ốc với 128 cột gỗ lim, chạm khắc tinh xảo hình tứ linh và hơn 400 bài thơ chữ Hán thếp vàng. Bảo tàng hiện lưu giữ hơn 11.000 cổ vật hoàng cung quý hiếm như long bào, ngọc tỷ, kiệu rước, đồ pháp lam và sứ ký kiểu Bleu de Huế.',
      secretHistoricalFact:
        'Trên vách gỗ gian giữa Điện Long An có khắc bài thơ hồi văn 56 chữ hình bát quái "Vũ trung sơn thủy" của vua Thiệu Trị, có thể đọc xuôi, đọc ngược hay đọc chéo thành 64 bài thơ hoàn chỉnh.',
      photoSpotAdvice:
        'Hành lang hiên gỗ Điện Long An và khu sân trưng bày vạc đồng thời chúa Nguyễn là góc chụp ảnh cổ phục sang trọng bậc nhất.',
      localSpecialtyPairing:
        'Đi bộ sang số 110 Đinh Tiên Hoàng cách đó 200m để thưởng thức bánh khoái Hồng Mai giòn rụm.',
      ecoGreenTip:
        'Không gian bảo tồn hiện vật trong nhà yêu cầu không chạm tay vào hiện vật và tắt đèn flash khi chụp ảnh.',
    },
    en: {
      placeName: 'Hue Royal Antiquities Museum (Long An Palace)',
      audioNarrationScript:
        'Welcome to Long An Palace at 3 Le Truc Street, home to the Hue Royal Antiquities Museum, founded in 1923 as the Musée Khai Dinh. Originally built in 1845 as a royal retreat and library for Emperor Thieu Tri, Long An Palace is hailed as one of Vietnam’s finest timber architectural masterpieces, supported by 128 ironwood pillars and adorned with over 400 gilded classical poems. Inside are more than 11,000 imperial artifacts, including dragon robes, jade seals, royal palanquins, enamelware, and Bleu de Hue porcelain.',
      secretHistoricalFact:
        'Carved into the central wooden panel is Emperor Thieu Tri’s 56-character octagonal palindrome poem "Vu Trung Son Thuy" (Landscape in the Rain), which can be read forwards, backwards, or diagonally to form 64 distinct poems.',
      photoSpotAdvice:
        'The carved wooden verandas and the courtyard displaying 17th-century bronze cauldrons offer timeless backdrops for traditional Ao Dai photography.',
      localSpecialtyPairing:
        'Walk 200 meters to Dinh Tien Hoang Street to taste Hue crispy sizzling pancakes (Banh Khoai Hong Mai).',
      ecoGreenTip:
        'Please avoid touching open exhibits and keep camera flash turned off to protect fragile royal textiles and glazes.',
    },
  },

  // 7. LĂNG KHẢI ĐỊNH
  {
    idKeys: ['4', 'lang-khai-dinh', 'heritage-lang-khai-dinh', '4f5e6d7c-8b9a-0123-4567-89abcdef0123'],
    nameRegex: /khải định|ứng lăng|khai dinh|ung lang/i,
    kind: 'HERITAGE',
    vi: {
      placeName: 'Lăng Khải Định (Ứng Lăng)',
      audioNarrationScript:
        'Dạ thưa quý khách, chúng ta đang đứng trước Lăng Khải Định (Ứng Lăng) trên triền núi Châu Chữ, xã Thủy Bằng. Lăng được khởi công ngày 4 tháng 9 năm 1920 và kéo dài suốt 11 năm (hoàn thành năm 1931 dưới thời vua Bảo Đại). Công trình là sự giao thoa kiến trúc độc đáo giữa truyền thống cung đình Á Đông với phong cách Gothic, Roman, Baroque châu Âu và Ấn Độ giáo. Nổi bật nhất ở tầng cao nhất là Cung Thiên Định với toàn bộ nội thất khảm hàng triệu mảnh sành sứ, thủy tinh màu lộng lẫy và bức bích họa "Cửu Long Ẩn Vân" lớn nhất Việt Nam trên trần điện.',
      secretHistoricalFact:
        'Pho tượng đồng vua Khải Định ngồi trên ngai vàng trong Cung Thiên Định được đúc theo tỷ lệ 1:1 tại Paris (Pháp) năm 1920 và dát vàng ròng bởi các nghệ nhân Huế; bên dưới sâu 18 mét là huyệt mộ nhà vua.',
      photoSpotAdvice:
        'Đứng tại sân Bái Đình giữa hai hàng tượng chầu bằng đá nguyên khối, chụp góc máy từ dưới hất lên toàn bộ các tầng bậc rồng dẫn lên Cung Thiên Định.',
      localSpecialtyPairing:
        'Trên đường từ lăng Khải Định về trung tâm, mời bạn ghé thưởng thức gà nướng đồi Thiên An hoặc bánh ép Huế.',
      ecoGreenTip:
        'Lăng có 127 bậc cấp dốc cao, bạn hãy đi giày êm chân và không chạm tay lên các mảnh khảm sành sứ cổ.',
    },
    en: {
      placeName: 'Tomb of Emperor Khai Dinh (Ung Lang)',
      audioNarrationScript:
        'Welcome to Ung Lang, the Tomb of Emperor Khai Dinh on Chau Chu Mountain. Constructed over 11 years from September 1920 to 1931, it stands out as the most architecturally distinctive royal tomb in Hue, fusing traditional Vietnamese imperial symbolism with European Gothic, Baroque, Romanesque, and Hindu influences. At its summit lies Thien Dinh Palace, whose walls and altars are encrusted with millions of colorful porcelain and glass shards, crowned by the monumental ceiling mural "Nine Dragons Hidden in Clouds".',
      secretHistoricalFact:
        'Beneath the gilded canopy in Thien Dinh Palace sits a life-sized 1:1 bronze statue of Emperor Khai Dinh cast in Paris in 1920 and gold-leafed by Hue artisans; the Emperor’s crypt lies 18 meters below.',
      photoSpotAdvice:
        'Stand in the Bai Dinh Honor Courtyard flanked by stone mandarins, warhorses, and elephants, shooting upward toward the dramatic dragon staircases.',
      localSpecialtyPairing:
        'On your way back from Chau Chu Mountain, stop by Thuy Bang for grilled hill chicken with bamboo-tube rice.',
      ecoGreenTip:
        'With 127 steep stone steps, comfortable walking shoes are recommended, and please do not touch the delicate porcelain mosaics.',
    },
  },

  // 8. LĂNG TỰ ĐỨC
  {
    idKeys: ['5', 'lang-tu-duc', 'heritage-lang-tu-duc', 'tu-duc-tomb-01'],
    nameRegex: /tự đức|khiêm lăng|tu duc|khiem lang/i,
    kind: 'HERITAGE',
    vi: {
      placeName: 'Lăng Tự Đức (Khiêm Lăng)',
      audioNarrationScript:
        'Dạ thưa quý khách, chào mừng người ghé thăm Khiêm Lăng – nơi an nghỉ của vua Tự Đức (trị vì 1847–1883), vị hoàng đế uyên bác và giàu tâm hồn thi sĩ nhất triều Nguyễn. Lăng được xây dựng từ năm 1864 đến 1867 tại thôn Thượng Ba, phường Thủy Xuân, gồm gần 50 công trình lớn nhỏ đều mang chữ "Khiêm" (khiêm nhường). Lúc sinh thời, vua Tự Đức dùng nơi đây làm Khiêm Cung để nghỉ ngơi, đọc sách và ngâm thơ bên hồ sen Lưu Khiêm, Xung Khiêm Tạ, Dũ Khiêm Tạ và nhà hát Minh Khiêm Đường – nhà hát cổ nhất Việt Nam còn tồn tại.',
      secretHistoricalFact:
        'Tấm bia đá "Khiêm Cung Ký" nặng hơn 20 tấn tại Bi Đình khắc bài văn dài 4.935 chữ do chính vua Tự Đức tự soạn năm 1871, tự trần tình về bệnh tật, nỗi đau mất đất trước thực dân Pháp và tự nhận lỗi trước lịch sử.',
      photoSpotAdvice:
        'Đứng tại nhà thủy tạ Xung Khiêm Tạ vươn ra mặt hồ Lưu Khiêm để chụp khung cảnh đình tạ gỗ lim soi bóng bên đồi thông xanh biếc.',
      localSpecialtyPairing:
        'Ngay ngoài cổng lăng Tự Đức trên đường Đoàn Nhữ Hài – Huyền Trân Công Chúa có các quán bánh bèo chén và hương trầm Thủy Xuân.',
      ecoGreenTip:
        'Khuôn viên lăng rợp bóng thông cổ thụ và hồ sen tự nhiên, xin quý khách giữ vệ sinh và không xả rác xuống hồ Lưu Khiêm.',
    },
    en: {
      placeName: 'Tomb of Emperor Tu Duc (Khiem Lang)',
      audioNarrationScript:
        'Welcome to Khiem Lang, the Tomb of Emperor Tu Duc, the longest-reigning and most poetic monarch of the Nguyen Dynasty. Built between 1864 and 1867 in a tranquil pine valley in Thuy Xuan Ward, the complex encompasses nearly 50 structures—all bearing the word "Khiem" (Modesty). Designed as both a royal retreat during the Emperor’s lifetime and his eternal resting place, it features Luu Khiem lotus lake, over-water pavilions, and Minh Khiem Duong, the oldest surviving royal theater in Vietnam.',
      secretHistoricalFact:
        'In the Stele Pavilion stands the 20-ton "Khiem Cung Ky" stone stele, inscribed with a 4,935-word autobiography penned by Emperor Tu Duc himself in 1871—humbly confessing his personal sorrows and political struggles against French colonial expansion.',
      photoSpotAdvice:
        'Photograph the wooden Xung Khiem Pavilion reflecting on the lotus-filled waters of Luu Khiem Lake in the soft morning or late-afternoon light.',
      localSpecialtyPairing:
        'Outside the tomb entrance along Huyen Tran Cong Chua Street, try steamed rice cakes and visit the colorful Thuy Xuan Incense Village.',
      ecoGreenTip:
        'Help preserve the serene pine forest and lotus ecosystem of Luu Khiem Lake by keeping the pathways litter-free.',
    },
  },

  // 9. LĂNG MINH MẠNG
  {
    idKeys: ['lang-minh-mang', 'heritage-lang-minh-mang', 'minh-mang-tomb-02'],
    nameRegex: /minh mạng|hiếu lăng|minh mang|hieu lang/i,
    kind: 'HERITAGE',
    vi: {
      placeName: 'Lăng Minh Mạng (Hiếu Lăng)',
      audioNarrationScript:
        'Dạ thưa quý khách, hiện bạn đang đứng tại Hiếu Lăng – lăng tẩm của vua Minh Mạng (trị vì 1820–1841), vị hoàng đế đưa quốc gia Đại Nam phát triển cực thịnh. Lăng tọa lạc trên núi Cẩm Kê, xã Hương Thọ, gần ngã ba Bằng Lãng nơi hợp lưu hai nguồn Tả Trạch và Hữu Trạch thành sông Hương. Khởi công tháng 9 năm 1840 và hoàn tất năm 1843 dưới thời vua Thiệu Trị, lăng gồm 40 công trình bố cục đối xứng nghiêm ngặt trên trục Thần Đạo dài 700m từ Đại Hồng Môn, Bi Đình, Điện Sùng Ân, Lầu Minh Lâu qua ba cầu đá bắc trên hồ Tân Nguyệt đến Bửu Thành tròn uy nghiêm.',
      secretHistoricalFact:
        'Cánh cửa chính giữa của Đại Hồng Môn chỉ mở duy nhất một lần trong lịch sử để đưa linh cữu vua Minh Mạng vào huyệt mộ năm 1841, từ đó về sau luôn đóng kín để tỏ lòng tôn kính tối thượng.',
      photoSpotAdvice:
        'Đứng trên cầu Thông Minh Chính Trực bắc qua hồ Tân Nguyệt chụp ngược lên Lầu Minh Lâu hoặc xuôi về Điện Sùng Ân để lấy bố cục đối xứng tuyệt đối.',
      localSpecialtyPairing:
        'Trên cung đường từ lăng Minh Mạng về thành phố, mời bạn ghé làng Thủy Biều thưởng thức thanh trà Huế và gỏi gà thanh trà.',
      ecoGreenTip:
        'Khu vực núi Cẩm Kê và hồ Tân Nguyệt có nhiều cây thông cổ thụ, xin quý khách không bẻ cành hay xả rác.',
    },
    en: {
      placeName: 'Tomb of Emperor Minh Mang (Hieu Lang)',
      audioNarrationScript:
        'Welcome to Hieu Lang, the Tomb of Emperor Minh Mang, the brilliant reformer who expanded Dai Nam to its zenith. Situated on Cam Ke Mountain near the Bang Lang confluence where two headwaters form the Perfume River, the tomb was begun in 1840 and completed in 1843 by his successor, Emperor Thieu Tri. Masterfully planned along a strict 700-meter symmetrical axis, its 40 monuments—including Dai Hong Mon Gate, Sung An Palace, Minh Lau Pavilion, and Tan Nguyet Lake—harmonize Confucian order with natural feng shui.',
      secretHistoricalFact:
        'The central portal of Dai Hong Mon Gate was opened only once in history—in 1841 to carry Emperor Minh Mang’s coffin into the circular Buu Thanh burial mound—and has remained sealed ever since.',
      photoSpotAdvice:
        'Stand on the stone bridge crossing Tan Nguyet (New Moon) Lake to capture the perfect architectural symmetry of Minh Lau Pavilion.',
      localSpecialtyPairing:
        'On the return drive toward the city, stop by Thuy Bieu eco-village to taste sweet royal pomelo (Thanh Tra).',
      ecoGreenTip:
        'Protect the tranquil pine hills and lotus lakes of Cam Ke Mountain by staying on stone paths and carrying out all waste.',
    },
  },

  // 10. LĂNG GIA LONG
  {
    idKeys: ['lang-gia-long', 'heritage-lang-gia-long', 'lang-gia-long-thien-tho'],
    nameRegex: /gia long|thiên thọ lăng|thien tho/i,
    kind: 'HERITAGE',
    vi: {
      placeName: 'Lăng Gia Long (Thiên Thọ Lăng)',
      audioNarrationScript:
        'Dạ thưa quý khách, Thiên Thọ Lăng là quần thể lăng mộ của vua Gia Long (Nguyễn Ánh, trị vì 1802–1820) – vị hoàng đế khai sáng vương triều nhà Nguyễn. Lăng được xây dựng từ năm 1814 đến 1820 tại vùng núi Thiên Thọ (xã Hương Thọ), nơi có 42 ngọn đồi núi lớn nhỏ chầu về và đầm Minh Tự rộng mênh mông phía trước. Tâm điểm xúc động nhất của lăng là khu mộ "Song Thanh" bằng đá Thanh giản dị nhưng uy nghiêm, nơi vua Gia Long và Thừa Thiên Cao Hoàng hậu (bà Tống Thị Lan) nằm song đôi bên nhau sau bao năm đồng cam cộng khổ dựng nghiệp.',
      secretHistoricalFact:
        'Đích thân vua Gia Long đã cưỡi voi đi khắp vùng núi phía Tây kinh thành để chọn thế đất "tiền án Đại Thiên Thọ, hậu chẩm 42 ngọn đồi" và tự tay giám sát việc xây dựng sinh phần của mình.',
      photoSpotAdvice:
        'Chụp tại khu vực Bửu Thành với hai ngôi mộ đá Song Thanh nằm song song giữa nền trời mây và đồi thông đại ngàn.',
      localSpecialtyPairing:
        'Sau hành trình khám phá lăng Gia Long, bạn có thể dừng chân bên bến đò Tả Trạch thưởng thức cá suối nướng và chè xanh.',
      ecoGreenTip:
        'Lăng Gia Long nằm giữa thiên nhiên rừng thông nguyên sơ tĩnh lặng, rất lý tưởng cho chuyến du lịch xanh bằng xe đạp địa hình hoặc thuyền sông Hương.',
    },
    en: {
      placeName: 'Tomb of Emperor Gia Long (Thien Tho Lang)',
      audioNarrationScript:
        'Welcome to Thien Tho Lang, the Tomb of Emperor Gia Long, founder of the Nguyen Dynasty. Constructed between 1814 and 1820 in a vast, pristine valley embraced by 42 pine-covered hills and Minh Tu Lake, this complex exudes quiet majesty. At its heart lies the poignant "Song Thanh" (Twin Tombs) stone enclosure, where Emperor Gia Long and his devoted consort, Empress Thua Thien Cao Hoang Hau, rest side by side in identical stone sarcophagi.',
      secretHistoricalFact:
        'Emperor Gia Long personally rode on elephant back to survey the geomancy of these 42 hills and oversaw the construction of the tomb complex himself.',
      photoSpotAdvice:
        'Frame the Twin Stone Tombs at the top of the terraced courtyard against the sweeping backdrop of Dai Thien Tho peak.',
      localSpecialtyPairing:
        'Pause by the Ta Trach riverbank on your way back for fresh green tea and local river delicacies.',
      ecoGreenTip:
        'Located in a remote pine forest sanctuary, please preserve the deep silence and natural cleanliness of the valley.',
    },
  },

  // 11. LĂNG THIỆU TRỊ, ĐỒNG KHÁNH, DỤC ĐỨC
  {
    idKeys: ['lang-thieu-tri', 'heritage-lang-thieu-tri', 'lang-dong-khanh', 'heritage-lang-dong-khanh', 'lang-duc-duc', 'heritage-lang-duc-duc', 'tour-tomb-of-thieu-tri', 'tour-tu-lang-lang-mo-vua-dong-khanh'],
    nameRegex: /thiệu trị|xương lăng|đồng khánh|tư lăng|dục đức|an lăng|thieu tri|dong khanh|duc duc/i,
    kind: 'HERITAGE',
    vi: {
      placeName: 'Quần Thể Lăng Thiệu Trị (Xương Lăng) • Đồng Khánh (Tư Lăng) • Dục Đức (An Lăng)',
      audioNarrationScript:
        'Dạ thưa quý khách, bên cạnh bốn lăng lớn, quần thể lăng tẩm triều Nguyễn còn ghi dấu ấn đặc sắc tại Xương Lăng (Lăng Thiệu Trị, xây năm 1848 chỉ trong 10 tháng – lăng duy nhất quay mặt hướng Tây Bắc và hòa nhập giữa đồng lúa, hồ sen), Tư Lăng (Lăng Đồng Khánh, xây dựng 1888–1923 mang dấu ấn giao thoa Á – Âu đầu tiên với tranh kính màu và phù điêu đất nung) và An Lăng (Lăng Dục Đức, xây năm 1889 tại phường An Cựu – nơi an nghỉ chung của 3 vị vua yêu nước Dục Đức, Thành Thái và Duy Tân).',
      secretHistoricalFact:
        'Trước khi băng hà, vua Thiệu Trị đã dặn vua Tự Đức phải xây dựng Xương Lăng thật tiết kiệm, không làm nhọc sức dân binh và giữ nguyên ruộng vườn của dân lành quanh lăng.',
      photoSpotAdvice:
        'Chụp cổng đá rêu phong soi bóng xuống hồ Nhuận Trạch và hồ Điện tại Lăng Thiệu Trị vào mùa hoa sen nở.',
      localSpecialtyPairing:
        'Ghé khu vực An Cựu – Thủy Xuân thưởng thức bún hến và bánh ướt thịt nướng xứ Huế.',
      ecoGreenTip:
        'Các khu lăng tẩm này rất yên bình và ít đông đúc, xin đi nhẹ nói khẽ để giữ nét trầm mặc cổ kính.',
    },
    en: {
      placeName: 'Royal Tombs of Emperors Thieu Tri, Dong Khanh & Duc Duc',
      audioNarrationScript:
        'Welcome to the historic royal tombs of the Nguyen Emperors. Xuong Lang (Tomb of Emperor Thieu Tri, built in 1848) is the only royal tomb facing Northwest without an outer defensive wall, blending seamlessly into surrounding lotus ponds and rice paddies. Tu Lang (Tomb of Emperor Dong Khanh, built 1888–1923) showcases early East-West artistic transition with terracotta reliefs and stained glass. Meanwhile, An Lang (Tomb of Emperor Duc Duc in An Cuu, built in 1889) is the shared resting place of three patriotic emperors: Duc Duc, Thanh Thai, and Duy Tan.',
      secretHistoricalFact:
        'Before passing away, Emperor Thieu Tri instructed his son Emperor Tu Duc to construct Xuong Lang swiftly and economically so as not to burden the people or disrupt local farmlands.',
      photoSpotAdvice:
        'Capture the moss-covered bronze and stone archways reflecting on Nhuan Trach lotus pond at Thieu Tri Tomb.',
      localSpecialtyPairing:
        'Visit nearby An Cuu and Thuy Xuan neighborhoods for authentic Hue clam noodles and steamed rice cakes.',
      ecoGreenTip:
        'These peaceful heritage sites are surrounded by quiet residential gardens—please respect the tranquil setting.',
    },
  },

  // 12. CUNG AN ĐỊNH
  {
    idKeys: ['cung-an-dinh', 'heritage-cung-an-dinh', 'cung-an-dinh-hue'],
    nameRegex: /cung an định|an dinh palace|khải tường/i,
    kind: 'HERITAGE',
    vi: {
      placeName: 'Cung An Định (Lâu Đài Khải Tường)',
      audioNarrationScript:
        'Dạ thưa quý khách, Cung An Định tọa lạc bên bờ sông An Cựu tại số 179B Phan Đình Phùng. Nguyên là phủ An Định của thái tử Nguyễn Phúc Bửu Đảo, từ năm 1917 đến 1919 khi lên ngôi, vua Khải Định đã cải tạo nơi đây thành một cung điện mang kiến trúc Tân cổ điển châu Âu tráng lệ. Ba công trình nguyên vẹn nổi bật nhất hiện nay là Cổng chính khảm sành sứ tinh xảo, đình bát giác Trung Lập đặt tượng đồng vua Khải Định, và tòa lâu đài Khải Tường 3 tầng nơi Nam Phương Hoàng hậu cùng thái tử Bảo Long và các hoàng thân từng sinh sống sau năm 1945.',
      secretHistoricalFact:
        'Tại tầng 1 Lâu Khải Tường có 6 bức tranh tường vẽ bằng sơn dầu trực tiếp lên vữa vôi từ năm 1917 mô tả cảnh 5 lăng tẩm các vua tiền triều nhìn từ máy bay – tác phẩm hội họa phương Tây sớm nhất tại cung đình Huế.',
      photoSpotAdvice:
        'Đứng trước mặt tiền vàng rực của Lâu Khải Tường hoặc dưới mái vòm đình Trung Lập để có khung hình mang vẻ đẹp hoàng gia Đông Dương.',
      localSpecialtyPairing:
        'Ngay cạnh Cung An Định trên đường Phan Đình Phùng và Nguyễn Khuyến có nhiều quán bún bò Huế và cà phê sân vườn tuyệt ngon.',
      ecoGreenTip:
        'Khi tham quan bên trong Lâu Khải Tường, xin tuyệt đối không chạm tay lên 6 bức bích họa hơn 100 năm tuổi.',
    },
    en: {
      placeName: 'An Dinh Palace (Khai Tuong Royal Chateau)',
      audioNarrationScript:
        'Welcome to An Dinh Palace on the banks of the An Cuu River at 179B Phan Dinh Phung Street. Originally the private residence of Crown Prince Nguyen Phuc Buu Dao, it was reconstructed between 1917 and 1919 after he ascended the throne as Emperor Khai Dinh into a magnificent European Neoclassical palace blended with oriental motifs. Its surviving landmarks—the porcelain-mosaic Main Gate, the octagonal Trung Lap Pavilion, and the three-story Khai Tuong Chateau—later served as the residence of Emperor Bao Dai, Empress Nam Phuong, and Queen Mother Tu Cung after 1945.',
      secretHistoricalFact:
        'The ground floor of Khai Tuong Chateau preserves six priceless oil-on-plaster murals painted in 1917 depicting aerial perspectives of the royal tombs of Emperors Gia Long, Minh Mang, Thieu Tri, Tu Duc, and Dong Khanh.',
      photoSpotAdvice:
        'Frame the ornate yellow Neoclassical facade of Khai Tuong Chateau from the octagonal Trung Lap Pavilion.',
      localSpecialtyPairing:
        'Explore the vibrant food stalls along Phan Dinh Phung Street and Ben Ngu Market just steps away.',
      ecoGreenTip:
        'Inside Khai Tuong Chateau, please do not touch the century-old wall murals or carved wooden staircases.',
    },
  },

  // 13. ĐIỆN HÒN CHÉN
  {
    idKeys: ['dien-hon-chen', 'heritage-dien-hon-chen', 'dien-hon-chen-hue'],
    nameRegex: /hòn chén|huệ nam|ngọc trản|hon chen/i,
    kind: 'HERITAGE',
    vi: {
      placeName: 'Điện Hòn Chén (Huệ Nam Điện – Núi Ngọc Trản)',
      audioNarrationScript:
        'Dạ thưa quý khách, Điện Hòn Chén (tên chữ là Huệ Nam Điện) nằm ẩn mình dưới tán cây cổ thụ trên sườn núi Ngọc Trản (làng Hải Cát, xã Hương Thọ), nhìn thẳng xuống vực sâu xanh thẳm của dòng sông Hương. Đây là di tích tín ngưỡng dân gian giao hòa với văn hóa cung đình triều Nguyễn, nơi thờ Thánh Mẫu Thiên Y A Na (Po Nagar của người Chăm) và Thánh Mẫu Liễu Hạnh. Điện được vua Minh Mạng cho trùng tu năm 1832 và được vua Đồng Khánh đại trùng tu, đổi tên thành Huệ Nam Điện vào năm 1886.',
      secretHistoricalFact:
        'Tên dân gian "Hòn Chén" bắt nguồn từ giai thoại vua Minh Mạng trong một lần du ngoạn sông Hương đã đánh rơi chiếc chén ngọc xuống vực nước xoáy sâu trước điện, tưởng không thể tìm lại được nhưng bất ngờ có một con rùa lớn ngậm chén ngọc nổi lên trả lại cho nhà vua.',
      photoSpotAdvice:
        'Chụp từ trên thuyền rồng sông Hương nhìn lên mái điện cổ kính ẩn hiện giữa vách đá núi Ngọc Trản và tán cổ thụ xanh rì.',
      localSpecialtyPairing:
        'Kết hợp chuyến thuyền rồng ngược dòng sông Hương từ Chùa Thiên Mụ lên Điện Hòn Chén và thưởng thức bánh trái Huế trên thuyền.',
      ecoGreenTip:
        'Khi đi thuyền qua khúc vực sâu Hàm Long trước Điện Hòn Chén, tuyệt đối không thả túi nilon hay vàng mã xuống dòng sông Hương.',
    },
    en: {
      placeName: 'Hon Chen Temple (Hue Nam Sanctuary on Ngoc Tran Cliff)',
      audioNarrationScript:
        'Welcome to Hon Chen Temple, dramatically nestled beneath ancient trees on the steep cliff of Ngoc Tran Mountain overlooking the deepest bend of the Perfume River. Uniquely blending Cham-Vietnamese folk beliefs with Nguyen royal patronage, the temple worships the Holy Mother Thien Y A Na (Po Nagar) and Princess Lieu Hanh. It was restored by Emperor Minh Mang in 1832 and substantially expanded in 1886 by Emperor Dong Khanh.',
      secretHistoricalFact:
        'The popular name "Hon Chen" stems from a legend in which Emperor Minh Mang accidentally dropped a precious jade cup into the deep river whirlpool below the cliff, only for a giant turtle to surface and return the cup to the Emperor.',
      photoSpotAdvice:
        'Take a photo from a dragon boat on the Perfume River looking up at the temple roofs clinging to the emerald mountainside.',
      localSpecialtyPairing:
        'Enjoy royal herbal tea and lotus seed cakes aboard a scenic Perfume River boat cruise.',
      ecoGreenTip:
        'Please protect the purity of the Perfume River by never throwing plastic or paper offerings into the water.',
    },
  },

  // 14. HỒ TỊNH TÂM
  {
    idKeys: ['heritage-ho-tinh-tam', 'ho-tinh-tam'],
    nameRegex: /hồ tịnh tâm|tịnh hồ|tinh tam/i,
    kind: 'HERITAGE',
    vi: {
      placeName: 'Hồ Tịnh Tâm (Di Tích Ngự Uyển Cung Đình)',
      audioNarrationScript:
        'Dạ thưa quý khách, Hồ Tịnh Tâm nằm ở phía Đông Bắc Hoàng Thành Huế, được vua Minh Mạng cho tôn tạo quy mô lớn vào năm 1838 như một ngự uyển đỉnh cao của chốn kinh kỳ. Hồ hình chữ nhật chu vi gần 1.500m với ba hòn đảo Bồng Lai, Phương Trượng và Doanh Châu nối bằng cầu gạch và hành lang lợp ngói. Nơi đây từng được vua Thiệu Trị xếp thứ 3 trong "Thần Kinh Nhị Thập Cảnh" với đầm sen trắng Bách Diệp tiến vua thanh khiết.',
      secretHistoricalFact:
        'Thời Nguyễn, các cung nữ thường chèo thuyền ra Hồ Tịnh Tâm lúc chiều muộn để ướp chè mạn vào trong từng búp sen bách diệp ngậm sương đêm, sáng sớm hôm sau thu lại để pha trà dâng các bậc đế vương.',
      photoSpotAdvice:
        'Chụp hoa sen Bách Diệp nở rộ từ tháng 5 đến tháng 7 soi bóng bên những nhịp cầu gạch cổ kính nối ra đảo Bồng Lai.',
      localSpecialtyPairing:
        'Thưởng thức chè hạt sen Tịnh Tâm bọc nhãn lồng tươi mát ngay gần cổng hồ trên đường Đinh Tiên Hoàng.',
      ecoGreenTip:
        'Tuyệt đối không hái hoa sen, ngắt lá sen hoặc làm kinh động đến đàn chim nước cư ngụ trên đảo Bồng Lai.',
    },
    en: {
      placeName: 'Tinh Tam Royal Lotus Lake (Imperial Garden)',
      audioNarrationScript:
        'Welcome to Tinh Tam Lake in the northeastern sector of the Citadel, redesigned in 1838 under Emperor Minh Mang as a premier royal sanctuary. Ranked third among the Twenty Scenic Wonders of the Imperial Capital by Emperor Thieu Tri, the lake features three islets—Bong Lai, Phuong Truong, and Doanh Chau—linked by brick bridges and pavilions amidst blooming white Bakh Diep lotuses.',
      secretHistoricalFact:
        'During the dynasty, palace maidens rowed out at dusk to tuck fine tea leaves inside blooming hundred-petal lotus buds overnight, collecting morning dew-infused tea for the Emperor.',
      photoSpotAdvice:
        'Photograph royal pink and white lotuses in full bloom from May to July along the antique brick causeways.',
      localSpecialtyPairing:
        'Enjoy Tinh Tam lotus seeds wrapped in longan fruit sweet soup (Che Hat Sen Long Nhan) near Dinh Tien Hoang Street.',
      ecoGreenTip:
        'Please do not pick lotus flowers or disturb migratory birds nesting on the islands of Tinh Tam Lake.',
    },
  },

  // 15. CẦU NGÓI THANH TOÀN
  {
    idKeys: ['cau-ngoi-thanh-toan', 'heritage-cau-ngoi-thanh-toan'],
    nameRegex: /thanh toàn|cầu ngói|thanh toan/i,
    kind: 'HERITAGE',
    vi: {
      placeName: 'Cầu Ngói Thanh Toàn (Làng Cổ Thủy Thanh)',
      audioNarrationScript:
        'Dạ thưa quý khách, Cầu ngói Thanh Toàn tọa lạc tại làng Thanh Thủy Chánh (xã Thủy Thanh, thị xã Hương Thủy), cách trung tâm Huế khoảng 8km về phía Đông Nam. Cây cầu gỗ lợp ngói ống tráng men cổ kính này được bà Trần Thị Đạo – phu nhân một vị quan lớn thời chúa Nguyễn và là người con của làng – xuất tiền riêng xây dựng vào năm 1776 để dân làng qua lại thuận tiện và khách bộ hành có nơi trú mưa nắng. Cầu dài 17 mét, rộng 4 mét, chia làm 7 gian theo lối kiến trúc "thượng gia hạ kiều" (trên là nhà, dưới là cầu) hiếm hoi bậc nhất Việt Nam.',
      secretHistoricalFact:
        'Cảm kích nghĩa cử cao đẹp của bà Trần Thị Đạo, vua Lê Hiển Tông năm 1776 và vua Minh Mạng năm 1825 đã ban sắc phong miễn nhiều sưu dịch cho dân làng để lập bàn thờ phụng bà ngay gian giữa trên cầu.',
      photoSpotAdvice:
        'Chụp từ bờ kênh làng Thanh Thủy lấy trọn vẹn mái ngói lưu ly cổ kính của cầu và ghé thăm Nhà trưng bày nông cụ truyền thống ngay bên cạnh.',
      localSpecialtyPairing:
        'Thưởng thức bánh căn, chè bắp và trải nghiệm chợ quê Cầu Ngói Thanh Toàn vào các dịp lễ hội.',
      ecoGreenTip:
        'Đạp xe xuyên qua những cánh đồng lúa xanh mướt từ trung tâm Huế về Cầu Ngói Thanh Toàn là cung đường du lịch xanh tuyệt đẹp.',
    },
    en: {
      placeName: 'Thanh Toan Tile-Roofed Bridge (Thuy Thanh Ancient Village)',
      audioNarrationScript:
        'Welcome to Thanh Toan Tile-Roofed Bridge in Thuy Thanh Village, located 8 kilometers southeast of Hue city center. Constructed in 1776 through the generous donation of Lady Tran Thi Dao, this 17-meter wooden bridge is one of the rarest examples of "thuong gia ha kieu" (house above, bridge below) architecture in Vietnam. Divided into seven compartments with glazed roof tiles and built-in wooden benches, it has sheltered villagers and travelers for nearly 250 years.',
      secretHistoricalFact:
        'In recognition of Lady Tran Thi Dao’s philanthropy, both Emperor Le Hien Tong in 1776 and Emperor Minh Mang in 1825 issued royal decrees exempting villagers from certain duties so they could maintain the bridge and venerate her altar.',
      photoSpotAdvice:
        'Photograph the bridge from the canal bank and visit the adjacent Traditional Agricultural Tools Museum.',
      localSpecialtyPairing:
        'Taste rustic country delicacies at the village market right beside the bridge, including corn sweet soup and savory rice pancakes.',
      ecoGreenTip:
        'Cycling from Hue through lush green rice paddies to Thanh Toan Bridge is one of the region’s most rewarding eco-tours.',
    },
  },

  // 16. LÀNG HƯƠNG TRẦM THỦY XUÂN
  {
    idKeys: ['11', 'lang-huong-thuy-xuan', 'lang-huong-thuy-xuan-08', 'tour-lang-huong-hue-tiem-huong-viet'],
    nameRegex: /làng hương|thủy xuân|incense village/i,
    kind: 'HERITAGE',
    vi: {
      placeName: 'Làng Hương Trầm Thủy Xuân',
      audioNarrationScript:
        'Dạ thưa quý khách, Làng hương Thủy Xuân nằm trên trục đường Huyền Trân Công Chúa (gần Lăng Tự Đức và Đồi Vọng Cảnh) là làng nghề làm hương trầm truyền thống đã có lịch sử hơn 700 năm từ thời Trần – Hồ và phát triển rực rỡ dưới triều Nguyễn. Xưa kia, làng là nơi tiến cung các loại hương trầm thượng hạng cho triều đình, phủ đệ và thần dân vùng Thuận Hóa – Phú Xuân. Hương Thủy Xuân làm từ bột trầm hương, quế chi, thảo quả, đinh hương, hoa hồi và vỏ bưởi rừng tự nhiên, không hóa chất, với những bó chân hương nhuộm ngũ sắc xòe tròn rực rỡ dưới nắng.',
      secretHistoricalFact:
        'Người nghệ nhân Thủy Xuân vê hương bằng tay chỉ mất vài giây cho mỗi nén hương đều tăm tắp; khách tham quan có thể trực tiếp ngồi vào bàn tre để tự tay trải nghiệm se những nén hương trầm của riêng mình.',
      photoSpotAdvice:
        'Thuê áo dài ngũ thân hoặc cổ phục Nhật Bình ngay tại làng và chụp ảnh từ góc trên cao giữa những đóa hoa hương ngũ sắc rực rỡ.',
      localSpecialtyPairing:
        'Ghé thưởng thức bánh bèo chén tôm chấy và nước mía sầu riêng dọc đường Huyền Trân Công Chúa.',
      ecoGreenTip:
        'Mua những bó hương trầm thảo mộc tự nhiên tại làng là cách trực tiếp ủng hộ các nghệ nhân giữ lửa nghề truyền thống 700 năm.',
    },
    en: {
      placeName: 'Thuy Xuan Traditional Incense Village',
      audioNarrationScript:
        'Welcome to Thuy Xuan Incense Village on Huyen Tran Cong Chua Street, a traditional craft village with over 700 years of history located near Tu Duc Tomb and Vong Canh Hill. During the Nguyen Dynasty, Thuy Xuan artisans supplied fine agarwood incense to the Imperial Court, royal temples, and local households across Phu Xuan. Crafted entirely from natural herbs—agarwood dust, cinnamon, star anise, clove buds, and pomelo peel—the village is famous for its bouquets of bamboo incense sticks dyed in vibrant colors.',
      secretHistoricalFact:
        'Master artisans in Thuy Xuan can hand-roll an evenly coated incense stick in seconds, and visitors are warmly invited to try rolling their own incense sticks on traditional bamboo trays.',
      photoSpotAdvice:
        'Rent a traditional Nguyen Dynasty Ao Dai or Nhat Binh robe at the village and pose amidst the blooming circles of colorful incense bundles.',
      localSpecialtyPairing:
        'Sample local steamed rice cakes (Banh Beo) and fresh sugarcane juice along Huyen Tran Cong Chua Street.',
      ecoGreenTip:
        'Purchasing natural chemical-free herbal incense directly supports local families preserving this 700-year-old intangible heritage.',
    },
  },

  // 17. CHÙA TỪ ĐÀM, CHÙA BÁO QUỐC, CHÙA TỪ HIẾU
  {
    idKeys: ['heritage-chua-tu-dam', 'heritage-chua-bao-quoc', 'chua-tu-hieu', 'tour-chua-tu-dam', 'tour-chua-bao-quoc', 'tour-chua-tu-hieu'],
    nameRegex: /chùa từ đàm|chùa báo quốc|chùa từ hiếu|tu dam|bao quoc|tu hieu/i,
    kind: 'HERITAGE',
    vi: {
      placeName: 'Cổ Tự Cố Đô: Chùa Từ Đàm • Chùa Báo Quốc • Chùa Từ Hiếu',
      audioNarrationScript:
        'Dạ thưa quý khách, xứ Huế được mệnh danh là kinh đô Phật giáo Việt Nam với những ngôi tổ đình hàng trăm năm tuổi. Chùa Báo Quốc trên đồi Hàm Long được Tổ Giác Phong khai sơn cuối thế kỷ 17 và vua Gia Long ban sắc tứ năm 1808. Chùa Từ Đàm tại phường Trường An do Thiền sư Minh Hoằng Tử Dung sáng lập khoảng năm 1690 là trung tâm chấn hưng Phật giáo miền Trung và là cái nôi của phong trào đấu tranh Phật giáo năm 1963 đòi hòa bình và bình đẳng tôn giáo. Còn Tổ đình Từ Hiếu ẩn mình giữa rừng thông Thủy Xuân do Thiền sư Nhất Định khai lập năm 1843, là nơi Thiền sư Thích Nhất Hạnh xuất gia tu học.',
      secretHistoricalFact:
        'Chùa Từ Hiếu là ngôi chùa duy nhất tại Việt Nam có khu nghĩa trang riêng quy tập và thờ cúng các vị thái giám cung đình nhà Nguyễn – những người đã đóng góp công của mở rộng chùa năm 1848 để có nơi nương tựa tâm linh lúc tuổi già.',
      photoSpotAdvice:
        'Chụp ảnh cổng tam quan cổ kính, hồ bán nguyệt và con đường lát đá rợp bóng thông xanh dẫn vào Tổ đình Từ Hiếu.',
      localSpecialtyPairing:
        'Thưởng thức các món chay thanh đạm xứ Huế (bún bò chay, bánh lọc lá chay) tại các quán chay quanh đường Sư Liễu Quán và Lê Ngô Cát.',
      ecoGreenTip:
        'Khi bước vào khuôn viên tổ đình, xin giữ chánh niệm, bước đi nhẹ nhàng và giữ sự tĩnh lặng tuyệt đối cho chốn thiền môn.',
    },
    en: {
      placeName: 'Ancient Pagodas of Hue: Tu Dam • Bao Quoc • Tu Hieu',
      audioNarrationScript:
        'Welcome to the ancient Buddhist heartland of Hue. Bao Quoc Pagoda on Ham Long Hill was founded in the late 17th century by Patriarch Giac Phong, while Tu Dam Pagoda in Truong An Ward served as the historic center of Vietnam’s 1963 Buddhist movement for peace and religious equality. Nearby, nestled in a pine forest in Thuy Xuan, stands Tu Hieu Root Temple—founded in 1843 by Zen Master Nhat Dinh and known worldwide as the spiritual home of Zen Master Thich Nhat Hanh.',
      secretHistoricalFact:
        'Tu Hieu Pagoda is the only temple in Vietnam with a dedicated cemetery honoring royal eunuchs of the Nguyen Dynasty, who funded the temple’s 1848 expansion so their spirits would be cared for after death.',
      photoSpotAdvice:
        'Capture the crescent-shaped lotus pond and moss-covered triple-arched gate beneath the towering pines of Tu Hieu Temple.',
      localSpecialtyPairing:
        'Savor authentic Hue vegetarian cuisine along Su Lieu Quan and Le Ngo Cat Streets.',
      ecoGreenTip:
        'Practice mindful walking, speak softly, and respect the monastic silence of the resident monks.',
    },
  },

  // 18. TRƯỜNG QUỐC HỌC, BẢO TÀNG HỒ CHÍ MINH, BẢO TÀNG MỸ THUẬT, CHỢ ĐÔNG BA
  {
    idKeys: ['truong-quoc-hoc-hue', 'heritage-bao-tang-ho-chi-minh-hue', 'heritage-bao-tang-my-thuat-hue', 'heritage-cho-dong-ba', 'heritage-cho-ben-ngu', 'heritage-cho-dem-hue'],
    nameRegex: /quốc học|bảo tàng hồ chí minh|bảo tàng mỹ thuật|chợ đông ba|chợ bến ngự|chợ đêm huế|quoc hoc|dong ba market/i,
    kind: 'HERITAGE',
    vi: {
      placeName: 'Di Sản Văn Hóa – Lịch Sử Ven Sông Hương',
      audioNarrationScript:
        'Dạ thưa quý khách, dọc hai bờ sông Hương là trục di sản văn hóa – lịch sử sống động của Huế. Bờ Nam nổi bật với Trường Quốc Học Huế (thành lập ngày 23/10/1896 theo dụ của vua Thành Thái) mang sắc đỏ Pháp cổ điển – nơi Chủ tịch Hồ Chí Minh, Đại tướng Võ Nguyên Giáp từng theo học; kế bên là Bảo tàng Hồ Chí Minh (số 7 Lê Lợi) và Bảo tàng Mỹ thuật Huế. Bờ Bắc nhộn nhịp với Chợ Đông Ba hơn 125 năm tuổi (dời về vị trí hiện nay năm 1899 dưới thời vua Thành Thái) với lầu chuông biểu tượng của nhịp sống thương hồ Cố Đô.',
      secretHistoricalFact:
        'Trường Quốc Học Huế ban đầu là những dãy nhà tranh vách đất; đến giai đoạn 1915–1932 mới được xây dựng lại bằng gạch sơn màu đỏ thẫm đặc trưng của kiến trúc Pháp Đông Dương và giữ nguyên vẻ đẹp cho đến ngày nay.',
      photoSpotAdvice:
        'Chụp ảnh cổng trường Quốc Học Huế và hàng cây điệp anh đào hồng rực bên bờ sông Hương vào tháng 3 – tháng 4.',
      localSpecialtyPairing:
        'Ghé khu ẩm thực đình chợ Đông Ba thưởng thức bún nghệ, bún thịt nướng, bánh ướt, nem chả tré và chè Huế.',
      ecoGreenTip:
        'Tuyến đường Lê Lợi và đường đi bộ ven sông Hương có làn xe đạp xanh riêng biệt, rất thuận tiện để dạo mát không khói bụi.',
    },
    en: {
      placeName: 'Historic & Cultural Landmarks Along the Perfume River',
      audioNarrationScript:
        'Along the banks of the Perfume River lies a vibrant corridor of living history. On the southern bank stands Quoc Hoc High School, founded in 1896 under Emperor Thanh Thai—famous for its crimson French Indo-Chinese architecture and illustrious alumni including President Ho Chi Minh and General Vo Nguyen Giap—alongside the Ho Chi Minh Museum and the Hue Fine Arts Museum. Across the river on the northern bank bustles Dong Ba Market, relocated to its current riverside site in 1899.',
      secretHistoricalFact:
        'Quoc Hoc High School originally consisted of thatched timber halls before being rebuilt between 1915 and 1932 in its signature crimson French colonial brick style.',
      photoSpotAdvice:
        'Photograph the iconic crimson gate of Quoc Hoc High School along Le Loi Boulevard, especially when pink cassia blossoms bloom in spring.',
      localSpecialtyPairing:
        'Visit the food court inside Dong Ba Market to sample turmeric noodles, pressed rice cakes, and sesame candy.',
      ecoGreenTip:
        'Use the dedicated riverside pedestrian and cycling paths along Le Loi Street for an eco-friendly city tour.',
    },
  },

  // 19. ĐẤU TRƯỜNG HỔ QUYỀN & ĐIỆN VOI RÉ
  {
    idKeys: ['tour-ho-quyen', 'tour-dien-voi-re', 'ho-quyen', 'dien-voi-re'],
    nameRegex: /hổ quyền|voi ré|ho quyen|dien voi re|voi re/i,
    kind: 'HERITAGE',
    vi: {
      placeName: 'Đấu Trường Hổ Quyền & Điện Voi Ré',
      audioNarrationScript:
        'Dạ thưa quý khách, Đấu trường Hổ Quyền và Điện Voi Ré tọa lạc tại thôn Trường Đá, phường Thủy Xuân, được vua Minh Mạng cho xây dựng vào năm Canh Dần 1830. Hổ Quyền là đấu trường lộ thiên hình vành khăn bằng gạch đá độc nhất vô nhị ở châu Á, nơi tổ chức các trận tử chiến giữa voi chiến và hổ dữ nhằm rèn luyện lòng quả cảm cho binh sĩ và thỏa mãn thú thưởng lãm của hoàng gia. Cách đó 400 mét là Điện Voi Ré (Long Châu Miếu) – ngôi miếu thờ độc đáo thờ hai nghĩa tượng trung liệt tử trận trong chiến tranh và thần hộ mệnh của loài tượng binh triều Nguyễn.',
      secretHistoricalFact:
        'Trước mỗi trận đấu tại Hổ Quyền, hổ dữ luôn bị cắt hết móng vuốt sắc nhọn và bẻ gãy răng nanh để đảm bảo phần thắng luôn thuộc về voi chiến – biểu tượng cho sức mạnh chính nghĩa, dũng khí quân vương và sự uy nghiêm của vương triều nhà Nguyễn.',
      photoSpotAdvice:
        'Đứng từ trên khán đài dành cho vua nhìn bao quát toàn bộ lòng chảo đấu trường hình vành khăn với bậc thềm đá rêu phong cổ kính.',
      localSpecialtyPairing:
        'Thưởng thức bánh ướt thịt nướng và bánh bèo chén dọc đường Bùi Thị Xuân sau khi tham quan Hổ Quyền.',
      ecoGreenTip:
        'Công trình bằng gạch vồ cổ hơn 190 năm tuổi, xin quý khách đi lại nhẹ nhàng, không leo trèo lên thành đấu trường nguy hiểm.',
    },
    en: {
      placeName: 'Ho Quyen Royal Colosseum & Voi Re Elephant Temple',
      audioNarrationScript:
        'Constructed in 1830 under Emperor Minh Mang in Thuy Xuan Ward, Ho Quyen is an open-air circular brick arena unique in Asia, built to stage ceremonial battles between war elephants and tigers. These spectacles tested the courage of imperial troops and reinforced the moral triumph of royal righteousness over untamed chaos. Located 400 meters away is Voi Re Temple (Long Chau Shrine), dedicated to loyal war elephants who fell in battle during the dynasty’s military campaigns.',
      secretHistoricalFact:
        'Before entering the arena, the tigers had their claws trimmed and fangs blunted so that the war elephant—representing imperial virtue and sovereignty—would emerge victorious.',
      photoSpotAdvice:
        'Capture the sweeping circular brick tiers of the colosseum from the elevated Imperial Viewing Platform.',
      localSpecialtyPairing:
        'Taste grilled pork rice rolls along Bui Thi Xuan Street after exploring the colosseum.',
      ecoGreenTip:
        'Please do not climb onto the ancient brick ramparts to ensure your safety and preserve the historic masonry.',
    },
  },

  // 20. NHÀ HÁT DUYỆT THỊ ĐƯỜNG & TÀNG THƯ LÂU
  {
    idKeys: ['tour-nha-hat-duyet-thi-duong', 'tour-tang-thu-lau', 'duyet-thi-duong', 'tang-thu-lau'],
    nameRegex: /duyệt thị đường|tàng thư lâu|duyet thi duong|tang thu lau/i,
    kind: 'HERITAGE',
    vi: {
      placeName: 'Nhà Hát Cung Đình Duyệt Thị Đường & Tàng Thư Lâu',
      audioNarrationScript:
        'Dạ thưa quý khách, Duyệt Thị Đường và Tàng Thư Lâu là hai tuyệt tác kiến trúc văn hóa đặc biệt bên trong Kinh thành Huế. Duyệt Thị Đường được xây dựng năm 1826 dưới thời vua Minh Mạng, là nhà hát hoàng gia cổ nhất còn tồn tại của Việt Nam, nơi biểu diễn Nhã nhạc và các vở Tuồng cung đình phục vụ nhà vua, hoàng gia và quốc khách ngoại giao. Còn Tàng Thư Lâu nằm trên đảo nổi giữa hồ Học Hải xây dựng năm 1825, từng lưu trữ hơn 12 vạn tập tài liệu, địa bạ và châu bản vô giá của vương triều nhà Nguyễn.',
      secretHistoricalFact:
        'Vòm trần của Duyệt Thị Đường được sơn màu xanh da trời, vẽ hình mặt trời, mặt trăng, các chòm sao lấp lánh và trang trí chim nhạn bay lượn, tạo cảm giác như quan khách đang thưởng thức nghệ thuật dưới bầu trời đêm mênh mông.',
      photoSpotAdvice:
        'Chụp ảnh không gian sân khấu lộng lẫy sơn son thếp vàng của Duyệt Thị Đường hoặc cây cầu đá bắc qua hồ Học Hải dẫn vào Tàng Thư Lâu rợp bóng cây cổ thụ.',
      localSpecialtyPairing:
        'Thưởng thức tách trà cung đình và kẹo mè xửng Huế tại khuôn viên dịch vụ di sản sau giờ xem biểu diễn Nhã nhạc.',
      ecoGreenTip:
        'Khi xem biểu diễn Nhã nhạc tại Duyệt Thị Đường, xin quý khách giữ trật tự và tắt chuông điện thoại để tôn vinh nghệ thuật truyền thống.',
    },
    en: {
      placeName: 'Duyet Thi Duong Royal Theater & Tang Thu Lau Archives',
      audioNarrationScript:
        'Duyet Thi Duong and Tang Thu Lau represent Hue’s finest cultural achievements. Built in 1826 under Emperor Minh Mang, Duyet Thi Duong is Vietnam’s oldest surviving royal theater, where the Emperor and court viewed UNESCO-inscribed Nha Nhac (Court Music) and classical royal operas. Nearby on Hoc Hai Lake stands Tang Thu Lau (National Archives Pavilion, built 1825), which historically guarded over 120,000 imperial records, cadastral registers, and administrative decrees.',
      secretHistoricalFact:
        'The ceiling of Duyet Thi Duong was painted celestial blue with gilded depictions of the sun, moon, constellations, and swallows, simulating an open-air night sky inside the royal theater.',
      photoSpotAdvice:
        'Frame the gilded theatrical stage inside Duyet Thi Duong or the stone causeway leading to the archives across Hoc Hai Lake.',
      localSpecialtyPairing:
        'Enjoy royal herbal tea and sesame candy (Me Xung) at the heritage courtyard after a court music performance.',
      ecoGreenTip:
        'Silence mobile phones during live Nha Nhac performances to honor the performers and the acoustic atmosphere.',
    },
  },

  // =========================================================================
  // II. CÁC DI TÍCH LỊCH SỬ CHIẾN TRANH & CÁCH MẠNG
  // =========================================================================

  // 21. KỲ ĐÀI HUẾ (CỘT CỜ KINH THÀNH)
  {
    idKeys: ['tour-ky-dai', 'ky-dai', 'cot-co-hue', 'the-flag-tower', 'tour-the-flag-tower'],
    nameRegex: /kỳ đài|cột cờ kinh thành|cột cờ huế|the flag tower/i,
    kind: 'HERITAGE',
    vi: {
      placeName: 'Kỳ Đài Huế (Cột Cờ Kinh Thành – Chứng Tích Mậu Thân 1968)',
      audioNarrationScript:
        'Dạ thưa quý khách, Kỳ Đài Huế (còn gọi là Cột Cờ Kinh Thành) được xây dựng vào năm 1807 dưới triều vua Gia Long, gồm đài cờ 3 tầng đồ sộ bằng gạch vồ kiên cố và cột cờ uy nghiêm cao vút trước cổng Ngọ Môn. Xuyên suốt hơn hai thế kỷ, Kỳ Đài là nhân chứng cho những bước ngoặt lịch sử vĩ đại nhất của đất Cố Đô: nơi vua Bảo Đại làm lễ thoái vị trao ấn kiếm ngày 30 tháng 8 năm 1945; và đặc biệt là nơi quân Giải phóng cắm lá cờ Mặt trận Dân tộc Giải phóng miền Nam Việt Nam tung bay suốt 25 ngày đêm trong Chiến dịch Tết Mậu Thân 1968, trở thành biểu tượng quật cường bất khuất của quân dân Thừa Thiên Huế trong cuộc kháng chiến chống Mỹ cứu nước.',
      secretHistoricalFact:
        'Trong 25 ngày đêm khốc liệt của chiến dịch Tết Mậu Thân 1968, Kỳ Đài và các pháo đài xung quanh đã hứng chịu hàng ngàn tấn bom đạn ác liệt, nhưng lá cờ giải phóng rộng 108 mét vuông do các nữ chiến sĩ tự tay may vẫn kiêu hãnh tung bay trên đỉnh đài.',
      photoSpotAdvice:
        'Đứng từ quảng trường Ngọ Môn chụp góc chính diện thẳng lên Kỳ Đài với lá cờ đỏ sao vàng tung bay trên nền trời xanh.',
      localSpecialtyPairing:
        'Sau khi tham quan Kỳ Đài, dạo bộ sang đường Lê Duẩn thưởng thức chè Hẻm và bánh mì Huế nóng giòn.',
      ecoGreenTip:
        'Khu vực sân Kỳ Đài là không gian công viên lịch sử mở, xin quý khách giữ gìn vệ sinh và không leo trèo lên lan can đài cờ.',
    },
    en: {
      placeName: 'Hue Flag Tower (Ky Dai – Relic of the 1968 Tet Offensive)',
      audioNarrationScript:
        'Standing opposite the Meridian Gate, the monumental Hue Flag Tower (Ky Dai) was erected in 1807 under Emperor Gia Long. Built on three tiered brick ramparts, this bastion has witnessed Vietnam’s pivotal historical turning points: from Emperor Bao Dai’s abdication on August 30, 1945, to the fierce Battle of Hue during the 1968 Tet Offensive, when the Liberation Front flag flew atop the tower for 25 consecutive days amidst intense combat.',
      secretHistoricalFact:
        'During the 1968 Tet Offensive, the masonry of the Flag Tower absorbed countless artillery and airstrike impacts, yet the massive 108-square-meter flag hand-stitched by local women partisans remained aloft.',
      photoSpotAdvice:
        'Shoot from the Ngo Mon esplanade directly upward toward the monumental three-tiered ramparts crowned by the national flag.',
      localSpecialtyPairing:
        'Stroll along Le Duan Boulevard for warm Hue baguettes and local sweet soups.',
      ecoGreenTip:
        'The esplanade around Ky Dai is a public heritage park; please keep the lawns clean and stay off high parapets.',
    },
  },

  // 22. CỬU VỊ THẦN CÔNG (CHÍN KHẨU ĐẠI BÁC HOÀNG GIA)
  {
    idKeys: ['tour-cuu-vi-than-cong', 'tour-sung-than-cong', 'cuu-vi-than-cong', 'sung-than-cong'],
    nameRegex: /cửu vị thần công|súng thần công|nine holy cannons/i,
    kind: 'HERITAGE',
    vi: {
      placeName: 'Cửu Vị Thần Công (Chín Khẩu Đại Bác Hoàng Gia)',
      audioNarrationScript:
        'Dạ thưa quý khách, Cửu Vị Thần Công là chín khẩu đại bác bằng đồng khổng lồ được vua Gia Long truyền lệnh đúc từ tháng 2 năm 1803 đến tháng 1 năm 1804, nấu từ toàn bộ số đồ đồng thu được của triều Tây Sơn. Chín khẩu thần công được chia làm hai nhóm: nhóm Tứ Thời gồm 4 khẩu mang tên Xuân, Hạ, Thu, Đông đặt phía trong cửa Thể Nhơn (Cửa Ngăn), và nhóm Ngũ Hành gồm 5 khẩu mang tên Kim, Mộc, Thủy, Hỏa, Thổ đặt phía trong cửa Quảng Đức (Cửa Sập). Mỗi khẩu đại bác dài 5,1 mét, nặng hơn 10 tấn, thân khắc chạm hoa văn rồng vờn mây tinh xảo và sắc phong "Thần Oai Vô Địch Thượng Tướng Quân". Năm 2012, Cửu Vị Thần Công được công nhận là Bảo vật Quốc gia.',
      secretHistoricalFact:
        'Dù là những khẩu pháo hạng nặng uy lực nhất thế kỷ 19, Cửu Vị Thần Công chưa từng bắn một phát đạn nào trong chiến trận; triều đình nhà Nguyễn đúc súng với tư cách là những thần linh hộ quốc an dân và bảo vệ sự trường tồn của kinh thành.',
      photoSpotAdvice:
        'Chụp cận cảnh hoa văn rồng khắc nổi tinh xảo trên thân đồng của khẩu đại bác "Xuân" hoặc "Kim" dưới mái nhà pháo cổ kính.',
      localSpecialtyPairing:
        'Thưởng thức các món bánh đặc sản Huế ngay khu vực cửa Nhà Đồ và đường Mai Thúc Loan.',
      ecoGreenTip:
        'Cửu Vị Thần Công là Bảo vật Quốc gia, xin quý khách tuyệt đối không leo trèo lên nòng pháo hay khắc vẽ lên bề mặt kim loại.',
    },
    en: {
      placeName: 'The Nine Holy Cannons (Cuu Vi Than Cong)',
      audioNarrationScript:
        'Cast between February 1803 and January 1804 by order of Emperor Gia Long from melted bronze captured from the Tay Son forces, the Nine Holy Cannons stand inside the Citadel ramparts. Arranged into two groups, the Four Seasons (Spring, Summer, Autumn, Winter) flank Ngan Gate, while the Five Elements (Metal, Wood, Water, Fire, Earth) flank Quang Duc Gate. Measuring 5.1 meters in length and weighing over 10 tons each, these National Treasures were titled "Invincible Deity Generals".',
      secretHistoricalFact:
        'Despite being formidable 19th-century heavy artillery pieces, the Nine Cannons were never fired in combat; they served exclusively as spiritual guardian deities protecting the capital and the dynasty.',
      photoSpotAdvice:
        'Take a close-up photo of the intricate dragon reliefs and imperial inscriptions cast along the bronze barrels under the wooden shelter.',
      localSpecialtyPairing:
        'Sample royal steamed rice cakes near Nha Do Gate and Mai Thuc Loan Street.',
      ecoGreenTip:
        'As designated National Treasures, climbing on the cannon carriages or touching the bronze surfaces is strictly prohibited.',
    },
  },

  // 23. KHU DI TÍCH LỊCH SỬ CHÍN HẦM
  {
    idKeys: ['tour-khu-di-tich-lich-su-chin-ham', 'chin-ham', 'khu-di-tich-chin-ham'],
    nameRegex: /chín hầm|chin ham|ngục chín hầm/i,
    kind: 'HERITAGE',
    vi: {
      placeName: 'Khu Di Tích Lịch Sử Chín Hầm (Ngục Biệt Giam Núi Thiên Thai)',
      audioNarrationScript:
        'Dạ thưa quý khách, Khu di tích lịch sử Chín Hầm tọa lạc dưới chân núi Thiên Thai (núi Ngũ Tây), thuộc phường An Tây, cách trung tâm Huế khoảng 6km về phía Tây Nam. Nơi đây nguyên là khu kho vũ khí, đạn dược do quân đội thực dân Pháp xây dựng từ năm 1941 gồm 9 căn hầm bê tông cốt thép nửa chìm nửa nổi. Từ năm 1954 đến 1963, Ngô Đình Cẩn (em trai Ngô Đình Diệm) đã biến nơi này thành "địa ngục trần gian" biệt giam, tra tấn dã man hàng ngàn cán bộ chiến sĩ cách mạng, các nhân sĩ trí thức và đồng bào Phật giáo miền Nam. Năm 1993, Chín Hầm được Bộ Văn hóa Thông tin xếp hạng là Di tích Lịch sử cấp Quốc gia.',
      secretHistoricalFact:
        'Hầm số 8 (được gọi là hầm giam tử tù) là nơi giam giữ khắc nghiệt nhất; các chiến sĩ bị cùm chân trong bóng tối đặc quánh, thiếu dưỡng khí và ẩm thấp, nhưng tinh thần kiên trung bất khuất của những người cộng sản vẫn sáng ngời giữa lòng ngục tối.',
      photoSpotAdvice:
        'Chụp ảnh tại tượng đài chứng tích và cửa hầm số 4 rêu phong phủ bóng thông xanh trầm mặc dưới chân núi Thiên Thai.',
      localSpecialtyPairing:
        'Trên đường từ Chín Hầm về trung tâm, ghé khu vực Đàn Nam Giao thưởng thức bún bò giò heo chuẩn vị Cố Đô.',
      ecoGreenTip:
        'Xin giữ thái độ tôn nghiêm, tưởng niệm các anh hùng liệt sĩ đã hy sinh vì nền độc lập tự do của Tổ quốc.',
    },
    en: {
      placeName: 'Chin Ham Historic Prison Relic (Nine Bunkers of Thien Thai)',
      audioNarrationScript:
        'Located at the foot of Thien Thai Mountain 6 kilometers southwest of Hue, the Chin Ham (Nine Bunkers) historic complex was originally built by the French colonial military in 1941 as reinforced concrete ammunition storage bunkers. Between 1954 and 1963, Ngo Dinh Can converted the complex into a notorious clandestine prison, subjecting thousands of revolutionary cadres, intellectuals, and Buddhist activists to harsh isolation and interrogation. In 1993, Chin Ham was classified as a National Historical Monument.',
      secretHistoricalFact:
        'Bunker No. 8 was the most severe subterranean solitary cell; prisoners were shackled in pitch darkness and damp air, yet their unyielding resilience became a legendary chapter of wartime courage in Central Vietnam.',
      photoSpotAdvice:
        'Photograph the memorial monument and the moss-covered concrete entrance of Bunker No. 4 framed by silent pine trees.',
      localSpecialtyPairing:
        'Stop by Dien Bien Phu Street near Nam Giao Esplanade for authentic spicy Hue beef noodle soup.',
      ecoGreenTip:
        'Please maintain respectful conduct and silent reverence when visiting this solemn war memorial site.',
    },
  },

  // 24. VIETNAM WAR BUNKERS / THE HILL (BUNKER)
  {
    idKeys: ['tour-vietnam-war-bunkers', 'tour-the-hill-bunker', 'vietnam-war-bunkers', 'the-hill-bunker'],
    nameRegex: /bunker|boongke|vietnam war bunkers|the hill/i,
    kind: 'WAR_NATURE',
    vi: {
      placeName: 'Vietnam War Bunkers (Lô Cốt Boongke Thời Chiến – Đồi Vọng Cảnh)',
      audioNarrationScript:
        'Dạ thưa quý khách, hệ thống Vietnam War Bunkers (lô cốt boong-ke thời chiến) nằm trên các cao điểm đồi thông phía tây nam thành phố Huế (đặc biệt tại khu vực đồi Vọng Cảnh, đồi Châu Ê và dọc đường Huyền Trân Công Chúa). Đây là những công trình phòng sự kiên cố bằng bê tông cốt thép dày đặc có lỗ châu mai, được quân đội Pháp xây dựng từ những năm 1940 và sau đó quân đội Mỹ cùng chính quyền Sài Gòn tiếp tục củng cố trong chiến tranh Việt Nam nhằm kiểm soát toàn bộ khúc quanh yết hầu của sông Hương và tuyến đường bộ tiến vào vùng căn cứ kháng chiến phía tây Huế.',
      secretHistoricalFact:
        'Từ các lỗ châu mai của cụm boong-ke này, quân đội Mỹ từng đặt đài quan sát hỏa lực pháo binh và trinh sát trên không yểm trợ cho các cuộc hành quân giải tỏa chiến trường Huế trong chiến dịch năm 1968.',
      photoSpotAdvice:
        'Chụp góc nhìn từ cửa vòm boong-ke rêu phong phóng tầm mắt ra khúc uốn thơ mộng của dòng sông Hương và rặng núi xa xa lúc hoàng hôn.',
      localSpecialtyPairing:
        'Ghé làng hương Thủy Xuân ngay gần đó thưởng thức bánh nậm nóng hổi và trà thảo mộc xứ Huế.',
      ecoGreenTip:
        'Boong-ke nằm giữa công viên sinh thái đồi thông Vọng Cảnh, xin quý khách không vứt rác hay viết vẽ lên tường bê tông di tích.',
    },
    en: {
      placeName: 'Vietnam War Bunkers on Vong Canh Hill',
      audioNarrationScript:
        'Overlooking the southwestern approaches to Hue along Huyen Tran Cong Chua Street and Vong Canh Hill, these reinforced concrete bunkers were originally constructed by French forces in the late 1940s and subsequently upgraded by US and South Vietnamese troops during the Vietnam War. Perched on strategic pine-covered high ground, these fortifications commanded vital visual control over the bends of the Perfume River and the overland supply corridors leading to the western mountain bases.',
      secretHistoricalFact:
        'The embrasures of these hilltop bunkers served as forward artillery observation and airspace monitoring posts during the pivotal engagements of the 1968 Battle of Hue.',
      photoSpotAdvice:
        'Frame the dramatic sunset over the winding Perfume River through the historic concrete embrasure of the hilltop bunker.',
      localSpecialtyPairing:
        'Visit nearby Thuy Xuan Village for steamed rice cakes and traditional herbal tea.',
      ecoGreenTip:
        'Situated in an open pine forest park, please keep the hilltop clean and refrain from defacing the historic concrete structures.',
    },
  },

  // 25. DI TÍCH ĐÀN ÂM HỒN
  {
    idKeys: ['tour-di-tich-dan-am-hon', 'dan-am-hon'],
    nameRegex: /đàn âm hồn|dan am hon/i,
    kind: 'HERITAGE',
    vi: {
      placeName: 'Di Tích Đàn Âm Hồn (Tưởng Niệm Biến Cố Thất Thủ Kinh Đô 1885)',
      audioNarrationScript:
        'Dạ thưa quý khách, Di tích Đàn Âm Hồn nằm tại góc đường Mai Thúc Loan và Ông Ích Khiêm trong Kinh thành Huế, được vua Thành Thái cho lập vào năm 1895. Đàn tế là nơi triều đình nhà Nguyễn và nhân dân xứ Huế tổ chức quốc lễ hàng năm vào ngày 23 tháng 5 Âm lịch để cầu siêu, tưởng niệm hàng vạn tướng sĩ quân đội triều Nguyễn cùng thường dân vô tộc đã ngã xuống trong đêm kinh đô thất thủ (đêm 22 rạng ngày 23 tháng 5 năm Ất Dậu 1885) trong cuộc tập kích chống quân xâm lược Pháp do quan phụ chính Tôn Thất Thuyết lãnh đạo.',
      secretHistoricalFact:
        'Từ biến cố bi thương này, ngày 23 tháng 5 Âm lịch hàng năm đã trở thành ngày "Quẩy cúng cơm chung" (ngày giỗ chung của toàn thể người dân Huế), mọi ngõ phố đều dựng hương án cúng cô hồn với lòng thành kính và tiếc thương vô hạn.',
      photoSpotAdvice:
        'Chụp bia đá tưởng niệm và hương án Đàn Âm Hồn cổ kính rợp bóng cây xanh trầm mặc bên bờ thành nội.',
      localSpecialtyPairing:
        'Dạo bộ qua phố Mai Thúc Loan thưởng thức các món bánh bèo, nậm, lọc và chè sen Cố Đô.',
      ecoGreenTip:
        'Đây là di tích tưởng niệm tâm linh thiêng liêng, xin quý khách giữ trật tự và thể hiện lòng tôn kính sâu sắc.',
    },
    en: {
      placeName: 'Dan Am Hon Memorial Esplanade (1885 Fall of the Citadel)',
      audioNarrationScript:
        'Situated at the intersection of Mai Thuc Loan and Ong Ich Khiem Streets inside the Citadel, Dan Am Hon (Altar of Departed Souls) was erected in 1895 under Emperor Thanh Thai. The ceremonial altar was built to hold solemn annual state requiem services on the 23rd day of the 5th lunar month, honoring the tens of thousands of Nguyen royal soldiers and civilians who perished during the tragic Fall of the Citadel in the surprise offensive against French colonial forces in 1885.',
      secretHistoricalFact:
        'Ever since this tragic event, the 23rd day of the 5th lunar month has been observed throughout Hue as a city-wide communal memorial day ("Quay cung com chung"), with households setting up incense altars along streets.',
      photoSpotAdvice:
        'Photograph the historic stone stele and memorial pavilion shaded by quiet banyan trees along the inner moat.',
      localSpecialtyPairing:
        'Sample traditional steamed rice cakes and sweet lotus seed soup along nearby Mai Thuc Loan Street.',
      ecoGreenTip:
        'As a sacred memorial site honoring fallen ancestors, please observe quiet respect and do not leave litter.',
    },
  },

  // 26. DI TÍCH TÒA KHÂM SỨ TRUNG KỲ
  {
    idKeys: ['tour-di-tich-dia-diem-toa-kham-su-trung-ky', 'toa-kham-su', 'residence-superieure'],
    nameRegex: /toà khâm sứ|tòa khâm sứ|kham su/i,
    kind: 'HERITAGE',
    vi: {
      placeName: 'Di Tích Tòa Khâm Sứ Trung Kỳ',
      audioNarrationScript:
        'Dạ thưa quý khách, Di tích địa điểm Tòa Khâm sứ Trung Kỳ nằm bên bờ nam sông Hương (nay là khuôn viên Trường Đại học Sư phạm Huế, đường Lê Lợi). Tòa Khâm sứ được thành lập năm 1875 sau các hòa ước bất bình đẳng, là cơ quan đầu não đại diện cho chính quyền thực dân Pháp đặt ách cai trị bảo hộ lên toàn bộ xứ Trung Kỳ và triều đình Huế suốt 70 năm. Nơi đây từng chứng kiến phong trào chống sưu thuế chấn động năm 1908 của nhân dân Thừa Thiên với sự tham gia của người thanh niên yêu nước Nguyễn Sinh Cung (Chủ tịch Hồ Chí Minh), và cuộc khởi nghĩa giành chính quyền ngày 23 tháng 8 năm 1945.',
      secretHistoricalFact:
        'Trước cổng Tòa Khâm sứ năm 1908, người thanh niên Nguyễn Tất Thành khi đó mới 18 tuổi đã đứng làm người phiên dịch chuyển lời yêu sách giảm sưu thuế của đồng bào nông dân đến viên Khâm sứ Pháp Levecque, đánh dấu bước ngoặt dấn thân vào con đường cứu nước của Bác.',
      photoSpotAdvice:
        'Chụp cụm công trình kiến trúc cổ điển ven sông Hương và tấm bia lưu niệm phong trào chống thuế 1908 trên đường Lê Lợi.',
      localSpecialtyPairing:
        'Thưởng thức cà phê ngắm cầu Tràng Tiền và sông Hương tại các quán ven đường Lê Lợi.',
      ecoGreenTip:
        'Khuôn viên di tích nằm trong môi trường giáo dục đại học, xin quý khách giữ gìn vệ sinh và không gây ồn ào.',
    },
    en: {
      placeName: 'Residence Superieure of Annam Historic Site (Toa Kham Su)',
      audioNarrationScript:
        'Located along the southern bank of the Perfume River on Le Loi Street, this site was established in 1875 as the French Résidence Supérieure d’Annam, the administrative nerve center of French colonial rule over Central Vietnam for seven decades. It witnessed significant patriotic milestones, including the mass 1908 anti-tax protests joined by young Nguyen Sinh Cung (President Ho Chi Minh) and the historic August 1945 revolutionary uprising.',
      secretHistoricalFact:
        'In front of the Résidence gate during the 1908 protests, 18-year-old Nguyen Tat Thanh translated the local farmers’ grievances directly to the French Resident Superior Levecque, marking an early step in his lifelong quest for national liberation.',
      photoSpotAdvice:
        'Capture the colonial-era tree-lined avenue along Le Loi Street and the memorial stele overlooking the Perfume River.',
      localSpecialtyPairing:
        'Enjoy a relaxed riverside coffee overlooking Trang Tien Bridge along Le Loi promenade.',
      ecoGreenTip:
        'Please respect the educational surroundings and help maintain the cleanliness of the riverside grounds.',
    },
  },

  // 27. NHÀ LƯU NIỆM BÁC HỒ & CỤ PHAN BỘI CHÂU
  {
    idKeys: ['tour-di-tich-nha-luu-niem-bac-ho', 'tour-nha-luu-niem-bac-ho-o-lang-duong-no', 'tour-nha-luu-niem-cu-phan-boi-chau', 'tour-tuong-dai-phan-boi-chau', 'phan-boi-chau', 'nha-luu-niem-bac-ho'],
    nameRegex: /nhà lưu niệm bác hồ|nhà lưu niệm cụ phan bội châu|phan bội châu/i,
    kind: 'HERITAGE',
    vi: {
      placeName: 'Di Tích Cách Mạng: Nhà Lưu Niệm Bác Hồ & Khu Lưu Niệm Cụ Phan Bội Châu',
      audioNarrationScript:
        'Dạ thưa quý khách, đây là hệ thống các di tích lịch sử cách mạng đặc biệt tại Huế gắn liền với tuổi thơ Chủ tịch Hồ Chí Minh và chí sĩ yêu nước Phan Bội Châu. Ngôi nhà số 158 Mai Thúc Loan và nhà lưu niệm làng Dương Nỗ (xã Phú Dương) là nơi cậu bé Nguyễn Sinh Cung đã sinh sống, học tập suốt hơn 10 năm gian khó (1895–1901 và 1906–1909), nơi mẹ Người là bà Hoàng Thị Loan trút hơi thở cuối cùng. Trên dốc Bến Ngự là khu lưu niệm Cụ Phan Bội Châu – nơi vị lãnh tụ phong trào Đông Du đã sống những năm tháng cuối đời bị thực dân Pháp quản thúc (1925–1940) nhưng vẫn luôn nhen nhóm ngọn lửa độc lập dân tộc.',
      secretHistoricalFact:
        'Tại khu lưu niệm cụ Phan Bội Châu trên dốc Bến Ngự vẫn còn nguyên vẹn phần mộ của cụ Phan cùng hai ngôi mộ của hai chú chó trung thành (con Vá và con Vàng) từng gắn bó sẻ chia buồn vui với cụ trong những năm tháng bị giam lỏng.',
      photoSpotAdvice:
        'Chụp ngôi nhà rường ba gian mộc mạc tại 158 Mai Thúc Loan hoặc tượng đài cụ Phan Bội Châu bằng đồng sừng sững giữa vườn cây dốc Bến Ngự.',
      localSpecialtyPairing:
        'Thưởng thức bún bò Huế tại chợ Bến Ngự ngay gần khu lưu niệm cụ Phan Bội Châu.',
      ecoGreenTip:
        'Xin giữ sự trang nghiêm, kính cẩn khi tham quan không gian lưu niệm của các bậc danh nhân tiền bối.',
    },
    en: {
      placeName: 'Revolutionary Relics: Ho Chi Minh & Phan Boi Chau Memorials',
      audioNarrationScript:
        'These revered sites honor the formative years of President Ho Chi Minh and patriotic leader Phan Boi Chau in Hue. The modest timber houses at 158 Mai Thuc Loan Street and Duong No Village hosted young Nguyen Sinh Cung for over a decade (1895–1901 and 1906–1909) during his youth. At Ben Ngu Hill stands the memorial of Phan Boi Chau, the pioneer of the Dong Du (Go East) modernization movement who spent his final years of French house arrest (1925–1940) continuing to inspire generations of Vietnamese patriots.',
      secretHistoricalFact:
        'In the garden of Phan Boi Chau’s memorial at Ben Ngu Hill, alongside the scholar’s tomb, lie the graves of his two loyal companion dogs who kept him company during his years of colonial confinement.',
      photoSpotAdvice:
        'Photograph the traditional three-compartment wooden house at Mai Thuc Loan or the bronze statue of Phan Boi Chau surrounded by lush greenery.',
      localSpecialtyPairing:
        'Taste authentic Hue beef noodles at nearby Ben Ngu Market.',
      ecoGreenTip:
        'Please observe quiet reverence inside these solemn biographical memorial shrines.',
    },
  },

  // 28. BẢO TÀNG ĐẠI TƯỚNG NGUYỄN CHÍ THANH
  {
    idKeys: ['tour-bao-tang-dai-tuong-nguyen-chi-thanh', 'tour-nha-luu-niem-dai-tuong-nguyen-chi-thanh', 'nguyen-chi-thanh'],
    nameRegex: /nguyễn chí thanh|nguyen chi thanh/i,
    kind: 'HERITAGE',
    vi: {
      placeName: 'Bảo Tàng & Nhà Lưu Niệm Đại Tướng Nguyễn Chí Thanh',
      audioNarrationScript:
        'Dạ thưa quý khách, Bảo tàng Đại tướng Nguyễn Chí Thanh tọa lạc tại số 144 Đặng Thái Thân (phường Thuận Hòa, TP Huế) và khu nhà lưu niệm tại xã Quảng Thọ (huyện Quảng Điền). Bảo tàng trưng bày hàng trăm hiện vật, tài liệu và hình ảnh quý giá về cuộc đời hoạt động cách mạng của Đại tướng Nguyễn Chí Thanh (1914–1967) – người con ưu tú của quê hương Thừa Thiên Huế, vị tướng tài ba xuất chúng của Quân đội Nhân dân Việt Nam, Chủ nhiệm Tổng cục Chính trị và Bí thư Trung ương Cục miền Nam thời kỳ kháng chiến chống Mỹ khốc liệt.',
      secretHistoricalFact:
        'Đại tướng Nguyễn Chí Thanh là người đề ra phương châm tác chiến nổi tiếng "Nắm thắt lưng địch mà đánh" tại chiến trường miền Nam, góp phần đánh bại chiến lược "Chiến tranh cục bộ" của quân đội Mỹ.',
      photoSpotAdvice:
        'Chụp ảnh không gian trưng bày trang trọng với chiếc bàn làm việc đơn sơ và các bức ảnh tư liệu lịch sử quý giá bên trong bảo tàng.',
      localSpecialtyPairing:
        'Thưởng thức cà phê muối và bánh lọc Huế tại các quán nhỏ quanh đường Đặng Thái Thân.',
      ecoGreenTip:
        'Bảo tàng miễn phí vé tham quan, xin quý khách đi nhẹ nói khẽ và không chạm tay vào các hiện vật trưng bày.',
    },
    en: {
      placeName: 'General Nguyen Chi Thanh Museum & Memorial',
      audioNarrationScript:
        'Located at 144 Dang Thai Than Street in Hue and his birthplace in Quang Tho, this museum honors General Nguyen Chi Thanh (1914–1967), one of Vietnam’s most brilliant military leaders and a native of Thua Thien Hue. As head of the General Political Department and leader of the Central Office for South Vietnam, he directed revolutionary forces during the height of the anti-American resistance war.',
      secretHistoricalFact:
        'General Nguyen Chi Thanh coined the famous tactical doctrine "Grip the enemy by the belt to strike" ("Nam that lung dich ma danh") to counter superior American firepower in close-quarters engagements.',
      photoSpotAdvice:
        'Frame the museum’s central memorial hall displaying historic battle maps and personal military keepsakes.',
      localSpecialtyPairing:
        'Enjoy a cup of Hue salted coffee along peaceful Dang Thai Than Street.',
      ecoGreenTip:
        'Please maintain quiet respect and avoid touching open historical exhibits inside the galleries.',
    },
  },

  // =========================================================================
  // III. CÁC ĐIỂM DU LỊCH THIÊN NHIÊN GẮN LIỀN VỚI LỊCH SỬ - CHIẾN TRANH
  // =========================================================================

  // 29. CẦU TRÀNG TIỀN (CHỨNG NHÂN CHIẾN TRANH 1946 & 1968)
  {
    idKeys: ['6', 'cau-trang-tien', 'heritage-cau-trang-tien', '5a6b7c8d-9e0f-1a2b-3c4d-5e6f7a8b9c0d'],
    nameRegex: /tràng tiền|trường tiền|trang tien|truong tien/i,
    kind: 'HERITAGE',
    vi: {
      placeName: 'Cầu Tràng Tiền (Biểu Tượng Cố Đô – Chứng Nhân Chiến Tranh)',
      audioNarrationScript:
        'Dạ thưa quý khách, Cầu Tràng Tiền (hay Trường Tiền) dài hơn 400 mét với 6 vài 12 nhịp thép hình vành lược duyên dáng bắc qua sông Hương, hoàn thành năm 1899 dưới triều vua Thành Thái theo thiết kế của hãng Eiffel (Pháp). Không chỉ là biểu tượng thi ca lãng mạn, cây cầu còn là chứng nhân kiên cường qua hai cuộc chiến tranh ác liệt: cầu từng bị giật sập năm 1946 trong ngày đầu Toàn quốc kháng chiến chống Pháp, và bị đánh sập nhịp 3, 4 trong Chiến dịch Tết Mậu Thân 1968. Trải qua bao lần bom đạn tàn phá và được phục dựng, Cầu Tràng Tiền vẫn sừng sững soi bóng nước Hương Giang như biểu tượng cho sức sống mãnh liệt của Cố Đô.',
      secretHistoricalFact:
        'Trong chiến sự mùa xuân năm 1968, nhịp cầu số 3 và số 4 bị sập hoàn toàn xuống đáy sông Hương; người dân và bộ đội đã bắc cầu phao dã chiến ngay bên cạnh để duy trì huyết mạch giao thông nối hai bờ bắc nam thành phố.',
      photoSpotAdvice:
        'Thời điểm đẹp nhất là lúc 17h30 hoàng hôn khi ánh nắng tím nhuộm các nhịp cầu thép, hoặc buổi tối khi hệ thống đèn LED nghệ thuật rực sáng phản chiếu xuống sông Hương.',
      localSpecialtyPairing:
        'Dạo bộ dưới chân cầu bờ Nam thưởng thức bánh mì Tràng Tiền nóng giòn và chè Hẻm Hùng Vương.',
      ecoGreenTip:
        'Hãy tản bộ dọc tuyến phố đi bộ Nguyễn Đình Chiểu và Cầu Gỗ Lim ven sông Hương để tận hưởng gió mát trong lành không khói bụi.',
    },
    en: {
      placeName: 'Trang Tien Bridge (Iconic Landmark & Wartime Witness)',
      audioNarrationScript:
        'Spanning over 400 meters with six comb-shaped steel spans across the Perfume River, Trang Tien Bridge was designed by Eiffel & Cie and completed in 1899 under Emperor Thanh Thai. Beyond its poetic romance, the bridge stands as a resilient witness to modern warfare: blown up in 1946 during the opening clashes of the anti-French resistance, and severed again when spans 3 and 4 collapsed during the 1968 Tet Offensive. Rebuilt after each destruction, it endures as an eternal symbol of Hue’s unbroken spirit.',
      secretHistoricalFact:
        'During the 1968 Battle of Hue, after the central spans were severed, pontoon bridges were rapidly deployed alongside the wreckage to maintain essential transport between the Citadel and the southern city.',
      photoSpotAdvice:
        'Capture the bridge at twilight when golden and violet sunset hues frame the steel arches, or after dark when artistic LED illumination reflects across the water.',
      localSpecialtyPairing:
        'Taste hot crusty baguettes or sweet bean soups along the southern riverbank promenades.',
      ecoGreenTip:
        'Explore the bridge and riverfront on foot or via green rental bikes along the pedestrian wooden boardwalks.',
    },
  },

  // 30. ĐỒI VỌNG CẢNH (KHÚC UỐN SÔNG HƯƠNG & CĂN CỨ CAO ĐIỂM QUÂN SỰ)
  {
    idKeys: ['8', 'doi-vong-canh', 'nature-doi-vong-canh', 'doi-vong-canh-04'],
    nameRegex: /vọng cảnh|vong canh/i,
    kind: 'WAR_NATURE',
    vi: {
      placeName: 'Đồi Vọng Cảnh (Danh Thắng Khúc Uốn Sông Hương & Cứ Điểm Quân Sự)',
      audioNarrationScript:
        'Dạ thưa quý khách, Đồi Vọng Cảnh cao 43 mét nằm bên bờ sông Hương thuộc phường Thủy Biều. Nơi đây vừa là danh thắng ngắm khúc uốn sông Hương chữ U mềm mại đẹp nhất xứ Huế, vừa là cao điểm quân sự chiến lược xung yếu trong hai cuộc chiến tranh chống Pháp và chống Mỹ. Nằm ở vị trí khống chế ngã ba sông và toàn bộ cửa ngõ phía tây nam Huế, đỉnh đồi vẫn còn lưu giữ hệ thống lô cốt, boong-ke bằng bê tông cốt thép dày đặc – nơi từng là cứ điểm quan sát hỏa lực trọng yếu của đối phương trước khi được quân dân Thừa Thiên Huế anh dũng đánh chiếm.',
      secretHistoricalFact:
        'Dưới chân đồi thông Vọng Cảnh là những căn hầm bí mật mà quân du kích Thủy Biều từng kiên cường bám trụ giữa lòng địch để theo dõi tàu thuyền vận chuyển quân sự trên sông Hương.',
      photoSpotAdvice:
        'Khoảng 16h30 – 17h45 là khoảnh khắc hoàng hôn rực rỡ nhất khi mặt trời lặn xuống khúc quanh sông Hương nhìn từ đỉnh đồi thông bên cạnh các lô cốt cổ.',
      localSpecialtyPairing:
        'Từ Đồi Vọng Cảnh đi xuống làng Thủy Biều thưởng thức trái thanh trà tiến vua ngọt thanh và gỏi gà thanh trà.',
      ecoGreenTip:
        'Đồi Vọng Cảnh hiện là công viên sinh thái mở, xin quý khách chỉ đi bộ hoặc đạp xe và tuyệt đối không đốt lửa trong rừng thông.',
    },
    en: {
      placeName: 'Vong Canh Hill (Scenic River Bend & Strategic War Stronghold)',
      audioNarrationScript:
        'Rising 43 meters on the bank of the Perfume River, Vong Canh Hill offers the most breathtaking panoramic view of the river’s sweeping U-shaped bend. Beyond its natural splendor, the hill served as a pivotal military high ground during both the French and American wars. Due to its commanding view over river traffic and the southwestern gateway to Hue, reinforced concrete bunkers still stand on the summit as tangible reminders of past conflicts.',
      secretHistoricalFact:
        'Beneath the pine slopes of Vong Canh Hill, local partisans maintained concealed subterranean shelters throughout the war to monitor military convoys traversing the Perfume River.',
      photoSpotAdvice:
        'Arrive between 4:30 PM and 5:45 PM to photograph one of Vietnam’s most celebrated sunsets as the sun sinks into the river bend beside the historic concrete bunkers.',
      localSpecialtyPairing:
        'Descend into Thuy Bieu Village to sample fresh royal pomelo (Thanh Tra) and local countryside dishes.',
      ecoGreenTip:
        'Motor vehicles and open campfires are prohibited on the pine trails to safeguard the natural ecosystem.',
    },
  },

  // 31. ĐÈO HẢI VÂN, CỬA BẮC HẦM HẢI VÂN & HẢI VÂN QUAN
  {
    idKeys: ['tour-cua-bac-ham-hai-van', 'tour-diem-chan-tau-hai-van', 'tour-deo-hai-van-tower', 'hai-van-quan', 'deo-hai-van', 'tour-cau-lang-co'],
    nameRegex: /hải vân|đèo hải vân|hải vân quan|đồn nhất|hai van/i,
    kind: 'WAR_NATURE',
    vi: {
      placeName: 'Đèo Hải Vân & Hải Vân Quan (Thiên Hạ Đệ Nhất Hùng Quan – Cứ Điểm Đồn Nhất)',
      audioNarrationScript:
        'Dạ thưa quý khách, Đèo Hải Vân dài 21 km uốn lượn hùng vĩ trên dãy Bạch Mã đâm ngang ra biển Đông, nối liền Thừa Thiên Huế và Đà Nẵng. Được vua Lê Thánh Tông ban tặng danh hiệu "Thiên hạ đệ nhất hùng quan" năm 1470, đèo Hải Vân sở hữu di tích Hải Vân Quan xây dựng năm 1826 thời vua Minh Mạng và pháo đài Đồn Nhất – cứ điểm quân sự chiến lược khốc liệt bậc nhất miền Trung. Qua các cuộc kháng chiến chống Pháp và chống Mỹ, đèo Hải Vân là yết hầu giao thông hiểm trở, nơi diễn ra những trận phục kích lẫy lừng của quân dân Thừa Thiên bẻ gãy các đoàn xe quân sự của địch.',
      secretHistoricalFact:
        'Trên đỉnh đèo Hải Vân vẫn còn nguyên vẹn pháo đài Đồn Nhất với những bức tường bê tông lỗ chỗ vết đạn súng máy, ghi dấu trận tập kích tiêu diệt cứ điểm Đồn Nhất vang dội của Đại đội 1 Quân Giải phóng vào tháng 9 năm 1952.',
      photoSpotAdvice:
        'Đứng tại cổng Hải Vân Quan hoặc các khúc cua tay áo nhìn xuống vịnh Lăng Cô xanh ngắt và dải mây trắng vờn quanh đỉnh núi.',
      localSpecialtyPairing:
        'Dưới chân đèo phía Lăng Cô, thưởng thức hàu sữa nướng mỡ hành Đầm Lập An và hải sản tươi sống.',
      ecoGreenTip:
        'Cung đường đèo có độ dốc cao và nhiều khúc cua gấp; hãy lái xe cẩn thận, bật đèn xe khi có sương mù và giữ sạch cảnh quan tự nhiên.',
    },
    en: {
      placeName: 'Hai Van Pass & Hai Van Gate (The Gateway of Clouds & Wartime Bastion)',
      audioNarrationScript:
        'Winding 21 kilometers across the rugged spur where the Annamite Range plunges into the East Sea, Hai Van Pass marks the boundary between Hue and Da Nang. Honored in 1470 by Emperor Le Thanh Tong as the "Most Majestic Gate under Heaven", the mountain pass is crowned by the 1826 Hai Van Gate and Don Nhat Fort—a critical strategic bastion during both the French Indochina War and the Vietnam War that commanded the sole overland corridor between north and south.',
      secretHistoricalFact:
        'Bullet-scarred concrete pillboxes at Don Nhat Fort atop the pass still stand as physical proof of the daring September 1952 assault by local revolutionary forces against the colonial garrison.',
      photoSpotAdvice:
        'Shoot from the ancient brick archway of Hai Van Gate looking down toward the azure curve of Lang Co Bay shrouded in coastal clouds.',
      localSpecialtyPairing:
        'At the foot of the pass in Lang Co, enjoy grilled Lap An Lagoon oysters and fresh local seafood.',
      ecoGreenTip:
        'Drive cautiously around hairpin turns, keep headlights on during dense mountain fog, and leave no trash along the pass.',
    },
  },

  // 32. VƯỜN QUỐC GIA BẠCH MÃ & HẢI VỌNG ĐÀI
  {
    idKeys: ['bach-ma', 'vuon-quoc-gia-bach-ma', 'hai-vong-dai-bach-ma'],
    nameRegex: /bạch mã|hải vọng đài|bach ma/i,
    kind: 'WAR_NATURE',
    vi: {
      placeName: 'Vườn Quốc Gia Bạch Mã (Hải Vọng Đài & Địa Đạo Chiến Đấu Trên Mây)',
      audioNarrationScript:
        'Dạ thưa quý khách, Vườn Quốc gia Bạch Mã nằm ở độ cao 1.450 mét so với mực nước biển, là dải rừng nguyên sinh hùng vĩ giao thoa khí hậu Bắc – Nam của đất nước. Không chỉ nổi tiếng với thảm thực vật phong phú, thác Đỗ Quyên cao 300 mét và Hải Vọng Đài bao quát biển Lăng Cô, đỉnh Bạch Mã từng là căn cứ quân sự và đài quan sát trinh sát cao điểm vô cùng hiểm trở trong chiến tranh Việt Nam. Quân đội đối phương đã xây dựng tại đây sân bay trực thăng dã chiến và hệ thống hầm chỉ huy, địa đạo chiến đấu kiên cố khoét sâu vào lòng núi đá nhằm kiểm soát toàn bộ vùng chiến trường Thừa Thiên – Quảng Nam.',
      secretHistoricalFact:
        'Hệ thống địa đạo Bạch Mã dài hàng trăm mét xuyên qua lòng đá hoa cương trên đỉnh núi hiện vẫn còn nguyên vẹn, minh chứng cho sự giằng co quyết liệt giữa các lực lượng quân sự để giành quyền kiểm soát đỉnh cao điểm mây mù này.',
      photoSpotAdvice:
        'Chụp từ đài vọng cảnh Hải Vọng Đài vào buổi sáng sớm khi biển mây bồng bềnh phủ kín các thung lũng bên dưới.',
      localSpecialtyPairing:
        'Thưởng thức các món đặc sản vùng đệm Phú Lộc như cá suối, rau rừng và bánh ướt thịt luộc.',
      ecoGreenTip:
        'Bạch Mã là khu bảo tồn thiên nhiên nghiêm ngặt, xin quý khách tuân thủ nguyên tắc không để lại gì ngoài những dấu chân và không lấy gì ngoài những bức ảnh.',
    },
    en: {
      placeName: 'Bach Ma National Park & Hai Vong Dai (Wartime Summit Bastion)',
      audioNarrationScript:
        'Rising 1,450 meters above sea level where northern and southern ecosystems meet, Bach Ma National Park protects pristine tropical rainforests, the 300-meter Do Quyen waterfall, and Hai Vong Dai summit tower. Beyond its ecological marvels, Bach Ma’s cloud-shrouded peak was engineered into a formidable military reconnaissance outpost during the Vietnam War, complete with a tactical helipad and deep combat tunnels blasted into the granite.',
      secretHistoricalFact:
        'Hundreds of meters of combat tunnels chiseled through the mountain bedrock near the summit remain intact today, testifying to the intense wartime struggle for control of this high-altitude vantage point.',
      photoSpotAdvice:
        'Stand at Hai Vong Dai observation pavilion at sunrise to capture a sweeping sea of clouds drifting over Lang Co Bay below.',
      localSpecialtyPairing:
        'Sample local freshwater fish and wild forest greens in the foothills of Phu Loc district.',
      ecoGreenTip:
        'Follow strict Leave No Trace principles—take only photos and leave only footprints in this fragile biosphere.',
    },
  },

  // 33. SÔNG HƯƠNG
  {
    idKeys: ['heritage-song-huong', 'song-huong', 'cau-go-lim-song-huong'],
    nameRegex: /sông hương|hương giang|perfume river/i,
    kind: 'WAR_NATURE',
    vi: {
      placeName: 'Sông Hương (Dòng Hương Giang Lịch Sử & Tuyến Phòng Thủ Chiến Lược)',
      audioNarrationScript:
        'Dạ thưa quý khách, Sông Hương (Hương Giang) dài khoảng 80 km chảy qua lòng thành phố Huế, không chỉ là linh hồn thi ca lãng mạn mà còn là tuyến phòng thủ quân sự chiến lược và nhân chứng lịch sử kiên cường của Cố Đô. Thời Nguyễn, sông Hương là đường thủy điều động chiến thuyền của triều đình từ kinh đô ra cửa biển Thuận An. Trong kháng chiến chống Pháp và đặc biệt là Chiến dịch Tết Mậu Thân 1968, sông Hương là tuyến vận tải huyết mạch tiếp tế đạn dược của quân giải phóng từ mạn ngược về đồng bằng, nơi diễn ra những trận đánh ác liệt của các đội biệt động thủy và nữ du kích sông Hương kiên cường bám trụ.',
      secretHistoricalFact:
        'Đội nữ du kích sông Hương gồm 11 cô gái tuổi mười tám đôi mươi đã mưu trí, dũng cảm đánh lui nhiều đợt phản kích của một tiểu đoàn lính thủy đánh bộ Mỹ vào đầu năm 1968, được Bác Hồ gửi thư khen tặng: "Dõng dạc tay cầm khẩu súng trường / Khôn ngoan cá nhảy lưới bủa giăng".',
      photoSpotAdvice:
        'Dạo bộ trên Cầu Gỗ Lim sát mặt nước vào lúc 17h15 chiều để chụp cảnh hoàng hôn tím buông xuống dòng sông Hương và cầu Tràng Tiền.',
      localSpecialtyPairing:
        'Buổi tối lên thuyền rồng nghe Nhã nhạc – Ca Huế trên sông Hương và thưởng thức chè hạt sen, bánh in.',
      ecoGreenTip:
        'Sông Hương nổi tiếng bởi làn nước xanh trong bậc nhất; hãy luôn bỏ rác đúng nơi quy định để bảo vệ dòng sông di sản.',
    },
    en: {
      placeName: 'The Perfume River (Strategic Waterway & Wartime Lifeline)',
      audioNarrationScript:
        'Stretching 80 kilometers past imperial citadels and pagodas, the Perfume River (Song Huong) is both the lyrical soul and a historic strategic defense line of Hue. Under the Nguyen Dynasty, it served as the royal naval route to the sea. During 20th-century conflicts—most notably the 1968 Tet Offensive—it became a contested logistical artery where aquatic sappers and local partisans fought to secure supply crossings.',
      secretHistoricalFact:
        'In 1968, an 11-member all-female partisan river team ("Doi Nu Du Kich Song Huong") courageously repelled multiple counterattacks by heavily equipped marine forces, earning a poetic tribute from President Ho Chi Minh.',
      photoSpotAdvice:
        'Stroll along the riverside ironwood boardwalk at 5:15 PM to capture violet sunsets reflecting toward Trang Tien Bridge.',
      localSpecialtyPairing:
        'Board an evening dragon boat to listen to UNESCO-recognized royal court music on the river.',
      ecoGreenTip:
        'Help keep the Perfume River pristine by never littering from riverside walks or tour boats.',
    },
  },

  // 34. NÚI NGỰ BÌNH
  {
    idKeys: ['nature-nui-ngu-binh', 'nui-ngu-binh', 'ngu-binh'],
    nameRegex: /ngự bình|bình sơn|ngu binh/i,
    kind: 'WAR_NATURE',
    vi: {
      placeName: 'Núi Ngự Bình (Bình Sơn – Tiền Án Quân Sự & Phong Thủy Kinh Thành)',
      audioNarrationScript:
        'Dạ thưa quý khách, cùng với sông Hương, Núi Ngự Bình tạo nên cặp biểu tượng "Sông Hương – Núi Ngự" của đất Cố Đô. Ngọn núi cao 105 mét nằm cách Kinh thành Huế khoảng 4 km về phía Nam, dáng núi cân đối như một bức bình phong phẳng phiu. Khi chọn Phú Xuân làm kinh đô, vua Gia Long đã lấy núi làm "Tiền Án" che chắn chính diện cho Hoàng Thành. Trong lịch sử quân sự, ngọn núi là cao điểm quan sát phòng thủ bảo vệ cửa ngõ phía nam thành phố và là nơi quân Tây Sơn của người anh hùng áo vải Quang Trung – Nguyễn Huệ từng hội quân trước khi xuất kích thần tốc năm 1789.',
      secretHistoricalFact:
        'Vào các năm 1836 và 1842, vua Minh Mạng và vua Thiệu Trị từng truyền lệnh cho các quan văn võ tự tay trồng hàng ngàn cây thông trên núi Ngự Bình và treo thẻ đồng ghi tên người trồng để bảo vệ lá phổi xanh kinh thành.',
      photoSpotAdvice:
        'Leo lên đỉnh núi Ngự Bình vào buổi sáng sớm khi sương mù còn vờn quanh rừng thông để ngắm toàn cảnh thành phố Huế từ trên cao.',
      localSpecialtyPairing:
        'Trên đường leo núi Ngự Bình về, ghé khu vực Đàn Nam Giao và đường Điện Biên Phủ thưởng thức bánh ướt thịt nướng và bún bò Huế.',
      ecoGreenTip:
        'Rừng thông Ngự Bình là lá phổi xanh phía Nam thành phố, xin quý khách tuyệt đối phòng chống cháy rừng và giữ gìn vệ sinh.',
    },
    en: {
      placeName: 'Ngu Binh Mountain (The Royal Defensive Screen Mountain)',
      audioNarrationScript:
        'Paired with the Perfume River in every poem about Hue, Ngu Binh Mountain rises 105 meters four kilometers south of the Citadel. Emperor Gia Long selected the flat-topped trapezoidal mountain as the sacred "Tien An" (Protective Front Screen) in the geomantic and defensive plan of the Capital. Historically, it served as an observation outpost guarding the southern gateway to the city and a staging area for Emperor Quang Trung’s forces in 1789.',
      secretHistoricalFact:
        'In 1836, Emperor Minh Mang commanded high-ranking court mandarins to personally plant pines across Ngu Binh Mountain and attach engraved brass nameplates to guarantee stewardship.',
      photoSpotAdvice:
        'Hike to the pine-shaded summit at dawn for a sweeping view of Hue City through morning mist.',
      localSpecialtyPairing:
        'On your way back down Dien Bien Phu Street, stop near Nam Giao Esplanade for Hue beef noodle soup.',
      ecoGreenTip:
        'Please protect the historic pine forest by strictly avoiding open flames and carrying out all trash.',
    },
  },

  // 35. CỬA BIỂN THUẬN AN & TRẤN HẢI THÀNH
  {
    idKeys: ['bien-thuan-an-hue', 'bien-thuan-an', 'tran-hai-thanh-thuan-an', 'tour-bai-da-thuan-an', 'tour-hai-dang-thuan-an'],
    nameRegex: /thuận an|trấn hải thành|hải đăng thuận an|thuan an/i,
    kind: 'WAR_NATURE',
    vi: {
      placeName: 'Cửa Biển Thuận An & Pháo Đài Trấn Hải Thành (Chứng Tích Trận Chiến 1883)',
      audioNarrationScript:
        'Dạ thưa quý khách, Cửa biển Thuận An cách trung tâm thành phố Huế 12 km về phía Đông là nơi dòng sông Hương hòa mình vào biển Đông. Tại đây có Trấn Hải Thành (thành Thái Dương) – pháo đài quân sự hình tròn kiên cố chu vi gần 300 mét do vua Gia Long cho xây dựng năm 1813 nhằm kiểm soát tàu thuyền và bảo vệ cửa ngõ biển của kinh đô. Tháng 8 năm 1883, pháo đài Thuận An là chiến trường đẫm máu trong trận chiến Thuận An, nơi các tướng lĩnh Lê Chuẩn, Trần Thúc Nhẫn cùng hàng trăm binh sĩ triều Nguyễn đã chiến đấu ngoan cường đến hơi thở cuối cùng trước hỏa lực hạm đội Pháp để bảo vệ chủ quyền non sông.',
      secretHistoricalFact:
        'Dưới chân thành Trấn Hải vẫn còn ghi dấu miếu thờ các tướng sĩ trận vong năm Quý Mùi 1883, nhắc nhở hậu thế về lòng quả cảm xả thân vì nước của cha ông trong cuộc chiến bảo vệ cửa ngõ biển Cố Đô.',
      photoSpotAdvice:
        'Chụp ảnh bờ kè chắn sóng bãi đá Thuận An và ngọn hải đăng cổ kính vươn ra biển Đông lúc bình minh rạng rỡ.',
      localSpecialtyPairing:
        'Thưởng thức bánh ép Thuận An giòn dẻo, cá nướng muối ớt và hải sản đầm phá tươi sống ngay bãi biển.',
      ecoGreenTip:
        'Chung tay giữ gìn vệ sinh môi trường bờ biển Thuận An, không vứt túi nilon hay rác thải nhựa xuống biển.',
    },
    en: {
      placeName: 'Thuan An Estuary & Tran Hai Fort (Battle of Thuan An 1883)',
      audioNarrationScript:
        'Located 12 kilometers east of Hue where the Perfume River meets the East Sea, Thuan An is guarded by Tran Hai Thanh—a circular coastal fortress constructed in 1813 under Emperor Gia Long to protect the maritime gateway of the capital. In August 1883, the fortress stood at the center of the fierce Battle of Thuan An, where Nguyen Dynasty commanders and hundreds of soldiers fought heroically against French naval artillery to defend the estuary.',
      secretHistoricalFact:
        'Near the fort walls stands a memorial shrine dedicated to the fallen defenders of 1883, honoring the sacrifice of royal troops in the struggle against colonial expansion.',
      photoSpotAdvice:
        'Photograph the historic Thuan An lighthouse and the rocky sea barriers stretching into the ocean at sunrise.',
      localSpecialtyPairing:
        'Try local Thuan An pressed tapioca pancakes (Banh Ep) and freshly grilled coastal seafood.',
      ecoGreenTip:
        'Help protect the marine environment by disposing of all trash responsibly along Thuan An beach.',
    },
  },
];

// Bản đồ tra cứu tương thích ngược
export const HUE_HERITAGE_STORIES: Record<string, HeritageNarrationContent> = {};
for (const item of BILINGUAL_HERITAGE_AND_NATURE_STORIES) {
  for (const key of item.idKeys) {
    HUE_HERITAGE_STORIES[key] = item.vi;
  }
}

/**
 * Kiểm tra xem địa điểm có thuộc diện di tích lịch sử hoặc du lịch thiên nhiên gắn liền chiến tranh hay không.
 * CHỈ trả về true nếu địa điểm khớp với bài thuyết minh được xác thực trong danh sách.
 */
export function isNarratablePlace(
  placeId?: string,
  placeName?: string,
  category?: string,
): boolean {
  const cat = (category || '').toUpperCase().trim();
  if (
    ['CAFE', 'CUISINE', 'UTILITY', 'FNB', 'STAY', 'SERVICE', 'SPECIALTY', 'RENTAL', 'GAS'].includes(cat)
  ) {
    return false;
  }

  const rawId = (placeId || '').trim().toLowerCase();
  const rawName = (placeName || '').trim();
  const searchTarget = `${rawId} ${rawName} ${category || ''}`.toLowerCase();

  // Loại trừ các cơ sở kinh doanh, ẩm thực, giải trí
  if (
    /cà phê|cafe|coffee|bún bò|cơm hến|bánh bèo|bánh ép|bánh khoái|chè hẻm|chè bột lọc|khách sạn|hotel|homestay|resort|nhà nghỉ|cây xăng|petrolimex|atm|ngân hàng|siêu thị|quán nhậu|spa|massage|karaoke|bar|pub|phòng khám|thuốc|xe dịch vụ|tour trọn gói|đại lý/i.test(
      searchTarget,
    )
  ) {
    return false;
  }

  // Loại trừ các điểm thiên nhiên thuần túy KHÔNG liên quan đến chiến tranh
  if (
    /rú chá|ru cha|đầm chuồn|dam chuon|phá tam giang|pha tam giang|thác bồ ghè|suối mơ|thác đổ|vườn lan|vườn sinh thái|vườn hoa|trại thiếu nhi/i.test(
      searchTarget,
    )
  ) {
    return false;
  }

  // Kiểm tra khớp với bất kỳ bài thuyết minh di tích hoặc thiên nhiên chiến tranh nào
  for (const entry of BILINGUAL_HERITAGE_AND_NATURE_STORIES) {
    if (entry.idKeys.some((k) => k.toLowerCase() === rawId)) {
      return true;
    }
    if (entry.nameRegex.test(searchTarget)) {
      return true;
    }
  }

  return false;
}

/**
 * Tìm bài thuyết minh chuẩn xác theo đúng địa danh và ngôn ngữ.
 * NẾU KHÔNG THUỘC DIỆN HOẶC KHÔNG TÌM THẤY -> TRẢ VỀ NULL (TUYỆT ĐỐI KHÔNG BỊA RA MẪU VĂN CHUNG).
 */
export function resolveBilingualPlaceNarration(params: {
  placeId?: string;
  placeName?: string;
  category?: string;
  address?: string;
  language?: string;
}): (HeritageNarrationContent & { kind: 'HERITAGE' | 'WAR_NATURE'; language: 'vi' | 'en' }) | null {
  const lang: 'vi' | 'en' =
    (params.language || 'vi').toLowerCase().startsWith('en') ? 'en' : 'vi';
  const rawId = (params.placeId || '').trim().toLowerCase();
  const rawName = (params.placeName || '').trim();
  const searchTarget = `${rawId} ${rawName}`.toLowerCase();

  // Kiểm tra loại trừ trước
  if (!isNarratablePlace(params.placeId, params.placeName, params.category)) {
    return null;
  }

  // 1. Tìm khớp chính xác theo ID/slug
  for (const entry of BILINGUAL_HERITAGE_AND_NATURE_STORIES) {
    if (entry.idKeys.some((k) => k.toLowerCase() === rawId)) {
      return { ...entry[lang], kind: entry.kind, language: lang };
    }
  }

  // 2. Tìm khớp theo tên địa danh (nameRegex)
  for (const entry of BILINGUAL_HERITAGE_AND_NATURE_STORIES) {
    if (entry.nameRegex.test(searchTarget)) {
      return { ...entry[lang], kind: entry.kind, language: lang };
    }
  }

  return null;
}
