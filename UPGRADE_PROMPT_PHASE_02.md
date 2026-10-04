# HUEGO — PHASE 2 PROMPT: NỐI FLUTTER VÀO BACKEND

> **Copy từ `===== BẮT ĐẦU PROMPT =====` đến `===== HẾT PROMPT =====` để dán vào AI coding agent.**

===== BẮT ĐẦU PROMPT =====

## 0. VAI TRÒ

Bạn là **kỹ sư phần mềm cấp cao** thực hiện **PHASE 2** của kế hoạch nâng cấp dự án `HUEGO`
(tại `C:\Lap_Trinh_Ung_dung`) — nền tảng du lịch xanh Huế.

Phase 1 đã hoàn thành và được xác nhận: Git đã init, commit `c8948e0`, tag `baseline-v1`,
`.gitignore` đúng, `backend/.env` **chưa từng** được commit. **Baseline đã đo:**

| Chỉ số | Baseline (bắt buộc không được phá) |
|---|---|
| `tsc --noEmit` (backend) | **exit 0** |
| `flutter analyze` (mobile) | **20 issues — 0 errors, 0 warnings, 20 infos** |
| Số file Dart trong `mobile/lib` | 11 file |

**PHASE 2 KHÔNG ĐƯỢC PHÁ VỠ 2 CON SỐ TRÊN.**

---

## 1. GROUND TRUTH ĐÃ KIỂM CHỨNG — ĐỌC KỸ, ĐỪNG ĐOÁN

### 1.1 Lệnh trên máy này (PowerShell 5.1 — BẮT BUỘC dùng đường dẫn đầy đủ)

`git` **KHÔNG có trong PATH**. Dùng:
```
C:\Users\PREDATOR\AppData\Local\Programs\Git\cmd\git.exe
```

```powershell
# Backend
cd C:\Lap_Trinh_Ung_dung\backend
& "C:\Program Files\nodejs\npx.cmd" tsc --noEmit -p tsconfig.json
& "C:\Program Files\nodejs\npm.cmd" run start:dev

# Mobile
cd C:\Lap_Trinh_Ung_dung\mobile
& "C:\Users\PREDATOR\flutter\bin\flutter.bat" analyze
& "C:\Users\PREDATOR\flutter\bin\flutter.bat" run -d chrome
```

> `flutter analyze` trả **exit code 1** kể cả khi chỉ có `info`. Đây là **bình thường**, không phải lỗi.

### 1.2 Sự thật về tình trạng gọi API hiện tại (đã kiểm chứng từng dòng)

> 4/11 file Dart **đã** gọi API thật. Đừng viết lại chúng từ đầu.

**ĐÃ gọi API (4 file — giữ nguyên logic, chỉ đổi cách tạo `Dio`):**

| File | Dòng | Gọi endpoint |
|---|---|---|
| `core/services/geofence_location_service.dart` | 69 | `POST /geofencing/unlock` |
| `features/ai_guide/.../ai_guide_screen.dart` | 34 | `POST /ai-guide/chat` |
| `features/itinerary/.../itinerary_planner_screen.dart` | 78 | `POST /geofencing/check-in-itinerary` |
| `features/random_wheel/data/random_wheel_service.dart` | 9, 39 | `GET /random-wheel/filters`, `GET /random-wheel/spin` |

→ Cả 4 đều dùng `final Dio _dio = Dio();` — **không timeout, không retry.**

**CHƯA gọi API — giả lập, đây chính là việc của Phase 2:**

| File | Dữ liệu giả cụ thể |
|---|---|
| `features/map/.../huego_map_screen.dart` | `_places` là **16 mục hardcode** (dòng 22–135). Không gọi `/places`. Banner thời tiết hardcode ở dòng **441–442**. Nút "Đổi hướng" dòng **446–453** chỉ hiện SnackBar giả |
| `features/gamification/.../green_points_screen.dart` | **100% tĩnh**: `'175 GP'` (dòng 42), `'Cấp Độ 2 • Du Khách Xanh'` (51), `LinearProgressIndicator value: 0.65` (57), `'Tiến độ mở khóa Huế: 65%'` (66), `'Còn 75 GP để nhận E-Cert'` (67), 3 huy hiệu hardcode (81–85), nút E-Cert chỉ SnackBar (112–114). Là `StatelessWidget` → **phải đổi thành `StatefulWidget`** |

### 1.3 Ba lỗi tương thích PHẢI xử lý (nguồn gốc: mock ↔ API lệch nhau)

**Lỗi 1 — Mã danh mục KHÔNG KHỚP.** `huego_map_screen.dart:354-382` có `switch (cat)` dùng mã NGẮN,
nhưng backend trả mã DÀI. Nếu đổi sang dữ liệu API mà không map, **4 danh mục sẽ rơi vào `default`** và hiện sai icon:

| Mobile đang dùng (`category`) | Backend trả về (`categoryCode`) |
|---|---|
| `SCENIC` | `SCENIC_VIEW` |
| `OUTSKIRTS` | `OUTSKIRTS_ECO` |
| `RENTAL` | `VEHICLE_RENTAL` |
| `GAS` | `GAS_STATION` |
| `HISTORICAL` / `CAFE` / `CUISINE` | khớp ✅ |

**Lỗi 2 — Bán kính geofence.** `huego_map_screen.dart:339` hardcode `radius: 35`,
nhưng API có `geofenceRadiusMeters` **khác nhau từng nơi: 20, 25, 30, 35, 40, 45, 50 mét**.

**Lỗi 3 — URL ảnh Unsplash không có đuôi file.** Giá trị trong DB là
`https://images.unsplash.com/photo-1599707367072-cd6ada2bc375` (không `.jpg`).
`cached_network_image` **sẽ lỗi**. Bắt buộc có `errorBuilder`.

### 1.4 Shape của response backend (đã đọc từ source, dùng đúng field này)

`GET /api/v1/places` → mảng, mỗi phần tử:
`id, name, slug, categoryCode, categoryName, descriptionVi, descriptionEn, address,
latitude, longitude, geofenceRadiusMeters, environmentType, ticketPriceVnd,
greenRewardPoints, thumbnailUrl`

`GET /api/v1/weather/hue-current`:
`{ condition, description, tempCelsius, isRaining, isExtremelyHot, humidity, recommendation }`

`GET /api/v1/gamification/profile/:userId`:
```
{ user: { id, fullName, greenPoints, currentLevel },
  stats: { totalUnlockedPlaces, totalSystemPlaces, progressPercent },
  badges: [ { title, badgeCode, description, requiredPoints, isUnlocked } ],
  canGenerateCertificate: bool }
```
- **KHÔNG có** field `pointsToNextCertificate` → phải bổ sung (xem Bước 2.6).
- Backend seed `userPoints` = **125** (không phải 175 như màn hình đang hiện). Phải lấy từ API.

`userId` demo hợp lệ: `e7b0e774-7243-41bb-9be4-8a4b868e82ef`

Lưu ý: `ApiEndpoints.gamificationProfile = '$baseUrl/gamification/profile'` — **thiếu `/:userId`**.
Client phải tự nối thêm `/$userId`. Tương tự `certificate` cần `/$userId`.

### 1.5 Ràng buộc kỹ thuật phải tuân thủ

- Backend bật `ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })` (`main.ts:20-26`)
  → **client gửi thừa field = HTTP 400.**
- Giữ nguyên tiếng Việt có dấu và phong cách comment (`///` trong Dart).
- Bảng màu: `HuegoTheme.royalViolet`, `.imperialGold`, `.emeraldGreen`, `.perfumeRiverTeal`, `.textMuted`, `.textDark`.
- `flutter_map 6.x` + `latlong2` **đã có** — không thêm thư viện map mới.

---

## 2. CÁC BƯỚC THỰC HIỆN

### Bước 2.1 — Tạo cấu hình base URL đúng từng nền tảng

Hiện `api_endpoints.dart:3` hardcode `http://10.0.2.2:3000/api/v1` — **chỉ đúng Android Emulator**,
sai hoàn toàn trên web / iOS / thiết bị thật.

Tạo `mobile/lib/core/constants/app_config.dart`:
```dart
import 'package:flutter/foundation.dart';

/// Cấu hình môi trường chạy ứng dụng.
class AppConfig {
  /// Truyền override khi build: --dart-define=API_BASE_URL=http://192.168.x.x:3000/api/v1
  /// Bắt buộc khi chạy trên thiết bị thật (Android/iOS) vì 10.0.2.2 chỉ dành cho Emulator.
  static const String _fromDefine = String.fromEnvironment('API_BASE_URL');

  static String get apiBaseUrl {
    if (_fromDefine.isNotEmpty) return _fromDefine;
    // Flutter Web: cùng origin với trang backend đang phục vụ.
    if (kIsWeb) return 'http://localhost:3000/api/v1';
    if (defaultTargetPlatform == TargetPlatform.android) {
      return 'http://10.0.2.2:3000/api/v1';
    }
    return 'http://localhost:3000/api/v1';
  }
}
```

**Sửa `api_endpoints.dart` — BẮT BUỘC dùng `final`, KHÔNG được dùng `const`.**

Lý do: `AppConfig.apiBaseUrl` là **getter runtime** (dùng `kIsWeb` / `defaultTargetPlatform` /
`String.fromEnvironment`) nên không phải hằng số. Nếu gán vào `static const` sẽ **không compile**:

```
error - Const variables must be initialized with a constant value
  lib\core\constants\api_endpoints.dart:5:33 - const_initialized_with_non_constant_value
```

Vì `baseUrl` không còn là hằng số, **mọi** endpoint đang khai báo `'$baseUrl/...'`
(cũng là biểu thức hằng) cũng phải chuyển theo. Cụ thể:

1. Dòng 5: `static const String baseUrl` → `static const` thành **`static final`**
2. **Tất cả 17 dòng còn lại** trong file (`unlockGeofence`, `checkInItinerary`, `unlockedHistory`,
   `places`, `nearbyPlaces`, `randomWheelSpin`, `randomWheelFilters`, `currentWeather`, `aiChat`,
   `placeStory`, `adaptItinerary`, `gamificationProfile`, `certificate`, `crowdsourceSubmit`,
   `affiliatePartners`) đổi từ `static const String` → **`static final String`**.

Tức là **thay tất cả** `static const String` → `static final String` trong file này (18 chỗ).
Cách dùng ở nơi khác **không cần đổi** — `ApiEndpoints.places` vẫn là một `String` đọc bình thường,
chỉ không còn là hằng số nữa.

### Bước 2.2 — Tạo HTTP client dùng chung

Tạo `mobile/lib/core/network/api_client.dart`:
```dart
import 'package:dio/dio.dart';
import '../constants/app_config.dart';

/// Dio client dùng chung cho toàn ứng dụng: timeout, baseUrl và token tập trung một chỗ.
class ApiClient {
  ApiClient._() {
    _dio = Dio(BaseOptions(
      baseUrl: AppConfig.apiBaseUrl,
      connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 20),
      sendTimeout: const Duration(seconds: 10),
      headers: {'Content-Type': 'application/json'},
    ));
    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) {
        if (_token != null) options.headers['Authorization'] = 'Bearer $_token';
        handler.next(options);
      },
    ));
  }

  static final ApiClient instance = ApiClient._();

  late final Dio _dio;
  String? _token;

  Dio get dio => _dio;

  /// Phase 3 sẽ gán token thật; hiện để trống để các endpoint công khai vẫn chạy.
  set token(String? value) => _token = value;
}
```

### Bước 2.3 — Chuyển 4 file đang gọi API sang dùng `ApiClient`

Với **từng file** trong danh sách Bước 1.2: **xoá** `final Dio _dio = Dio();`,
**thay** bằng `final Dio _dio = ApiClient.instance.dio;` và thêm import.
Đây là thay đổi cơ học, **không được đổi logic xử lý response.**

### Bước 2.4 — Tạo model `PlaceDto`

Tạo `mobile/lib/features/map/data/place_dto.dart` (đặt cạnh feature, đúng cấu trúc `features/<tên>/data/` đang có):
```dart
/// Model ánh xạ JSON từ GET /api/v1/places của backend HUEGO.
class PlaceDto {
  final String id;
  final String name;
  final String categoryCode;
  final String categoryName;
  final String descriptionVi;
  final String descriptionEn;
  final String address;
  final double latitude;
  final double longitude;
  final int geofenceRadiusMeters;
  final String environmentType;
  final int ticketPriceVnd;
  final int greenRewardPoints;
  final String thumbnailUrl;

  const PlaceDto({
    required this.id,
    required this.name,
    required this.categoryCode,
    required this.categoryName,
    required this.descriptionVi,
    required this.descriptionEn,
    required this.address,
    required this.latitude,
    required this.longitude,
    required this.geofenceRadiusMeters,
    required this.environmentType,
    required this.ticketPriceVnd,
    required this.greenRewardPoints,
    required this.thumbnailUrl,
  });

  factory PlaceDto.fromJson(Map<String, dynamic> json) {
    return PlaceDto(
      id: json['id'] as String? ?? '',
      name: json['name'] as String? ?? '',
      categoryCode: json['categoryCode'] as String? ?? 'HISTORICAL',
      categoryName: json['categoryName'] as String? ?? '',
      descriptionVi: json['descriptionVi'] as String? ?? '',
      descriptionEn: json['descriptionEn'] as String? ?? '',
      address: json['address'] as String? ?? '',
      latitude: (json['latitude'] as num?)?.toDouble() ?? 0,
      longitude: (json['longitude'] as num?)?.toDouble() ?? 0,
      geofenceRadiusMeters: (json['geofenceRadiusMeters'] as num?)?.toInt() ?? 35,
      environmentType: json['environmentType'] as String? ?? 'OUTDOOR',
      ticketPriceVnd: (json['ticketPriceVnd'] as num?)?.toInt() ?? 0,
      greenRewardPoints: (json['greenRewardPoints'] as num?)?.toInt() ?? 0,
      thumbnailUrl: json['thumbnailUrl'] as String? ?? '',
    );
  }
}
```

### Bước 2.5 — Sửa `huego_map_screen.dart` (quan trọng nhất)

**a) Xoá mảng `_places` hardcode (dòng 22–135).** Thay bằng biến trạng thái:
```dart
late Future<List<PlaceDto>> _placesFuture;
```
Khởi tạo trong `initState()` — dòng 137–141 hiện đã có `initState` gọi `_initTracking()`.
**Giữ nguyên** lời gọi `_initTracking()`, **thêm** `_placesFuture = _fetchPlaces();`.

**b) Hàm tải:**
```dart
Future<List<PlaceDto>> _fetchPlaces() async {
  final response = await ApiClient.instance.dio.get(ApiEndpoints.places);
  final data = response.data as List<dynamic>;
  return data
      .map((e) => PlaceDto.fromJson(e as Map<String, dynamic>))
      .toList();
}
```

**c) Ánh xạ danh mục (BẮT BUỘC — xử lý Lỗi 1).** Thêm hàm này vào class:
```dart
/// Chuẩn hóa categoryCode từ backend về mã ngắn mà switch bên dưới đang dùng.
String _shortCategory(String? code) {
  switch (code) {
    case 'CAFE':
      return 'CAFE';
    case 'CUISINE':
      return 'CUISINE';
    case 'SCENIC_VIEW':
      return 'SCENIC';
    case 'OUTSKIRTS_ECO':
      return 'OUTSKIRTS';
    case 'VEHICLE_RENTAL':
      return 'RENTAL';
    case 'GAS_STATION':
      return 'GAS';
    default:
      return 'HISTORICAL';
  }
}
```
Và chỗ đọc danh mục (dòng 350) đổi thành:
```dart
final cat = _shortCategory(place.categoryCode);
```

**d) Bán kính geofence (BẮT BUỘC — xử lý Lỗi 2).** Dòng 336–345, đổi `radius: 35` thành
`radius: p.geofenceRadiusMeters.toDouble()`.

**e) Bọc `FlutterMap` trong `FutureBuilder<List<PlaceDto>>`** với **3 trạng thái bắt buộc**:
- **đang tải** → `Center(child: CircularProgressIndicator())`
- **lỗi** → thông báo tiếng Việt dễ hiểu + nút **"Thử lại"** gọi lại `_fetchPlaces()` bằng `setState`
- **rỗng** → thông báo "Chưa có địa danh nào"
- **thành công** → render `FlutterMap` như hiện tại, với `CircleLayer` và `MarkerLayer` lấy từ `snapshot.data`

**Giữ nguyên**: `MapOptions(initialCenter: _hueCenter, initialZoom: 14.2)`, `TileLayer`, `MapController`,
`_hueCenter`, `_showUnlockedMilestoneDialog`, `_showPlaceDetailsModal`, `dispose()`.

**f) `_showPlaceDetailsModal` nhận `PlaceDto`** thay vì `Map<String,dynamic>` (vì `place['points']`
và `place['env']` không còn tồn tại). Đổi `place['points']` → `place.greenRewardPoints`,
`place['env']` → `place.environmentType`, `place['name']` → `place.name`.
Có thể hiện thêm `descriptionVi` — tùy chọn.

**g) Banner thời tiết (dòng 426–456).** Thay 2 dòng text hardcode (441–442) bằng dữ liệu từ
`GET /api/v1/weather/hue-current` (`ApiEndpoints.currentWeather`).
Nếu lỗi mạng → **giữ nguyên fallback text cũ**, không được làm sập banner.
Dùng `tempCelsius`, `description`, `recommendation` của response.

**h) Nút "Đổi hướng" (dòng 446–453).** Hiện chỉ hiện SnackBar giả.
Nối thật sang `POST /ai-guide/adapt-itinerary` làm sau.
**LƯU Ý QUAN TRỌNG:** endpoint này hiện **trả HTTP 400** do lỗi validation `currentItinerary`
chưa có decorator (sẽ sửa ở Phase 4). → **Tạm thời** để nút này hiện SnackBar thông báo sẽ có ở bản
cập nhật, kèm comment `// TODO Phase 4: nối thật sau khi sửa validation currentItinerary`.
**Không được** sửa DTO backend trong Phase 2.

### Bước 2.6 — Sửa `green_points_screen.dart`

**a) Đổi `StatelessWidget` → `StatefulWidget`** (giữ `const` constructor và `super.key`).
Thêm state: `late Future<Map<String, dynamic>> _profileFuture;` + hàm tải
`GET ${ApiEndpoints.gamificationProfile}/$userId` với `userId = 'e7b0e774-7243-41bb-9be4-8a4b868e82ef'`.

**b) Bọc `body` trong `FutureBuilder`** với 3 trạng thái: tải / lỗi + nút "Thử lại" / thành công.

**c) Thay dữ liệu giả bằng dữ liệu thật:**

| Dòng hiện tại | Thay bằng |
|---|---|
| `Text('175 GP')` (42) | `${user.greenPoints}` |
| `Text('Cấp Độ 2 • Du Khách Xanh')` (51) | `${user.currentLevel}` + tên cấp bật tra bằng hàm cục bộ |
| `LinearProgressIndicator(value: 0.65)` (57) | `stats.progressPercent / 100` |
| `Text('Tiến độ mở khóa Huế: 65%')` (66) | `${stats.progressPercent}%` + `${stats.totalUnlockedPlaces}/${stats.totalSystemPlaces}` |
| `Text('Còn 75 GP để nhận E-Cert')` (67) | xem (d) |
| 3 huy hiệu hardcode (81–85) | `ListView.builder` ngang trên `badges` từ API — **số lượng huy hiệu do backend quyết định, không hardcode 3** |

**d) BỔ SUNG 1 FIELD Ở BACKEND.** Backend **không** có `pointsToNextCertificate`.
Thêm vào `gamification.service.ts` trong khối `return`, ngay cạnh `canGenerateCertificate`:
```ts
pointsToNextCertificate: Math.max(0, 200 - points),
```
(200 là mốc `canGenerateCertificate` đang dùng ở dòng 51 — giữ nhất quán.)

**e) Nút "Xuất E-Certificate" (110–119).** Hiện chỉ SnackBar. Nối `POST ${ApiEndpoints.certificate}/$userId`.
**Kiểm tra `canGenerateCertificate` trước**: nếu `false` → SnackBar "Bạn chưa đủ điều kiện".
Nếu `true` → hiện `certificateCode` trả về. **Chưa cần xuất PDF thật** —
hiện mã chứng nhận là đủ, ghi `// TODO Phase 7: xuất PDF`.

### Bước 2.7 — Bắt buộc xử lý lỗi ảnh (Lỗi 3)

Bất cứ chỗ nào hiển thị `thumbnailUrl` từ API, **phải** có:
```dart
errorBuilder: (context, url, error) => Container(
  color: HuegoTheme.royalViolet.withOpacity(0.08),
  child: const Icon(Icons.image_not_supported, color: HuegoTheme.textMuted),
),
```
Nếu chưa dùng `cached_network_image` ở màn hình nào thì **không thêm mới** ở Phase 2.

---

## 3. TIÊU CHÍ ĐẠT (Phase 2 chỉ xong khi đủ cả 8 mục)

Mỗi mục phải **dán bằng chứng thật**, không được viết "chắc là chạy".

1. `& "C:\Program Files\nodejs\npx.cmd" tsc --noEmit -p tsconfig.json` (thư mục `backend`) → **exit 0**
2. `flutter analyze` → **≤ 20 issues, 0 errors, 0 warnings**
3. Bằng chứng API trả dữ liệu (dán output thật):
   ```
   curl.exe http://localhost:3000/api/v1/places
   curl.exe http://localhost:3000/api/v1/weather/hue-current
   curl.exe http://localhost:3000/api/v1/gamification/profile/e7b0e774-7243-41bb-9be4-8a4b868e82ef
   ```
4. `flutter run -d chrome`: bản đồ hiện **20 marker** (đúng bằng `places.length` trong
   `in-memory-db.service.ts`) chứ không phải 16 marker cũ.
5. **BẰNG CHỨNG QUAN TRỌNG NHẤT — chứng minh dữ liệu thật:** sửa tạm một tên địa danh
   trong `in-memory-db.service.ts` (ví dụ thêm `" [TEST]"` vào `name` của Đại Nội),
   `flutter run` lại → web **hiện "[TEST]"** → **xoá lại thay đổi**, `git diff` phải rỗng.
   Dán cả output trước và sau.
6. Tắt backend → app hiện trạng thái lỗi + nút "Thử lại", **không crash**, không màn hình trắng.
7. Icon marker **đúng theo danh mục**: cà phê = `local_cafe`, ẩm thực = `restaurant`,
   cảnh quan = `photo_camera`, ngoại thành = `forest`, xe đạp = `pedal_bike`, cây xăng = `local_gas_station`.
   Nếu mọi marker đều là `account_balance` → **map danh mục sai, phải sửa lại Bước 2.5c.**
8. `green_points_screen.dart` hiện **125 GP** (không phải 175) và `0%` tiến độ — khớp backend.

---

## 4. BÁO CÁO BẮT BUỘC (đúng 6 mục, không thêm mục)

```
## BÁO CÁO PHASE 2
1. MỤC TIÊU ĐÃ LÀM:       <1–3 dòng>
2. FILE ĐÃ SỬA:           <đường dẫn đầy đủ + số dòng đã đổi>
3. BẰNG CHỨNG:            <8 tiêu chí mục 3, kèm output thật của tsc / flutter analyze / curl / test đổi tên>
4. ĐÃ KIỂM TRA KHÔNG HỎNG: <bằng chứng 4 file gọi API cũ vẫn chạy>
5. RỦI RO CÒN LẠI:       <thật, không tô hồng>
6. VIỆC CHƯA LÀM:         <nêu rõ>
```

---

## 5. TUYỆT ĐỐI KHÔNG ĐƯỢC LÀM

1. **KHÔNG sửa DTO hoặc service của backend**, trừ đúng 1 field được phép thêm ở Bước 2.6(d)
   (`pointsToNextCertificate` trong `gamification.service.ts`). Mọi sửa backend khác → để Phase 3–6.
2. **KHÔNG viết lại 4 file đã gọi API** (`geofence_location_service`, `ai_guide_screen`,
   `itinerary_planner_screen`, `random_wheel_service`) ngoài việc đổi `Dio()` → `ApiClient.instance.dio`.
3. **KHÔNG dùng `// ignore:` hoặc `// ignore_for_file:`** để làm `flutter analyze` xanh.
   Đặc biệt **không** tắt 2 cảnh báo này — chúng là **bug thật**, sẽ sửa ở Phase 7:
   `itinerary_planner_screen.dart:103` và `:111` (`use_build_context_synchronously`).
4. **KHÔNG xoá `mobile/build/`** — nó bị gitignore nhưng `main.ts:29` phục vụ nó lúc chạy.
   Gitignore ≠ được xoá.
5. **KHÔNG thêm thư viện mới.** `dio`, `flutter_map`, `latlong2`, `cached_network_image`,
   `intl` đã có trong `pubspec.yaml`.
6. **KHÔNG đổi tên class, tên biến, tên file** đã có. Không đổi cấu trúc thư mục.
7. **KHÔNG hardcode lại bất kỳ giá trị nào lấy từ API** (điểm, tên, nhiệt độ, số huy hiệu).
8. **KHÔNG sửa `in-memory-db.service.ts` vĩnh viễn** — chỉ sửa tạm để chứng minh ở tiêu chí 5 rồi **xoá hết**.
   `git status` cuối phase không được có thay đổi trong file này.
9. **KHÔNG commit** trừ khi tôi yêu cầu. Dùng:
   `& "C:\Users\PREDATOR\AppData\Local\Programs\Git\cmd\git.exe" status`
10. **KHÔNG báo xong nếu chưa dán output thật** của `tsc` và `flutter analyze`.

===== HẾT PROMPT =====

---

## GHI CHÚ DÀNH CHO BẠN (không gửi vào prompt)

### Sửa lại một phát hiện trong báo cáo review đầu tiên

Tôi đã nói **"toàn bộ Flutter app không có lệnh gọi API nào"** — **điều đó SAI.** Lý do: tôi grep bằng
`lib\**\*.dart`, mà PowerShell 5.1 **không coi `**` là đệ quy** trong `-Path`, nên chỉ quét được 2 cấp.

**Sự thật đúng:** 4/11 file Dart **đã** gọi API thật (`geofence_location_service`, `ai_guide_screen`,
`itinerary_planner_screen`, `random_wheel_service`). `GeofenceLocationService` có được khởi tạo ở
`huego_map_screen.dart:15`.

**Vấn đề vẫn còn, chỉ kém nghiêm trọng hơn:** `huego_map_screen.dart` và `green_points_screen.dart`
— **2 màn hình nổi bật nhất** — vẫn là dữ liệu giả, cùng banner thời tiết; 4 file kia dùng `Dio()`
không có timeout. Phase 2 vẫi là phase đáng làm nhất, chỉ không phải "không có gì kết nối".

Prompt trên đã viết lại ground truth theo sự thật đã kiểm chứng.

### 3 điểm cần giám sát khi agent chạy Phase 2

1. **Tiêu chí 5 là quan trọng nhất** — sửa tên trong `in-memory-db.service.ts` và xem UI đổi theo.
   Đây là bằng chứng không thể giả bằng lời nói. Nếu agent nói "đã xong" mà không dán output trước/sau
   → yêu cầu chạy lại.

2. **Tiêu chí 7 bắt lỗi map danh mục** — lỗi dễ xảy ra nhất. Nếu mọi marker đều cùng icon tím
   (`account_balance`), nghĩa là agent quên map `SCENIC_VIEW` → `SCENIC`.

3. **Mong đợi cụ thể:** bản đồ **20 marker** (không phải 16), Green Points **125** (không phải 175),
   tiến độ **0%**. Agent báo con số khác → sai.