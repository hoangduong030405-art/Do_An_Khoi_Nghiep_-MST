import os
import sys
import fitz
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR

sys.stdout.reconfigure(encoding='utf-8')

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
blank_layout = prs.slide_layouts[6]

# Colors
C_NAVY = RGBColor(26, 43, 76)      # #1A2B4C
C_BLUE = RGBColor(13, 114, 206)    # #0D72CE
C_DARK = RGBColor(15, 23, 42)      # #0F172A
C_MUTED = RGBColor(71, 85, 105)    # #475569
C_WHITE = RGBColor(255, 255, 255)
C_GOLD = RGBColor(217, 119, 6)     # #D97706

# Coordinate converter: Template PDF is 1440 x 810 pt -> PPTX 13.333 x 7.5 in
def pt_x(x):
    return Inches(x * 13.333 / 1440.0)

def pt_y(y):
    return Inches(y * 7.5 / 810.0)

def pt_w(w):
    return Inches(w * 13.333 / 1440.0)

def pt_h(h):
    return Inches(h * 7.5 / 810.0)

# Slide content definitions
slides_data = [
    # SLIDE 1: COVER
    {
        "bg": "scratch/heritage_slides/slide_bg_1.png",
        "elements": [
            {
                "rect": (550, 48, 340, 50),
                "texts": [("BÀI THUYẾT TRÌNH KHỞI NGHIỆP ĐỔI MỚI SÁNG TẠO", 15, True, C_WHITE, PP_ALIGN.CENTER)]
            },
            {
                "rect": (100, 150, 1240, 180),
                "texts": [
                    ("H U E G O", 72, True, C_BLUE, PP_ALIGN.CENTER),
                    ("CẨM NANG SỐ & CÔNG CỤ LẬP LỊCH TRÌNH DU LỊCH TỰ TÚC THÔNG MINH", 20, True, C_NAVY, PP_ALIGN.CENTER)
                ]
            },
            {
                "rect": (350, 560, 740, 80),
                "texts": [("Đồng hành cùng Di sản Cố đô Huế", 32, True, C_GOLD, PP_ALIGN.CENTER)]
            },
            {
                "rect": (150, 680, 1140, 70),
                "texts": [
                    ("NHÓM 4: Hoàng Đức Dương (Leader) • Huỳnh Thế Trung • Lương Quang Hoàng Minh • Trương Hữu Anh Quốc", 16, True, C_DARK, PP_ALIGN.CENTER),
                    ("Khoa Hệ thống Thông tin Kinh tế – Trường Đại học Kinh tế, Đại học Huế", 14, False, C_MUTED, PP_ALIGN.CENTER)
                ]
            }
        ],
        "notes": "[0:00 - 0:35] Hoàng Đức Dương: Kính chào Quý Thầy Cô và Hội đồng Ban Giám khảo. Em là Hoàng Đức Dương, đại diện Nhóm 4 Khoa HTTT Kinh tế. Hôm nay, nhóm xin trình bày dự án khởi nghiệp công nghệ du lịch: 'HUEGO – Cẩm nang số và công cụ lập lịch trình du lịch tự túc thông minh Cố đô Huế'. Chúng em đến đây để giải quyết bài toán lớn của du lịch Huế và kêu gọi 500 triệu VNĐ vòng Seed Round."
    },

    # SLIDE 2: GIỚI THIỆU CHUNG (OVERVIEW)
    {
        "bg": "scratch/heritage_slides/slide_bg_2.png",
        "elements": [
            {
                "rect": (52, 45, 880, 130),
                "texts": [("GIỚI THIỆU CHUNG", 48, True, C_NAVY, PP_ALIGN.LEFT)]
            },
            {
                "rect": (52, 195, 880, 240),
                "texts": [
                    ("Huế là trung tâm văn hóa di sản hàng đầu Việt Nam, thu hút hàng triệu du khách mỗi năm. Tuy nhiên, du khách tự túc vẫn đang đối mặt với nhiều rào cản về việc tìm kiếm thông tin chính thống và tối ưu hành trình.", 18, False, C_DARK, PP_ALIGN.LEFT),
                    ("", 10, False, C_DARK, PP_ALIGN.LEFT),
                    ("HUEGO ra đời với định vị là 'Trợ lý du lịch số thông minh', kết hợp thuật toán tối ưu lộ trình theo ngân sách, thuyết minh tự động GPS Audio Pass và trợ lý thích ứng thời tiết thực tế.", 18, True, C_BLUE, PP_ALIGN.LEFT),
                    ("", 10, False, C_DARK, PP_ALIGN.LEFT),
                    ("Mục tiêu: Đem lại trải nghiệm khám phá Huế tiện lợi, cá nhân hóa, tiết kiệm chi phí và mang đậm chiều sâu di sản.", 18, False, C_DARK, PP_ALIGN.LEFT)
                ]
            }
        ],
        "notes": "[0:35 - 1:15] Dương: Huế sở hữu kho tàng di sản khổng lồ nhưng trải nghiệm du lịch tự túc hiện nay còn manh mún. HUEGO sinh ra không chỉ là một app du lịch, mà là một 'Trợ lý số bản địa thông minh', giúp du khách giải quyết trọn vẹn từ khâu lên ngân sách, chọn quán ăn chuẩn vị, nghe thuyết minh di sản tự động đến linh hoạt đổi lịch khi trời mưa Huế."
    },

    # SLIDE 3: VẤN ĐỀ THỊ TRƯỜNG (PROBLEM)
    {
        "bg": "scratch/heritage_slides/slide_bg_3.png",
        "elements": [
            {
                "rect": (250, 70, 940, 130),
                "texts": [("VẤN ĐỀ THỊ TRƯỜNG", 48, True, C_NAVY, PP_ALIGN.CENTER)]
            },
            {
                "rect": (80, 215, 1280, 120),
                "texts": [
                    ("• 72% du khách tự túc gặp khó khăn khi tìm kiếm thông tin văn hóa chính thống và tối ưu thứ tự tham quan các di tích tại Huế.", 17, False, C_DARK, PP_ALIGN.LEFT),
                    ("• 71% e ngại phát sinh chi phí, bị 'chặt chém' dịch vụ ăn uống và di chuyển do thiếu công cụ dự toán ngân sách minh bạch.", 17, False, C_DARK, PP_ALIGN.LEFT),
                    ("• 62% du khách hoàn toàn bị động khi thời tiết mưa dầm đặc trưng của Cố Đô làm đảo lộn kế hoạch tham quan ngoài trời.", 17, False, C_DARK, PP_ALIGN.LEFT)
                ]
            }
        ],
        "notes": "[1:15 - 2:00] Dương: Khảo sát thực tế của nhóm chỉ ra 3 nỗi đau nhức nhối: Thứ nhất, 72% khách tự túc đi Huế như đi trong sương mù, không biết sắp xếp thứ tự Đại Nội và các Lăng thế nào cho tiện đường. Thứ hai, 71% lo bị chặt chém vì thiếu bảng giá minh bạch. Thứ ba, mưa Huế nổi tiếng làm hỏng lịch trình ngoài trời. Đây chính là khoảng trống thị trường khổng lồ."
    },

    # SLIDE 4: GIẢI PHÁP HUEGO (SOLUTION)
    {
        "bg": "scratch/heritage_slides/slide_bg_4.png",
        "elements": [
            {
                "rect": (680, 75, 710, 140),
                "texts": [("GIẢI PHÁP HUEGO", 48, True, C_NAVY, PP_ALIGN.RIGHT)]
            },
            {
                "rect": (1050, 480, 340, 290),
                "texts": [
                    ("1. Lập ngân sách 1-Click:", 17, True, C_BLUE, PP_ALIGN.LEFT),
                    ("Tự động tính chi phí thực tế và đề xuất lịch trình tối ưu cung đường.", 15, False, C_DARK, PP_ALIGN.LEFT),
                    ("", 8, False, C_DARK, PP_ALIGN.LEFT),
                    ("2. Audio Pass GPS:", 17, True, C_BLUE, PP_ALIGN.LEFT),
                    ("Tự động thuyết minh di sản đa ngôn ngữ ngay khi bước vào di tích.", 15, False, C_DARK, PP_ALIGN.LEFT),
                    ("", 8, False, C_DARK, PP_ALIGN.LEFT),
                    ("3. Trợ lý thời tiết Cố Đô:", 17, True, C_BLUE, PP_ALIGN.LEFT),
                    ("Tự động đổi điểm đến trong nhà (bảo tàng, ẩm thực) khi trời mưa.", 15, False, C_DARK, PP_ALIGN.LEFT)
                ]
            }
        ],
        "notes": "[2:00 - 2:50] Huỳnh Thế Trung: Về mặt công nghệ, em là Huỳnh Thế Trung - CTO. HUEGO mang đến 3 giải pháp đột phá: Một là bộ tính toán ngân sách 1-Click, nhập số tiền là có ngay lộ trình tối ưu. Hai là Audio Pass GPS định vị chính xác, tự động phát thuyết minh như có hướng dẫn viên riêng. Ba là thuật toán Dynamic Weather Routing thích ứng mưa nắng tức thì."
    },

    # SLIDE 5: THỊ TRƯỜNG MỤC TIÊU (MARKET SIZE)
    {
        "bg": "scratch/heritage_slides/slide_bg_5.png",
        "elements": [
            {
                "rect": (52, 45, 360, 400),
                "texts": [
                    ("THỊ", 64, True, C_NAVY, PP_ALIGN.LEFT),
                    ("TRƯỜNG", 64, True, C_NAVY, PP_ALIGN.LEFT),
                    ("MỤC TIÊU", 44, True, C_BLUE, PP_ALIGN.LEFT)
                ]
            },
            {
                "rect": (52, 540, 420, 240),
                "texts": [
                    ("• TAM (Tổng thị trường tiềm năng):", 16, True, C_BLUE, PP_ALIGN.LEFT),
                    ("180 Tỷ VNĐ / năm (Dựa trên 2,5 triệu lượt khách du lịch tự túc đến Huế).", 14, False, C_DARK, PP_ALIGN.LEFT),
                    ("• SAM (Thị trường khả dụng):", 16, True, C_BLUE, PP_ALIGN.LEFT),
                    ("36 Tỷ VNĐ (20% du khách tiếp cận và sẵn sàng chi trả ứng dụng du lịch số).", 14, False, C_DARK, PP_ALIGN.LEFT),
                    ("• SOM (Thị trường mục tiêu năm 1):", 16, True, C_BLUE, PP_ALIGN.LEFT),
                    ("360 Triệu VNĐ (Chiếm 1% thị phần với 8.000 giao dịch dịch vụ).", 14, False, C_DARK, PP_ALIGN.LEFT)
                ]
            }
        ],
        "notes": "[2:50 - 3:35] Lương Quang Hoàng Minh: Em là Hoàng Minh - COO. Dung lượng thị trường Huế cực kỳ hấp dẫn: TAM đạt 180 Tỷ VNĐ từ 2,5 triệu khách tự túc hàng năm. Với mục tiêu thực tế nhắm vào giới trẻ Gen Z và khách quốc tế, SAM là 36 Tỷ VNĐ. Năm đầu tiên, HUEGO chỉ cần chiếm 1% SOM, tương đương 360 Triệu VNĐ với 8.000 giao dịch là hoàn toàn khả thi."
    },

    # SLIDE 6: MÔ HÌNH DOANH THU (BUSINESS MODEL)
    {
        "bg": "scratch/heritage_slides/slide_bg_6.png",
        "elements": [
            {
                "rect": (52, 35, 360, 400),
                "texts": [
                    ("MÔ HÌNH", 64, True, C_NAVY, PP_ALIGN.LEFT),
                    ("DOANH", 64, True, C_NAVY, PP_ALIGN.LEFT),
                    ("THU", 64, True, C_BLUE, PP_ALIGN.LEFT)
                ]
            },
            {
                "rect": (1080, 480, 310, 280),
                "texts": [
                    ("1. Affiliate Booking (10-15%):", 16, True, C_BLUE, PP_ALIGN.LEFT),
                    ("Hoa hồng từ đặt bàn ăn uống, vé tham quan, trải nghiệm và lưu trú.", 14, False, C_DARK, PP_ALIGN.LEFT),
                    ("", 8, False, C_DARK, PP_ALIGN.LEFT),
                    ("2. Audio Pass Freemium:", 16, True, C_BLUE, PP_ALIGN.LEFT),
                    ("Bán gói thuyết minh sâu 29k - 59k/tuyến điểm di tích Cố Đô.", 14, False, C_DARK, PP_ALIGN.LEFT),
                    ("", 8, False, C_DARK, PP_ALIGN.LEFT),
                    ("3. Local Merchant (B2B):", 16, True, C_BLUE, PP_ALIGN.LEFT),
                    ("Phí đăng ký hiển thị ưu tiên cho quán ăn, đặc sản Huế (199k - 499k/tháng).", 14, False, C_DARK, PP_ALIGN.LEFT)
                ]
            }
        ],
        "notes": "[3:35 - 4:20] Trương Hữu Anh Quốc: Em là Anh Quốc - CFO. HUEGO không phụ thuộc vào một nguồn thu duy nhất mà xây dựng 3 trụ cột doanh thu vững chắc: B2C qua bán Audio Pass GPS từ 29k; B2B2C qua phí hoa hồng Affiliate 10-15% kết nối trực tiếp nhà hàng và vé thắng cảnh; và B2B từ gói Local Merchant dành cho các hộ kinh doanh đặc sản Huế muốn tiếp cận du khách chuẩn tệp."
    },

    # SLIDE 7: ĐỘI NGŨ SÁNG LẬP (TEAM)
    {
        "bg": "scratch/heritage_slides/slide_bg_7.png",
        "elements": [
            {
                "rect": (1060, 45, 330, 580),
                "texts": [
                    ("ĐỘI", 64, True, C_NAVY, PP_ALIGN.RIGHT),
                    ("NGŨ", 64, True, C_NAVY, PP_ALIGN.RIGHT),
                    ("SÁNG", 64, True, C_NAVY, PP_ALIGN.RIGHT),
                    ("LẬP", 64, True, C_NAVY, PP_ALIGN.RIGHT),
                    ("NHÓM 4", 36, True, C_BLUE, PP_ALIGN.RIGHT)
                ]
            },
            {
                "rect": (52, 275, 350, 120),
                "texts": [
                    ("Hoàng Đức Dương – Leader / CEO", 16, True, C_NAVY, PP_ALIGN.LEFT),
                    ("Quản trị chiến lược dự án, phát triển quan hệ đối tác văn hóa & điều phối tổng thể.", 14, False, C_DARK, PP_ALIGN.LEFT)
                ]
            },
            {
                "rect": (52, 420, 350, 160),
                "texts": [
                    ("Huỳnh Thế Trung – CTO", 16, True, C_BLUE, PP_ALIGN.LEFT),
                    ("Kiến trúc công nghệ Web/App, phát triển thuật toán định vị GPS Audio Pass và công cụ lập lịch trình.", 14, False, C_DARK, PP_ALIGN.LEFT)
                ]
            },
            {
                "rect": (52, 620, 350, 160),
                "texts": [
                    ("Minh (COO) & Quốc (CMO/CFO)", 16, True, C_DARK, PP_ALIGN.LEFT),
                    ("Quản trị nội dung di sản số, triển khai chiến dịch tiếp thị sinh viên và kế hoạch tài chính – dòng tiền.", 14, False, C_DARK, PP_ALIGN.LEFT)
                ]
            }
        ],
        "notes": "[4:20 - 5:10] Dương: Sức mạnh của HUEGO đến từ sự bổ trợ hoàn hảo của 4 thành viên Khoa HTTT Kinh tế: Em đảm nhiệm điều hành và liên kết đối tác địa phương; Trung chịu trách nhiệm kiến trúc kỹ thuật phần mềm; Minh vận hành nội dung chuẩn hóa văn hóa di sản; và Quốc phụ trách tài chính và tiếp thị tăng trưởng."
    },

    # SLIDE 8: HIỆU QUẢ TÀI CHÍNH & BEP (FINANCE)
    {
        "bg": "scratch/heritage_slides/slide_bg_8.png",
        "elements": [
            {
                "rect": (250, 35, 940, 140),
                "texts": [("HIỆU QUẢ TÀI CHÍNH & ĐIỂM HÒA VỐN", 44, True, C_NAVY, PP_ALIGN.CENTER)]
            },
            {
                "rect": (60, 650, 1320, 120),
                "texts": [
                    ("• Kinh tế đơn vị (Unit Economics): Đơn giá trung bình (AOV): 45.000đ | Chi phí biến đổi (AVC): 9.000đ | Biên đóng góp (Contribution Margin): 80%.", 16, True, C_BLUE, PP_ALIGN.LEFT),
                    ("• Định phí vận hành (TFC): 13.000.000đ/tháng (Chi phí hạ tầng Cloud Server, Google Maps/Mapbox API, nội dung di sản và hành chính).", 15, False, C_DARK, PP_ALIGN.LEFT),
                    ("• Điểm hòa vốn (BEP): 361 giao dịch/tháng (tương đương chỉ 12 giao dịch/ngày) — HUEGO đạt mốc hòa vốn tự chủ dòng tiền từ tháng thứ 4.", 16, True, C_GOLD, PP_ALIGN.LEFT)
                ]
            }
        ],
        "notes": "[5:10 - 6:00] Quốc: Về bức tranh tài chính, HUEGO là mô hình cực kỳ tinh gọn: Với mỗi giao dịch 45k, chi phí biến đổi chỉ 9k cho server và cổng thanh toán, mang lại biên đóng góp lên tới 80%. Định phí mỗi tháng chỉ 13 triệu VNĐ. Do đó, điểm hòa vốn chỉ là 361 đơn/tháng — tương đương 12 đơn mỗi ngày. Đây là con số cực kỳ an toàn trên thị trường 2,5 triệu lượt khách."
    },

    # SLIDE 9: KÊU GỌI ĐẦU TƯ (ASK & MILESTONES)
    {
        "bg": "scratch/heritage_slides/slide_bg_9.png",
        "elements": [
            {
                "rect": (400, 520, 640, 130),
                "texts": [("KÊU GỌI ĐẦU TƯ (SEED ROUND)", 44, True, C_NAVY, PP_ALIGN.CENTER)]
            },
            {
                "rect": (60, 650, 1320, 120),
                "texts": [
                    ("• Kêu gọi 500 Triệu VNĐ đổi lấy 10% - 15% cổ phần (Định giá doanh nghiệp Pre-money: 3,5 Tỷ VNĐ).", 17, True, C_BLUE, PP_ALIGN.CENTER),
                    ("• Phân bổ nguồn vốn: 40% Nâng cấp sản phẩm & GPS Audio Pass | 35% Tiếp thị du khách & Merchant | 25% Chi phí vận hành năm 1.", 15, False, C_DARK, PP_ALIGN.CENTER),
                    ("• Cam kết 12 tháng: 8.000 giao dịch thành công, doanh thu 360 Triệu VNĐ, trở thành cẩm nang du lịch tự túc số 1 tại Huế.", 16, True, C_GOLD, PP_ALIGN.CENTER)
                ]
            }
        ],
        "notes": "[6:00 - 6:50] Dương: Để hiện thực hóa mục tiêu, HUEGO kêu gọi 500 triệu VNĐ cho 10-15% cổ phần, tương ứng mức định giá Pre-money 3,5 Tỷ VNĐ. Nguồn vốn được phân bổ minh bạch: 40% hoàn thiện sản phẩm công nghệ, 35% truyền thông tại điểm đến và 25% vận hành. Chúng em cam kết cột mốc 8.000 giao dịch và tự chủ hoàn toàn dòng tiền trong 12 tháng tới."
    },

    # SLIDE 10: XIN CẢM ƠN (CLOSING & Q&A)
    {
        "bg": "scratch/heritage_slides/slide_bg_10.png",
        "elements": [
            {
                "rect": (550, 55, 340, 50),
                "texts": [("HUEGO | PHIÊN PHẢN BIỆN Q&A", 16, True, C_WHITE, PP_ALIGN.CENTER)]
            },
            {
                "rect": (150, 560, 1140, 160),
                "texts": [
                    ("KÍNH MỜI QUÝ THẦY CÔ VÀ BAN GIÁM KHẢO ĐẶT CÂU HỎI CHO NHÓM 4!", 22, True, C_WHITE, PP_ALIGN.CENTER),
                    ("", 10, False, C_WHITE, PP_ALIGN.CENTER),
                    ("Khoa Hệ thống Thông tin Kinh tế – Trường Đại học Kinh tế, Đại học Huế", 16, False, C_WHITE, PP_ALIGN.CENTER),
                    ("Website trải nghiệm: http://localhost:3000 | Hotline: 0905.xxx.xxx", 14, True, C_GOLD, PP_ALIGN.CENTER)
                ]
            }
        ],
        "notes": "[6:50 - 7:15] Dương: Chúng em xin chân thành cảm ơn Quý Thầy Cô và Hội đồng Ban Giám khảo đã lắng nghe. HUEGO tin rằng di sản Cố Đô Huế xứng đáng có một cẩm nang số xứng tầm để lan tỏa giá trị đến du khách trong và ngoài nước. Sau đây, Nhóm 4 xin sẵn sàng bước vào phiên phản biện Q&A!"
    },

    # SLIDE 11: APPENDIX Q&A 1 - COMPETITION & MOAT
    {
        "bg": "scratch/heritage_slides/slide_bg_2.png",
        "elements": [
            {
                "rect": (52, 40, 940, 110),
                "texts": [("PHỤ LỤC Q&A 1: CẠNH TRANH VỚI KLOOK & TRAVELOKA", 34, True, C_NAVY, PP_ALIGN.LEFT)]
            },
            {
                "rect": (52, 160, 900, 360),
                "texts": [
                    ("Câu hỏi: 'Nếu Klook hay Traveloka đưa tính năng tương tự vào Huế thì HUEGO cạnh tranh ra sao?'", 16, True, C_GOLD, PP_ALIGN.LEFT),
                    ("", 8, False, C_DARK, PP_ALIGN.LEFT),
                    ("1. THỪA NHẬN (Concede):", 16, True, C_BLUE, PP_ALIGN.LEFT),
                    ("OTA lớn áp đảo về vốn, thương hiệu và mảng vé máy bay, khách sạn 4-5 sao.", 15, False, C_DARK, PP_ALIGN.LEFT),
                    ("2. DỮ LIỆU (Data):", 16, True, C_BLUE, PP_ALIGN.LEFT),
                    ("Huế chiếm < 2% doanh thu OTA cả nước. Họ không thể cử nhân sự bản địa đi thu thập dữ liệu ngách từng quán bún bò hay thu âm audio guide độc quyền từng lăng tẩm.", 15, False, C_DARK, PP_ALIGN.LEFT),
                    ("3. KHẲNG ĐỊNH (Affirm):", 16, True, C_BLUE, PP_ALIGN.LEFT),
                    ("HUEGO sở hữu con hào bản địa (Hyper-local Moat), liên kết chặt chẽ quán ăn địa phương và dẫn đầu phân khúc On-trip cẩm nang số chuyên sâu tại Huế.", 15, False, C_DARK, PP_ALIGN.LEFT)
                ]
            }
        ],
        "notes": "[Phụ lục Q&A 1] Dương / Trung: Trả lời giảng viên theo công thức T - D - K: 1. Thừa nhận OTA lớn mạnh về vốn và vé máy bay. 2. Dữ liệu chứng minh Huế quá nhỏ (<2%) để OTA lớn cử đội ngũ bản địa xây cẩm nang ngách. 3. Khẳng định HUEGO phòng thủ bằng dữ liệu bản địa độc quyền và chi phí vận hành tinh gọn."
    },

    # SLIDE 12: APPENDIX Q&A 2 - 500M SEED FEASIBILITY
    {
        "bg": "scratch/heritage_slides/slide_bg_8.png",
        "elements": [
            {
                "rect": (150, 35, 1140, 110),
                "texts": [("PHỤ LỤC Q&A 2: TÍNH KHẢ THI VÀ RUNWAY CỦA VỐN 500 TRIỆU", 34, True, C_NAVY, PP_ALIGN.CENTER)]
            },
            {
                "rect": (60, 620, 1320, 160),
                "texts": [
                    ("Câu hỏi: '500 triệu có quá ít để triển khai công nghệ và sống sót qua năm đầu không?'", 16, True, C_GOLD, PP_ALIGN.LEFT),
                    ("1. THỪA NHẬN: 500 triệu không đủ cho mô hình 'đốt tiền' quảng cáo hay trợ giá người dùng như Grab.", 14, False, C_DARK, PP_ALIGN.LEFT),
                    ("2. DỮ LIỆU: HUEGO vận hành Lean TravelTech: Định phí chỉ 13 triệu/tháng, biên đóng góp 80%. Số vốn 500 triệu đảm bảo thời gian sống sót (Runway) lên tới 18 - 24 tháng kể cả khi doanh thu bằng 0.", 14, False, C_DARK, PP_ALIGN.LEFT),
                    ("3. KHẲNG ĐỊNH: HUEGO chỉ cần 12 đơn/ngày (361 đơn/tháng) trên 2,5 triệu khách du lịch là đã hoàn toàn tự chủ dòng tiền mà không cần gọi vốn thêm.", 15, True, C_BLUE, PP_ALIGN.LEFT)
                ]
            }
        ],
        "notes": "[Phụ lục Q&A 2] Quốc / Dương: Trả lời giảng viên theo công thức T - D - K: 1. Thừa nhận 500 triệu không đủ nếu đốt tiền. 2. Dữ liệu chứng minh định phí chỉ 13 triệu/tháng, đảm bảo Runway 18-24 tháng an toàn tuyệt đối. 3. Khẳng định mốc 12 đơn/ngày là đạt hòa vốn tự sinh tồn."
    }
]

# Generate PowerPoint slides
for idx, sdata in enumerate(slides_data):
    slide = prs.slides.add_slide(blank_layout)
    
    # Add background image
    if os.path.exists(sdata["bg"]):
        slide.shapes.add_picture(sdata["bg"], 0, 0, prs.slide_width, prs.slide_height)
    
    # Add text elements
    for el in sdata["elements"]:
        rx, ry, rw, rh = el["rect"]
        tx_box = slide.shapes.add_textbox(pt_x(rx), pt_y(ry), pt_w(rw), pt_h(rh))
        tf = tx_box.text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.05)
        tf.margin_right = Inches(0.05)
        tf.margin_top = Inches(0.05)
        tf.margin_bottom = Inches(0.05)
        
        for p_idx, (text_content, font_size, is_bold, text_color, align_mode) in enumerate(el["texts"]):
            p = tf.paragraphs[0] if p_idx == 0 else tf.add_paragraph()
            p.text = text_content
            p.alignment = align_mode
            p.font.name = "Segoe UI"
            p.font.size = Pt(font_size)
            p.font.bold = is_bold
            p.font.color.rgb = text_color
    
    # Add Speaker Notes
    notes_slide = slide.notes_slide
    notes_tf = notes_slide.notes_text_frame
    notes_tf.text = sdata["notes"]

pptx_output = r'C:\Lap_Trinh_Ung_dung\huego_pitch_deck.pptx'
prs.save(pptx_output)
print(f"PPTX saved successfully: {pptx_output} ({len(prs.slides)} slides)")
