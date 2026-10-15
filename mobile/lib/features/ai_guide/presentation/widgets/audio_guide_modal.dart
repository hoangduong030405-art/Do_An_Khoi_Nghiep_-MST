import 'dart:async';
import 'package:flutter/material.dart';
import '../../../../core/constants/api_endpoints.dart';
import '../../../../core/network/api_client.dart';
import '../../../../core/theme/app_theme.dart';
import '../../../map/data/place_dto.dart';

class AudioGuideModal extends StatefulWidget {
  final PlaceDto place;

  const AudioGuideModal({super.key, required this.place});

  static Future<void> show(BuildContext context, PlaceDto place) {
    return showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => AudioGuideModal(place: place),
    );
  }

  @override
  State<AudioGuideModal> createState() => _AudioGuideModalState();
}

class _AudioGuideModalState extends State<AudioGuideModal> with SingleTickerProviderStateMixin {
  bool _isLoading = true;
  String? _errorMessage;
  Map<String, dynamic>? _narrationData;

  bool _isPlaying = false;
  double _progress = 0.0;
  double _playbackSpeed = 1.0;
  String _selectedLang = 'vi';
  Timer? _playbackTimer;

  late AnimationController _waveController;

  @override
  void initState() {
    super.initState();
    _waveController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    )..repeat(reverse: true);

    _fetchAudioNarrative();
  }

  @override
  void dispose() {
    _playbackTimer?.cancel();
    _waveController.dispose();
    super.dispose();
  }

  Future<void> _fetchAudioNarrative() async {
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      final response = await ApiClient.instance.dio.post(
        ApiEndpoints.placeStory,
        data: {
          'placeId': widget.place.id,
          'visitingContext': 'AFTERNOON',
          'tone': 'DEEP_CULTURE',
          'language': _selectedLang,
        },
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        final data = response.data;
        setState(() {
          _narrationData = data['narration'] ?? data;
          _isLoading = false;
        });
      } else {
        setState(() {
          _errorMessage = 'Không thể lấy dữ liệu thuyết minh từ máy chủ.';
          _isLoading = false;
        });
      }
    } catch (e) {
      // Fallback cục bộ an toàn nếu mạng ngắt quãng
      setState(() {
        _narrationData = {
          'placeName': widget.place.name,
          'audioNarrationScript':
              'Dạ thưa quý khách, bước chân đến ${widget.place.name}, xin người hãy chầm chậm lắng lại một chút để cảm nhận hơi thở trầm mặc của nghìn năm Cố Đô. Nơi đây từng ghi dấu biết bao thăng trầm của triều đại nhà Nguyễn, nơi mỗi phiến đá, mái ngói rêu phong đều ẩn chứa một câu chuyện vàng son.',
          'secretHistoricalFact':
              'Tương truyền, các bậc thầy phong thủy triều Nguyễn đã tính toán thế núi Ngự Bình và sông Hương làm tiền án, minh đường để tụ khí vượng cho muôn đời con cháu.',
          'photoSpotAdvice':
              'Hãy đứng ở góc chếch 45 độ đón ánh sáng vàng ấm của buổi chiều hoàng hôn.',
          'localSpecialtyPairing':
              'Sau khi tham quan, mời bạn ghé thưởng thức tô bún bò Huế thơm lừng mùi sả ruốc hoặc tách trà sen thanh tao.',
          'ecoGreenTip':
              'Hãy giữ trọn nét thanh tịnh nơi di sản: di chuyển bằng xe đạp xanh quanh hào thành và tuyệt đối không xả rác bạn nhé!',
        };
        _isLoading = false;
      });
    }
  }

  void _togglePlayPause() {
    if (_isPlaying) {
      _playbackTimer?.cancel();
      setState(() => _isPlaying = false);
    } else {
      setState(() => _isPlaying = true);
      _playbackTimer?.cancel();
      _playbackTimer = Timer.periodic(Duration(milliseconds: (200 / _playbackSpeed).round()), (timer) {
        if (!mounted) return;
        setState(() {
          _progress += 0.005;
          if (_progress >= 1.0) {
            _progress = 1.0;
            _isPlaying = false;
            timer.cancel();
          }
        });
      });
    }
  }

  void _replay() {
    setState(() {
      _progress = 0.0;
      _isPlaying = true;
    });
    _playbackTimer?.cancel();
    _playbackTimer = Timer.periodic(Duration(milliseconds: (200 / _playbackSpeed).round()), (timer) {
      if (!mounted) return;
      setState(() {
        _progress += 0.005;
        if (_progress >= 1.0) {
          _progress = 1.0;
          _isPlaying = false;
          timer.cancel();
        }
      });
    });
  }

  void _cycleSpeed() {
    setState(() {
      if (_playbackSpeed == 1.0) {
        _playbackSpeed = 1.25;
      } else if (_playbackSpeed == 1.25) {
        _playbackSpeed = 0.8;
      } else {
        _playbackSpeed = 1.0;
      }
    });
    if (_isPlaying) {
      _togglePlayPause();
      _togglePlayPause();
    }
  }

  @override
  Widget build(BuildContext context) {
    final mediaQuery = MediaQuery.of(context);
    final script = _narrationData?['audioNarrationScript'] ?? '';
    final secretFact = _narrationData?['secretHistoricalFact'] ?? '';
    final photoTip = _narrationData?['photoSpotAdvice'] ?? '';
    final foodTip = _narrationData?['localSpecialtyPairing'] ?? '';
    final ecoTip = _narrationData?['ecoGreenTip'] ?? '';

    return Container(
      constraints: BoxConstraints(maxHeight: mediaQuery.size.height * 0.88),
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
      child: Column(
        children: [
          // Handle Bar
          Container(
            margin: const EdgeInsets.only(top: 12, bottom: 8),
            width: 48,
            height: 5,
            decoration: BoxDecoration(
              color: Colors.grey.shade300,
              borderRadius: BorderRadius.circular(10),
            ),
          ),

          // Header
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: HuegoTheme.royalViolet.withOpacity(0.1),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(Icons.headphones_rounded, color: HuegoTheme.royalViolet, size: 24),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        widget.place.name,
                        style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: HuegoTheme.royalViolet),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                      const Text(
                        '🎙️ Thuyết Minh Di Sản • Giọng Mệ Huế AI',
                        style: TextStyle(fontSize: 12, color: HuegoTheme.textMuted),
                      ),
                    ],
                  ),
                ),
                // Language Toggle Pill
                GestureDetector(
                  onTap: () {
                    setState(() {
                      _selectedLang = _selectedLang == 'vi' ? 'en' : 'vi';
                    });
                    _fetchAudioNarrative();
                  },
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                    decoration: BoxDecoration(
                      color: HuegoTheme.imperialGold.withOpacity(0.18),
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: HuegoTheme.imperialGold.withOpacity(0.5)),
                    ),
                    child: Text(
                      _selectedLang == 'vi' ? '🇻🇳 Tiếng Việt' : '🇬🇧 English',
                      style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: HuegoTheme.royalViolet),
                    ),
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.close),
                  onPressed: () => Navigator.of(context).pop(),
                ),
              ],
            ),
          ),

          const Divider(height: 1),

          // Body Content
          Expanded(
            child: _isLoading
                ? const Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        CircularProgressIndicator(color: HuegoTheme.royalViolet),
                        SizedBox(height: 16),
                        Text('Đang tải thuyết minh văn hóa từ Mệ Huế...', style: TextStyle(color: HuegoTheme.textMuted, fontSize: 13)),
                      ],
                    ),
                  )
                : _errorMessage != null
                    ? Center(
                        child: Padding(
                          padding: const EdgeInsets.all(24.0),
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              const Icon(Icons.error_outline, size: 48, color: Colors.amber),
                              const SizedBox(height: 12),
                              Text(_errorMessage!, textAlign: TextAlign.center, style: const TextStyle(fontSize: 14)),
                              const SizedBox(height: 16),
                              ElevatedButton(
                                onPressed: _fetchAudioNarrative,
                                style: ElevatedButton.styleFrom(backgroundColor: HuegoTheme.royalViolet),
                                child: const Text('Thử lại', style: TextStyle(color: Colors.white)),
                              ),
                            ],
                          ),
                        ),
                      )
                    : SingleChildScrollView(
                    padding: const EdgeInsets.all(20),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Audio Player Card
                        Container(
                          padding: const EdgeInsets.all(18),
                          decoration: BoxDecoration(
                            gradient: const LinearGradient(
                              colors: [Color(0xFF3B185F), Color(0xFF2A0845)],
                              begin: Alignment.topLeft,
                              end: Alignment.bottomRight,
                            ),
                            borderRadius: BorderRadius.circular(22),
                            boxShadow: [
                              BoxShadow(color: HuegoTheme.royalViolet.withOpacity(0.3), blurRadius: 15, offset: const Offset(0, 6)),
                            ],
                          ),
                          child: Column(
                            children: [
                              // Top indicator & Waveform
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Row(
                                    children: [
                                      Container(
                                        width: 8,
                                        height: 8,
                                        decoration: BoxDecoration(
                                          color: _isPlaying ? Colors.greenAccent : Colors.grey,
                                          shape: BoxShape.circle,
                                        ),
                                      ),
                                      const SizedBox(width: 6),
                                      Text(
                                        _isPlaying ? 'ĐANG PHÁT AUDIO' : 'TẠM DỪNG',
                                        style: const TextStyle(color: Colors.white70, fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 0.5),
                                      ),
                                    ],
                                  ),
                                  // Waveform bars simulation
                                  AnimatedBuilder(
                                    animation: _waveController,
                                    builder: (context, child) {
                                      return Row(
                                        children: List.generate(7, (index) {
                                          final height = _isPlaying
                                              ? 8.0 + ((index * 3 + _waveController.value * 12) % 18)
                                              : 6.0;
                                          return Container(
                                            margin: const EdgeInsets.symmetric(horizontal: 1.5),
                                            width: 3,
                                            height: height,
                                            decoration: BoxDecoration(
                                              color: HuegoTheme.imperialGold,
                                              borderRadius: BorderRadius.circular(2),
                                            ),
                                          );
                                        }),
                                      );
                                    },
                                  ),
                                ],
                              ),

                              const SizedBox(height: 16),

                              // Progress Slider
                              SliderTheme(
                                data: SliderTheme.of(context).copyWith(
                                  activeTrackColor: HuegoTheme.imperialGold,
                                  inactiveTrackColor: Colors.white24,
                                  thumbColor: HuegoTheme.imperialGold,
                                  trackHeight: 4,
                                  thumbShape: const RoundSliderThumbShape(enabledThumbRadius: 6),
                                ),
                                child: Slider(
                                  value: _progress,
                                  onChanged: (val) {
                                    setState(() => _progress = val);
                                  },
                                ),
                              ),

                              // Timestamp display
                              Padding(
                                padding: const EdgeInsets.symmetric(horizontal: 12),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Text(
                                      _formatTime((_progress * 120).round()),
                                      style: const TextStyle(color: Colors.white70, fontSize: 11),
                                    ),
                                    const Text('02:00', style: TextStyle(color: Colors.white70, fontSize: 11)),
                                  ],
                                ),
                              ),

                              const SizedBox(height: 12),

                              // Playback Controls
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                                children: [
                                  IconButton(
                                    icon: const Icon(Icons.replay_rounded, color: Colors.white),
                                    onPressed: _replay,
                                    tooltip: 'Nghe lại từ đầu',
                                  ),
                                  GestureDetector(
                                    onTap: _togglePlayPause,
                                    child: Container(
                                      width: 60,
                                      height: 60,
                                      decoration: BoxDecoration(
                                        color: HuegoTheme.imperialGold,
                                        shape: BoxShape.circle,
                                        boxShadow: [
                                          BoxShadow(color: HuegoTheme.imperialGold.withOpacity(0.4), blurRadius: 12, spreadRadius: 2),
                                        ],
                                      ),
                                      child: Icon(
                                        _isPlaying ? Icons.pause_rounded : Icons.play_arrow_rounded,
                                        color: HuegoTheme.royalViolet,
                                        size: 38,
                                      ),
                                    ),
                                  ),
                                  TextButton(
                                    onPressed: _cycleSpeed,
                                    style: TextButton.styleFrom(
                                      backgroundColor: Colors.white12,
                                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                    ),
                                    child: Text(
                                      '${_playbackSpeed}x',
                                      style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13),
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),

                        const SizedBox(height: 20),

                        // Section 1: Thuyết minh chi tiết (Script)
                        _buildSectionCard(
                          icon: Icons.menu_book_rounded,
                          iconColor: HuegoTheme.royalViolet,
                          title: 'Kịch Bản Thuyết Minh Di Sản',
                          content: script,
                          highlight: true,
                        ),

                        const SizedBox(height: 14),

                        // Section 2: Bí mật lịch sử
                        if (secretFact.isNotEmpty)
                          _buildSectionCard(
                            icon: Icons.history_edu_rounded,
                            iconColor: const Color(0xFFB45309),
                            title: 'Bí Mật & Giai Thoại Cố Đô',
                            content: secretFact,
                          ),

                        const SizedBox(height: 14),

                        // Section 3: Góc chụp ảnh đẹp
                        if (photoTip.isNotEmpty)
                          _buildSectionCard(
                            icon: Icons.camera_alt_rounded,
                            iconColor: HuegoTheme.perfumeRiverTeal,
                            title: 'Góc Chụp Ảnh Sống Ảo Đẹp Nhất',
                            content: photoTip,
                          ),

                        const SizedBox(height: 14),

                        // Section 4: Ẩm thực kết hợp
                        if (foodTip.isNotEmpty)
                          _buildSectionCard(
                            icon: Icons.restaurant_menu_rounded,
                            iconColor: const Color(0xFFDC2626),
                            title: 'Gợi Ý Món Ngon Xứ Huế',
                            content: foodTip,
                          ),

                        const SizedBox(height: 14),

                        // Section 5: Du lịch xanh
                        if (ecoTip.isNotEmpty)
                          _buildSectionCard(
                            icon: Icons.eco_rounded,
                            iconColor: HuegoTheme.emeraldGreen,
                            title: 'Mẹo Du Lịch Xanh Bảo Vệ Di Sản',
                            content: ecoTip,
                          ),
                      ],
                    ),
                  ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionCard({
    required IconData icon,
    required Color iconColor,
    required String title,
    required String content,
    bool highlight = false,
  }) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: highlight ? HuegoTheme.imperialGold.withOpacity(0.08) : Colors.grey.shade50,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: highlight ? HuegoTheme.imperialGold.withOpacity(0.4) : Colors.grey.shade200,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, color: iconColor, size: 20),
              const SizedBox(width: 8),
              Text(
                title,
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: iconColor),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Text(
            content,
            style: const TextStyle(fontSize: 13, height: 1.55, color: Color(0xFF334155)),
          ),
        ],
      ),
    );
  }

  String _formatTime(int totalSeconds) {
    final mins = (totalSeconds ~/ 60).toString().padLeft(2, '0');
    final secs = (totalSeconds % 60).toString().padLeft(2, '0');
    return '$mins:$secs';
  }
}
