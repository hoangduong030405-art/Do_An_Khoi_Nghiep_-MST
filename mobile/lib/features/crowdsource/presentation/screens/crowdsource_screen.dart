import 'package:flutter/material.dart';
import '../../../../core/theme/app_theme.dart';

class CrowdsourceScreen extends StatefulWidget {
  const CrowdsourceScreen({Key? key}) : super(key: key);

  @override
  State<CrowdsourceScreen> createState() => _CrowdsourceScreenState();
}

class _CrowdsourceScreenState extends State<CrowdsourceScreen> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _nameCtrl = TextEditingController();
  final TextEditingController _addressCtrl = TextEditingController();
  final TextEditingController _reasonCtrl = TextEditingController();
  String _envType = 'INDOOR';

  void _submit() {
    if (_formKey.currentState!.validate()) {
      showDialog(
        context: context,
        builder: (ctx) => AlertDialog(
          title: const Text('Gửi Thành Công!'),
          content: const Text('Cảm ơn bạn đã đóng góp địa điểm cho bản đồ HUEGO. Bạn sẽ nhận +50 Green Points ngay khi ban quản trị phê duyệt!'),
          actions: [
            ElevatedButton(
              onPressed: () {
                Navigator.of(ctx).pop();
                _nameCtrl.clear();
                _addressCtrl.clear();
                _reasonCtrl.clear();
              },
              child: const Text('Xác nhận'),
            ),
          ],
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Đóng Góp Địa Điểm Mới'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Bạn biết một quán bánh bèo gia truyền, một góc vườn Huế bí mật hay làng nghề cần được lan tỏa?',
                style: TextStyle(fontSize: 14, color: HuegoTheme.textMuted),
              ),
              const SizedBox(height: 20),
              TextFormField(
                controller: _nameCtrl,
                decoration: InputDecoration(
                  labelText: 'Tên địa điểm / Quán ăn',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                  prefixIcon: const Icon(Icons.place, color: HuegoTheme.royalViolet),
                ),
                validator: (v) => v!.isEmpty ? 'Vui lòng nhập tên địa điểm' : null,
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _addressCtrl,
                decoration: InputDecoration(
                  labelText: 'Địa chỉ tại Huế',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                  prefixIcon: const Icon(Icons.location_on_outlined, color: HuegoTheme.royalViolet),
                ),
                validator: (v) => v!.isEmpty ? 'Vui lòng nhập địa chỉ' : null,
              ),
              const SizedBox(height: 16),
              DropdownButtonFormField<String>(
                value: _envType,
                decoration: InputDecoration(
                  labelText: 'Loại không gian',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                  prefixIcon: const Icon(Icons.wb_sunny_outlined, color: HuegoTheme.royalViolet),
                ),
                items: const [
                  DropdownMenuItem(value: 'INDOOR', child: Text('Trong nhà (Thích hợp trú mưa)')),
                  DropdownMenuItem(value: 'OUTDOOR', child: Text('Ngoài trời (Cảnh quan, di tích)')),
                  DropdownMenuItem(value: 'SEMI_OUTDOOR', child: Text('Nhà rường bán lộ thiên / Có mái che')),
                ],
                onChanged: (val) => setState(() => _envType = val!),
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _reasonCtrl,
                maxLines: 4,
                decoration: InputDecoration(
                  labelText: 'Câu chuyện hoặc lý do bạn đề xuất',
                  hintText: 'Ví dụ: Quán chè mạ Mộng hơn 30 năm, bột lọc tự nhào dẻo thơm...',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                ),
                validator: (v) => v!.isEmpty ? 'Vui lòng chia sẻ cảm nhận của bạn' : null,
              ),
              const SizedBox(height: 24),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: _submit,
                  icon: const Icon(Icons.send_rounded),
                  label: const Text('Gửi Đề Xuất Đến Ban Biên Tập', style: TextStyle(fontWeight: FontWeight.bold)),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: HuegoTheme.royalViolet,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
