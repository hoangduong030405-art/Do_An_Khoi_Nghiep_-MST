import 'package:flutter/material.dart';
import '../../../../core/constants/api_endpoints.dart';
import '../../../../core/network/api_client.dart';
import '../../../../core/theme/app_theme.dart';

class GreenPointsScreen extends StatefulWidget {
  const GreenPointsScreen({Key? key}) : super(key: key);

  @override
  State<GreenPointsScreen> createState() => _GreenPointsScreenState();
}

class _GreenPointsScreenState extends State<GreenPointsScreen> {
  static const String _demoUserId = 'e7b0e774-7243-41bb-9be4-8a4b868e82ef';
  late Future<Map<String, dynamic>> _profileFuture;

  @override
  void initState() {
    super.initState();
    _profileFuture = _fetchProfile();
  }

  Future<Map<String, dynamic>> _fetchProfile() async {
    final url = '${ApiEndpoints.gamificationProfile}/$_demoUserId';
    final response = await ApiClient.instance.dio.get(url);
    return response.data as Map<String, dynamic>;
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Hành Trình Du Lịch Xanh'),
      ),
      body: FutureBuilder<Map<String, dynamic>>(
        future: _profileFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          if (snapshot.hasError) {
            return Center(
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

          return SingleChildScrollView(
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
                        onPressed: () async {
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
                            final certUrl = '${ApiEndpoints.certificate}/$_demoUserId';
                            final res = await ApiClient.instance.dio.post(certUrl);
                            final certCode = res.data['certificateCode'] ?? 'HUEGO-GREEN-CERT';
                            // TODO Phase 7: xuất PDF
                            if (!context.mounted) return;
                            showDialog(
                              context: context,
                              builder: (ctx) => AlertDialog(
                                title: const Text('Chứng Nhận Du Lịch Xanh'),
                                content: Text('Cấp thành công! Mã chứng nhận của bạn: $certCode'),
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
                        },
                        icon: const Icon(Icons.download, size: 18),
                        label: const Text('Xuất E-Certificate (PDF)'),
                        style: ElevatedButton.styleFrom(backgroundColor: HuegoTheme.royalViolet),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
