import { MigrationInterface, QueryRunner } from "typeorm";

export class PlaceNarrations1791280000000 implements MigrationInterface {
    name = 'PlaceNarrations1791280000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Tạo bảng place_narrations
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "place_narrations" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "placeId" character varying NOT NULL,
                "lang" character varying(10) NOT NULL DEFAULT 'vi',
                "shortText" text NOT NULL,
                "longText" text NOT NULL,
                "sources" text NOT NULL,
                "reviewStatus" character varying(20) NOT NULL DEFAULT 'draft',
                "reviewedBy" character varying,
                "reviewedAt" TIMESTAMP WITH TIME ZONE,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_place_narrations_id" PRIMARY KEY ("id"),
                CONSTRAINT "UQ_place_narrations_place_lang" UNIQUE ("placeId", "lang"),
                CONSTRAINT "FK_place_narrations_placeId" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE CASCADE,
                CONSTRAINT "CHK_place_narrations_reviewStatus" CHECK ("reviewStatus" IN ('draft', 'verified'))
            )
        `);

        // 2. Chèn 14 bản ghi thuyết minh chuẩn mực (tất cả reviewStatus = 'draft', tuyệt đối KHÔNG tự verified)
        const narrations = [
            {
                placeId: '8f8b0596-f5ee-449e-8c31-9cb6be62b662',
                lang: 'vi',
                shortText: 'Đại Nội Huế là trung tâm quyền lực chính trị tối cao của triều Nguyễn, triều đại phong kiến cuối cùng của Việt Nam. Được khởi công xây dựng vào năm 1804 dưới triều vua Gia Long và hoàn chỉnh vào năm 1833 dưới thời vua Minh Mạng, khu di tích gồm hai phần chính: Hoàng Thành - nơi thiết triều, làm việc và Tử Cấm Thành - chốn sinh hoạt của hoàng gia. Với lối kiến trúc trùng thiềm điệp ốc uy nghi, Đại Nội là biểu tượng tinh hoa kiến trúc cung đình phương Đông.',
                longText: 'Quần thể Đại Nội Huế nằm bên bờ bắc sông Hương, quay mặt về hướng Nam theo phong thủy dịch học "thánh nhân nam diện nhi thính thiên hạ". Toàn bộ kinh thành có chu vi gần 10km, bên trong là Hoàng Thành có chu vi 2.453m với 4 cửa ra vào, trong đó Ngọ Môn là cửa chính dành cho hoàng đế. Bên trong Hoàng Thành là Tử Cấm Thành gồm điện Cần Chánh, điện Càn Thành, cung Khôn Thái - nơi ăn ở, sinh hoạt nội bộ của hoàng gia triều Nguyễn. Năm 1993, Quần thể Di tích Cố đô Huế chính thức được UNESCO vinh danh là Di sản Văn hóa Thế giới đầu tiên của Việt Nam.',
                sources: 'Đại Nam Thực Lục Chính Biên; Trung tâm Bảo tồn Di tích Cố đô Huế; UNESCO World Heritage Records (1993).'
            },
            {
                placeId: 'heritage-dien-thai-hoa',
                lang: 'vi',
                shortText: 'Điện Thái Hòa là ngôi điện quan trọng bậc nhất trong Hoàng thành Huế, nơi diễn ra các đại lễ đăng quang của 13 vị vua triều Nguyễn, lễ vạn thọ và các buổi đại triều định kỳ. Điện được xây dựng năm 1805 dưới thời vua Gia Long và dời về vị trí hiện tại vào năm 1833 dưới thời vua Minh Mạng. Công trình tiêu biểu cho kiến trúc trùng thiềm điệp ốc với 80 cột gỗ lim sơn son thếp vàng chạm rồng mây tinh xảo.',
                longText: 'Điện Thái Hòa cùng sân Đại Triều Nghi là trung tâm quyền lực biểu trưng của chế độ quân chủ nhà Nguyễn. Tòa điện được xây dựng theo thức nhà kép trùng thiềm điệp ốc, mái lợp ngói hoàng lưu ly rực rỡ. Bên trong điện đặt chiếc ngai vàng tôn nghiêm được đúc thếp vàng lộng lẫy dưới thời vua Gia Long, bên trên có bửu tán chạm trổ rồng mây tinh xảo. Đây là công trình hội tụ đỉnh cao của nghệ thuật điêu khắc gỗ, trang trí nội thất cung đình và kiến trúc truyền thống Việt Nam.',
                sources: 'Khâm Định Đại Nam Hội Điển Sự Lệ; Kiến trúc Cố đô Huế (Phan Thuận An).'
            },
            {
                placeId: 'heritage-ngo-mon',
                lang: 'vi',
                shortText: 'Ngọ Môn là cổng chính phía Nam của Hoàng thành Huế, được xây dựng năm 1833 dưới triều vua Minh Mạng tại vị trí đài Nam Khuyết xưa. Phía trên cổng là lầu Ngũ Phụng tráng lệ lợp ngói hoàng lưu ly và thanh lưu ly. Cổng giữa dành riêng cho hoàng đế ngự qua. Nơi đây từng chứng kiến sự kiện lịch sử trọng đại ngày 30 tháng 8 năm 1945, khi vua Bảo Đại thoái vị trao lại ấn kiếm, chấm dứt chế độ phong kiến Việt Nam.',
                longText: 'Cổng Ngọ Môn gồm hai phần: phần nền đài đồ sộ bên dưới xây bằng đá thanh và gạch vồ, trổ 5 lối đi hình vòm cuốn; phần trên là lầu Ngũ Phụng thanh thoát với kết cấu gỗ lim, gồm hai tầng và 9 bộ mái vút cong như đàn phụng đang múa. Lối đi chính giữa (Ngọ Môn) chỉ dành riêng cho Hoàng đế, hai lối tả hữu dành cho quan văn quan võ và binh lính. Nơi đây từng diễn ra lễ Ban sóc (phát lịch mới), lễ Truyền lô (xướng danh tiến sĩ) và sự kiện vua Bảo Đại đọc Tuyên ngôn Thoái vị ngày 30/8/1945.',
                sources: 'Đại Nam Thực Lục; Bảo tàng Lịch sử Quốc gia; Trung tâm BTDT Cố đô Huế.'
            },
            {
                placeId: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
                lang: 'vi',
                shortText: 'Chùa Thiên Mụ tọa lạc trên đồi Hà Khê bên bờ bắc sông Hương thơ mộng, cách trung tâm Huế khoảng 5km. Chùa được chúa Tiên Nguyễn Hoàng khởi lập vào năm 1601 sau lời truyền tụng về người đàn bà áo đỏ báo mộng. Điểm nhấn nổi bật nhất là tháp Phước Duyên hình bát giác cao 7 tầng xây năm 1844 dưới thời vua Thiệu Trị, cùng đại hồng chung đúc năm 1710 dưới thời chúa Nguyễn Phúc Chu. Chùa là biểu tượng tâm linh cổ kính bậc nhất xứ Huế.',
                longText: 'Chùa Thiên Mụ (còn gọi là Linh Mụ Tự) được xây dựng trên thế đất như đầu rồng đang ngoảnh lại nhìn sông Hương. Trải qua hơn 4 thế kỷ, chùa được trùng tu nhiều lần, quy mô bề thế nhất là đợt đại trùng tu năm 1714 của chúa Nguyễn Phúc Chu. Tháp Phước Duyên cao 21m gồm 7 tầng hình bát giác, mỗi tầng thờ một vị Phật. Chùa còn lưu giữ đại hồng chung nặng hơn 2 tấn có tiếng ngân vang khắp kinh kỳ và chiếc xe Austin chở Hòa thượng Thích Quảng Đức vị pháp thiêu thân năm 1963.',
                sources: 'Đại Nam Nhất Thống Chí; Thừa Thiên Xứ Thuận Hóa Ký; BAVH.'
            },
            {
                placeId: 'heritage-lang-gia-long',
                lang: 'vi',
                shortText: 'Lăng Gia Long, tên chữ là Thiên Thọ Lăng, tọa lạc giữa quần sơn Định Môn hùng vĩ, được xây dựng từ năm 1814 đến năm 1820. Đây là nơi an nghỉ của vị vua sáng lập triều Nguyễn cùng Thừa Thiên Cao Hoàng hậu. Lăng mang phong cách kiến trúc hòa nhập trọn vẹn vào thiên nhiên hoang sơ, với hai ngôi mộ bằng đá nguyên khối nằm song táng bình đẳng, phản ánh sâu sắc tình nghĩa phu thê son sắt giữa chốn núi rừng non nước.',
                longText: 'Thiên Thọ Lăng nằm cách trung tâm thành phố Huế khoảng 20km về phía tây nam, tựa lưng vào dãy núi Đại Thiên Thọ hùng trĩu. Cấu trúc lăng gồm ba khu vực: khu lăng mộ chính ở giữa, bên phải là điện Minh Thành thờ vua và hoàng hậu, bên trái là Bi đình với tấm bia đá lớn khắc bài văn bia ngự chế. Điểm độc đáo nhất của lăng là hình tượng hai ngôi mộ đá táng cạnh nhau dưới bầu trời mở rộng, không cầu kỳ son thếp mà đậm chất uy nghi, hòa lẫn giữa thông reo và hồ nước tĩnh lặng.',
                sources: 'Đại Nam Thực Lục - Đệ nhất kỷ; Quần thể Di tích Cố đô Huế; Phan Thuận An.'
            },
            {
                placeId: 'minh-mang-tomb-02',
                lang: 'vi',
                shortText: 'Lăng Minh Mạng, tức Hiếu Lăng, nằm trên núi Cẩm Kê gần ngã ba Bằng Lãng, nơi hợp lưu của hai dòng Tả Trạch và Hữu Trạch tạo nên sông Hương. Khởi công năm 1840 dưới thời vua Minh Mạng và hoàn thành năm 1843 thời vua Thiệu Trị, lăng có bố cục đăng đối nghiêm ngặt trên một trục thần đạo dài 700 mét. Quần thể gồm gần 40 công trình lớn nhỏ soi bóng xuống hồ Trừng Minh tĩnh lặng, toát lên vẻ uy nghiêm, mực thước.',
                longText: 'Hiếu Lăng được coi là biểu tượng đỉnh cao của triết lý Nho giáo và kiến trúc đăng đối trong hệ thống lăng tẩm triều Nguyễn. Trục thần đạo xuyên suốt từ Đại Hồng Môn, qua Bái đình, Bi đình, khu tẩm điện Sùng Ân, cầu Thông Minh Chính Trực bắc qua hồ Trừng Minh, đến lầu Minh Lâu thanh tao và kết thúc tại Bửu thành - quả đồi tròn trồng thông xanh che chở mộ phần nhà vua. Cảnh quan hòa quyện giữa hồ sen bán nguyệt Tân Nguyệt và cây rừng xanh mát tạo nên vẻ đẹp tĩnh lặng, thâm nghiêm.',
                sources: 'Đại Nam Thực Lục - Đệ nhị kỷ; Kiến trúc Lăng tẩm Hoàng gia Huế.'
            },
            {
                placeId: 'tu-duc-tomb-01',
                lang: 'vi',
                shortText: 'Lăng Tự Đức, tức Khiêm Lăng, tọa lạc trong thung lũng hẹp tại làng Dương Xuân Thượng, được xây dựng từ năm 1864 đến năm 1867. Khi còn sống, vua Tự Đức dùng nơi này làm hành cung nghỉ ngơi, ngâm thơ và câu cá bên hồ Lưu Khiêm thơ mộng. Gần 50 công trình trong lăng đều mang chữ Khiêm trong tên gọi, thể hiện tâm sự u uẩn và đức khiêm cung của vị vua hay chữ nhưng gặp thời thế trắc trở.',
                longText: 'Khiêm Lăng mang đậm tính cách thi sĩ lãng mạn và nỗi niềm u hoài của vua Tự Đức. Khác với vẻ đăng đối của lăng Minh Mạng, các công trình ở Khiêm Lăng uốn lượn tự nhiên quanh hồ Lưu Khiêm, đảo Tịnh Khiêm và cầu Ánh Khiêm. Nhà tạ Xung Khiêm và Dũ Khiêm bên mé nước là nơi vua ngồi câu cá, vịnh thơ và ngắm sen. Khu Bi đình lưu giữ tấm bia đá Khiêm Cung Ký nặng hơn 20 tấn do chính nhà vua tự tay soạn thảo để trần tình về công và tội của mình trước lịch sử.',
                sources: 'Khiêm Cung Ký (Vua Tự Đức tự soạn); Đại Nam Thực Lục; Kiến trúc Huế.'
            },
            {
                placeId: '4f5e6d7c-8b9a-0123-4567-89abcdef0123',
                lang: 'vi',
                shortText: 'Lăng Khải Định, tức Ứng Lăng, tọa lạc trên triền núi Châu Chữ, được khởi công năm 1920 và hoàn thành năm 1931 sau 11 năm thi công ròng rã. Lăng mang phong cách kiến trúc giao thoa Đông - Tây độc đáo, kết hợp giữa nghệ thuật Gothic phương Tây và kiến trúc truyền thống Á Đông. Điểm nhấn tuyệt tác là cung Thiên Định với nghệ thuật ghép sành sứ, thủy tinh tinh xảo cùng bức bích họa Cửu Long Ẩn Vân lừng danh trên trần điện.',
                longText: 'Ứng Lăng có diện tích khiêm tốn hơn các lăng tiền nhiệm nhưng đòi hỏi kỹ nghệ và thời gian thi công kéo dài nhất. Lăng xây bằng xi măng, bê tông và sắt thép nhập từ Pháp, đá cẩm thạch và sành sứ cao cấp từ Nhật Bản, Trung Hoa. Đi qua 127 bậc thang là sân Bái đính với tượng quan binh bằng đá hiếm thấy. Đỉnh cao nghệ thuật nằm trong cung Thiên Định, nơi đặt tượng đồng vua Khải Định đúc tại Pháp theo kích thước thật và các bức phù điêu khảm sành sứ tỉ mỉ đến từng chi tiết nhỏ.',
                sources: 'Hồ sơ Di tích Trung tâm BTDT Cố đô Huế; BAVH; Nghệ thuật khảm sành sứ Huế.'
            },
            {
                placeId: 'heritage-lang-dong-khanh',
                lang: 'vi',
                shortText: 'Lăng Đồng Khánh, tên chữ là Tư Lăng, nằm kề bên lăng Tự Đức tại làng Cư Sĩ. Quá trình xây dựng kéo dài qua 4 đời vua từ năm 1888 đến năm 1923 mới hoàn tất. Khu vực tẩm điện ban đầu là điện Truy Tư để thờ cha của vua Đồng Khánh là Kiên Thái Vương. Lăng mang nét kiến trúc chuyển tiếp đặc biệt giữa phong cách cổ điển truyền thống và sự chớm nở của mỹ thuật hiện đại phương Tây cuối thế kỷ mười chín.',
                longText: 'Tư Lăng phản ánh sự giao thời lịch sử sâu sắc. Khu tẩm điện Ngưng Hy xây dựng theo phong cách truyền thống "trùng thiềm điệp ốc" lộng lẫy bằng gỗ sơn son thếp vàng, với hệ thống ô hộc khảm xà cừ và chạm khắc điển tích cổ. Ngược lại, khu lăng mộ Bửu thành do vua Khải Định hoàn thành vào năm 1917 lại mang dấu ấn kiến trúc tân cổ điển phương Tây, từ trụ cổng, lan can con tiện đến các hoa văn trang trí bằng xi măng đắp nổi.',
                sources: 'Đại Nam Thực Lục - Đệ lục kỷ; Di tích Lăng Đồng Khánh; Phan Thuận An.'
            },
            {
                placeId: '5a6b7c8d-9e0f-1a2b-3c4d-5e6f7a8b9c0d',
                lang: 'vi',
                shortText: 'Cầu Tràng Tiền, biểu tượng thơ mộng bắc qua dòng sông Hương, được xây dựng từ năm 1897 đến 1899 dưới triều vua Thành Thái theo thiết kế của hãng kiến trúc Eiffel nước Pháp. Cây cầu dài hơn 400 mét với 6 vài 12 nhịp thép hình vành lược duyên dáng. Trải qua hơn một thế kỷ thăng trầm cùng lịch sử Cố Đô, cây cầu từng mang tên cầu Thành Thái, cầu Clemenceau, cầu Nguyễn Hoàng trước khi gắn bó thân thương với tên gọi Tràng Tiền.',
                longText: 'Cầu Tràng Tiền (còn gọi là Trường Tiền) là cây cầu vĩnh cửu đầu tiên bắc qua sông Hương. Tên gọi cầu bắt nguồn từ xưởng đúc tiền của triều đình nhà Nguyễn từng đóng gần bờ nam sông Hương. Cây cầu từng nhiều lần bị hư hại do thiên tai bão lụt năm Thìn (1904) và chiến tranh (1946, 1968), nhưng sau mỗi lần tái thiết, cầu vẫn giữ được dáng vóc cong cong hình lược mềm mại soi bóng xuống dòng sông Hương trữ tình, gắn liền với biết bao ký ức văn hóa của người dân Huế.',
                sources: 'Địa chí Thừa Thiên Huế; Lịch sử Cầu Tràng Tiền qua các thời kỳ.'
            },
            {
                placeId: 'com-hen-hoa-dong-13',
                lang: 'vi',
                shortText: 'Cồn Hến, dải đất phù sa xanh ngát nổi giữa dòng sông Hương, là cái nôi sản sinh ra món cơm hến dân dã trứ danh của xứ Huế. Con hến Cồn Hến nhỏ nhưng thịt ngọt đậm đà, được xào cùng măng khô, ăn kèm cơm nguội, bắp chuối thái mịn, rau thơm, ớt hiểm cay nồng, đậu phộng rang giòn và rưới nước luộc hến nóng hổi bốc khói. Quán Hoa Đông là một trong những địa chỉ gìn giữ hương vị gốc Cồn Hến suốt nhiều thế hệ.',
                longText: 'Cồn Hến (còn gọi là Cồn Soi) nằm ở hạ lưu sông Hương, nơi dòng nước hội tụ bồi đắp lớp phù sa và bùn mịn tạo điều kiện cho loài hến nước lợ phát triển béo ngậy. Từ thế kỷ mười chín, cơm hến từ món ăn nghèo của cư dân vạn đò đã trở thành món ngon tiến vua dưới thời Thành Thái. Nét độc đáo của cơm hến là sự kết hợp của hơn 10 loại gia vị đối lập: cơm nguội thanh mát, ớt cay xé lưỡi, ruốc đậm đà, mỡ giòn rụm và nước dùng hến thơm ngọt bốc khói nghi ngút.',
                sources: 'Văn hóa Ẩm thực xứ Huế (Hoàng Thị Kim Cúc); Tạp chí Huế Xưa và Nay.'
            },
            {
                placeId: 'heritage-ho-tinh-tam',
                lang: 'vi',
                shortText: 'Hồ Tịnh Tâm là cảnh quan danh thắng hoàng gia nổi tiếng nằm ở phía Đông Bắc Hoàng thành Huế, được cải tạo quy mô dưới thời vua Minh Mạng vào năm 1838. Nơi đây xưa kia là chốn tiêu dao, ngắm cảnh của hoàng tộc với giống sen trắng tiến vua thuần khiết. Vua Thiệu Trị từng xếp Tịnh Hồ Hạ Hướng là đệ tam cảnh trong chùm thơ Thần kinh nhị thập cảnh ca ngợi 20 thắng cảnh đẹp nhất đất thần kinh.',
                longText: 'Hồ Tịnh Tâm nguyên là một đoạn sông Kim Long được đào đắp ngăn dòng thành hồ nhân tạo hình chữ nhật chu vi gần 1.500m. Trên mặt hồ nổi lên ba hòn đảo nhỏ: Bồng Lai, Phương Trượng và Doanh Châu, nối với bờ bằng những cây cầu gạch và hành lang lợp ngói. Hồ nổi tiếng với giống sen trắng Bách Diệp hương thơm thanh khiết, nguồn nguyên liệu quý dùng để ướp trà sen Cung đình phục vụ các bậc đế vương triều Nguyễn.',
                sources: 'Thần Kinh Nhị Thập Cảnh (Vua Thiệu Trị); Đại Nam Nhất Thống Chí.'
            },
            {
                placeId: 'heritage-cho-dong-ba',
                lang: 'vi',
                shortText: 'Chợ Đông Ba là trung tâm thương mại truyền thống sầm uất và lâu đời nhất đất Cố Đô, nằm soi bóng bên bờ sông Hương. Chợ nguyên ở bên ngoài cửa Chánh Đông (cửa Đông Ba), đến năm 1899 vua Thành Thái cho dời về vị trí ngã ba sông hiện tại. Chợ không chỉ là nơi giao thương hàng hóa tấp nập của người dân xứ Huế mà còn là bảo tàng sống động về ẩm thực, nón bài thơ và phong vị đời sống thường nhật.',
                longText: 'Chợ Đông Ba trải qua lịch sử hơn một thế kỷ rưỡi gắn liền với nhịp thở kinh kỳ. Khu nhà chợ gồm tòa lầu chuông trung tâm ba tầng bao quanh bởi các dãy ki-ốt san sát. Tầng trệt là thiên đường ẩm thực dân dã tụ hội đủ bún bò, bánh bèo, bánh lọc, cơm hến và các món chè ngọt lừng danh. Tầng trên là nơi bày bán các sản phẩm thủ công mỹ nghệ tinh tế như nón bài thơ Dạ Lê, đồ kim hoàn Kế Môn và vải may áo dài truyền thống xứ Huế.',
                sources: 'Đồng Khánh Địa Dư Chí; Lịch sử Chợ Cổ truyền Việt Nam; Huế Triều Nguyễn.'
            },
            {
                placeId: '1b34ad29-2342-49cf-91ba-00c71a39fbc4',
                lang: 'vi',
                shortText: 'Bảo tàng Cổ vật Cung đình Huế đặt trong ngôi điện Long An tráng lệ, được xây dựng năm 1845 dưới triều vua Thiệu Trị làm nơi nghỉ ngơi và đọc sách. Điện mang phong cách trùng thiềm điệp ốc tuyệt mỹ với 128 cột gỗ lim khắc chạm thơ văn chữ Hán thếp vàng rực rỡ. Bảo tàng hiện lưu giữ hàng ngàn hiện vật quý giá của triều Nguyễn như ngai vàng, long bào, đồ sứ ngự dụng và bảo vật cung đình vô giá.',
                longText: 'Thành lập từ năm 1923 với tên gọi ban đầu là Musée Khải Định, đây là một trong những bảo tàng cổ kính và tráng lệ nhất Việt Nam. Bản thân điện Long An là một bảo vật kiến trúc cung đình vô giá, với hệ thống rường cột chạm khắc hình rồng mây tinh xảo và 35 bài thơ, 329 bài tứ tuyệt của vua Thiệu Trị được khảm cẩn thếp vàng lộng lẫy. Kho tàng bảo tàng trưng bày phong phú các bộ sưu tập pháp lam, đồ gốm sứ ký kiểu "Bleu de Hué", ngự dụng bằng vàng ngọc và nhạc khí cung đình.',
                sources: 'Hồ sơ Di tích Bảo tàng Cổ vật Cung đình Huế; Bulletin des Amis du Vieux Hué (BAVH).'
            }
        ];

        for (const item of narrations) {
            await queryRunner.query(`
                INSERT INTO "place_narrations" 
                ("placeId", "lang", "shortText", "longText", "sources", "reviewStatus")
                VALUES ($1, $2, $3, $4, $5, 'draft')
                ON CONFLICT ("placeId", "lang") DO UPDATE SET
                    "shortText" = EXCLUDED."shortText",
                    "longText" = EXCLUDED."longText",
                    "sources" = EXCLUDED."sources",
                    "reviewStatus" = 'draft',
                    "updatedAt" = now()
            `, [item.placeId, item.lang, item.shortText, item.longText, item.sources]);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "place_narrations"`);
    }
}
