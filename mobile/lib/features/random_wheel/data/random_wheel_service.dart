import 'dart:math';
import 'package:dio/dio.dart';
import '../../../../core/constants/api_endpoints.dart';
import '../../../../core/network/api_client.dart';

class RandomWheelService {
  final Dio _dio = ApiClient.instance.dio;

  // Kho cột mốc bản đồ Cố Đô Huế đồng bộ với Bản đồ chính (HuegoMapScreen)
  static final List<Map<String, dynamic>> mapMilestones = [
    {
      'id': 'dai-noi-hue',
      'name': 'Đại Nội Huế (Hoàng Thành)',
      'shortLabel': 'Đại Nội Huế',
      'categoryCode': 'HISTORICAL',
      'categoryName': 'Di tích & Lăng tẩm',
      'address': 'Đường 23/8, Thuận Hòa, TP Huế',
      'latitude': 16.4697,
      'longitude': 107.5779,
      'environmentType': 'OUTDOOR',
      'greenRewardPoints': 50,
      'thumbnailUrl': 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375',
      'description': 'Trung tâm quyền lực 143 năm của vương triều Nguyễn với Ngọ Môn và Điện Thái Hòa.',
    },
    {
      'id': 'chua-thien-mu',
      'name': 'Chùa Thiên Mụ (Linh Mụ Tự)',
      'shortLabel': 'Chùa Thiên Mụ',
      'categoryCode': 'HISTORICAL',
      'categoryName': 'Di tích & Lăng tẩm',
      'address': 'Đồi Hà Khê, Kim Long, TP Huế',
      'latitude': 16.4529,
      'longitude': 107.5451,
      'environmentType': 'OUTDOOR',
      'greenRewardPoints': 45,
      'thumbnailUrl': 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647',
      'description': 'Đệ nhất cổ tự hơn 400 năm tuổi với Tháp Phước Duyên 7 tầng soi bóng sông Hương.',
    },
    {
      'id': 'lang-khai-dinh',
      'name': 'Lăng Khải Định (Ứng Lăng)',
      'shortLabel': 'Lăng Khải Định',
      'categoryCode': 'HISTORICAL',
      'categoryName': 'Di tích & Lăng tẩm',
      'address': 'Núi Châu Chữ, Thủy Bằng, TP Huế',
      'latitude': 16.3991,
      'longitude': 107.5905,
      'environmentType': 'SEMI_OUTDOOR',
      'greenRewardPoints': 50,
      'thumbnailUrl': 'https://images.unsplash.com/photo-1548013146-72479768bada',
      'description': 'Kiệt tác kiến trúc giao thoa Đông - Tây khảm sành sứ và thủy tinh đỉnh cao.',
    },
    {
      'id': 'lang-tu-duc',
      'name': 'Lăng Tự Đức (Khiêm Lăng)',
      'shortLabel': 'Lăng Tự Đức',
      'categoryCode': 'HISTORICAL',
      'categoryName': 'Di tích & Lăng tẩm',
      'address': 'Thôn Thượng Ba, Thủy Xuân, TP Huế',
      'latitude': 16.4328,
      'longitude': 107.5658,
      'environmentType': 'SEMI_OUTDOOR',
      'greenRewardPoints': 50,
      'thumbnailUrl': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
      'description': 'Lăng tẩm thơ mộng bậc nhất triều Nguyễn với hồ Lưu Khiêm và Xung Khiêm Tạ.',
    },
    {
      'id': 'lang-minh-mang',
      'name': 'Lăng Minh Mạng (Hiếu Lăng)',
      'shortLabel': 'Lăng Minh Mạng',
      'categoryCode': 'HISTORICAL',
      'categoryName': 'Di tích & Lăng tẩm',
      'address': 'Núi Cẩm Kê, Hương Thọ, TP Huế',
      'latitude': 16.3888,
      'longitude': 107.5702,
      'environmentType': 'OUTDOOR',
      'greenRewardPoints': 50,
      'thumbnailUrl': 'https://images.unsplash.com/photo-1548013146-72479768bada',
      'description': 'Quần thể 40 công trình đăng đối uy nghiêm trên trục Thần Đạo giữa hồ Tân Nguyệt.',
    },
    {
      'id': 'bao-tang-co-vat',
      'name': 'Bảo Tàng Cổ Vật Cung Đình (Điện Long An)',
      'shortLabel': 'Điện Long An',
      'categoryCode': 'HISTORICAL',
      'categoryName': 'Di tích & Lăng tẩm',
      'address': 'Số 3 Lê Trực, Đông Ba, TP Huế',
      'latitude': 16.4715,
      'longitude': 107.5812,
      'environmentType': 'INDOOR',
      'greenRewardPoints': 35,
      'thumbnailUrl': 'https://images.unsplash.com/photo-1582560475093-ba66accbc424',
      'description': 'Không gian trong nhà lưu giữ hàng ngàn bảo vật vàng son của hoàng cung triều Nguyễn.',
    },
    {
      'id': 'cung-an-dinh',
      'name': 'Cung An Định (Lâu Đài Khải Tường)',
      'shortLabel': 'Cung An Định',
      'categoryCode': 'HISTORICAL',
      'categoryName': 'Di tích & Lăng tẩm',
      'address': '179B Phan Đình Phùng, TP Huế',
      'latitude': 16.4581,
      'longitude': 107.5919,
      'environmentType': 'INDOOR',
      'greenRewardPoints': 40,
      'thumbnailUrl': 'https://images.unsplash.com/photo-1582560475093-ba66accbc424',
      'description': 'Cung điện kiến trúc tân cổ điển châu Âu bên bờ sông An Cựu.',
    },
    {
      'id': 'lang-huong-thuy-xuan',
      'name': 'Làng Hương Trầm Thủy Xuân',
      'shortLabel': 'Làng Hương',
      'categoryCode': 'SCENIC_VIEW',
      'categoryName': 'Check-in View Đẹp',
      'address': 'Đường Huyền Trân Công Chúa, TP Huế',
      'latitude': 16.4358,
      'longitude': 107.5647,
      'environmentType': 'SEMI_OUTDOOR',
      'greenRewardPoints': 25,
      'thumbnailUrl': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
      'description': 'Làng nghề hơn 700 năm tuổi rực rỡ những bó hương xòe hoa ngũ sắc.',
    },
    {
      'id': 'cau-trang-tien',
      'name': 'Cầu Tràng Tiền (Lung Linh Sông Hương)',
      'shortLabel': 'Cầu Tràng Tiền',
      'categoryCode': 'SCENIC_VIEW',
      'categoryName': 'Check-in View Đẹp',
      'address': 'Cầu Tràng Tiền, Trung tâm TP Huế',
      'latitude': 16.4683,
      'longitude': 107.5947,
      'environmentType': 'OUTDOOR',
      'greenRewardPoints': 25,
      'thumbnailUrl': 'https://images.unsplash.com/photo-1528127269322-539801943592',
      'description': 'Biểu tượng 6 vài 12 nhịp vắt qua dòng sông Hương thơ mộng.',
    },
    {
      'id': 'cau-da-vien',
      'name': 'Cầu Dã Viên (Ngắm Hoàng Hôn)',
      'shortLabel': 'Cầu Dã Viên',
      'categoryCode': 'SCENIC_VIEW',
      'categoryName': 'Check-in View Đẹp',
      'address': 'Phường Vĩnh Ninh, TP Huế',
      'latitude': 16.4592,
      'longitude': 107.5721,
      'environmentType': 'OUTDOOR',
      'greenRewardPoints': 25,
      'thumbnailUrl': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      'description': 'Điểm ngắm hoàng hôn đỏ rực buông xuống cồn Dã Viên và sông Hương.',
    },
    {
      'id': 'cau-go-lim',
      'name': 'Phố Đi Bộ Cầu Gỗ Lim Sông Hương',
      'shortLabel': 'Cầu Gỗ Lim',
      'categoryCode': 'SCENIC_VIEW',
      'categoryName': 'Check-in View Đẹp',
      'address': 'Đường Lê Lợi, Bờ Nam Sông Hương',
      'latitude': 16.4662,
      'longitude': 107.5895,
      'environmentType': 'OUTDOOR',
      'greenRewardPoints': 25,
      'thumbnailUrl': 'https://images.unsplash.com/photo-1528127269322-539801943592',
      'description': 'Tuyến đi bộ lát gỗ lim Nam Phi sát mặt nước sông Hương.',
    },
    {
      'id': 'doi-vong-canh',
      'name': 'Đồi Vọng Cảnh (Khúc Uốn Sông Hương)',
      'shortLabel': 'Đồi Vọng Cảnh',
      'categoryCode': 'OUTSKIRTS_ECO',
      'categoryName': 'Ngoại Thành Sinh Thái',
      'address': 'Phường Thủy Biều, TP Huế',
      'latitude': 16.4258,
      'longitude': 107.5512,
      'environmentType': 'OUTDOOR',
      'greenRewardPoints': 30,
      'thumbnailUrl': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      'description': 'Đồi thông lộng gió ngắm trọn khúc uốn mềm mại của dòng sông Hương.',
    },
    {
      'id': 'doi-thien-an',
      'name': 'Đồi Thiên An & Hồ Thủy Tiên',
      'shortLabel': 'Đồi Thiên An',
      'categoryCode': 'OUTSKIRTS_ECO',
      'categoryName': 'Ngoại Thành Sinh Thái',
      'address': 'Xã Thủy Bằng, TP Huế',
      'latitude': 16.4087,
      'longitude': 107.5756,
      'environmentType': 'OUTDOOR',
      'greenRewardPoints': 30,
      'thumbnailUrl': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23',
      'description': 'Đồi thông lãng mạn và công viên Rồng Hồ Thủy Tiên kỳ bí.',
    },
    {
      'id': 'ru-cha',
      'name': 'Rừng Ngập Mặn Rú Chá (Tam Giang)',
      'shortLabel': 'Rừng Rú Chá',
      'categoryCode': 'OUTSKIRTS_ECO',
      'categoryName': 'Ngoại Thành Sinh Thái',
      'address': 'Xã Hương Phong, TP Huế',
      'latitude': 16.5512,
      'longitude': 107.6189,
      'environmentType': 'OUTDOOR',
      'greenRewardPoints': 35,
      'thumbnailUrl': 'https://images.unsplash.com/photo-1448375240586-882707db888b',
      'description': 'Rừng ngập mặn nguyên sinh duy nhất trên hệ đầm phá Tam Giang.',
    },
    {
      'id': 'dam-chuon',
      'name': 'Đầm Chuồn (Phá Tam Giang)',
      'shortLabel': 'Đầm Chuồn',
      'categoryCode': 'OUTSKIRTS_ECO',
      'categoryName': 'Ngoại Thành Sinh Thái',
      'address': 'Phú An, Phú Vang, Thừa Thiên Huế',
      'latitude': 16.5168,
      'longitude': 107.6321,
      'environmentType': 'SEMI_OUTDOOR',
      'greenRewardPoints': 35,
      'thumbnailUrl': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      'description': 'Trải nghiệm thuyền đầm phá và thưởng thức hải sản bánh khoái cá kình.',
    },
    {
      'id': 'ca-phe-muoi-nguyen-hue',
      'name': 'Cà Phê Muối Xứ Huế (Gốc Nguyễn Huệ)',
      'shortLabel': 'Cà Phê Muối',
      'categoryCode': 'CAFE',
      'categoryName': 'Quán Cà Phê',
      'address': 'Số 10 Nguyễn Lương Định / 142 Đặng Thái Thân, TP Huế',
      'latitude': 16.4589,
      'longitude': 107.5898,
      'environmentType': 'INDOOR',
      'greenRewardPoints': 20,
      'thumbnailUrl': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd',
      'description': 'Nơi khởi nguồn món cà phê muối kem mặn béo ngậy trứ danh Cố Đô.',
    },
    {
      'id': 'tan-cafe-vintage',
      'name': 'Tân Cafe (Phong Cách Vintage)',
      'shortLabel': 'Tân Cafe',
      'categoryCode': 'CAFE',
      'categoryName': 'Quán Cà Phê',
      'address': '14 Phạm Hồng Thái / Đặng Thái Thân, TP Huế',
      'latitude': 16.4635,
      'longitude': 107.5882,
      'environmentType': 'INDOOR',
      'greenRewardPoints': 20,
      'thumbnailUrl': 'https://images.unsplash.com/photo-1554118811-1e0d58224f24',
      'description': 'Không gian hoài cổ thập niên 80s chụp ảnh cực chất.',
    },
    {
      'id': 'sline-cafe-garden',
      'name': 'Sline Cafe & Sân Vườn Hoàng Gia',
      'shortLabel': 'Sline Cafe',
      'categoryCode': 'CAFE',
      'categoryName': 'Quán Cà Phê',
      'address': 'Đường Lê Huân, Thuận Hòa, TP Huế',
      'latitude': 16.4655,
      'longitude': 107.5742,
      'environmentType': 'SEMI_OUTDOOR',
      'greenRewardPoints': 20,
      'thumbnailUrl': 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8',
      'description': 'Quán cà phê sân vườn xanh mát bên hồ Ngự Hà.',
    },
    {
      'id': 'giao-cafe-hue',
      'name': 'Giao Cafe (Nhà Cổ Xứ Huế)',
      'shortLabel': 'Giao Cafe',
      'categoryCode': 'CAFE',
      'categoryName': 'Quán Cà Phê',
      'address': '118 Chi Lăng, Phú Cát, TP Huế',
      'latitude': 16.4754,
      'longitude': 107.5891,
      'environmentType': 'INDOOR',
      'greenRewardPoints': 20,
      'thumbnailUrl': 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb',
      'description': 'Không gian kiến trúc nhà cổ Huế trầm mặc, góc chụp áo dài tuyệt đẹp.',
    },
    {
      'id': 'tra-cung-dinh-kim-long',
      'name': 'Không Gian Trà Cung Đình Kim Long',
      'shortLabel': 'Trà Cung Đình',
      'categoryCode': 'CUISINE',
      'categoryName': 'Món Đặc Sản',
      'address': 'Đường Kim Long, TP Huế',
      'latitude': 16.4608,
      'longitude': 107.5601,
      'environmentType': 'INDOOR',
      'greenRewardPoints': 20,
      'thumbnailUrl': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3',
      'description': 'Thưởng trà thảo mộc tiến vua 26 vị trong nhà rường cổ kính.',
    },
    {
      'id': 'bun-bo-mu-roi',
      'name': 'Bún Bò Huế Mụ Rơi (Chuẩn Vị)',
      'shortLabel': 'Bún Bò Mụ Rơi',
      'categoryCode': 'CUISINE',
      'categoryName': 'Món Đặc Sản',
      'address': '40 Nguyễn Chí Diểu, Phú Cát, TP Huế',
      'latitude': 16.4745,
      'longitude': 107.5862,
      'environmentType': 'INDOOR',
      'greenRewardPoints': 20,
      'thumbnailUrl': 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43',
      'description': 'Tô bún bò giò heo chả cua nước hầm sả ruốc thơm lừng.',
    },
    {
      'id': 'com-hen-hoa-dong',
      'name': 'Cơm Hến Hoa Đông (Cồn Hến)',
      'shortLabel': 'Cơm Hến Hoa Đông',
      'categoryCode': 'CUISINE',
      'categoryName': 'Món Đặc Sản',
      'address': '64 Kiệt 7 Ưng Bình, Cồn Hến, TP Huế',
      'latitude': 16.4789,
      'longitude': 107.6012,
      'environmentType': 'SEMI_OUTDOOR',
      'greenRewardPoints': 20,
      'thumbnailUrl': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624',
      'description': 'Cơm hến cay nồng tóp mỡ giòn rụm chuẩn vị Cồn Hến.',
    },
    {
      'id': 'banh-beo-ba-do',
      'name': 'Bánh Bèo - Nậm - Lọc Bà Đỏ',
      'shortLabel': 'Bánh Bà Đỏ',
      'categoryCode': 'CUISINE',
      'categoryName': 'Món Đặc Sản',
      'address': 'Số 8 Nguyễn Bỉnh Khiêm, TP Huế',
      'latitude': 16.4615,
      'longitude': 107.5998,
      'environmentType': 'INDOOR',
      'greenRewardPoints': 20,
      'thumbnailUrl': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8',
      'description': 'Khay bánh bèo chén tôm chấy đỏ au, bánh nậm, bánh lọc gia truyền.',
    },
    {
      'id': 'che-hem-hung-vuong',
      'name': 'Chè Hẻm 20 Món Hùng Vương',
      'shortLabel': 'Chè Hẻm 20 Món',
      'categoryCode': 'CUISINE',
      'categoryName': 'Món Đặc Sản',
      'address': 'Kiệt 29 Hùng Vương, Phú Hội, TP Huế',
      'latitude': 16.4621,
      'longitude': 107.5932,
      'environmentType': 'INDOOR',
      'greenRewardPoints': 20,
      'thumbnailUrl': 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc',
      'description': '20 món chè cung đình và dân gian: chè bột lọc heo quay, chè hạt sen.',
    },
  ];

  List<Map<String, dynamic>> getFilteredMilestones(String categoryCode) {
    List<Map<String, dynamic>> filtered;
    if (categoryCode == 'ALL') {
      filtered = List<Map<String, dynamic>>.from(mapMilestones);
    } else if (categoryCode == 'INDOOR') {
      filtered = mapMilestones
          .where((p) => p['environmentType'] == 'INDOOR')
          .toList();
    } else if (categoryCode == 'SCENIC_VIEW') {
      filtered = mapMilestones
          .where((p) =>
              p['categoryCode'] == 'SCENIC_VIEW' ||
              p['categoryCode'] == 'OUTSKIRTS_ECO')
          .toList();
    } else {
      filtered = mapMilestones
          .where((p) => p['categoryCode'] == categoryCode)
          .toList();
    }

    if (filtered.length < 6) {
      for (final item in mapMilestones) {
        if (!filtered.any((e) => e['id'] == item['id'])) {
          filtered.add(item);
        }
        if (filtered.length >= 8) break;
      }
    }
    filtered.shuffle(Random());
    return filtered.take(8).toList();
  }

  Future<Map<String, dynamic>> fetchWheelFilters() async {
    try {
      final response = await _dio.get(ApiEndpoints.randomWheelFilters);
      if (response.statusCode == 200) {
        return response.data;
      }
    } catch (_) {}
    return {
      'categories': [
        {'code': 'ALL', 'name': 'Tất Cả Cột Mốc', 'icon': '🎲'},
        {'code': 'HISTORICAL', 'name': 'Di Tích & Lăng Tẩm', 'icon': '🏛️'},
        {'code': 'CAFE', 'name': 'Quán Cà Phê', 'icon': '☕'},
        {'code': 'CUISINE', 'name': 'Món Đặc Sản', 'icon': '🍜'},
        {'code': 'SCENIC_VIEW', 'name': 'Check-in View Đẹp', 'icon': '📸'},
        {'code': 'OUTSKIRTS_ECO', 'name': 'Sinh Thái Ngoại Thành', 'icon': '🌲'},
        {'code': 'INDOOR', 'name': 'Trong Nhà Ngày Mưa', 'icon': '🌧️'},
      ],
    };
  }

  Future<Map<String, dynamic>> spinWheel({
    String? categoryCode,
    String? filterTag,
    double? lat,
    double? lng,
    List<Map<String, dynamic>>? activeSlices,
  }) async {
    final slices = (activeSlices != null && activeSlices.isNotEmpty)
        ? activeSlices
        : getFilteredMilestones(categoryCode ?? 'ALL');

    try {
      final response = await _dio.get(
        ApiEndpoints.randomWheelSpin,
        queryParameters: {
          if (categoryCode != null && categoryCode != 'ALL')
            'categoryCode': categoryCode,
          if (filterTag != null) 'filterTag': filterTag,
          if (lat != null) 'userLat': lat,
          if (lng != null) 'userLng': lng,
          'placeIds': slices.map((s) => s['id']).join(','),
        },
      );
      if (response.statusCode == 200 && response.data is Map<String, dynamic>) {
        return response.data;
      }
    } catch (_) {}

    final random = Random();
    final winningIndex = random.nextInt(slices.length);
    final winningPlace = slices[winningIndex];
    final sliceAngle = 360.0 / slices.length;
    final stopAngle =
        (270.0 - (winningIndex * sliceAngle + sliceAngle / 2.0) + 360.0) %
            360.0;

    return {
      'wheelSlices': slices,
      'winningIndex': winningIndex,
      'targetRotationDegrees': 1800.0 + stopAngle,
      'winningPlace': winningPlace,
      'aiRecommendationReason': winningPlace['description'] ??
          'Cột mốc tuyệt vời trên bản đồ Cố Đô Huế đang chờ bạn khám phá!',
      'message': 'Vòng quay HUEGO đã quyết định thay bạn!',
    };
  }
}
