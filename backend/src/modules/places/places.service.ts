import { Injectable, Optional, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from './entities/place.entity';
import { PortalService } from '../portal/portal.service';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepo: Repository<Place>,
    @Optional()
    @Inject(PortalService)
    private readonly portalService?: PortalService,
  ) {}

  async getAllPlaces(categoryCode?: string, envType?: string) {
    if (this.portalService && this.portalService.placesAll && this.portalService.placesAll.length > 0) {
      const verticalToCat: Record<string, string> = {
        tour: 'HISTORICAL',
        fnb: 'CUISINE',
        cafe: 'CAFE',
        stay: 'STAY',
        specialty: 'SPECIALTY',
        service: 'UTILITY',
      };

      let items = this.portalService.placesAll.map((p) => {
        const catCode = verticalToCat[p.vertical] || 'HISTORICAL';
        return {
          id: p.id,
          name: p.name_vi || p.name,
          slug: p.id,
          categoryCode: catCode,
          categoryName: Array.isArray(p.subcategory) ? p.subcategory[0] : p.category || p.vertical,
          descriptionVi: p.description_vi || p.address_vi || p.name_vi || p.name,
          descriptionEn: p.description_en || p.name_en || '',
          address: p.address_vi || p.address || 'Thành phố Huế',
          latitude: p.lat || 16.4637,
          longitude: p.lng || 107.5909,
          geofenceRadiusMeters: 40,
          environmentType: p.vertical === 'tour' || p.vertical === 'service' ? 'OUTDOOR' : 'INDOOR',
          ticketPriceVnd: 0,
          greenRewardPoints: 25,
          thumbnailUrl: p.coverPhotoUrl || 'https://pub-2a0274a4c8834f6f854b995bcd23969d.r2.dev/places/heritage-dai-noi-hue.webp',
          googleRating: p.googleRating,
          googleReviewCount: p.googleReviewCount,
        };
      });

      if (categoryCode) {
        items = items.filter((p) => p.categoryCode === categoryCode);
      }
      if (envType) {
        items = items.filter((p) => p.environmentType === envType);
      }
      return items;
    }

    const query = this.placeRepo.createQueryBuilder('place');
    if (categoryCode) query.andWhere('place.categoryCode = :categoryCode', { categoryCode });
    if (envType) query.andWhere('place.environmentType = :envType', { envType });
    return query.getMany();
  }

  async getNearbyPlaces(longitude: number, latitude: number, radiusMeters: number = 3000) {
    const places = await this.getAllPlaces();
    const R = 6371000;
    return places
      .map((p) => {
        const dLat = ((p.latitude - latitude) * Math.PI) / 180;
        const dLon = ((p.longitude - longitude) * Math.PI) / 180;
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((latitude * Math.PI) / 180) *
            Math.cos((p.latitude * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return {
          ...p,
          distanceMeters: Math.round(distance * 10) / 10,
        };
      })
      .filter((p) => p.distanceMeters <= radiusMeters)
      .sort((a, b) => a.distanceMeters - b.distanceMeters);
  }
}
