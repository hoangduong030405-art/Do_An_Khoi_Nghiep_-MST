# HUEGO — MASTER UPGRADE PROMPT (bản chính xác 100%, đã kiểm chứng)

> **Cách dùng:** Copy toàn bộ khối từ `===== BẮT ĐẦU PROMPT =====` xuống cuối file này, dán vào AI coding agent
> (Claude Code / Cursor / OpenCode / Copilot Agent) và gửi đi. Prompt này tự chứa mọi thông tin cần thiết,
> **không cần cung cấp thêm file nào.**

---

===== BẮT ĐẦU PROMPT =====

## 0. VAI TRÒ VÀ BẮT BUỘC

Bạn là **kỹ sư phần mềm cấp cao** đang nâng cấp dự án `HUEGO` nằm tại `C:\Lap_Trinh_Ung_dung`.
Đây là nền tảng du lịch xanh Huế (geofencing mở khóa di tích, AI hướng dẫn viên, điểm xanh, chứng nhận điện tử).

**Mục tiêu duy nhất:** biến hệ thống từ *demo hai phần rời rạc* thành *một hệ thống chạy thật*,
**mà không làm hỏng bất kỳ thứ gì đang chạy được**.

### Quy tắc bất di bất dịch (ÁP DỤNG cho mọi phase)

1. **KHÔNG ĐOÁN.** Mọi khẳng định về code phải dựa trên nội dung file đã đọc. Nếu chưa đọc file thì đọc trước.
   Không bao giờ suy đoán tên file, tên hàm, hay hành vi.
2. **KHÔNG VIẾT LẠI TOÀN BỘ FILE.** Chỉ sửa đúng dòng cần sửa. Giữ nguyên tiếng Việt có dấu và
   phong cách comment hiện tại ( NestJS: JSDoc `/** */`; Dart: `///`).
3. **MỖI SỬA ĐỔI PHẢI ĐI KÈM KIỂM CHỨNG.** Nêu lệnh đã chạy và kết quả thật. Không được viết
   "chắc là hoạt động" — phải là "đã chạy, exit code 0".
4. **NẾU MỘT BƯỚC THẤT BẠI → DỪNG LẠI BÁO LỖI, KHÔNG ĐOÁN BỪA KHI TIẾP.**
5. **KHÔNG THÊM THƯ VIỆN MÀ CHƯA KIỂM TRA.** Trước khi `npm i` / `flutter pub add`, kiểm tra đã có chưa
   và nêu rõ lý do cần thêm.
6. **KHÔNG THAY ĐỔI NGÔN NGỮ.** Backend TypeScript/NestJS 10. Frontend Dart/Flutter. Không đổi tên biến,
   không đổi tên file, không đổi cấu trúc thư mục đã có.
7. **MỘT PHASE MỘT LẦN.** Xong phase nào thì dừng, báo cáo, chờ yêu cầu phase tiếp theo — trừ khi
   người dùng nói "làm hết".

---

## 1. GROUND TRUTH — SỰ THẬT ĐÃ KIỂM CHỨNG (không cần verify lại, nhưng đừng phủ nhận)

Tôi đã đọc toàn bộ 131 file và chạy kiểm tra. Các dữ kiện sau là **sự thật đã xác minh**:

### 1.1 Môi trường đã xác minh

| Hạng mục | Kết quả kiểm tra |
|---|---|
| Backend `tsc --noEmit` | **PASS, exit code 0** (baseline phải giữ được) |
| `flutter` | CÓ — `C:\Users\PREDATOR\flutter\bin\flutter.bat` |
| `dart` | CÓ — `C:\Users\PREDATOR\flutter\bin\dart.bat` |
| `node_modules` backend | Đã cài |
| `typeorm`, `pg`, `@nestjs/typeorm` | **Đã cài nhưng KHÔNG dùng dòng nào** |
| `eslint` | **CHƯA cài** → `npm run lint` hiện sẽ FAIL |
| `jest` | **CHƯA cài** → không có hạ tầng test |
| `@nestjs/jwt` | **CHƯA cài** |
| `.git` | **KHÔNG có** — project chưa được version control |
| `mobile/build/web` | CÓ, build gần nhất `2026-10-01 22:38` |
| Encoding source | **ĐÚNG UTF-8.** `admin.controller.ts` chứa `✕ Bác bỏ` hợp lệ (U+2715, U+1ECF). **KHÔNG có lỗi encoding — đừng sửa.** |

### 1.2 Lỗi nghiệp vụ đã kiểm chứng 100% (KHÔNG cần nghi ngờ)

| # | Vị trí | Vấn đề | Bằng chứng |
|---|---|---|---|
| B1 | `mobile/lib/features/**/*.dart` | **Toàn bộ Flutter app KHÔNG có một lệnh gọi API nào.** Grep `http\|Dio\|Uri.parse\|fetch` trong `features/` → **0 kết quả** | `ApiEndpoints` không file nào import; `GeofenceLocationService` không nơi nào khởi tạo |
| B2 | `mobile-preview.controller.ts` | 1.287 dòng HTML/Leaflet viết tay, grep `fetch(\|/api/v1` → **0 kết quả** | App thứ hai, cũng giả |
| B3 | `app.module.ts:37` | Chỉ `providers: [InMemoryDbService]`. Không có `TypeOrmModule.forRoot()` | Postgres/Mongo/Redis trong `docker-compose.yml` không ai kết nối |
| B4 | `main.ts:13-17` | `origin: '*'` **kèm** `credentials: true` — cấu hình mâu thuẫn, và tương đương "mọi website gọi được API" | — |
| B5 | `main.ts:39` | `.addBearerAuth()` trong Swagger nhưng **không có AuthGuard, không `@UseGuards`, không PassportModule** | `.env` có `JWT_SECRET` không ai đọc |
| B6 | toàn bộ controller | **IDOR**: `GET /geofencing/unlocked-history/:userId`, `GET /gamification/profile/:userId`, `POST /gamification/certificate/:userId` — không xác thực, `:userId` từ URL | — |
| B7 | `crowdsource.controller.ts:3,12` | `SubmitPlaceDto` là **`interface`** trong `crowdsource.service.ts:4` → bị xoá lúc compile → `design:paramtypes` = `Object` → **global ValidationPipe BỎ QUA hoàn toàn**. `/crowdsource/submit` không validate gì | — |
| B8 | `ai-requests.dto.ts:40-44` | `currentItinerary: Array<{...}>` **không có decorator nào**. Với `whitelist: true` + `forbidNonWhitelisted: true` (`main.ts:20-26`) → property bị loại khỏi whitelist → **`POST /ai-guide/adapt-itinerary` trả 400 hoặc `dto.currentItinerary` = undefined → `ai-assistant.service.ts:127` `.map()` → TypeError/500** | Endpoint thích ứng thời tiết hỏng |
| B9 | `geofencing.service.ts:140` vs `:65` | `|| 125` (check-in) vs `|| 0` (unlock) — **user mới bắt đầu với 125 điểm**, tự mở 2 huy hiệu | Bug logic |
| B10 | `gamification.service.ts:55-65` | `generateCertificate` **không kiểm tra `canGenerateCertificate`**, không lưu DB, mã = `Date.now()` (đoán được) | — |
| B11 | `geofencing.service.ts:164` | `digitalSignature` = `base64(certCode + userId)` — **KHÔNG phải chữ ký số**, không có khóa, ai cũng tự tính lại được. Tên `HMAC_SHA256` là sai | Rủi ro uy tín |
| B12 | `in-memory-db.service.ts:482`, `geofence_location_service.dart:14` | `userId` demo hardcode `e7b0e774-7243-41bb-9be4-8a4b868e82ef` | Không có login |
| B13 | `gamification.service.ts:41`, `geofencing.service.ts:157` | `fullName: 'Nguyễn Cố Đô'` hardcode — chứng nhận gán tên người không tồn tại | — |
| B14 | `itinerary.service.ts` | 5 `placeId` **không tồn tại** trong `places[]`: `food-bun-bo-01`(:57), `food-com-hen-02`(:81), `ca-hue-song-huong`(:117), `craft-thuy-xuan`(:153), `food-chay-tinh-tam`(:165) | Sẽ vi phạm FK khi vào DB |
| B15 | `itinerary.service.ts:54-207` | "Thuật toán gom cụm" **không tồn tại** — 2 mảng literal viết tay. `durationDays` chỉ xử lý `>=2` (yêu cầu 5 ngày → vẫn trả 2 ngày); `preference` **không dùng ở đâu**; `transportMode` chỉ copy vào metadata; `budget` chỉ ảnh hưởng 3 slot | — |
| B16 | `itinerary.service.ts` | `carbonSavedKg` là **hằng số bịa** (0.8/2.1/3.2…), không công thức, không nguồn | Rủi ro bị chất vấn |
| B17 | `random-wheel.service.ts:112` | Comment ghi "Weighted Random dựa trên Green Points & Rating" nhưng code là `Math.floor(Math.random()*len)` — **đều, không trọng số**. Dòng 97 `sort(()=>0.5-Math.random())` — **shuffle lỗi, không phải Fisher-Yates**. Dòng 92-94: filter <3 kết quả → **âm thầm bỏ filter, trả 20 địa điểm** | — |
| B18 | `spin-wheel.dto.ts:14-15,31` | `@IsString()` không có `@IsIn()` → client gửi giá trị bất kỳ vẫn qua. `budgetTier` **không được dùng** trong `spinWheel()`. `maxDistanceMeters = 8000` default **chết** (ValidationPipe không bật `exposeDefaultValues`) | — |
| B19 | `generate-itinerary.dto.ts:20,30,38` | `@IsString()` cho `budget`/`preference`/`transportMode` — union type TypeScript **không validate runtime** | — |
| B20 | `ai-assistant.service.ts:186-187` | `visitingContext` và `tone` nối thẳng (f-string) vào prompt Gemini, không validate, không escape → **prompt injection**; cộng thêm **không rate limit** trên `/ai-guide/chat` | Rủi ro AI |
| B21 | `geofencing.service.ts:20-31` | Không validate `accuracy`/`timestamp`/`isFromMockProvider`; check-then-push không atomic → 2 request song song **cộng điểm 2 lần** | Rủi ro game |

### 1.3 Code chết / dependency giả (đã kiểm chứng bằng grep)

| Mục | Kết quả grep |
|---|---|
| `crowdsource_screen.dart` | Tìm `CrowdsourceScreen` → **0 kết quả**. Không reachable |
| `provider` (`pubspec.yaml:18`) | Tìm `provider\|ChangeNotifier\|Consumer\|context.read` → **0 kết quả** |
| `mobile/lib/main.dart:70-76` | Có **5 tab** (Map, Lộ Trình, Vòng Quay, O Huế AI, Chứng Nhận) — tài liệu mô tả 4 tab, và **không có crowdsource** |
| `HuePlace` trong `ai-assistant.service.ts:5`, `itinerary.service.ts:2`, `random-wheel.service.ts:2` | import nhưng không dùng |

### 1.4 Nguyên nhân gốc seed SQL (đã xác minh)

Thư mục `backend/database/seeds` được mount vào `/docker-entrypoint-initdb.d`, chạy **theo thứ tự alphabet: `01` rồi `02`**.

- `01_init_postgis_and_seed.sql:23-28` tạo `place_categories` với cột `(id, name, code, icon_url)` — **KHÔNG có `display_order`, `is_utility`**.
- `02_huego_full_schema.sql:33-40` dùng `CREATE TABLE IF NOT EXISTS` → **no-op** vì bảng đã tồn tại.
- `02_huego_full_schema.sql:42` chạy `INSERT INTO place_categories (name, code, icon_url, display_order, is_utility) ...`
  → **`ERROR: column "display_order" does not exist`** → script `02` **DỪNG NGAY TẠI ĐÂY**.
- Hệ quả: `itineraries`, `itinerary_items`, `reviews`, `certificates` và **toàn bộ 200+ dòng seed trong `02` không bao giờ được tạo.**
- Tương tự: `01:39-57` tạo `places` **không có** `tags`, `best_time_to_visit`, `rating_avg`; `02:92` index `GIN(tags)` sẽ lỗi.

### 1.5 Quy ước hiện tại của codebase (PHẢI giữ)

- Backend: NestJS 10, `@Controller('api/v1/<tên>')` viết thẳng trong decorator — **KHÔNG dùng global prefix**.
- DTO dùng `class-validator` + `@ApiProperty` từ `@nestjs/swagger`.
- `main.ts` bật `ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true })`
  → **client gửi thêm field lạ = 400. DTO và client phải khớp tuyệt đối.**
- Frontend dùng `flutter_map 6.x` + `latlong2`, `Dio 5.x`, `google_fonts`, `cached_network_image`, `flutter_animate`, `intl`.
- Bảng màu: `royalViolet #582C83`, `imperialGold #D4AF37` (xem `mobile/lib/core/theme/app_theme.dart`).

### 1.6 LỆNH CHẠY TRÊN MÁY NÀY (PowerShell 5.1 — quan trọng)

```powershell
# PowerShell 5.1 CHẶN file .ps1 của npm/npx -> phải dùng .cmd
cd C:\Lap_Trinh_Ung_dung\backend
& "C:\Program Files\nodejs\npx.cmd" tsc --noEmit -p tsconfig.json   # đã verify: exit 0
& "C:\Program Files\nodejs\npx.cmd" nest build
& "C:\Program Files\nodejs\npm.cmd" run start:dev

cd C:\Lap_Trinh_Ung_dung\mobile
& "C:\Users\PREDATOR\flutter\bin\flutter.bat" pub get
& "C:\Users\PREDATOR\flutter\bin\flutter.bat" analyze

# BẮT BUỘC build web kèm --base-href=/flutter/
& "C:\Users\PREDATOR\flutter\bin\flutter.bat" build web --base-href=/flutter/
# KHÔNG được bỏ --base-href=/flutter/. Backend mount web tại /flutter (backend/src/main.ts:30),
# còn build mặc định ghi <base href="/"> vào index.html -> browser sẽ tải
# http://localhost:3000/main.dart.js (404) thay vì /flutter/main.dart.js -> TRANG TRẮNG.
# Đây là lỗi đã xảy ra thật ở Phase 2. Mỗi lần build web phải kiểm tra lại:
#   curl.exe -o NUL -w "%{http_code}" http://localhost:3000/flutter/main.dart.js   # phải ra 200

# URL đúng để xem app: http://localhost:3000/flutter  (KHÔNG phải cổng khác)

# Docker (PostGIS/Mongo/Redis)
docker compose -f C:\Lap_Trinh_Ung_dung\docker-compose.yml up -d
# QUAN TRỌNG: script trong /docker-entrypoint-initdb.d CHỈ chạy khi volume RỖNG.
# Muốn chạy lại seed sau khi sửa: xoá volume trước, nếu không sẽ tưởng đã sửa nhưng DB không đổi.
docker compose -f C:\Lap_Trinh_Ung_dung\docker-compose.yml down -v
```

---

## 2. GIAO THỨC LÀM VIỆC BẮT BUỘC

**Mỗi lần báo cáo phải có đúng 6 mục này:**

```
## BÁO CÁO PHASE <n>
1. MỤC TIÊU ĐÃ LÀM:      <1–3 dòng>
2. FILE ĐÃ SỬA:          <đường dẫn đầy đủ + số dòng>
3. BẰNG CHỨNG:           <lệnh đã chạy + output thật, kèm exit code>
4. ĐÃ KIỂM TRA KHÔNG HỎNG: <bằng chứng không phá thứ đã chạy>
5. RỦI RO CÒN LẠI:      <có thật, không tô hồng>
6. VIỆC CHƯA LÀM:        <nêu rõ, không giấu>
```

**Về mỗi phase: BẮT BUỘC chạy `tsc --noEmit` và `flutter analyze` sau khi sửa, và dán kết quả thật vào báo cáo.**

---

## 3. CÁC PHASE THỰC HIỆN

> Thực hiện theo đúng thứ tự. Phase 3 có một quyết định cần bạn hỏi người dùng — hỏi **một lần duy nhất**, không hỏi lại.

---

### PHASE 1 — LƯỚI AN TOÀN + ĐO BASELINE

**Mục tiêu:** Có đường quay lại. Đây là phase duy nhất **không được bỏ qua**.

**Bước 1.1 — Baseline (làm TRƯỚC khi sửa gì):**
```powershell
cd C:\Lap_Trinh_Ung_dung\backend
& "C:\Program Files\nodejs\npx.cmd" tsc --noEmit -p tsconfig.json
```
Ghi lại kết quả (dự kiến: exit 0). Sau đó:
```powershell
cd C:\Lap_Trinh_Ung_dung\mobile
& "C:\Users\PREDATOR\flutter\bin\flutter.bat" analyze
```
**Ghi lại TOÀN BỘ số cảnh báo hiện có.** Nếu có cảnh báo sẵn → đây là baseline của bạn.

**Bước 1.2 — Khởi tạo Git:**
- Tạo `C:\Lap_Trinh_Ung_dung\.gitignore`, nội dung tối thiểu:
  ```
  node_modules/
  dist/
  .dart_tool/
  .idea/
  *.iml
  .vscode/*.log
  mobile/build/
  mobile/.flutter-plugins
  mobile/.flutter-plugins-dependencies
  backend/.env
  mobile/android/local.properties
  mobile/flutter_01.log
  ```
- `git init` → `git add -A` → commit đầu tiên với message:
  `chore: commit baseline trước khi nâng cấp (HUEGO v1)`

**Bước 1.3 — Tag baseline:** `git tag baseline-v1`

**Tiêu chí đạt:** commit đầu tiên tồn tại, `git tag` hiện `baseline-v1`,
baseline `tsc` và `flutter analyze` đã được ghi lại bằng số.

> Trở lại bất kỳ đâu: `git reset --hard baseline-v1`

---

### PHASE 2 — NỐI FLUTTER VÀO BACKEND (giá trị cao nhất, công sức thấp nhất)

Đây là phase **loại bỏ lỗi chí mạng B1**. Xong phase này, hệ thống "sống".

**Bước 2.1 — Cấu hình base URL đúng cho từng nền tảng.**
Hiện tại `api_endpoints.dart:3` hardcode `http://10.0.2.2:3000/api/v1` — **chỉ đúng Android Emulator.**

Tạo file mới `mobile/lib/core/constants/app_config.dart`:
```dart
import 'package:flutter/foundation.dart';

class AppConfig {
  static const String _fromDefine = String.fromEnvironment('API_BASE_URL');

  static String get apiBaseUrl {
    if (_fromDefine.isNotEmpty) return _fromDefine;
    if (kIsWeb) return 'http://localhost:3000/api/v1';
    if (!kIsWeb && defaultTargetPlatform == TargetPlatform.android) {
      return 'http://10.0.2.2:3000/api/v1';
    }
    return 'http://localhost:3000/api/v1';
  }
}
```
Sửa `mobile/lib/core/constants/api_endpoints.dart:3` thành:
```dart
static const String baseUrl = AppConfig.apiBaseUrl;
```
và thêm `import 'app_config.dart';`.

> **Ghi chú bắt buộc:** khi chạy trên **thiết bị Android thật** hoặc **iOS**, `10.0.2.2` không đúng.
> Phải truyền: `--dart-define=API_BASE_URL=http://<IP-LAN-CỦA-MÁY-CHỦ>:3000/api/v1`.
> Ghi điều này vào README ở Phase 7.

**Bước 2.2 — Tạo HTTP client dùng chung.** `mobile/lib/core/network/api_client.dart`:
```dart
import 'package:dio/dio.dart';
import '../constants/app_config.dart';

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
  set token(String? value) => _token = value;
}
```

**Bước 2.3 — Wire `huego_map_screen.dart` với `/places`.**

Đọc kỹ `mobile/lib/features/map/presentation/screens/huego_map_screen.dart` trước.
Nó hiện có `final List<Map<String, dynamic>> _places = [...]` (dòng 22) hardcode, và `FlutterMap` (dòng 322) + `MarkerLayer` (dòng 348).

Thay bằng: giữ nguyên `FlutterMap`/`MarkerLayer`/`Marker`, chỉ thay **nguồn dữ liệu**.
- Biến thành `late Future<List<PlaceDto>> _placesFuture;` khởi tạo trong `initState()`.
- `PlaceDto` là model Dart cho JSON trả về từ `GET /api/v1/places`:
  các field: `id, name, slug, categoryCode, categoryName, descriptionVi, descriptionEn, address, latitude, longitude, geofenceRadiusMeters, environmentType, ticketPriceVnd, greenRewardPoints, thumbnailUrl`.
- Dùng `FutureBuilder` với **3 trạng thái bắt buộc**: đang tải (spinner), lỗi (kèm nút "Thử lại"), rỗng (thông báo).
- **Cẩn thận:** `thumbnailUrl` trả về URL Unsplash dạng `https://images.unsplash.com/photo-xxx` (**không có đuôi file**).
  `cached_network_image` cần đuôi file → hãy dùng `errorBuilder` trả về `Icon(Icons.image_not_supported)`.
  **Không được crash vì URL ảnh.**

**Bước 2.4 — Wire `green_points_screen.dart` với `GET /gamification/profile/:userId`.**
Hiện dùng dữ liệu tĩnh. Thay bằng gọi thật + hiển thị `loading / error / retry`.
Giữ nguyên phần hiển thị huy hiệu và tiến độ.

**Bước 2.5 — Wire `ai_guide_screen.dart` với `POST /ai-guide/chat`.**
Kiểm tra lỗi mạng → hiển thị thông báo thân thiện bằng tiếng Việt, **không được crash**.
Nếu response có `source: 'GEMINI_AI'` hoặc `'HUEGO_KNOWLEDGE_BASE'` thì hiển thị nhãn nguồn tương ứng.

**BƯỚC BẮT BUỘC — kiểm tra tương thích DTO:**
Vì `forbidNonWhitelisted: true`, **client gửi thừa field = HTTP 400.**
Đối chiếu chính xác field gửi đi với decorator trong DTO:
- `POST /ai-guide/chat` → `AskGuideDto`: chỉ `question` (bắt buộc), `language`, `currentNearbyPlace`.
- `GET /gamification/profile/:userId` → không có body.
Đọc `mobile/lib/core/constants/api_endpoints.dart` để lấy đúng URL (tiền tố đã gồm `/api/v1`).

**Tiêu chí đạt:**
1. Bật backend, chạy `flutter run -d chrome`, thấy danh sách địa điểm đến **từ server** (đổi 1 giá trị trong
   `in-memory-db.service.ts` → web cập nhật theo → chứng minh là dữ liệu thật).
2. Tắt backend → UI hiện trạng thái lỗi + nút thử lại, **không crash**.
3. `flutter analyze` **không tăng** số cảnh báo so với baseline Phase 1.
4. `tsc --noEmit` vẫn exit 0.

---

### PHASE 3 — XÁC THỰC & PHÂN QUYỀN (loại bỏ B4, B5, B6, B12, B13)

**Bước 3.0 — CÂU HỎI DUY NHẤT, hỏi người dùng rồi chờ trả lời:**
> "Bạn muốn dùng cơ chế nào? (A) JWT đầy đủ — đăng nhập, token, middleware, bảo vệ route.
> (B) Bản tối giản cho demo — header `X-User-Id`, chỉ chống truy cập chéo, nhanh hơn nhiều.
> Tôi khuyến nghị (A) nếu đây là đồ án chấm điểm học phần."
> **Không hỏi lại lần thứ hai dù câu trả lời là gì.**

**Bước 3.1 — Sửa CORS** trong `main.ts:13-17`:
```ts
const allowed = (process.env.CORS_ORIGINS ?? 'http://localhost:3000,http://localhost:8080').split(',');
app.enableCors({ origin: allowed, methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', credentials: true });
```
Thêm `CORS_ORIGINS=` vào `backend/.env`.

**Bước 3.2 — Thêm `/auth`** (theo lựa chọn ở Bước 3.0):
- Nếu (A) JWT: cài `@nestjs/jwt` (đã verify **CHƯA có** → phải `npm i @nestjs/jwt`).
  Tạo `modules/auth/` gồm `auth.module.ts`, `auth.service.ts`, `auth.controller.ts`,
  `jwt-auth.guard.ts`, `dto/login.dto.ts`, và decorator `current-user.decorator.ts`.
  `JwtModule.register({ secret: process.env.JWT_SECRET, signOptions: { expiresIn: '7d' } })`.
  `LoginDto`: `@IsEmail()`, `@IsString() @MinLength(6) password`.
- Tạo `users` seed trong `database/seeds/` với **2 tài khoản demo**:
  một `ADMIN` và một `USER`, password băm bằng `bcrypt` (demo: `Huego@2026`).

**Bước 3.3 — Gỡ userId khỏi client:**
- `mobile/lib/core/services/geofence_location_service.dart:14`: bỏ `currentUserId` hardcode,
  lấy từ token đăng nhập.
- `VerifyGpsDto.userId` (`dto/verify-gps.dto.ts:9-11`): bỏ `@IsUUID()` khỏi body,
  chuyển thành `@IsOptional()` hoặc xoá hẳn — **server lấy `userId` từ `req.user`**.
  ⚠️ **Phải sửa đồng thời `mobile`**, nếu không client gửi `userId` sẽ bị `whitelist` xoá.

**Bước 3.4 — Chặn IDOR:** thêm `@UseGuards(...)` + đổi lấy `userId` từ token cho:
`geofencing.controller.ts:31-35` (`unlocked-history/:userId`),
`gamification.controller.ts:10-14` (`profile/:userId`),
`gamification.controller.ts:16-20` (`certificate/:userId`),
`crowdsource.controller.ts:16-20` (`GET pending` — **chỉ ADMIN**),
`affiliate.controller.ts` (`click/:partnerId/:userId`).

**Bước 3.5 — Xoá tên hardcode:** `gamification.service.ts:41` và `geofencing.service.ts:157`
→ lấy `fullName` từ hồ sơ user trong DB. **Không được để lại chuỗi `'Nguyễn Cố Đô'`.**

**Tiêu chí đạt:**
1. Gọi API không có token → `401`.
2. Token của USER A gọi `unlocked-history` của USER B → `403` hoặc trả dữ liệu của chính A (không phải B).
3. USER thường gọi `GET /api/v1/admin` hoặc `GET /api/v1/crowdsource/pending` → `403`.
4. `flutter analyze` không tăng cảnh báo.

---

### PHASE 4 — SỬA VALIDATION (loại bỏ B7, B8, B18, B19)

Phase này **rẻ, nhanh, và sửa các endpoint đang hỏng.**

**Bước 4.1 — Tạo enum dùng chung** `backend/src/common/dto/environment-type.enum.ts`:
```ts
export enum EnvironmentType {
  INDOOR = 'INDOOR',
  OUTDOOR = 'OUTDOOR',
  SEMI_OUTDOOR = 'SEMI_OUTDOOR',
}
```

**Bước 4.2 — Sửa `POST /ai-guide/adapt-itinerary` (đang hỏng — B8).**
Trong `ai-requests.dto.ts`, thay `currentItinerary` hiện tại (dòng 40-44) bằng:
```ts
export class ItinerarySlotDto {
  @IsString() @IsNotEmpty() timeSlot: string;
  @IsString() @IsNotEmpty() placeName: string;
  @IsEnum(EnvironmentType) envType: EnvironmentType;
}

export class AdaptItineraryDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(50)
  @ValidateNested({ each: true })
  @Type(() => ItinerarySlotDto)
  currentItinerary: ItinerarySlotDto[];

  @IsOptional()
  @IsIn(['LOW', 'MEDIUM', 'LUXURY'])
  userBudget?: 'LOW' | 'MEDIUM' | 'LUXURY';
}
```
Thêm import: `IsArray, ArrayMinSize, ArrayMaxSize, ValidateNested, IsEnum, IsIn` từ `class-validator`,
`Type` từ `class-transformer`, `EnvironmentType` từ common dto.
Sau đó **bắt buộc kiểm chứng**:
```powershell
curl.exe -X POST http://localhost:3000/api/v1/ai-guide/adapt-itinerary `
  -H "Content-Type: application/json" `
  -d "{\"currentItinerary\":[{\"timeSlot\":\"08:30\",\"placeName\":\"Dai Noi\",\"envType\":\"OUTDOOR\"}]}"
```
Phải trả `200`. Trước khi sửa phải trả `400` — hãy **ghi lại cả hai kết quả** trong báo cáo.

**Bước 4.3 — Sửa `SubmitPlaceDto` (B7).**
- Xoá `interface SubmitPlaceDto` ở `crowdsource.service.ts:4-13`.
- Tạo **class thật** `backend/src/modules/crowdsource/dto/submit-place.dto.ts`:
```ts
export class SubmitPlaceDto {
  @IsString() @IsNotEmpty() @MaxLength(200) placeName: string;
  @IsString() @IsNotEmpty() @MaxLength(500) address: string;
  @IsLatitude() latitude: number;
  @IsLongitude() longitude: number;
  @IsEnum(EnvironmentType) environmentType: EnvironmentType;
  @IsString() @IsNotEmpty() @MaxLength(2000) reasonRecommendation: string;
  @IsOptional() @IsArray() @IsString({ each: true }) proofImages?: string[];
}
```
- Sửa `crowdsource.controller.ts:3` import từ đường dẫn dto mới.
- **Bắt buộc kiểm chứng:** POST thiếu `latitude` → phải trả `400` với thông báo lỗi.
  Trước khi sửa nó trả `201/200` (không validate) — ghi lại cả hai.

**Bước 4.4 — Chặn prompt injection (B20).**
Trong `ai-requests.dto.ts`: thêm `@IsIn([...])` cho `language` (`['vi','en']`),
`visitingContext` (`['MORNING','AFTERNOON','NIGHT','RAINY']`),
`tone` (`['DEEP_CULTURE','QUICK_STORY','ROMANTIC']`), `ExplainPlaceStoryDto.placeId` (`@IsUUID()`).
Giá trị ngoài danh sách → `400`.
*Giải thích trong báo cáo:* đây là chống chèn lệnh vào prompt Gemini.

**Bước 4.5 — Thêm `@IsIn` cho enum ở `generate-itinerary.dto.ts:20,30,38` (B19)
và `spin-wheel.dto.ts:14` (B18).** Đồng thời:
- Xoá `budgetTier` khỏi `SpinWheelDto` vì `spinWheel()` không dùng, **hoặc** thêm `@IsIn` + dùng nó.
  Chọn một cách và ghi rõ lý do.
- Sửa default `maxDistanceMeters` bằng `@ApiPropertyOptional({ default: 8000 })` và khớp với
  default thực tế trong `random-wheel.service.ts:69` (hiện là `10000` — **phải thống nhất một giá trị**).

**Tiêu chí đạt:** 5 lệnh `curl` (mỗi cái 1 bài), kèm output thật trước/sau.
`tsc --noEmit` exit 0. `flutter analyze` không tăng.

---

### PHASE 5 — LỚP DỮ LIỆU THẬT (loại bỏ B3 + 1.4)

**Bước 5.0 — QUYẾT ĐỊNH (hỏi người dùng, không hỏi lại lần 2):**
> "PostGIS thật hay giữ in-memory? (A) PostGIS thật — đúng như README, lâu hơn 1–2 ngày.
> (B) Giữ in-memory + sửa README thành trung thực — nhanh, nhưng không 'Spatial GIS'."
> **Khuyến nghị (A)** nếu thầy/cô có thể chấm phần hạ tầng dữ liệu.

**Bước 5.1 — (Chỉ khi chọn A) Gộp seed.** Xoá **một** trong hai file seed, giữ lại **một** schema chuẩn duy nhất.
- Giữ `02_huego_full_schema.sql` (giàu hơn: có `tags`, `rating_avg`, `itineraries`, `certificates`…),
  sửa nó để **tự chứa đủ toàn bộ bảng** và **xoá phần trùng** với `01`.
- Thêm `DROP TABLE IF EXISTS ... CASCADE` theo thứ tự phụ thuộc, để chạy lại được nhiều lần.
- Bắt buộc chạy `docker compose ... down -v` rồi `up -d`, và **dán output không có lỗi** vào báo cáo.
- Xác minh bằng SQL: `SELECT count(*) FROM places;` và `SELECT count(*) FROM itineraries;` → phải > 0.

**Bước 5.2 — (Chỉ khi chọn A) Nối TypeORM.**
`TypeOrmModule.forRoot({ type: 'postgres', host: process.env.DATABASE_HOST, ... entities: [...], synchronize: false })`
→ rồi thay `InMemoryDbService` bằng repository thật cho `PlacesService`, `GeofencingService`,
`GamificationService`, `CrowdsourceService`.
Giữ `calculateDistanceMeters` (Haversine) làm hàm tham chiếu có unit test.

**Bước 5.3 — Đo độ chính xác, rồi ghi vào README (bắt buộc).**
Chạy cùng một tọa độ qua 2 cách: hàm Haversine và SQL `ST_DistanceSphere`/`ST_DWithin`.
**Đo sai số thật** và ghi con số thật vào README, ví dụ: *"sai số tối đa X cm trên 20 điểm thử"*.
Không được ghi con số bịa.

**Bước 5.4 — Xoá `docker-compose.yml` cho MongoDB + Redis, hoặc ghi rõ "planned".**
Không được để service không ai dùng trong repo.

**Tiêu chí đạt:** restart backend → dữ liệu check-in và Green Points **vẫn còn** (nếu chọn A).

---

### PHASE 6 — SỬA LOGIC NGHIỆP VỨU SAI (loại bỏ B9–B11, B14–B16, B21)

**Bước 6.1 — Điểm bắt đầu.**
`geofencing.service.ts:140`: đổi `|| 125` → `|| 0`, khớp với dòng 65.
⚠️ Nếu đã làm Phase 3 thì dòng này lấy từ DB/user, không còn `||` nữa.

**Bước 6.2 — Sửa 5 `placeId` treo (B14).**
Đọc `in-memory-db.service.ts`, đối chiếu `id` thật, rồi sửa trong `itinerary.service.ts`:

| Sai trong itinerary | ID đúng trong `places[]` |
|---|---|
| `food-bun-bo-01` | `bun-bo-mu-roi-12` |
| `food-com-hen-02` | `com-hen-hoa-dong-13` |
| `craft-thuy-xuan` | `lang-huong-thuy-xuan-08` |
| `ca-hue-song-huong` | ⚠️ **KHÔNG có** → chọn địa điểm thật phù hợp (gợi ý: `cau-da-vien-03` ngắm hoàng hôn, hoặc bỏ slot) |
| `food-chay-tinh-tam` | ⚠️ **KHÔNG có** → chọn địa điểm thật (gợi ý: `tra-cung-dinh-kim-long`) |

**Thêm một hàm kiểm tra tự động** chạy lúc khởi động (hoặc test) đảm bảo **mọi `placeId` trong itinerary đều tồn tại**,
log ra danh sách nếu không — để lỗi này không tái diễn.

**Bước 6.3 — Viết thuật toán thật (B15).** Thay 2 mảng literal bằng:
1. **Gom cụm địa lý:** chia lưới tọa độ hoặc k-means trên (lat,lng) → gom các điểm Huế thành 3–4 cụm
   (Kinh thành, Tây Nam – lăng tầm, Bờ Nam, Ngoại thành).
2. **Sắp xếp trong cụm:** Nearest-Neighbour bắt đầu từ điểm gần vị trí người dùng nhất, cải thiện bằng **2-opt**.
3. **Tôn trọng ràng buộc đầu vào:**
   - `durationDays` (1–5) → sinh **đúng** số ngày đó, mỗi ngày 4–7 slot, không trùng địa điểm giữa các ngày.
   - `preference` → điểm ưu tiên danh mục: `HERITAGE` ưu tiên `HISTORICAL`; `CUISINE` ưu tiên `CUISINE`/`CAFE`;
     `ECO_GREEN` ưu tiên `OUTSKIRTS_ECO`/`SCENIC_VIEW` + phương tiện xe đạp; `HEALING` ưu tiên `SEMI_OUTDOOR`/`INDOOR`.
   - `transportMode` → phân bổ slot theo quãng đường thực tế của phương tiện đó.
   - `budget` → giới hạn tổng chi phí; nếu vượt thì cắt slot giá cao nhất trước, **không cắt slot `ticketPriceVnd = 0`**.
   - Thời tiết: nếu `isRaining` hoặc `isExtremelyHot` → **loại slot `OUTDOOR`**, thay bằng `INDOOR` cùng cụm.
4. **Mọi tham số đầu vào phải thực sự ảnh hưởng kết quả** — nếu không thì đã chưa làm đúng.

**Bước 6.4 — Công thức CO₂ thật (B16).**
`carbonSavedKg` phải tính được, không gõ tay. Công thức:
```
carbonSavedKg = (distanceKm * 1.3) * (co2CarKgPerKm - co2ModeKgPerKm)
```
Hệ số tham khảo (kg CO₂e/km): ô tô con 0.192 · xe máy 0.103 · xe đạp 0.021 (đã khấu hao) · đi bộ 0.
`distanceKm` = Haversine giữa hai slot liên tiếp; hệ số 1.3 là **đường vòng thực tế so với đường thẳng**.
→ **Ghi nguồn hệ số vào comment trong code** (ví dụ "UK DEFRA/DESNZ 2024 GHG conversion factors")
và ghi rõ "giá trị ước tính" trong README. **Không được trình bày như số đo thực tế.**

**Bước 6.5 — Sửa `random-wheel` (B16/B17).**
- Dùng **Fisher-Yates thật**:
  `for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }`
- Nếu giữ tuyên bố "weighted": phải có trọng số thật, và **thêm `ratingAvg` vào `HuePlace`** trước.
  Nếu không muốn thêm → **xoá dòng comment "Weighted Random dựa trên Green Points & Rating"**. Không được để lại comment sai.
- Khi filter cho ra `< 4` kết quả: **trả về lỗi `400` có thông điệp rõ** cho client,
  **tuyệt đối không** âm thầm trả về toàn bộ danh sách như hiện tại (dòng 92-94).
- Đổi `@Get('spin')` → **`@Post('spin')`** (hành động có side effect, tránh bị prefetch/cache).
  Cập nhật `mobile/lib/core/constants/api_endpoints.dart` cho khớp.

**Bước 6.6 — Chứng nhận điện tử (B10, B11).**
- `generateCertificate` **phải kiểm tra điều kiện** trước khi cấp, không thì `403` kèm lý do rõ ràng.
- Mã bằng `crypto.randomUUID()` hoặc `randomBytes(8).toString('hex')` — **không dùng `Date.now()`**.
- **Chữ ký số thật:**
  `crypto.createHmac('sha256', process.env.CERT_SIGNING_SECRET).update(`${certCode}|${userId}`).digest('hex')`
- Thêm endpoint công khai **xác minh chứng nhận**: `GET /api/v1/gamification/certificate/:certificateCode`
  → trả `{ valid: true, certificate }` nếu chữ ký khớp. Đây là thứ **thay thế** `verify.huego.vn` không tồn tại.
- `carbonSavedKg` trong chứng nhận phải lấy từ **tổng tích lũy thật**, không hardcode `5.6`.
- Lưu chứng nhận vào DB (`issuedCertificates` phải bị bỏ hoặc đổi thành bảng `certificates`).

**Bước 6.7 — Chống gian lận GPS + race condition (B21).**
- Client gửi kèm `accuracy`, `capturedAt`, `isMock` cùng `latitude`/`longitude`.
- Server **từ chối** khi `isMock === true`, hoặc `accuracy > 100` mét,
  hoặc `|cảm nhận lúc hiện tại − capturedAt| > 5 giây`.
- Chặn "dịch chuyển tức thời": nếu khoảng cách giữa 2 lần check-in > 200 km mà thời gian < 10 phút → từ chối.
- Dùng **ràng buộc UNIQUE(user_id, place_id)** ở DB + `INSERT ... ON CONFLICT DO NOTHING`
  để **loại bỏ triệt để** race condition cộng điểm hai lần.

**Tiêu chứ đạt:**
1. `curl` `POST /itinerary/generate` với `durationDays:3` → trả **đúng 3 ngày**.
2. Gọi với `preference:"CUISINE"` vs `"HERITAGE"` → **kết quả khác nhau** (dán cả 2 output để chứng minh).
3. `POST /gamification/certificate/:userId` khi chưa đủ điều kiện → `403`.
4. Gọi `POST /certificate` 5 lần → **cùng 1 mã**, không nhân bản.
5. Gửi `isMock:true` → từ chối.
6. Tất cả `placeId` trong itinerary resolve được.

---

### PHASE 7 — DỌN CODE CHẾT + TEST + HARDENING

**Bước 7.1 — Quyết định về `crowdsource_screen.dart` (đang chết).**
- Phương án 1 (khuyến nghị): thêm thành **tab thứ 6** trong `main.dart` — khớp với mô tả "đóng góp cộng đồng".
- Phương án 2: xoá hẳn + bỏ khỏi README.
**Chọn một, ghi rõ lý do.** Không để yên file không ai tới được.

**Bước 7.2 — `mobile-preview.controller.ts` (1.287 dòng HTML trong TS).**
- Phương án 1 (khuyến nghị nếu thời gian có hạn): **xoá hẳn** — Flutter đã đủ cho demo.
- Phương án 2: tách ra `backend/web-demo/` + controller riêng, không nhúng HTML vào chuỗi TS.
- Nếu giữ lại: **phải cho nó gọi API thật** (hiện tại grep `fetch(` = 0 kết quả).

**Bước 7.3 — Dependency & import:**
- `provider` trong `pubspec.yaml:18` **không dùng**. Hoặc dùng thật cho state management, **hoặc** gỡ khỏi `pubspec.yaml`.
- Xoá 3 import `HuePlace` không dùng.
- `api_endpoints.dart` **phải** được dùng sau Phase 2 — nếu vẫn không file nào import thì báo lại, đó là dấu hiệu Phase 2 chưa làm đúng.

**Bước 7.4 — Test backend.** `jest` **CHƯA cài** → `npm i -D jest ts-jest @types/jest supertest @types/supertest`.
Thêm script vào `package.json`. Viết tối thiểu:
- `calculateDistanceMeters`: vài cặp tọa độ có khoảng cách **đã biết trước**, sai số cho phép < 1%.
- Biên geofence: tọa độ cách **đúng** `geofenceRadiusMeters` → mở khoá; **vượt 1 mét** → từ chối.
- Itinerary: `durationDays:1..5` → đúng số ngày; không trùng địa điểm; không vượt budget.
- Certificate: 2 lần gọi → cùng mã; chữ ký đổi `userId` → verify trả `false`.
- Tính id: `import { randomUUID } from 'crypto'` và kiểm tra định dạng UUID.

**Bước 7.5 — ESLint.** `package.json:15` có script `lint` gọi `eslint` nhưng **eslint chưa cài** →
`npm run lint` hiện **chắc chắn fail**. Cài và cấu hình tối thiểu (`@typescript-eslint/parser` + plugin),
rồi chạy cho sạch.

**Bước 7.6 — Hardening:**
- `helmet` cho NestJS.
- Rate limit `@nestjs/throttler` cho `/ai-guide/chat` (bạn đang trả tiền Gemini cho bất kỳ ai gọi).
- Thay `catch (e) {}` rỗng ở `geofence_location_service.dart:58,63,84` bằng `debugPrint` + thông báo thân thiện.
  (`onError: (err) {}` hiện có tham số không dùng → sẽ bị analyzer cảnh báo.)

**Bước 7.7 — Test Flutter.** `mobile/test/widget_test.dart` hiện là **template mặc định chưa sửa**.
- Thay bằng test thật, ví dụ: widget render đúng 5 tab; bấm chuyển tab hoạt động.
- Test model parse JSON từ API (đặc biệt `environmentType` và `geofenceRadiusMeters`).

---

### PHASE 8 — VIẾT LẠI README CHO TRUNG THỰC

README hiện tại mô tả PostGIS/TypeORM/MongoDB/Redis, "ST_DWithin", "thuật toán gom cụm",
"Gemini 1.5 Flash & RAG" — **không khớp code thực tế.** Đây là rủi ro chấm điểm lớn nhất.

**Nguyên tắc: mô tả đúng những gì đang chạy; công nghị dùng đến đâu thì nói đến đó.**

README mới phải có:
1. **Mục "Tình trạng hiện tại"** — bảng đánh dấu ✅ đã có / 🚧 đang làm / ❌ chưa làm.
2. **Kiến trúc thật**: Reactivity cơ chế đo khoảng cách đang dùng **Haversine hay ST_DWithin**,
   dữ liệu đang ở **PostGIS hay in-memory**, cache đang có hay không.
3. **Sai số đo được** (từ Bước 5.3) và **công thức CO₂ + nguồn hệ số** (từ Bước 6.4), ghi rõ "ước tính".
4. **Cách chạy** có đủ: Postgres/Mongo/Redis bắt buộc hay không; truyền `--dart-define` cho thiết bị thật;
   cách `docker compose down -v` để nạp lại seed.
5. **Danh sách tài khoản demo** (nếu đã làm Phase 3).
6. **Giới hạn đã biết** — mục này làm tăng điểm: nêu rõ chưa có chống gian lận GPS hoàn chỉnh,
   chưa có offline mode, chưa có i18n thật (hiện chỉ nhồi ngôn ngữ trong prompt AI).

---

## 4. ĐỊNH NGHĨA XONG (DONE)

Không được tuyên bố xong cho tới khi **TẤT CẢ** mục sau đúng:

- [ ] `tsc --noEmit` **exit 0**
- [ ] `flutter analyze` **0 error**, không tăng số warning so với baseline
- [ ] `flutter test` xanh
- [ ] `npm test` xanh
- [ ] `npm run lint` chạy được (đã cài eslint) và không còn lỗi
- [ ] `docker compose up -d` dựng được, seed chạy **không lỗi**, `SELECT count(*) FROM places` > 0
- [ ] Mở app Flutter thấy dữ liệu **từ backend thật** (đổi 1 giá trị server → UI đổi theo)
- [ ] API không có token → `401`; admin route với token thường → `403`; không đọc được dữ liệu người khác
- [ ] `POST /ai-guide/adapt-itinerary` với body đúng → `200` (trước khi sửa là `400`)
- [ ] `POST /crowdsource/submit` thiếu `latitude` → `400`
- [ ] `durationDays:3` → **3 ngày**; `preference` khác nhau → kết quả khác nhau
- [ ] Certificate: chặn khi chưa đủ điều kiện; gọi 2 lần không nhân bản; endpoint verify hoạt động
- [ ] `isMock: true` bị từ chối
- [ ] Không còn `|| 125`, không còn `'Nguyễn Cố Đô'` hardcode, không còn `Date.now()` làm mã chứng nhận
- [ ] Không còn dead code (`crowdsource_screen.dart` đã xử lý, `provider` đã xử lý)
- [ ] README khớp 100% với code thật

---

## 5. TUYỆT ĐỐI KHÔNG ĐƯỢC LÀM

1. **KHÔNG xoá `mobile/build/web`** — backend `main.ts:29` phục vụ nó; xoá là mất bản demo web.
2. **KHÔNG sửa `itinerary-planner_screen.dart`, `random_wheel_screen.dart`, `crowdsource_screen.dart`
   nếu chưa tới Phase 7** — ngoài phạm vi.
3. **KHÔNG đổi tên bảng/cột trong DB** mà không sửa cả entity lẫn seed cùng lúc.
4. **KHÔNG dùng `git reset --hard` trên `main`/branch chính** sau khi đã có commit Phase 2 trở đi.
5. **KHÔNG thêm số liệu thống kê vào README mà chưa đo thật** (sai số Haversine, hệ số CO₂, số điểm thử).
6. **KHÔNG giữ lại comment mô tả sai hành vi.** Comment phải khớp code — nếu sửa được thì sửa comment, không sửa cho khớp comment.
7. **KHÔNG tạo `core/` hoặc `common/` mới nếu không thật sự cần.**
8. **KHÔNG commit file `.env`** — đã nằm trong `.gitignore`.
9. **KHÔNG "sửa" lỗi encoding** — đã verify là UTF-8 hợp lệ.

===== HẾT PROMPT =====

---

## GHI CHÚ DÀNH CHO BẠN (không gửi vào prompt)

**Cách dùng:**
- **Làm tuần tự 1 phase/lần** để kiểm soát chất lượng. Gửi: *"Bắt đầu Phase 1."*
- Sau mỗi phase, yêu cầu báo cáo đủ 6 mục, rồi **tự kiểm lại** xem Định nghĩa Xong mục nào đã đạt.
- Nếu agent báo xong nhưng dán "kết quả" mà không có output thật → yêu cầu chạy lại và dán output.
- **Hai chỗ bắt buộc bạn tự quyết** (agent sẽ hỏi): Phase 3 (JWT đầy đủ hay tối giản) và Phase 5 (PostGIS thật hay giữ in-memory).

**Ưu tiên nếu chỉ có thời gian cho 2 phase:** làm **Phase 1** rồi **Phase 2**. Đó là hai phase biến dự án từ "demo hai phần rời nhau" thành "hệ thống chạy được" — giá trị cao nhất, công sức thấp nhất.

**3 việc nên làm ngay hôm nay, không cần agent:**
1. `git init` + commit (10 phút, mất toàn bộ việc này nếu máy hỏng).
2. Chạy `curl http://localhost:3000/api/v1/places` rồi so với `flutter run` — tự thấy bằng chứng cho B1.
3. Chạy `POST /api/v1/ai-guide/adapt-itinerary` — tự thấy 400 cho B8.