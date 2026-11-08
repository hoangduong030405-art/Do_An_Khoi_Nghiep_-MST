import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:dio/dio.dart';
import '../../../../core/theme/app_theme.dart';
import '../../../../core/constants/api_endpoints.dart';
import '../../../../core/network/api_client.dart';
import 'package:geolocator/geolocator.dart';

class ItineraryPlannerScreen extends StatefulWidget {
  const ItineraryPlannerScreen({super.key});

  @override
  State<ItineraryPlannerScreen> createState() => _ItineraryPlannerScreenState();
}

class _ItineraryPlannerScreenState extends State<ItineraryPlannerScreen> {
  final Dio _dio = ApiClient.instance.dio;
  bool _isLoading = true;

  String? _itineraryId;
  List<dynamic> _itineraryStops = [];
  Map<String, dynamic>? _routeDetails;
  
  // Weather
  Map<String, dynamic>? _weatherData;
  List<dynamic> _weatherSuggestions = [];
  bool _isWeatherStale = false;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    setState(() => _isLoading = true);
    try {
      final res = await _dio.get(ApiEndpoints.itinerary);
      final list = res.data as List;
      if (list.isEmpty) {
        // Auto create one
        final createRes = await _dio.post(ApiEndpoints.itinerary, data: {
          'title': 'Lộ trình khám phá Huế',
          'date': DateTime.now().toIso8601String(),
          'placeIds': []
        });
        _itineraryId = createRes.data['id'];
        _itineraryStops = createRes.data['stops'] ?? [];
      } else {
        _itineraryId = list[0]['id'];
        _itineraryStops = list[0]['stops'] ?? [];
      }

      await _fetchWeatherSuggestions();
    } catch (e) {
      // Dữ liệu lộ trình mẫu chuẩn phong cách Huế khi offline/demo
      _itineraryId = 'demo-itinerary-01';
      _itineraryStops = [
        {
          'stopOrder': 1,
          'place': {
            'name': 'Đại Nội Huế (Ngọ Môn - Điện Thái Hòa)',
            'address': 'Đường 23 Tháng 8, Thuận Hòa, TP Huế',
            'thumbnailUrl': 'https://images.unsplash.com/photo-1599827552599-eadf5e0fd712',
          },
          'notes': 'Tham quan vào sáng sớm nắng dịu, check-in Kỳ Đài & Cung Diên Thọ.',
        },
        {
          'stopOrder': 2,
          'place': {
            'name': 'Bún Bò Huế Mụ Rơi (Chuẩn Vị Cố Đô)',
            'address': '40 Nguyễn Chí Diểu, Thuận Thành, TP Huế',
            'thumbnailUrl': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
          },
          'notes': 'Thưởng thức tô bún bò tái nạm gân bốc khói ngào ngạt sả ớt.',
        },
        {
          'stopOrder': 3,
          'place': {
            'name': 'Chùa Thiên Mụ & Ngắm Cảnh Sông Hương',
            'address': 'Đồi Hà Khê, Kim Long, TP Huế',
            'thumbnailUrl': 'https://images.unsplash.com/photo-1583417319070-4a69db38a482',
          },
          'notes': 'Ngắm tháp Phước Duyên soi bóng chiều tà bên dòng Hương Giang.',
        },
        {
          'stopOrder': 4,
          'place': {
            'name': 'Đồi Vọng Cảnh — Hoàng Hôn Xứ Huế',
            'address': 'Huyền Trân Công Chúa, Thủy Biều, TP Huế',
            'thumbnailUrl': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
          },
          'notes': 'Điểm ngắm hoàng hôn đẹp nhất Cố Đô giữa rừng thông lộng gió.',
        },
      ];
    } finally {
      setState(() => _isLoading = false);
    }
  }

  Future<void> _fetchWeatherSuggestions() async {
    if (_itineraryId == null) return;
    try {
      final res = await _dio.get('${ApiEndpoints.itinerary}/$_itineraryId/weather-suggestions');
      _weatherData = res.data['weather'];
      _weatherSuggestions = res.data['suggestions'] ?? [];
      _isWeatherStale = _weatherData?['stale'] == true;
    } catch (e) {
      // Silently ignore weather error
    }
  }

  void _showError(String msg) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg), backgroundColor: Colors.red));
  }
  
  void _showSuccess(String msg) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(msg), backgroundColor: HuegoTheme.emeraldGreen));
  }

  Future<void> _optimizeRoute() async {
    if (_itineraryStops.isEmpty) return;
    setState(() => _isLoading = true);
    try {
      double? lat, lng;
      try {
        final pos = await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.low, timeLimit: const Duration(seconds: 3));
        lat = pos.latitude;
        lng = pos.longitude;
      } catch (_) {}

      final placeIds = _itineraryStops.map((s) => s['placeId']).toList();
      final res = await _dio.post(ApiEndpoints.itineraryOptimize, data: {
        'placeIds': placeIds,
        'startLat': lat,
        'startLng': lng
      });

      _routeDetails = res.data;
      
      // Update stops order based on optimizedRoute (list of placeIds)
      final optimizedIds = res.data['optimizedRoute'] as List;
      await _dio.put('${ApiEndpoints.itinerary}/$_itineraryId/stops', data: {
        'placeIds': optimizedIds
      });
      
      // Reload
      await _loadData();
      _showSuccess('Tối ưu hóa lộ trình thành công!');
    } catch (e) {
      _showError('Lỗi tối ưu hóa lộ trình.');
      setState(() => _isLoading = false);
    }
  }

  Future<void> _addPlace() async {
    // Fetch places to select
    setState(() => _isLoading = true);
    try {
      final res = await _dio.get(ApiEndpoints.places);
      final places = res.data as List;
      if (!mounted) return;
      setState(() => _isLoading = false);

      final selectedPlaceId = await showDialog<String>(
        context: context,
        builder: (ctx) => AlertDialog(
          title: const Text('Chọn địa điểm'),
          content: SizedBox(
            width: double.maxFinite,
            child: ListView.builder(
              shrinkWrap: true,
              itemCount: places.length,
              itemBuilder: (context, index) {
                final p = places[index];
                return ListTile(
                  title: Text(p['name']),
                  subtitle: Text('${p['greenRewardPoints']} GP'),
                  onTap: () => Navigator.of(ctx).pop(p['id']),
                );
              },
            ),
          ),
        )
      );

      if (selectedPlaceId != null) {
        if (_itineraryStops.length >= 12) {
          _showError('Một lộ trình chỉ được phép tối đa 12 địa điểm.');
          return;
        }
        final newPlaceIds = _itineraryStops.map((s) => s['placeId']).toList();
        if (newPlaceIds.contains(selectedPlaceId)) {
          _showError('Địa điểm đã có trong lộ trình.');
          return;
        }
        newPlaceIds.add(selectedPlaceId);
        
        setState(() => _isLoading = true);
        await _dio.put('${ApiEndpoints.itinerary}/$_itineraryId/stops', data: {
          'placeIds': newPlaceIds
        });
        await _loadData();
      }
    } catch (e) {
      _showError('Không thể tải danh sách địa điểm.');
      setState(() => _isLoading = false);
    }
  }

  Future<void> _reorderStops(int oldIndex, int newIndex) async {
    if (newIndex > oldIndex) newIndex--;
    setState(() {
      final item = _itineraryStops.removeAt(oldIndex);
      _itineraryStops.insert(newIndex, item);
      for (int i = 0; i < _itineraryStops.length; i++) {
        _itineraryStops[i]['stopOrder'] = i + 1;
      }
    });

    final newPlaceIds = _itineraryStops
        .map((s) => s['placeId'] ?? s['place']?['id'] ?? s['id'])
        .where((id) => id != null)
        .toList();

    try {
      if (_itineraryId != null && !_itineraryId!.startsWith('demo-')) {
        await _dio.put('${ApiEndpoints.itinerary}/$_itineraryId/stops', data: {
          'placeIds': newPlaceIds,
        });

        // Tự động tính toán lại lộ trình theo thứ tự kéo thả mới
        final optimizeRes = await _dio.post(ApiEndpoints.itineraryOptimize, data: {
          'placeIds': newPlaceIds,
        });
        if (mounted && optimizeRes.data != null) {
          setState(() {
            _routeDetails = optimizeRes.data;
          });
        }
      } else {
        // Cập nhật chỉ số ước lượng cục bộ cho chế độ demo
        setState(() {
          _routeDetails = {
            'totalDistanceKm': (_itineraryStops.length * 1.6).toStringAsFixed(1),
            'estimatedTimeWalkMinutes': (_itineraryStops.length * 20),
            'co2SavedKg': (_itineraryStops.length * 0.42).toStringAsFixed(1),
          };
        });
      }
    } catch (e) {
      debugPrint('Lỗi cập nhật lộ trình sau khi kéo thả: $e');
    }
  }

  Future<void> _shareItinerary() async {
    if (_itineraryStops.isEmpty) {
      _showError('Lộ trình chưa có địa điểm nào để chia sẻ.');
      return;
    }

    setState(() => _isLoading = true);
    String? shareUrl;
    String? expiresAt;

    try {
      if (_itineraryId != null && !_itineraryId!.startsWith('demo-')) {
        final res = await _dio.post('${ApiEndpoints.itinerary}/$_itineraryId/share', data: {
          'expiresInDays': 7,
          'includeNotes': true,
          'allowCopy': true,
        });
        shareUrl = res.data['shareUrl'];
        expiresAt = res.data['expiresAt'];
      }
    } catch (e) {
      debugPrint('Lỗi share online: $e');
    } finally {
      setState(() => _isLoading = false);
    }

    // Fallback URL chuẩn khi chạy demo / offline
    shareUrl ??= 'http://localhost:3000/s/demo-share-token';

    if (!mounted) return;

    final qrImageUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${Uri.encodeComponent(shareUrl)}';

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => Container(
        padding: const EdgeInsets.all(24),
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 44,
              height: 4,
              margin: const EdgeInsets.only(bottom: 18),
              decoration: BoxDecoration(
                color: Colors.grey.shade300,
                borderRadius: BorderRadius.circular(10),
              ),
            ),
            const Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.share_location, color: HuegoTheme.royalViolet, size: 24),
                SizedBox(width: 8),
                Text(
                  'Chia Sẻ Lộ Trình Cố Đô',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: HuegoTheme.royalViolet),
                ),
              ],
            ),
            const SizedBox(height: 8),
            const Text(
              'Quét mã QR hoặc gửi link an toàn cho bạn đồng hành',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 12, color: HuegoTheme.textMuted),
            ),
            const SizedBox(height: 18),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(18),
                border: Border.all(color: HuegoTheme.imperialGold, width: 2),
                boxShadow: const [
                  BoxShadow(color: Colors.black12, blurRadius: 10, offset: Offset(0, 4)),
                ],
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: CachedNetworkImage(
                  imageUrl: qrImageUrl,
                  width: 180,
                  height: 180,
                  fit: BoxFit.contain,
                  placeholder: (_, __) => const SizedBox(
                    width: 180,
                    height: 180,
                    child: Center(child: CircularProgressIndicator()),
                  ),
                  errorWidget: (_, __, ___) => const SizedBox(
                    width: 180,
                    height: 180,
                    child: Icon(Icons.qr_code_2, size: 80, color: HuegoTheme.royalViolet),
                  ),
                ),
              ),
            ),
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              decoration: BoxDecoration(
                color: Colors.grey.shade100,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.grey.shade300),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: Text(
                      shareUrl!,
                      style: const TextStyle(fontSize: 12, color: HuegoTheme.textDark),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  const SizedBox(width: 8),
                  ElevatedButton.icon(
                    onPressed: () {
                      Clipboard.setData(ClipboardData(text: shareUrl!));
                      Navigator.pop(ctx);
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('📋 Đã sao chép liên kết chia sẻ lộ trình!'),
                          backgroundColor: HuegoTheme.royalViolet,
                          duration: Duration(seconds: 2),
                        ),
                      );
                    },
                    icon: const Icon(Icons.copy, size: 16, color: Colors.white),
                    label: const Text('Sao chép', style: TextStyle(color: Colors.white, fontSize: 12)),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: HuegoTheme.royalViolet,
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 12),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.schedule, size: 14, color: HuegoTheme.textMuted),
                const SizedBox(width: 4),
                Text(
                  expiresAt != null
                      ? 'Có hiệu lực trong 7 ngày (hết hạn: ${expiresAt.substring(0, 10)})'
                      : 'Có hiệu lực trong 7 ngày',
                  style: const TextStyle(fontSize: 11, color: HuegoTheme.textMuted),
                ),
              ],
            ),
            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }

  Future<void> _swapStop(String oldPlaceId, String newPlaceId) async {
    setState(() => _isLoading = true);
    try {
      await _dio.put('${ApiEndpoints.itinerary}/$_itineraryId/swap-stop', data: {
        'oldPlaceId': oldPlaceId,
        'newPlaceId': newPlaceId
      });
      await _loadData();
      _showSuccess('Đã đổi địa điểm theo gợi ý!');
    } catch (e) {
      _showError('Lỗi đổi địa điểm.');
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Lộ Trình Của Tôi'),
        backgroundColor: HuegoTheme.royalViolet,
        actions: [
          IconButton(
            icon: const Icon(Icons.share),
            onPressed: _shareItinerary,
            tooltip: 'Chia sẻ lộ trình',
          ),
          IconButton(
            icon: const Icon(Icons.add_location_alt),
            onPressed: _addPlace,
            tooltip: 'Thêm địa điểm',
          )
        ],
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : Column(
              children: [
                if (_weatherData != null) _buildWeatherBanner(),
                if (_itineraryStops.isNotEmpty) _buildRouteStats(),
                Expanded(
                  child: _itineraryStops.isEmpty
                      ? const Center(child: Text('Lộ trình trống. Hãy thêm địa điểm!'))
                      : ReorderableListView.builder(
                          padding: const EdgeInsets.all(16),
                          itemCount: _itineraryStops.length,
                          onReorder: _reorderStops,
                          itemBuilder: (context, index) {
                            final stop = _itineraryStops[index];
                            final place = stop['place'] ?? {};
                            // Demo unlocked state
                            final bool isVisited = stop['isVisited'] == true;
                            
                            return Card(
                              key: ValueKey(stop['id'] ?? stop['placeId'] ?? 'stop-$index'),
                              margin: const EdgeInsets.only(bottom: 12),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(16),
                                side: BorderSide(
                                  color: isVisited ? HuegoTheme.emeraldGreen.withOpacity(0.5) : Colors.transparent,
                                  width: 1.5,
                                ),
                              ),
                              child: ListTile(
                                leading: CircleAvatar(
                                  backgroundColor: isVisited ? HuegoTheme.emeraldGreen : HuegoTheme.royalViolet.withOpacity(0.1),
                                  child: isVisited
                                      ? const Icon(Icons.check, color: Colors.white)
                                      : Text('${index + 1}', style: const TextStyle(fontWeight: FontWeight.bold, color: HuegoTheme.royalViolet)),
                                ),
                                title: Text(place['name'] ?? 'Không rõ'),
                                subtitle: Text(place['address'] ?? ''),
                                trailing: Row(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    if (isVisited) const Icon(Icons.check_circle, color: HuegoTheme.emeraldGreen),
                                    const Icon(Icons.drag_indicator, color: HuegoTheme.textMuted),
                                  ],
                                ),
                              ),
                            );
                          },
                        ),
                ),
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: const BoxDecoration(
                    color: Colors.white,
                    boxShadow: [BoxShadow(color: Colors.black12, blurRadius: 10, offset: Offset(0, -3))],
                  ),
                  child: Row(
                    children: [
                      Expanded(
                        child: ElevatedButton.icon(
                          onPressed: _itineraryStops.length > 1 ? _optimizeRoute : null,
                          icon: const Icon(Icons.auto_awesome, color: Colors.white),
                          label: const Text('TỐI ƯU THỨ TỰ', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: HuegoTheme.royalViolet,
                            padding: const EdgeInsets.symmetric(vertical: 14),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
    );
  }

  Widget _buildWeatherBanner() {
    return Container(
      width: double.infinity,
      color: Colors.blueGrey.shade50,
      padding: const EdgeInsets.all(12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                _weatherData?['isRaining'] == true ? Icons.water_drop : (_weatherData?['isExtremelyHot'] == true ? Icons.wb_sunny : Icons.cloud),
                color: _weatherData?['isRaining'] == true ? Colors.blue : Colors.orange,
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  'Thời tiết: ${_weatherData?['description']} (${_weatherData?['tempCelsius']}°C)',
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
              ),
              if (_isWeatherStale)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                  decoration: BoxDecoration(color: Colors.grey, borderRadius: BorderRadius.circular(4)),
                  child: const Text('Dữ liệu cũ', style: TextStyle(fontSize: 10, color: Colors.white)),
                )
            ],
          ),
          if (_weatherSuggestions.isNotEmpty)
            ..._weatherSuggestions.map((sug) {
              final alt = sug['alternatives'][0]; // Lấy gợi ý đầu tiên
              return Card(
                color: Colors.orange.shade50,
                margin: const EdgeInsets.only(top: 8),
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('⚠️ ${sug['reason']}', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.deepOrange)),
                      Text('Gợi ý đổi: ${sug['originalStop']['name']} -> ${alt['name']} (${alt['distanceKm']}km)', style: const TextStyle(fontSize: 13)),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          TextButton(
                            onPressed: () {
                              setState(() => _weatherSuggestions.remove(sug));
                            },
                            child: const Text('Bỏ qua'),
                          ),
                          ElevatedButton(
                            onPressed: () => _swapStop(sug['originalStop']['placeId'], alt['placeId']),
                            style: ElevatedButton.styleFrom(backgroundColor: HuegoTheme.royalViolet),
                            child: const Text('Đổi', style: TextStyle(color: Colors.white)),
                          )
                        ],
                      )
                    ],
                  ),
                ),
              );
            })
        ],
      ),
    );
  }

  Widget _buildRouteStats() {
    final stopCount = _itineraryStops.length;
    final dist = _routeDetails?['totalDistanceKm'] ?? (stopCount * 1.5).toStringAsFixed(1);
    final timeWalk = _routeDetails?['estimatedTimeWalkMinutes'] ?? (stopCount * 20);
    final co2 = _routeDetails?['co2SavedKg'] ?? (stopCount * 0.42).toStringAsFixed(1);

    return Container(
      color: HuegoTheme.imperialGold.withOpacity(0.18),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _statCol(Icons.place_rounded, '$stopCount điểm', 'Lộ trình'),
          _statCol(Icons.route, '$dist km', 'Quãng đường'),
          _statCol(Icons.timer, '$timeWalk ph', 'Đi bộ'),
          _statCol(Icons.eco, '$co2 kg', 'CO₂ tiết kiệm', color: Colors.green),
        ],
      ),
    );
  }

  Widget _statCol(IconData icon, String val, String label, {Color? color}) {
    return Column(
      children: [
        Icon(icon, color: color ?? HuegoTheme.royalViolet),
        Text(val, style: TextStyle(fontWeight: FontWeight.bold, color: color ?? Colors.black87)),
        Text(label, style: const TextStyle(fontSize: 10, color: Colors.black54)),
      ],
    );
  }
}
