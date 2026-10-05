# PHASE 2 — LỆNH DÁN VÀO ANTIGRAVITY

> File này là **wrapper** cho agent. Nội dung thật của Phase 2 nằm trong `UPGRADE_PROMPT_PHASE_02.md`.
> Copy nguyên khối dưới đây, dán vào Antigravity.

===== BẮT ĐẦU LỆNH =====

Bạn đang làmviệc trong project `C:\Lap_Trinh_Ung_dung` (HUEGO — du lịch xanh Huế, backend NestJS + mobile Flutter).

## Nhiệm vụ

Đọc file `C:\Lap_Trinh_Ung_dung\UPGRADE_PROMPT_PHASE_02.md` và thực hiện Phase 2 theo nội dung giữa hai dấu `===== BẮT ĐẦU PROMPT =====` và `===== HẾT PROMPT =====`.

## Trạng thái hiện tại — Bước 2.1 ĐÃ XONG

Bước 2.1 đã được làm và commit ở `e3c2d18`:
- `mobile/lib/core/constants/app_config.dart` — đã tạo.
- `mobile/lib/core/constants/api_endpoints.dart` — đã đổi **toàn bộ** `static const String` → `static final String`.

Hãy kiểm tra nhanh 2 file này khớp prompt không, rồi **bắt đầu từ Bước 2.2**. Không làm lại Bước 2.1.

Baseline phải giữ nguyên: `tsc --noEmit` exit 0, `flutter analyze` **20 issues — 0 error, 0 warning**.

## Quy tắc bắt buộc trên Windows

1. **`git` KHÔNG có trong PowerShell PATH.** Luôn dùng đường dẫn đầy đủ:
   `& "C:\Users\PREDATOR\AppData\Local\Programs\Git\cmd\git.exe"`
2. **Không bao giờ chạy lệnh chặn vô hạn.** `npm run start:dev`, `flutter run`, `flutter run -d chrome` đều không tự kết thúc — sẽ treo cả phiên làm việc.
   - Backend: chạy nền bằng `Start-Process` kèm `-RedirectStandardOutput` ra file trong thư mục tạm, xác nhận API sống bằng `curl.exe`, rồi tắt tiến trình khi xong.
   - Kiểm tra biên dịch Flutter: dùng `flutter build web` thay vì `flutter run`.
   - Nếu cần `flutter run`, bắt buộc đặt timeout giới hạn và chỉ lấy log khởi động.
3. **PowerShell 5.1 không coi `**` là đệ quy trong `-Path`.** `Get-ChildItem -Path lib\**\*.dart` sẽ cho kết quả sai. Dùng `Get-ChildItem -Recurse -Filter *.dart lib` hoặc `Get-ChildItem -Recurse -Include *.dart`.
4. Đường dẫn có khoảng trắng phải dùng toán tử `&`, ví dụ:
   `& "C:\Program Files\nodejs\npx.cmd" tsc --noEmit -p tsconfig.json`
5. **Không commit, không push.** Permission của Antigravity đã chặn sẵn — đừng thử, cứ ghi vào mục "VIỆC CHƯA LÀM".
6. **Không tự ý sang Phase 3.**
7. **Không hỏi lại.** Tự quyết định dựa trên Mục 1 (Ground Truth) và code thực tế. Nếu gặp mâu thuẫn không giải quyết được thì ghi vào báo cáo thay vì dừng lại hỏi.

## Bằng chứng bắt buộc

- Sau **mỗi bước** phải chạy lệnh kiểm chứng và **dán output thật**. Cấm viết "chắc là chạy", "đã xử lý" mà không kèm output.
- **Tiêu chí 5 là quan trọng nhất**: sửa tạm một tên địa danh trong `backend/src/database/in-memory-db.service.ts` (thêm `" [TEST]"`), build lại, xác nhận data thay đổi đúng như kỳ vọng, rồi **hoàn tác triệt để** và chứng minh `git status --porcelain` trả về **0 dòng**.
- **Các tiêu chí bắt buộc mở trình duyệt và tự nhìn** — bạn KHÔNG được bịa kết quả. Cụ thể là: số marker trên bản đồ, icon đúng theo danh mục, và `125 GP` / tiến độ `0%` ở Green Points. Với những mục này, hãy ghi rõ trong báo cáo: đã chuẩn bị bước kiểm chứng nào, kết quả mong đợi ra sao, và cần tôi tự xác nhận.

## Báo cáo kết thúc

Dùng đúng mẫu 6 mục ở Mục 4 của file prompt. Không thêm mục, không bỏ mục. Bắt buộc có:
- Output thật của `tsc --noEmit` (exit 0).
- Output thật của `flutter analyze` (≤ 20 issues, 0 error, 0 warning).
- Output thật của 3 lệnh `curl.exe`: `/api/v1/places`, `/api/v1/weather/hue-current`, `/api/v1/gamification/profile/e7b0e774-7243-41bb-9be4-8a4b868e82ef`.
- Kết quả tiêu chí 5 với output trước và sau.
- Danh sách file đã sửa kèm số dòng thay đổi.
- Mục 6 nêu đúng việc còn dang dở, không che giấu.

===== HẾT LỆNH =====