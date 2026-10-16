import { Injectable, NotFoundException, BadRequestException, Logger, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Itinerary } from './entities/itinerary.entity';
import { ItineraryStop } from './entities/itinerary-stop.entity';
import { Place } from '../places/entities/place.entity';
import { WeatherService } from '../weather/weather.service';
import { CreateItineraryDto } from './dto/create-itinerary.dto';

@Injectable()
export class ItineraryService {
  private readonly logger = new Logger(ItineraryService.name);

  constructor(
    @InjectRepository(Itinerary) private readonly itineraryRepo: Repository<Itinerary>,
    @InjectRepository(ItineraryStop) private readonly stopRepo: Repository<ItineraryStop>,
    @InjectRepository(Place) private readonly placeRepo: Repository<Place>,
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

  // Tối ưu hóa thứ tự
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
          // Swap and reverse the sub-array
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

    const walkSpeed = 5; // km/h
    const bikeSpeed = 15; // km/h
    const co2SavedPerKm = parseFloat(process.env.CO2_SAVED_PER_KM || '0.12'); // kg/km (Ước lượng so với đi xe máy)

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

  // Gợi ý thời tiết
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
        // Tìm 3 điểm indoor gần nhất
        const nearestIndoors = [...indoorPlaces]
          .filter(p => !itinerary.stops.find(s => s.placeId === p.id)) // không nằm sẵn trong lộ trình
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

  // Tiện ích: Haversine
  private haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // km
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
