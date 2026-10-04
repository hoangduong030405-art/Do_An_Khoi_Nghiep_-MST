-- ============================================================================
-- HUEGO – DATABASE SCHEMA TOÀN DIỆN CHO ỨNG DỤNG DU LỊCH CỐ ĐÔ HUẾ
-- Công nghệ: PostgreSQL 16 + PostGIS 3.4
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. BẢNG NGƯỜI DÙNG (USERS)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    full_name VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    role VARCHAR(20) DEFAULT 'TOURIST' CHECK (role IN ('TOURIST', 'LOCAL_CONTRIBUTOR', 'ADMIN')),
    green_points INT DEFAULT 0,
    current_level INT DEFAULT 1,
    preferences JSONB DEFAULT '{"favoriteCategories": [], "transport": "BICYCLE", "budget": "STANDARD"}'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- ----------------------------------------------------------------------------
-- 2. BẢNG DANH MỤC ĐỊA ĐIỂM (PLACE_CATEGORIES)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS place_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    icon_url TEXT,
    display_order INT DEFAULT 0,
    is_utility BOOLEAN DEFAULT FALSE -- TRUE cho cây xăng, điểm thuê xe...
);

INSERT INTO place_categories (name, code, icon_url, display_order, is_utility) VALUES 
('Di tích Cố đô & Lăng tẩm', 'HISTORICAL', 'https://assets.huego.vn/icons/palace.png', 1, FALSE),
('Quán Cà Phê & Sống Ảo', 'CAFE', 'https://assets.huego.vn/icons/cafe.png', 2, FALSE),
('Ẩm Thực & Món Ngon Xứ Huế', 'CUISINE', 'https://assets.huego.vn/icons/food.png', 3, FALSE),
('Cảnh Quan View Ngày & Đêm', 'SCENIC_VIEW', 'https://assets.huego.vn/icons/view.png', 4, FALSE),
('Du Lịch Ngoại Thành & Sinh Thái', 'OUTSKIRTS_ECO', 'https://assets.huego.vn/icons/mountain.png', 5, FALSE),
('Làng Nghề Truyền Thống', 'CRAFT_VILLAGE', 'https://assets.huego.vn/icons/craft.png', 6, FALSE),
('Tiện Ích: Cây Xăng', 'GAS_STATION', 'https://assets.huego.vn/icons/gas.png', 7, TRUE),
('Tiện Ích: Thuê Xe Máy & Xe Đạp Xanh', 'VEHICLE_RENTAL', 'https://assets.huego.vn/icons/bike.png', 8, TRUE)
ON CONFLICT (code) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 3. BẢNG ĐỊA ĐIỂM (PLACES) - TÍCH HỢP POSTGIS GEOMETRY POINT
-- Hỗ trợ đầy đủ tiện ích, thẻ phân loại vòng quay (Tags), giờ mở cửa, giá vé
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS places (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id INT NOT NULL REFERENCES place_categories(id) ON DELETE RESTRICT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description_vi TEXT NOT NULL,
    description_en TEXT,
    address TEXT NOT NULL,
    coordinates GEOMETRY(Point, 4326) NOT NULL, -- Tọa độ chuẩn WGS84 (Lng, Lat)
    geofence_radius_meters INT DEFAULT 35, -- Bán kính radar GPS (mét)
    environment_type VARCHAR(20) DEFAULT 'OUTDOOR' CHECK (environment_type IN ('INDOOR', 'OUTDOOR', 'SEMI_OUTDOOR')),
    
    -- Thẻ phân loại phục vụ Vòng quay ngẫu nhiên và Lọc chuyên sâu
    tags TEXT[] DEFAULT ARRAY[]::TEXT[], 
    -- Ví dụ tags: ['CAFE_SONG_AO', 'CAFE_YEN_TINH', 'MON_NGON_TRUYEN_THONG', 'VIEW_DEM_SONG_HUONG', 'CHECKIN_NGOAI_THANH']

    best_time_to_visit VARCHAR(20) DEFAULT 'ANYTIME' CHECK (best_time_to_visit IN ('MORNING', 'AFTERNOON', 'NIGHT', 'DAY_AND_NIGHT', 'ANYTIME')),
    opening_time TIME,
    closing_time TIME,
    ticket_price_vnd NUMERIC(12, 2) DEFAULT 0.00,
    green_reward_points INT DEFAULT 25,
    rating_avg NUMERIC(3, 2) DEFAULT 5.00,
    review_count INT DEFAULT 0,
    thumbnail_url TEXT,
    gallery_images JSONB DEFAULT '[]'::jsonb,
    is_wheel_eligible BOOLEAN DEFAULT TRUE, -- Địa điểm có thể đưa vào Vòng quay Random
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Chỉ mục không gian PostGIS (Spatial Index - GiST) & chỉ mục tìm kiếm
CREATE INDEX IF NOT EXISTS idx_places_coordinates ON places USING GIST(coordinates);
CREATE INDEX IF NOT EXISTS idx_places_category_id ON places(category_id);
CREATE INDEX IF NOT EXISTS idx_places_environment ON places(environment_type);
CREATE INDEX IF NOT EXISTS idx_places_tags ON places USING GIN(tags);

-- ----------------------------------------------------------------------------
-- 4. BẢNG LỊCH TRÌNH CHUYẾN ĐI (ITINERARIES)
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
    completion_rate NUMERIC(5, 2) DEFAULT 0.00, -- 100.00% khi hoàn thành
    
    weather_adapted BOOLEAN DEFAULT FALSE,
    weather_notice TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_itineraries_user ON itineraries(user_id);
CREATE INDEX IF NOT EXISTS idx_itineraries_status ON itineraries(status);

-- ----------------------------------------------------------------------------
-- 5. BẢNG CHI TIẾT ĐỊA ĐIỂM TRONG LỊCH TRÌNH (ITINERARY_ITEMS)
-- Sắp xếp thứ tự tham quan, trạng thái đã check-in qua GPS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS itinerary_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    itinerary_id UUID NOT NULL REFERENCES itineraries(id) ON DELETE CASCADE,
    place_id UUID NOT NULL REFERENCES places(id) ON DELETE CASCADE,
    order_index INT NOT NULL, -- Thứ tự điểm đến trong chuỗi hành trình (1, 2, 3...)
    scheduled_time TIME,
    estimated_duration_minutes INT DEFAULT 60,
    transport_advice TEXT,
    
    -- Trạng thái Geofencing check-in
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
-- 6. BẢNG ĐÁNH GIÁ & NHẬN XÉT (REVIEWS)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    place_id UUID NOT NULL REFERENCES places(id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    photos JSONB DEFAULT '[]'::jsonb,
    is_verified_visit BOOLEAN DEFAULT FALSE, -- Đã qua Geofencing check-in thực tế
    helpful_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, place_id)
);

CREATE INDEX IF NOT EXISTS idx_reviews_place ON reviews(place_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);

-- ----------------------------------------------------------------------------
-- 7. BẢNG CHỨNG NHẬN ĐIỆN TỬ (CERTIFICATES) - GAMIFICATION E-CERTIFICATE
-- Tự động cấp khi hoàn thành 100% các điểm trong Lịch trình
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    certificate_code VARCHAR(50) UNIQUE NOT NULL, -- Ví dụ: 'HUEGO-CERT-2026-98F1'
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    itinerary_id UUID NOT NULL REFERENCES itineraries(id) ON DELETE CASCADE,
    recipient_name VARCHAR(150) NOT NULL, -- Tên in trên chứng nhận
    title VARCHAR(255) NOT NULL, -- 'CHỨNG NHẬN HOÀN THÀNH HÀNH TRÌNH CỐ ĐÔ HUẾ'
    total_places_completed INT NOT NULL,
    total_green_points_earned INT NOT NULL,
    total_carbon_saved_kg NUMERIC(6, 2) DEFAULT 0.00,
    completion_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    certificate_image_url TEXT, -- Link ảnh đã render sẵn để du khách lưu & share
    qr_verify_code TEXT NOT NULL, -- Mã QR xác thực chứng nhận trực tuyến
    digital_signature VARCHAR(255) NOT NULL, -- Chữ ký số mã hóa chống làm giả
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_certificates_user ON certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_code ON certificates(certificate_code);

-- ----------------------------------------------------------------------------
-- 8. BẢNG ĐÓNG GÓP ĐỊA ĐIỂM CỘNG ĐỒNG (CROWDSOURCE_SUBMISSIONS)
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
-- 9. DỮ LIỆU SEED MẪU: ĐỊA DANH TIÊU BIỂU TẠI HUẾ ĐẦY ĐỦ TIỆN ÍCH & TAGS
-- ----------------------------------------------------------------------------
INSERT INTO places (name, slug, category_id, description_vi, description_en, address, coordinates, geofence_radius_meters, environment_type, tags, best_time_to_visit, opening_time, closing_time, ticket_price_vnd, green_reward_points, thumbnail_url)
VALUES
(
  'Đại Nội Huế (Hoàng Thành & Tử Cấm Thành)',
  'dai-noi-hue',
  1,
  'Kinh thành của triều Nguyễn, di sản văn hóa thế giới UNESCO với kiến trúc cung điện vàng son.',
  'Imperial City of Hue, UNESCO World Heritage site featuring majestic royal palaces.',
  'Đường 23/8, Phường Thuận Hòa, TP Huế',
  ST_SetSRID(ST_MakePoint(107.5779, 16.4697), 4326),
  40,
  'OUTDOOR',
  ARRAY['DI_TICH_TRIEU_NGUYEN', 'CHECKIN_LICH_SU', 'UNESCO'],
  'MORNING',
  '07:30', '17:30', 200000, 30, 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375'
),
(
  'Cà Phê Muối Xứ Huế (Quán Gốc Nguyễn Huệ)',
  'ca-phe-muoi-nguyen-hue',
  2,
  'Nơi khai sinh ra món cà phê muối nức tiếng đất Cố Đô với lớp kem mặn béo ngậy độc đáo.',
  'The birthplace of Hue specialty salt coffee with delicate savory cream layer.',
  'Số 10 Nguyễn Huệ, Phường Vĩnh Ninh, TP Huế',
  ST_SetSRID(ST_MakePoint(107.5898, 16.4589), 4326),
  25,
  'INDOOR',
  ARRAY['CAFE_SONG_AO', 'CAFE_MUOI', 'DAC_SAN_HUE'],
  'ANYTIME',
  '06:30', '22:00', 25000, 20, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd'
),
(
  'Cà Phê Sân Vườn Nhà Rường La Pensée',
  'la-pensee-cafe-hue',
  2,
  'Không gian nhà vườn cổ kính bên sông đào Ngự Hà, góc chụp ảnh đậm nét thi vị xứ Huế.',
  'Vintage garden cafe along Ngu Ha canal, perfect aesthetic spot for photography.',
  'Đường Đặng Thái Thân, Thuận Thành, TP Huế',
  ST_SetSRID(ST_MakePoint(107.5742, 16.4735), 4326),
  30,
  'SEMI_OUTDOOR',
  ARRAY['CAFE_SONG_AO', 'CAFE_SAN_VUON', 'CHECKIN_VINTAGE'],
  'AFTERNOON',
  '07:00', '22:30', 40000, 20, 'https://images.unsplash.com/photo-1554118811-1e0d58224f24'
),
(
  'Cầu Tràng Tiền & Phố Đi Bộ Sông Hương',
  'cau-trang-tien-view-dem',
  4,
  'Cây cầu biểu tượng 6 vài 12 nhịp lung linh huyền ảo với hệ thống đèn đổi màu về đêm.',
  'Historic 6-span iron bridge illuminated with colorful lights reflecting on Perfume River.',
  'Cầu Tràng Tiền, TP Huế',
  ST_SetSRID(ST_MakePoint(107.5947, 16.4683), 4326),
  40,
  'OUTDOOR',
  ARRAY['VIEW_DEM_SONG_HUONG', 'CHECKIN_LANG_MAN', 'PHO_DI_BO'],
  'NIGHT',
  '00:00', '23:59', 0, 25, 'https://images.unsplash.com/photo-1528127269322-539801943592'
),
(
  'Đồi Vọng Cảnh & Rừng Thông Ngoại Thành',
  'doi-vong-canh-hue',
  5,
  'Nơi ngắm khúc uốn sông Hương đẹp nhất từ trên cao, không gian thông reo lộng gió.',
  'Spectacular panoramic viewpoint overlooking the winding Perfume River.',
  'Đồi Vọng Cảnh, Phường Thủy Biều, TP Huế',
  ST_SetSRID(ST_MakePoint(107.5512, 16.4258), 4326),
  50,
  'OUTDOOR',
  ARRAY['CHECKIN_NGOAI_THANH', 'VIEW_HOANG_HON', 'DU_LICH_XANH'],
  'AFTERNOON',
  '05:00', '18:30', 0, 30, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
),
(
  'Trạm Thuê Xe Đạp Công Cộng Xanh Eco-Bike',
  'tram-xe-dap-xanh-hien-nhon',
  8,
  'Điểm thuê và trả xe đạp thông minh quét mã QR ngay cổng Hiển Nhơn Đại Nội.',
  'Smart public bike-sharing dock with QR scanning right next to Hien Nhon Gate.',
  'Đường Đoàn Thị Điểm, Thuận Thành, TP Huế',
  ST_SetSRID(ST_MakePoint(107.5815, 16.4705), 4326),
  20,
  'OUTDOOR',
  ARRAY['TIEN_ICH', 'THUE_XE_DAP', 'DU_LICH_XANH'],
  'ANYTIME',
  '06:00', '22:00', 10000, 15, 'https://images.unsplash.com/photo-1485965120184-e220f721d03e'
),
(
  'Cây Xăng Petrolimex Trung Tâm Bờ Nam',
  'cay-xang-petrolimex-le-loi',
  7,
  'Trạm cấp nhiên liệu tiêu chuẩn 24/7 ngay trục đường chính Lê Lợi.',
  'Standard 24/7 gasoline station located on main Le Loi street.',
  'Số 14 Lê Lợi, Phường Vĩnh Ninh, TP Huế',
  ST_SetSRID(ST_MakePoint(107.5862, 16.4632), 4326),
  20,
  'OUTDOOR',
  ARRAY['TIEN_ICH', 'CAY_XANG'],
  'ANYTIME',
  '00:00', '23:59', 0, 5, 'https://images.unsplash.com/photo-1545459720-aac8509eb02c'
)
ON CONFLICT (slug) DO NOTHING;
