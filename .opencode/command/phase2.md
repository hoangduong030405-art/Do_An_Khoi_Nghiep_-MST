---
description: Thực thi Phase 2 (nối Flutter vào backend NestJS) theo file UPGRADE_PROMPT_PHASE_02.md, chạy tự động không hỏi.
agent: build
---

Đọc file `C:\Lap_Trinh_Ung_dung\UPGRADE_PROMPT_PHASE_02.md` và thực hiện Phase 2 theo đúng toàn bộ nội dung trong đó, từ "===== BẮT ĐẦU PROMPT =====" đến "===== HẾT PROMPT =====".

Lệnh này dùng cho: $ARGUMENTS

## Nguyên tắc bắt buộc

1. **Không hỏi lại.** Tự quyết định dựa trên Mục 1 (Ground Truth) và code thực tế. Chỉ dừng lại khi gặp mâu thuẫn không thể giải quyết, và khi đó ghi rõ vào báo cáo thay vì hỏi.
2. **Làm tuần tự** từ Bước 2.1 đến hết Bước 2.7. Không bỏ qua, không gộp, không làm lệch thứ tự.
3. **Đọc file trước khi sửa.** Không sửa dựa vào trí nhớ. Mỗi file cần sửa phải được đọc đủ trước.
4. **Mỗi bước phải có bằng chứng thật** — dán output lệnh kiểm chứng vào báo cáo. Cấm viết "chắc là chạy", "đã xử lý", "đã kiểm tra" mà không kèm output.
5. **Tuân thủ Mục 5 "TUYỆT ĐỐI KHÔNG ĐƯỢC LÀM"** — đặc biệt:
   - Không dùng `// ignore:` để dập cảnh báo.
   - Không sửa backend ngoài đúng field `pointsToNextCertificate`.
   - Không sửa vĩnh viễn `in-memory-db.service.ts`; sửa tạm để chứng minh ở tiêu chí 5 rồi hoàn tác, phải xác nhận `git status` sạch.
6. **Không commit, không push.** Config đã chặn sẵn ở tầng quyền — nếu cần commit thì ghi vào mục 6 "VIỆC CHƯA LÀM".
7. **Không tự ý sang Phase 3.**

## Xử lý lệnh chạy lâu (quan trọng trên Windows)

- `flutter run -d chrome` và `npm run start:dev` **không bao giờ tự kết thúc**. Tuyệt đối không chạy ở chế độ chặn.
- Với `start:dev`: chạy nền bằng `Start-Process` (kèm `-RedirectStandardOutput` ra file trong thư mục tạm), rồi `curl` để xác nhận API sống, và nhớ tắt tiến trình khi xong.
- Với `flutter run`: dùng `flutter build web` + phục vụ tĩnh để kiểm chứng biên dịch, hoặc chạy `flutter run` với timeout giới hạn và chỉ lấy log khởi động.
- **Tiêu chí nào bắt buộc phải mở trình duyệt và tự nhìn** (ví dụ tiêu chí 4, 7, 8) thì **không được bịa kết quả**. Hãy ghi rõ trong báo cáo: đã tạo đúng bước kiểm chứng nào, kết quả mong đợi là gì, và để tôi tự chạy xác nhận. Báo cáo phải phân biệt "đã kiểm chứng bằng lệnh" với "cần tôi kiểm tra thủ công".
- Lệnh git phải dùng đường dẫn đầy đủ vì `git` không có trong PowerShell PATH:
  `& "C:\Users\PREDATOR\AppData\Local\Programs\Git\cmd\git.exe" status`

## Báo cáo kết thúc

Dùng đúng mẫu 6 mục ở Mục 4 của file prompt. Không thêm mục, không bỏ mục. Bắt buộc có:

- Output thật của `tsc --noEmit` (phải exit 0).
- Output thật của `flutter analyze` (phải ≤ 20 issues, 0 errors, 0 warnings).
- Output thật của 3 lệnh `curl.exe` tới `/places`, `/weather/hue-current`, `/gamification/profile/...`.
- Kết quả tiêu chí 5 (đổi tên tạm → thấy `[TEST]` → hoàn tác → `git status` sạch) với output trước và sau.
- Danh sách file đã sửa kèm số dòng thay đổi.
- Mục 6 nêu đúng những việc còn dang dở, không che giấu.