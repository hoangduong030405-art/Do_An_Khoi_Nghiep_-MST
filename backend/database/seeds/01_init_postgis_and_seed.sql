-- ========================================================
-- HUEGO PROJECT: PostGIS Extension & Seed Data for Hue City
-- ========================================================

CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. BẢNG NGƯỜI DÙNG & GREEN POINTS
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    full_name VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    green_points INT DEFAULT 100,
    current_level INT DEFAULT 1,
    role VARCHAR(20) DEFAULT 'TOURIST' CHECK (role IN ('TOURIST', 'LOCAL_CONTRIBUTOR', 'ADMIN')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. BẢNG DANH MỤC ĐỊA ĐIỂM
CREATE TABLE IF NOT EXISTS place_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    icon_url TEXT
);

INSERT INTO place_categories (name, code, icon_url) VALUES 
('Di tích Cố đô', 'HISTORICAL', 'https://assets.huego.vn/icons/palace.png'),
('Ẩm thực Huế', 'CUISINE', 'https://assets.huego.vn/icons/food.png'),
('Du lịch Xanh & Sinh thái', 'ECO_GREEN', 'https://assets.huego.vn/icons/leaf.png'),
('Làng nghề Truyền thống', 'CRAFT_VILLAGE', 'https://assets.huego.vn/icons/craft.png'),
('Văn hóa & Nghệ thuật', 'CULTURE_ART', 'https://assets.huego.vn/icons/museum.png')
ON CONFLICT (code) DO NOTHING;

-- 3. BẢNG ĐỊA ĐIỂM (PLACES) - TÍCH HỢP POSTGIS POINT(LNG, LAT)
CREATE TABLE IF NOT EXISTS places (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id INT REFERENCES place_categories(id),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description_vi TEXT NOT NULL,
    description_en TEXT,
    address TEXT NOT NULL,
    coordinates GEOMETRY(Point, 4326) NOT NULL,
    geofence_radius_meters INT DEFAULT 35,
    environment_type VARCHAR(20) DEFAULT 'OUTDOOR' CHECK (environment_type IN ('INDOOR', 'OUTDOOR', 'SEMI_OUTDOOR')),
    opening_time TIME,
    closing_time TIME,
    ticket_price_vnd NUMERIC(12, 2) DEFAULT 0.00,
    green_reward_points INT DEFAULT 25,
    thumbnail_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_places_coordinates ON places USING GIST(coordinates);
CREATE INDEX IF NOT EXISTS idx_places_env_type ON places(environment_type);

-- 4. BẢNG MỞ KHÓA ĐỊA DANH (GEOFENCING CHECK-IN MILESTONES)
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

-- 5. BẢNG ĐÓNG GÓP CỘNG ĐỒNG (CROWDSOURCING)
CREATE TABLE IF NOT EXISTS crowdsource_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submitted_by UUID NOT NULL REFERENCES users(id),
    place_name VARCHAR(255) NOT NULL,
    category_id INT REFERENCES place_categories(id),
    address TEXT NOT NULL,
    coordinates GEOMETRY(Point, 4326) NOT NULL,
    environment_type VARCHAR(20) DEFAULT 'INDOOR',
    reason_recommendation TEXT NOT NULL,
    proof_images JSONB DEFAULT '[]'::jsonb,
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
    admin_reviewer_id UUID REFERENCES users(id),
    admin_note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP WITH TIME ZONE
);

-- 6. BẢNG HUY HIỆU & CHỨNG NHẬN ĐIỆN TỬ
CREATE TABLE IF NOT EXISTS badges (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    badge_code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    required_points INT NOT NULL,
    icon_url TEXT NOT NULL
);

INSERT INTO badges (title, badge_code, description, required_points, icon_url) VALUES 
('Khám Phá Sơ Khởi', 'NEWBIE_EXPLORER', 'Mở khóa địa danh đầu tiên tại Huế', 25, 'badge_bronze.png'),
('Chiến Binh Du Lịch Xanh', 'GREEN_TRAVELER', 'Đạt 200 Điểm Xanh bằng xe đạp và đi bộ', 200, 'badge_green.png'),
('Học Giả Cố Đô', 'HUE_HERITAGE_MASTER', 'Hoàn thành 100% cột mốc Đại Nội và Lăng Tẩm', 500, 'badge_gold.png')
ON CONFLICT (badge_code) DO NOTHING;

-- 7. BẢNG ĐỐI TÁC AFFILIATE
CREATE TABLE IF NOT EXISTS affiliate_partners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    partner_name VARCHAR(255) NOT NULL,
    service_type VARCHAR(50) NOT NULL,
    contact_email VARCHAR(100),
    commission_rate NUMERIC(5, 2) NOT NULL,
    affiliate_base_url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- DỮ LIỆU MẪU: ĐỊA DANH HUẾ VỚI TỌA ĐỘ GPS CHUẨN XÁC
-- Cú pháp PostGIS: ST_SetSRID(ST_MakePoint(Longitude, Latitude), 4326)
INSERT INTO places (name, slug, category_id, description_vi, description_en, address, coordinates, geofence_radius_meters, environment_type, opening_time, closing_time, ticket_price_vnd, green_reward_points, thumbnail_url)
VALUES
(
  'Đại Nội Huế (Hoàng Thành)',
  'dai-noi-hue',
  1,
  'Kinh thành của triều Nguyễn, di sản văn hóa thế giới UNESCO với kiến trúc cung điện tráng lệ.',
  'Imperial City of Hue, UNESCO World Heritage site featuring majestic royal palaces.',
  'Đường 23/8, Phường Thuận Hòa, TP Huế',
  ST_SetSRID(ST_MakePoint(107.5779, 16.4697), 4326),
  40,
  'OUTDOOR',
  '07:30', '17:30', 200000, 30, 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375'
),
(
  'Chùa Thiên Mụ',
  'chua-thien-mu',
  1,
  'Ngôi chùa cổ kính hơn 400 năm tuổi soi bóng bên dòng sông Hương thơ mộng.',
  'Ancient pagoda over 400 years old reflecting on the poetic Perfume River.',
  'Đồi Hà Khê, Đường Kim Long, TP Huế',
  ST_SetSRID(ST_MakePoint(107.5451, 16.4529), 4326),
  35,
  'OUTDOOR',
  '06:00', '18:00', 0, 25, 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647'
),
(
  'Bảo tàng Cổ vật Cung đình Huế (Điện Long An)',
  'bao-tang-co-vat-cung-dinh',
  5,
  'Nơi lưu giữ hàng ngàn cổ vật quý giá của triều đình nhà Nguyễn, không gian tham quan trong nhà lý tưởng.',
  'Museum preserving royal antiquities of the Nguyen Dynasty, ideal indoor experience.',
  'Số 3 Lê Trực, Phường Đông Ba, TP Huế',
  ST_SetSRID(ST_MakePoint(107.5812, 16.4715), 4326),
  30,
  'INDOOR',
  '07:00', '17:00', 50000, 25, 'https://images.unsplash.com/photo-1582560475093-ba66accbc424'
),
(
  'Lăng Khải Định (Ứng Lăng)',
  'lang-khai-dinh',
  1,
  'Tuyệt tác kiến trúc giao thoa Đông - Tây với nghệ thuật khảm sành sứ đỉnh cao.',
  'Architectural masterpiece blending Eastern and Western styles with exquisite porcelain mosaic.',
  'Xã Thủy Bằng, TP Huế',
  ST_SetSRID(ST_MakePoint(107.5905, 16.3991), 4326),
  35,
  'SEMI_OUTDOOR',
  '07:00', '17:30', 150000, 25, 'https://images.unsplash.com/photo-1548013146-72479768bada'
),
(
  'Làng hương Thủy Xuân',
  'lang-huong-thuy-xuan',
  4,
  'Làng nghề cổ truyền rực rỡ sắc màu hương trầm dưới chân đồi Vọng Cảnh.',
  'Traditional incense-making village glowing with vibrant colors under Vong Canh Hill.',
  'Đường Huyền Trân Công Chúa, TP Huế',
  ST_SetSRID(ST_MakePoint(107.5647, 16.4358), 4326),
  30,
  'SEMI_OUTDOOR',
  '07:00', '18:30', 0, 20, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93'
),
(
  'Cầu Tràng Tiền',
  'cau-trang-tien',
  1,
  'Biểu tượng lãng mạn vắt qua sông Hương, gắn liền với chiều dài lịch sử xứ Huế.',
  'Historic romantic bridge crossing the Perfume River, iconic symbol of Hue.',
  'Cầu Tràng Tiền, TP Huế',
  ST_SetSRID(ST_MakePoint(107.5947, 16.4683), 4326),
  40,
  'OUTDOOR',
  '00:00', '23:59', 0, 20, 'https://images.unsplash.com/photo-1528127269322-539801943592'
),
(
  'Không gian Trà Cung Đình Kim Long',
  'tra-cung-dinh-kim-long',
  2,
  'Nhà rường cổ thưởng trà hoa sen, trà quý tộc cung đình và nghe nhã nhạc ngày mưa.',
  'Traditional garden house serving lotus and imperial tea, listening to court music on rainy days.',
  'Đường Kim Long, Phường Kim Long, TP Huế',
  ST_SetSRID(ST_MakePoint(107.5601, 16.4608), 4326),
  25,
  'INDOOR',
  '08:00', '22:00', 60000, 20, 'https://images.unsplash.com/photo-1576092768241-dec231879fc3'
)
ON CONFLICT (slug) DO NOTHING;

-- TẠO NGƯỜI DÙNG DEMO
INSERT INTO users (id, email, phone_number, full_name, green_points, current_level, role)
VALUES 
('e7b0e774-7243-41bb-9be4-8a4b868e82ef', 'tourist.demo@huego.vn', '0905123456', 'Nguyễn Cố Đô', 150, 2, 'TOURIST')
ON CONFLICT (email) DO NOTHING;
