# HUEGO - PHASE 4: ĐĂNG NHẬP BẮT BUỘC, REFRESH TOKEN, SIẾT ROUTE (FULL STACK)

## 0. BỐI CẢNH BẮT BUỘC ĐỌC TRƯỚC

Phase 3 đã xong và **đã được nghiệm thu bằng output thật**. Commit: `96dd645`.

Phase 3 bật TypeORM lần đầu tiên + JWT auth. Nhưng khi đó **người dùng chốt nhầm
chế độ khách** để tránh hỏng app, nên ai đó cũng đọc được dữ liệu của người khác.

### Ground truth đã xác minh (đừng nghi ngờ, đừng sửa lại)

| Mục | Giá trị |
|---|---|
| Container | `huego-postgis`, PostgreSQL 16.4, PostGIS 3.4.3 |
| Database | `huego_db`, port 5432 |
| Tổng bảng | 14 (sẽ thêm 1 bảng ở Phase 4) |
| `places` | **26** |
| `place_categories` | **9** |
| Phân bố danh mục | HISTORICAL 5, CUISINE 6, OUTSKIRTS_ECO 4, SCENIC_VIEW 3, CAFE 3, VEHICLE_RENTAL 2, GAS_STATION 1, CULTURE_ART 1, CRAFT_VILLAGE 1 |
| `badges` | 3 (NEWBIE_EXPLORER 25, GREEN_TRAVELER 100, HUE_HERITAGE_MASTER 250) |
| Demo user | `tourist.demo@huego.vn` / `Huego@2026` |
| Demo user id | `e7b0e774-7243-41bb-9be4-8a4b868e82ef` |
| Demo user | `green_points = 125`, `current_level = 2`, `role = TOURIST` |
| `tsc --noEmit` | exit 0 |
| Build web | `--no-web-resources-cdn`, `useLocalCanvasKit: true` |

Cột `users.password_hash` **đã có sẵn** từ commit `3b2f061`. Đừng thêm lại.

### Đảo ngược quyết định của Phase 3 — đọc kỹ

Phase 3 mở `@Public()` ở 9 endpoint để app không hỏng. **Phase 4 đóng lại tất cả.**

Người dùng đã quyết định: **khách BẮT BUỘC phải đăng nhập ngay**. Không có chế độ
xem trước. Vì vậy các `TODO(phase4)` rải trong code là việc của bạn lúc này.

Nếu bạn để lại bất kỳ endpoint nghiệp vụ nào `@Public()` mà không có lý do chính
đáng, app sẽ có lỗ hổng đọc dữ liệu người dùng khác. Đây là tiêu chí nghiệm thu
số 1.

## ĐIỀU CẤM TUYỆT ĐỐI

- **KHÔNG** sửa `backend/database/seeds/*.sql`. Từ Phase 4 schema do **migration**
  quản lý, không sửa seed bằng tay nữa.
- **KHÔNG** chạy `docker compose down -v`, `docker volume rm`, hay xoá volume.
  Dữ liệu demo hiện có thật và không tạo lại được.
- **KHÔNG** đổi `synchronize: false`. Tuyệt đối.
- **KHÔNG** commit, KHÔNG push. Chỉ sửa file rồi báo cáo.
- **KHÔNG** hardcode secret. `JWT_SECRET`, `JWT_REFRESH_SECRET`, `DATABASE_PASSWORD`
  đọc từ `backend/.env` bằng `getOrThrow`.
- **KHÔNG** in nội dung secret ra báo cáo.
- **KHÔNG** dùng `// ignore` để bịt lỗi phân tích.
- **KHÔNG** sửa dữ liệu demo: không đổi email, password, `green_points`,
  `current_level`, `role` của demo user.
- **KHÔNG** thêm dependency chưa cần thiết. Cân nhắc kỹ trước khi thêm.

---

## 1. MỤC TIÊU

Bốn việc, theo đúng thứ tự này:

1. Bảng `refresh_tokens` + migration TypeORM + endpoint refresh/logout.
2. Flutter: màn hình đăng nhập và đăng ký, lưu token, tự làm mới token.
3. Đóng `@Public()` mọi endpoint nghiệp vụ, thêm kiểm tra sở hữu dữ liệu.
4. `/admin` yêu cầu role ADMIN; rate limit login; thu hẹp CORS; bỏ secret hardcode.

**Thứ tự này quan trọng.** Làm Flutter xong rồi mới đóng route. Đóng route trước
rồi làm UI nghĩa là app hỏng ở giữa, bạn sẽ không phân biệt được lỗi UI với lỗi
bảo mật.

## 2. PHÂN QUYỀN THEO `role`

`users.role` có sẵn trong schema: `TOURIST`, `CONTRIBUTOR`, `ADMIN` (enum).

| Khu vực | Quyền |
|---|---|
| Map, thời tiết, vòng quay, AI, gamification | `TOURIST` trở lên, tức mọi user đã đăng nhập |
| Check-in GPS, cộng điểm, chứng nhận, lịch sử | Chủ sở hữu: `sub` trong token phải khớp `userId` trong body hoặc URL |
| `/admin` | Chỉ `ADMIN` |
| Crowdsource | `CONTRIBUTOR` trở lên |

Cần một tài khoản admin để test. **Tạo mới** `admin@huego.vn` bằng cách chạy
`bcrypt.hash('Admin@2026', 12)` trong migration up, hoặc đăng ký qua API rồi đổi
role bằng SQL. Đừng đổi role của demo user thành ADMIN — nhiều test đang dựa vào
nó là `TOURIST`.

Ghi rõ trong báo cáo mật khẩu admin để kiểm thử. Đây là môi trường dev.

## 3. BƯỚC 4.1 - MIGRATION VÀ BẢNG `refresh_tokens`

Từ Phase 4, **migration là cách duy nhất** để thêm bảng. Không sửa seed.

Cấu hình migration trong `typeorm.config.ts`:

```ts
migrations: ['src/database/migrations/*.ts'],
```

Thêm `dataSource` script vào `package.json` cho lệnh migration:

```json
"typeorm": "typeorm-ts-node-commonjs"
"migration:run": "npm run typeorm -- migration:run -d src/database/data-source.ts"
"migration:revert": "npm run typeorm -- migration:revert -d src/database/data-source.ts"
```

Tạo `src/database/data-source.ts` đọc cùng biến môi trường với `typeorm.config.ts`.
Hai nơi không được lệch nhau.

### Bảng `refresh_tokens`

Thiết kế bắt buộc:

| Cột | Kiểu | Ghi chú |
|---|---|---|
| `id` | `uuid` PK | `uuid_generate_v4()` |
| `user_id` | `uuid` FK → `users.id` | `ON DELETE CASCADE` |
| `token_hash` | `varchar(64)` **UNIQUE NOT NULL** | SHA-256 của token, **không** lưu bản thô |
| `expires_at` | `timestamptz` | mặc định 30 ngày |
| `revoked_at` | `timestamptz` nullable | đặt khi logout hoặc refresh |
| `created_at` | `timestamptz` | |

Tạo index trên `user_id` và `token_hash`.

**Không lưu refresh token dạng thô.** Lưu SHA-256. Nếu DB bị lọt, kẻ xấu không dùng
được token. Đây là điểm khác biệt quan trọng nhất so với access token.

### `JWT_REFRESH_SECRET`

Thêm biến mới vào `backend/.env` và `.env.example`, giá trị **khác** hẳn
`JWT_SECRET`. Nếu dùng chung một secret thì lấy được refresh token là ra được access
token, và hai loại token mất hết ý nghĩa.

Rút ngắn access token xuống **15 phút**, refresh token **30 ngày**. Access token
sống 7 ngày thì mất ý nghĩa khi đã có refresh token.

## 4. BƯỚC 4.2 - API CONTRACT

Tất cả route dưới `/api/v1/auth`, prefix `api/v1` đặt trên controller như hiện tại.

### `POST /api/v1/auth/register` - `@Public()`

Giữ nguyên contract Phase 3. Trả `201`:

```json
{
  "user": { "id": "...", "email": "...", "fullName": "...", "role": "TOURIST",
            "greenPoints": 0, "currentLevel": 1 },
  "accessToken": "...", "refreshToken": "...", "expiresIn": 900
}
```

### `POST /api/v1/auth/login` - `@Public()`

Trả `200` cùng cấu trúc trên. Cần thêm:

- Kiểm tra `refresh_tokens` cũ của user, `revoked_at` những cái quá **5 token**.
  Không có giới hạn thì bảng phình vô hạn.
- Xoá refresh token cũ đã hết hạn hoặc đã thu hồi.

### `POST /api/v1/auth/refresh` - `@Public()`

Body `{ "refreshToken": "..." }`, trả `200` với access token mới.

Luật bắt buộc:

- Token phải xác thực được và `sub` phải tồn tại.
- Hash phải khớp dòng trong DB và `revoked_at IS NULL`.
- Quá hạn thì `401`.
- **Rotate token**: đặt `revoked_at` cho token cũ, cấp dòng mới. Không rotate thì
  token cũ vīa bị đánh cắp vẫn dùng được vô hạn lần.
- Nếu phát hiện dùng token đã bị thu hồi thì **thu hồi toàn bộ** token của user đó.
  Đây là dấu hiệu token bị lọt.

### `POST /api/v1/auth/logout`

Cần Bearer access token. Đặt `revoked_at` cho refresh token của user đó. Trả `204`.
Đây là route `@Public()` không cần - nó cần token.

### `GET /api/v1/auth/me`

Giữ nguyên. Không trả `passwordHash`, không trả refresh token nào.

## 5. BƯỚC 4.3 - ĐÓNG `@Public()`, THÊM KIỂM TRA SỞ HỮU

**Tiêu chí nghiệm thu số 1 của phase này.**

### Danh sách phải GỠ `@Public()`

Gỡ khỏi tất cả các file sau:

| File | Route |
|---|---|
| `places/places.controller.ts` | `GET /places`, `GET /places/nearby` |
| `weather/weather.controller.ts` | `GET /weather/hue-current` |
| `gamification/gamification.controller.ts` | `GET /profile/:userId`, `POST /certificate/:userId` |
| `random-wheel/random-wheel.controller.ts` | `GET /filters`, `GET /spin` |
| `ai-assistant/ai-assistant.controller.ts` | `POST /chat` |
| `geofencing/geofencing.controller.ts` | `POST /unlock`, `POST /check-in-itinerary`, `GET /unlocked-history/:userId` |

Chỉ giữ `@Public()` ở: `POST /auth/register`, `POST /auth/login`,
`POST /auth/refresh`, `GET /health`.

**Gỡ luôn các comment `TODO(phase4)`** ở những chỗ đó. Việc này đang làm, để lại
comment thì sai.

### Kiểm tra sở hữu dữ liệu

Tạo decorator `@CurrentUser()` đã có sẵn ở Phase 3, dùng nó. Ba trường hợp:

**a) `userId` trong URL** (`/profile/:userId`, `/certificate/:userId`,
`/unlocked-history/:userId`)

So `req.user.id` với `:userId`. Khớp thì qua, lệch thì `403`. Đây là chỗ đang
để lộ hồ sơ người khác, phải sửa dứt điểm.

**b) `userId` trong body** (`geofencing/unlock`, `check-in-itinerary`)

Đây là nguy hiểm hơn vì ai cũng cộng điểm cho người khác được. Nếu `userId` trong
body lệch với token thì `403`. Tốt hơn nữa là bỏ hẳn `userId` khỏi DTO và lấy
từ token, nhưng nếu làm vậy thì phải cập nhật phía Flutter cho khớp. Chọn một cách
rồi ghi rõ lý do.

**c) Route không có `userId`** (places, weather, random wheel, AI)

Chỉ cần token là gọi được. Không cần kiểm tra sở hữu.

### `/admin` và `/app`

- `/admin`: yêu cầu token **và** role `ADMIN`, dùng `@Roles('ADMIN')` đã có sẵn.
  Trả `403` nếu đã đăng nhập nhưng sai role.
- `/app`: người dùng đã nói **xây dựng đầy đủ mọi chức năng**. Không xoá. Nhưng
  nó là trang demo tĩnh của Phase 1, không phải app thật. Hãy đánh giá thật xem
  có nên thay bằng màn hình Flutter thật, và giải thích quyết định trong báo cáo.
  Đừng xoá khi chưa hỏi.

## 6. BƯỚC 4.4 - FLUTTER: MÀN HÌNH ĐĂNG NHẬP

Lần này **được sửa code trong `mobile/`**. Đây là lý do phase này khác Phase 3.

### Lưu trữ token

Dùng `flutter_secure_storage`. Trên web nó dùng WebCrypto kết hợp localStorage.

Lưu: `accessToken`, `refreshToken`, `refreshTokenExpiresAt`.

Trên web `flutter_secure_storage` **không mã hoá hoàn toàn** - người có devtools
vẫn đọc được. Ghi rõ giới hạn này trong báo cáo. Đây là mức chấp nhận được cho
app du lịch, nhưng phải nói thẳng chứ không tự nhủ "đã mã hoá an toàn".

### `ApiClient`

Nền tảng interceptor đã có sẵn:

```dart
if (_token != null) options.headers['Authorization'] = 'Bearer $_token';
```

Hiện `_token` **chưa bao giờ được gán** - đây là lý do token chưa hoạt động. Sửa
thật:

1. Nạp token từ storage khi app khởi động.
2. Khi nhận `401`, gọi `POST /auth/refresh` **một lần**, lưu token mới, phát lại
   request cũ. Tránh vòng lặp vô hạn bằng cờ `_isRefreshing` và hàng đợi chờ.
3. Refresh thất bại thì xoá token, đưa người dùng về màn hình đăng nhập.

### Xoá 3 chỗ hardcode user ID

Đây là việc bắt buộc. Hiện đang có:

| File | Dòng | Nội dung |
|---|---|---|
| `lib/core/services/geofence_location_service.dart` | 15 | `final String currentUserId = 'e7b0e774-...'` |
| `lib/features/gamification/presentation/screens/green_points_screen.dart` | 14 | `static const String _demoUserId = 'e7b0e774-...'` |
| `lib/features/itinerary/presentation/screens/itinerary_planner_screen.dart` | 82 | `'userId': 'e7b0e774-...'` |

Cả ba phải lấy `userId` từ `GET /auth/me` và giữ trong state, không hardcode UUID.
Nếu còn sót UUID nào trong `mobile/lib` thì báo cáo hết, đừng giấu.

### Màn hình đăng nhập

- Validate phía client: email hợp lệ, mật khẩu ≥ 8 ký tự. Vẫn phải validate phía
  server - client chỉ để UX tốt hơn.
- Báo lỗi từ server hiển thị thẳng cho người dùng, không nuốt.
- Nút **"Vào thử demo"**: điền sẵn `tourist.demo@huego.vn` / `Huego@2026`. Vẫn gọi
  endpoint login thật, không giả lập token.
- Màn hình đăng ký tương tự.
- Chuyển hướng: app mở ra phải là màn hình đăng nhập nếu chưa có token hợp lệ.
  Không vào thẳng map rồi mới nhảy login.

### Tương thích ngược

Map, thời tiết, vòng quay vẫn phải chạy sau khi đăng nhập. Đây là tiêu chí
nghiệm thu, xem Mục 8.

## 7. BƯỚC 4.5 - BẢO MẬT CÒN LẠI

### Rate limit login

`@nestjs/throttler`. Giới hạn **5 lần / phút** trên `POST /auth/login` và
`POST /auth/register`. Trả `429` khi vượt.

Phải bật lên môi trường dev, không để `skip` trong production. Bỏ qua rate limit ở
dev là cách nhiều người tự tạo lỗ hổng rồi quên.

### CORS

Hiện `origin: '*'` kèm `credentials: true` là tự mâu thuẫn - trình duyệt chặn
tổ hợp này. Đổi thành danh sách origin cụ thể đọc từ biến môi trường
`CORS_ORIGINS` (danh sách ngăn cách bằng dấu phẩy). Mặc định gồm
`http://localhost:3000`.

### Secret trong `docker-compose.yml`

`POSTGRES_PASSWORD` đang nằm thô trong file. Chuyển sang
`POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}` và đặt trong `.env` ở gốc (gitignore).

Lưu ý: volume hiện đã được tạo với mật khẩu cũ. Đổi biến môi trường **không**
đổi được mật khẩu của volume đang tồn tại. Ghi rõ điều này trong báo cáo kèm
cách xử lý, **đừng tự xoá volume để "áp dụng"**.

## 8. TIÊU CHÍ NGHIỆM THU

Không được báo cáo hoàn thành khi chưa chạy. Dán output thật.

### Bắt buộc

1. `tsc --noEmit` exit 0.
2. `flutter analyze` **không còn lỗi mới** (nền hiện tại: 16 info, 0 error,
   0 warning - được phép giữ nguyên hoặc giảm, không được tăng).
3. Chạy `SELECT COUNT(*) FROM places` → **26**. `place_categories` → **9**.
4. Demo user vẫn `green_points = 125`, `current_level = 2`, `role = TOURIST`.
5. Bảng `refresh_tokens` tồn tại, có index, và **không** chứa token thô.
6. Migration `revert` chạy được rồi `run` lại được. Dán output cả hai.
7. Không còn UUID demo nào trong `mobile/lib`. Liệt kê kết quả `grep`.
8. `flutter build web --release --base-href=/flutter/ --no-web-resources-cdn --web-renderer=canvaskit` thành công.

### Route phải trả 401 khi không có token

```bash
foreach ($u in @("/api/v1/places","/api/v1/weather/hue-current","/random-wheel/filters","/app","/admin")) {
  curl.exe -s -o NUL -w "%{http_code} $u`n" "http://localhost:3000$u"
}
```

Tất cả phải là **401**. Đây là tiêu chí quan trọng nhất - nó chứng minh
`@Public()` đã được gỡ hết. Nếu bất kỳ route nào vẫn 200, phase này chưa xong.

### Route phải trả 403 khi sai chủ sở hữu

Đăng nhập lấy token, rồi gọi profile của user khác:

```bash
curl.exe -s -o NUL -w "%{http_code}\n" -H "Authorization: Bearer $TOKEN" \
  "http://localhost:3000/api/v1/gamification/profile/$OTHER_USER_ID"
```

Phải là **403**. Không phải 200. Nếu trả 200 thì vẫn đọc được dữ liệu người khác
và phase này chưa đạt mục tiêu.

`/admin` với token của demo user (`TOURIST`) phải là **403**.

### Refresh token hoạt động

1. Login → lấy cả `accessToken` và `refreshToken`.
2. Gọi `/auth/me` bằng access token → 200.
3. Gọi `/auth/refresh` → 200, nhận token mới **khác** token cũ.
4. Dùng refresh token **cũ** lần nữa → **401**, và mọi token của user đó bị thu hồi.
5. Đăng xuất, rồi dùng refresh token cũ → 401.

Dán output cả 5 bước.

### App chạy được sau khi đóng route

Đây là tiêu chí dễ sót nhất, lần trước đã hỏng ở đây. Sau khi gỡ hết
`@Public()`:

1. Mở app. Phải ra màn hình đăng nhập, **không** phải map trống.
2. Bấm "Vào thử demo". Phải vào được map.
3. Bản đồ vẽ đủ 26 địa danh.
4. Màn hình điểm Xanh hiện 125 GP, 3 huy hiệu.
5. Thời tiết và vòng quay tải được.
6. Đăng xuất rồi mở lại app. Phải quay về màn hình đăng nhập.

Nếu bạn không tự xem được trình duyệt, nói thẳng là **chưa kiểm chứng được** chứ
đừng viết "chắc là chạy". HTTP 200 trên `/flutter/` không chứng minh app chạy
được - CanvasKit và service worker có thể lỗi ở tầng trình duyệt.

## 9. RỦI RO CÒN LẠI

Ghi vào báo cáo, đừng giấu:

- Refresh token lưu trong DB nhưng trên web `flutter_secure_storage` không mã hoá
  hoàn toàn.
- Access token 15 phút nghĩa là mất mạng vài phút thì app phải chịu một lần
  refresh. Nếu thấy khó chịu thì báo lại, đừng tự ý đổi.
- Chưa có xoá tài khoản, chưa có đổi mật khẩu.
- AI chat vẫn tốn Gemini key, giờ yêu cầu token nhưng vẫn chưa giới hạn quota
  theo user.
- Phase 4 **không** làm: refresh token rotation nhiều thiết bị, 2FA, quên mật
  khẩu, đăng nhập Google, đồng bộ hành trình giữa nhiều máy.

## 10. CÁCH BÁO CÁO

Đúng 8 mục, không thêm không bớt:

1. Danh sách file đã tạo/sửa kèm số dòng.
2. Output `tsc --noEmit` và `flutter analyze`.
3. Output **5 case** refresh token ở Mục 8.
4. Output kiểm tra route: 401 không token, 403 sai chủ sở hữu, `/admin` 403 với
   token TOURIST.
5. Output `revert` + `run` migration, và `\d refresh_tokens`.
6. Xác nhận không còn UUID demo trong `mobile/lib`, kèm output grep.
7. Kết quả 6 bước kiểm tra app trên trình duyệt. Phần nào không tự kiểm được thì
   ghi **chưa kiểm chứng được**.
8. Danh sách rủi ro còn lại, và những gì **không** làm kèm lý do.

**Nếu bất kỳ tiêu chí nào ở Mục 8 không đạt, nói thẳng là chưa đạt và giải thích
vì sao.**