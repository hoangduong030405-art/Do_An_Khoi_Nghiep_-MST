import 'package:flutter/foundation.dart';

/// Cấu hình môi trường chạy ứng dụng.
class AppConfig {
  /// Truyền override khi build: --dart-define=API_BASE_URL=http://192.168.x.x:3000/api/v1
  /// Bắt buộc khi chạy trên thiết bị thật (Android/iOS) vì 10.0.2.2 chỉ dành cho Emulator.
  static const String _fromDefine = String.fromEnvironment('API_BASE_URL');

  static String get apiBaseUrl {
    if (_fromDefine.isNotEmpty) return _fromDefine;
    // Flutter Web: cùng origin với trang backend đang phục vụ (dùng đường dẫn tương đối)
    if (kIsWeb) return '/api/v1';
    if (defaultTargetPlatform == TargetPlatform.android) {
      return 'http://10.0.2.2:3000/api/v1';
    }
    return '/api/v1';
  }
}
