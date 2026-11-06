import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import '../../../../core/theme/app_theme.dart';
import '../../../../core/constants/api_endpoints.dart';
import '../../../../core/network/api_client.dart';

class AiGuideScreen extends StatefulWidget {
  const AiGuideScreen({super.key});

  @override
  State<AiGuideScreen> createState() => _AiGuideScreenState();
}

class _AiGuideScreenState extends State<AiGuideScreen> {
  final TextEditingController _textController = TextEditingController();
  final List<Map<String, String>> _messages = [
    {
      'role': 'assistant',
      'text': 'Dạ Mệ chào bạn! Mệ Huế là trợ lý hướng dẫn viên bản địa của bạn. Bạn muốn tìm hiểu lịch sử, giá vé, giờ mở cửa các di tích triều Nguyễn, lên lịch trình 1–3 ngày, hay hỏi địa chỉ các quán ăn ngon chuẩn vị Huế hôm nay?',
    }
  ];
  bool _isLoading = false;
  final Dio _dio = ApiClient.instance.dio;

  String _generateLocalFallbackReply(String question) {
    final q = question.toLowerCase().trim();
    if (q.contains('đại nội') || q.contains('hoàng thành') || q.contains('ngọ môn') || q.contains('thái hòa')) {
      return 'Dạ, Đại Nội Huế (Hoàng Thành & Tử Cấm Thành) được vua Gia Long khởi công năm 1804 và hoàn thiện dưới thời vua Minh Mạng năm 1833. Giờ mở cửa: 07:00 – 17:30 hằng ngày | Giá vé: 200.000 VNĐ/người lớn (có vé combo 3 điểm 420.000đ rất tiết kiệm nhen!).';
    }
    if (q.contains('thiên mụ') || q.contains('linh mụ')) {
      return 'Dạ, Chùa Thiên Mụ trên đồi Hà Khê bên bờ Bắc sông Hương được chúa Nguyễn Hoàng lập năm 1601, nổi tiếng với tháp Phước Duyên 7 tầng (xây năm 1844). Chùa mở cửa từ 06:00 – 18:00 và miễn phí vé tham quan nhen!';
    }
    if (q.contains('tự đức') || q.contains('khiêm lăng')) {
      return 'Dạ, Lăng Tự Đức (Khiêm Lăng) xây dựng từ 1864 – 1867 tại phường Thủy Xuân, nổi tiếng với hồ sen Lưu Khiêm, Xung Khiêm Tạ và bia đá Khiêm Cung Ký. Giờ mở cửa: 07:00 – 17:30 | Giá vé: 150.000 VNĐ/người lớn.';
    }
    if (q.contains('khải định') || q.contains('ứng lăng')) {
      return 'Dạ, Lăng Khải Định (Ứng Lăng) trên núi Châu Chữ xây dựng từ 1920 – 1931, nổi bật với nghệ thuật khảm sành sứ tinh xảo tại Cung Thiên Định và bức họa Cửu Long Ẩn Vân. Giờ mở cửa: 07:00 – 17:30 | Giá vé: 150.000 VNĐ/người lớn.';
    }
    if (q.contains('minh mạng') || q.contains('hiếu lăng')) {
      return 'Dạ, Lăng Minh Mạng (Hiếu Lăng) tại núi Cẩm Kê (1840 – 1843) gồm 40 công trình đăng đối nghiêm ngặt trên trục Thần Đạo giữa hồ Tân Nguyệt và rừng thông. Giờ mở cửa: 07:00 – 17:30 | Giá vé: 150.000 VNĐ/người lớn.';
    }
    if (q.contains('tràng tiền') || q.contains('trường tiền')) {
      return 'Dạ, Cầu Tràng Tiền được thiết kế bởi hãng Gustave Eiffel với 6 vài 12 nhịp thép duyên dáng (khởi công 1897, khánh thành 1899). Buổi chiều tối tản bộ trên cầu ngắm hoàng hôn sông Hương và ăn chè hẻm là trải nghiệm tuyệt vời nhất xứ Huế!';
    }
    if (q.contains('bún bò')) {
      return 'Dạ, Bún bò Huế chuẩn vị có nước dùng ninh xương ống bò cùng sả và mắm ruốc Huế thơm lừng. Bạn ghé thử Bún bò Mụ Rơi (40 Nguyễn Chí Diểu), Bún bò Bà Tuyết (47 Nguyễn Công Trứ) hoặc Bún bò O Phụng (14 Nguyễn Du) nhen!';
    }
    if (q.contains('cơm hến') || q.contains('bún hến')) {
      return 'Dạ, Cơm hến – Bún hến chuẩn gốc Cồn Hến bạn ghé quán Hoa Đông (64 Kiệt 7 Ưng Bình, Cồn Hến), quán Bà Cam (49 Tùng Thiện Vương) hoặc Quán Nhỏ (11 Ngô Quyền) nhen!';
    }
    if (q.contains('bánh bèo') || q.contains('bánh lọc') || q.contains('bánh nậm') || q.contains('bánh ép') || q.contains('món ngon') || q.contains('ăn gì')) {
      return 'Dạ, ẩm thực Huế có những địa chỉ trứ danh bạn nhất định phải thử:\n• Bánh bèo, nậm, lọc: Quán Bà Đỏ (8 Nguyễn Bỉnh Khiêm)\n• Bánh khoái: Quán Hồng Mai (110 Đinh Tiên Hoàng)\n• Bánh ép dẻo: Cây Dừa (69 Nhật Lệ)\n• Chè bột lọc heo quay: Mợ Tôn Đích (Công viên Thương Bạc)\n• Cà phê muối: 142 Đặng Thái Thân.';
    }
    if (q.contains('mưa') || q.contains('thời tiết')) {
      return 'Dạ, ngày mưa Huế trầm mặc rất hợp để ghé các điểm trong nhà như Bảo tàng Cổ vật Cung đình Huế (Điện Long An - 3 Lê Trực), Cung An Định (179B Phan Đình Phùng) hoặc thưởng Trà Cung Đình Kim Long và Cà phê Muối nhen!';
    }
    if (q.contains('xe đạp') || q.contains('thuê xe') || q.contains('di chuyển')) {
      return 'Dạ, bạn có thể thuê xe đạp xanh công cộng Eco-Bike tại trạm Bến Tòa Khâm (Lê Lợi), Cầu Trường Tiền hoặc Cửa Hiển Nhơn (Đại Nội) với giá 20.000đ – 40.000đ/giờ để vừa dạo mát vừa tích lũy Green Points nhen!';
    }
    return 'Dạ Mệ nghe câu hỏi của bạn rồi nhen! Bạn muốn hỏi về lịch sử, giá vé, giờ mở cửa di tích cụ thể nào (Đại Nội, Lăng Tự Đức, Khải Định, Minh Mạng, Chùa Thiên Mụ), hay muốn tìm địa chỉ quán ăn ngon và lịch trình khám phá Huế thì nhắn rõ tên để Mệ chỉ tận nơi liền nghe!';
  }

  Future<void> _sendMessage(String text) async {
    if (text.trim().isEmpty) return;

    setState(() {
      _messages.add({'role': 'user', 'text': text});
      _isLoading = true;
    });
    _textController.clear();

    try {
      final response = await _dio.post(
        ApiEndpoints.aiChat,
        data: {
          'question': text,
          'language': 'vi',
        },
      );

      final reply = response.data['answer'] ?? _generateLocalFallbackReply(text);
      setState(() {
        _messages.add({'role': 'assistant', 'text': reply});
      });
    } catch (e) {
      setState(() {
        _messages.add({
          'role': 'assistant',
          'text': _generateLocalFallbackReply(text),
        });
      });
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mệ Huế – Hướng Dẫn Viên AI'),
      ),
      body: Column(
        children: [
          // Quick suggestion chips
          Container(
            height: 50,
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            color: Colors.white,
            child: ListView(
              scrollDirection: Axis.horizontal,
              children: [
                _buildQuickChip('Giá vé & giờ mở cửa Đại Nội'),
                _buildQuickChip('Quán bún bò & bánh Huế ngon'),
                _buildQuickChip('Lịch trình 1 ngày ở Huế'),
                _buildQuickChip('Trời mưa Huế đi đâu?'),
                _buildQuickChip('Thuê xe đạp xanh ở đâu?'),
              ],
            ),
          ),
          const Divider(height: 1),

          // Message list
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final msg = _messages[index];
                final isAssistant = msg['role'] == 'assistant';

                return Align(
                  alignment: isAssistant ? Alignment.centerLeft : Alignment.centerRight,
                  child: Container(
                    margin: const EdgeInsets.only(bottom: 12),
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                    constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.8),
                    decoration: BoxDecoration(
                      color: isAssistant ? Colors.white : HuegoTheme.royalViolet,
                      borderRadius: BorderRadius.only(
                        topLeft: const Radius.circular(16),
                        topRight: const Radius.circular(16),
                        bottomLeft: isAssistant ? Radius.zero : const Radius.circular(16),
                        bottomRight: isAssistant ? const Radius.circular(16) : Radius.zero,
                      ),
                      boxShadow: const [
                        BoxShadow(color: Colors.black12, blurRadius: 4, offset: Offset(0, 2)),
                      ],
                    ),
                    child: Text(
                      msg['text']!,
                      style: TextStyle(
                        color: isAssistant ? HuegoTheme.textDark : Colors.white,
                        fontSize: 15,
                        height: 1.4,
                      ),
                    ),
                  ),
                );
              },
            ),
          ),

          if (_isLoading)
            const Padding(
              padding: EdgeInsets.all(8.0),
              child: LinearProgressIndicator(color: HuegoTheme.royalViolet),
            ),

          // Chat Input bar
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            color: Colors.white,
            child: SafeArea(
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _textController,
                      decoration: InputDecoration(
                        hintText: 'Hỏi Mệ Huế về văn hóa, lịch sử...',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(24),
                          borderSide: BorderSide.none,
                        ),
                        filled: true,
                        fillColor: HuegoTheme.backgroundCloud,
                        contentPadding: const EdgeInsets.symmetric(horizontal: 18, vertical: 12),
                      ),
                      onSubmitted: _sendMessage,
                    ),
                  ),
                  const SizedBox(width: 8),
                  CircleAvatar(
                    backgroundColor: HuegoTheme.royalViolet,
                    child: IconButton(
                      icon: const Icon(Icons.send, color: Colors.white, size: 20),
                      onPressed: () => _sendMessage(_textController.text),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildQuickChip(String label) {
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: ActionChip(
        label: Text(label, style: const TextStyle(fontSize: 12, color: HuegoTheme.royalViolet)),
        backgroundColor: HuegoTheme.royalViolet.withOpacity(0.08),
        onPressed: () => _sendMessage(label),
      ),
    );
  }
}
