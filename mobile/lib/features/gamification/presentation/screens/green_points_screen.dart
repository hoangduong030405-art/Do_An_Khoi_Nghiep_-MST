import 'package:flutter/material.dart';
import '../../../../core/constants/api_endpoints.dart';
import '../../../../core/network/api_client.dart';
import '../../../../core/services/token_storage_service.dart';
import '../../../../core/theme/app_theme.dart';
import '../../../../core/utils/platform_url_helper.dart';
import '../../../../features/auth/data/auth_service.dart';
import '../../../../features/auth/presentation/screens/login_screen.dart';

class GreenPointsScreen extends StatefulWidget {
  const GreenPointsScreen({super.key});

  @override
  State<GreenPointsScreen> createState() => _GreenPointsScreenState();
}

class _GreenPointsScreenState extends State<GreenPointsScreen> {
  late Future<Map<String, dynamic>> _profileFuture;
  Map<String, dynamic>? _currentUser;

  @override
  void initState() {
    super.initState();
    _profileFuture = _fetchProfile();
  }

  Future<Map<String, dynamic>> _fetchProfile() async {
    try {
      final me = await AuthService.instance.getMe();
      _currentUser = me;
      final userId = me?['id'] ?? '';
      final url = '${ApiEndpoints.gamificationProfile}/$userId';
      final response = await ApiClient.instance.dio.get(url);
      if (response.data is Map<String, dynamic>) {
        return response.data as Map<String, dynamic>;
      }
    } catch (_) {}
    _currentUser ??= {
      'id': 'demo-tourist-01',
      'email': 'tourist.demo@huego.vn',
      'fullName': 'Du Khách Cố Đô (Demo)',
      'role': 'TOURIST',
    };
    return {
      'totalPoints': 320,
      'currentLevel': 2,
      'badges': [
        {'badgeCode': 'NEWBIE_EXPLORER', 'title': 'Khám Phá Cố Đô', 'isUnlocked': true},
        {'badgeCode': 'GREEN_TRAVELER', 'title': 'Du Khách Xanh', 'isUnlocked': true},
      ],
      'stats': {
        'unlockedCount': 8,
        'ecoActivities': 4,
        'co2SavedKg': 12.5,
      }
    };
  }

  String _getLevelTitle(int level) {
    switch (level) {
      case 3:
        return 'Cấp Độ 3 • Đại Sứ Di Sản';
      case 2:
        return 'Cấp Độ 2 • Du Khách Xanh';
      default:
        return 'Cấp Độ 1 • Người Khám Phá';
    }
  }

  IconData _getBadgeIcon(String? badgeCode) {
    switch (badgeCode) {
      case 'NEWBIE_EXPLORER':
        return Icons.flag_circle;
      case 'GREEN_TRAVELER':
        return Icons.pedal_bike;
      case 'HUE_HERITAGE_MASTER':
        return Icons.workspace_premium;
      default:
        return Icons.military_tech;
    }
  }

  void _showAccountDialog(BuildContext context, Map<String, dynamic> profile) {
    final user = _currentUser ?? (profile['user'] as Map<String, dynamic>? ?? {});
    final fullName = user['fullName'] ?? 'Du Khách Huế';
    final email = user['email'] ?? 'tourist.demo@huego.vn';
    final role = user['role'] ?? 'TOURIST';
    final pts = (profile['user']?['greenPoints'] ?? profile['totalPoints'] ?? 320);
    final level = ((profile['user']?['currentLevel'] ?? profile['currentLevel'] ?? 2) as num).toInt();

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        title: Row(
          children: [
            CircleAvatar(
              backgroundColor: HuegoTheme.royalViolet.withOpacity(0.12),
              child: const Icon(Icons.person, color: HuegoTheme.royalViolet),
            ),
            const SizedBox(width: 12),
            const Text(
              'Tài Khoản HUEGO',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: HuegoTheme.royalViolet),
            ),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ListTile(
              contentPadding: EdgeInsets.zero,
              leading: const Icon(Icons.badge, color: HuegoTheme.imperialGold),
              title: Text(fullName, style: const TextStyle(fontWeight: FontWeight.bold)),
              subtitle: Text(email),
            ),
            const Divider(),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 4),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Vai trò:', style: TextStyle(color: HuegoTheme.textMuted)),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                    decoration: BoxDecoration(
                      color: HuegoTheme.royalViolet.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      role,
                      style: const TextStyle(fontWeight: FontWeight.bold, color: HuegoTheme.royalViolet, fontSize: 12),
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 4),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Điểm tích lũy:', style: TextStyle(color: HuegoTheme.textMuted)),
                  Text('$pts GP', style: const TextStyle(fontWeight: FontWeight.bold, color: HuegoTheme.imperialGold)),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 4),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Cấp độ:', style: TextStyle(color: HuegoTheme.textMuted)),
                  Text(_getLevelTitle(level), style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                ],
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Đóng'),
          ),
          ElevatedButton.icon(
            onPressed: () {
              Navigator.pop(ctx);
              _confirmLogout(context);
            },
            icon: const Icon(Icons.logout, size: 16, color: Colors.white),
            label: const Text('Đăng xuất', style: TextStyle(color: Colors.white)),
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.red.shade700,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
          ),
        ],
      ),
    );
  }

  void _confirmLogout(BuildContext context) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: const Text('Xác nhận đăng xuất'),
        content: const Text('Bạn có chắc chắn muốn đăng xuất khỏi HUEGO?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Hủy'),
          ),
          ElevatedButton(
            onPressed: () async {
              Navigator.pop(ctx);
              await TokenStorageService.instance.clearTokens();
              if (!context.mounted) return;
              Navigator.of(context).pushAndRemoveUntil(
                MaterialPageRoute(builder: (_) => const LoginScreen()),
                (route) => false,
              );
            },
            style: ElevatedButton.styleFrom(backgroundColor: Colors.red.shade700),
            child: const Text('Đăng xuất', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );
  }

  Future<void> _handleDownloadCertificate(BuildContext context, bool canCert) async {
    if (!canCert) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Bạn chưa đủ điều kiện nhận E-Certificate (cần tối thiểu 200 GP hoặc 80% tiến độ).'),
          backgroundColor: Colors.orange,
        ),
      );
      return;
    }

    try {
      final me = await AuthService.instance.getMe();
      final userId = me?['id'] ?? 'demo-user';
      final certUrl = '${ApiEndpoints.certificate}/$userId';
      
      String certCode = 'HUEGO-GREEN-CERT';
      try {
        final res = await ApiClient.instance.dio.post(certUrl);
        certCode = res.data['certificateCode'] ?? certCode;
      } catch (_) {}

      final pdfUrl = '${ApiEndpoints.certificate}/$certCode/pdf';
      final rootUrl = ApiEndpoints.baseUrl.replaceAll('/api/v1', '');
      final verifyUrl = '$rootUrl/verify/$certCode';

      if (!context.mounted) return;

      final urlHelper = createPlatformUrlHelper();

      showDialog(
        context: context,
        builder: (ctx) => AlertDialog(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
          title: const Row(
            children: [
              Icon(Icons.workspace_premium, color: HuegoTheme.imperialGold, size: 28),
              SizedBox(width: 10),
              Expanded(
                child: Text(
                  'Chứng Nhận Du Lịch Xanh',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: HuegoTheme.royalViolet),
                ),
              ),
            ],
          ),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Chúc mừng bạn đã hoàn thành xuất sắc các tiêu chí Du Lịch Xanh Cố Đô!',
                style: TextStyle(fontSize: 13, color: HuegoTheme.textDark),
              ),
              const SizedBox(height: 12),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: HuegoTheme.royalViolet.withOpacity(0.06),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: HuegoTheme.royalViolet.withOpacity(0.2)),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Mã chứng nhận chính thức:', style: TextStyle(fontSize: 11, color: HuegoTheme.textMuted)),
                    const SizedBox(height: 4),
                    SelectableText(
                      certCode,
                      style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: HuegoTheme.royalViolet),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 14),
              ElevatedButton.icon(
                onPressed: () {
                  urlHelper.openUrl(pdfUrl, downloadFileName: '$certCode.pdf');
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text('📄 Đang tải Chứng nhận PDF: $certCode.pdf'),
                      backgroundColor: HuegoTheme.royalViolet,
                    ),
                  );
                },
                icon: const Icon(Icons.picture_as_pdf, color: Colors.white, size: 18),
                label: const Text('Tải File PDF Chứng Nhận', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                style: ElevatedButton.styleFrom(
                  backgroundColor: HuegoTheme.royalViolet,
                  minimumSize: const Size(double.infinity, 44),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
              ),
              const SizedBox(height: 8),
              OutlinedButton.icon(
                onPressed: () {
                  urlHelper.openUrl(verifyUrl);
                },
                icon: const Icon(Icons.verified_user, color: HuegoTheme.royalViolet, size: 18),
                label: const Text('Tra cứu công khai (/verify)', style: TextStyle(color: HuegoTheme.royalViolet)),
                style: OutlinedButton.styleFrom(
                  minimumSize: const Size(double.infinity, 44),
                  side: const BorderSide(color: HuegoTheme.royalViolet),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(ctx),
              child: const Text('Đóng'),
            ),
          ],
        ),
      );
    } catch (e) {
      if (!context.mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Lỗi khi xuất chứng nhận: $e')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FutureBuilder<Map<String, dynamic>>(
        future: _profileFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Scaffold(
              body: Center(child: CircularProgressIndicator()),
            );
          }

          if (snapshot.hasError) {
            return Scaffold(
              appBar: AppBar(title: const Text('Hành Trình Du Lịch Xanh')),
              body: Center(
                child: Padding(
                  padding: const EdgeInsets.all(24.0),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(Icons.error_outline, size: 48, color: HuegoTheme.royalViolet),
                      const SizedBox(height: 12),
                      const Text(
                        'Không thể tải hồ sơ Điểm Xanh',
                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        '${snapshot.error}',
                        textAlign: TextAlign.center,
                        style: const TextStyle(fontSize: 12, color: HuegoTheme.textMuted),
                      ),
                      const SizedBox(height: 16),
                      ElevatedButton(
                        onPressed: () {
                          setState(() {
                            _profileFuture = _fetchProfile();
                          });
                        },
                        style: ElevatedButton.styleFrom(backgroundColor: HuegoTheme.royalViolet),
                        child: const Text('Thử lại', style: TextStyle(color: Colors.white)),
                      ),
                    ],
                  ),
                ),
              ),
            );
          }

          final profile = snapshot.data ?? {};
          final user = profile['user'] as Map<String, dynamic>? ?? {};
          final stats = profile['stats'] as Map<String, dynamic>? ?? {};
          final badges = (profile['badges'] as List<dynamic>? ?? []).cast<Map<String, dynamic>>();
          final canCert = profile['canGenerateCertificate'] as bool? ?? false;
          final pointsToNext = profile['pointsToNextCertificate'] as num? ?? 75;

          final points = user['greenPoints'] ?? 125;
          final currentLevel = (user['currentLevel'] as num?)?.toInt() ?? 1;
          final progressPercent = (stats['progressPercent'] as num?)?.toDouble() ?? 0.0;
          final unlockedPlaces = stats['totalUnlockedPlaces'] ?? 0;
          final totalPlaces = stats['totalSystemPlaces'] ?? 0;

          return Scaffold(
            appBar: AppBar(
              title: const Text('Hành Trình Du Lịch Xanh'),
              backgroundColor: HuegoTheme.royalViolet,
              actions: [
                IconButton(
                  icon: const Icon(Icons.account_circle, size: 28),
                  onPressed: () => _showAccountDialog(context, profile),
                  tooltip: 'Tài khoản & Đăng xuất',
                ),
              ],
            ),
            body: SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Thẻ Tổng Quan Green Points
                  Container(
                    padding: const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [HuegoTheme.royalViolet, Color(0xFF7E38B7)],
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                      ),
                      borderRadius: BorderRadius.circular(24),
                      boxShadow: const [
                        BoxShadow(color: Colors.black26, blurRadius: 10, offset: Offset(0, 4)),
                      ],
                    ),
                    child: Column(
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text('Điểm Du Lịch Xanh', style: TextStyle(color: Colors.white70, fontSize: 14)),
                                const SizedBox(height: 4),
                                Text('$points GP', style: const TextStyle(color: HuegoTheme.imperialGold, fontSize: 36, fontWeight: FontWeight.bold)),
                              ],
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                              decoration: BoxDecoration(
                                color: Colors.white.withOpacity(0.2),
                                borderRadius: BorderRadius.circular(20),
                              ),
                              child: Text(
                                _getLevelTitle(currentLevel),
                                style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 20),
                        LinearProgressIndicator(
                          value: (progressPercent / 100).clamp(0.0, 1.0),
                          backgroundColor: Colors.white24,
                          color: HuegoTheme.imperialGold,
                          minHeight: 8,
                        ),
                        const SizedBox(height: 8),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text('Tiến độ mở khóa Huế: ${progressPercent.toInt()}% ($unlockedPlaces/$totalPlaces)', style: const TextStyle(color: Colors.white70, fontSize: 12)),
                            Text(pointsToNext > 0 ? 'Còn $pointsToNext GP để nhận E-Cert' : 'Đã đủ điều kiện nhận E-Cert', style: const TextStyle(color: Colors.white70, fontSize: 12)),
                          ],
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 24),
                  const Text('Huy Hiệu Đã Đạt Được', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: HuegoTheme.royalViolet)),
                  const SizedBox(height: 12),

                  // Danh sách Huy hiệu Gamification từ API
                  SizedBox(
                    height: 110,
                    child: ListView.separated(
                      scrollDirection: Axis.horizontal,
                      itemCount: badges.length,
                      separatorBuilder: (_, __) => const SizedBox(width: 12),
                      itemBuilder: (context, index) {
                        final b = badges[index];
                        final title = b['title'] as String? ?? '';
                        final desc = b['description'] as String? ?? '';
                        final isUnlocked = b['isUnlocked'] as bool? ?? false;
                        final code = b['badgeCode'] as String? ?? '';
                        return Container(
                          width: 120,
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(16),
                            border: Border.all(
                              color: isUnlocked ? HuegoTheme.imperialGold : Colors.grey.shade300,
                              width: isUnlocked ? 2 : 1,
                            ),
                          ),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(
                                _getBadgeIcon(code),
                                size: 32,
                                color: isUnlocked ? HuegoTheme.imperialGold : Colors.grey.shade400,
                              ),
                              const SizedBox(height: 6),
                              Text(
                                title,
                                textAlign: TextAlign.center,
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 12,
                                  color: isUnlocked ? HuegoTheme.textDark : Colors.grey,
                                ),
                              ),
                              const SizedBox(height: 2),
                              Text(
                                desc,
                                textAlign: TextAlign.center,
                                maxLines: 2,
                                overflow: TextOverflow.ellipsis,
                                style: const TextStyle(fontSize: 10, color: HuegoTheme.textMuted),
                              ),
                            ],
                          ),
                        );
                      },
                    ),
                  ),

                  const SizedBox(height: 28),
                  // Chứng nhận điện tử (E-Certificate)
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: HuegoTheme.imperialGold.withOpacity(0.5), width: 1.5),
                    ),
                    child: Column(
                      children: [
                        const Icon(Icons.verified, color: HuegoTheme.imperialGold, size: 48),
                        const SizedBox(height: 8),
                        const Text('Chứng Nhận Du Lịch Xanh Cố Đô', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                        const SizedBox(height: 4),
                        const Text(
                          'Được công nhận bởi Sở Du Lịch & HUEGO khi hoàn thành hành trình khám phá di sản bền vững.',
                          textAlign: TextAlign.center,
                          style: TextStyle(fontSize: 12, color: HuegoTheme.textMuted),
                        ),
                        const SizedBox(height: 16),
                        ElevatedButton.icon(
                          onPressed: () => _handleDownloadCertificate(context, canCert),
                          icon: const Icon(Icons.download, size: 18),
                          label: const Text('Xuất E-Certificate (PDF)'),
                          style: ElevatedButton.styleFrom(backgroundColor: HuegoTheme.royalViolet),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
