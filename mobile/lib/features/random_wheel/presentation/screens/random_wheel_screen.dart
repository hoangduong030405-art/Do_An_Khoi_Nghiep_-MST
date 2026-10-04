import 'dart:math';
import 'package:flutter/material.dart';
import '../../../../core/theme/app_theme.dart';
import '../../data/random_wheel_service.dart';

class RandomWheelScreen extends StatefulWidget {
  const RandomWheelScreen({Key? key}) : super(key: key);

  @override
  State<RandomWheelScreen> createState() => _RandomWheelScreenState();
}

class _RandomWheelScreenState extends State<RandomWheelScreen> with SingleTickerProviderStateMixin {
  final RandomWheelService _wheelService = RandomWheelService();
  late AnimationController _animController;
  late Animation<double> _animation;

  String _selectedCategory = 'ALL';
  String? _selectedTag;
  bool _isSpinning = false;
  double _currentRotation = 0.0;
  double _targetRotation = 0.0;

  final List<String> _wheelLabels = [
    'Cà Phê Muối',
    'Đại Nội Huế',
    'Chè Hẻm 20 Món',
    'Đồi Vọng Cảnh',
    'Cầu Tràng Tiền',
    'Lăng Khải Định',
    'Trà Cung Đình',
    'Làng Hương',
  ];

  final List<Color> _sliceColors = [
    const Color(0xFF582C83), // Tím Huế
    const Color(0xFFD4AF37), // Vàng Cung Đình
    const Color(0xFF1E6B7B), // Xanh Sông Hương
    const Color(0xFFE65100), // Cam Trầm
    const Color(0xFF2E7D32), // Xanh Sinh Thái
    const Color(0xFFC2185B), // Hồng Sen
    const Color(0xFF00897B), // Ngọc Bích
    const Color(0xFFF57F17), // Hổ Phách
  ];

  @override
  void initState() {
    super.initState();
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 4000),
    );

    _animation = CurvedAnimation(
      parent: _animController,
      curve: Curves.fastLinearToSlowEaseIn,
    );
  }

  @override
  void dispose() {
    _animController.dispose();
    super.dispose();
  }

  Future<void> _startSpin() async {
    if (_isSpinning) return;
    setState(() => _isSpinning = true);

    // Gọi API Backend lấy kết quả ngẫu nhiên & góc dừng
    final result = await _wheelService.spinWheel(
      categoryCode: _selectedCategory,
      filterTag: _selectedTag,
    );

    final double targetDeg = (result['targetRotationDegrees'] ?? 1845.0).toDouble();
    _targetRotation = _currentRotation + (targetDeg * pi / 180.0);

    final startAngle = _currentRotation;
    _animation = Tween<double>(begin: startAngle, end: _targetRotation).animate(
      CurvedAnimation(parent: _animController, curve: Curves.fastLinearToSlowEaseIn),
    );

    _animController.reset();
    _animController.forward().then((_) {
      _currentRotation = _targetRotation % (2 * pi);
      setState(() => _isSpinning = false);
      _showResultDialog(result);
    });
  }

  void _showResultDialog(Map<String, dynamic> result) {
    final place = result['winningPlace'] ?? {};
    final placeName = place['name'] ?? 'Địa danh Cố Đô';
    final reason = result['aiRecommendationReason'] ?? 'Lựa chọn xuất sắc dành cho bạn!';

    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
        contentPadding: EdgeInsets.zero,
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Header hình ảnh
            Stack(
              children: [
                ClipRRect(
                  borderRadius: const BorderRadius.vertical(top: Radius.circular(28)),
                  child: Image.network(
                    place['thumbnailUrl'] ?? 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd',
                    height: 180,
                    width: double.infinity,
                    fit: BoxFit.cover,
                  ),
                ),
                Positioned(
                  top: 12,
                  right: 12,
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: HuegoTheme.imperialGold,
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: const Text('KẾT QUẢ VÒNG QUAY', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11, color: Colors.black87)),
                  ),
                ),
              ],
            ),
            Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    placeName,
                    style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: HuegoTheme.royalViolet),
                  ),
                  const SizedBox(height: 6),
                  Row(
                    children: [
                      const Icon(Icons.location_on, size: 16, color: HuegoTheme.textMuted),
                      const SizedBox(width: 4),
                      Expanded(
                        child: Text(
                          place['address'] ?? 'TP Huế',
                          style: const TextStyle(fontSize: 13, color: HuegoTheme.textMuted),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: HuegoTheme.royalViolet.withOpacity(0.06),
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: HuegoTheme.royalViolet.withOpacity(0.15)),
                    ),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Icon(Icons.auto_awesome, color: HuegoTheme.imperialGold, size: 20),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            reason,
                            style: const TextStyle(fontSize: 13, height: 1.4, fontStyle: FontStyle.italic),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 20),
                  Row(
                    children: [
                      Expanded(
                        child: OutlinedButton(
                          onPressed: () => Navigator.of(ctx).pop(),
                          style: OutlinedButton.styleFrom(
                            side: const BorderSide(color: HuegoTheme.royalViolet),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                          ),
                          child: const Text('Quay lại', style: TextStyle(color: HuegoTheme.royalViolet)),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: ElevatedButton(
                          onPressed: () {
                            Navigator.of(ctx).pop();
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                content: Text('Đã thêm [$placeName] vào Lịch trình hôm nay!'),
                                backgroundColor: HuegoTheme.royalViolet,
                              ),
                            );
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: HuegoTheme.royalViolet,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                          ),
                          child: const Text('Chọn Điểm Này', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Vòng Quay Quyết Định'),
        backgroundColor: HuegoTheme.royalViolet,
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            children: [
              // Header giới thiệu tính năng
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [HuegoTheme.royalViolet, Color(0xFF7B3FA2)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.casino, color: HuegoTheme.imperialGold, size: 40),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: const [
                          Text(
                            'Phân vân không biết đi đâu?',
                            style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16),
                          ),
                          SizedBox(height: 4),
                          Text(
                            'Để vòng quay HUEGO chọn ngẫu nhiên quán cà phê sống ảo hoặc món ngon đặc sản cho bạn!',
                            style: TextStyle(color: Colors.white70, fontSize: 12),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 16),

              // Bộ lọc danh mục (Filter Chips)
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: [
                    _buildFilterChip('ALL', '🎲 Tất cả'),
                    _buildFilterChip('CAFE', '☕ Quán Cà Phê'),
                    _buildFilterChip('CUISINE', '🍜 Đặc Sản'),
                    _buildFilterChip('HISTORICAL', '🏛️ Di Tích'),
                    _buildFilterChip('SCENIC_VIEW', '📸 Check-in View Đẹp'),
                  ],
                ),
              ),

              const SizedBox(height: 24),

              // Vòng quay vẽ bằng CustomPainter & AnimatedBuilder
              Stack(
                alignment: Alignment.center,
                children: [
                  // Vành bánh xe trang trí
                  Container(
                    width: 320,
                    height: 320,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(
                          color: HuegoTheme.royalViolet.withOpacity(0.3),
                          blurRadius: 20,
                          spreadRadius: 4,
                        ),
                      ],
                    ),
                  ),

                  // Bánh xe xoay
                  AnimatedBuilder(
                    animation: _animation,
                    builder: (context, child) {
                      return Transform.rotate(
                        angle: _animation.value,
                        child: CustomPaint(
                          size: const Size(300, 300),
                          painter: _WheelPainter(
                            labels: _wheelLabels,
                            colors: _sliceColors,
                          ),
                        ),
                      );
                    },
                  ),

                  // Kim chỉ định hướng ở đỉnh (Pointer)
                  Positioned(
                    top: 0,
                    child: Container(
                      width: 24,
                      height: 36,
                      decoration: const BoxDecoration(
                        color: Colors.redAccent,
                        shape: BoxShape.rectangle,
                        borderRadius: BorderRadius.vertical(bottom: Radius.circular(12)),
                        boxShadow: [BoxShadow(color: Colors.black38, blurRadius: 4)],
                      ),
                      child: const Icon(Icons.arrow_downward, color: Colors.white, size: 18),
                    ),
                  ),

                  // Trục tâm giữa bánh xe (Center Cap)
                  GestureDetector(
                    onTap: _isSpinning ? null : _startSpin,
                    child: Container(
                      width: 70,
                      height: 70,
                      decoration: BoxDecoration(
                        gradient: const RadialGradient(
                          colors: [Colors.white, HuegoTheme.imperialGold],
                        ),
                        shape: BoxShape.circle,
                        boxShadow: const [
                          BoxShadow(color: Colors.black38, blurRadius: 8, offset: Offset(0, 3)),
                        ],
                        border: Border.all(color: Colors.white, width: 3),
                      ),
                      child: Center(
                        child: Text(
                          _isSpinning ? '...' : 'QUAY',
                          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: HuegoTheme.royalViolet),
                        ),
                      ),
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 30),

              // Nút kích hoạt lớn
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: _isSpinning ? null : _startSpin,
                  icon: const Icon(Icons.rotate_right, color: Colors.white, size: 26),
                  label: Text(
                    _isSpinning ? 'ĐANG QUAY TÌM ĐỊA ĐIỂM...' : 'QUAY NGAY BẰNG VẬN MAY!',
                    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.white),
                  ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: HuegoTheme.royalViolet,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                    elevation: 4,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildFilterChip(String code, String label) {
    final isSelected = _selectedCategory == code;
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: FilterChip(
        label: Text(label),
        selected: isSelected,
        selectedColor: HuegoTheme.imperialGold.withOpacity(0.35),
        checkmarkColor: HuegoTheme.royalViolet,
        labelStyle: TextStyle(
          color: isSelected ? HuegoTheme.royalViolet : HuegoTheme.textDark,
          fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
        ),
        onSelected: (val) {
          if (!_isSpinning) {
            setState(() => _selectedCategory = code);
          }
        },
      ),
    );
  }
}

class _WheelPainter extends CustomPainter {
  final List<String> labels;
  final List<Color> colors;

  _WheelPainter({required this.labels, required this.colors});

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = size.width / 2;
    final sliceAngle = (2 * pi) / labels.length;

    final paint = Paint()..style = PaintingStyle.fill;
    final strokePaint = Paint()
      ..style = PaintingStyle.stroke
      ..color = Colors.white
      ..strokeWidth = 2.5;

    for (int i = 0; i < labels.length; i++) {
      paint.color = colors[i % colors.length];
      final startAngle = i * sliceAngle;

      // Vẽ nan quạt
      canvas.drawArc(
        Rect.fromCircle(center: center, radius: radius),
        startAngle,
        sliceAngle,
        true,
        paint,
      );

      // Đường viền chia nan
      canvas.drawArc(
        Rect.fromCircle(center: center, radius: radius),
        startAngle,
        sliceAngle,
        true,
        strokePaint,
      );

      // Vẽ chữ nhãn bên trong nan quạt
      canvas.save();
      final textAngle = startAngle + sliceAngle / 2;
      canvas.translate(center.dx, center.dy);
      canvas.rotate(textAngle);

      final textSpan = TextSpan(
        text: labels[i],
        style: const TextStyle(
          color: Colors.white,
          fontSize: 11,
          fontWeight: FontWeight.bold,
          shadows: [Shadow(color: Colors.black45, blurRadius: 2)],
        ),
      );

      final textPainter = TextPainter(
        text: textSpan,
        textDirection: TextDirection.ltr,
        maxLines: 1,
      )..layout();

      // Đặt chữ ở 60% bán kính
      textPainter.paint(canvas, Offset(radius * 0.35, -textPainter.height / 2));
      canvas.restore();
    }
  }

  @override
  bool shouldRepaint(covariant _WheelPainter oldDelegate) => false;
}
