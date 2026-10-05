# PHASE 2 — BẢN SỬA LỖI (dán vào Antigravity)

> Phase 2 đã làm xong phần chính. Đây là đợt sửa lỗi sau khi review.
> Copy nguyên khối dưới, dán vào Antigravity.

===== BẮT ĐẦU LỆNH =====

Project: `C:\Lap_Trinh_Ung_dung` (HUEGO). Phase 2 đã triển khai xong, giờ sửa 1 lỗi còn sót.

## Quy tắc Windows (áp dụng cho cả đợt này)

- `git` không có trong PowerShell PATH. Dùng:
  `& "C:\Users\PREDATOR\AppData\Local\Programs\Git\cmd\git.exe" <lệnh>`
- **Không chạy lệnh chặn vô hạn.** `flutter run`, `flutter run -d chrome`, `npm run start:dev` đều
  không tự kết thúc. Backend chạy nền bằng `Start-Process` kèm `-RedirectStandardOutput` ra file tạm,
  xác nhận bằng `curl.exe`, rồi tắt tiến trình. Kiểm tra biên dịch thì dùng `flutter build web`.
- PowerShell 5.1 không coi `**` là đệ quy trong `-Path`. Dùng `Get-ChildItem -Recurse`.
- **Được phép commit** (xem mục COMMIT ở cuối lệnh này). Tuyệt đối **không push**, không đụng
  remote, không amend, không đổi git config.
- Không hỏi lại — tự quyết định. Ghi vào báo cáo nếu có điểm không chắc.

## LỖI CẦN SỬA: thiếu 2 danh mục trong `_shortCategory`

File: `mobile/lib/features/map/presentation/screens/huego_map_screen.dart`

Backend có **9** `categoryCode`, nhưng hàm `_shortCategory` (khoảng dòng 56) chỉ xử lý **7**.
Hai mã dưới đây không có `case` nên rơi vào `default` và hiện **sai icon**:

| `categoryCode` | `categoryName` | Số địa danh | Hiện tại |
|---|---|---|---|
| `CULTURE_ART` | Văn hóa & Nghệ thuật | 1 | rơi vào `default` → icon `account_balance` (sai) |
| `CRAFT_VILLAGE` | Làng nghề & Truyền thống | 1 | rơi vào `default` → icon `account_balance` (sai) |

### Việc phải làm

**1.** Thêm 2 `case` vào hàm `_shortCategory`, trả về mã ngắn mới: `'CULTURE_ART'` → `'CULTURE'`,
`'CRAFT_VILLAGE'` → `'CRAFT_VILLAGE'`.

**2.** Thêm 2 `case` vào `switch (cat)` đang gán `pinIcon` / `pinColor` (khoảng dòng 336-364):
- `case 'CULTURE':` → gợi ý `Icons.museum`
- `case 'CRAFT_VILLAGE':` → gợi ý `Icons.handyman`

Ràng buộc:
- Chỉ dùng icon có sẵn trong Material Icons của Flutter. **Không thêm package mới.**
- Màu phải **phân biệt được** với 7 màu đang dùng, không được trùng: cam đồng `0xFFD97706`,
  đỏ `0xFFDC2626`, `HuegoTheme.perfumeRiverTeal`, xanh lá `0xFF15803D`, xanh dương `0xFF2563EB`,
  cam `0xFFEA580C`, tím `HuegoTheme.royalViolet`. Có thể dùng thêm hằng số `HuegoTheme` sẵn có
  (`imperialGold`, `emeraldGreen`) nếu hợp nghĩa.
- Giữ nguyên `default` là `HISTORICAL` / `account_balance` — không đổi hành vi cũ.
- Giữ nguyên phong cách comment tiếng Việt có dấu (`///`).

**3. KHÔNG được sửa gì khác.** Đặc biệt không đụng backend, không đổi `place_dto.dart`,
không đổi `api_client.dart`, không refactor thêm.

## CÁCH KIỂM CHỨNG ĐÚNG — đây mới là điểm quan trọng nhất

Lần trước tiêu chí "icon đúng danh mục" bị báo đạt chỉ vì kiểm tra 7 mã mà người viết biết trước,
bỏ sót 2 mã không ai nhắc tới. Lần này phải làm theo hướng **suy ra từ dữ liệu thật**, không suy ra
từ danh sách đoán trước:

1. Gọi `curl.exe -s http://localhost:3000/api/v1/places` và **liệt kê toàn bộ `categoryCode` khác nhau**
   xuất hiện trong response, kèm số lượng của từng mã. Phải ra **9 mã**, tổng **26** địa danh.
2. Với **từng mã trong danh sách vừa liệt kê**, đối chiếu xem `_shortCategory` có `case` tương ứng
   không, và `switch` gán icon có xử lý không.
3. Trong báo cáo, đưa ra **bảng đối chiếu đầy đủ 9 mã**: mã backend → mã ngắn → icon → màu.
   Mã nào thiếu `case` phải nói thẳng là bug. Không được chỉ liệt kê những mã mình vừa sửa.
4. Nếu sau khi đối chiếu phát hiện mã nào khác nữa chưa được xử lý, sửa luôn và báo cáo.

## Kiểm chứng lại tiêu chí 6 — lần trước làm chưa đủ

Báo cáo trước viết "khi điều hướng sang tab hoặc tải lại dữ liệu thì FutureBuilder bắt lỗi" — đó là
diễn đạt điều kiện, không phải kết quả đã thử. Lần này làm đúng thứ tự:

1. Đảm bảo backend đang chạy, build web thành công.
2. **Tắt hẳn backend** (`Stop-Process` tiến trình node).
3. **Tải lại trang từ đầu** (F5 hoặc mở tab mới) — không chỉ điều hướng trong app.
4. Bắt buộc quan sát và ghi lại: màn hình có hiện thông báo lỗi tiếng Việt và nút **"Thử lại"** không?
   App có bị trắng màn hình hoặc crash không?
5. **Bật lại backend**, bấm "Thử lại", xác nhận dữ liệu hiện lại bình thường.

Nếu bước 4 không cho ra kết quả mong đợi thì báo cáo thẳng là FAIL, đừng diễn giải.

## Xác nhận "Còn 75 GP" không phải số tình cờ

`200 - 125 = 75` trùng **đúng** với giá trị hardcode cũ nên rất dễ bị nhầm là đã nối API.
Hãy chứng minh giá trị này đến từ `pointsToNextCertificate` của response API: đổi thử `userPoints`
trong backend sang một số khác (ví dụ 90 → phải ra 110), kiểm tra UI đổi theo, rồi **hoàn tác triệt để**
và xác nhận `git diff` cho file đó rỗng.

## Kiểm tra chất lượng bắt buộc

- `& "C:\Program Files\nodejs\npx.cmd" tsc --noEmit -p tsconfig.json` trong `backend` → exit 0
- `flutter analyze` → **không được vượt 16 issues, phải 0 error, 0 warning**
- **Không dùng `// ignore:` hay `// ignore_for_file:`** để dập cảnh báo
- Không được tăng số issue so với hiện tại

## Báo cáo (6 mục, đúng mẫu của lần trước)

1. MỤC TIÊU ĐÃ LÀM
2. FILE ĐÃ SỬA (đường dẫn + số dòng)
3. BẰNG CHỨNG — bắt buộc có: output `tsc`, output `flutter analyze`, **bảng đối chiếu đủ 9 mã
   categoryCode**, kết quả 5 bước của tiêu chí 6, kết quả thử `userPoints = 90`
4. ĐÃ KIỂM TRA KHÔNG HỎNG — xác nhận `git status` không có thay đổi trong
   `backend/src/database/` sau khi thử nghiệm
5. RỦI RO CÒN LẠI
6. VIỆC CHƯA LÀM

## COMMIT — chỉ làm sau khi MỌI bằng chứng ở mục 3 đã đạt

Hiện tồn tại sẵn 11 file chưa commit của Phase 2 (10 file sửa + 2 file mới) cộng 3 file markdown.
Tạo **2 commit**, đúng thứ tự này. Không dùng `git add .` / `git commit -a` — phải liệt kê từng đường dẫn
để không lôi nhầm thứ khác vào.

### Commit 1 — mã nguồn Phase 2

```powershell
$g = "C:\Users\PREDATOR\AppData\Local\Programs\Git\cmd\git.exe"
& $g add -- `
  backend/src/modules/gamification/gamification.service.ts `
  mobile/lib/core/network/api_client.dart `
  mobile/lib/features/map/data/place_dto.dart `
  mobile/lib/features/map/presentation/screens/huego_map_screen.dart `
  mobile/lib/features/gamification/presentation/screens/green_points_screen.dart `
  mobile/lib/core/services/geofence_location_service.dart `
  mobile/lib/features/ai_guide/presentation/screens/ai_guide_screen.dart `
  mobile/lib/features/itinerary/presentation/screens/itinerary_planner_screen.dart `
  mobile/lib/features/random_wheel/data/random_wheel_service.dart
& $g commit -m "feat(phase2): noi flutter vao backend qua ApiClient chung, map va green points lay du lieu that, bo hoan toan mock"
```

### Commit 2 — tài liệu điều khiển agent

```powershell
& $g add -- UPGRADE_PROMPT_PHASE_02.md PHASE_02_LAUNCH_ANTIGRAVITY.md PHASE_02_FIX_ANTIGRAVITY.md
& $g commit -m "docs(phase2): them lenh chay va sua loi danh muc, cap nhat ground truth 26 dia danh"
```

### Ràng buộc khi commit

- **KHÔNG `git push`.** Không `git pull`, không `git fetch`, không `git rebase`, không amend commit cũ.
- **KHÔNG thêm** `backend/.env`, `.dart_tool/`, `build/`, `local.properties` — chúng đã bị gitignore,
  nhưng phải tự kiểm tra `git status` trước khi commit để chắc chắn không có bí mật lọt vào.
- Trước khi commit, chạy `& $g status --short` và **dán output vào báo cáo** để tôi xác minh.
- Sau khi commit xong, chạy `& $g log --oneline -4` và `& $g status --porcelain` và **dán output**.
  `status --porcelain` phải trả về **rỗng**. Nếu còn dòng nào sót, commit nốt hoặc báo cáo lý do.

===== HẾT LỆNH =====