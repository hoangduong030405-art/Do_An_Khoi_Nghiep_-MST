import { Injectable, NotFoundException, BadRequestException, Logger, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import * as crypto from 'crypto';
import { Itinerary } from './entities/itinerary.entity';
import { ItineraryStop } from './entities/itinerary-stop.entity';
import { ItineraryShare } from './entities/itinerary-share.entity';
import { Place } from '../places/entities/place.entity';
import { User } from '../auth/entities/user.entity';
import { WeatherService } from '../weather/weather.service';
import { CreateItineraryDto } from './dto/create-itinerary.dto';
import { CreateShareDto } from './dto/create-share.dto';
import { UpdateShareDto } from './dto/update-share.dto';

@Injectable()
export class ItineraryService {
  private readonly logger = new Logger(ItineraryService.name);

  // Theo dõi lượt xem chống spam theo IP (1 lần/giờ)
  private readonly ipShareViews = new Map<string, number>(); // key: `${ip}:${shareId}` -> timestamp

  constructor(
    @InjectRepository(Itinerary) private readonly itineraryRepo: Repository<Itinerary>,
    @InjectRepository(ItineraryStop) private readonly stopRepo: Repository<ItineraryStop>,
    @InjectRepository(ItineraryShare) private readonly shareRepo: Repository<ItineraryShare>,
    @InjectRepository(Place) private readonly placeRepo: Repository<Place>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly weatherService: WeatherService,
  ) {}

  async createItinerary(userId: string, dto: CreateItineraryDto) {
    if (dto.placeIds.length > 12) {
      throw new BadRequestException('Một lộ trình chỉ được phép tối đa 12 địa điểm.');
    }
    
    const itinerary = this.itineraryRepo.create({
      userId,
      title: dto.title,
      date: new Date(dto.date),
    });
    const savedItinerary = await this.itineraryRepo.save(itinerary);

    if (dto.placeIds && dto.placeIds.length > 0) {
      const stops = dto.placeIds.map((placeId, index) => {
        return this.stopRepo.create({
          itineraryId: savedItinerary.id,
          placeId,
          orderIndex: index
        });
      });
      await this.stopRepo.save(stops);
    }
    return this.getItinerary(userId, savedItinerary.id);
  }

  async getMyItineraries(userId: string) {
    return this.itineraryRepo.find({
      where: { userId },
      order: { date: 'DESC' },
      relations: ['stops', 'stops.place']
    });
  }

  async getItinerary(userId: string, id: string) {
    const itinerary = await this.itineraryRepo.findOne({
      where: { id },
      relations: ['stops', 'stops.place']
    });
    if (!itinerary) throw new NotFoundException('Không tìm thấy lộ trình');
    if (itinerary.userId !== userId) throw new ForbiddenException('Bạn không có quyền truy cập lộ trình này');
    
    // Sắp xếp stops
    itinerary.stops.sort((a, b) => a.orderIndex - b.orderIndex);
    return itinerary;
  }

  async updateStops(userId: string, itineraryId: string, placeIds: string[]) {
    if (placeIds.length > 12) {
      throw new BadRequestException('Một lộ trình chỉ được phép tối đa 12 địa điểm.');
    }
    const itinerary = await this.getItinerary(userId, itineraryId);
    
    // Xóa tất cả stops cũ
    await this.stopRepo.delete({ itineraryId });
    
    // Tạo stops mới
    const stops = placeIds.map((placeId, index) => {
      return this.stopRepo.create({
        itineraryId,
        placeId,
        orderIndex: index
      });
    });
    await this.stopRepo.save(stops);
    return this.getItinerary(userId, itineraryId);
  }

  async deleteItinerary(userId: string, itineraryId: string) {
    const itinerary = await this.getItinerary(userId, itineraryId);
    await this.itineraryRepo.remove(itinerary);
    return { success: true };
  }

  // --- API CHIA SẺ LỘ TRÌNH (CHO CHỦ SỞ HỮU) ---

  // --- KIỂM SOÁT HẠN MỨC CHIA SẺ VÀ SAO CHÉP TRONG DATABASE (BỀN VỮNG QUA KHỞI ĐỘNG LẠI) ---

  private async checkDailyShareQuota(userId: string) {
    if (this.shareRepo && typeof this.shareRepo.createQueryBuilder === 'function') {
      const todayCount = await this.shareRepo
        .createQueryBuilder('share')
        .where('share.ownerId = :userId', { userId })
        .andWhere(
          "(timezone('Asia/Ho_Chi_Minh', timezone('UTC', share.createdAt)))::date = (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Ho_Chi_Minh')::date",
        )
        .getCount();

      if (todayCount >= 20) {
        throw new BadRequestException('Bạn đã đạt giới hạn tối đa 20 lần tạo liên kết chia sẻ mỗi ngày.');
      }
    }
  }

  private async checkDailyCopyQuota(userId: string) {
    if (this.itineraryRepo && typeof this.itineraryRepo.createQueryBuilder === 'function') {
      const todayCount = await this.itineraryRepo
        .createQueryBuilder('itinerary')
        .where('itinerary.userId = :userId', { userId })
        .andWhere("itinerary.title LIKE 'Bản sao:%'")
        .andWhere(
          "(timezone('Asia/Ho_Chi_Minh', timezone('UTC', itinerary.createdAt)))::date = (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Ho_Chi_Minh')::date",
        )
        .getCount();

      if (todayCount >= 20) {
        throw new BadRequestException('Bạn đã đạt giới hạn tối đa 20 bản sao lộ trình mỗi ngày.');
      }
    }
  }

  async createShare(userId: string, itineraryId: string, dto: CreateShareDto, publicBaseUrl: string) {
    const itinerary = await this.getItinerary(userId, itineraryId);

    // Kiểm tra quota 20 lần tạo link / ngày trực tiếp trong CSDL (theo múi giờ Việt Nam)
    await this.checkDailyShareQuota(userId);

    // Mỗi lộ trình tối đa 1 link hoạt động: thu hồi link cũ nếu có
    await this.shareRepo.update(
      { itineraryId, revokedAt: IsNull() },
      { revokedAt: new Date() },
    );

    // Sinh token ngẫu nhiên base64url dài 24 bytes (192 bits entropy)
    const rawToken = crypto.randomBytes(24).toString('base64url');
    // Lưu hash SHA-256 (tuyệt đối không lưu token thô vào DB)
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

    const expiresInDays = dto.expiresInDays && dto.expiresInDays > 0 ? Math.min(dto.expiresInDays, 365) : 30;
    const expiresAt = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000);

    const share = this.shareRepo.create({
      itineraryId: itinerary.id,
      ownerId: userId,
      tokenHash,
      expiresAt,
      includeNotes: dto.includeNotes === true,
      allowCopy: dto.allowCopy !== false,
      viewCount: 0,
    });

    await this.shareRepo.save(share);

    const cleanBaseUrl = publicBaseUrl.replace(/\/+$/, '');
    return {
      shareUrl: `${cleanBaseUrl}/s/${rawToken}`,
      expiresAt: share.expiresAt,
      includeNotes: share.includeNotes,
      allowCopy: share.allowCopy,
      note: 'Token này chỉ hiển thị một lần duy nhất vì lý do an toàn bảo mật.',
    };
  }

  async getShareStatus(userId: string, itineraryId: string) {
    await this.getItinerary(userId, itineraryId);

    const share = await this.shareRepo.findOne({
      where: { itineraryId, revokedAt: IsNull() },
      order: { createdAt: 'DESC' },
    });

    if (!share || (share.expiresAt && new Date() > share.expiresAt)) {
      return { isShared: false };
    }

    // Tuyệt đối KHÔNG trả lại token thô
    return {
      isShared: true,
      expiresAt: share.expiresAt,
      viewCount: share.viewCount,
      lastViewedAt: share.lastViewedAt,
      includeNotes: share.includeNotes,
      allowCopy: share.allowCopy,
      createdAt: share.createdAt,
    };
  }

  async updateShare(userId: string, itineraryId: string, dto: UpdateShareDto) {
    await this.getItinerary(userId, itineraryId);

    const share = await this.shareRepo.findOne({
      where: { itineraryId, revokedAt: IsNull() },
      order: { createdAt: 'DESC' },
    });

    if (!share || (share.expiresAt && new Date() > share.expiresAt)) {
      throw new NotFoundException('Không tìm thấy liên kết chia sẻ đang hoạt động.');
    }

    if (typeof dto.includeNotes === 'boolean') {
      share.includeNotes = dto.includeNotes;
    }
    if (typeof dto.allowCopy === 'boolean') {
      share.allowCopy = dto.allowCopy;
    }
    if (dto.expiresInDays && dto.expiresInDays > 0) {
      const days = Math.min(dto.expiresInDays, 365);
      share.expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    }

    await this.shareRepo.save(share);

    return {
      isShared: true,
      expiresAt: share.expiresAt,
      viewCount: share.viewCount,
      lastViewedAt: share.lastViewedAt,
      includeNotes: share.includeNotes,
      allowCopy: share.allowCopy,
    };
  }

  async revokeShare(userId: string, itineraryId: string) {
    await this.getItinerary(userId, itineraryId);

    await this.shareRepo.update(
      { itineraryId, revokedAt: IsNull() },
      { revokedAt: new Date() },
    );

    return { success: true, message: 'Đã thu hồi liên kết chia sẻ.' };
  }

  // --- API CÔNG KHAI (KHÔNG CẦN JWT) ---

  async getSharedItinerary(rawToken: string, clientIp?: string) {
    if (!rawToken || typeof rawToken !== 'string') {
      throw new NotFoundException('Liên kết không tồn tại hoặc đã hết hạn');
    }

    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

    const share = await this.shareRepo.findOne({
      where: { tokenHash },
      relations: ['itinerary', 'itinerary.stops', 'itinerary.stops.place', 'owner'],
    });

    if (!share) {
      throw new NotFoundException('Liên kết không tồn tại hoặc đã hết hạn');
    }

    // So sánh thời gian cố định (timing-safe)
    const hashBuf = Buffer.from(share.tokenHash, 'hex');
    const targetBuf = Buffer.from(tokenHash, 'hex');
    if (hashBuf.length !== targetBuf.length || !crypto.timingSafeEqual(hashBuf, targetBuf)) {
      throw new NotFoundException('Liên kết không tồn tại hoặc đã hết hạn');
    }

    // Kiểm tra thu hồi hoặc hết hạn
    if (share.revokedAt || (share.expiresAt && new Date() > share.expiresAt)) {
      throw new NotFoundException('Liên kết không tồn tại hoặc đã hết hạn');
    }

    if (!share.itinerary) {
      throw new NotFoundException('Liên kết không tồn tại hoặc đã hết hạn');
    }

    // Tăng viewCount tối đa 1 lần mỗi IP mỗi giờ
    const viewKey = `${clientIp || '127.0.0.1'}:${share.id}`;
    const lastViewTime = this.ipShareViews.get(viewKey) || 0;
    const now = Date.now();
    if (now - lastViewTime > 3600000) {
      this.ipShareViews.set(viewKey, now);
      share.viewCount = (share.viewCount || 0) + 1;
      share.lastViewedAt = new Date();
      await this.shareRepo.save(share);
    }

    // Sắp xếp thứ tự stops
    const stops = [...(share.itinerary.stops || [])].sort((a, b) => a.orderIndex - b.orderIndex);

    // Tính tổng quãng đường và thời gian di chuyển
    let totalDistanceKm = 0;
    for (let i = 0; i < stops.length - 1; i++) {
      const p1 = stops[i].place;
      const p2 = stops[i + 1].place;
      if (p1 && p2 && p1.latitude && p1.longitude && p2.latitude && p2.longitude) {
        totalDistanceKm += this.haversine(p1.latitude, p1.longitude, p2.latitude, p2.longitude);
      }
    }
    totalDistanceKm = Math.round(totalDistanceKm * 100) / 100;
    const estimatedDurationMin = Math.round((totalDistanceKm / 15) * 60) + (stops.length * 45);
    const co2SavedKg = Math.round(totalDistanceKm * 0.12 * 100) / 100;

    // Chỉ trả dữ liệu công khai tối thiểu: KHÔNG email, KHÔNG userId, KHÔNG qrToken, KHÔNG điểm xanh
    return {
      title: share.itinerary.title,
      date: share.itinerary.date,
      sharedBy: share.owner?.fullName || 'Một du khách HUEGO',
      updatedAt: share.itinerary.updatedAt,
      expiresAt: share.expiresAt,
      allowCopy: share.allowCopy,
      includeNotes: share.includeNotes,
      totalDistanceKm,
      estimatedDurationMin,
      estimatedCo2SavedKg: co2SavedKg,
      stops: stops.map((s, idx) => ({
        orderIndex: idx + 1,
        placeId: s.placeId,
        name: s.place?.name || s.placeId,
        category: s.place?.categoryName || s.place?.categoryCode || 'Di tích & Thắng cảnh',
        latitude: s.place?.latitude || 0,
        longitude: s.place?.longitude || 0,
        address: s.place?.address || 'Thành phố Huế',
        plannedStart: s.plannedStart || null,
        photo: s.place?.thumbnailUrl || '/images/pois/dai-noi-hue.jpg',
        // Ghi chú CHỈ xuất hiện khi includeNotes = true
        note: share.includeNotes ? (s.note || null) : undefined,
      })),
    };
  }

  async copySharedItinerary(userId: string, rawToken: string) {
    if (!rawToken || typeof rawToken !== 'string') {
      throw new NotFoundException('Liên kết không tồn tại hoặc đã hết hạn');
    }

    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

    const share = await this.shareRepo.findOne({
      where: { tokenHash },
      relations: ['itinerary', 'itinerary.stops'],
    });

    if (!share || share.revokedAt || (share.expiresAt && new Date() > share.expiresAt) || !share.itinerary) {
      throw new NotFoundException('Liên kết không tồn tại hoặc đã hết hạn');
    }

    if (!share.allowCopy) {
      throw new BadRequestException('Lộ trình này không cho phép sao chép.');
    }

    // Giới hạn 20 bản sao mỗi ngày mỗi user trực tiếp từ CSDL
    await this.checkDailyCopyQuota(userId);

    // Tạo lộ trình mới thuộc tài khoản người sao chép
    const newItinerary = this.itineraryRepo.create({
      userId,
      title: `Bản sao: ${share.itinerary.title}`,
      date: share.itinerary.date || new Date(),
    });
    const savedItinerary = await this.itineraryRepo.save(newItinerary);

    // Sao chép stops (lọc bỏ ghi chú nếu includeNotes = false)
    const sortedStops = [...share.itinerary.stops].sort((a, b) => a.orderIndex - b.orderIndex);
    const newStops = sortedStops.map((s, index) => {
      return this.stopRepo.create({
        itineraryId: savedItinerary.id,
        placeId: s.placeId,
        orderIndex: index,
        plannedStart: s.plannedStart,
        note: share.includeNotes ? s.note : null,
      });
    });

    await this.stopRepo.save(newStops);

    return {
      newItineraryId: savedItinerary.id,
      title: savedItinerary.title,
      stopsCount: newStops.length,
      message: 'Đã sao chép thành công vào lộ trình của bạn.',
    };
  }

  // --- TIỆN ÍCH TỐI ƯU HÓA THỨ TỰ ---

  async optimizeRoute(placeIds: string[], startLat?: number, startLng?: number) {
    if (placeIds.length === 0) return [];
    if (placeIds.length > 12) throw new BadRequestException('Không thể tối ưu quá 12 địa điểm cùng lúc.');

    let places = await this.placeRepo.findByIds(placeIds);
    if ((!places || places.length !== placeIds.length) && typeof this.placeRepo.createQueryBuilder === 'function') {
      places = await this.placeRepo.createQueryBuilder('place')
        .where('place.id IN (:...placeIds) OR place.slug IN (:...placeIds)', { placeIds })
        .getMany();
    }
    if (!places || places.length !== placeIds.length) {
      throw new BadRequestException('Một hoặc nhiều placeId không hợp lệ.');
    }

    // Nearest Neighbor
    let unvisited = [...places];
    let currentLat = startLat ?? places[0].latitude;
    let currentLng = startLng ?? places[0].longitude;
    
    const optimized: Place[] = [];
    
    while(unvisited.length > 0) {
      let nearestIdx = 0;
      let minDistance = Infinity;
      for(let i=0; i<unvisited.length; i++) {
        const d = this.haversine(currentLat, currentLng, unvisited[i].latitude, unvisited[i].longitude);
        if (d < minDistance) {
          minDistance = d;
          nearestIdx = i;
        }
      }
      const nearest = unvisited[nearestIdx];
      optimized.push(nearest);
      currentLat = nearest.latitude;
      currentLng = nearest.longitude;
      unvisited.splice(nearestIdx, 1);
    }

    // 2-Opt Cải thiện
    let improved = true;
    while (improved) {
      improved = false;
      for (let i = 0; i < optimized.length - 1; i++) {
        for (let k = i + 1; k < optimized.length; k++) {
          const dBefore = this.calculateTotalDistance(optimized);
          const newRoute = [
            ...optimized.slice(0, i),
            ...optimized.slice(i, k + 1).reverse(),
            ...optimized.slice(k + 1)
          ];
          const dAfter = this.calculateTotalDistance(newRoute);
          if (dAfter < dBefore) {
            optimized.splice(0, optimized.length, ...newRoute);
            improved = true;
          }
        }
      }
    }

    // Tính toán số liệu
    let totalDistanceKm = 0;
    const routeData = [];
    currentLat = startLat ?? optimized[0].latitude;
    currentLng = startLng ?? optimized[0].longitude;

    for (const place of optimized) {
      const d = this.haversine(currentLat, currentLng, place.latitude, place.longitude);
      totalDistanceKm += d;
      routeData.push({
        place,
        distanceFromPrevKm: Math.round(d * 100) / 100
      });
      currentLat = place.latitude;
      currentLng = place.longitude;
    }

    const walkSpeed = 5;
    const bikeSpeed = 15;
    const co2SavedPerKm = parseFloat(process.env.CO2_SAVED_PER_KM || '0.12');

    return {
      optimizedRoute: routeData.map(r => r.place.id),
      routeDetails: routeData,
      totalDistanceKm: Math.round(totalDistanceKm * 100) / 100,
      estimatedTimeWalkMinutes: Math.round((totalDistanceKm / walkSpeed) * 60),
      estimatedTimeBikeMinutes: Math.round((totalDistanceKm / bikeSpeed) * 60),
      co2SavedKg: Math.round(totalDistanceKm * co2SavedPerKm * 100) / 100,
      note: 'CO2 tiết kiệm là ước lượng dựa trên việc thay thế phương tiện cá nhân (xe máy) bằng đi bộ hoặc xe đạp.'
    };
  }

  async getWeatherSuggestions(userId: string, itineraryId: string) {
    const itinerary = await this.getItinerary(userId, itineraryId);
    const weather = await this.weatherService.getCurrentHueWeather();

    if (!weather.isRaining && !weather.isExtremelyHot) {
      return {
        weather,
        suggestions: [],
        message: 'Thời tiết đẹp, không cần thay đổi lịch trình.'
      };
    }

    const suggestions = [];
    const allPlaces = await this.placeRepo.find();
    const indoorPlaces = allPlaces.filter(p => p.environmentType === 'INDOOR' || p.environmentType === 'SEMI_OUTDOOR');

    for (const stop of itinerary.stops) {
      const place = stop.place;
      if (place && place.environmentType === 'OUTDOOR') {
        const nearestIndoors = [...indoorPlaces]
          .filter(p => !itinerary.stops.find(s => s.placeId === p.id))
          .sort((a, b) => this.haversine(place.latitude, place.longitude, a.latitude, a.longitude) 
                        - this.haversine(place.latitude, place.longitude, b.latitude, b.longitude))
          .slice(0, 3);
        
        if (nearestIndoors.length > 0) {
          suggestions.push({
            originalStop: { id: stop.id, placeId: place.id, name: place.name },
            reason: weather.isRaining ? 'Trời đang mưa, điểm này ở ngoài trời.' : 'Trời nắng gắt, điểm này thiếu bóng râm.',
            alternatives: nearestIndoors.map(p => ({
              placeId: p.id,
              name: p.name,
              distanceKm: Math.round(this.haversine(place.latitude, place.longitude, p.latitude, p.longitude) * 100) / 100
            }))
          });
        }
      }
    }

    return {
      weather,
      suggestions,
      message: 'Thời tiết bất lợi, có một số điểm đến ngoài trời nên được thay thế.'
    };
  }

  async swapStop(userId: string, itineraryId: string, oldPlaceId: string, newPlaceId: string) {
    const itinerary = await this.getItinerary(userId, itineraryId);
    const stop = itinerary.stops.find(s => s.placeId === oldPlaceId);
    if (!stop) throw new BadRequestException('Không tìm thấy địa điểm cũ trong lộ trình');

    const newPlace = await this.placeRepo.findOne({ where: { id: newPlaceId } });
    if (!newPlace) throw new BadRequestException('Địa điểm mới không tồn tại');

    stop.placeId = newPlaceId;
    await this.stopRepo.save(stop);
    
    return this.getItinerary(userId, itineraryId);
  }

  private haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private calculateTotalDistance(route: Place[]): number {
    let dist = 0;
    for (let i = 0; i < route.length - 1; i++) {
      dist += this.haversine(route[i].latitude, route[i].longitude, route[i+1].latitude, route[i+1].longitude);
    }
    return dist;
  }
}
