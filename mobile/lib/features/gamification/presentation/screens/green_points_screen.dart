import 'package:flutter/material.dart';
import '../../../../core/theme/app_theme.dart';

class GreenPointsScreen extends StatelessWidget {
  const GreenPointsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Hành Trình Du Lịch Xanh'),
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
                        children: const [
                          Text('Điểm Du Lịch Xanh', style: TextStyle(color: Colors.white70, fontSize: 14)),
                          SizedBox(height: 4),
                          Text('175 GP', style: TextStyle(color: HuegoTheme.imperialGold, fontSize: 36, fontWeight: FontWeight.bold)),
                        ],
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                        decoration: BoxDecoration(
                          color: Colors.white.withOpacity(0.2),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: const Text('Cấp Độ 2 • Du Khách Xanh', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12)),
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),
                  const LinearProgressIndicator(
                    value: 0.65,
                    backgroundColor: Colors.white24,
                    color: HuegoTheme.imperialGold,
                    minHeight: 8,
                  ),
                  const SizedBox(height: 8),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: const [
                      Text('Tiến độ mở khóa Huế: 65%', style: TextStyle(color: Colors.white70, fontSize: 12)),
                      Text('Còn 75 GP để nhận E-Cert', style: TextStyle(color: Colors.white70, fontSize: 12)),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),
            const Text('Huy Hiệu Đã Đạt Được', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: HuegoTheme.royalViolet)),
            const SizedBox(height: 12),

            // Danh sách Huy hiệu Gamification
            Row(
              children: [
                _buildBadgeItem('Khám Phá', 'Mở khóa mốc đầu', Icons.flag_circle, true),
                const SizedBox(width: 12),
                _buildBadgeItem('Đạp Xe Xanh', '10km quanh sông', Icons.pedal_bike, true),
                const SizedBox(width: 12),
                _buildBadgeItem('Học Giả Huế', 'Đại Nội 100%', Icons.workspace_premium, false),
              ],
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
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Đang tạo Chứng nhận điện tử E-Certificate với mã QR bảo chứng...')),
                      );
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
      ),
    );
  }

  Widget _buildBadgeItem(String title, String desc, IconData icon, bool isUnlocked) {
    return Expanded(
      child: Container(
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
          children: [
            Icon(icon, size: 36, color: isUnlocked ? HuegoTheme.imperialGold : Colors.grey.shade400),
            const SizedBox(height: 8),
            Text(title, style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: isUnlocked ? HuegoTheme.textDark : Colors.grey)),
            const SizedBox(height: 2),
            Text(desc, textAlign: TextAlign.center, style: const TextStyle(fontSize: 10, color: HuegoTheme.textMuted)),
          ],
        ),
      ),
    );
  }
}
