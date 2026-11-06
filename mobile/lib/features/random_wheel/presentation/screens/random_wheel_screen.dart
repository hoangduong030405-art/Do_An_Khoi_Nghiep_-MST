import 'dart:math';
import 'package:flutter/material.dart';
import '../../../../core/theme/app_theme.dart';
import '../../data/random_wheel_service.dart';

class RandomWheelScreen extends StatefulWidget {
  const RandomWheelScreen({super.key});

  @override
  State<RandomWheelScreen> createState() => _RandomWheelScreenState();
}

class _RandomWheelScreenState extends State<RandomWheelScreen>
    with SingleTickerProviderStateMixin {
  final RandomWheelService _wheelService = RandomWheelService();
  late AnimationController _animController;
  late Animation<double> _animation;

  String _selectedCategory = 'ALL';
  String? _selectedTag;
  bool _isSpinning = false;
  double _currentRotation = 0.0;
  double _targetRotation = 0.0;

  List<Map<String, dynamic>> _wheelPlaces = [];
  List<String> _wheelLabels = [];

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

    _applyFilterAndLoadMilestones('ALL');
  }

  void _applyFilterAndLoadMilestones(String categoryCode) {
    final milestones = _wheelService.getFilteredMilestones(categoryCode);
    setState(() {
      _selectedCategory = categoryCode;
      _wheelPlaces = milestones;
      _wheelLabels = milestones
          .map((p) => (p['shortLabel'] ?? p['name'] ?? 'Điểm đến').toString())
          .toList();
    });
  }

  @override
  void dispose() {
    _animController.dispose();
    super.dispose();
  }

  Future<void> _startSpin() async {
    if (_isSpinning || _wheelPlaces.isEmpty) return;
    setState(() => _isSpinning = true);

    final winningIdx = Random().nextInt(_wheelPlaces.length);
    final winningPlace = _wheelPlaces[winningIdx];
    final sliceAngle = 360.0 / _wheelPlaces.length;
    final absoluteTargetDeg =
        (270.0 - (winningIdx * sliceAngle + sliceAngle / 2.0) + 360.0) % 360.0;

    final currentDegMod = (_currentRotation * 180.0 / pi) % 360.0;
    double diffDeg = absoluteTargetDeg - currentDegMod;
    if (diffDeg <= 0) diffDeg += 360.0;

    final totalSpinDeg = 360.0 * 5 + diffDeg;
    _targetRotation = _currentRotation + (totalSpinDeg * pi / 180.0);

    final startAngle = _currentRotation;
    _animation = Tween<double>(begin: startAngle, end: _targetRotation).animate(
      CurvedAnimation(
        parent: _animController,
        curve: Curves.fastLinearToSlowEaseIn,
      ),
    );

    // Gọi song song API Backend nếu có kết nối
    final apiFuture = _wheelService.spinWheel(
      categoryCode: _selectedCategory,
      filterTag: _selectedTag,
      activeSlices: _wheelPlaces,
    );

    _animController.reset();
    await _animController.forward();

    final apiResult = await apiFuture;
    _currentRotation = _targetRotation % (2 * pi);
    if (!mounted) return;
    setState(() => _isSpinning = false);

    _showResultDialog({
      'winningPlace': winningPlace,
      'aiRecommendationReason': winningPlace['description'] ??
          apiResult['aiRecommendationReason'] ??
          'Lựa chọn xuất sắc từ các cột mốc Bản đồ Cố Đô!',
    });
  }

  void _showResultDialog(Map<String, dynamic> result) {
    final place = (result['winningPlace'] as Map<String, dynamic>?) ?? {};
    final placeName = (place['name'] ?? 'Địa danh Cố Đô').toString();
    final reason = (result['aiRecommendationReason'] ??
            'Lựa chọn xuất sắc dành cho bạn!')
        .toString();
    final gp = place['greenRewardPoints'] ?? 25;

    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
        contentPadding: EdgeInsets.zero,
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Stack(
              children: [
                ClipRRect(
                  borderRadius:
                      const BorderRadius.vertical(top: Radius.circular(28)),
                  child: Image.network(
                    (place['thumbnailUrl'] ??
                            'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd')
                        .toString(),
                    height: 170,
                    width: double.infinity,
                    fit: BoxFit.cover,
                    errorBuilder: (_, __, ___) => Container(
                      height: 170,
                      color: HuegoTheme.royalViolet,
                      alignment: Alignment.center,
                      child: const Icon(
                        Icons.temple_buddhist,
                        color: HuegoTheme.imperialGold,
                        size: 48,
                      ),
                    ),
                  ),
                ),
                Positioned(
                  top: 12,
                  left: 12,
                  child: Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: HuegoTheme.imperialGold,
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: const Text(
                      '🎯 ĐIỂM ĐẾN ĐƯỢC CHỌN',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 11,
                        color: Colors.black87,
                      ),
                    ),
                  ),
                ),
                Positioned(
                  top: 12,
                  right: 12,
                  child: Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: Colors.green.shade700,
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Text(
                      '+$gp GP',
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 11,
                        color: Colors.white,
                      ),
                    ),
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
                    style: const TextStyle(
                      fontSize: 19,
                      fontWeight: FontWeight.bold,
                      color: HuegoTheme.royalViolet,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Row(
                    children: [
                      const Icon(
                        Icons.location_on,
                        size: 16,
                        color: HuegoTheme.textMuted,
                      ),
                      const SizedBox(width: 4),
                      Expanded(
                        child: Text(
                          (place['address'] ?? 'TP Huế').toString(),
                          style: const TextStyle(
                            fontSize: 13,
                            color: HuegoTheme.textMuted,
                          ),
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
                      border: Border.all(
                        color: HuegoTheme.royalViolet.withOpacity(0.15),
                      ),
                    ),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Icon(
                          Icons.auto_awesome,
                          color: HuegoTheme.imperialGold,
                          size: 20,
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            reason,
                            style: const TextStyle(
                              fontSize: 13,
                              height: 1.4,
                              fontStyle: FontStyle.italic,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 18),
                  Row(
                    children: [
                      Expanded(
                        child: OutlinedButton(
                          onPressed: () => Navigator.of(ctx).pop(),
                          style: OutlinedButton.styleFrom(
                            side: const BorderSide(
                              color: HuegoTheme.royalViolet,
                            ),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(14),
                            ),
                          ),
                          child: const Text(
                            'Quay lại',
                            style: TextStyle(color: HuegoTheme.royalViolet),
                          ),
                        ),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: ElevatedButton.icon(
                          onPressed: () {
                            Navigator.of(ctx).pop();
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                content: Text(
                                  '📍 Đã chọn điểm đi [$placeName] và thêm vào Lộ trình!',
                                ),
                                backgroundColor: HuegoTheme.royalViolet,
                              ),
                            );
                          },
                          icon: const Icon(
                            Icons.near_me,
                            color: Colors.white,
                            size: 16,
                          ),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: HuegoTheme.royalViolet,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(14),
                            ),
                          ),
                          label: const Text(
                            'Đi Điểm Này',
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
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
        title: const Text('Vòng Quay Cột Mốc Bản Đồ'),
        backgroundColor: HuegoTheme.royalViolet,
        actions: [
          IconButton(
            tooltip: 'Đổi nhóm cột mốc khác từ Bản đồ',
            onPressed: _isSpinning
                ? null
                : () => _applyFilterAndLoadMilestones(_selectedCategory),
            icon: const Icon(Icons.shuffle, color: HuegoTheme.imperialGold),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            children: [
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
                    const Icon(
                      Icons.casino,
                      color: HuegoTheme.imperialGold,
                      size: 38,
                    ),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Chọn điểm đi từ Cột Mốc Bản Đồ',
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 15,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            'Đang nạp ${_wheelPlaces.length} cột mốc theo bộ lọc. Chạm tiêu chí bên dưới để lọc lại bánh xe!',
                            style: const TextStyle(
                              color: Colors.white70,
                              fontSize: 12,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 14),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: [
                    _buildFilterChip('ALL', '🎲 Tất cả cột mốc'),
                    _buildFilterChip('HISTORICAL', '🏛️ Di tích & Lăng tẩm'),
                    _buildFilterChip('CAFE', '☕ Cà phê sống ảo'),
                    _buildFilterChip('CUISINE', '🍜 Món ngon đặc sản'),
                    _buildFilterChip('SCENIC_VIEW', '📸 Check-in view đẹp'),
                    _buildFilterChip('OUTSKIRTS_ECO', '🌲 Ngoại thành'),
                    _buildFilterChip('INDOOR', '🌧️ Trong nhà ngày mưa'),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              Stack(
                alignment: Alignment.center,
                children: [
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
                  Positioned(
                    top: 0,
                    child: Container(
                      width: 24,
                      height: 36,
                      decoration: const BoxDecoration(
                        color: Colors.redAccent,
                        shape: BoxShape.rectangle,
                        borderRadius:
                            BorderRadius.vertical(bottom: Radius.circular(12)),
                        boxShadow: [
                          BoxShadow(color: Colors.black38, blurRadius: 4),
                        ],
                      ),
                      child: const Icon(
                        Icons.arrow_downward,
                        color: Colors.white,
                        size: 18,
                      ),
                    ),
                  ),
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
                          BoxShadow(
                            color: Colors.black38,
                            blurRadius: 8,
                            offset: Offset(0, 3),
                          ),
                        ],
                        border: Border.all(color: Colors.white, width: 3),
                      ),
                      child: Center(
                        child: Text(
                          _isSpinning ? '...' : 'QUAY',
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                            color: HuegoTheme.royalViolet,
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 20),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: _isSpinning ? null : _startSpin,
                  icon: const Icon(
                    Icons.rotate_right,
                    color: Colors.white,
                    size: 26,
                  ),
                  label: Text(
                    _isSpinning
                        ? 'ĐANG QUAY CHỌN CỘT MỐC...'
                        : 'QUAY CHỌN ĐIỂM ĐI NGAY!',
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                      color: Colors.white,
                    ),
                  ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: HuegoTheme.royalViolet,
                    padding: const EdgeInsets.symmetric(vertical: 15),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20),
                    ),
                    elevation: 4,
                  ),
                ),
              ),
              const SizedBox(height: 18),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(color: Colors.black12),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          '📌 Các cột mốc trên vòng quay (${_wheelPlaces.length})',
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 14,
                            color: HuegoTheme.royalViolet,
                          ),
                        ),
                        TextButton.icon(
                          onPressed: _isSpinning
                              ? null
                              : () => _applyFilterAndLoadMilestones(
                                    _selectedCategory,
                                  ),
                          icon: const Icon(Icons.refresh, size: 16),
                          label: const Text(
                            'Đổi nhóm điểm',
                            style: TextStyle(fontSize: 12),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    ...List.generate(_wheelPlaces.length, (idx) {
                      final p = _wheelPlaces[idx];
                      final color = _sliceColors[idx % _sliceColors.length];
                      return Padding(
                        padding: const EdgeInsets.symmetric(vertical: 4),
                        child: Row(
                          children: [
                            Container(
                              width: 12,
                              height: 12,
                              decoration: BoxDecoration(
                                color: color,
                                shape: BoxShape.circle,
                              ),
                            ),
                            const SizedBox(width: 8),
                            Expanded(
                              child: Text(
                                '${idx + 1}. ${p['name']}',
                                style: const TextStyle(
                                  fontSize: 13,
                                  fontWeight: FontWeight.w600,
                                ),
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                            Text(
                              '+${p['greenRewardPoints'] ?? 25} GP',
                              style: TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.bold,
                                color: Colors.green.shade700,
                              ),
                            ),
                          ],
                        ),
                      );
                    }),
                  ],
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
            _applyFilterAndLoadMilestones(code);
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
    if (labels.isEmpty) return;
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

      canvas.drawArc(
        Rect.fromCircle(center: center, radius: radius),
        startAngle,
        sliceAngle,
        true,
        paint,
      );

      canvas.drawArc(
        Rect.fromCircle(center: center, radius: radius),
        startAngle,
        sliceAngle,
        true,
        strokePaint,
      );

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

      textPainter.paint(
        canvas,
        Offset(radius * 0.32, -textPainter.height / 2),
      );
      canvas.restore();
    }
  }

  @override
  bool shouldRepaint(covariant _WheelPainter oldDelegate) =>
      oldDelegate.labels != labels;
}
