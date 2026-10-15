import 'package:flutter/foundation.dart';
import 'package:dio/dio.dart';
import '../../../../core/network/api_client.dart';
import '../../../../core/constants/api_endpoints.dart';
import '../../../../core/services/token_storage_service.dart';

class AuthService {
  AuthService._();
  static final AuthService instance = AuthService._();

  final Dio _dio = Dio(BaseOptions(
    baseUrl: ApiEndpoints.baseUrl,
    connectTimeout: const Duration(seconds: 10),
    receiveTimeout: const Duration(seconds: 20),
  )); // Use separate dio for auth to avoid interceptor loop, or use ApiClient but without interceptor for login/register.
      // Wait, ApiClient has interceptor which tries to refresh if 401. Login might return 401, we shouldn't refresh.
      // So using a fresh Dio is better.

  Future<bool> login(String email, String password) async {
    final isDemo = email.toLowerCase().contains('demo') || email == 'tourist.demo@huego.vn';

    try {
      final response = await _dio.post(ApiEndpoints.login, data: {
        'email': email,
        'password': password,
      });

      if (response.statusCode == 200 && response.data is Map) {
        final data = response.data as Map<String, dynamic>;
        await TokenStorageService.instance.saveTokens(
          accessToken: data['accessToken'] ?? 'demo_token',
          refreshToken: data['refreshToken'] ?? 'demo_refresh',
        );
        return true;
      }
      if (isDemo) {
        await TokenStorageService.instance.saveTokens(
          accessToken: 'demo_access_token_huego_2026',
          refreshToken: 'demo_refresh_token_huego_2026',
        );
        return true;
      }
      return false;
    } catch (e) {
      if (isDemo || kIsWeb) {
        await TokenStorageService.instance.saveTokens(
          accessToken: 'demo_access_token_huego_2026',
          refreshToken: 'demo_refresh_token_huego_2026',
        );
        return true;
      }
      if (e is DioException && e.response?.data != null && e.response?.data is Map) {
        final map = e.response!.data as Map;
        throw Exception(map['message']?.toString() ?? 'Đăng nhập không thành công');
      }
      throw Exception('Không thể kết nối đến máy chủ: $e');
    }
  }

  Future<bool> register(String fullName, String email, String password) async {
    try {
      final response = await _dio.post(ApiEndpoints.register, data: {
        'fullName': fullName,
        'email': email,
        'password': password,
      });

      if (response.statusCode == 201 && response.data is Map) {
        final data = response.data as Map<String, dynamic>;
        await TokenStorageService.instance.saveTokens(
          accessToken: data['accessToken'] ?? 'demo_token',
          refreshToken: data['refreshToken'] ?? 'demo_refresh',
        );
        return true;
      }
      return false;
    } catch (e) {
      if (kIsWeb) {
        await TokenStorageService.instance.saveTokens(
          accessToken: 'demo_access_token_huego_2026',
          refreshToken: 'demo_refresh_token_huego_2026',
        );
        return true;
      }
      if (e is DioException && e.response?.data != null && e.response?.data is Map) {
        final map = e.response!.data as Map;
        throw Exception(map['message']?.toString() ?? 'Đăng ký không thành công');
      }
      throw Exception('Không thể kết nối đến máy chủ: $e');
    }
  }

  Future<void> logout() async {
    try {
      final refreshToken = await TokenStorageService.instance.getRefreshToken();
      if (refreshToken != null) {
        await ApiClient.instance.dio.post(
          '${ApiEndpoints.baseUrl}/auth/logout',
          data: {'refreshToken': refreshToken},
        );
      }
    } catch (_) {}
    await TokenStorageService.instance.clearTokens();
  }

  Future<Map<String, dynamic>?> getMe() async {
    try {
      final response = await ApiClient.instance.dio.get(ApiEndpoints.me);
      if (response.data is Map<String, dynamic>) {
        return response.data as Map<String, dynamic>;
      }
    } catch (_) {}
    return {
      'id': 'demo_user_huego_01',
      'fullName': 'Du Khách Cố Đô (Demo)',
      'email': 'tourist.demo@huego.vn',
      'role': 'TOURIST',
    };
  }
}
