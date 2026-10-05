/// Model ánh xạ JSON từ GET /api/v1/places của backend HUEGO.
class PlaceDto {
  final String id;
  final String name;
  final String categoryCode;
  final String categoryName;
  final String descriptionVi;
  final String descriptionEn;
  final String address;
  final double latitude;
  final double longitude;
  final int geofenceRadiusMeters;
  final String environmentType;
  final int ticketPriceVnd;
  final int greenRewardPoints;
  final String thumbnailUrl;

  const PlaceDto({
    required this.id,
    required this.name,
    required this.categoryCode,
    required this.categoryName,
    required this.descriptionVi,
    required this.descriptionEn,
    required this.address,
    required this.latitude,
    required this.longitude,
    required this.geofenceRadiusMeters,
    required this.environmentType,
    required this.ticketPriceVnd,
    required this.greenRewardPoints,
    required this.thumbnailUrl,
  });

  factory PlaceDto.fromJson(Map<String, dynamic> json) {
    return PlaceDto(
      id: json['id'] as String? ?? '',
      name: json['name'] as String? ?? '',
      categoryCode: json['categoryCode'] as String? ?? 'HISTORICAL',
      categoryName: json['categoryName'] as String? ?? '',
      descriptionVi: json['descriptionVi'] as String? ?? '',
      descriptionEn: json['descriptionEn'] as String? ?? '',
      address: json['address'] as String? ?? '',
      latitude: (json['latitude'] as num?)?.toDouble() ?? 0,
      longitude: (json['longitude'] as num?)?.toDouble() ?? 0,
      geofenceRadiusMeters: (json['geofenceRadiusMeters'] as num?)?.toInt() ?? 35,
      environmentType: json['environmentType'] as String? ?? 'OUTDOOR',
      ticketPriceVnd: (json['ticketPriceVnd'] as num?)?.toInt() ?? 0,
      greenRewardPoints: (json['greenRewardPoints'] as num?)?.toInt() ?? 0,
      thumbnailUrl: json['thumbnailUrl'] as String? ?? '',
    );
  }
}
