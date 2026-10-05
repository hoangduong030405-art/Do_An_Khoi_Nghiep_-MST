import 'package:dio/dio.dart';
import '../../../../core/constants/api_endpoints.dart';
import '../../../../core/network/api_client.dart';

class RandomWheelService {
  final Dio _dio = ApiClient.instance.dio;

  Future<Map<String, dynamic>> fetchWheelFilters() async {
    try {
      final response = await _dio.get(ApiEndpoints.randomWheelFilters);
      if (response.statusCode == 200) {
        return response.data;
      }
    } catch (e) {
      // Fallback
    }
    return {
      'categories': [
        {'code': 'ALL', 'name': 'Tất Cả', 'icon': '🎲'},
        {'code': 'CAFE', 'name': 'Quán Cà Phê', 'icon': '☕'},
        {'code': 'CUISINE', 'name': 'Món Đặc Sản', 'icon': '🍜'},
        {'code': 'HISTORICAL', 'name': 'Di Tích Cố Đô', 'icon': '🏛️'},
        {'code': 'SCENIC_VIEW', 'name': 'View Đẹp', 'icon': '📸'},
      ],
      'quickCriteria': [
        {'tag': 'CAFE_SONG_AO', 'label': 'Cà phê sống ảo', 'icon': '✨'},
        {'tag': 'CAFE_MUOI', 'label': 'Cà phê muối gốc', 'icon': '☕'},
        {'tag': 'VIEW_DEM_SONG_HUONG', 'label': 'View đêm lung linh', 'icon': '🌙'},
      ],
    };
  }

  Future<Map<String, dynamic>> spinWheel({
    String? categoryCode,
    String? filterTag,
    double? lat,
    double? lng,
  }) async {
    try {
      final response = await _dio.get(
        ApiEndpoints.randomWheelSpin,
        queryParameters: {
          if (categoryCode != null && categoryCode != 'ALL') 'categoryCode': categoryCode,
          if (filterTag != null) 'filterTag': filterTag,
          if (lat != null) 'userLat': lat,
          if (lng != null) 'userLng': lng,
        },
      );
      if (response.statusCode == 200) {
        return response.data;
      }
    } catch (e) {
      // Fallback mock nếu server chưa chạy
    }

    return {
      'winningIndex': 0,
      'targetRotationDegrees': 1800.0 + 45.0,
      'winningPlace': {
        'id': 'ca-phe-muoi-nguyen-hue',
        'name': 'Cà Phê Muối Xứ Huế (Gốc Nguyễn Huệ)',
        'address': 'Số 10 Nguyễn Huệ, Phường Vĩnh Ninh, TP Huế',
        'greenRewardPoints': 20,
        'thumbnailUrl': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd',
      },
      'aiRecommendationReason': 'Quán cà phê trứ danh khởi nguồn của món cà phê muối nức tiếng Cố Đô. Hương vị mặn ngọt hòa quyện tuyệt vời!',
      'message': 'Vòng quay HUEGO đã quyết định thay bạn!',
    };
  }
}
