import 'dart:async';
import 'package:dio/dio.dart';
import 'package:geolocator/geolocator.dart';
import '../constants/api_endpoints.dart';

class GeofenceLocationService {
  final Dio _dio = Dio();
  StreamSubscription<Position>? _positionStreamSubscription;

  // Callback thông báo cho UI khi mở khóa thành công một địa danh
  Function(Map<String, dynamic>)? onMilestoneUnlocked;

  // ID người dùng demo
  final String currentUserId = 'e7b0e774-7243-41bb-9be4-8a4b868e82ef';

  /// Khởi tạo và yêu cầu cấp quyền GPS chính xác (bọc try-catch chống crash)
  Future<bool> initializeLocationService() async {
    try {
      bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
      if (!serviceEnabled) {
        return false;
      }

      LocationPermission permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
        if (permission == LocationPermission.denied) {
          return false;
        }
      }

      if (permission == LocationPermission.deniedForever) {
        return false;
      }

      return true;
    } catch (e) {
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
          _verifyWithBackendGeofence(position.latitude, position.longitude);
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
  Future<void> _verifyWithBackendGeofence(double lat, double lng) async {
    try {
      final response = await _dio.post(
        ApiEndpoints.unlockGeofence,
        data: {
          'userId': currentUserId,
          'latitude': lat,
          'longitude': lng,
        },
      );

      if (response.statusCode == 200 && response.data['unlocked'] == true) {
        if (onMilestoneUnlocked != null) {
          onMilestoneUnlocked!(response.data);
        }
      }
    } catch (e) {
      // Ghi log hoặc xử lý offline sync
    }
  }

  void stopTracking() {
    _positionStreamSubscription?.cancel();
  }
}
