# Quy tắc làm việc — dự án HUEGO

## Dọn dẹp: phải xin phép trước

KHÔNG được tự ý dọn dẹp bất cứ thứ gì mà chưa hỏi người dùng.

Bao gồm cả những thao tác sau, dù trông có vẻ vô hại:

- Tắt tiến trình backend / `node` / `flutter` đang chạy nền
- Xoá file tạm, file script kiểm chứng, file log
- `docker compose down`, xoá container hoặc volume
- `git checkout`, `git reset`, `git clean`, xoá nhánh
- `git commit` / `git push`
- Cài thêm hoặc gỡ dependency
- Xoá build artifact (`build/`, `dist/`, `.dart_tool/`)

Lý do: người dùng có thể đang dùng tiến trình đó. Tắt backend giữa lúc
người dùng đang mở trang web sẽ làm trang trắng mà không có manh mối.

Quy tắc thực hành:

1. Trước khi dọn, hỏi rõ tên cái gì sẽ bị tác động.
2. Chờ được trả lời đồng ý rồi mới làm.
3. Nếu tạo file tạm để kiểm chứng, nói rõ sẽ xoá lúc nào và xin phép xoá.
4. Khi cần dừng tiến trình để build hoặc test, báo trước rồi khởi động lại
   ngay sau đó, và báo cả PID mới cho người dùng.

## Không tự ý đổi quyết định nghiệp vụ

Khi gặp câu hỏi về hành vi sản phẩm mà prompt hoặc yêu cầu chưa nói rõ
(ví dụ: khách có bắt buộc đăng nhập không, route nào public, ai được sửa dữ liệu),
phải hỏi người dùng trước khi quyết. Nếu buộc phải chọn tạm để không block
tiến độ, nói rõ giả định đã chọn và ghi nó vào prompt cho các phiên sau.

## Không được báo cáo hoàn thành khi chưa tự kiểm chứng

Chạy lệnh thật, dán output thật. Không viết "chắc là chạy", "đã xử lý" khi
chưa chạy. Với Flutter Web, HTTP 200 trên `/flutter/` KHÔNG chứng minh app
chạy được — CanvasKit và service worker có thể vẫn lỗi ở tầng trình duyệt.