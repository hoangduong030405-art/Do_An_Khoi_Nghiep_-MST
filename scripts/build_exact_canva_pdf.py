import os
import sys
import fitz

sys.stdout.reconfigure(encoding='utf-8')

template_pdf = r'C:\Lap_Trinh_Ung_dung\Xanh Dương Trắng và Đen Cổ Điển Du lịch Việt Nam Cố Đô Huế Bài Thuyết Trình.pdf'
font_regular = r'C:\Windows\Fonts\segoeui.ttf'
font_bold = r'C:\Windows\Fonts\segoeuib.ttf'
font_script = r'C:\Windows\Fonts\segoepr.ttf'

doc = fitz.open(template_pdf)

# 1. Redact existing text from pages 1 to 9 (keep page 10 artistic text 'XIN CẢM ƠN')
for i in range(9):
    p = doc[i]
    for b in p.get_text("blocks"):
        p.add_redact_annot(fitz.Rect(b[0], b[1], b[2], b[3]))
    p.apply_redactions(images=fitz.PDF_REDACT_IMAGE_NONE)

# Also redact top badge on page 10
p10 = doc[9]
for b in p10.get_text("blocks"):
    if "BÀI THUYẾT TRÌNH" in b[4]:
        p10.add_redact_annot(fitz.Rect(b[0], b[1], b[2], b[3]))
p10.apply_redactions(images=fitz.PDF_REDACT_IMAGE_NONE)

# Insert fonts on each page
for i in range(10):
    p = doc[i]
    p.insert_font(fontname='segoe', fontfile=font_regular)
    p.insert_font(fontname='segoe-bold', fontfile=font_bold)
    p.insert_font(fontname='script', fontfile=font_script)

# Helper function to insert formatted text box
def put_text(page, rect, text, fontsize=18, fontname='segoe', color=(0.06, 0.09, 0.16), align=fitz.TEXT_ALIGN_LEFT):
    r = fitz.Rect(rect[0], rect[1], rect[0] + rect[2], rect[1] + rect[3])
    page.insert_textbox(r, text, fontsize=fontsize, fontname=fontname, color=color, align=align)

# PAGE 1: COVER
p1 = doc[0]
put_text(p1, (550, 60, 340, 40), "BÀI THUYẾT TRÌNH KHỞI NGHIỆP ĐỔI MỚI SÁNG TẠO", fontsize=13, fontname='segoe-bold', color=(1, 1, 1), align=fitz.TEXT_ALIGN_CENTER)
put_text(p1, (80, 150, 1280, 100), "H U E G O", fontsize=72, fontname='segoe-bold', color=(0.05, 0.45, 0.81), align=fitz.TEXT_ALIGN_CENTER)
put_text(p1, (80, 260, 1280, 60), "CẨM NANG SỐ & CÔNG CỤ LẬP LỊCH TRÌNH DU LỊCH TỰ TÚC THÔNG MINH", fontsize=20, fontname='segoe-bold', color=(0.10, 0.17, 0.30), align=fitz.TEXT_ALIGN_CENTER)
put_text(p1, (350, 560, 740, 60), "Đồng hành cùng Di sản Cố đô Huế", fontsize=28, fontname='script', color=(0.85, 0.46, 0.02), align=fitz.TEXT_ALIGN_CENTER)
put_text(p1, (100, 680, 1240, 30), "NHÓM 4: Hoàng Đức Dương (Leader) • Huỳnh Thế Trung • Lương Quang Hoàng Minh • Trương Hữu Anh Quốc", fontsize=15, fontname='segoe-bold', color=(0.06, 0.09, 0.16), align=fitz.TEXT_ALIGN_CENTER)
put_text(p1, (100, 715, 1240, 30), "Khoa Hệ thống Thông tin Kinh tế – Trường Đại học Kinh tế, Đại học Huế", fontsize=13, fontname='segoe', color=(0.28, 0.33, 0.41), align=fitz.TEXT_ALIGN_CENTER)

# PAGE 2: GIỚI THIỆU CHUNG
p2 = doc[1]
put_text(p2, (52, 45, 880, 100), "GIỚI THIỆU CHUNG", fontsize=48, fontname='segoe-bold', color=(0.10, 0.17, 0.30))
text_p2 = (
    "Huế là trung tâm văn hóa di sản hàng đầu Việt Nam, thu hút hàng triệu du khách mỗi năm. "
    "Tuy nhiên, du khách tự túc vẫn đang đối mặt với nhiều rào cản về việc tìm kiếm thông tin chính thống và tối ưu hành trình.\n\n"
    "HUEGO ra đời với định vị là 'Trợ lý du lịch số thông minh', kết hợp thuật toán tối ưu lộ trình theo ngân sách, "
    "thuyết minh tự động GPS Audio Pass và trợ lý thích ứng thời tiết thực tế.\n\n"
    "Mục tiêu: Đem lại trải nghiệm khám phá Huế tiện lợi, cá nhân hóa, tiết kiệm chi phí và mang đậm chiều sâu di sản."
)
put_text(p2, (52, 185, 880, 260), text_p2, fontsize=17, fontname='segoe', color=(0.06, 0.09, 0.16))

# PAGE 3: VẤN ĐỀ THỊ TRƯỜNG
p3 = doc[2]
put_text(p3, (250, 70, 940, 100), "VẤN ĐỀ THỊ TRƯỜNG", fontsize=48, fontname='segoe-bold', color=(0.10, 0.17, 0.30), align=fitz.TEXT_ALIGN_CENTER)
text_p3 = (
    "• 72% du khách tự túc gặp khó khăn khi tìm kiếm thông tin văn hóa chính thống và tối ưu thứ tự tham quan các di tích tại Huế.\n\n"
    "• 71% e ngại phát sinh chi phí, bị 'chặt chém' dịch vụ ăn uống và di chuyển do thiếu công cụ dự toán ngân sách minh bạch.\n\n"
    "• 62% du khách hoàn toàn bị động khi thời tiết mưa dầm đặc trưng của Cố Đô làm đảo lộn kế hoạch tham quan ngoài trời."
)
put_text(p3, (80, 215, 1280, 130), text_p3, fontsize=16, fontname='segoe', color=(0.06, 0.09, 0.16))

# PAGE 4: GIẢI PHÁP HUEGO
p4 = doc[3]
put_text(p4, (680, 75, 710, 100), "GIẢI PHÁP HUEGO", fontsize=48, fontname='segoe-bold', color=(0.10, 0.17, 0.30), align=fitz.TEXT_ALIGN_RIGHT)
text_p4 = (
    "1. Lập ngân sách 1-Click:\n"
    "Tự động tính chi phí thực tế và đề xuất lịch trình tối ưu cung đường.\n\n"
    "2. Audio Pass GPS:\n"
    "Tự động thuyết minh di sản đa ngôn ngữ ngay khi bước vào di tích.\n\n"
    "3. Trợ lý thời tiết Cố Đô:\n"
    "Tự động đổi điểm đến trong nhà (bảo tàng, ẩm thực) khi trời mưa."
)
put_text(p4, (1050, 480, 340, 280), text_p4, fontsize=14, fontname='segoe', color=(0.06, 0.09, 0.16))

# PAGE 5: THỊ TRƯỜNG MỤC TIÊU
p5 = doc[4]
put_text(p5, (52, 45, 360, 160), "THỊ\nTRƯỜNG", fontsize=56, fontname='segoe-bold', color=(0.10, 0.17, 0.30))
put_text(p5, (52, 220, 360, 60), "MỤC TIÊU", fontsize=38, fontname='segoe-bold', color=(0.05, 0.45, 0.81))
text_p5 = (
    "• TAM (Tổng thị trường tiềm năng):\n"
    "180 Tỷ VNĐ / năm (Dựa trên 2,5 triệu lượt khách du lịch tự túc đến Huế).\n\n"
    "• SAM (Thị trường khả dụng):\n"
    "36 Tỷ VNĐ (20% du khách tiếp cận và sẵn sàng chi trả ứng dụng du lịch số).\n\n"
    "• SOM (Thị trường mục tiêu năm 1):\n"
    "360 Triệu VNĐ (Chiếm 1% thị phần với 8.000 giao dịch dịch vụ)."
)
put_text(p5, (52, 530, 420, 240), text_p5, fontsize=13, fontname='segoe', color=(0.06, 0.09, 0.16))

# PAGE 6: MÔ HÌNH DOANH THU
p6 = doc[5]
put_text(p6, (52, 35, 360, 160), "MÔ HÌNH\nDOANH", fontsize=56, fontname='segoe-bold', color=(0.10, 0.17, 0.30))
put_text(p6, (52, 210, 360, 60), "THU", fontsize=48, fontname='segoe-bold', color=(0.05, 0.45, 0.81))
text_p6 = (
    "1. Affiliate Booking (10-15%):\n"
    "Hoa hồng từ đặt bàn ăn uống, vé tham quan, trải nghiệm và lưu trú.\n\n"
    "2. Audio Pass Freemium:\n"
    "Bán gói thuyết minh sâu 29k - 59k/tuyến điểm di tích Cố Đô.\n\n"
    "3. Local Merchant (B2B):\n"
    "Phí đăng ký hiển thị ưu tiên cho quán ăn, đặc sản Huế (199k - 499k/tháng)."
)
put_text(p6, (1080, 480, 310, 280), text_p6, fontsize=13, fontname='segoe', color=(0.06, 0.09, 0.16))

# PAGE 7: ĐỘI NGŨ SÁNG LẬP
p7 = doc[6]
put_text(p7, (1060, 45, 330, 320), "ĐỘI\nNGŨ\nSÁNG\nLẬP", fontsize=56, fontname='segoe-bold', color=(0.10, 0.17, 0.30), align=fitz.TEXT_ALIGN_RIGHT)
put_text(p7, (1060, 380, 330, 60), "NHÓM 4", fontsize=36, fontname='segoe-bold', color=(0.05, 0.45, 0.81), align=fitz.TEXT_ALIGN_RIGHT)

put_text(p7, (52, 275, 350, 120), "Hoàng Đức Dương – Leader / CEO\nQuản trị chiến lược dự án, phát triển quan hệ đối tác văn hóa & điều phối tổng thể.", fontsize=13, fontname='segoe', color=(0.06, 0.09, 0.16))
put_text(p7, (52, 420, 350, 140), "Huỳnh Thế Trung – CTO\nKiến trúc công nghệ Web/App, phát triển thuật toán định vị GPS Audio Pass và công cụ lập lịch trình.", fontsize=13, fontname='segoe', color=(0.06, 0.09, 0.16))
put_text(p7, (52, 600, 350, 160), "Minh (COO) & Quốc (CMO/CFO)\nQuản trị nội dung di sản số, triển khai chiến dịch tiếp thị sinh viên và kế hoạch tài chính – dòng tiền.", fontsize=13, fontname='segoe', color=(0.06, 0.09, 0.16))

# PAGE 8: HIỆU QUẢ TÀI CHÍNH
p8 = doc[7]
put_text(p8, (250, 35, 940, 100), "HIỆU QUẢ TÀI CHÍNH & ĐIỂM HÒA VỐN", fontsize=44, fontname='segoe-bold', color=(0.10, 0.17, 0.30), align=fitz.TEXT_ALIGN_CENTER)
text_p8 = (
    "• Kinh tế đơn vị (Unit Economics): Đơn giá trung bình (AOV): 45.000đ | Chi phí biến đổi (AVC): 9.000đ | Biên đóng góp (Contribution Margin): 80%.\n\n"
    "• Định phí vận hành (TFC): 13.000.000đ/tháng (Chi phí hạ tầng Cloud Server, Google Maps/Mapbox API, nội dung di sản và hành chính).\n\n"
    "• Điểm hòa vốn (BEP): 361 giao dịch/tháng (tương đương chỉ 12 giao dịch/ngày) — HUEGO đạt mốc hòa vốn tự chủ dòng tiền từ tháng thứ 4."
)
put_text(p8, (60, 650, 1320, 120), text_p8, fontsize=14, fontname='segoe', color=(0.06, 0.09, 0.16))

# PAGE 9: KÊU GỌI ĐẦU TƯ
p9 = doc[8]
put_text(p9, (400, 520, 640, 100), "KÊU GỌI ĐẦU TƯ (SEED ROUND)", fontsize=44, fontname='segoe-bold', color=(0.10, 0.17, 0.30), align=fitz.TEXT_ALIGN_CENTER)
text_p9 = (
    "• Kêu gọi 500 Triệu VNĐ đổi lấy 10% - 15% cổ phần (Định giá doanh nghiệp Pre-money: 3,5 Tỷ VNĐ).\n\n"
    "• Phân bổ nguồn vốn: 40% Nâng cấp sản phẩm & GPS Audio Pass | 35% Tiếp thị du khách & Merchant | 25% Chi phí vận hành năm 1.\n\n"
    "• Cam kết 12 tháng: 8.000 giao dịch thành công, doanh thu 360 Triệu VNĐ, trở thành cẩm nang du lịch tự túc số 1 tại Huế."
)
put_text(p9, (60, 650, 1320, 120), text_p9, fontsize=15, fontname='segoe', color=(0.06, 0.09, 0.16), align=fitz.TEXT_ALIGN_CENTER)

# PAGE 10: XIN CẢM ƠN
put_text(p10, (550, 65, 340, 40), "HUEGO | PHIÊN PHẢN BIỆN Q&A", fontsize=15, fontname='segoe-bold', color=(1, 1, 1), align=fitz.TEXT_ALIGN_CENTER)
text_p10 = (
    "KÍNH MỜI QUÝ THẦY CÔ VÀ BAN GIÁM KHẢO ĐẶT CÂU HỎI CHO NHÓM 4!\n\n"
    "Khoa Hệ thống Thông tin Kinh tế – Trường Đại học Kinh tế, Đại học Huế\n"
    "Website dự án: http://localhost:3000 | Hotline: 0905.xxx.xxx"
)
put_text(p10, (150, 570, 1140, 140), text_p10, fontsize=18, fontname='segoe-bold', color=(1, 1, 1), align=fitz.TEXT_ALIGN_CENTER)

# Save 10-page exact template PDF
doc.save(r'C:\Lap_Trinh_Ung_dung\HUEGO_10_Trang_Chuan_Mau.pdf')
print("Saved HUEGO_10_Trang_Chuan_Mau.pdf (10 pages)")

# Now add Slide 11 & 12 (Appendix Q&A)
p11 = doc.new_page(width=1440, height=810)
# Insert background from page 2
p11.insert_image(fitz.Rect(0, 0, 1440, 810), filename='scratch/heritage_slides/slide_bg_2.png')
p11.insert_font(fontname='segoe', fontfile=font_regular)
p11.insert_font(fontname='segoe-bold', fontfile=font_bold)
put_text(p11, (52, 40, 940, 80), "PHỤ LỤC Q&A 1: CẠNH TRANH VỚI KLOOK & TRAVELOKA", fontsize=32, fontname='segoe-bold', color=(0.10, 0.17, 0.30))
text_p11 = (
    "Câu hỏi: 'Nếu Klook hay Traveloka đưa tính năng tương tự vào Huế thì HUEGO cạnh tranh ra sao?'\n\n"
    "1. THỪA NHẬN (Concede):\n"
    "OTA lớn áp đảo về vốn, thương hiệu và mảng vé máy bay, khách sạn 4-5 sao.\n\n"
    "2. DỮ LIỆU (Data):\n"
    "Huế chiếm < 2% doanh thu OTA cả nước. Họ không thể cử nhân sự bản địa đi thu thập dữ liệu ngách từng quán bún bò hay thu âm audio guide độc quyền từng lăng tẩm.\n\n"
    "3. KHẲNG ĐỊNH (Affirm):\n"
    "HUEGO sở hữu con hào bản địa (Hyper-local Moat), liên kết chặt chẽ quán ăn địa phương và dẫn đầu phân khúc On-trip cẩm nang số chuyên sâu tại Huế."
)
put_text(p11, (52, 140, 900, 380), text_p11, fontsize=16, fontname='segoe', color=(0.06, 0.09, 0.16))

p12 = doc.new_page(width=1440, height=810)
# Insert background from page 8
p12.insert_image(fitz.Rect(0, 0, 1440, 810), filename='scratch/heritage_slides/slide_bg_8.png')
p12.insert_font(fontname='segoe', fontfile=font_regular)
p12.insert_font(fontname='segoe-bold', fontfile=font_bold)
put_text(p12, (150, 35, 1140, 80), "PHỤ LỤC Q&A 2: TÍNH KHẢ THI VÀ RUNWAY CỦA VỐN 500 TRIỆU", fontsize=32, fontname='segoe-bold', color=(0.10, 0.17, 0.30), align=fitz.TEXT_ALIGN_CENTER)
text_p12 = (
    "Câu hỏi: '500 triệu có quá ít để triển khai công nghệ và sống sót qua năm đầu không?'\n\n"
    "1. THỪA NHẬN: 500 triệu không đủ cho mô hình 'đốt tiền' quảng cáo hay trợ giá người dùng như Grab.\n\n"
    "2. DỮ LIỆU: HUEGO vận hành Lean TravelTech: Định phí chỉ 13 triệu/tháng, biên đóng góp 80%. Số vốn 500 triệu đảm bảo thời gian sống sót (Runway) lên tới 18 - 24 tháng kể cả khi doanh thu bằng 0.\n\n"
    "3. KHẲNG ĐỊNH: HUEGO chỉ cần 12 đơn/ngày (361 đơn/tháng) trên 2,5 triệu khách du lịch là đã hoàn toàn tự chủ dòng tiền mà không cần gọi vốn thêm."
)
put_text(p12, (60, 620, 1320, 160), text_p12, fontsize=14, fontname='segoe', color=(0.06, 0.09, 0.16))

# Save 12-page version as HUEGO_Co_Do_Hue_Pitch_Deck.pdf
doc.save(r'C:\Lap_Trinh_Ung_dung\HUEGO_Co_Do_Hue_Pitch_Deck.pdf')
print("Saved HUEGO_Co_Do_Hue_Pitch_Deck.pdf (12 pages)")

try:
    doc.save(r'C:\Lap_Trinh_Ung_dung\huego_pitch_deck.pdf')
    print("Saved huego_pitch_deck.pdf (12 pages)")
except Exception as e:
    print("Notice: huego_pitch_deck.pdf is currently open/locked in viewer, keeping HUEGO_Co_Do_Hue_Pitch_Deck.pdf")

