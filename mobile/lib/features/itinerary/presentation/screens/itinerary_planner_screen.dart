import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import '../../../../core/theme/app_theme.dart';
import '../../../../core/constants/api_endpoints.dart';
import '../../../../core/network/api_client.dart';
import 'package:geolocator/geolocator.dart';

class ItineraryPlannerScreen extends StatefulWidget {
  const ItineraryPlannerScreen({Key? key}) : super(key: key);

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
      _showError('Không thể tải lộ trình. Vui lòng kiểm tra kết nối mạng.');
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
    final item = _itineraryStops.removeAt(oldIndex);
    _itineraryStops.insert(newIndex, item);

    final newPlaceIds = _itineraryStops.map((s) => s['placeId']).toList();
    try {
      await _dio.put('${ApiEndpoints.itinerary}/$_itineraryId/stops', data: {
        'placeIds': newPlaceIds
      });
    } catch (e) {
      _showError('Lỗi cập nhật thứ tự. Vui lòng tải lại.');
      await _loadData();
    }
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
                if (_routeDetails != null) _buildRouteStats(),
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
                            final isVisited = false; 
                            
                            return Card(
                              key: ValueKey(stop['id']),
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
            }).toList()
        ],
      ),
    );
  }

  Widget _buildRouteStats() {
    return Container(
      color: HuegoTheme.imperialGold.withOpacity(0.2),
      padding: const EdgeInsets.all(12),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _statCol(Icons.route, '${_routeDetails?['totalDistanceKm']} km', 'Quãng đường'),
          _statCol(Icons.timer, '${_routeDetails?['estimatedTimeWalkMinutes']} ph', 'Đi bộ'),
          _statCol(Icons.eco, '${_routeDetails?['co2SavedKg']} kg', 'CO₂ tiết kiệm', color: Colors.green),
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
