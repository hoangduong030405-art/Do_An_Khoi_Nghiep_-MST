import 'package:dio/dio.dart';
import '../constants/app_config.dart';

/// Dio client dùng chung cho toàn ứng dụng: timeout, baseUrl và token tập trung một chỗ.
class ApiClient {
  ApiClient._() {
    _dio = Dio(BaseOptions(
      baseUrl: AppConfig.apiBaseUrl,
      connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 20),
      sendTimeout: const Duration(seconds: 10),
      headers: {'Content-Type': 'application/json'},
    ));
    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) {
        if (_token != null) options.headers['Authorization'] = 'Bearer $_token';
        handler.next(options);
      },
    ));
  }

  static final ApiClient instance = ApiClient._();

  late final Dio _dio;
  String? _token;

  Dio get dio => _dio;

  /// Phase 3 sẽ gán token thật; hiện để trống để các endpoint công khai vẫn chạy.
  set token(String? value) => _token = value;
}
