/**
 * HUEGO Comprehensive Internationalization (i18n) Engine
 * Dịch thuật toàn diện toàn bộ nền tảng Web & Dữ liệu Cố Đô Huế:
 *  - vi: Tiếng Việt (Mặc định)
 *  - en: English (Quốc tế)
 *  - fr: Français (Pháp & Châu Âu)
 *  - ko: 한국어 (Hàn Quốc)
 *  - ja: 日本語 (Nhật Bản)
 */

(function () {
  const SUPPORTED_LANGS = {
    vi: { name: 'Tiếng Việt', flag: '🇻🇳', code: 'vi' },
    en: { name: 'English', flag: '🇬🇧', code: 'en' },
    fr: { name: 'Français', flag: '🇫🇷', code: 'fr' },
    ko: { name: '한국어', flag: '🇰🇷', code: 'ko' },
    ja: { name: '日本語', flag: '🇯🇵', code: 'ja' },
  };

  const DICTIONARY = {
    vi: {
      site_title: 'HUEGO – Nền Tảng Du Lịch & Di Sản Thông Minh Cố Đô Huế',
      brand_tagline: 'CỐ ĐÔ HUẾ',
      nav_explore: 'Khám phá Huế',
      nav_guide: 'Cẩm nang Huế',
      nav_map: 'Bản đồ số Du lịch',
      nav_museum: 'Bảo tàng số 3D',
      nav_simulation: 'Mô phỏng 1 ngày',
      nav_essentials: 'Khẩn cấp & Hỗ trợ',
      nav_flight3d: 'Chuyến bay 3D Cố Đô ✨',
      nav_open_app: 'Mở App HUEGO 📱',
      search_placeholder: 'Tìm kiếm địa điểm, di tích, món ngon, quán cà phê Huế...',
      hero_title_prefix: 'Khám phá',
      hero_title_accent: 'Cố Đô Huế',
      hero_title_suffix: 'cùng Trợ lý HUEGO',
      hero_subtitle: 'Nền tảng du lịch thông minh kết hợp bản đồ số, bảo tàng 3D, thuyết minh audio và Trợ lý AI Mệ Huế bản địa am hiểu sâu sắc ẩm thực & lịch sử Cố Đô.',
      section_journeys: 'Hành trình gợi ý',
      section_places: 'Danh sách địa điểm khám phá',
      tab_all: '🌟 Tất cả địa điểm',
      tab_tour: '🏛️ Di tích & Tour',
      tab_fnb: '🍜 Ẩm thực & Quán ngon',
      tab_cafe: '☕ Cà phê & Chill',
      tab_stay: '🏨 Khách sạn & Nghỉ dưỡng',
      tab_craft: '🎁 Đặc sản làm quà',
      tab_eco: '🚗 Dịch vụ du lịch',
      weather_loading: 'Đang kết nối trạm thời tiết Huế...',
      weather_stale: '(Dữ liệu cache)',
      weather_humidity: 'Độ ẩm',
      weather_wind: 'Gió',
      weather_rec: 'Khuyến nghị du lịch',
      weather_feels_like: 'Cảm nhận nhiệt',
      weather_station: 'Trạm dữ liệu',
      weather_rain_sim: '🌧️ Giả lập mưa',
      weather_rain_on: '🌧️ Mưa: BẬT',
      weather_rain_off: '🌧️ Mưa: TẮT',
      weather_details_title: 'Thời tiết thực tế TP Huế',
      weather_open_details: 'Bấm xem chi tiết thời tiết & khuyến nghị',
      btn_audio_guide: 'Nghe Thuyết Minh',
      btn_audio_stop: 'Dừng Thuyết Minh',
      btn_audio_loading: 'Đang tải bài...',
      btn_itinerary: '🔖 Lịch trình',
      btn_add_itinerary: 'Lưu Lịch Trình',
      btn_saved_itinerary: '✓ Đã Lưu Lịch Trình',
      btn_details: 'Chi tiết',
      btn_close: 'Đóng',
      btn_view_ar: '📱 Xem trong không gian thật (AR)',
      btn_share: 'Chia sẻ lộ trình',
      btn_open_app_action: 'Mở App',
      btn_flight_3d: 'Chuyến bay 3D',
      btn_prev: '« Trước',
      btn_next: 'Sau »',
      btn_google_maps: 'Chỉ đường Google Maps',
      btn_digital_map: 'Bản đồ số',
      theme_dark: 'Giao diện Tối',
      theme_light: 'Giao diện Sáng',
      city_hue: 'Thành phố Huế',
      label_address: 'Địa chỉ',
      label_phone: 'Điện thoại',
      label_phone_empty: 'Chưa cập nhật số điện thoại',
      label_category: 'Phân loại',
      label_audio_guide_title: 'Audio Guide Cố Đô (Thuyết minh AI)',
      audio_guide_desc: 'Giọng đọc Cố Đô truyền cảm, tự động thuyết minh lịch sử, nét độc đáo và gợi ý trải nghiệm khi ghé thăm.',
      audio_guide_desc_place: 'Giọng đọc Cố Đô truyền cảm, tự động thuyết minh lịch sử, nét độc đáo và gợi ý trải nghiệm khi ghé {place}.',
      label_new: 'Mới',
      found_places: 'Tìm thấy {n} địa điểm',
      loading_places: 'Đang khám phá địa điểm Huế...',
      no_places_title: 'Không tìm thấy địa điểm phù hợp',
      no_places_desc: 'Vui lòng thử tìm kiếm với từ khóa khác hoặc chuyển danh mục.',
      // Footer
      footer_brand_desc: 'HUEGO — Nền tảng Du lịch Thông minh Cố Đô Huế. Kết nối di sản văn hóa ngàn năm với công nghệ Bản đồ số Geofencing, Bảo tàng 3D và Trợ lý AI Mệ Huế bản địa.',
      footer_hotline: '📞 Đường dây nóng du lịch Huế: 0234.3822288',
      footer_explore_title: 'Khám Phá Di Sản',
      footer_link_map: 'Bản đồ số 4.352 điểm',
      footer_link_museum: 'Bảo tàng 10 cổ vật 3D',
      footer_link_guide: 'Cẩm nang lịch trình Cố Đô',
      footer_link_simulation: 'Mô phỏng 1 ngày ở Huế',
      footer_services_title: 'Dịch Vụ & Hỗ Trợ',
      footer_emergency: 'Cứu hộ khẩn cấp 113/114/115',
      footer_hospital: 'Bệnh viện TW Huế',
      footer_app_online: '📱 Trải nghiệm App HUEGO Trực tuyến',
      footer_github: 'Mã nguồn dự án GitHub',
      footer_ai_title: 'Trợ Lý Du Lịch AI',
      footer_ai_desc: 'Trò chuyện 24/7 với Mệ Huế AI để được tư vấn quán ăn ngon, lộ trình di chuyển và giai thoại lịch sử theo thời tiết thực tế.',
      footer_ai_btn: '👑 Trò chuyện với Mệ Huế',
      footer_copyright: '© 2026 HUEGO — Dự Án Khởi Nghiệp Đổi Mới Sáng Tạo Du Lịch Cố Đô Huế.',
      footer_rights: 'Bảo lưu mọi quyền · Phát triển vì Di sản Việt Nam',
      // Mobile Nav
      mobile_nav_explore: 'Khám phá',
      mobile_nav_map: 'Bản đồ',
      mobile_nav_museum: 'Bảo tàng',
      mobile_nav_guide: 'Cẩm nang',
      mobile_nav_app: 'App Huế',
      // Floating AI Assistant
      ai_fab_title: 'Mệ Huế AI Guide',
      ai_header_sub: 'Trợ lý Cố Đô thông minh 24/7',
      ai_welcome_msg: 'Dạ Mệ chào quý khách nhen! Mệ là Trợ lý bản địa của HUEGO. Người muốn hỏi đường đi, tìm quán ăn ngon hay nghe giai thoại lịch sử chi ở Cố Đô cứ nói Mệ nghe!',
      ai_chip_food: '🍜 Ăn vặt Đại Nội',
      ai_chip_tombs: '🏛️ Lăng tẩm 1 buổi',
      ai_chip_salt_coffee: '☕ Cà phê muối',
      ai_chip_rain: '🌧️ Lịch trình ngày mưa',
      ai_input_placeholder: 'Hỏi Mệ Huế bất kỳ điều gì về Cố Đô...',
      // Mobile app simulator
      app_tab_map: 'Bản Đồ',
      app_tab_itinerary: 'Lộ Trình',
      app_tab_wheel: 'Vòng Quay',
      app_tab_ai: 'O Huế AI',
      app_tab_points: 'Chứng Nhận',
      app_points_title: 'Chứng Nhận Du Lịch Xanh Cố Đô',
      app_points_desc: 'Được công nhận bởi Sở Du Lịch & HUEGO khi hoàn thành hành trình khám phá di sản bền vững.',
      app_btn_export_pdf: 'Xuất E-Certificate (PDF)',
      app_btn_logout: 'Đăng xuất',
      app_btn_demo: 'Vào thử demo',
      app_auth_title: 'Đăng Nhập HUEGO',
      guide_hero_title: "Cẩm nang Du lịch Cố Đô Huế",
      guide_hero_sub: "Trọn bộ kinh nghiệm và lộ trình thiết kế tối ưu giúp bạn tận hưởng trọn vẹn văn hoá, ẩm thực và nhịp sống thanh bình xứ Huế.",
      guide_itineraries_heading: "Nếu bạn có 1, 2 hoặc 3 ngày",
      guide_tips_heading: "Trước khi lên đường",
      guide_faq_heading: "Hỏi nhanh trước chuyến đi",
      faq_q1: "Vé tham quan các di tích Huế mua ở đâu?",
      faq_a1: "Bạn có thể mua vé trực tiếp tại quầy vé cổng Ngọ Môn (Đại Nội) hoặc quầy vé tại các lăng tẩm. Có bán vé tuyến gộp (Đại Nội + 3 lăng lớn: Khải Định, Tự Đức, Minh Mạng) với giá ưu đãi hơn mua lẻ.",
      faq_q2: "Nên đi Huế vào mùa nào đẹp nhất trong năm?",
      faq_a2: "Thời điểm đẹp nhất là từ tháng 1 đến tháng 4 (mùa xuân nắng dịu mát, cây cối xanh tươi) và tháng 5 đến tháng 8 (mùa hè nắng rực rỡ, thích hợp tắm biển Thuận An, ngắm phá Tam Giang).",
      faq_q3: "Đặc sản nào ở Huế mua về làm quà biếu ngon nhất?",
      faq_a3: "Mè xửng Thiên Hương, kẹo cau, trà cung đình Huế, nem chả tré Huế, dầu tràm Lộc Thủy và tôm chua Trọng Tín.",
      museum_hero_title: "Trải nghiệm số Bảo tàng Cung đình 3D",
      museum_hero_sub: "Tương tác xoay 360 độ và chiêm ngưỡng các cổ vật bảo vật vô giá của vương triều nhà Nguyễn.",
      museum_hint_3d: "Kéo chuột để xoay 360° | Cuộn để phóng to",
      museum_origin_badge: "👑 Bảo tàng Cổ vật Cung đình Huế",
      sim_hero_title: "Mô phỏng 1 ngày ở Huế",
      sim_hero_sub: "Trải nghiệm thử nhịp sống một ngày từ sáng sớm ngắm bình minh sông Hương, dạo chợ Đông Ba đến đêm nghe ca Huế trên sông.",
      sim_btn_generate: "Tạo Lịch Trình Mô Phỏng",
      sim_morning: "🌅 Sáng sớm",
      sim_noon: "☀️ Buổi trưa",
      sim_afternoon: "🌤️ Buổi chiều",
      sim_evening: "🌙 Buổi tối",
      essentials_hero_title: "Khẩn cấp & Thông tin Hỗ trợ",
      essentials_hero_sub: "Các đầu số cứu hộ khẩn cấp, bệnh viện, công an và đường dây nóng hỗ trợ du khách 24/7 khi lưu trú tại TP Huế.",
      essentials_police: "Cảnh sát phản ứng nhanh",
      essentials_fire: "Cứu hỏa & Cứu nạn",
      essentials_ambulance: "Cấp cứu y tế",
      essentials_tourist_hotline: "Đường dây nóng du lịch Huế",
      map_count_label: "30 di tích Cố Đô · Hiển thị 30 điểm",
      map_filter_all: "Tất cả",
      map_filter_imperial: "Hoàng thành & Lăng tẩm",
      map_filter_nature: "Thiên nhiên",
      map_filter_pagodas: "Chùa chiền & Đền miếu",
      map_filter_bridges: "Cầu, Chợ & Bảo tàng",
      map_filter_other: "Địa danh khác",
      map_hint_click: "Nhấp vào điểm trên bản đồ hoặc danh sách bên trái để xem chi tiết di tích.",
      flight_nav_river: "Sông Hương",
      flight_nav_thienmu: "Thiên Mụ",
      flight_nav_tombs: "Lăng Tẩm",
      flight_nav_experience: "Trải Nghiệm 3D",
      flight_nav_back: "Vào Web HUEGO ↗",
      flight_hero_title: "HUEGO — Chạm Vào Di Sản Cố Đô Huế",
      flight_hero_sub: "Ứng dụng du lịch thông minh dẫn lối du khách bay xuyên không gian 3D, tái hiện vàng son triều Nguyễn qua lăng kính công nghệ số.",
      flight_btn_start: "Bay Khám Phá 3D",
      flight_scroll_prompt: "Cuộn để cất cánh qua Xứ Huế",
    },
    en: {
      site_title: 'HUEGO – Smart Tourism & Heritage Platform for Hue Ancient Capital',
      brand_tagline: 'HUE IMPERIAL CAPITAL',
      nav_explore: 'Explore Hue',
      nav_guide: 'Travel Guide',
      nav_map: 'Digital Heritage Map',
      nav_museum: '3D Virtual Museum',
      nav_simulation: '1-Day Simulator',
      nav_essentials: 'Emergency & Support',
      nav_flight3d: '3D Heritage Flight ✨',
      nav_open_app: 'Open HUEGO App 📱',
      search_placeholder: 'Search landmarks, historical monuments, local dishes, cafes in Hue...',
      hero_title_prefix: 'Explore',
      hero_title_accent: 'Hue Imperial Capital',
      hero_title_suffix: 'with HUEGO AI Guide',
      hero_subtitle: 'Smart tourism platform integrating digital maps, 3D artifacts, authentic audio guides, and native AI Me Hue with deep insights into Nguyen Dynasty history and royal gastronomy.',
      section_journeys: 'Suggested Journeys',
      section_places: 'Explore All Destinations',
      tab_all: '🌟 All Places',
      tab_tour: '🏛️ Heritage & Tours',
      tab_fnb: '🍜 Food & Gastronomy',
      tab_cafe: '☕ Cafes & Chill',
      tab_stay: '🏨 Hotels & Resorts',
      tab_craft: '🎁 Local Gifts & Souvenirs',
      tab_eco: '🚗 Travel Services',
      weather_loading: 'Connecting to Hue weather station...',
      weather_stale: '(Cached data)',
      weather_humidity: 'Humidity',
      weather_wind: 'Wind',
      weather_rec: 'Travel Recommendation',
      weather_feels_like: 'Feels like',
      weather_station: 'Data Station',
      weather_rain_sim: '🌧️ Rain Sim',
      weather_rain_on: '🌧️ Rain: ON',
      weather_rain_off: '🌧️ Rain: OFF',
      weather_details_title: 'Live Meteorological Station · Hue City',
      weather_open_details: 'Click for detailed weather & recommendations',
      btn_audio_guide: 'Audio Guide',
      btn_audio_stop: 'Stop Audio',
      btn_audio_loading: 'Loading audio...',
      btn_itinerary: '🔖 Itinerary',
      btn_add_itinerary: 'Save Itinerary',
      btn_saved_itinerary: '✓ Saved to Itinerary',
      btn_details: 'Details',
      btn_close: 'Close',
      btn_view_ar: '📱 View in Real Space (AR)',
      btn_share: 'Share Itinerary',
      btn_open_app_action: 'Open App',
      btn_flight_3d: '3D Flight',
      btn_prev: '« Prev',
      btn_next: 'Next »',
      btn_google_maps: 'Google Maps Directions',
      btn_digital_map: 'Digital Map',
      theme_dark: 'Dark Mode',
      theme_light: 'Light Mode',
      city_hue: 'Hue City',
      label_address: 'Address',
      label_phone: 'Phone',
      label_phone_empty: 'Phone not available',
      label_category: 'Category',
      label_audio_guide_title: 'Imperial Audio Guide (AI Narrator)',
      audio_guide_desc: 'Authentic imperial storytelling, revealing centuries of history and local tips when visiting this landmark.',
      audio_guide_desc_place: 'Authentic imperial storytelling, revealing centuries of history and local tips when visiting {place}.',
      label_new: 'New',
      found_places: 'Found {n} places',
      loading_places: 'Discovering Hue landmarks...',
      no_places_title: 'No matching destinations found',
      no_places_desc: 'Please try searching with another keyword or switch category.',
      // Footer
      footer_brand_desc: 'HUEGO — Smart Tourism Platform for Hue Ancient Capital. Connecting millennia of royal heritage with Geofencing digital maps, 3D Museum, and native AI Me Hue.',
      footer_hotline: '📞 Hue Tourism Hotline: +84 234 3822288',
      footer_explore_title: 'Explore Heritage',
      footer_link_map: 'Digital Map (4,352 places)',
      footer_link_museum: '3D Virtual Museum (10 relics)',
      footer_link_guide: 'Hue Travel Guides & Itineraries',
      footer_link_simulation: '1-Day Hue Simulator',
      footer_services_title: 'Services & Support',
      footer_emergency: 'Emergency Services 113/114/115',
      footer_hospital: 'Hue Central Hospital',
      footer_app_online: '📱 Experience HUEGO App Online',
      footer_github: 'GitHub Project Repository',
      footer_ai_title: 'AI Travel Assistant',
      footer_ai_desc: 'Chat 24/7 with Me Hue AI for authentic culinary gems, routes, and historical legends adapted to real-time weather.',
      footer_ai_btn: '👑 Chat with Me Hue AI',
      footer_copyright: '© 2026 HUEGO — Smart Tourism Innovation Project for Hue Ancient Capital.',
      footer_rights: 'All rights reserved · Developed for Vietnam Heritage',
      // Mobile Nav
      mobile_nav_explore: 'Explore',
      mobile_nav_map: 'Map',
      mobile_nav_museum: 'Museum',
      mobile_nav_guide: 'Guide',
      mobile_nav_app: 'App',
      // Floating AI Assistant
      ai_fab_title: 'Me Hue AI Guide',
      ai_header_sub: '24/7 Smart Imperial Guide',
      ai_welcome_msg: 'Warm greetings from Hue! I am Me Hue, your native AI guide from HUEGO. Feel free to ask me for authentic dining spots, directions, or imperial history tales!',
      ai_chip_food: '🍜 Citadel Street Snacks',
      ai_chip_tombs: '🏛️ Half-day Royal Tombs',
      ai_chip_salt_coffee: '☕ Authentic Salt Coffee',
      ai_chip_rain: '🌧️ Rainy Day Tour',
      ai_input_placeholder: 'Ask Me Hue about food, history, or routes...',
      // Mobile app simulator
      app_tab_map: 'Map',
      app_tab_itinerary: 'Itinerary',
      app_tab_wheel: 'Lucky Spin',
      app_tab_ai: 'Hue AI Guide',
      app_tab_points: 'Certificate',
      app_points_title: 'Hue Green Tourism Certificate',
      app_points_desc: 'Officially certified by Hue Tourism Department & HUEGO upon completing sustainable heritage exploration.',
      app_btn_export_pdf: 'Export E-Certificate (PDF)',
      app_btn_logout: 'Logout',
      app_btn_demo: 'Try Demo Mode',
      app_auth_title: 'HUEGO Login',
      guide_hero_title: "Hue Travel Guides & Itineraries",
      guide_hero_sub: "Curated experiences and optimized routes helping you immerse fully in imperial culture, gastronomy, and the poetic lifestyle of Hue.",
      guide_itineraries_heading: "If you have 1, 2 or 3 days",
      guide_tips_heading: "Essential Travel Tips",
      guide_faq_heading: "Frequently Asked Questions",
      faq_q1: "Where to purchase tickets for Hue heritage sites?",
      faq_a1: "You can buy tickets directly at the Ngo Mon ticket counter (Imperial Citadel) or at tomb entrances. Discounted combo passes (Citadel + 3 major tombs: Khai Dinh, Tu Duc, Minh Mang) are available.",
      faq_q2: "Which season is the best time to visit Hue?",
      faq_a2: "The ideal period is January to April (mild spring weather and lush blooming gardens) and May to August (sunny summer, ideal for Thuan An beach and Tam Giang lagoon sunsets).",
      faq_q3: "What are the best Hue specialties to buy as gifts?",
      faq_a3: "Thien Huong sesame candy (me xung), royal herbal tea, Hue fermented pork rolls (tre), Melaleuca cajeput essential oil, and pickled baby shrimp (tom chua).",
      museum_hero_title: "3D Virtual Royal Museum Experience",
      museum_hero_sub: "Interact with 360-degree rotations and admire priceless royal artifacts of the Nguyen Dynasty.",
      museum_hint_3d: "Drag mouse to rotate 360° | Scroll to zoom",
      museum_origin_badge: "👑 Hue Royal Antiquities Museum",
      sim_hero_title: "1-Day Hue Simulator",
      sim_hero_sub: "Experience a virtual day in Hue from dawn by the Perfume River, exploring Dong Ba market, to an evening royal folk music boat cruise.",
      sim_btn_generate: "Generate Day Simulator",
      sim_morning: "🌅 Early Morning",
      sim_noon: "☀️ Noon & Lunch",
      sim_afternoon: "🌤️ Afternoon",
      sim_evening: "🌙 Night & River Cruise",
      essentials_hero_title: "Emergency & Traveler Support",
      essentials_hero_sub: "Hotlines, hospitals, emergency contacts, and 24/7 tourist assistance numbers in Hue City.",
      essentials_police: "Rapid Response Police (113)",
      essentials_fire: "Fire & Rescue (114)",
      essentials_ambulance: "Medical Emergency (115)",
      essentials_tourist_hotline: "Hue Tourist Support Hotline",
      map_count_label: "30 Hue heritage sites · 30 shown",
      map_filter_all: "All",
      map_filter_imperial: "Imperial & Tombs",
      map_filter_nature: "Nature",
      map_filter_pagodas: "Temples & Pagodas",
      map_filter_bridges: "Bridges, Markets & Museums",
      map_filter_other: "Other Landmarks",
      map_hint_click: "Click on a map marker or the left list to view detailed landmark information.",
      flight_nav_river: "Perfume River",
      flight_nav_thienmu: "Thien Mu Pagoda",
      flight_nav_tombs: "Royal Tombs",
      flight_nav_experience: "3D Experience",
      flight_nav_back: "Enter HUEGO Web ↗",
      flight_hero_title: "HUEGO — Touch The Imperial Heritage",
      flight_hero_sub: "Smart tourism application guiding you through immersive 3D flights, recreating the golden Nguyen Dynasty through digital twin technology.",
      flight_btn_start: "Fly & Discover 3D",
      flight_scroll_prompt: "Scroll to take flight over Hue",
    },
    fr: {
      site_title: 'HUEGO – Tourisme Intelligent & Patrimoine Impérial de Hué',
      brand_tagline: 'CITÉ IMPÉRIALE DE HUÉ',
      nav_explore: 'Découvrir Hué',
      nav_guide: 'Guide Pratique',
      nav_map: 'Carte Numérique',
      nav_museum: 'Musée 3D Virtuel',
      nav_simulation: 'Simulation 1 Jour',
      nav_essentials: 'Urgences & Assistance',
      nav_flight3d: 'Vol 3D du Patrimoine ✨',
      nav_open_app: 'Ouvrir l\'App HUEGO 📱',
      search_placeholder: 'Rechercher monuments, citadelle, gastronomie, cafés à Hué...',
      hero_title_prefix: 'Explorez',
      hero_title_accent: 'L\'Ancienne Cité de Hué',
      hero_title_suffix: 'avec l\'Assistant HUEGO',
      hero_subtitle: 'Plateforme touristique intelligente associant cartographie SIG, musée 3D, récits audio et l\'Assistant IA Mê Hué pour une immersion dans les 13 règnes de la dynastie Nguyen.',
      section_journeys: 'Circuits Recommandés',
      section_places: 'Tous les Sites à Visiter',
      tab_all: '🌟 Tous les sites',
      tab_tour: '🏛️ Monuments & Visites',
      tab_fnb: '🍜 Gastronomie & Saveurs',
      tab_cafe: '☕ Cafés & Détente',
      tab_stay: '🏨 Hôtels & Séjours',
      tab_craft: '🎁 Cadeaux & Souvenirs',
      tab_eco: '🚗 Services Touristiques',
      weather_loading: 'Connexion à la station météo de Hué...',
      weather_stale: '(Données en cache)',
      weather_humidity: 'Humidité',
      weather_wind: 'Vent',
      weather_rec: 'Conseil de visite',
      weather_feels_like: 'Ressenti',
      weather_station: 'Station météo',
      weather_rain_sim: '🌧️ Simulation pluie',
      weather_rain_on: '🌧️ Pluie: ON',
      weather_rain_off: '🌧️ Pluie: OFF',
      weather_details_title: 'Station Météorologique en Direct · Ville de Hué',
      weather_open_details: 'Cliquez pour météo détaillée et conseils',
      btn_audio_guide: 'Écouter le récit',
      btn_audio_stop: 'Arrêter l\'audio',
      btn_audio_loading: 'Chargement...',
      btn_itinerary: '🔖 Mon itinéraire',
      btn_add_itinerary: 'Enregistrer le circuit',
      btn_saved_itinerary: '✓ Enregistré',
      btn_details: 'Détails',
      btn_close: 'Fermer',
      btn_view_ar: '📱 Voir en réalité augmentée (AR)',
      btn_share: 'Partager l\'itinéraire',
      btn_open_app_action: 'Lancer l\'App',
      btn_flight_3d: 'Survol 3D',
      btn_prev: '« Préc',
      btn_next: 'Suiv »',
      btn_google_maps: 'Itinéraire Google Maps',
      btn_digital_map: 'Carte numérique',
      theme_dark: 'Mode Sombre',
      theme_light: 'Mode Clair',
      city_hue: 'Ville de Hué',
      label_address: 'Adresse',
      label_phone: 'Téléphone',
      label_phone_empty: 'Téléphone non communiqué',
      label_category: 'Catégorie',
      label_audio_guide_title: 'Audioguide Impérial (Récit IA)',
      audio_guide_desc: 'Récit audio immersif dévoilant l\'histoire royale et les conseils pratiques lors de votre passage.',
      audio_guide_desc_place: 'Récit audio immersif dévoilant l\'histoire royale et les conseils pratiques lors de votre visite à {place}.',
      label_new: 'Nouveau',
      found_places: '{n} lieux trouvés',
      loading_places: 'Chargement des sites de Hué...',
      no_places_title: 'Aucun site correspondant',
      no_places_desc: 'Essayez un autre mot-clé ou sélectionnez une autre catégorie.',
      // Footer
      footer_brand_desc: 'HUEGO — Plateforme de tourisme intelligent pour l\'Ancienne Capitale de Hué. Alliance du patrimoine impérial et des technologies numériques 3D & IA.',
      footer_hotline: '📞 Assistance touristique Hué: +84 234 3822288',
      footer_explore_title: 'Explorer le Patrimoine',
      footer_link_map: 'Carte numérique (4 352 lieux)',
      footer_link_museum: 'Musée 3D Virtuel (10 trésors)',
      footer_link_guide: 'Guides & Itinéraires de Hué',
      footer_link_simulation: 'Simulation 1 Jour à Hué',
      footer_services_title: 'Services & Assistance',
      footer_emergency: 'Urgences 113/114/115',
      footer_hospital: 'Hôpital Central de Hué',
      footer_app_online: '📱 Tester l\'App HUEGO en ligne',
      footer_github: 'Dépôt GitHub du projet',
      footer_ai_title: 'Assistant Touristique IA',
      footer_ai_desc: 'Dialogue 24/7 avec Mê Hué IA pour des recommandations gastronomiques et anecdotes historiques en temps réel.',
      footer_ai_btn: '👑 Discuter avec Mê Hué',
      footer_copyright: '© 2026 HUEGO — Projet d\'Innovation Touristique pour Hué.',
      footer_rights: 'Tous droits réservés · Développé pour le patrimoine vietnamien',
      // Mobile Nav
      mobile_nav_explore: 'Découvrir',
      mobile_nav_map: 'Carte',
      mobile_nav_museum: 'Musée',
      mobile_nav_guide: 'Guide',
      mobile_nav_app: 'App',
      // Floating AI Assistant
      ai_fab_title: 'Guide IA Mê Hué',
      ai_header_sub: 'Guide intelligent Cố Đô 24/7',
      ai_welcome_msg: 'Bonjour et bienvenue à Hué ! Je suis Mê Hué, votre assistante IA locale. N\'hésitez pas à me demander les meilleures adresses, itinéraires ou légendes historiques !',
      ai_chip_food: '🍜 Street-food Citadelle',
      ai_chip_tombs: '🏛️ Mausolées (demi-journée)',
      ai_chip_salt_coffee: '☕ Café salé authentique',
      ai_chip_rain: '🌧️ Visite par temps de pluie',
      ai_input_placeholder: 'Demandez conseil à Mê Hué...',
      // Mobile app simulator
      app_tab_map: 'Carte',
      app_tab_itinerary: 'Itinéraire',
      app_tab_wheel: 'Roue Di Sản',
      app_tab_ai: 'Guide IA Hué',
      app_tab_points: 'Certificat',
      app_points_title: 'Certificat de Tourisme Vert de Hué',
      app_points_desc: 'Reconnu par le Service du Tourisme de Hué & HUEGO pour votre parcours éco-responsable.',
      app_btn_export_pdf: 'Télécharger E-Certificat (PDF)',
      app_btn_logout: 'Déconnexion',
      app_btn_demo: 'Tester la Démo',
      app_auth_title: 'Connexion HUEGO',
      guide_hero_title: "Guide Pratique & Itinéraires de Hué",
      guide_hero_sub: "Circuits recommandés et conseils pratiques pour vivre pleinement la culture royale, la haute gastronomie et la douceur de vivre de Hué.",
      guide_itineraries_heading: "Si vous avez 1, 2 ou 3 jours",
      guide_tips_heading: "Conseils avant de partir",
      guide_faq_heading: "Questions Fréquentes",
      faq_q1: "Où acheter les billets d'entrée aux monuments ?",
      faq_a1: "Vous pouvez acheter vos billets au guichet de la porte du Midi (Ngo Mon - Citadelle) ou à l'entrée des mausolées. Des forfaits combinés (Citadelle + 3 grands tombeaux) sont proposés à tarif préférentiel.",
      faq_q2: "Quelle est la meilleure saison pour visiter Hué ?",
      faq_a2: "La meilleure période s'étend de janvier à avril (printemps doux et verdoyant) et de mai à août (été ensoleillé, idéal pour la lagune de Tam Giang et la plage de Thuan An).",
      faq_q3: "Quelles spécialités culinaires rapporter en souvenir ?",
      faq_a3: "Le nougat au sésame Me Xung, le thé impérial aux plantes médicinales, les charcuteries Nem Tre et l'huile essentielle de cajeput de Loc Thuy.",
      museum_hero_title: "Expérience Numérique du Musée Royal 3D",
      museum_hero_sub: "Interagissez en 360° et admirez les trésors inestimables de la dynastie impériale des Nguyen.",
      museum_hint_3d: "Glissez pour tourner à 360° | Molette pour zoomer",
      museum_origin_badge: "👑 Musée des Antiquités Royales de Hué",
      sim_hero_title: "Simulation 1 Jour à Hué",
      sim_hero_sub: "Vivez une journée type à Hué : lever du soleil sur le fleuve des Parfums, marché Dong Ba et chants impériaux sur barque dragon en soirée.",
      sim_btn_generate: "Générer l'Itinéraire Simulé",
      sim_morning: "🌅 Matinée",
      sim_noon: "☀️ Déjeuner",
      sim_afternoon: "🌤️ Après-midi",
      sim_evening: "🌙 Soirée fluviale",
      essentials_hero_title: "Urgences & Assistance Voyageurs",
      essentials_hero_sub: "Numéros d'urgence, hôpitaux, police et ligne d'assistance touristique 24h/24 à Hué.",
      essentials_police: "Police Secours (113)",
      essentials_fire: "Pompiers & Secours (114)",
      essentials_ambulance: "Urgences Médicales (115)",
      essentials_tourist_hotline: "Assistance Touristique de Hué",
      map_count_label: "30 sites impériaux · 30 affichés",
      map_filter_all: "Tous",
      map_filter_imperial: "Citadelle & Tombeaux",
      map_filter_nature: "Nature",
      map_filter_pagodas: "Pagodes & Temples",
      map_filter_bridges: "Ponts, Marchés & Musées",
      map_filter_other: "Autres Sites",
      map_hint_click: "Cliquez sur un marqueur ou sur la liste pour voir les détails du site.",
      flight_nav_river: "Rivière des Parfums",
      flight_nav_thienmu: "Pagode Thien Mu",
      flight_nav_tombs: "Tombeaux Royaux",
      flight_nav_experience: "Expérience 3D",
      flight_nav_back: "Aller au Web HUEGO ↗",
      flight_hero_title: "HUEGO — Plongez dans l'Histoire de Hué",
      flight_hero_sub: "Application de tourisme intelligent offrant des vols cinématiques 3D au cœur de la dynastie royale.",
      flight_btn_start: "Décoller en 3D",
      flight_scroll_prompt: "Faites défiler pour survoler Hué",
    },
    ko: {
      site_title: 'HUEGO – 후에 스마트 관광 & 고도 문화유산 플랫폼',
      brand_tagline: '베트남 고도 후에',
      nav_explore: '후에 탐방',
      nav_guide: '여행 가이드',
      nav_map: '디지털 유산 지도',
      nav_museum: '3D 가상 박물관',
      nav_simulation: '1일 체험 시뮬레이터',
      nav_essentials: '긴급 연락 & 도움',
      nav_flight3d: '3D 고도 비행 체험 ✨',
      nav_open_app: 'HUEGO 앱 열기 📱',
      search_placeholder: '후에의 명소, 황실 유적지, 맛집, 감성 카페 검색...',
      hero_title_prefix: '천년의 역사',
      hero_title_accent: '고도 후에(Hue)',
      hero_title_suffix: 'HUEGO AI와 함께 여행하기',
      hero_subtitle: '정밀 GIS 디지털 지도, 3D 황실 보물 박물관, 생생한 오디오 가이드, 응우옌 왕조 역사와 궁중 요리에 정통한 로컬 AI 메 후에(Me Hue)가 안내하는 스마트 관광.',
      section_journeys: '추천 여행 코스',
      section_places: '후에 전체 명소 둘러보기',
      tab_all: '🌟 모든 장소',
      tab_tour: '🏛️ 유적지 & 황릉 투어',
      tab_fnb: '🍜 궁중요리 & 전통맛집',
      tab_cafe: '☕ 카페 & 힐링 스팟',
      tab_stay: '🏨 호텔 & 리조트',
      tab_craft: '🎁 후에 특산품 & 기념품',
      tab_eco: '🚗 여행 편의 서비스',
      weather_loading: '후에 기상대 실시간 연결 중...',
      weather_stale: '(캐시된 정보)',
      weather_humidity: '습도',
      weather_wind: '바람',
      weather_rec: '여행 추천',
      weather_feels_like: '체감 온도',
      weather_station: '관측소',
      weather_rain_sim: '🌧️ 비 시뮬레이션',
      weather_rain_on: '🌧️ 비: 켜짐',
      weather_rain_off: '🌧️ 비: 꺼짐',
      weather_details_title: '후에시 실시간 기상 관측소',
      weather_open_details: '상세 날씨 및 여행 팁 보기',
      btn_audio_guide: '오디오 가이드 듣기',
      btn_audio_stop: '재생 중지',
      btn_audio_loading: '음성 로딩 중...',
      btn_itinerary: '🔖 나의 여행 일정',
      btn_add_itinerary: '일정에 저장',
      btn_saved_itinerary: '✓ 저장 완료',
      btn_details: '상세보기',
      btn_close: '닫기',
      btn_view_ar: '📱 증강현실(AR)로 보기',
      btn_share: '일정 공유',
      btn_open_app_action: '앱 실행',
      btn_flight_3d: '3D 비행',
      btn_prev: '« 이전',
      btn_next: '다음 »',
      btn_google_maps: '구글 지도 길찾기',
      btn_digital_map: '디지털 지도',
      theme_dark: '다크 모드',
      theme_light: '라이트 모드',
      city_hue: '후에시',
      label_address: '주소',
      label_phone: '전화번호',
      label_phone_empty: '전화번호 정보 없음',
      label_category: '분류',
      label_audio_guide_title: '후에 황실 오디오 가이드 (AI 해설)',
      audio_guide_desc: '후에 고도의 숨겨진 역사와 문화, 방문 꿀팁을 생생하게 들려주는 음성 해설 서비스입니다.',
      audio_guide_desc_place: '{place}의 숨겨진 역사와 문화, 방문 꿀팁을 생생하게 들려주는 음성 해설입니다.',
      label_new: '신규',
      found_places: '{n}개 명소 발견',
      loading_places: '후에의 명소를 검색 중입니다...',
      no_places_title: '검색 결과가 없습니다',
      no_places_desc: '다른 검색어를 입력하시거나 카테고리를 변경해 보세요.',
      // Footer
      footer_brand_desc: 'HUEGO — 베트남 고도 후에 스마트 관광 플랫폼. 수천 년 왕조 유산과 지능형 GIS 지도, 3D 가상 박물관, 로컬 AI 메 후에를 결합했습니다.',
      footer_hotline: '📞 후에 관광 핫라인: +84 234 3822288',
      footer_explore_title: '문화유산 탐방',
      footer_link_map: '4,352개 명소 디지털 지도',
      footer_link_museum: '10대 황실 보물 3D 가상 박물관',
      footer_link_guide: '후에 여행 가이드 & 추천 일정',
      footer_link_simulation: '후에에서의 하루 시뮬레이션',
      footer_services_title: '서비스 & 지원',
      footer_emergency: '긴급 구조 113/114/115',
      footer_hospital: '후에 중앙병원',
      footer_app_online: '📱 HUEGO 앱 온라인 체험',
      footer_github: 'GitHub 프로젝트 저장소',
      footer_ai_title: 'AI 여행 어시스턴트',
      footer_ai_desc: '실시간 날씨에 맞춘 로컬 맛집 추천, 최적 동선, 흥미진진한 역사 이야기를 24시간 메 후에 AI와 대화해 보세요.',
      footer_ai_btn: '👑 메 후에 AI와 대화하기',
      footer_copyright: '© 2026 HUEGO — 후에 스마트 관광 혁신 프로젝트.',
      footer_rights: 'All rights reserved · 베트남 문화유산을 위해 개발됨',
      // Mobile Nav
      mobile_nav_explore: '탐방',
      mobile_nav_map: '지도',
      mobile_nav_museum: '박물관',
      mobile_nav_guide: '가이드',
      mobile_nav_app: '앱',
      // Floating AI Assistant
      ai_fab_title: '메 후에 AI 가이드',
      ai_header_sub: '24시간 스마트 고도 가이드',
      ai_welcome_msg: '반갑습니다! 저는 HUEGO의 로컬 AI 가이드 메 후에입니다. 맛집 추천이나 길 찾기, 후에 황실 역사에 대해 무엇이든 편하게 물어보세요!',
      ai_chip_food: '🍜 황성 골목 먹거리',
      ai_chip_tombs: '🏛️ 반나절 황릉 투어',
      ai_chip_salt_coffee: '☕ 원조 소금 커피 맛집',
      ai_chip_rain: '🌧️ 비 오는 날 추천 코스',
      ai_input_placeholder: '후에 여행에 관해 무엇이든 물어보세요...',
      // Mobile app simulator
      app_tab_map: '지도',
      app_tab_itinerary: '일정',
      app_tab_wheel: '유산 룰렛',
      app_tab_ai: '후에 AI',
      app_tab_points: '인증서',
      app_points_title: '후에 그린 투어리즘 전자 인증서',
      app_points_desc: '지속 가능한 탄소 절감 유산 답사를 완료하여 후에 관광청과 HUEGO에서 공식 인증합니다.',
      app_btn_export_pdf: 'E-인증서 발급 (PDF)',
      app_btn_logout: '로그아웃',
      app_btn_demo: '데모 체험하기',
      app_auth_title: 'HUEGO 로그인',
      guide_hero_title: "후에 여행 가이드 & 추천 코스",
      guide_hero_sub: "천년 고도의 찬란한 황실 문화와 로컬 미식, 고즈넉한 정취를 완벽하게 즐길 수 있는 맞춤형 여행 안내서.",
      guide_itineraries_heading: "1일, 2일, 3일 추천 일정",
      guide_tips_heading: "여행 전 필수 체크리스트",
      guide_faq_heading: "자주 묻는 질문 (FAQ)",
      faq_q1: "후에 유적지 입장권은 어디서 구매하나요?",
      faq_a1: "후에 황성 응오문(Ngọ Môn) 매표소나 각 황릉 입구에서 현장 구매하실 수 있습니다. 황성과 카이딘·뜨득·민망 3대 황릉을 묶은 통합 할인권 구매를 추천합니다.",
      faq_q2: "후에를 여행하기 가장 좋은 계절은 언제인가요?",
      faq_a2: "1월부터 4월(따스하고 쾌적한 봄 날씨)과 5월부터 8월(화창한 여름으로 투언안 해변 및 땀장 석양 감상에 적합)이 가장 좋습니다.",
      faq_q3: "후에에서 사 올 만한 대표 기념품은 무엇인가요?",
      faq_a3: "티엔흐엉 전통 깨엿(Mè xửng), 황실 궁중 한방차, 트레(Tré) 발효 소시지, 록투이 카유풋 천연 오일이 가장 유명합니다.",
      museum_hero_title: "후에 3D 가상 궁중유물박물관",
      museum_hero_sub: "360도 회전하며 응우옌 왕조의 국보급 황실 보물을 생생하게 감상해 보세요.",
      museum_hint_3d: "마우스 드래그로 360° 회전 | 휠 스크롤로 확대",
      museum_origin_badge: "👑 후에 궁중유물박물관",
      sim_hero_title: "후에에서의 하루 체험 시뮬레이터",
      sim_hero_sub: "흐엉강의 아침 일출부터 동바 시장 탐방, 밤의 황실 용선 음악 공연까지 하루 일정을 미리 시뮬레이션해 보세요.",
      sim_btn_generate: "1일 시뮬레이션 일정 생성",
      sim_morning: "🌅 이른 아침",
      sim_noon: "☀️ 점심 & 로컬 미식",
      sim_afternoon: "🌤️ 오후 유적 답사",
      sim_evening: "🌙 밤의 흐엉강 유람선",
      essentials_hero_title: "긴급 연락처 & 여행자 지원 안내",
      essentials_hero_sub: "후에 여행 중 24시간 이용 가능한 응급 의료, 경찰, 소방 및 관광 핫라인 정보입니다.",
      essentials_police: "경찰 긴급출동 (113)",
      essentials_fire: "소방 및 구조 (114)",
      essentials_ambulance: "응급의료 구급 (115)",
      essentials_tourist_hotline: "후에 관광 종합 핫라인",
      map_count_label: "30개 고도 문화유산 · 30개 표시 중",
      map_filter_all: "전체",
      map_filter_imperial: "황성 & 황릉",
      map_filter_nature: "자연 경관",
      map_filter_pagodas: "사찰 & 사당",
      map_filter_bridges: "다리·시장·박물관",
      map_filter_other: "기타 명소",
      map_hint_click: "지도 위 마커나 왼쪽 목록을 클릭하면 상세 정보를 확인하실 수 있습니다.",
      flight_nav_river: "흐엉강",
      flight_nav_thienmu: "티엔무 사원",
      flight_nav_tombs: "황실 능묘",
      flight_nav_experience: "3D 비행 체험",
      flight_nav_back: "HUEGO 웹으로 이동 ↗",
      flight_hero_title: "HUEGO — 천년 고도 후에를 만나다",
      flight_hero_sub: "디지털 트윈 기술로 재현된 3D 고도 비행으로 응우옌 왕조의 황금빛 역사를 생생하게 체험하세요.",
      flight_btn_start: "3D 비행 탐방 시작",
      flight_scroll_prompt: "스크롤하여 후에 상공을 비행하세요",
    },
    ja: {
      site_title: 'HUEGO – 古都フエ スマート観光＆文化遺産プラットフォーム',
      brand_tagline: 'ベトナム古都フエ',
      nav_explore: 'フエを探訪',
      nav_guide: '観光ガイド',
      nav_map: 'デジタル遺産マップ',
      nav_museum: '3D仮想博物館',
      nav_simulation: '1日シミュレーター',
      nav_essentials: '緊急連絡・サポート',
      nav_flight3d: '3D古都フライト体験 ✨',
      nav_open_app: 'HUEGOアプリを開く 📱',
      search_placeholder: 'フエの名所、王宮遺跡、名物グルメ、カフェを検索...',
      hero_title_prefix: '千年の歴史息づく',
      hero_title_accent: '古都フエ',
      hero_title_suffix: 'HUEGO AIガイドと共に',
      hero_subtitle: '高精度デジタルマップ、3D王宮宝物、本格音声ガイド、グエン朝13代の歴史と宮廷料理に精通したAI「メ・フエ」がナビゲートするスマート観光体験。',
      section_journeys: 'おすすめ観光コース',
      section_places: 'フエのスポット一覧',
      tab_all: '🌟 全スポット',
      tab_tour: '🏛️ 史跡・王宮ツアー',
      tab_fnb: '🍜 宮廷料理・名物グルメ',
      tab_cafe: '☕ カフェ・憩いの場',
      tab_stay: '🏨 ホテル・リゾート',
      tab_craft: '🎁 名物お土産・特産品',
      tab_eco: '🚗 観光サービス',
      weather_loading: 'フエ気象台に接続中...',
      weather_stale: '(キャッシュデータ)',
      weather_humidity: '湿度',
      weather_wind: '風速',
      weather_rec: '観光アドバイス',
      weather_feels_like: '体感温度',
      weather_station: '観測地点',
      weather_rain_sim: '🌧️ 雨シミュレーション',
      weather_rain_on: '🌧️ 雨: ON',
      weather_rain_off: '🌧️ 雨: OFF',
      weather_details_title: 'フエ市 リアルタイム気象台',
      weather_open_details: '詳細な天気と観光のヒントを見る',
      btn_audio_guide: '音声解説を聞く',
      btn_audio_stop: '音声停止',
      btn_audio_loading: '音声読み込み中...',
      btn_itinerary: '🔖 マイ旅程',
      btn_add_itinerary: '旅程に保存',
      btn_saved_itinerary: '✓ 保存済み',
      btn_details: '詳細を見る',
      btn_close: '閉じる',
      btn_view_ar: '📱 拡張現実（AR）で見る',
      btn_share: '旅程をシェア',
      btn_open_app_action: 'アプリ起動',
      btn_flight_3d: '3Dフライト',
      btn_prev: '« 前へ',
      btn_next: '次へ »',
      btn_google_maps: 'Googleマップで道案内',
      btn_digital_map: 'デジタル地図',
      theme_dark: 'ダークモード',
      theme_light: 'ライトモード',
      city_hue: 'フエ市',
      label_address: '住所',
      label_phone: '電話番号',
      label_phone_empty: '電話番号未登録',
      label_category: 'カテゴリー',
      label_audio_guide_title: '王宮音声ガイド（AI解説）',
      audio_guide_desc: '情緒ある音声で歴史や見どころ、おすすめの巡り方を解説します。',
      audio_guide_desc_place: '{place}の歴史や見どころ、巡り方を情感豊かに解説します。',
      label_new: '新着',
      found_places: '{n}件のスポットが見つかりました',
      loading_places: 'フエのスポットを検索中...',
      no_places_title: '該当するスポットが見つかりません',
      no_places_desc: '別のキーワードで検索するか、カテゴリーを変更してください。',
      // Footer
      footer_brand_desc: 'HUEGO — ベトナム古都フエ スマート観光プラットフォーム。千年の王朝文化と高精度デジタル地図、3D仮想博物館、ネイティブAI「メ・フエ」を結集。',
      footer_hotline: '📞 フエ観光ホットライン: +84 234 3822288',
      footer_explore_title: '遺産探訪',
      footer_link_map: '4,352箇所のデジタル地図',
      footer_link_museum: '10の宝物 3D仮想博物館',
      footer_link_guide: 'フエ観光ガイド・モデル旅程',
      footer_link_simulation: 'フエでの1日シミュレーター',
      footer_services_title: 'サービス・サポート',
      footer_emergency: '緊急通報 113/114/115',
      footer_hospital: 'フエ中央病院',
      footer_app_online: '📱 HUEGOアプリをオンライン体験',
      footer_github: 'GitHubプロジェクトリポジトリ',
      footer_ai_title: 'AI観光アシスタント',
      footer_ai_desc: 'リアルタイムの天候に合わせた名物グルメ、最適ルート、王朝の歴史秘話を24時間いつでもAI「メ・フエ」にご相談ください。',
      footer_ai_btn: '👑 メ・フエAIとチャット',
      footer_copyright: '© 2026 HUEGO — 古都フエ スマート観光イノベーションプロジェクト。',
      footer_rights: '無断転載を禁じます・ベトナム文化遺産のために開発',
      // Mobile Nav
      mobile_nav_explore: '探訪',
      mobile_nav_map: '地図',
      mobile_nav_museum: '博物館',
      mobile_nav_guide: 'ガイド',
      mobile_nav_app: 'アプリ',
      // Floating AI Assistant
      ai_fab_title: 'メ・フエ AIガイド',
      ai_header_sub: '24時間スマート古都ガイド',
      ai_welcome_msg: 'ようこそフエへ！HUEGO専属ローカルAI「メ・フエ」です。おすすめの名物料理や観光ルート、フエ王宮の歴史など何でもお尋ねください！',
      ai_chip_food: '🍜 王宮周辺スナック',
      ai_chip_tombs: '🏛️ 半日帝陵巡り',
      ai_chip_salt_coffee: '☕ 名物「塩コーヒー」',
      ai_chip_rain: '🌧️ 雨の日のモデル旅程',
      ai_input_placeholder: 'フエの観光やグルメについて何でも質問...',
      // Mobile app simulator
      app_tab_map: '地図',
      app_tab_itinerary: '旅程',
      app_tab_wheel: '遺産ルーレット',
      app_tab_ai: 'フエAI',
      app_tab_points: '認定証',
      app_points_title: 'フエ・グリーントラベル認定証',
      app_points_desc: '環境に配慮した持続可能な文化遺産探訪の達成を、フエ観光局およびHUEGOが公式認定します。',
      app_btn_export_pdf: '認定証を出力 (PDF)',
      app_btn_logout: 'ログアウト',
      app_btn_demo: 'デモを試す',
      app_auth_title: 'HUEGO ログイン',
      guide_hero_title: "古都フエ 観光ガイド＆モデル旅程",
      guide_hero_sub: "王朝の美と宮廷料理、情緒あふれるフォン川の暮らしを余すところなく味わうための総合旅程ガイド。",
      guide_itineraries_heading: "滞在日数別おすすめモデルコース（1〜3日）",
      guide_tips_heading: "出発前の旅のヒント",
      guide_faq_heading: "よくあるご質問（FAQ）",
      faq_q1: "フエの遺跡入場券はどこで購入できますか？",
      faq_a1: "王宮の午門（Ngọ Môn）チケット売り場、または各帝陵の入口で購入できます。王宮とカイディン・トゥドゥック・ミンマンの3大帝陵を巡るお得な共通チケットがおすすめです。",
      faq_q2: "フエを訪れるのに最も適した時期はいつですか？",
      faq_a2: "1月から4月（過ごしやすい春の気候と緑豊かな庭園）および5月から8月（晴天の夏でトゥアンアンビーチやタムザン潟散策に最適）がベストシーズンです。",
      faq_q3: "フエのお土産として人気のある名産品は何ですか？",
      faq_a3: "ティエンフオンの伝統ごま飴（Mè xửng）、宮廷茶、トレ（発酵ソーセージ）、ロクトゥイの白樹油（カユプテオイル）が定番です。",
      museum_hero_title: "フエ王宮 3D仮想骨董博物館",
      museum_hero_sub: "360度回転操作でグエン朝の国宝級の宮廷宝物を間近にご鑑賞いただけます。",
      museum_hint_3d: "ドラッグで360°回転 | スクロールで拡大縮小",
      museum_origin_badge: "👑 フエ宮廷骨董博物館",
      sim_hero_title: "フエでの1日シミュレーター",
      sim_hero_sub: "フォン川の夜明け、ドンバ市場の活気、夜の伝統宮廷舟歌鑑賞まで、フエの1日の旅程をインタラクティブに体験。",
      sim_btn_generate: "1日モデル旅程をシミュレーション",
      sim_morning: "🌅 早朝散策",
      sim_noon: "☀️ 昼食＆名物グルメ",
      sim_afternoon: "🌤️ 午後の帝陵巡り",
      sim_evening: "🌙 夜のフォン川遊覧舟",
      essentials_hero_title: "緊急連絡先・旅行サポート情報",
      essentials_hero_sub: "フエ滞在中に24時間いつでも利用できる救急・警察・消防および観光案内ホットライン。",
      essentials_police: "警察緊急通報 (113)",
      essentials_fire: "消防・救助 (114)",
      essentials_ambulance: "救急要請 (115)",
      essentials_tourist_hotline: "フエ観光サポートホットライン",
      map_count_label: "30箇所の古都文化遺産 · 30件表示",
      map_filter_all: "すべて",
      map_filter_imperial: "王宮・帝陵",
      map_filter_nature: "自然景観",
      map_filter_pagodas: "寺院・霊廟",
      map_filter_bridges: "橋・市場・博物館",
      map_filter_other: "その他の名所",
      map_hint_click: "地図上のマーカーまたは左側のリストをクリックすると詳細が表示されます。",
      flight_nav_river: "フォン川",
      flight_nav_thienmu: "ティエンムー寺",
      flight_nav_tombs: "王朝帝陵群",
      flight_nav_experience: "3D体験",
      flight_nav_back: "HUEGOウェブへ ↗",
      flight_hero_title: "HUEGO — 古都フエの遺産に触れる",
      flight_hero_sub: "デジタルツイン技術によりグエン朝の栄華を3Dフライトで体感するスマート観光アプリ。",
      flight_btn_start: "3Dフライトを開始",
      flight_scroll_prompt: "スクロールしてフエの上空へ離陸",
    },
  };

  // Từ điển địa danh Cố Đô nổi bật đa ngôn ngữ
  const HERITAGE_TRANSLATIONS = {
    'dai-noi-hue': {
      en: { name: 'Imperial City of Hue (Citadel)', address: '23/8 Street, Thuan Hoa, Hue City' },
      fr: { name: 'Cité Impériale de Hué', address: 'Rue 23/8, Thuan Hoa, Hué' },
      ko: { name: '후에 황성 (대내)', address: '후에시 투언호아 8월 23일 거리' },
      ja: { name: 'フエ王宮（大内・ダイノイ）', address: 'フエ市トゥアンホア 8月23日通り' },
    },
    'chua-thien-mu': {
      en: { name: 'Thien Mu Pagoda (Linh Mu)', address: 'Kim Long, Hue City' },
      fr: { name: 'Pagode de la Dame Céleste (Thien Mu)', address: 'Kim Long, Hué' },
      ko: { name: '티엔무 사원 (천모사)', address: '후에시 낌롱' },
      ja: { name: 'ティエンムー寺（天姥寺）', address: 'フエ市キムロン' },
    },
    'lang-khai-dinh': {
      en: { name: 'Khai Dinh Royal Tomb (Ung Lang)', address: 'Thuy Bang, Huong Thuy, Thua Thien Hue' },
      fr: { name: 'Tombeau Royal de Khai Dinh', address: 'Thuy Bang, Huong Thuy, Hué' },
      ko: { name: '카이딘 황제릉 (응릉)', address: '트아티엔후에 흐엉투이 투이방' },
      ja: { name: 'カイディン帝陵（応陵）', address: 'トゥアティエン・フエ トゥイバン' },
    },
    'lang-tu-duc': {
      en: { name: 'Tu Duc Royal Tomb (Khiem Lang)', address: 'Thuy Xuan, Hue City' },
      fr: { name: 'Tombeau Royal de Tu Duc', address: 'Thuy Xuan, Hué' },
      ko: { name: '뜨득 황제릉 (겸릉)', address: '후에시 투이쑤언' },
      ja: { name: 'トゥドゥック帝陵（謙陵）', address: 'フエ市トゥイスアン' },
    },
    'lang-minh-mang': {
      en: { name: 'Minh Mang Royal Tomb (Hieu Lang)', address: 'Huong Tho, Huong Tra, Thua Thien Hue' },
      fr: { name: 'Tombeau Royal de Minh Mang', address: 'Huong Tho, Huong Tra, Hué' },
      ko: { name: '민망 황제릉 (효릉)', address: '후에시 흐엉토' },
      ja: { name: 'ミンマン帝陵（孝陵）', address: 'フエ市フオントー' },
    },
    'lang-gia-long': {
      en: { name: 'Gia Long Royal Tomb (Thien Tho)', address: 'Huong Tho, Huong Tra, Thua Thien Hue' },
      fr: { name: 'Tombeau de Gia Long', address: 'Huong Tho, Huong Tra, Hué' },
      ko: { name: '자롱 황제릉 (천수릉)', address: '후에시 흐엉토' },
      ja: { name: 'ザーロン帝陵（天授陵）', address: 'フエ市フオントー' },
    },
    'lang-dong-khanh': {
      en: { name: 'Dong Khanh Royal Tomb (Tu Lang)', address: 'Thuy Xuan, Hue City' },
      fr: { name: 'Tombeau Royal de Dong Khanh', address: 'Thuy Xuan, Hué' },
      ko: { name: '동카인 황제릉', address: '후에시 투이쑤언' },
      ja: { name: 'ドンカイン帝陵', address: 'フエ市トゥイスアン' },
    },
    'lang-thieu-tri': {
      en: { name: 'Thieu Tri Royal Tomb (Xuong Lang)', address: 'Thuy Bang, Huong Thuy, Thua Thien Hue' },
      fr: { name: 'Tombeau Royal de Thieu Tri', address: 'Thuy Bang, Huong Thuy, Hué' },
      ko: { name: '티에우찌 황제릉', address: '트아티엔후에 흐엉투이 투이방' },
      ja: { name: 'ティエウチ帝陵', address: 'トゥアティエン・フエ トゥイバン' },
    },
    'cau-trang-tien': {
      en: { name: 'Trang Tien Bridge', address: 'Perfume River, Hue City' },
      fr: { name: 'Pont Trang Tien (Fleuve des Parfums)', address: 'Rivière des Parfums, Hué' },
      ko: { name: '짱띠엔 다리', address: '후에시 흐엉강' },
      ja: { name: 'チャンティエン橋', address: 'フエ市フォン川' },
    },
    'cho-dong-ba': {
      en: { name: 'Dong Ba Traditional Market', address: 'Tran Hung Dao, Hue City' },
      fr: { name: 'Marché Historique de Dong Ba', address: 'Tran Hung Dao, Hué' },
      ko: { name: '동바 전통시장', address: '후에시 쩐흥다오' },
      ja: { name: 'ドンバ市場', address: 'フエ市チャンフンダオ' },
    },
    'cho-ben-ngu': {
      en: { name: 'Ben Ngu Traditional Market', address: 'Phan Dinh Phung, Hue City' },
      fr: { name: 'Marché Historique de Ben Ngu', address: 'Phan Dinh Phung, Hué' },
      ko: { name: '벤응으 전통시장', address: '후에시 판딘풍' },
      ja: { name: 'ベンヌー市場', address: 'フエ市ファンディンフン' },
    },
    'lang-huong-thuy-xuan': {
      en: { name: 'Thuy Xuan Incense & Conical Hat Village', address: 'Huyen Tran Cong Chua, Hue City' },
      fr: { name: 'Village d\'encens de Thuy Xuan', address: 'Huyen Tran Cong Chua, Hué' },
      ko: { name: '투이쑤언 향 & 농라 마을', address: '후에시 후옌쩐꽁쭈아' },
      ja: { name: 'トゥイスアン線香・ノンラー村', address: 'フエ市フエンチャンコンチュア' },
    },
    'dien-thai-hoa': {
      en: { name: 'Thai Hoa Palace (Supreme Harmony)', address: 'Inside Imperial Citadel, Hue City' },
      fr: { name: 'Palais de l\'Harmonie Suprême (Thai Hoa)', address: 'Cité Impériale, Hué' },
      ko: { name: '태화전 (황실 정전)', address: '후에 황성 내부' },
      ja: { name: '太和殿（タイホア宮殿）', address: 'フエ王宮内' },
    },
    'bao-tang-co-vat-cung-dinh-hue': {
      en: { name: 'Hue Royal Antiquities Museum', address: '3 Le Truc, Hue City' },
      fr: { name: 'Musée des Antiquités Royales de Hué', address: '3 Le Truc, Hué' },
      ko: { name: '후에 궁중유물박물관', address: '후에시 레쭉 3번지' },
      ja: { name: 'フエ宮廷骨董博物館', address: 'フエ市レチュック通り3番地' },
    },
    'bao-tang-ho-chi-minh-hue': {
      en: { name: 'Ho Chi Minh Museum in Hue', address: '7 Le Loi, Hue City' },
      fr: { name: 'Musée Ho Chi Minh de Hué', address: '7 Le Loi, Hué' },
      ko: { name: '후에 호치민 박물관', address: '후에시 레러이 7번지' },
      ja: { name: 'フエ・ホーチミン博物館', address: 'フエ市レロイ通り7番地' },
    },
    'bao-tang-my-thuat-hue': {
      en: { name: 'Hue Fine Arts Museum', address: '17 Le Loi, Hue City' },
      fr: { name: 'Musée des Beaux-Arts de Hué', address: '17 Le Loi, Hué' },
      ko: { name: '후에 미술관', address: '후에시 레러이 17번지' },
      ja: { name: 'フエ美術館', address: 'フエ市レロイ通り17番地' },
    },
    'cung-an-dinh': {
      en: { name: 'An Dinh Palace', address: '179 Phan Dinh Phung, Hue City' },
      fr: { name: 'Palais d\'An Dinh', address: '179 Phan Dinh Phung, Hué' },
      ko: { name: '안딘 궁전', address: '후에시 판딘풍 179번지' },
      ja: { name: 'アンディン宮殿', address: 'フエ市ファンディンフン通り179番地' },
    },
    'cau-ngoi-thanh-toan': {
      en: { name: 'Thanh Toan Tile-Roofed Bridge', address: 'Thuy Thanh, Huong Thuy, Thua Thien Hue' },
      fr: { name: 'Pont Couvert de Thanh Toan', address: 'Thuy Thanh, Huong Thuy, Hué' },
      ko: { name: '타인또안 기와다리', address: '트아티엔후에 투이타인' },
      ja: { name: 'タントアン瓦屋根橋', address: 'トゥアティエン・フエ トゥイタイン' },
    },
    'chua-tu-hieu': {
      en: { name: 'Tu Hieu Root Pagoda', address: 'Thuy Xuan, Hue City' },
      fr: { name: 'Pagode Mère de Tu Hieu', address: 'Thuy Xuan, Hué' },
      ko: { name: '뜨히에우 사원 (틱낫한 스님 본찰)', address: '후에시 투이쑤언' },
      ja: { name: 'トゥーヒエウ寺（ティク・ナット・ハン師本山）', address: 'フエ市トゥイスアン' },
    },
    'chua-tu-dam': {
      en: { name: 'Tu Dam Pagoda', address: '01 Su Lieu Quan, Hue City' },
      fr: { name: 'Pagode Tu Dam', address: '01 Su Lieu Quan, Hué' },
      ko: { name: '뜨담 사원', address: '후에시 스리에우꽌 1번지' },
      ja: { name: 'トゥーダム寺', address: 'フエ市ス・リエウ・クアン1番地' },
    },
    'chua-bao-quoc': {
      en: { name: 'Bao Quoc Ancient Pagoda', address: 'Bao Quoc, Hue City' },
      fr: { name: 'Pagode Historique de Bao Quoc', address: 'Bao Quoc, Hué' },
      ko: { name: '바오꾸옥 고찰', address: '후에시 바오꾸옥' },
      ja: { name: 'バオクオック古寺', address: 'フエ市バオクオック' },
    },
    'cuu-dinh': {
      en: { name: 'Nine Dynastic Urns (Cuu Dinh)', address: 'The Mieu Temple, Citadel, Hue City' },
      fr: { name: 'Les Neuf Urnes Dynastiques', address: 'Temple The Mieu, Cité Impériale' },
      ko: { name: '구정 (황실 9대 청동 솥)', address: '후에 황성 세조묘 앞마당' },
      ja: { name: '九鼎（王朝の青銅大釜）', address: 'フエ王宮 世祖廟前庭' },
    },
    'dien-hon-chen': {
      en: { name: 'Hon Chen Temple (Hue Nam Dian)', address: 'Huong Tho, Huong Tra, Thua Thien Hue' },
      fr: { name: 'Temple de Hon Chen', address: 'Huong Tho, Huong Tra, Hué' },
      ko: { name: '혼첸 사당 (혜남전)', address: '후에시 흐엉토' },
      ja: { name: 'ホンチェン殿（恵南殿）', address: 'フエ市フオントー' },
    },
    'ho-quyen': {
      en: { name: 'Ho Quyen Royal Arena (Tiger Arena)', address: 'Thuy Bieu, Hue City' },
      fr: { name: 'Arène Royale de Ho Quyen', address: 'Thuy Bieu, Hué' },
      ko: { name: '호꾸옌 황실 투기장 (호권)', address: '후에시 투이비에우' },
      ja: { name: 'ホークエン闘獣場（虎闘場）', address: 'フエ市トゥイビーウ' },
    },
    'doi-vong-canh': {
      en: { name: 'Vong Canh Hill', address: 'Huyen Tran Cong Chua, Hue City' },
      fr: { name: 'Colline de Vong Canh', address: 'Huyen Tran Cong Chua, Hué' },
      ko: { name: '봉깐 언덕 (흐엉강 전망대)', address: '후에시 후옌쩐꽁쭈아' },
      ja: { name: 'ボンカインの丘（フォン川展望地）', address: 'フエ市フエンチャンコンチュア' },
    },
  };

  // Từ điển dịch Bộ sưu tập (Collections)
  const COLLECTION_TRANSLATIONS = {
    'di-san-trieu-nguyen': {
      en: { title: 'Nguyen Dynasty Heritage', subtitle: 'Footprints of Vietnam\'s final imperial dynasty across 143 years' },
      fr: { title: 'Patrimoine de la Dynastie Nguyen', subtitle: '143 ans d\'histoire de la dernière dynastie féodale du Vietnam' },
      ko: { title: '응우옌 왕조 황실 유산', subtitle: '143년간 이어진 베트남 마지막 봉건 황실의 위대한 발자취' },
      ja: { title: 'グエン朝143年の遺産', subtitle: 'ベトナム最後の封建王朝が残した栄華と美の軌跡' },
    },
    'am-thuc-cung-dinh-dan-gian': {
      en: { title: 'Royal & Folk Gastronomy', subtitle: 'Over 1,000 delicate flavors from street food to lavish palace banquets' },
      fr: { title: 'Gastronomie Royale & Populaire', subtitle: 'Plus de 1 000 mets raffinés, des plats de rue aux grands banquets impériaux' },
      ko: { title: '황실 궁중요리와 서민 미식', subtitle: '소박한 밥상부터 화려한 황실 연회까지 1,000여 가지 맛의 향연' },
      ja: { title: '宮廷料理と郷土グルメ', subtitle: '庶民の味から豪華な宮廷料理まで、1,000種を超える洗練された美味' },
    },
    'ca-phe-song-huong': {
      en: { title: 'Riverside Cafes & Chill', subtitle: 'Charming riverfront spots, famous salt coffee, and nostalgic vintage vibe' },
      fr: { title: 'Cafés au Bord de la Rivière', subtitle: 'Adresses bucoliques au bord de l\'eau, célèbre café salé et ambiance rétro' },
      ko: { title: '흐엉강변 감성 카페 투어', subtitle: '낭만적인 강변 뷰, 후에 원조 소금 커피와 고즈넉한 힐링 공간' },
      ja: { title: '香河のほとり カフェ散歩', subtitle: '川沿いの憩いの場、元祖「塩コーヒー」と懐かしきノスタルジック空間' },
    },
    'chua-co-xu-hue': {
      en: { title: 'Ancient Buddhist Pagodas', subtitle: 'Hue - the spiritual Buddhist cradle with serene monasteries nestled in pine hills' },
      fr: { title: 'Monastères & Pagodes Anciennes', subtitle: 'Hué - berceau du bouddhisme vietnamien aux sanctuaires nichés sous les pins' },
      ko: { title: '고찰과 천년 선원 탐방', subtitle: '소나무 숲속에 자리 잡은 고요한 산사와 베트남 불교의 중심지 후에' },
      ja: { title: '古寺と静寂の禅寺巡り', subtitle: '松林に佇む清らかな古刹・ベトナム仏教発祥の聖地フエ' },
    },
  };

  // Từ điển nhãn danh mục (Vertical tags)
  const VERTICAL_TRANSLATIONS = {
    tour: {
      vi: 'Di tích & Tour',
      en: 'Heritage & Tour',
      fr: 'Monuments & Visites',
      ko: '유적지 & 투어',
      ja: '史跡・ツアー',
    },
    fnb: {
      vi: 'Ẩm thực',
      en: 'Food & Cuisine',
      fr: 'Gastronomie',
      ko: '미식 & 맛집',
      ja: 'グルメ・名店',
    },
    cafe: {
      vi: 'Cà phê',
      en: 'Cafes & Chill',
      fr: 'Cafés & Détente',
      ko: '감성 카페',
      ja: 'カフェ・喫茶',
    },
    stay: {
      vi: 'Lưu trú',
      en: 'Hotels & Resorts',
      fr: 'Hôtels & Séjours',
      ko: '호텔 & 숙소',
      ja: 'ホテル・宿泊',
    },
    specialty: {
      vi: 'Đặc sản',
      en: 'Local Specialties',
      fr: 'Spécialités Locales',
      ko: '특산품 & 기념품',
      ja: '特産品・お土産',
    },
    service: {
      vi: 'Dịch vụ',
      en: 'Travel Services',
      fr: 'Services Touristiques',
      ko: '여행 편의 서비스',
      ja: '観光サービス',
    },
  };

  // Từ điển dịch phân loại chi tiết (Subcategories)
  const SUB_TRANSLATIONS = {
    heritage: { vi: 'Di sản', en: 'Heritage', fr: 'Patrimoine', ko: '문화유산', ja: '文化遺産' },
    imperial: { vi: 'Hoàng cung', en: 'Imperial', fr: 'Impérial', ko: '황실', ja: '王宮' },
    pagoda: { vi: 'Chùa chiền', en: 'Pagoda', fr: 'Pagode', ko: '사찰', ja: '寺院' },
    museum: { vi: 'Bảo tàng', en: 'Museum', fr: 'Musée', ko: '박물관', ja: '博物館' },
    bridge: { vi: 'Cầu', en: 'Bridge', fr: 'Pont', ko: '다리', ja: '橋' },
    market: { vi: 'Chợ truyền thống', en: 'Market', fr: 'Marché', ko: '전통시장', ja: '伝統市場' },
    tomb: { vi: 'Lăng tẩm', en: 'Royal Tomb', fr: 'Tombeau royal', ko: '황제릉', ja: '帝陵' },
    nature: { vi: 'Thiên nhiên', en: 'Nature', fr: 'Nature', ko: '자연 명소', ja: '自然景観' },
    'Nhà hàng': { vi: 'Nhà hàng', en: 'Restaurant', fr: 'Restaurant', ko: '레스토랑', ja: 'レストラン' },
    'Nhà hàng Việt Nam': { vi: 'Nhà hàng Việt', en: 'Vietnamese Restaurant', fr: 'Restaurant Vietnamien', ko: '베트남 식당', ja: 'ベトナム料理店' },
    'Quán cà phê': { vi: 'Quán cà phê', en: 'Cafe & Coffee', fr: 'Café', ko: '카페', ja: 'カフェ' },
    'Quán rượu': { vi: 'Quán bar & Pub', en: 'Pub & Bar', fr: 'Pub & Bar', ko: '펍 & 바', ja: 'パブ・バー' },
    'Khách sạn': { vi: 'Khách sạn', en: 'Hotel', fr: 'Hôtel', ko: '호텔', ja: 'ホテル' },
    'Khu nghỉ dưỡng': { vi: 'Resort nghỉ dưỡng', en: 'Resort', fr: 'Complexe hôtelier', ko: '리조트', ja: 'リゾート' },
    'Chùa': { vi: 'Chùa', en: 'Buddhist Pagoda', fr: 'Pagode', ko: '사찰', ja: '寺院' },
    'Chùa phật giáo': { vi: 'Chùa Phật giáo', en: 'Buddhist Pagoda', fr: 'Pagode Bouddhiste', ko: '불교 사찰', ja: '仏教寺院' },
    'Bảo tàng': { vi: 'Bảo tàng', en: 'Museum', fr: 'Musée', ko: '박물관', ja: '博物館' },
    'Di tích lịch sử': { vi: 'Di tích lịch sử', en: 'Historical Site', fr: 'Site Historique', ko: '역사 유적', ja: '歴史的遺跡' },
    'Điểm thu hút khách du lịch': { vi: 'Điểm tham quan', en: 'Tourist Attraction', fr: 'Attraction Touristique', ko: '관광 명소', ja: '観光名所' },
    'Cửa hàng bán thực phẩm đặc sản': { vi: 'Đặc sản Cố Đô', en: 'Hue Specialties', fr: 'Spécialités de Hué', ko: '후에 특산품', ja: 'フエ名物特産品' },
    'Cửa hàng lưu niệm': { vi: 'Quà lưu niệm', en: 'Souvenirs', fr: 'Boutique Souvenirs', ko: '기념품점', ja: 'お土産店' },
    'Cửa hàng quà tặng': { vi: 'Quà tặng', en: 'Gift Shop', fr: 'Cadeaux', ko: '선물가게', ja: 'ギフトショップ' },
    'Công viên': { vi: 'Công viên', en: 'Park', fr: 'Parc', ko: '공원', ja: '公園' },
    'Bãi biển': { vi: 'Bãi biển', en: 'Beach', fr: 'Plage', ko: '해변', ja: 'ビーチ' },
    'Căn hộ nghỉ dưỡng cho thuê': { vi: 'Căn hộ nghỉ dưỡng', en: 'Holiday Stay', fr: 'Séjour Vacances', ko: '휴양 숙소', ja: 'リゾートステイ' },
    'Dịch vụ vận tải': { vi: 'Vận chuyển', en: 'Transport', fr: 'Transport', ko: '교통 편의', ja: '交通サービス' },
    'Bến du thuyền': { vi: 'Bến thuyền', en: 'Boat Pier', fr: 'Embarcadère', ko: '보트 선착장', ja: '遊覧船乗り場' },
  };

  function translateSubcategory(sub, lang) {
    const cur = lang || getCurrentLang();
    if (!sub) return '';
    const norm = (sub + '').trim();
    if (SUB_TRANSLATIONS[norm] && SUB_TRANSLATIONS[norm][cur]) {
      return SUB_TRANSLATIONS[norm][cur];
    }
    if (cur === 'vi') return norm;
    if (cur === 'en') {
      return norm
        .replace(/Nhà hàng/i, 'Restaurant')
        .replace(/Quán cà phê/i, 'Cafe')
        .replace(/Khách sạn/i, 'Hotel')
        .replace(/Chùa/i, 'Pagoda')
        .replace(/Cửa hàng/i, 'Shop')
        .replace(/Công viên/i, 'Park')
        .replace(/Bãi biển/i, 'Beach');
    }
    return norm;
  }

  function getCurrentLang() {
    const saved = localStorage.getItem('huego_lang');
    if (saved && SUPPORTED_LANGS[saved]) return saved;
    const navLang = (navigator.language || navigator.userLanguage || 'vi').toLowerCase();
    if (navLang.startsWith('en')) return 'en';
    if (navLang.startsWith('fr')) return 'fr';
    if (navLang.startsWith('ko')) return 'ko';
    if (navLang.startsWith('ja')) return 'ja';
    return 'vi';
  }

  function setLanguage(lang) {
    if (!SUPPORTED_LANGS[lang]) lang = 'vi';
    localStorage.setItem('huego_lang', lang);
    applyLanguage(lang);
    window.dispatchEvent(new CustomEvent('huego:langchange', { detail: { lang } }));
  }

  function t(key, lang) {
    const cur = lang || getCurrentLang();
    const dict = DICTIONARY[cur] || DICTIONARY.vi;
    return dict[key] || DICTIONARY.vi[key] || key;
  }

  function translateViCultureName(name, cur) {
    if (!name || cur === 'vi') return name;
    let n = (name + '').trim();

    if (/^Nhà Cổ\s+/i.test(n)) {
      const rest = n.replace(/^Nhà Cổ\s+/i, '');
      if (cur === 'en') return rest + ' Ancient House';
      if (cur === 'fr') return 'Maison Ancienne de ' + rest;
      if (cur === 'ko') return rest + ' 고택';
      if (cur === 'ja') return rest + ' 古民家';
    }
    if (/^Nhà Vườn\s+/i.test(n)) {
      const rest = n.replace(/^Nhà Vườn\s+/i, '');
      if (cur === 'en') return rest + ' Garden House';
      if (cur === 'fr') return 'Maison-Jardin de ' + rest;
      if (cur === 'ko') return rest + ' 가든하우스';
      if (cur === 'ja') return rest + ' 庭園住宅';
    }
    if (/^Thanh Trà\s+/i.test(n)) {
      const rest = n.replace(/^Thanh Trà\s+/i, '');
      if (cur === 'en') return rest + ' Pomelo Garden';
      if (cur === 'fr') return 'Verger de pamplemousse ' + rest;
      if (cur === 'ko') return rest + ' 탄짜 자몽원';
      if (cur === 'ja') return rest + ' 柑橘園';
    }
    if (/^Tranh Mộc Bản/i.test(n)) {
      if (cur === 'en') return 'Hue Woodblock Art Studio';
      if (cur === 'fr') return 'Atelier d\'Estampes de Hué';
      if (cur === 'ko') return '후에 전통 목판화 공방';
      if (cur === 'ja') return 'フエ伝統木版画工房';
    }
    if (/^Bún bò\s+/i.test(n)) {
      const rest = n.replace(/^Bún bò\s+/i, '');
      if (cur === 'en') return rest + ' Hue Beef Noodle Soup';
      if (cur === 'fr') return 'Soupe Bun Bo ' + rest;
      if (cur === 'ko') return rest + ' 분보 후에';
      if (cur === 'ja') return rest + ' ブンボー・フエ';
    }
    if (/^Cơm hến\s+/i.test(n)) {
      const rest = n.replace(/^Cơm hến\s+/i, '');
      if (cur === 'en') return rest + ' Baby Clam Rice';
      if (cur === 'fr') return 'Riz aux clovisses ' + rest;
      if (cur === 'ko') return rest + ' 껌헨';
      if (cur === 'ja') return rest + ' コムヘン';
    }
    if (/^Bánh bèo\s+/i.test(n)) {
      const rest = n.replace(/^Bánh bèo\s+/i, '');
      if (cur === 'en') return rest + ' Bloomy Rice Cakes';
      if (cur === 'fr') return 'Banh Beo de ' + rest;
      if (cur === 'ko') return rest + ' 바인베오';
      if (cur === 'ja') return rest + ' バンベオ';
    }
    if (/^Cà phê muối\s+/i.test(n)) {
      const rest = n.replace(/^Cà phê muối\s+/i, '');
      if (cur === 'en') return rest + ' Salt Coffee';
      if (cur === 'fr') return 'Café Salé ' + rest;
      if (cur === 'ko') return rest + ' 소금 커피';
      if (cur === 'ja') return rest + ' 塩コーヒー';
    }
    if (/^Cà phê\s+/i.test(n) || /^Cafe\s+/i.test(n)) {
      const rest = n.replace(/^(Cà phê|Cafe)\s+/i, '');
      if (cur === 'en') return rest + ' Cafe';
      if (cur === 'fr') return 'Café ' + rest;
      if (cur === 'ko') return rest + ' 카페';
      if (cur === 'ja') return rest + ' カフェ';
    }
    if (/^Khách sạn\s+/i.test(n)) {
      const rest = n.replace(/^Khách sạn\s+/i, '');
      if (cur === 'en') return rest + ' Hotel';
      if (cur === 'fr') return 'Hôtel ' + rest;
      if (cur === 'ko') return rest + ' 호텔';
      if (cur === 'ja') return rest + ' ホテル';
    }
    if (/^Quán\s+/i.test(n)) {
      const rest = n.replace(/^Quán\s+/i, '');
      if (cur === 'en') return rest + ' Restaurant';
      if (cur === 'fr') return 'Chez ' + rest;
      if (cur === 'ko') return rest + ' 식당';
      if (cur === 'ja') return rest + ' 食堂';
    }

    return n;
  }

  /**
   * Helper tìm kiếm dữ liệu dịch trong HERITAGE_TRANSLATIONS bằng cả id & alias
   */
  function findHeritageData(id) {
    if (!id) return null;
    if (HERITAGE_TRANSLATIONS[id]) return HERITAGE_TRANSLATIONS[id];
    const stripped = id.replace(/^heritage-/, '').replace(/^poi-/, '');
    if (HERITAGE_TRANSLATIONS[stripped]) return HERITAGE_TRANSLATIONS[stripped];
    return null;
  }

  /**
   * Dịch thông tin địa điểm (Place) sang bất kỳ ngôn ngữ nào trong 5 ngôn ngữ
   */
  function translatePlace(p, lang) {
    const cur = lang || getCurrentLang();
    if (!p) return p;

    // 1. Tìm trong từ điển di sản đặc biệt
    const heritage = findHeritageData(p.id);

    let rawName = p.name_vi || p.name || '';
    let name = translateViCultureName(rawName, cur);
    let address = p.address_vi || p.address || 'Thành phố Huế';

    if (heritage && heritage[cur]) {
      name = heritage[cur].name || name;
      address = heritage[cur].address || address;
    } else {
      // Dịch đa ngôn ngữ cho toàn bộ 4.352 địa điểm
      const isCultured = (name !== rawName);
      if (cur === 'en') {
        name = isCultured ? name : (p.name_en || p.name_vi || p.name);
        address = p.address_en || p.address_vi || p.address || 'Hue City';
      } else if (cur === 'fr') {
        const enName = isCultured ? name : (p.name_en || name);
        name = enName
          .replace(/\bPagoda\b/gi, 'Pagode')
          .replace(/\bRoyal Tomb\b/gi, 'Tombeau Royal')
          .replace(/\bTomb\b/gi, 'Tombeau')
          .replace(/\bMuseum\b/gi, 'Musée')
          .replace(/\bPalace\b/gi, 'Palais')
          .replace(/\bBridge\b/gi, 'Pont')
          .replace(/\bMarket\b/gi, 'Marché')
          .replace(/\bHotel\b/gi, 'Hôtel')
          .replace(/\bCoffee\b/gi, 'Café')
          .replace(/\bBeach\b/gi, 'Plage')
          .replace(/\bPark\b/gi, 'Parc')
          .replace(/\bHill\b/gi, 'Colline');
        const enAddr = p.address_en || address;
        address = enAddr
          .replace(/\bStreet\b/gi, 'Rue')
          .replace(/\bWard\b/gi, 'Quartier')
          .replace(/\bHue City\b/gi, 'Ville de Hué');
      } else if (cur === 'ko') {
        const enName = isCultured ? name : (p.name_en || name);
        name = enName
          .replace(/Pagoda/gi, '사원')
          .replace(/Royal Tomb|Tomb/gi, '황제릉')
          .replace(/Museum/gi, '박물관')
          .replace(/Palace/gi, '궁전')
          .replace(/Bridge/gi, '다리')
          .replace(/Market/gi, '시장')
          .replace(/Hotel/gi, '호텔')
          .replace(/Restaurant/gi, '레스토랑')
          .replace(/Coffee|Cafe/gi, '카페')
          .replace(/Beach/gi, '해변')
          .replace(/Park/gi, '공원');
        const enAddr = p.address_en || address;
        address = enAddr
          .replace(/Street/gi, '거리')
          .replace(/Ward/gi, '동')
          .replace(/Hue City/gi, '후에시');
      } else if (cur === 'ja') {
        const enName = isCultured ? name : (p.name_en || name);
        name = enName
          .replace(/Pagoda/gi, '寺')
          .replace(/Royal Tomb|Tomb/gi, '帝陵')
          .replace(/Museum/gi, '博物館')
          .replace(/Palace/gi, '宮殿')
          .replace(/Bridge/gi, '橋')
          .replace(/Market/gi, '市場')
          .replace(/Hotel/gi, 'ホテル')
          .replace(/Restaurant/gi, 'レストラン')
          .replace(/Coffee|Cafe/gi, 'カフェ')
          .replace(/Beach/gi, 'ビーチ')
          .replace(/Park/gi, '公園');
        const enAddr = p.address_en || address;
        address = enAddr
          .replace(/Street/gi, '通り')
          .replace(/Ward/gi, '街区')
          .replace(/Hue City/gi, 'フエ市');
      }
    }

    // Dịch nhãn danh mục (Tag)
    const vert = VERTICAL_TRANSLATIONS[p.vertical];
    const tag = vert ? (vert[cur] || vert.vi) : p.vertical;

    // Dịch mảng subcategory
    const subcategory = (p.subcategory || []).map(s => translateSubcategory(s, cur));

    return {
      ...p,
      name,
      address,
      tag,
      subcategory,
    };
  }

  /**
   * Dịch Bộ sưu tập (Collection)
   */
  function translateCollection(item, lang) {
    const cur = lang || getCurrentLang();
    if (!item) return item;

    const tr = COLLECTION_TRANSLATIONS[item.id];
    if (tr && tr[cur]) {
      return {
        ...item,
        title: tr[cur].title || item.title,
        subtitle: tr[cur].subtitle || item.subtitle,
      };
    }
    return item;
  }

  function applyLanguage(lang) {
    const cur = lang || getCurrentLang();
    const dict = DICTIONARY[cur] || DICTIONARY.vi;

    if (dict.site_title && document.title.includes('HUEGO')) {
      document.title = dict.site_title;
    }

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerText = dict[key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    document.documentElement.lang = cur;

    document.querySelectorAll('.huego-lang-btn').forEach((btn) => {
      const l = SUPPORTED_LANGS[cur];
      btn.innerHTML = `<span class="lang-flag">${l.flag}</span> <span class="lang-name">${l.name}</span> <span class="lang-arrow">▾</span>`;
    });
  }

  function renderLanguageSelector(containerSelector, className = '') {
    const containers = document.querySelectorAll(containerSelector);
    containers.forEach((container) => {
      const cur = getCurrentLang();
      const curInfo = SUPPORTED_LANGS[cur];

      const html = `
        <div class="huego-lang-dropdown ${className}" style="position:relative; display:inline-block; z-index:10001;">
          <button class="huego-lang-btn" type="button" aria-label="Chọn ngôn ngữ / Select Language" style="
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(88, 44, 131, 0.25);
            border-radius: 20px;
            padding: 5px 12px;
            font-size: 13px;
            font-weight: 700;
            color: #582C83;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
            transition: all 0.2s ease;
          ">
            <span class="lang-flag">${curInfo.flag}</span>
            <span class="lang-name">${curInfo.name}</span>
            <span class="lang-arrow" style="font-size: 10px; opacity: 0.7;">▾</span>
          </button>
          <div class="huego-lang-menu" style="
            display: none;
            position: absolute;
            top: calc(100% + 6px);
            right: 0;
            min-width: 150px;
            background: white;
            border-radius: 14px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.18);
            border: 1px solid rgba(0,0,0,0.08);
            overflow: hidden;
            padding: 4px;
            z-index: 999999;
          ">
            ${Object.values(SUPPORTED_LANGS)
              .map(
                (l) => `
              <button class="lang-option-btn ${l.code === cur ? 'active' : ''}" data-lang="${l.code}" type="button" style="
                width: 100%;
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 8px 12px;
                border: none;
                background: ${l.code === cur ? 'rgba(88, 44, 131, 0.08)' : 'transparent'};
                color: ${l.code === cur ? '#582C83' : '#334155'};
                font-weight: ${l.code === cur ? '700' : '500'};
                font-size: 13px;
                border-radius: 8px;
                cursor: pointer;
                text-align: left;
                transition: background 0.15s ease;
              ">
                <span style="font-size: 18px;">${l.flag}</span>
                <span>${l.name}</span>
              </button>
            `
              )
              .join('')}
          </div>
        </div>
      `;

      container.innerHTML = html;

      const btn = container.querySelector('.huego-lang-btn');
      const menu = container.querySelector('.huego-lang-menu');

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = menu.style.display === 'block';
        document.querySelectorAll('.huego-lang-menu').forEach((m) => (m.style.display = 'none'));
        menu.style.display = isOpen ? 'none' : 'block';
      });

      menu.querySelectorAll('.lang-option-btn').forEach((opt) => {
        opt.addEventListener('click', (e) => {
          e.stopPropagation();
          const chosen = opt.getAttribute('data-lang');
          setLanguage(chosen);
          menu.style.display = 'none';
        });
      });
    });
  }

  document.addEventListener('click', () => {
    document.querySelectorAll('.huego-lang-menu').forEach((m) => (m.style.display = 'none'));
  });

  window.addEventListener('DOMContentLoaded', () => {
    applyLanguage();
  });

  window.HuegoI18n = {
    SUPPORTED_LANGS,
    DICTIONARY,
    HERITAGE_TRANSLATIONS,
    COLLECTION_TRANSLATIONS,
    VERTICAL_TRANSLATIONS,
    SUB_TRANSLATIONS,
    translateSubcategory,
    getCurrentLang,
    setLanguage,
    t,
    translatePlace,
    translateCollection,
    applyLanguage,
    renderLanguageSelector,
  };
})();
