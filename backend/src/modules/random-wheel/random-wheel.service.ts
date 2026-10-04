import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InMemoryDbService, HuePlace } from '../../database/in-memory-db.service';
import { SpinWheelDto } from './dto/spin-wheel.dto';

export interface WheelSlice {
  index: number;
  placeId: string;
  name: string;
  categoryName: string;
  thumbnailUrl: string;
  colorHex: string;
  greenRewardPoints: number;
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

  constructor(private readonly inMemoryDb: InMemoryDbService) {}

  /**
   * Lấy danh mục & các tiêu chí lọc nhanh cho Vòng Quay Ngẫu Nhiên
   */
  async getWheelFilters() {
    return {
      categories: [
        { code: 'ALL', name: 'Tất Cả Thể Loại', icon: '🎲' },
        { code: 'CAFE', name: 'Quán Cà Phê Huế', icon: '☕' },
        { code: 'CUISINE', name: 'Món Ăn Đặc Sản', icon: '🍜' },
        { code: 'HISTORICAL', name: 'Di Tích & Di Sản', icon: '🏛️' },
        { code: 'SCENIC_VIEW', name: 'Check-in View Đẹp', icon: '📸' },
        { code: 'OUTSKIRTS_ECO', name: 'Ngoại Thành Sinh Thái', icon: '🌲' },
      ],
      quickCriteria: [
        { tag: 'CAFE_SONG_AO', label: 'Cà phê sống ảo cực chất', icon: '✨' },
        { tag: 'CAFE_MUOI', label: 'Cà phê muối chuẩn vị Cố Đô', icon: '☕' },
        { tag: 'VIEW_DEM_SONG_HUONG', label: 'Ngắm Huế lung linh về đêm', icon: '🌙' },
        { tag: 'CHECKIN_NGOAI_THANH', label: 'Đi trốn ngoại thành thông reo', icon: '🍃' },
        { tag: 'INDOOR_RAINY', label: 'Trốn mưa ngâu xứ Huế', icon: '🌧️' },
      ],
    };
  }

  /**
   * Kích hoạt Vòng quay ngẫu nhiên: Lọc địa điểm -> Lập bánh xe 6-8 nan -> Chọn kết quả ngẫu nhiên
   */
  async spinWheel(dto: SpinWheelDto): Promise<SpinResult> {
    const { categoryCode, filterTag, userLat, userLng, maxDistanceMeters = 10000 } = dto;
    this.logger.log(`Kích hoạt Vòng quay Random: Thể loại=${categoryCode || 'ALL'}, Tag=${filterTag || 'NONE'}`);

    // 1. Lọc ứng viên từ kho dữ liệu
    let candidates = [...this.inMemoryDb.places];

    if (categoryCode && categoryCode !== 'ALL') {
      candidates = candidates.filter((p) => p.categoryCode === categoryCode);
    }

    if (filterTag === 'INDOOR_RAINY') {
      candidates = candidates.filter((p) => p.environmentType === 'INDOOR');
    }

    // Nếu người dùng bật GPS, tính khoảng cách và ưu tiên các điểm trong bán kính
    if (userLat && userLng) {
      candidates = candidates.map((p) => {
        const dist = this.inMemoryDb.calculateDistanceMeters(userLat, userLng, p.latitude, p.longitude);
        return { ...p, distanceMeters: Math.round(dist) };
      }).filter((p: any) => p.distanceMeters <= maxDistanceMeters);
    }

    // Nếu bộ lọc quá hẹp, quay về toàn bộ danh sách để luôn có đủ điểm cho vòng quay
    if (candidates.length < 3) {
      candidates = [...this.inMemoryDb.places];
    }

    // Shuffle mảng ứng viên và lấy 6 đến 8 điểm làm các nan quạt
    const shuffled = candidates.sort(() => 0.5 - Math.random());
    const poolSize = Math.min(Math.max(shuffled.length, 4), 8);
    const selectedPool = shuffled.slice(0, poolSize);

    // 2. Tạo danh sách lát cắt (Wheel Slices) cho bánh xe
    const wheelSlices: WheelSlice[] = selectedPool.map((place, idx) => ({
      index: idx,
      placeId: place.id,
      name: place.name,
      categoryName: place.categoryName,
      thumbnailUrl: place.thumbnailUrl,
      colorHex: this.sliceColors[idx % this.sliceColors.length],
      greenRewardPoints: place.greenRewardPoints,
    }));

    // 3. Thuật toán chọn địa điểm chiến thắng (Weighted Random dựa trên Green Points & Rating)
    const winningIndex = Math.floor(Math.random() * wheelSlices.length);
    const winningSlice = wheelSlices[winningIndex];
    const winningPlace = selectedPool[winningIndex];

    // 4. Tính toán góc quay (Target Rotation) cho Flutter Mobile Canvas Animation
    // Một vòng = 360 độ, mỗi nan quạt = 360 / poolSize độ
    const sliceAngle = 360 / poolSize;
    // Quay 5 vòng đầy đủ (5 * 360 = 1800 độ) + góc dừng tại nan chiến thắng
    const baseSpins = 5 * 360;
    const stopAngle = 360 - (winningIndex * sliceAngle + sliceAngle / 2);
    const targetRotationDegrees = baseSpins + stopAngle;

    // 5. Sinh thông điệp gợi ý hấp dẫn mang đậm phong vị Cố Đô
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
      return `Không gian cực kỳ lý tưởng để bạn sống ảo, nhâm nhi tách cà phê thơm và lắng đọng giữa nhịp sống Cố Đô thanh bình.`;
    }
    if (place.categoryCode === 'CUISINE') {
      return `Món ngon gia truyền mang trọn vẹn phong vị ẩm thực Cố Đô, đảm bảo bạn sẽ không phải hối tiếc khi thưởng thức!`;
    }
    if (place.environmentType === 'INDOOR') {
      return `Không gian kiến trúc trong nhà tuyệt mỹ, chứa đựng nhiều cổ vật và câu chuyện triều Nguyễn đầy lôi cuốn.`;
    }
    return `Địa điểm check-in không thể bỏ qua với góc nhìn tuyệt đẹp và không khí trong lành ven sông Hương.`;
  }
}
