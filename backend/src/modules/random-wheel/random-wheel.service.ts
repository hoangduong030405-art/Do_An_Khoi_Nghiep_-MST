import { Injectable, Logger } from '@nestjs/common';
import { InMemoryDbService, HuePlace } from '../../database/in-memory-db.service';
import { SpinWheelDto } from './dto/spin-wheel.dto';

export interface WheelSlice {
  index: number;
  placeId: string;
  name: string;
  categoryCode: string;
  categoryName: string;
  latitude: number;
  longitude: number;
  address: string;
  descriptionVi: string;
  environmentType: string;
  ticketPriceVnd: number;
  thumbnailUrl: string;
  colorHex: string;
  greenRewardPoints: number;
  distanceMeters?: number;
}

export interface SpinResult {
  wheelSlices: WheelSlice[];
  winningIndex: number;
  winningPlace: HuePlace & { distanceMeters?: number };
  targetRotationDegrees: number;
  aiRecommendationReason: string;
  message: string;
}

@Injectable()
export class RandomWheelService {
  private readonly logger = new Logger(RandomWheelService.name);

  // Bảng màu rực rỡ phong cách Cố Đô cho các nan quạt của vòng quay
  private readonly sliceColors = [
    '#582C83', // Tím Hoàng Gia
    '#D4AF37', // Vàng Hoàng Cung
    '#1E6B7B', // Xanh Sông Hương
    '#E65100', // Cam Trầm Cố Đô
    '#2E7D32', // Xanh Du Lịch Sinh Thái
    '#C2185B', // Hồng Sen Cung Đình
    '#00897B', // Ngọc Bích
    '#F57F17', // Vàng Mật Ong
  ];

  // Các cột mốc bản đồ bổ sung để mỗi bộ lọc đều có đủ 8 nan quạt phong phú
  private readonly supplementalMapMilestones: HuePlace[] = [
    {
      id: 'cung-an-dinh-hue',
      name: 'Cung An Định (Lâu Đài Khải Tường)',
      slug: 'cung-an-dinh',
      categoryCode: 'HISTORICAL',
      categoryName: 'Di tích Cố đô',
      descriptionVi: 'Cung điện mang kiến trúc châu Âu tân cổ điển bên bờ sông An Cựu với 6 bức bích họa cung đình độc bản.',
      descriptionEn: 'Neoclassical royal palace by the An Cuu river.',
      address: '179B Phan Đình Phùng, Phường Phú Nhuận, TP Huế',
      latitude: 16.4581,
      longitude: 107.5919,
      geofenceRadiusMeters: 35,
      environmentType: 'INDOOR',
      ticketPriceVnd: 50000,
      greenRewardPoints: 40,
      thumbnailUrl: '/images/pois/cung-an-dinh.webp',
    },
    {
      id: 'lang-gia-long-thien-tho',
      name: 'Lăng Gia Long (Thiên Thọ Lăng)',
      slug: 'lang-gia-long',
      categoryCode: 'HISTORICAL',
      categoryName: 'Di tích Cố đô',
      descriptionVi: 'Quần thể lăng tẩm uy nghi giữa 42 ngọn đồi núi Thiên Thọ và hồ thông reo trầm mặc.',
      descriptionEn: 'Majestic tomb complex of Emperor Gia Long amidst 42 pine hills.',
      address: 'Xã Hương Thọ, TP Huế',
      latitude: 16.3601,
      longitude: 107.5964,
      geofenceRadiusMeters: 45,
      environmentType: 'OUTDOOR',
      ticketPriceVnd: 150000,
      greenRewardPoints: 50,
      thumbnailUrl: '/images/pois/lang-gia-long.webp',
    },
    {
      id: 'dien-hon-chen-hue',
      name: 'Điện Hòn Chén (Núi Ngọc Trản)',
      slug: 'dien-hon-chen',
      categoryCode: 'HISTORICAL',
      categoryName: 'Di tích Cố đô',
      descriptionVi: 'Ngôi điện linh thiêng thờ Thánh Mẫu Thiên Y A Na ẩn mình dưới tán cổ thụ bên vực sông Hương.',
      descriptionEn: 'Sacred temple nestled on Ngoc Tran cliff overlooking the Perfume River.',
      address: 'Làng Hải Cát, Xã Hương Thọ, TP Huế',
      latitude: 16.4106,
      longitude: 107.5529,
      geofenceRadiusMeters: 35,
      environmentType: 'SEMI_OUTDOOR',
      ticketPriceVnd: 50000,
      greenRewardPoints: 35,
      thumbnailUrl: '/images/pois/dien-hon-chen.webp',
    },
    {
      id: 'cafe-muoi-142-dang-thai-than',
      name: 'Cà Phê Muối 142 Đặng Thái Thân',
      slug: 'ca-phe-muoi-dang-thai-than',
      categoryCode: 'CAFE',
      categoryName: 'Quán Cà Phê & Sống Ảo',
      descriptionVi: 'Cơ sở cà phê muối sân vườn rộng thoáng ngay sát tường thành Đại Nội Huế.',
      descriptionEn: 'Garden salted coffee right next to the Imperial Citadel walls.',
      address: '142 Đặng Thái Thân, Phường Thuận Hòa, TP Huế',
      latitude: 16.4718,
      longitude: 107.5748,
      geofenceRadiusMeters: 25,
      environmentType: 'INDOOR',
      ticketPriceVnd: 25000,
      greenRewardPoints: 20,
      thumbnailUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd',
    },
    {
      id: 'giao-cafe-nostalgia',
      name: 'Giao Cafe (Không Gian Hoài Cổ)',
      slug: 'giao-cafe-hue',
      categoryCode: 'CAFE',
      categoryName: 'Quán Cà Phê & Sống Ảo',
      descriptionVi: 'Quán cà phê mang đậm kiến trúc nhà cổ Huế bình yên, góc chụp ảnh áo dài tuyệt đẹp.',
      descriptionEn: 'Nostalgic Hue house cafe ideal for Ao Dai photography.',
      address: '118 Chi Lăng, Phường Phú Cát, TP Huế',
      latitude: 16.4754,
      longitude: 107.5891,
      geofenceRadiusMeters: 25,
      environmentType: 'INDOOR',
      ticketPriceVnd: 35000,
      greenRewardPoints: 20,
      thumbnailUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb',
    },
    {
      id: 'chieu-cafe-watching-sunset',
      name: 'Chiều Cafe (Ngắm Hoàng Hôn Phá Tam Giang)',
      slug: 'chieu-cafe-hue',
      categoryCode: 'CAFE',
      categoryName: 'Quán Cà Phê & Sống Ảo',
      descriptionVi: 'Góc cà phê chill đón gió chiều và hoàng hôn tím lãng mạn xứ Huế.',
      descriptionEn: 'Chill sunset cafe with poetic Hue vibes.',
      address: 'Đường Lê Lợi ven sông Hương, TP Huế',
      latitude: 16.4648,
      longitude: 107.5852,
      geofenceRadiusMeters: 25,
      environmentType: 'SEMI_OUTDOOR',
      ticketPriceVnd: 35000,
      greenRewardPoints: 20,
      thumbnailUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    },
    {
      id: 'de-po-cafe-studio',
      name: 'De Po Cafe & Tiệm Trà Gác Mái',
      slug: 'de-po-cafe-hue',
      categoryCode: 'CAFE',
      categoryName: 'Quán Cà Phê & Sống Ảo',
      descriptionVi: 'Quán cà phê gác mái phong cách nghệ thuật trong lòng khu tập thể đường sắt xưa.',
      descriptionEn: 'Artistic loft cafe overlooking historic Hue streets.',
      address: 'Bến Me, Đường Lê Duẩn, TP Huế',
      latitude: 16.4612,
      longitude: 107.5718,
      geofenceRadiusMeters: 25,
      environmentType: 'INDOOR',
      ticketPriceVnd: 40000,
      greenRewardPoints: 20,
      thumbnailUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24',
    },
    {
      id: 'banh-khoai-hong-mai',
      name: 'Bánh Khoái & Nem Lụi Hồng Mai',
      slug: 'banh-khoai-hong-mai',
      categoryCode: 'CUISINE',
      categoryName: 'Ẩm thực Huế',
      descriptionVi: 'Bánh khoái đổ khuôn gang giòn rụm kèm nem lụi nướng than hoa chấm nước lèo gan mè béo ngậy.',
      descriptionEn: 'Crispy Hue sizzling pancakes and lemongrass pork skewers with peanut sesame sauce.',
      address: '110 Đinh Tiên Hoàng, Phường Phú Hòa, TP Huế',
      latitude: 16.4702,
      longitude: 107.5844,
      geofenceRadiusMeters: 25,
      environmentType: 'INDOOR',
      ticketPriceVnd: 55000,
      greenRewardPoints: 20,
      thumbnailUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8',
    },
    {
      id: 'banh-ep-cay-dua-nhat-le',
      name: 'Bánh Ép Cây Dừa (Thành Nội)',
      slug: 'banh-ep-cay-dua',
      categoryCode: 'CUISINE',
      categoryName: 'Ẩm thực Huế',
      descriptionVi: 'Đặc sản ăn vặt bánh ép bột lọc dẻo dai nướng khuôn gang nóng hổi cuộn rau răm đu đủ chua.',
      descriptionEn: 'Hot pressed tapioca snacks with egg, pate, and pickled papaya.',
      address: '69 Nhật Lệ, Phường Thuận Thành, TP Huế',
      latitude: 16.4738,
      longitude: 107.5801,
      geofenceRadiusMeters: 25,
      environmentType: 'INDOOR',
      ticketPriceVnd: 25000,
      greenRewardPoints: 20,
      thumbnailUrl: 'https://images.unsplash.com/photo-1555126634-323283e090fa',
    },
    {
      id: 'cau-go-lim-song-huong',
      name: 'Phố Đi Bộ Cầu Gỗ Lim Sông Hương',
      slug: 'cau-go-lim-song-huong',
      categoryCode: 'SCENIC_VIEW',
      categoryName: 'Cảnh quan View Ngày & Đêm',
      descriptionVi: 'Tuyến cầu đi bộ lát gỗ lim Nam Phi sát mặt nước sông Hương, góc ngắm cầu Tràng Tiền tuyệt đẹp.',
      descriptionEn: 'Ironwood pedestrian boardwalk right along the Perfume River.',
      address: 'Bờ Nam Sông Hương, Đường Lê Lợi, TP Huế',
      latitude: 16.4662,
      longitude: 107.5895,
      geofenceRadiusMeters: 35,
      environmentType: 'OUTDOOR',
      ticketPriceVnd: 0,
      greenRewardPoints: 25,
      thumbnailUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592',
    },
    {
      id: 'truong-quoc-hoc-hue',
      name: 'Trường Quốc Học Huế (Kiến Trúc Đỏ)',
      slug: 'truong-quoc-hoc-hue',
      categoryCode: 'SCENIC_VIEW',
      categoryName: 'Cảnh quan View Ngày & Đêm',
      descriptionVi: 'Ngôi trường trung học hơn 125 năm tuổi với sắc tường đỏ thẫm cổ kính bên bờ Nam sông Hương.',
      descriptionEn: 'Historic crimson-walled high school founded in 1896 by the Perfume River.',
      address: '12 Lê Lợi, Phường Vĩnh Ninh, TP Huế',
      latitude: 16.4622,
      longitude: 107.5848,
      geofenceRadiusMeters: 35,
      environmentType: 'SEMI_OUTDOOR',
      ticketPriceVnd: 0,
      greenRewardPoints: 25,
      thumbnailUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f',
    },
    {
      id: 'vuon-thanh-tra-thuy-bieu',
      name: 'Làng Sinh Thái Thanh Trà Thủy Biều',
      slug: 'lang-sinh-thai-thuy-bieu',
      categoryCode: 'OUTSKIRTS_ECO',
      categoryName: 'Ngoại thành Sinh thái',
      descriptionVi: 'Làng cổ ven sông Hương rợp bóng vườn thanh trà tiến vua và những ngôi nhà rường trăm tuổi.',
      descriptionEn: 'Eco-village famous for royal pomelo orchards and ancient garden houses.',
      address: 'Phường Thủy Biều, TP Huế',
      latitude: 16.4385,
      longitude: 107.5425,
      geofenceRadiusMeters: 45,
      environmentType: 'OUTDOOR',
      ticketPriceVnd: 0,
      greenRewardPoints: 30,
      thumbnailUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d',
    },
    {
      id: 'bien-thuan-an-hue',
      name: 'Bãi Biển Thuận An (Cửa Biển Cố Đô)',
      slug: 'bien-thuan-an-hue',
      categoryCode: 'OUTSKIRTS_ECO',
      categoryName: 'Ngoại thành Sinh thái',
      descriptionVi: 'Bãi biển hoang sơ sóng êm nơi dòng sông Hương hòa mình vào biển Đông, hải sản tươi ngon.',
      descriptionEn: 'Scenic beach where the Perfume River meets the East Sea.',
      address: 'Phường Thuận An, TP Huế',
      latitude: 16.5655,
      longitude: 107.6382,
      geofenceRadiusMeters: 50,
      environmentType: 'OUTDOOR',
      ticketPriceVnd: 0,
      greenRewardPoints: 30,
      thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    },
  ];

  constructor(private readonly inMemoryDb: InMemoryDbService) {}

  /**
   * Lấy toàn bộ kho cột mốc điểm đến cho Vòng Quay (loại bỏ các điểm tiện ích xăng/ATM/WC)
   */
  private getAllMilestonePool(): HuePlace[] {
    const basePlaces = this.inMemoryDb.places.filter(
      (p) => p.categoryCode !== 'UTILITY',
    );
    const existingIds = new Set(basePlaces.map((p) => p.id));
    const merged = [...basePlaces];
    for (const extra of this.supplementalMapMilestones) {
      if (!existingIds.has(extra.id)) {
        merged.push(extra);
        existingIds.add(extra.id);
      }
    }
    return merged;
  }

  /**
   * Lấy danh mục & các tiêu chí lọc nhanh cho Vòng Quay Ngẫu Nhiên
   */
  async getWheelFilters() {
    return {
      categories: [
        { code: 'ALL', name: 'Tất Cả Cột Mốc', icon: '🎲' },
        { code: 'HISTORICAL', name: 'Di Tích & Lăng Tẩm', icon: '🏛️' },
        { code: 'CAFE', name: 'Cà Phê Sống Ảo', icon: '☕' },
        { code: 'CUISINE', name: 'Món Ăn Đặc Sản', icon: '🍜' },
        { code: 'SCENIC_VIEW', name: 'Check-in View Đẹp', icon: '📸' },
        { code: 'OUTSKIRTS_ECO', name: 'Ngoại Thành Sinh Thái', icon: '🌲' },
        { code: 'INDOOR', name: 'Trong Nhà Ngày Mưa', icon: '🌧️' },
      ],
      quickCriteria: [
        { tag: 'CAFE_SONG_AO', label: 'Cà phê sống ảo cực chất', icon: '✨' },
        { tag: 'CAFE_MUOI', label: 'Cà phê muối chuẩn vị Cố Đô', icon: '☕' },
        { tag: 'VIEW_DEM_SONG_HUONG', label: 'Ngắm Huế lung linh về đêm', icon: '🌙' },
        { tag: 'CHECKIN_NGOAI_THANH', label: 'Đi trốn ngoại thành thông reo', icon: '🍃' },
        { tag: 'INDOOR_RAINY', label: 'Trốn mưa ngâu xứ Huế', icon: '🌧️' },
        { tag: 'NEARBY', label: 'Gần vị trí của tôi nhất', icon: '📍' },
      ],
    };
  }

  /**
   * Lọc các cột mốc từ bản đồ theo đúng tiêu chí yêu cầu
   */
  private filterMilestones(dto: SpinWheelDto): (HuePlace & { distanceMeters?: number })[] {
    const {
      categoryCode,
      filterTag,
      userLat,
      userLng,
      maxDistanceMeters = 12000,
      placeIds,
    } = dto;

    const allMilestones = this.getAllMilestonePool();
    let candidates: (HuePlace & { distanceMeters?: number })[] = [...allMilestones];

    // 1. Nếu người dùng đẩy trực tiếp danh sách cột mốc từ Bản đồ vào Vòng quay
    if (placeIds && placeIds.trim().length > 0) {
      const requestedKeys = placeIds
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
      if (requestedKeys.length > 0) {
        const matchedFromMap = allMilestones.filter((p) => {
          const idLow = p.id.toLowerCase();
          const slugLow = (p.slug || '').toLowerCase();
          const nameLow = p.name.toLowerCase();
          return requestedKeys.some(
            (k) => idLow === k || slugLow === k || nameLow.includes(k),
          );
        });
        if (matchedFromMap.length >= 2) {
          candidates = matchedFromMap;
        }
      }
    }

    // 2. Lọc theo danh mục (categoryCode)
    if (categoryCode && categoryCode !== 'ALL') {
      if (categoryCode === 'HISTORICAL') {
        candidates = candidates.filter((p) =>
          ['HISTORICAL', 'CULTURE_ART', 'CRAFT_VILLAGE'].includes(p.categoryCode),
        );
      } else if (categoryCode === 'INDOOR') {
        candidates = candidates.filter((p) => p.environmentType === 'INDOOR');
      } else if (categoryCode === 'SCENIC_VIEW') {
        candidates = candidates.filter((p) =>
          ['SCENIC_VIEW', 'CRAFT_VILLAGE'].includes(p.categoryCode),
        );
      } else {
        candidates = candidates.filter((p) => p.categoryCode === categoryCode);
      }
    }

    // 3. Lọc theo tiêu chí nhanh (filterTag)
    if (filterTag) {
      switch (filterTag) {
        case 'INDOOR_RAINY':
          candidates = candidates.filter((p) => p.environmentType === 'INDOOR');
          break;
        case 'CAFE_SONG_AO':
          candidates = candidates.filter((p) => p.categoryCode === 'CAFE');
          break;
        case 'CAFE_MUOI':
          candidates = candidates.filter(
            (p) =>
              p.categoryCode === 'CAFE' ||
              p.name.toLowerCase().includes('cà phê') ||
              p.name.toLowerCase().includes('trà'),
          );
          break;
        case 'DAC_SAN_HUE':
          candidates = candidates.filter((p) => p.categoryCode === 'CUISINE');
          break;
        case 'VIEW_DEM_SONG_HUONG':
          candidates = candidates.filter((p) =>
            ['SCENIC_VIEW', 'CAFE', 'CUISINE'].includes(p.categoryCode),
          );
          break;
        case 'CHECKIN_NGOAI_THANH':
          candidates = candidates.filter((p) =>
            ['OUTSKIRTS_ECO', 'CRAFT_VILLAGE', 'HISTORICAL'].includes(p.categoryCode),
          );
          break;
        default:
          break;
      }
    }

    // 4. Tính khoảng cách từ vị trí GPS của người dùng (nếu có)
    if (typeof userLat === 'number' && !isNaN(userLat) && typeof userLng === 'number' && !isNaN(userLng)) {
      candidates = candidates.map((p) => {
        const dist = this.inMemoryDb.calculateDistanceMeters(
          userLat,
          userLng,
          p.latitude,
          p.longitude,
        );
        return { ...p, distanceMeters: Math.round(dist) };
      });

      if (filterTag === 'NEARBY') {
        candidates.sort((a, b) => (a.distanceMeters ?? 0) - (b.distanceMeters ?? 0));
        candidates = candidates.slice(0, 8);
      } else {
        const withinRadius = candidates.filter(
          (p) => (p.distanceMeters ?? 0) <= maxDistanceMeters,
        );
        if (withinRadius.length >= 4) {
          candidates = withinRadius;
        }
      }
    }

    // Nếu bộ lọc quá hẹp (< 4 điểm), bổ sung thêm từ kho cột mốc cùng nhóm để vòng quay luôn đẹp (6-8 nan)
    if (candidates.length < 4) {
      const existing = new Set(candidates.map((c) => c.id));
      for (const fallbackPlace of allMilestones) {
        if (!existing.has(fallbackPlace.id)) {
          candidates.push(fallbackPlace);
          existing.add(fallbackPlace.id);
        }
        if (candidates.length >= 8) break;
      }
    }

    return candidates;
  }

  /**
   * Trả về danh sách các nan quạt đã lọc theo tiêu chí để hiển thị lên Vòng Quay trước khi quay
   */
  async getWheelCandidates(dto: SpinWheelDto) {
    const candidates = this.filterMilestones(dto);
    const shuffled =
      dto.filterTag === 'NEARBY'
        ? candidates
        : [...candidates].sort(() => 0.5 - Math.random());
    const poolSize = Math.min(Math.max(shuffled.length, 4), 8);
    const selectedPool = shuffled.slice(0, poolSize);

    const wheelSlices: WheelSlice[] = selectedPool.map((place, idx) => ({
      index: idx,
      placeId: place.id,
      name: place.name,
      categoryCode: place.categoryCode,
      categoryName: place.categoryName,
      latitude: place.latitude,
      longitude: place.longitude,
      address: place.address,
      descriptionVi: place.descriptionVi,
      environmentType: place.environmentType,
      ticketPriceVnd: place.ticketPriceVnd,
      thumbnailUrl: place.thumbnailUrl,
      colorHex: this.sliceColors[idx % this.sliceColors.length],
      greenRewardPoints: place.greenRewardPoints,
      distanceMeters: place.distanceMeters,
    }));

    return {
      totalMatched: candidates.length,
      categoryCode: dto.categoryCode || 'ALL',
      filterTag: dto.filterTag || null,
      wheelSlices,
    };
  }

  /**
   * Kích hoạt Vòng quay ngẫu nhiên: Lọc địa điểm -> Lập bánh xe 6-8 nan -> Chọn kết quả ngẫu nhiên
   */
  async spinWheel(dto: SpinWheelDto): Promise<SpinResult> {
    const { categoryCode, filterTag } = dto;
    this.logger.log(
      `Kích hoạt Vòng quay Random: Thể loại=${categoryCode || 'ALL'}, Tag=${filterTag || 'NONE'}`,
    );

    const { wheelSlices } = await this.getWheelCandidates(dto);
    const poolSize = wheelSlices.length;

    // Thuật toán chọn địa điểm chiến thắng
    const winningIndex = Math.floor(Math.random() * poolSize);
    const winningSlice = wheelSlices[winningIndex];

    const allMilestones = this.getAllMilestonePool();
    const basePlace =
      allMilestones.find((p) => p.id === winningSlice.placeId) || allMilestones[0];
    const winningPlace: HuePlace & { distanceMeters?: number } = {
      ...basePlace,
      distanceMeters: winningSlice.distanceMeters,
    };

    // Tính toán góc quay (Target Rotation) để kim chỉ hướng 12 giờ (góc 270 độ trên Canvas)
    // dừng chính xác ở tâm nan quạt chiến thắng (winningIndex)
    const sliceAngle = 360 / poolSize;
    const baseSpins = 5 * 360;
    const stopAngle =
      (270 - (winningIndex * sliceAngle + sliceAngle / 2) + 360) % 360;
    const targetRotationDegrees = baseSpins + stopAngle;

    const aiRecommendationReason = this.generateAiReason(winningPlace);

    return {
      wheelSlices,
      winningIndex,
      winningPlace,
      targetRotationDegrees,
      aiRecommendationReason,
      message: `Vòng quay HUEGO đã quyết định thay bạn: Hãy ghé thăm [${winningPlace.name}] ngay nào!`,
    };
  }

  private generateAiReason(place: HuePlace): string {
    if (place.categoryCode === 'CAFE') {
      return `Không gian tại ${place.name} cực kỳ lý tưởng để bạn sống ảo, nhâm nhi tách cà phê thơm và lắng đọng giữa nhịp sống Cố Đô thanh bình.`;
    }
    if (place.categoryCode === 'CUISINE') {
      return `${place.name} là địa chỉ ẩm thực mang trọn vẹn phong vị Cố Đô Huế (${place.address}), đảm bảo bạn sẽ mê mẩn ngay lần đầu thưởng thức!`;
    }
    if (place.environmentType === 'INDOOR') {
      return `${place.name} có không gian trong nhà tuyệt đẹp tại ${place.address}, rất thích hợp để khám phá văn hóa triều Nguyễn bất chấp nắng mưa.`;
    }
    if (place.categoryCode === 'HISTORICAL' || place.categoryCode === 'CULTURE_ART') {
      return `Cột mốc di sản nổi tiếng bậc nhất Cố Đô Huế tại ${place.address} — điểm đến hoàn hảo để check-in cổ phục và tích lũy +${place.greenRewardPoints} GP!`;
    }
    return `Điểm dừng chân tuyệt đẹp tại ${place.address} với góc nhìn thơ mộng và không khí trong lành đặc trưng xứ Huế.`;
  }
}
