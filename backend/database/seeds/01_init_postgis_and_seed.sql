-- ============================================================================
-- HUEGO – SCHEMA CHUẨN DUY NHẤT
-- PostgreSQL 16 + PostGIS 3.4
--
-- LƯU Ý LỊCH SỬ: trước đây có 2 file seed cùng định nghĩa bảng `users` và
-- `place_categories` với schema KHÁC NHAU. File 01 chạy trước nên bảng được
-- tạo theo version của file 01, còn `CREATE TABLE IF NOT EXISTS` của file 02
-- trở thành no-op -> file 02 vỡ tại câu INSERT vì thiếu cột `display_order`,
-- khiến 4 bảng (itineraries, itinerary_items, reviews, certificates) và toàn
-- bộ seed của file 02 không bao giờ được tạo.
--
-- Nay đã gộp còn 1 file. KHÔNG thêm file seed thứ hai trong thư mục này.
-- File này chạy 1 lần duy nhất khi volume Postgres còn trống.
-- Muốn seed lại từ đầu:
--   docker compose -f docker-compose.yml down -v
--   docker compose -f docker-compose.yml up -d postgres-postgis
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. DANH MỤC ĐỊA ĐIỂM (đặt TRƯỚC places vì places tham chiếu category_id)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS place_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    icon_url TEXT,
    display_order INT DEFAULT 0,
    is_utility BOOLEAN DEFAULT FALSE
);

INSERT INTO place_categories (name, code, icon_url, display_order, is_utility) VALUES
('Di tích Cố đô & Lăng tẩm', 'HISTORICAL',     'https://assets.huego.vn/icons/palace.png',   1, FALSE),
('Quán Cà Phê & Sống Ảo',    'CAFE',           'https://assets.huego.vn/icons/cafe.png',    2, FALSE),
('Ẩm Thực & Món Ngon Xứ Huế','CUISINE',       'https://assets.huego.vn/icons/food.png',    3, FALSE),
('Cảnh Quan View Ngày & Đêm','SCENIC_VIEW',   'https://assets.huego.vn/icons/view.png',    4, FALSE),
('Du Lịch Ngoại Thành & Sinh Thái','OUTSKIRTS_ECO','https://assets.huego.vn/icons/mountain.png',5, FALSE),
('Làng Nghề Truyền Thống',  'CRAFT_VILLAGE',  'https://assets.huego.vn/icons/craft.png',   6, FALSE),
('Tiện Ích: Cây Xăng',      'GAS_STATION',    'https://assets.huego.vn/icons/gas.png',     7, TRUE),
('Tiện Ích: Thuê Xe Máy & Xe Đạp','VEHICLE_RENTAL','https://assets.huego.vn/icons/bike.png',8, TRUE),
('Văn Hóa & Nghệ Thuật',    'CULTURE_ART',    'https://assets.huego.vn/icons/museum.png',  9, FALSE)
ON CONFLICT (code) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 2. NGƯỜI DÙNG
-- `password_hash` là cột BẮT BUỘC cho Phase 3 (JWT auth). NULL nghĩa là
-- tài khoản chưa đặt mật khẩu, chỉ đăng nhập được qua OAuth ở phase sau.
-- Mật khẩu luôn được hash bằng bcryptjs (cost 10), TUYỆT ĐỐI không lưu plaintext.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    phone_number VARCHAR(20),
    full_name VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    role VARCHAR(20) NOT NULL DEFAULT 'TOURIST' CHECK (role IN ('TOURIST', 'LOCAL_CONTRIBUTOR', 'ADMIN')),
    green_points INT NOT NULL DEFAULT 0,
    current_level INT NOT NULL DEFAULT 1,
    preferences JSONB DEFAULT '{"favoriteCategories": [], "transport": "BICYCLE", "budget": "STANDARD"}'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    password_changed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- ----------------------------------------------------------------------------
-- 3. ĐỊA ĐIỂM (PostGIS GEOMETRY Point)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS places (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id INT NOT NULL REFERENCES place_categories(id) ON DELETE RESTRICT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description_vi TEXT NOT NULL,
    description_en TEXT,
    address TEXT NOT NULL,
    coordinates GEOMETRY(Point, 4326) NOT NULL,
    geofence_radius_meters INT DEFAULT 35,
    environment_type VARCHAR(20) DEFAULT 'OUTDOOR' CHECK (environment_type IN ('INDOOR', 'OUTDOOR', 'SEMI_OUTDOOR')),
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    best_time_to_visit VARCHAR(20) DEFAULT 'ANYTIME' CHECK (best_time_to_visit IN ('MORNING', 'AFTERNOON', 'NIGHT', 'DAY_AND_NIGHT', 'ANYTIME')),
    opening_time TIME,
    closing_time TIME,
    ticket_price_vnd NUMERIC(12, 2) DEFAULT 0.00,
    green_reward_points INT DEFAULT 25,
    rating_avg NUMERIC(3, 2) DEFAULT 5.00,
    review_count INT DEFAULT 0,
    thumbnail_url TEXT,
    gallery_images JSONB DEFAULT '[]'::jsonb,
    is_wheel_eligible BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_places_coordinates ON places USING GIST(coordinates);
CREATE INDEX IF NOT EXISTS idx_places_category_id ON places(category_id);
CREATE INDEX IF NOT EXISTS idx_places_environment ON places(environment_type);
CREATE INDEX IF NOT EXISTS idx_places_tags ON places USING GIN(tags);

-- ----------------------------------------------------------------------------
-- 4. MỞ KHÓA ĐỊA DANH (GEOFENCING CHECK-IN)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_unlocked_places (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    place_id UUID NOT NULL REFERENCES places(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    gps_lat_logged DOUBLE PRECISION NOT NULL,
    gps_lng_logged DOUBLE PRECISION NOT NULL,
    distance_calculated_meters DOUBLE PRECISION NOT NULL,
    points_awarded INT NOT NULL,
    UNIQUE(user_id, place_id)
);

CREATE INDEX IF NOT EXISTS idx_unlocked_user ON user_unlocked_places(user_id);

-- ----------------------------------------------------------------------------
-- 5. ĐÓNG GÓP CỘNG ĐỒNG (CROWDSOURCING)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS crowdsource_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submitted_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    place_name VARCHAR(255) NOT NULL,
    category_id INT REFERENCES place_categories(id),
    address TEXT NOT NULL,
    coordinates GEOMETRY(Point, 4326) NOT NULL,
    environment_type VARCHAR(20) DEFAULT 'INDOOR',
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    reason_recommendation TEXT NOT NULL,
    proof_images JSONB DEFAULT '[]'::jsonb,
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
    admin_reviewer_id UUID REFERENCES users(id),
    admin_note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_crowdsource_status ON crowdsource_submissions(status);

-- ----------------------------------------------------------------------------
-- 6. HUY HIỆU & CHỨNG NHẬN ĐIỆN TỬ
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS badges (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    badge_code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    required_points INT NOT NULL,
    icon_url TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    certificate_code VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    itinerary_id UUID,
    recipient_name VARCHAR(150) NOT NULL,
    title VARCHAR(255) NOT NULL,
    total_places_completed INT NOT NULL,
    total_green_points_earned INT NOT NULL,
    total_carbon_saved_kg NUMERIC(6, 2) DEFAULT 0.00,
    completion_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    certificate_image_url TEXT,
    qr_verify_code TEXT NOT NULL,
    digital_signature VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_certificates_user ON certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_code ON certificates(certificate_code);

-- ----------------------------------------------------------------------------
-- 7. LỊCH TRÌNH
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS itineraries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    travel_date DATE NOT NULL,
    duration_days INT DEFAULT 1,
    transport_mode VARCHAR(30) DEFAULT 'BICYCLE' CHECK (transport_mode IN ('WALKING', 'BICYCLE', 'MOTORBIKE', 'ELECTRIC_CAR')),
    budget_tier VARCHAR(20) DEFAULT 'STANDARD' CHECK (budget_tier IN ('BUDGET', 'STANDARD', 'LUXURY')),
    status VARCHAR(20) DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'ACTIVE', 'COMPLETED', 'CANCELLED')),
    total_places INT DEFAULT 0,
    visited_places INT DEFAULT 0,
    completion_rate NUMERIC(5, 2) DEFAULT 0.00,
    weather_adapted BOOLEAN DEFAULT FALSE,
    weather_notice TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_itineraries_user ON itineraries(user_id);
CREATE INDEX IF NOT EXISTS idx_itineraries_status ON itineraries(status);

CREATE TABLE IF NOT EXISTS itinerary_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    itinerary_id UUID NOT NULL REFERENCES itineraries(id) ON DELETE CASCADE,
    place_id UUID NOT NULL REFERENCES places(id) ON DELETE CASCADE,
    order_index INT NOT NULL,
    scheduled_time TIME,
    estimated_duration_minutes INT DEFAULT 60,
    transport_advice TEXT,
    is_visited BOOLEAN DEFAULT FALSE,
    visited_at TIMESTAMP WITH TIME ZONE,
    gps_lat_logged DOUBLE PRECISION,
    gps_lng_logged DOUBLE PRECISION,
    distance_meters_logged DOUBLE PRECISION,
    points_awarded INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(itinerary_id, place_id)
);

CREATE INDEX IF NOT EXISTS idx_itinerary_items_itinerary ON itinerary_items(itinerary_id);
CREATE INDEX IF NOT EXISTS idx_itinerary_items_visited ON itinerary_items(is_visited);

-- ----------------------------------------------------------------------------
-- 8. ĐÁNH GIÁ & NHẬN XÉT
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    place_id UUID NOT NULL REFERENCES places(id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    photos JSONB DEFAULT '[]'::jsonb,
    is_verified_visit BOOLEAN DEFAULT FALSE,
    helpful_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, place_id)
);

CREATE INDEX IF NOT EXISTS idx_reviews_place ON reviews(place_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);

-- ----------------------------------------------------------------------------
-- 9. ĐỐI TÁC AFFILIATE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS affiliate_partners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    partner_name VARCHAR(255) NOT NULL,
    service_type VARCHAR(50) NOT NULL,
    contact_email VARCHAR(100),
    commission_rate NUMERIC(5, 2) NOT NULL,
    affiliate_base_url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- ============================================================================
-- DỮ LIỆU SEED
-- Toàn bộ 26 địa danh được port từ InMemoryDbService để app hiện tại và DB
-- khớp nhau. `id` cố định để các bảng tham chiếu không bị đổi.
-- ============================================================================

INSERT INTO badges (title, badge_code, description, required_points, icon_url) VALUES
('Khám Phá Sơ Khởi',      'NEWBIE_EXPLORER',    'Mở khóa địa danh đầu tiên tại Huế',              25,  'badge_bronze.png'),
('Chiến Binh Du Lịch Xanh','GREEN_TRAVELER',    'Đạt 200 Điểm Xanh bằng xe đạp và đi bộ',          200, 'badge_green.png'),
('Học Giả Cố Đô',         'HUE_HERITAGE_MASTER','Hoàn thành 100% cột mốc Đại Nội và Lăng Tẩm',     500, 'badge_gold.png')
ON CONFLICT (badge_code) DO NOTHING;

-- category_id theo thứ tự display_order ở mục 1:
-- 1 HISTORICAL, 2 CAFE, 3 CUISINE, 4 SCENIC_VIEW, 5 OUTSKIRTS_ECO,
-- 6 CRAFT_VILLAGE, 7 GAS_STATION, 8 VEHICLE_RENTAL, 9 CULTURE_ART
INSERT INTO places (id, name, slug, category_id, description_vi, description_en, address, coordinates, geofence_radius_meters, environment_type, ticket_price_vnd, green_reward_points, thumbnail_url) VALUES
-- 5 HISTORICAL
('8f8b0596-f5ee-449e-8c31-9cb6be62b662', 'Đại Nội Huế (Hoàng Thành & Tử Cấm Thành)', 'dai-noi-hue', 1,
 'Kinh thành của triều Nguyễn, di sản văn hóa thế giới UNESCO với kiến trúc cung điện vàng son.',
 'Imperial City of Hue, UNESCO World Heritage site featuring majestic royal palaces.',
 'Đường 23/8, Phường Thuận Hòa, TP Huế', ST_SetSRID(ST_MakePoint(107.5779, 16.4697), 4326), 40, 'OUTDOOR', 200000, 30,
 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375'),
('1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', 'Chùa Thiên Mụ (Linh Mụ Tự)', 'chua-thien-mu', 1,
 'Ngôi chùa cổ kính hơn 400 năm tuổi soi bóng bên dòng sông Hương thơ mộng.',
 'Ancient pagoda over 400 years old reflecting on the poetic Perfume River.',
 'Đồi Hà Khê, Đường Kim Long, TP Huế', ST_SetSRID(ST_MakePoint(107.5451, 16.4529), 4326), 35, 'OUTDOOR', 0, 25,
 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647'),
('4f5e6d7c-8b9a-0123-4567-89abcdef0123', 'Lăng Khải Định (Ứng Lăng)', 'lang-khai-dinh', 1,
 'Tuyệt tác kiến trúc giao thoa Đông - Tây với nghệ thuật khảm sành sứ đỉnh cao.',
 'Architectural masterpiece blending Eastern and Western styles.',
 'Xã Thủy Bằng, TP Huế', ST_SetSRID(ST_MakePoint(107.5905, 16.3991), 4326), 35, 'SEMI_OUTDOOR', 150000, 25,
 'https://images.unsplash.com/photo-1548013146-72479768bada'),
('c9972fde-c6a7-4698-a4db-0c514ebe91d0', 'Lăng Tự Đức (Khiêm Lăng)', 'lang-tu-duc', 1,
 'Một trong những công trình lăng tẩm đẹp nhất triều Nguyễn, mang đậm nét vị lãng mạn bên hồ Lưu Khiêm.',
 'Poetic royal tomb set around Luu Khiem lake.',
 'Thôn Thượng Ba, Phường Thủy Xuân, TP Huế', ST_SetSRID(ST_MakePoint(107.5658, 16.4328), 4326), 35, 'SEMI_OUTDOOR', 150000, 25,
 'https://images.unsplash.com/photo-1509042239860-f550ce710b93'),
('2bb840cb-c8df-4f52-8a6c-8311efa374b7', 'Lăng Minh Mạng (Hiếu Lăng)', 'lang-minh-mang', 1,
 'Quy hoạch đăng đối uy nghiêm giữa núi đồi và hồ nước sen ngát hương.',
 'Majestic symmetrical royal architecture surrounded by lotus lakes.',
 'Xã Hương Thọ, TP Huế', ST_SetSRID(ST_MakePoint(107.5702, 16.3888), 4326), 40, 'SEMI_OUTDOOR', 150000, 25,
 'https://images.unsplash.com/photo-1548013146-72479768bada'),
-- 1 CULTURE_ART
('1b34ad29-2342-49cf-91ba-00c71a39fbc4', 'Bảo tàng Cổ vật Cung đình Huế (Điện Long An)', 'bao-tang-co-vat-cung-dinh', 9,
 'Nơi lưu giữ hàng ngàn cổ vật quý giá của triều đình nhà Nguyễn, không gian trong nhà lý tưởng ngày mưa.',
 'Museum preserving royal antiquities, ideal indoor cultural visit.',
 'Số 3 Lê Trực, Phường Đông Ba, TP Huế', ST_SetSRID(ST_MakePoint(107.5812, 16.4715), 4326), 30, 'INDOOR', 50000, 25,
 'https://images.unsplash.com/photo-1582560475093-ba66accbc424'),
-- 3 SCENIC_VIEW
('5a6b7c8d-9e0f-1a2b-3c4d-5e6f7a8b9c0d', 'Cầu Tràng Tiền (Lung linh đèn đêm)', 'cau-trang-tien', 4,
 'Biểu tượng lãng mạn 6 vài 12 nhịp vắt qua sông Hương, đổi màu rực rỡ khi thành phố lên đèn.',
 'Historic romantic 6-span bridge crossing the Perfume River.',
 'Cầu Tràng Tiền, TP Huế', ST_SetSRID(ST_MakePoint(107.5947, 16.4683), 4326), 40, 'OUTDOOR', 0, 20,
 'https://images.unsplash.com/photo-1528127269322-539801943592'),
('134820af-b7f8-4050-83f5-4c80986bca46', 'Cầu Dã Viên (Ngắm Hoàng Hôn Sông Hương)', 'cau-da-vien', 4,
 'Địa điểm ngắm hoàng hôn buông xuống cồn Dã Viên thơ mộng bậc nhất cố đô.',
 'Stunning sunset viewpoint over Da Vien islet and Perfume River.',
 'Cầu Dã Viên, Phường Vĩnh Ninh, TP Huế', ST_SetSRID(ST_MakePoint(107.5721, 16.4592), 4326), 35, 'OUTDOOR', 0, 20,
 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'),
('bbddab34-00cf-4a40-8916-e44ad50d42f4', 'Phố Đi Bộ Chu Văn An (Khu Phố Tây Sôi Động)', 'pho-di-bo-pho-tay', 4,
 'Tuyến phố đêm sầm uất với các quán pub, nhạc sống, ẩm thực đường phố và không khí náo nhiệt của giới trẻ.',
 'Vibrant nightlife walking street with bars, live music and street food.',
 'Phố Chu Văn An - Võ Thị Sáu, Phường Phú Hội, TP Huế', ST_SetSRID(ST_MakePoint(107.5968, 16.4645), 4326), 40, 'OUTDOOR', 0, 20,
 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819'),
-- 4 OUTSKIRTS_ECO
('8d5e6f6b-6211-42ef-846f-fba290abe6c5', 'Đồi Vọng Cảnh (Khúc Uốn Sông Hương)', 'doi-vong-canh', 5,
 'Góc nhìn toàn cảnh ngắm dòng sông Hương uốn lượn mềm mại ôm lấy chân đồi thông reo.',
 'Panoramic viewpoint overlooking the winding Perfume River.',
 'Đồi Vọng Cảnh, Phường Thủy Biều, TP Huế', ST_SetSRID(ST_MakePoint(107.5512, 16.4258), 4326), 45, 'OUTDOOR', 0, 30,
 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'),
('2e365413-a8ae-45ae-aeb5-48e6424de868', 'Đồi Thiên An & Hồ Thủy Tiên (Công viên Rồng)', 'doi-thien-an-ho-thuy-tien', 5,
 'Đồi thông Đà Lạt giữa lòng Huế và công viên nước Hồ Thủy Tiên nổi tiếng quốc tế với tượng rồng khổng lồ.',
 'Pine hills and the mysterious abandoned dragon water park.',
 'Xã Thủy Bằng, TP Huế', ST_SetSRID(ST_MakePoint(107.5756, 16.4087), 4326), 45, 'OUTDOOR', 0, 30,
 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23'),
('131caef1-23a2-463e-938d-6d6f84fe118c', 'Rừng Ngập Mặn Rú Chá (Nguyên Sinh)', 'rung-ngap-man-ru-cha', 5,
 'Khu rừng ngập mặn nguyên sinh duy nhất còn sót lại trên đầm phá Tam Giang, rực rỡ mùa lá vàng.',
 'Unique primitive mangrove forest on Tam Giang lagoon.',
 'Xã Hương Phong, TP Huế', ST_SetSRID(ST_MakePoint(107.6189, 16.5512), 4326), 50, 'OUTDOOR', 0, 35,
 'https://images.unsplash.com/photo-1448375240586-882707db888b'),
('a99e1ea0-3735-407b-ba61-9761856ece4c', 'Đầm Chuồn (Hoàng Hôn Phá Tam Giang)', 'dam-chuon-tam-giang', 5,
 'Trải nghiệm chèo thuyền trên mặt đầm mênh mông, thưởng thức bánh khoái cá kình tươi sống.',
 'Tam Giang lagoon sunset experience with local seafood pancakes.',
 'Xã Phú An, Huyện Phú Vang, Thừa Thiên Huế', ST_SetSRID(ST_MakePoint(107.6321, 16.5168), 4326), 50, 'SEMI_OUTDOOR', 0, 35,
 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'),
-- 1 CRAFT_VILLAGE
('27a75d45-b73f-4aec-8392-6875ee65521e', 'Làng Hương Trầm Thủy Xuân', 'lang-huong-thuy-xuan', 6,
 'Làng nghề làm hương trầm truyền thống rực rỡ sắc màu, góc check-in sống ảo quốc dân xứ Huế.',
 'Colorful traditional incense making village.',
 'Đường Huyền Trân Công Chúa, Phường Thủy Xuân, TP Huế', ST_SetSRID(ST_MakePoint(107.5647, 16.4358), 4326), 30, 'SEMI_OUTDOOR', 0, 25,
 'https://images.unsplash.com/photo-1509042239860-f550ce710b93'),
-- 3 CAFE
('dd671a4c-5ff8-4c5f-afc2-eba927eca23e', 'Cà Phê Muối Xứ Huế (Gốc Nguyễn Huệ)', 'ca-phe-muoi-nguyen-hue', 2,
 'Quán gốc khai sinh ra thức uống cà phê muối huyền thoại, béo ngậy vị kem mặn đặc trưng.',
 'The original birthplace of Hue salted cream coffee.',
 'Số 10 Nguyễn Huệ, Phường Vĩnh Ninh, TP Huế', ST_SetSRID(ST_MakePoint(107.5898, 16.4589), 4326), 25, 'INDOOR', 25000, 20,
 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd'),
('76b75a53-2337-4be5-a6e0-2338ce1a9e62', 'Tân Cafe (Phong Cách Vintage Cố Đô)', 'tan-cafe-vintage', 2,
 'Không gian trầm mặc hoài niệm thập niên 80s với những mảng tường gạch thô và bàn ghế gỗ xưa.',
 'Nostalgic retro cafe with historic brick aesthetics.',
 'Số 14 Đặng Thái Thân, Thuận Hòa, TP Huế', ST_SetSRID(ST_MakePoint(107.5882, 16.4635), 4326), 25, 'INDOOR', 35000, 20,
 'https://images.unsplash.com/photo-1554118811-1e0d58224f24'),
('03758306-c5e8-49dc-8ae4-639eeaa7e182', 'Sline Cafe & Sân Vườn Hoàng Gia', 'sline-cafe-garden', 2,
 'Quán cà phê sân vườn xanh mát view hồ Ngự Hà, điểm chụp ảnh áo dài cổ phục lý tưởng.',
 'Scenic garden cafe by Ngu Ha lake, perfect for traditional Ao Dai photos.',
 'Đường Lê Huân, Phường Thuận Hòa, TP Huế', ST_SetSRID(ST_MakePoint(107.5742, 16.4655), 4326), 25, 'SEMI_OUTDOOR', 40000, 20,
 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8'),
-- 6 CUISINE
('6b7c8d9e-0f1a-2b3c-4d5e-6f7a8b9c0d1e', 'Không Gian Trà Cung Đình Kim Long', 'tra-cung-dinh-kim-long', 3,
 'Nhà rường cổ thưởng trà hoa sen, trà quý tộc tiến vua 26 vị thảo mộc và nghe ca Huế ngày mưa.',
 'Traditional garden house serving royal 26-herb imperial tea.',
 'Đường Kim Long, Phường Kim Long, TP Huế', ST_SetSRID(ST_MakePoint(107.5601, 16.4608), 4326), 25, 'INDOOR', 60000, 20,
 'https://images.unsplash.com/photo-1576092768241-dec231879fc3'),
('b59fcbff-4bd4-47c2-b4dc-a3dc4a3ec287', 'Bún Bò Huế Mụ Rơi (Chuẩn Vị Cố Đô)', 'bun-bo-mu-roi', 3,
 'Hương vị bún bò giò heo nước dùng ngọt thanh từ xương hầm và mắm ruốc sả ớt trứ danh xứ Huế.',
 'Legendary traditional Hue beef noodle soup with authentic broth.',
 'Số 40 Nguyễn Du, Phường Phú Cát, TP Huế', ST_SetSRID(ST_MakePoint(107.5862, 16.4745), 4326), 25, 'INDOOR', 45000, 20,
 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43'),
('7d4bd914-e511-4313-834b-59d835bd2216', 'Cơm Hến Hoa Đông (Gốc Cồn Hến)', 'com-hen-hoa-dong', 3,
 'Tô cơm hến cay nồng mộc mạc kèm atop mỡ giòn rụm và nước canh hến nghi ngút khói giữa lòng cồn Hến.',
 'Famous authentic clam rice on Con Hen islet.',
 'Số 64 Kiệt 7 Ưng Bình, Cồn Hến, Vĩ Dạ, TP Huế', ST_SetSRID(ST_MakePoint(107.6012, 16.4789), 4326), 25, 'SEMI_OUTDOOR', 25000, 20,
 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624'),
('7913134a-58d2-4cfe-b18f-44e20f9bfe92', 'Bánh Bèo - Nậm - Lọc Bà Đỏ', 'banh-beo-nam-loc-ba-do', 3,
 'Thương hiệu bánh Huế gia truyền hơn 30 năm, tôm chấy đỏ au và nước mắm ớt cay xé lưỡi.',
 'Famous traditional steamed rice cakes with dried shrimp topping.',
 'Số 8 Nguyễn Bỉnh Khiêm, Phường Phú Cát, TP Huế', ST_SetSRID(ST_MakePoint(107.5998, 16.4615), 4326), 25, 'INDOOR', 50000, 20,
 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8'),
('806b9fba-080f-43e8-914a-4cd247bb47f7', 'Chè Hẻm 20 Món Cố Đô Hùng Vương', 'che-hem-hung-vuong', 3,
 'Quán chè nằm sâu trong hẻm nhỏ với 20 nồi chè thơm nức: chè bắp, chè hạt sen long nhãn, chè khoai tía...',
 'Iconic 20-pot sweet soup alley in Hue.',
 'Kiệt 29 Hùng Vương, Phường Phú Hội, TP Huế', ST_SetSRID(ST_MakePoint(107.5932, 16.4621), 4326), 25, 'INDOOR', 15000, 15,
 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc'),
('5d69d2d6-c473-48ea-be36-b5be3d617928', 'Chè Bột Lọc Bọc Heo Quay Mợ Tôn Đích', 'che-heo-quay-mo-ton-dich', 3,
 'Món chè độc nhất vô nhị kết hợp nhân thịt heo quay giòn mặn trong lớp bột lọc dẻo dai và nước đường gừng.',
 'Unique Hue specialty sweet soup with roasted pork filling.',
 'Số 20 Đinh Tiên Hoàng, Thuận Thành, TP Huế', ST_SetSRID(ST_MakePoint(107.5789, 16.4721), 4326), 20, 'INDOOR', 20000, 15,
 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc'),
-- 2 VEHICLE_RENTAL
('f7f84e13-61c3-4312-8109-c303bb680506', 'Trạm Thuê Xe Đạp Xanh Eco-Bike Cửa Hiển Nhơn', 'tram-xe-dap-hien-nhon', 8,
 'Trạm xe đạp công cộng quét mã QR thông minh ngay cổng ra Hoàng Thành Huế, ưu đãi khách du lịch xanh.',
 'Smart public bike sharing station at Hien Nhon Gate.',
 'Đường Đoàn Thị Điểm, Phường Thuận Thành, TP Huế', ST_SetSRID(ST_MakePoint(107.5815, 16.4705), 4326), 20, 'OUTDOOR', 10000, 15,
 'https://images.unsplash.com/photo-1485965120184-e220f721d03e'),
('89ccd9ff-aecf-493f-9ebb-26dbd016ed1c', 'Trạm Thuê Xe Đạp Xanh Bến Tòa Khâm', 'tram-xe-dap-toa-kham', 8,
 'Trạm xe đạp ven bờ sông Hương kết nối trực tiếp với cầu đi bộ gỗ lim ngắm cảnh sông thơ mộng.',
 'Public bike rental station along the Perfume River promenade.',
 'Đường Lê Lợi, Phường Phú Hội, TP Huế', ST_SetSRID(ST_MakePoint(107.5938, 16.4652), 4326), 20, 'OUTDOOR', 10000, 15,
 'https://images.unsplash.com/photo-1485965120184-e220f721d03e'),
-- 1 GAS_STATION
('abbeee9d-aa88-4050-9143-0cb1e3a3d162', 'Cây Xăng Petrolimex Trung Tâm Bờ Nam (Lê Lợi)', 'cay-xang-petrolimex-le-loi', 7,
 'Trạm cấp nhiên liệu tiêu chuẩn hoạt động 24/7 trên trục đường ven sông chính Lê Lợi.',
 '24/7 central gasoline station on main Le Loi street.',
 'Số 14 Lê Lợi, Phường Vĩnh Ninh, TP Huế', ST_SetSRID(ST_MakePoint(107.5862, 16.4632), 4326), 20, 'OUTDOOR', 0, 5,
 'https://images.unsplash.com/photo-1545459720-aac8509eb02c')
ON CONFLICT (slug) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 10. TÀI KHOẢN DEMO
-- Mật khẩu: Huego@2026  ->  bcryptjs cost 10
-- Hash bên dưới được sinh bằng bcryptjs.hashSync('Huego@2026', 10).
-- Đây chỉ là tài khoản demo công khai, KHÔNG dùng lại mật khẩu này ở production.
-- ----------------------------------------------------------------------------
INSERT INTO users (id, email, password_hash, phone_number, full_name, green_points, current_level, role, password_changed_at) VALUES
('e7b0e774-7243-41bb-9be4-8a4b868e82ef', 'tourist.demo@huego.vn', '$2a$10$LhTKtKmu8XTtuTf.JhRVUeaGttdInavwti8IVElcQvdRcsWV5UJvi', '0905123456', 'Nguyễn Cố Đô', 125, 2, 'TOURIST', CURRENT_TIMESTAMP)
ON CONFLICT (email) DO NOTHING;

-- Lịch trình demo khớp với InMemoryDbService (3 điểm, 2 đã check-in)
INSERT INTO itineraries (id, user_id, title, description, travel_date, duration_days, transport_mode, status, total_places, visited_places, completion_rate) VALUES
('a1a1a1a1-0000-4000-8000-000000000001', 'e7b0e774-7243-41bb-9be4-8a4b868e82ef', 'Hành Trình Tinh Hoa Cố Đô Huế', 'Truyền thống và cố đô trong một ngày', '2026-10-01', 1, 'BICYCLE', 'ACTIVE', 3, 2, 66.67)
ON CONFLICT (id) DO NOTHING;

INSERT INTO itinerary_items (itinerary_id, place_id, order_index, is_visited, visited_at, points_awarded) VALUES
('a1a1a1a1-0000-4000-8000-000000000001', '8f8b0596-f5ee-449e-8c31-9cb6be62b662', 1, TRUE,  '2026-10-01T08:30:00Z', 30),
('a1a1a1a1-0000-4000-8000-000000000001', '1b34ad29-2342-49cf-91ba-00c71a39fbc4', 2, TRUE,  '2026-10-01T10:15:00Z', 25),
('a1a1a1a1-0000-4000-8000-000000000001', '5a6b7c8d-9e0f-1a2b-3c4d-5e6f7a8b9c0d', 3, FALSE, NULL, 0)
ON CONFLICT (itinerary_id, place_id) DO NOTHING;