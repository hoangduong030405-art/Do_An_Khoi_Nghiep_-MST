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
    try {
      final response = await _dio.post(ApiEndpoints.login, data: {
        'email': email,
        'password': password,
      });

      if (response.statusCode == 200) {
        final data = response.data;
        await TokenStorageService.instance.saveTokens(
          accessToken: data['accessToken'],
          refreshToken: data['refreshToken'],
        );
        return true;
      }
      return false;
    } catch (e) {
      if (e is DioException && e.response?.data != null) {
        throw Exception(e.response?.data['message'] ?? 'Login failed');
      }
      throw Exception('Login failed: $e');
    }
  }

  Future<bool> register(String fullName, String email, String password) async {
    try {
      final response = await _dio.post(ApiEndpoints.register, data: {
        'fullName': fullName,
        'email': email,
        'password': password,
      });

      if (response.statusCode == 201) {
        final data = response.data;
        await TokenStorageService.instance.saveTokens(
          accessToken: data['accessToken'],
          refreshToken: data['refreshToken'],
        );
        return true;
      }
      return false;
    } catch (e) {
      if (e is DioException && e.response?.data != null) {
        throw Exception(e.response?.data['message'] ?? 'Register failed');
      }
      throw Exception('Register failed: $e');
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
      return response.data;
    } catch (e) {
      return null;
    }
  }
}
