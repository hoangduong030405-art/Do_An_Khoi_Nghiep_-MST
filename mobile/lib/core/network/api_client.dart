import 'dart:async';
import 'package:dio/dio.dart';
import '../constants/app_config.dart';
import '../constants/api_endpoints.dart';
import '../services/token_storage_service.dart';

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
      onRequest: (options, handler) async {
        final token = await TokenStorageService.instance.getAccessToken();
        if (token != null) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        handler.next(options);
      },
      onError: (DioException e, handler) async {
        if (e.response?.statusCode == 401) {
          // If the request was for refresh token and it failed with 401, don't loop
          if (e.requestOptions.path.contains('/auth/refresh')) {
            await TokenStorageService.instance.clearTokens();
            return handler.next(e);
          }

          final refreshed = await _refreshToken();
          if (refreshed) {
            final token = await TokenStorageService.instance.getAccessToken();
            e.requestOptions.headers['Authorization'] = 'Bearer $token';
            // Retry the request
            try {
              final response = await _dio.fetch(e.requestOptions);
              return handler.resolve(response);
            } on DioException catch (retryError) {
              return handler.next(retryError);
            }
          }
        }
        handler.next(e);
      },
    ));
  }

  static final ApiClient instance = ApiClient._();

  late final Dio _dio;
  bool _isRefreshing = false;
  Completer<bool>? _refreshCompleter;

  Dio get dio => _dio;

  Future<bool> _refreshToken() async {
    if (_isRefreshing) {
      return _refreshCompleter?.future ?? Future.value(false);
    }
    
    _isRefreshing = true;
    _refreshCompleter = Completer<bool>();

    try {
      final refreshToken = await TokenStorageService.instance.getRefreshToken();
      if (refreshToken == null) {
        _refreshCompleter?.complete(false);
        _isRefreshing = false;
        return false;
      }

      final response = await Dio(BaseOptions(baseUrl: AppConfig.apiBaseUrl)).post(
        ApiEndpoints.refresh,
        data: {'refreshToken': refreshToken},
      );

      if (response.statusCode == 200) {
        final data = response.data;
        await TokenStorageService.instance.saveTokens(
          accessToken: data['accessToken'],
          refreshToken: data['refreshToken'],
        );
        _refreshCompleter?.complete(true);
        _isRefreshing = false;
        return true;
      }
    } catch (e) {
      await TokenStorageService.instance.clearTokens();
    }
    
    _refreshCompleter?.complete(false);
    _isRefreshing = false;
    return false;
  }
}
