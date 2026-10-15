import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PortalService implements OnModuleInit {
  private readonly logger = new Logger(PortalService.name);
  private getDataDir(): string {
    const candidates = [
      path.join(process.cwd(), 'data'),
      path.join(process.cwd(), 'backend', 'data'),
      path.resolve(__dirname, '..', '..', '..', 'data'),
      path.resolve(__dirname, '..', '..', 'data'),
    ];
    for (const dir of candidates) {
      if (fs.existsSync(path.join(dir, 'places_all.json'))) {
        return dir;
      }
    }
    return path.join(process.cwd(), 'data');
  }

  public placesAll: any[] = [];
  public placesByVertical: Record<string, any[]> = {};
  public collections: any[] = [];
  public museumArtifacts: any[] = [];
  public travelGuides: any = {};
  public essentials: any = {};
  public heritageSites: any[] = [];

  onModuleInit() {
    this.loadData();
  }

  private loadData() {
    try {
      const dataDir = this.getDataDir();
      const placesAllPath = path.join(dataDir, 'places_all.json');
      const placesByVerticalPath = path.join(dataDir, 'places_by_vertical.json');
      const collectionsPath = path.join(dataDir, 'collections.json');
      const museumPath = path.join(dataDir, 'museum_artifacts.json');
      const guidesPath = path.join(dataDir, 'travel_guides.json');
      const essentialsPath = path.join(dataDir, 'essentials.json');
      const heritagePath = path.join(dataDir, 'heritage_30_sites.json');

      if (fs.existsSync(placesAllPath)) {
        this.placesAll = JSON.parse(fs.readFileSync(placesAllPath, 'utf8'));
      }
      if (fs.existsSync(placesByVerticalPath)) {
        this.placesByVertical = JSON.parse(fs.readFileSync(placesByVerticalPath, 'utf8'));
      }
      if (fs.existsSync(collectionsPath)) {
        this.collections = JSON.parse(fs.readFileSync(collectionsPath, 'utf8'));
      }
      if (fs.existsSync(museumPath)) {
        this.museumArtifacts = JSON.parse(fs.readFileSync(museumPath, 'utf8'));
      }
      if (fs.existsSync(guidesPath)) {
        this.travelGuides = JSON.parse(fs.readFileSync(guidesPath, 'utf8'));
      }
      if (fs.existsSync(essentialsPath)) {
        this.essentials = JSON.parse(fs.readFileSync(essentialsPath, 'utf8'));
      }
      if (fs.existsSync(heritagePath)) {
        this.heritageSites = JSON.parse(fs.readFileSync(heritagePath, 'utf8'));
      }

      this.logger.log(
        `Đã tải thành công kho dữ liệu Cố Đô: ${this.placesAll.length} địa điểm, ${this.museumArtifacts.length} bảo vật 3D, ${this.collections.length} bộ sưu tập.`,
      );
    } catch (err) {
      this.logger.error(`Lỗi tải dữ liệu Portal: ${err.message}`);
    }
  }

  getStats() {
    return {
      totalPlaces: this.placesAll.length,
      categories: {
        tour: this.placesByVertical.tour ? this.placesByVertical.tour.length : 0,
        fnb: this.placesByVertical.fnb ? this.placesByVertical.fnb.length : 0,
        cafe: this.placesByVertical.cafe ? this.placesByVertical.cafe.length : 0,
        stay: this.placesByVertical.stay ? this.placesByVertical.stay.length : 0,
        specialty: this.placesByVertical.specialty ? this.placesByVertical.specialty.length : 0,
        service: this.placesByVertical.service ? this.placesByVertical.service.length : 0,
      },
      museumArtifacts: this.museumArtifacts.length,
      collections: this.collections.length,
    };
  }

  getHeritageSites() {
    return this.heritageSites;
  }

  getMapPoints(vertical?: string) {
    const v = vertical || 'all';
    let pts = this.placesAll.filter((p) => p.lat && p.lng);
    if (v !== 'all' && v !== 'heritage') {
      pts = pts.filter((p) => p.vertical === v);
    }
    return pts.map((p) => ({
      id: p.id,
      name: p.name_vi || p.name,
      lat: p.lat,
      lng: p.lng,
      v: p.vertical,
      cat: Array.isArray(p.subcategory) ? p.subcategory[0] : p.category || p.vertical,
      r: p.googleRating,
      img: p.coverPhotoUrl,
    }));
  }

  getPlaces(query: { vertical?: string; q?: string; page?: string; limit?: string; sortBy?: string }) {
    const vertical = query.vertical || 'all';
    const q = (query.q || '').trim();
    const page = parseInt(query.page || '1', 10) || 1;
    const limit = Math.min(parseInt(query.limit || '20', 10) || 20, 100);
    const sortBy = query.sortBy || 'rating';

    let items = vertical !== 'all' && this.placesByVertical[vertical] ? this.placesByVertical[vertical] : this.placesAll;

    if (q) {
      const cleanQ = this.removeVietnameseTones(q);
      items = items.filter((p) => {
        const nameNorm = this.removeVietnameseTones(p.name || p.name_vi || '');
        const addrNorm = this.removeVietnameseTones(p.address || p.address_vi || '');
        const subNorm = Array.isArray(p.subcategory) ? this.removeVietnameseTones(p.subcategory.join(' ')) : '';
        return nameNorm.includes(cleanQ) || addrNorm.includes(cleanQ) || subNorm.includes(cleanQ);
      });
    }

    if (sortBy === 'rating') {
      items = [...items].sort((a, b) => (b.googleRating || 0) - (a.googleRating || 0));
    } else if (sortBy === 'reviews') {
      items = [...items].sort((a, b) => (b.googleReviewCount || 0) - (a.googleReviewCount || 0));
    } else if (sortBy === 'name') {
      items = [...items].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }

    const total = items.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const pagedItems = items.slice(startIndex, startIndex + limit);

    return {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      items: pagedItems,
    };
  }

  getPlaceById(id: string) {
    return this.placesAll.find((p) => p.id === id);
  }

  getCollections() {
    return this.collections;
  }

  getMuseumArtifacts() {
    return this.museumArtifacts;
  }

  getTravelGuides() {
    return this.travelGuides;
  }

  getEssentials() {
    return this.essentials;
  }

  getNearby(userLat: number, userLng: number, radiusKm: number = 5, limit: number = 30) {
    const nearbyPlaces = this.placesAll
      .filter((p) => p.lat && p.lng)
      .map((p) => ({
        ...p,
        distanceKm: parseFloat(this.getDistanceKm(userLat, userLng, p.lat, p.lng).toFixed(2)),
      }))
      .filter((p) => p.distanceKm <= radiusKm)
      .sort((a, b) => a.distanceKm - b.distanceKm)
      .slice(0, limit);

    return {
      center: { lat: userLat, lng: userLng },
      radiusKm,
      totalFound: nearbyPlaces.length,
      items: nearbyPlaces,
    };
  }

  private getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private removeVietnameseTones(str: string): string {
    if (!str) return '';
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase();
  }
}
