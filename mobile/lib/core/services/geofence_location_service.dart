import 'dart:async';
import 'package:dio/dio.dart';
import 'package:geolocator/geolocator.dart';
import '../constants/api_endpoints.dart';
import '../network/api_client.dart';
import 'package:flutter/foundation.dart';
class GeofenceLocationService {
  final Dio _dio = ApiClient.instance.dio;
  StreamSubscription<Position>? _positionStreamSubscription;

  // Callback thông báo cho UI khi mở khóa thành công một địa danh
  Function(Map<String, dynamic>)? onMilestoneUnlocked;
  Function(String)? onErrorCallback;
  Function(Position)? onPositionUpdated;

  // ID người dùng được lấy từ backend qua token, không cần truyền trong body nữa.

  /// Khởi tạo và yêu cầu cấp quyền GPS chính xác (bọc try-catch chống crash)
  Future<bool> initializeLocationService() async {
    try {
      bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
      if (!serviceEnabled) {
        throw Exception("Dịch vụ định vị bị tắt. Vui lòng bật vị trí để tiếp tục.");
      }

      LocationPermission permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
        if (permission == LocationPermission.denied) {
          throw Exception("Bạn đã từ chối cấp quyền vị trí. HUEGO cần GPS để hoạt động.");
        }
      }

      if (permission == LocationPermission.deniedForever) {
        throw Exception("Quyền vị trí bị từ chối vĩnh viễn. Hãy vào cài đặt trình duyệt để cấp quyền.");
      }

      return true;
    } catch (e) {
      if (e is Exception && e.toString().contains("Dịch vụ định vị") || e.toString().contains("từ chối")) {
        rethrow;
      }
      // Trên môi trường Web hoặc Windows Desktop không hỗ trợ Location Service, bỏ qua an toàn
      return false;
    }
  }

  /// Lắng nghe luồng tọa độ GPS với bộ lọc tiết kiệm pin (chỉ gọi khi di chuyển > 15m)
  void startGeofenceTracking() {
    try {
      const LocationSettings locationSettings = LocationSettings(
        accuracy: LocationAccuracy.high,
        distanceFilter: 15, // Chỉ cập nhật khi người dùng di chuyển từ 15 mét trở lên
      );

      _positionStreamSubscription = Geolocator.getPositionStream(
        locationSettings: locationSettings,
      ).listen(
        (Position position) {
          _verifyWithBackendGeofence(position);
        },
        onError: (err) {
          // Xử lý an toàn khi mất sóng GPS
        },
      );
    } catch (e) {
      // Bỏ qua an toàn nếu platform không hỗ trợ background stream
    }
  }

  /// Gửi tọa độ lên PostGIS Backend để kiểm tra mở khóa
  Future<void> _verifyWithBackendGeofence(Position position) async {
    if (onPositionUpdated != null) {
      onPositionUpdated!(position);
    }
    try {
      final response = await _dio.post(
        ApiEndpoints.unlockGeofence,
        data: {
          'latitude': position.latitude,
          'longitude': position.longitude,
          'accuracy': position.accuracy,
          'timestamp': position.timestamp.toIso8601String(),
          'isMockLocation': kIsWeb ? false : position.isMocked,
        },
      );

      if (response.statusCode == 200 && response.data['unlocked'] == true) {
        if (onMilestoneUnlocked != null) {
          onMilestoneUnlocked!(response.data);
        }
      }
    } catch (e) {
      if (e is DioException && e.response != null) {
        final data = e.response!.data;
        if (data is Map && data['message'] != null && onErrorCallback != null) {
           onErrorCallback!(data['message'].toString());
        }
      }
      // Ghi log hoặc xử lý offline sync
    }
  }

  void stopTracking() {
    _positionStreamSubscription?.cancel();
  }
}
