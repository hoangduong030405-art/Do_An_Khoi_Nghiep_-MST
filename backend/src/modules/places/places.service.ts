import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from '../../database/in-memory-db.service';

@Injectable()
export class PlacesService {
  constructor(private readonly inMemoryDb: InMemoryDbService) {}

  async getAllPlaces(categoryCode?: string, envType?: string) {
    let places = this.inMemoryDb.places;

    if (categoryCode) {
      places = places.filter((p) => p.categoryCode === categoryCode);
    }
    if (envType) {
      places = places.filter((p) => p.environmentType === envType);
    }

    return places;
  }

  async getNearbyPlaces(longitude: number, latitude: number, radiusMeters: number = 3000) {
    return this.inMemoryDb.places
      .map((p) => {
        const distance = this.inMemoryDb.calculateDistanceMeters(
          latitude,
          longitude,
          p.latitude,
          p.longitude,
        );
        return {
          ...p,
          distanceMeters: Math.round(distance * 10) / 10,
        };
      })
      .filter((p) => p.distanceMeters <= radiusMeters)
      .sort((a, b) => a.distanceMeters - b.distanceMeters);
  }
}
