# PHASE 3 — LỆNH DÁN VÀO ANTIGRAVITY

> File này là **wrapper** cho agent. Nội dung thật của Phase 3 nằm trong `UPGRADE_PROMPT_PHASE_03.md`.
> Copy nguyên khối giữa hai dấu `===== BẮT ĐẦU LỆNH =====` và `===== HẾT LỆNH =====`, dán vào Antigravity.

===== BẮT ĐẦU LỆNH =====

Bạn đang làm việc trong project `C:\Lap_Trinh_Ung_dung` (HUEGO — du lịch xanh Huế, backend NestJS + mobile Flutter).

## Nhiệm vụ

Đọc file `C:\Lap_Trinh_Ung_dung\UPGRADE_PROMPT_PHASE_03.md` và thực hiện **toàn bộ** Phase 3, từ Bước 0 đến Bước 3.6, theo thứ tự. Sau đó báo cáo theo Mục 10 của file prompt.

## Bối cảnh — Bước 0 ĐÃ ĐƯỢC CHUẨN BỊ, ĐỪNG LÀM LẠI

Hạ tầng Postgres đã chạy và schema đã được sửa xong ở commit `3b2f061`:

- Container `huego-postgis` đang chạy PostgreSQL 16.4 + PostGIS 3.4.4, database `huego_db`, port 5432.
- Schema đã gộp còn **một** file seed duy nhất: `backend/database/seeds/01_init_postgis_and_seed.sql`.
- File `02_huego_full_schema.sql` **đã bị xoá** vì định nghĩa trùng bảng với schema khác, khiến `CREATE TABLE IF NOT EXISTS` thành no-op và script vỡ ở câu `INSERT` thiếu cột `display_order`.
- `places` = **26**, `place_categories` = **9**, `users` = **1**, `badges` = 3, `itineraries` = 1, `itinerary_items` = 3. Tổng 14 bảng.
- `users` **đã có** cột `password_hash` và `password_changed_at`.
- Demo user đã seed, băm bcryptjs cost 10, **đã verify khớp**:
  - `tourist.demo@huego.vn` / `Huego@2026`
  - `green_points = 125`, `current_level = 2`, `role = TOURIST`
- `bcryptjs@^2.4.3` **đã được cài** ở commit `3b2f061`.

Nhiệm vụ của bạn ở phase này là: **bật TypeORM lần đầu tiên** (hiện tại `app.module.ts` chưa hề có `TypeOrmModule.forRoot`, chưa có DataSource, chưa có entity, chưa có `synchronize`) và xây JWT auth. Không sửa lại seed, không seed lại DB.

## ⚠️ PHẦN DỄ SÓT NHẤT — ĐỌC KỸ

Bật `APP_GUARD` toàn cục sẽ chặn **mọi** endpoint của Phase 1, kể cả endpoint không liên quan auth. Lần chạy trước đã sót chỗ này và làm app Flutter hỏng hoàn toàn: bản đồ trống, không có điểm Xanh, không có thời tiết.

Bắt buộc:

1. Đọc **Mục 1.5** trong prompt — có bảng liệt kê chính xác những endpoint phải mang `@Public()`, kèm lý do từng cái.
2. Quyết định chế độ khách đã được chốt: **app xem trước không cần đăng nhập, đăng nhập sau.** Không tự đổi thành bắt buộc đăng nhập.
3. Sau khi bật guard, chạy lệnh kiểm tra trong Mục 1.5 và dán output. Phải xác nhận `/api/v1/places`, `/api/v1/weather/hue-current`, `/random-wheel/filters`, `/health` đều trả 200 **không cần token**.
4. Xác nhận dữ liệu không đổi: `/places` vẫn 26 địa danh 9 danh mục, gamification vẫn 125 GP.

## Về bằng chứng `passwordHash`

Lần chạy trước đưa ra câu SQL này làm bằng chứng:

```sql
SELECT email, position('password_hash' in 'password_hash') FROM users;
```

Câu đó **không chứng minh được gì**. Nó là biểu thức hằng số, luôn trả `1`, không liên quan đến TypeORM. `select: false` hoạt động ở tầng TypeScript nên SQL thuần không thể kiểm chứng.

Đọc **Mục 7** trong prompt — có sẵn mẫu script TypeScript dùng `DataSource` thật, so sánh `findOne()` với query có `addSelect`. Kết quả bắt buộc phải là `undefined` rồi tới `CO HASH`.

Tương tự: đừng dùng `synchronize: NODE_ENV === 'development' ? false : false`. Viết thẳng `false`.

## CÁC ĐIỀU CẤM TUYỆT ĐỐI

1. **KHÔNG sửa `backend/database/seeds/*.sql`.** Schema đã đúng và đã commit.
2. **KHÔNG chạy `docker compose down -v`, `docker volume rm`, hay lệnh nào xoá volume.** Mất dữ liệu là không thể hoàn tác.
3. **KHÔNG sửa `docker-compose.yml`.**
4. **KHÔNG đặt `synchronize: true`.** Schema do SQL seed quản lý; bật cờ này TypeORM sẽ tự ý xoá cột không có trong entity. Nếu bạn thấy cần `true` để cho schema chạy, đó là dấu hiệu entity sai — dừng lại báo cáo, đừng bật.
5. **KHÔNG dùng `bcrypt` native** (cần build toolchain C++ trên Windows). Dùng `bcryptjs` đã cài.
6. **KHÔNG sửa bất kỳ file nào trong `mobile/`.** Phase 3 là backend only.
7. **KHÔNG dùng `// ignore` hay `// ignore_for_file`.**
8. **KHÔNG hardcode `JWT_SECRET`, KHÔNG commit giá trị secret.** Đọc từ `backend/.env` bằng `getOrThrow`.
9. **KHÔNG commit, KHÔNG push.**
10. **KHÔNG tự ý làm tiếp phần Flutter.** Dừng lại sau Phase 3.
11. **KHÔNG cài lại `bcryptjs`** — đã có trong `package.json`.

## Quy tắc bắt buộc trên Windows

1. **`git` KHÔNG có trong PowerShell PATH.** Luôn dùng đường dẫn đầy đủ:
   `& "C:\Users\PREDATOR\AppData\Local\Programs\Git\cmd\git.exe"`
2. **Không bao giờ chạy lệnh chặn vô hạn.** `npm run start:dev`, `npm run start`, `flutter run` đều không tự kết thúc — sẽ treo cả phiên làm việc.
   - Backend: chạy nền bằng `Start-Process` kèm `-RedirectStandardOutput` ra file trong thư mục tạm, xác nhận API sống bằng `curl.exe`, rồi tắt tiến trình khi xong.
   - Lệnh chờ dài hạn phải đặt timeout giới hạn.
3. **Dùng `curl.exe` chứ không dùng `curl`.** Trong PowerShell, `curl` là alias của `Invoke-WebRequest`, hành vi khác hẳn.
4. **PowerShell 5.1 không coi `**` là đệ quy trong `-Path`.** `Get-ChildItem -Path lib\**\*.dart` cho kết quả sai. Dùng `Get-ChildItem -Recurse -Filter *.dart lib`.
5. **Đường dẫn có khoảng trắng phải dùng toán tử `&`:**
   `& "C:\Program Files\nodejs\npx.cmd" tsc --noEmit -p tsconfig.json`
6. Không hỏi lại. Tự quyết định dựa trên Ground Truth trong prompt và code thực tế. Nếu gặp mâu thuẫn không giải quyết được thì ghi vào báo cáo.
7. Không đụng vào `backend/.env` ngoài việc **đọc**. Tuyệt đối không in nội dung secret ra báo cáo.
8. Script kiểm chứng tạm phải đặt ngoài repo hoặc xoá sau khi chạy. Không để lại file rác trong `backend/`.

## Điểm khác biệt so với Phase 2 — chống bịa báo cáo

Phase 2 có phần kiểm chứng bằng trình duyệt mà bạn không tự nhìn được. Phase 3 thì **ngược lại: mọi thứ đều kiểm chứng được bằng `curl.exe` và `psql`**. Không có lý do gì để bỏ qua hoặc đoán mò.

Các tiêu chí sau **bắt buộc phải có output thật**, không được viết "chắc là chạy" hay "đã xử lý":

- `npx tsc --noEmit` exit 0
- `SELECT COUNT(*) FROM places` vẫn bằng **26** sau khi bật app
- `SELECT COUNT(*) FROM place_categories` vẫn bằng **9**
- Demo user vẫn `green_points = 125`, `role = TOURIST`
- **`/api/v1/places`, `/api/v1/weather/hue-current`, `/random-wheel/filters`, `/health` trả 200 KHÔNG cần token**
- 10 case `curl.exe` ở Mục 7 của prompt
- `password_hash` trong DB có tiền tố `$2a$`, độ dài 60, và KHÔNG plaintext
- Script kiểm chứng `select: false` cho ra `undefined` rồi `CO HASH`
- Response của `/auth/register`, `/auth/login`, `/auth/me` không chứa `passwordHash`

**Riêng về `passwordHash`:** chỉ đọc API response **không đủ** để kết luận. `select: false` ảnh hưởng tầng ORM chứ không ảnh hưởng DTO, nên API vẫn trả kết quả đúng ngay cả khi bạn xoá `select: false`. Phải chạy script TypeScript thật theo Mục 7 mới chứng minh được.

## Báo cáo kết thúc

Theo đúng Mục 10 của file prompt, 8 mục, không thêm không bỏ. Bắt buộc có:

1. Danh sách file đã tạo/sửa kèm số dòng
2. Output `tsc --noEmit`
3. Output của **cả 10** case `curl.exe` ở Mục 7
4. Kết quả `\d users` + query đối chiếu `places` / `place_categories`
5. Xác nhận `synchronize: false` và cách đọc `JWT_SECRET`
6. Bằng chứng `passwordHash` không lộ ra
7. Danh sách rủi ro còn lại — nêu rõ: chưa rate limit login, chưa có refresh token, CORS `origin: '*'` + `credentials: true` chưa sửa
8. Những gì **không** làm và lý do

**Nếu bất kỳ tiêu chí nào ở Mục 8 của prompt không đạt, nói thẳng là chưa đạt và giải thích vì sao. Không được báo cáo hoàn thành khi chưa thực sự đạt.**

===== HẾT LỆNH =====