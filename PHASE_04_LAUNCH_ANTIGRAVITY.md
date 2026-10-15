# PHASE 4 - BẢN TÓM TẮT ĐỂ CHẠY VỚI ANTIGRAVITY

## Cách dùng

Đọc **toàn bộ** `UPGRADE_PROMPT_PHASE_04.md` trước. File này chỉ là phần rút gọn
kèm hướng dẫn chạy trên máy Windows này.

## Phase 3 đã xong, đừng làm lại

Commit `96dd645`. Đã có sẵn và đã nghiệm thu bằng output thật:

- TypeORM đã nối, entity `User`, `synchronize: false`
- Auth `register` / `login` / `me` chạy được
- `bcryptjs`, `password_hash` đã có trong DB
- `tsc --noEmit` exit 0, app Flutter build web offline được

**Đừng** viết lại entity `User`, đừng sửa `synchronize`, đừng cài lại `bcryptjs`.

## ĐẢO NGƯỢC QUYẾT ĐỊNH PHASE 3 - ĐỌC KỸ

Phase 3 mở `@Public()` ở 9 endpoint để app không hỏng. **Phase 4 gỡ hết.**

Người dùng đã chốt: **khách bắt buộc đăng nhập ngay, không có chế độ xem trước.**

Lần chạy trước sót đúng chỗ này nên app hỏng hoàn toàn. Lần này thứ tự là:
làm Flutter xong trước, **rồi mới** đóng route.

## Bốn quyết định đã chốt, đừng hỏi lại

1. **Bắt buộc đăng nhập.** Gỡ `@Public()` khỏi mọi endpoint nghiệp vụ.
2. **Refresh token lưu trong DB**, băm SHA-256, có cột `revoked_at`.
3. **Schema dùng migration TypeORM từ bây giờ.** Không sửa seed bằng tay nữa.
4. **Giữ nút "Vào thử demo"** điền sẵn `tourist.demo@huego.vn` / `Huego@2026`.

Về `/app` và `/admin`: người dùng nói **"xây dựng đầy đủ mọi chức năng"**, nên
**không xoá** hai trang này. `/admin` chặn bằng role `ADMIN`.

## ⚠️ PHẦN DỄ SÓT NHẤT

Ba chỗ, đã có tiền lệ hỏng ở Phase 3:

**a) Route còn sót `@Public()`.** Mục 5 của prompt có bảng 9 route phải gỡ.
Kiểm tra bằng:

```powershell
Get-ChildItem -Recurse -Filter *.controller.ts src | Select-String -Pattern "@Public"
```

Chỉ được còn 3 chỗ: `register`, `login`, `refresh`. Thêm vào là 401 sẽ không lên.

**b) Quên gỡ 3 UUID demo trong Flutter.** Nếu còn sót thì app vẫn chạy nhưng
check-in sẽ ghi vào nhầm user:

```powershell
Get-ChildItem -Recurse -Filter *.dart lib | Select-String -Pattern "e7b0e774"
```

Phải rỗng.

**c) Chỉ nhớ bỏ `@Public()` mà quên kiểm tra sở hữu.** Xoá decorator thì app hỏng,
nhưng nếu thêm `@Public()` lại ở chỗ khác thì vẫn rò dữ liệu. Mục 5 yêu cầu so
`userId` trong token với `userId` trong URL/body, lệch thì `403`.

## Tiêu chí biết mình làm xong chưa

```powershell
# 1. Không token, phải 401 hết
foreach ($u in @("/api/v1/places","/api/v1/weather/hue-current","/random-wheel/filters","/app","/admin")) {
  curl.exe -s -o NUL -w "%{http_code} $u`n" "http://localhost:3000$u"
}

# 2. Dữ liệu không đổi
docker exec huego-postgis psql -U postgres -d huego_db -c "SELECT COUNT(*) FROM places;"
docker exec huego-postgis psql -U postgres -d huego_db -c "SELECT COUNT(*) FROM place_categories;"
```

Đạt được khi: 5 route đều 401, `places` vẫn 26, `place_categories` vẫn 9.

## Quy tắc bắt buộc trên Windows

1. **`git` không có trong PowerShell PATH.** Dùng:
   `& "C:\Users\PREDATOR\AppData\Local\Programs\Git\cmd\git.exe"`
2. **`flutter` cũng không có trong PATH.** Thêm trước khi chạy:
   `$env:Path += ";C:\Users\PREDATOR\flutter\bin"`
3. **Không chạy lệnh chặn vô hạn.** `npm run start:dev`, `flutter run` đều treo.
   Backend chạy nền bằng `Start-Process` kèm `-RedirectStandardOutput` ra file
   trong `%TEMP%`, xác nhận API sống bằng `curl.exe`, rồi tắt tiến trình khi
   xong. Lệnh chờ dài hạn phải có timeout.
4. **Dùng `curl.exe`, không dùng `curl`.** Trong PowerShell `curl` là alias của
   `Invoke-WebRequest`, hành vi khác hẳn.
5. **PowerShell 5.1 không coi `**` là đệ quy trong `-Path`.**
   `Get-ChildItem -Path lib\**\*.dart` cho kết quả sai.
   Dùng `Get-ChildItem -Recurse -Filter *.dart lib`.
6. **Đường dẫn có khoảng trắng phải dùng toán tử `&`:**
   `& "C:\Program Files\nodejs\npx.cmd" tsc --noEmit -p tsconfig.json`
7. **`npx` không chạy được script npm.** `npx run build` là sai, phải
   `npm run build`. Nếu có `npm run migration:run` thì dùng `npm`, đừng `npx`.
8. **Xoá file tạm sau khi dùng** và nói rõ đã xoá gì.
9. Không đụng `backend/.env` ngoài việc **đọc**. Không in secret ra báo cáo.
10. Không commit, không push.

## Những điều cấm

- **KHÔNG** sửa `backend/database/seeds/*.sql`. Từ phase này dùng migration.
- **KHÔNG** `docker compose down -v`, `docker volume rm`. Volume đang có dữ liệu
  demo thật, xoá là mất.
- **KHÔNG** bật `synchronize: true`.
- **KHÔNG** dùng chung `JWT_SECRET` và `JWT_REFRESH_SECRET`.
- **KHÔNG** lưu refresh token dạng thô trong DB.
- **KHÔNG** đổi dữ liệu demo user (email, password, điểm, level, role).
- **KHÔNG** dùng `// ignore` để bịt lỗi analyze.
- **KHÔNG** báo xong khi chưa tự chạy. HTTP 200 trên `/flutter/` không chứng minh
  app chạy được.

## Điểm khác biệt so với Phase 3 — chống bịa báo cáo

Phase 3 chỉ đụng backend, chứng minh được bằng `curl.exe` và `psql`. **Phase 4 đụng
Flutter**, có phần không tự kiểm chứng được: CanvasKit, service worker, luồng đăng
nhập thật trong trình duyệt.

Phần nào không tự xem được thì ghi **"chưa kiểm chứng được"**. Đừng suy ra từ HTTP
200 rồi viết "app chạy tốt". Cùng một cái sai đã xảy ra ở Phase 3: app trả 200 ở
mọi endpoint nhưng thực tế trang trắng vì CanvasKit không tải được.

## Báo cáo

Theo đúng Mục 10 của prompt, 8 mục. Mục 7 phải có 6 bước kiểm tra app trên trình
duyệt; bước nào không tự làm được thì ghi rõ chưa kiểm chứng.