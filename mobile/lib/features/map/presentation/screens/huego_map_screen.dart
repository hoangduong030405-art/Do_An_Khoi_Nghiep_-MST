import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import '../../../../core/theme/app_theme.dart';
import '../../../../core/services/geofence_location_service.dart';

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

  // Danh sách địa danh di sản, cà phê, đặc sản & tiện ích phong phú xứ Huế
  final List<Map<String, dynamic>> _places = [
    {
      'name': 'Đại Nội Huế (Hoàng Thành)',
      'latLng': const LatLng(16.4697, 107.5779),
      'points': 30,
      'env': 'OUTDOOR',
      'category': 'HISTORICAL',
    },
    {
      'name': 'Chùa Thiên Mụ (Linh Mụ Tự)',
      'latLng': const LatLng(16.4529, 107.5451),
      'points': 25,
      'env': 'OUTDOOR',
      'category': 'HISTORICAL',
    },
    {
      'name': 'Bảo tàng Cổ vật Cung đình',
      'latLng': const LatLng(16.4715, 107.5812),
      'points': 25,
      'env': 'INDOOR',
      'category': 'HISTORICAL',
    },
    {
      'name': 'Lăng Khải Định (Ứng Lăng)',
      'latLng': const LatLng(16.3991, 107.5905),
      'points': 25,
      'env': 'SEMI_OUTDOOR',
      'category': 'HISTORICAL',
    },
    {
      'name': 'Lăng Tự Đức (Khiêm Lăng)',
      'latLng': const LatLng(16.4328, 107.5658),
      'points': 25,
      'env': 'SEMI_OUTDOOR',
      'category': 'HISTORICAL',
    },
    {
      'name': 'Làng Hương Thủy Xuân',
      'latLng': const LatLng(16.4358, 107.5647),
      'points': 25,
      'env': 'SEMI_OUTDOOR',
      'category': 'SCENIC',
    },
    {
      'name': 'Đồi Vọng Cảnh (Ngắm Sông Hương)',
      'latLng': const LatLng(16.4258, 107.5512),
      'points': 30,
      'env': 'OUTDOOR',
      'category': 'OUTSKIRTS',
    },
    {
      'name': 'Cầu Tràng Tiền (Đổi màu về đêm)',
      'latLng': const LatLng(16.4683, 107.5947),
      'points': 20,
      'env': 'OUTDOOR',
      'category': 'SCENIC',
    },
    {
      'name': 'Cầu Dã Viên (Hoàng Hôn)',
      'latLng': const LatLng(16.4592, 107.5721),
      'points': 20,
      'env': 'OUTDOOR',
      'category': 'SCENIC',
    },
    {
      'name': 'Cà Phê Muối Gốc Nguyễn Huệ',
      'latLng': const LatLng(16.4589, 107.5898),
      'points': 20,
      'env': 'INDOOR',
      'category': 'CAFE',
    },
    {
      'name': 'Tân Cafe Vintage Cố Đô',
      'latLng': const LatLng(16.4635, 107.5882),
      'points': 20,
      'env': 'INDOOR',
      'category': 'CAFE',
    },
    {
      'name': 'Không gian Trà Kim Long',
      'latLng': const LatLng(16.4608, 107.5601),
      'points': 20,
      'env': 'INDOOR',
      'category': 'CUISINE',
    },
    {
      'name': 'Bún Bò Huế Mụ Rơi',
      'latLng': const LatLng(16.4745, 107.5862),
      'points': 20,
      'env': 'INDOOR',
      'category': 'CUISINE',
    },
    {
      'name': 'Cơm Hến Hoa Đông Cồn Hến',
      'latLng': const LatLng(16.4789, 107.6012),
      'points': 20,
      'env': 'SEMI_OUTDOOR',
      'category': 'CUISINE',
    },
    {
      'name': 'Trạm Xe Đạp Xanh Cửa Hiển Nhơn',
      'latLng': const LatLng(16.4705, 107.5815),
      'points': 15,
      'env': 'OUTDOOR',
      'category': 'RENTAL',
    },
    {
      'name': 'Cây Xăng Petrolimex Lê Lợi',
      'latLng': const LatLng(16.4632, 107.5862),
      'points': 5,
      'env': 'OUTDOOR',
      'category': 'GAS',
    },
  ];

  @override
  void initState() {
    super.initState();
    _initTracking();
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

  void _showPlaceDetailsModal(Map<String, dynamic> place) {
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
                    place['name'],
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
                    '+${place['points']} GP',
                    style: const TextStyle(fontWeight: FontWeight.bold, color: HuegoTheme.emeraldGreen),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              place['env'] == 'INDOOR' ? '🏛️ Không gian trong nhà (Tối ưu ngày mưa)' : '🌳 Không gian ngoài trời thoáng đãng',
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
                          content: Text('Mệ Huế: "Dạ thưa quý khách, chào mừng người đến với ${place['name']}..."'),
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
          // 1. Bản đồ OpenStreetMap / Mapbox Tiles
          FlutterMap(
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
              // Vòng tròn Geofence bán kính mô phỏng quanh các địa danh
              CircleLayer(
                circles: _places.map((p) {
                  return CircleMarker(
                    point: p['latLng'],
                    radius: 35, // 35 mét
                    useRadiusInMeter: true,
                    color: HuegoTheme.imperialGold.withOpacity(0.25),
                    borderColor: HuegoTheme.imperialGold,
                    borderStrokeWidth: 2,
                  );
                }).toList(),
              ),
              // Markers biểu tượng địa danh Huế theo thể loại
              MarkerLayer(
                markers: _places.map((place) {
                  final cat = place['category'] ?? 'HISTORICAL';
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
                    default:
                      pinColor = HuegoTheme.royalViolet;
                      pinIcon = Icons.account_balance;
                  }

                  return Marker(
                    point: place['latLng'],
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
          ),

          // 2. Banner Thông Minh: Thời tiết & Tự Động Thích Ứng Lịch Trình
          Positioned(
            top: 16,
            left: 16,
            right: 16,
            child: Container(
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
                      children: const [
                        Text('Mưa nhẹ Cố Đô • 24.5°C', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                        Text('Mệ Huế khuyên ưu tiên điểm trong nhà & thưởng trà', style: TextStyle(fontSize: 12, color: HuegoTheme.textMuted)),
                      ],
                    ),
                  ),
                  TextButton(
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('AI đã tối ưu: Chuyển sang Bảo tàng Cổ vật & Trà Kim Long!')),
                      );
                    },
                    child: const Text('Đổi hướng', style: TextStyle(color: HuegoTheme.royalViolet, fontWeight: FontWeight.bold)),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
