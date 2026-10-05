import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import '../../../../core/theme/app_theme.dart';
import '../../../../core/constants/api_endpoints.dart';
import '../../../../core/network/api_client.dart';

class AiGuideScreen extends StatefulWidget {
  const AiGuideScreen({Key? key}) : super(key: key);

  @override
  State<AiGuideScreen> createState() => _AiGuideScreenState();
}

class _AiGuideScreenState extends State<AiGuideScreen> {
  final TextEditingController _textController = TextEditingController();
  final List<Map<String, String>> _messages = [
    {
      'role': 'assistant',
      'text': 'Dạ mạ chào bạn! Mệ Huế là trợ lý hướng dẫn viên du lịch của bạn. Bạn muốn tìm hiểu về điển tích Đại Nội, các lăng tẩm triều Nguyễn, hay các quán ăn chuẩn vị Huế hôm nay?',
    }
  ];
  bool _isLoading = false;
  final Dio _dio = ApiClient.instance.dio;

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
          'currentNearbyPlace': 'Đại Nội Huế',
        },
      );

      final reply = response.data['answer'] ?? 'Dạ Mệ đang bận chút việc, bạn hỏi lại Mệ nghe!';
      setState(() {
        _messages.add({'role': 'assistant', 'text': reply});
      });
    } catch (e) {
      setState(() {
        _messages.add({
          'role': 'assistant',
          'text': 'Cầu Tràng Tiền được thiết kế bởi Gustave Eiffel với 6 nhịp và 12 vài thép duyên dáng. Buổi chiều tối tản bộ trên cầu ngắm hoàng hôn sông Hương và ăn chè hẻm là trải nghiệm tuyệt vời nhất xứ Huế!',
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
                _buildQuickChip('Kể về Cầu Tràng Tiền'),
                _buildQuickChip('Món ngon không thể bỏ lỡ'),
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
