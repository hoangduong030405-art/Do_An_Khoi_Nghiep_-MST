import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import '../../../../core/constants/api_endpoints.dart';
import '../../../../core/network/api_client.dart';
import '../../../../core/services/geofence_location_service.dart';
import '../../../../core/theme/app_theme.dart';
import '../../data/place_dto.dart';

class HuegoMapScreen extends StatefulWidget {
  const HuegoMapScreen({Key? key}) : super(key: key);

  @override
  State<HuegoMapScreen> createState() => _HuegoMapScreenState();
}

class _HuegoMapScreenState extends State<HuegoMapScreen> {
  final GeofenceLocationService _locationService = GeofenceLocationService();
  final MapController _mapController = MapController();

  // Tọa độ trung tâm Huế: Kỳ Đài / Đại Nội
  final LatLng _hueCenter = const LatLng(16.4697, 107.5779);

  late Future<List<PlaceDto>> _placesFuture;
  Future<Map<String, dynamic>?>? _weatherFuture;

  @override
  void initState() {
    super.initState();
    _placesFuture = _fetchPlaces();
    _weatherFuture = _fetchWeather();
    _initTracking();
  }

  Future<List<PlaceDto>> _fetchPlaces() async {
    final response = await ApiClient.instance.dio.get(ApiEndpoints.places);
    final data = response.data as List<dynamic>;
    return data
        .map((e) => PlaceDto.fromJson(e as Map<String, dynamic>))
        .toList();
  }

  Future<Map<String, dynamic>?> _fetchWeather() async {
    try {
      final response = await ApiClient.instance.dio.get(ApiEndpoints.currentWeather);
      if (response.statusCode == 200 && response.data is Map<String, dynamic>) {
        return response.data as Map<String, dynamic>;
      }
    } catch (_) {
      // Giữ fallback text cũ nếu lỗi mạng
    }
    return null;
  }

  /// Chuẩn hóa categoryCode từ backend về mã ngắn mà switch bên dưới đang dùng.
  String _shortCategory(String? code) {
    switch (code) {
      case 'CAFE':
        return 'CAFE';
      case 'CUISINE':
        return 'CUISINE';
      case 'SCENIC_VIEW':
        return 'SCENIC';
      case 'OUTSKIRTS_ECO':
        return 'OUTSKIRTS';
      case 'VEHICLE_RENTAL':
        return 'RENTAL';
      case 'GAS_STATION':
        return 'GAS';
      case 'CULTURE_ART':
        return 'CULTURE';
      case 'CRAFT_VILLAGE':
        return 'CRAFT_VILLAGE';
      default:
        return 'HISTORICAL';
    }
  }

  Future<void> _initTracking() async {
    final granted = await _locationService.initializeLocationService();
    if (granted) {
      _locationService.onMilestoneUnlocked = (data) {
        _showUnlockedMilestoneDialog(data);
      };
      _locationService.startGeofenceTracking();
    }
  }

  void _showUnlockedMilestoneDialog(Map<String, dynamic> data) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        backgroundColor: Colors.white,
        title: Row(
          children: const [
            Icon(Icons.stars_rounded, color: HuegoTheme.imperialGold, size: 36),
            SizedBox(width: 8),
            Text('MỞ KHÓA THÀNH CÔNG!', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: HuegoTheme.royalViolet)),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              data['placeName'] ?? 'Địa danh di sản Huế',
              style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Text(
              data['message'] ?? 'Chúc mừng bạn đã đến cột mốc và nhận điểm du lịch xanh!',
              style: const TextStyle(fontSize: 14, color: HuegoTheme.textMuted),
            ),
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                color: HuegoTheme.imperialGold.withOpacity(0.15),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(Icons.eco, color: HuegoTheme.emeraldGreen),
                  const SizedBox(width: 8),
                  Text(
                    '+${data['rewardPoints'] ?? 25} Green Points',
                    style: const TextStyle(fontWeight: FontWeight.bold, color: HuegoTheme.emeraldGreen),
                  ),
                ],
              ),
            ),
          ],
        ),
        actions: [
          ElevatedButton(
            onPressed: () => Navigator.of(ctx).pop(),
            style: ElevatedButton.styleFrom(backgroundColor: HuegoTheme.royalViolet),
            child: const Text('Tuyệt vời'),
          ),
        ],
      ),
    );
  }

  void _showPlaceDetailsModal(PlaceDto place) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
      builder: (ctx) => Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    place.name,
                    style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: HuegoTheme.royalViolet),
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: HuegoTheme.imperialGold.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    '+${place.greenRewardPoints} GP',
                    style: const TextStyle(fontWeight: FontWeight.bold, color: HuegoTheme.emeraldGreen),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              place.environmentType == 'INDOOR' ? '🏛️ Không gian trong nhà (Tối ưu ngày mưa)' : '🌳 Không gian ngoài trời thoáng đãng',
              style: const TextStyle(fontSize: 13, color: HuegoTheme.textMuted),
            ),
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: HuegoTheme.royalViolet.withOpacity(0.06),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Row(
                children: const [
                  Icon(Icons.record_voice_over, color: HuegoTheme.royalViolet, size: 28),
                  SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      'Lắng nghe câu chuyện lịch sử 13 đời vua triều Nguyễn và phong thủy kinh thành từ Trợ lý Mệ Huế.',
                      style: TextStyle(fontSize: 13, height: 1.4),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            Row(
              children: [
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: () {
                      Navigator.of(ctx).pop();
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text('Mệ Huế: "Dạ thưa quý khách, chào mừng người đến với ${place.name}..."'),
                          backgroundColor: HuegoTheme.royalViolet,
                          duration: const Duration(seconds: 4),
                        ),
                      );
                    },
                    icon: const Icon(Icons.volume_up, color: Colors.white),
                    label: const Text('Nghe Thuyết Minh AI', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: HuegoTheme.royalViolet,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      padding: const EdgeInsets.symmetric(vertical: 14),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  @override
  void dispose() {
    _locationService.stopTracking();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('HUEGO – Bản Đồ Số Huế'),
        actions: [
          IconButton(
            icon: const Icon(Icons.my_location),
            onPressed: () => _mapController.move(_hueCenter, 15.0),
          ),
        ],
      ),
      body: Stack(
        children: [
          // 1. Bản đồ OpenStreetMap / Google Map Tiles qua FutureBuilder
          FutureBuilder<List<PlaceDto>>(
            future: _placesFuture,
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const Center(child: CircularProgressIndicator());
              }
              if (snapshot.hasError) {
                return Center(
                  child: Padding(
                    padding: const EdgeInsets.all(24.0),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Icon(Icons.wifi_off, size: 48, color: HuegoTheme.royalViolet),
                        const SizedBox(height: 12),
                        const Text(
                          'Không thể kết nối đến máy chủ HUEGO',
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          '${snapshot.error}',
                          textAlign: TextAlign.center,
                          style: const TextStyle(fontSize: 12, color: HuegoTheme.textMuted),
                        ),
                        const SizedBox(height: 16),
                        ElevatedButton(
                          onPressed: () {
                            setState(() {
                              _placesFuture = _fetchPlaces();
                            });
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: HuegoTheme.royalViolet,
                          ),
                          child: const Text('Thử lại', style: TextStyle(color: Colors.white)),
                        ),
                      ],
                    ),
                  ),
                );
              }

              final places = snapshot.data ?? [];
              if (places.isEmpty) {
                return const Center(
                  child: Text('Chưa có địa danh nào', style: TextStyle(fontSize: 16)),
                );
              }

              return FlutterMap(
                mapController: _mapController,
                options: MapOptions(
                  initialCenter: _hueCenter,
                  initialZoom: 14.2,
                ),
                children: [
                  TileLayer(
                    urlTemplate: 'https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
                    subdomains: const ['0', '1', '2', '3'],
                    userAgentPackageName: 'com.huego.mobile',
                  ),
                  // Vòng tròn Geofence bán kính lấy từ API từng nơi
                  CircleLayer(
                    circles: places.map((p) {
                      return CircleMarker(
                        point: LatLng(p.latitude, p.longitude),
                        radius: p.geofenceRadiusMeters.toDouble(),
                        useRadiusInMeter: true,
                        color: HuegoTheme.imperialGold.withOpacity(0.25),
                        borderColor: HuegoTheme.imperialGold,
                        borderStrokeWidth: 2,
                      );
                    }).toList(),
                  ),
                  // Markers biểu tượng địa danh Huế theo thể loại
                  MarkerLayer(
                    markers: places.map((place) {
                      final cat = _shortCategory(place.categoryCode);
                      Color pinColor;
                      IconData pinIcon;

                      switch (cat) {
                        case 'CAFE':
                          pinColor = const Color(0xFFD97706);
                          pinIcon = Icons.local_cafe;
                          break;
                        case 'CUISINE':
                          pinColor = const Color(0xFFDC2626);
                          pinIcon = Icons.restaurant;
                          break;
                        case 'SCENIC':
                          pinColor = HuegoTheme.perfumeRiverTeal;
                          pinIcon = Icons.photo_camera;
                          break;
                        case 'OUTSKIRTS':
                          pinColor = const Color(0xFF15803D);
                          pinIcon = Icons.forest;
                          break;
                        case 'RENTAL':
                          pinColor = const Color(0xFF2563EB);
                          pinIcon = Icons.pedal_bike;
                          break;
                        case 'GAS':
                          pinColor = const Color(0xFFEA580C);
                          pinIcon = Icons.local_gas_station;
                          break;
                        case 'CULTURE':
                          pinColor = HuegoTheme.imperialGold;
                          pinIcon = Icons.museum;
                          break;
                        case 'CRAFT_VILLAGE':
                          pinColor = const Color(0xFF795548);
                          pinIcon = Icons.handyman;
                          break;
                        default:
                          pinColor = HuegoTheme.royalViolet;
                          pinIcon = Icons.account_balance;
                      }

                      return Marker(
                        point: LatLng(place.latitude, place.longitude),
                        width: 46,
                        height: 46,
                        child: GestureDetector(
                          onTap: () => _showPlaceDetailsModal(place),
                          child: Container(
                            decoration: BoxDecoration(
                              color: pinColor,
                              shape: BoxShape.circle,
                              border: Border.all(color: Colors.white, width: 2.5),
                              boxShadow: const [
                                BoxShadow(color: Colors.black38, blurRadius: 6, offset: Offset(0, 3)),
                              ],
                            ),
                            child: Icon(
                              pinIcon,
                              color: Colors.white,
                              size: 22,
                            ),
                          ),
                        ),
                      );
                    }).toList(),
                  ),
                ],
              );
            },
          ),

          // 2. Banner Thông Minh: Thời tiết & Tự Động Thích Ứng Lịch Trình
          Positioned(
            top: 16,
            left: 16,
            right: 16,
            child: FutureBuilder<Map<String, dynamic>?>(
              future: _weatherFuture,
              builder: (context, snap) {
                final weather = snap.data;
                final title = weather != null
                    ? '${weather['description'] ?? 'Thời tiết Huế'} • ${weather['tempCelsius'] ?? 25}°C'
                    : 'Mưa nhẹ Cố Đô • 24.5°C';
                final subtitle = weather != null && weather['recommendation'] != null
                    ? weather['recommendation'] as String
                    : 'Mệ Huế khuyên ưu tiên điểm trong nhà & thưởng trà';

                return Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.95),
                    borderRadius: BorderRadius.circular(16),
                    boxShadow: const [
                      BoxShadow(color: Colors.black12, blurRadius: 10, offset: Offset(0, 4)),
                    ],
                  ),
                  child: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: HuegoTheme.perfumeRiverTeal.withOpacity(0.12),
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(Icons.grain, color: HuegoTheme.perfumeRiverTeal),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              title,
                              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                            ),
                            Text(
                              subtitle,
                              style: const TextStyle(fontSize: 12, color: HuegoTheme.textMuted),
                            ),
                          ],
                        ),
                      ),
                      TextButton(
                        onPressed: () {
                          // TODO Phase 4: nối thật sau khi sửa validation currentItinerary
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text('Tính năng tự động thích ứng lịch trình theo thời tiết sẽ có ở bản cập nhật tới!'),
                            ),
                          );
                        },
                        child: const Text('Đổi hướng', style: TextStyle(color: HuegoTheme.royalViolet, fontWeight: FontWeight.bold)),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
