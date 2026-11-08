import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_deck():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Color Palette
    C_BG = RGBColor(11, 15, 26)           # Deep Obsidian #0B0F1A
    C_CARD = RGBColor(20, 27, 46)         # Dark Surface #141B2E
    C_CARD_HI = RGBColor(28, 36, 62)      # Highlight Card
    C_BORDER = RGBColor(40, 52, 85)       # Subtle Border
    C_VIOLET = RGBColor(139, 92, 246)     # Royal Purple #8B5CF6
    C_VIOLET_LT = RGBColor(196, 181, 253) # Light Purple #C4B5FD
    C_GOLD = RGBColor(245, 158, 11)       # Imperial Gold #F59E0B
    C_GOLD_LT = RGBColor(253, 230, 138)   # Light Gold #FDE68A
    C_GREEN = RGBColor(16, 185, 129)      # Emerald #10B981
    C_GREEN_LT = RGBColor(110, 231, 183)  # Light Green #6EE7B7
    C_RED = RGBColor(239, 68, 68)         # Red
    C_WHITE = RGBColor(255, 255, 255)
    C_MUTED = RGBColor(148, 163, 184)     # Silver #94A3B8

    def add_bg(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = C_BG
        bg.line.fill.background()
        return bg

    def add_header(slide, eyebrow_text, title_text, time_text, is_gold=False):
        # Eyebrow
        eyebrow_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.45), Inches(8), Inches(0.35))
        tf = eyebrow_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        p = tf.paragraphs[0]
        p.text = eyebrow_text.upper()
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = C_GOLD_LT if is_gold else C_VIOLET_LT

        # Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.8), Inches(9.5), Inches(0.8))
        tf = title_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        p = tf.paragraphs[0]
        p.text = title_text
        p.font.size = Pt(22)
        p.font.bold = True
        p.font.color.rgb = C_WHITE

        # Timing tag
        time_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(10.5), Inches(0.65), Inches(2.0), Inches(0.4))
        time_box.fill.solid()
        time_box.fill.fore_color.rgb = C_CARD
        time_box.line.color.rgb = C_BORDER
        tf = time_box.text_frame
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        p = tf.paragraphs[0]
        p.text = time_text
        p.font.size = Pt(9.5)
        p.font.bold = True
        p.font.color.rgb = C_MUTED
        p.alignment = PP_ALIGN.CENTER

    def add_notes(slide, notes_text):
        slide.notes_slide.notes_text_frame.text = notes_text

    # ==========================================================
    # SLIDE 1: COVER
    # ==========================================================
    s1 = prs.slides.add_slide(blank_layout)
    add_bg(s1)

    # Left content box
    left_box = s1.shapes.add_textbox(Inches(0.8), Inches(1.0), Inches(7.5), Inches(5.5))
    tf = left_box.text_frame
    tf.word_wrap = True
    
    p = tf.paragraphs[0]
    p.text = "KHỞI NGHIỆP ĐỔI MỚI SÁNG TẠO • SEED ROUND PITCH"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_GOLD_LT

    p2 = tf.add_paragraph()
    p2.text = "HUEGO"
    p2.font.size = Pt(54)
    p2.font.bold = True
    p2.font.color.rgb = C_WHITE
    p2.space_after = Pt(10)

    p3 = tf.add_paragraph()
    p3.text = "“Chạm văn hóa – Tự do khám phá – Tiết kiệm chi phí”"
    p3.font.size = Pt(20)
    p3.font.italic = True
    p3.font.bold = True
    p3.font.color.rgb = C_GOLD_LT
    p3.space_after = Pt(14)

    p4 = tf.add_paragraph()
    p4.text = "Cẩm nang số & Công cụ lập lịch trình du lịch tự túc thông minh Cố đô Huế.\nTích hợp Trip Budget Calculator, Audio Guide GPS 35m & Bộ lọc thích ứng mưa 1-Click."
    p4.font.size = Pt(13)
    p4.font.color.rgb = C_MUTED
    p4.space_after = Pt(20)

    p5 = tf.add_paragraph()
    p5.text = "Nhóm thực hiện: Nhóm 4 — K57 Tin học Kinh tế, ĐH Kinh tế – ĐH Huế\nTrưởng nhóm (Founder & CEO): Hoàng Đức Dương\nĐồng sáng lập: Huỳnh Thế Trung (CTO) • Lương Quang Hoàng Minh (COO) • Trương Hữu Anh Quốc (CMO/CFO)"
    p5.font.size = Pt(11.5)
    p5.font.color.rgb = C_VIOLET_LT

    # Right Image
    img_path = "web-hue4u/public/images/pois/ngo-mon.jpg"
    if os.path.exists(img_path):
        s1.shapes.add_picture(img_path, Inches(8.5), Inches(1.3), width=Inches(4.0))

    # QR badge card
    qr_card = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.5), Inches(4.7), Inches(4.0), Inches(1.3))
    qr_card.fill.solid()
    qr_card.fill.fore_color.rgb = C_CARD
    qr_card.line.color.rgb = C_BORDER
    
    qr_path = "QR_HUEGO_WEB.png"
    if os.path.exists(qr_path):
        s1.shapes.add_picture(qr_path, Inches(8.7), Inches(4.85), width=Inches(1.0))
    
    qr_text = s1.shapes.add_textbox(Inches(9.9), Inches(4.85), Inches(2.4), Inches(1.0))
    tf_qr = qr_text.text_frame
    tf_qr.word_wrap = True
    p_qr = tf_qr.paragraphs[0]
    p_qr.text = "MVP HOÀN TẤT THỰC ĐỊA\n100 du khách thử nghiệm\nQuét QR trải nghiệm Web/PWA"
    p_qr.font.size = Pt(10)
    p_qr.font.color.rgb = C_GREEN_LT

    add_notes(s1, "[00:00 - 00:30 | 30 giây] - Bìa & Khẩu hiệu:\nKính chào Thầy/Cô và Hội đồng Giám khảo! Em là Hoàng Đức Dương, đại diện Nhóm 4 gồm 4 thành viên sáng lập dự án HUEGO – Cẩm nang số và công cụ lập lịch trình du lịch tự túc thông minh Cố đô Huế. Với khẩu hiệu 'Chạm văn hóa – Tự do khám phá – Tiết kiệm chi phí', HUEGO sinh ra để giải quyết triệt để những nỗi đau lớn nhất của khách tự túc, biến hành trình khám phá di sản Huế trở nên dễ dàng, thấu cảm và tối ưu chi phí hơn bao giờ hết!")

    # ==========================================================
    # SLIDE 2: NỖI ĐAU THỊ TRƯỜNG
    # ==========================================================
    s2 = prs.slides.add_slide(blank_layout)
    add_bg(s2)
    add_header(s2, "THE PROBLEM", "3 Nỗi Đau Lớn Của 72% Du Khách Tự Túc Tại Huế", "⏱️ 00:30 - 01:15 (45s)")

    problems = [
        ("web-hue4u/public/images/pois/bao-tang-co-vat-cung-dinh-hue.jpg", "72%", C_VIOLET_LT, "RÀO CẢN PHÍ THUYẾT MINH",
         ["Thuê HDV riêng tại di tích: 500k – 1 triệu/buổi (quá đắt cho sinh viên).", "Tự đi thì 'cưỡi ngựa xem hoa', không hiểu chiều sâu lịch sử 13 triều vua Nguyễn."]),
        ("web-hue4u/public/images/pois/cau-trang-tien.jpg", "71%", C_GOLD_LT, "VỠ KẾ HOẠCH DO MƯA HUẾ",
         ["Mưa dầm xứ Huế kéo dài 5 tháng/năm (T9–T1), du khách bị động chôn chân ở phòng.", "Thiếu công cụ gợi ý tức thì các điểm đến trong nhà (Indoor) ấm cúng và workshop."]),
        ("web-hue4u/public/images/pois/bun-bo-hue.jpg", "62%", C_GREEN_LT, "VỠ TRẬN NGÂN SÁCH DỰ KIẾN",
         ["Chi tiêu thực tế vượt 30% – 50% do giá vé phân tán và lộ trình đi lòng vòng.", "Bị nhiễu bởi review quảng cáo ảo, bỏ lỡ các quán kiệt hẻm bản địa ngon - rẻ chuẩn vị."])
    ]

    for idx, (img, stat, stat_color, title, bullets) in enumerate(problems):
        left_pos = Inches(0.8 + idx * 4.0)
        card = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left_pos, Inches(1.8), Inches(3.7), Inches(4.9))
        card.fill.solid()
        card.fill.fore_color.rgb = C_CARD
        card.line.color.rgb = C_BORDER

        if os.path.exists(img):
            s2.shapes.add_picture(img, left_pos + Inches(0.15), Inches(1.95), width=Inches(3.4), height=Inches(1.5))

        tb = s2.shapes.add_textbox(left_pos + Inches(0.2), Inches(3.6), Inches(3.3), Inches(2.9))
        tf = tb.text_frame
        tf.word_wrap = True
        
        p = tf.paragraphs[0]
        p.text = stat
        p.font.size = Pt(36)
        p.font.bold = True
        p.font.color.rgb = stat_color

        p2 = tf.add_paragraph()
        p2.text = title
        p2.font.size = Pt(11)
        p2.font.bold = True
        p2.font.color.rgb = C_MUTED
        p2.space_after = Pt(8)

        for b in bullets:
            pb = tf.add_paragraph()
            pb.text = "• " + b
            pb.font.size = Pt(10.5)
            pb.font.color.rgb = C_WHITE
            pb.space_after = Pt(4)

    add_notes(s2, "[00:30 - 01:15 | 45 giây] - Nỗi đau thị trường:\nThưa Thầy/Cô, qua khảo sát The Mom Test trên 100 du khách tự túc đến Huế, chúng em phát hiện 3 nghịch lý đau đầu: Thứ nhất, 72% khách khao khát hiểu lịch sử Cố đô nhưng chi phí thuê HDV riêng quá đắt (500k-1 triệu/buổi), vượt quá túi tiền. Thứ hai, 71% khách bị vỡ hoàn toàn lịch trình khi gặp mưa dầm đặc thù xứ Huế, không biết đi đâu ngoài việc chôn chân ở phòng. Thứ ba, 62% khách bị vỡ ngân sách từ 30-50% do phát sinh chi phí phân mảnh và lạc vào các quán review quảng cáo ảo. Huế rất đẹp, nhưng khách tự túc đang thiếu một người bạn đồng hành số thực sự am hiểu!")

    # ==========================================================
    # SLIDE 3: GIẢI PHÁP HUEGO
    # ==========================================================
    s3 = prs.slides.add_slide(blank_layout)
    add_bg(s3)
    add_header(s3, "THE SOLUTION", "HUEGO — Nền Tảng Lean TravelTech Tinh Gọn", "⏱️ 01:15 - 02:05 (50s)")

    solutions = [
        (None, "TRIP BUDGET CALCULATOR", "TÍNH NĂNG ĐỘC QUYỀN", C_VIOLET,
         ["Kéo thả lịch trình: Tự động tính tổng tiền vé di tích, xăng xe & ẩm thực min-max.",
          "Cảnh báo vượt chi tiêu: Tự động gợi ý điểm thay thế tương đương khớp với túi tiền.",
          "Chia sẻ 1 chạm: Gửi toàn bộ lộ trình qua URL Hash mà không cần tạo tài khoản."]),
        ("web-hue4u/public/images/pois/non-la-hue.jpg", "AUDIO PASS GPS 35M", "CÔNG NGHỆ BỎ TÚI", C_GOLD,
         ["Tự phát thuyết minh: Cất giọng đọc Cố đô khi bước vào bán kính di tích 35m.",
          "Phí vi mô chỉ 29.000đ: Rẻ hơn 20 lần so với thuê hướng dẫn viên riêng.",
          "50+ bài audio bản quyền: Chuẩn hóa lịch sử 13 triều vua Nguyễn và làng nghề."]),
        ("web-hue4u/public/images/pois/nha-ruong-hue.jpg", "WEATHER 1-CLICK & GREEN", "THÍCH ỨNG & DU LỊCH XANH", C_GREEN,
         ["1-Click chuyển mưa/nắng: Lập tức chuyển sang điểm Indoor: Bảo tàng, Trà đình, Làng nghề.",
          "Tích điểm Green Points: Đi bộ, đạp xe quét QR nhận E-Certificate Đại sứ Di sản.",
          "Bảo tàng Cổ vật 3D: Xoay 360° Cửu Đỉnh, Ngai vàng triều Nguyễn (.glb < 2MB)."])
    ]

    for idx, (img, title, tag, border_color, bullets) in enumerate(solutions):
        left_pos = Inches(0.8 + idx * 4.0)
        card = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left_pos, Inches(1.8), Inches(3.7), Inches(4.9))
        card.fill.solid()
        card.fill.fore_color.rgb = C_CARD
        card.line.color.rgb = border_color
        card.line.width = Pt(1.5)

        curr_top = Inches(2.0)
        if img and os.path.exists(img):
            s3.shapes.add_picture(img, left_pos + Inches(0.15), curr_top, width=Inches(3.4), height=Inches(1.5))
            curr_top = Inches(3.65)
        else:
            # Highlight badge box
            hl = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left_pos + Inches(0.2), curr_top, Inches(3.3), Inches(1.3))
            hl.fill.solid()
            hl.fill.fore_color.rgb = C_CARD_HI
            hl.line.color.rgb = C_VIOLET
            tf_hl = hl.text_frame
            tf_hl.word_wrap = True
            p1 = tf_hl.paragraphs[0]
            p1.text = "ĐỘC QUYỀN TRÊN NỀN TẢNG"
            p1.font.size = Pt(9.5)
            p1.font.bold = True
            p1.font.color.rgb = C_VIOLET_LT
            p1.alignment = PP_ALIGN.CENTER
            p2 = tf_hl.add_paragraph()
            p2.text = "Trip Budget Calculator"
            p2.font.size = Pt(14)
            p2.font.bold = True
            p2.font.color.rgb = C_WHITE
            p2.alignment = PP_ALIGN.CENTER
            curr_top = Inches(3.5)

        tb = s3.shapes.add_textbox(left_pos + Inches(0.2), curr_top, Inches(3.3), Inches(3.0))
        tf = tb.text_frame
        tf.word_wrap = True
        
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(12)
        p.font.bold = True
        p.font.color.rgb = C_WHITE
        p.space_after = Pt(8)

        for b in bullets:
            pb = tf.add_paragraph()
            pb.text = "✓ " + b
            pb.font.size = Pt(10.5)
            pb.font.color.rgb = C_MUTED
            pb.space_after = Pt(6)

    add_notes(s3, "[01:15 - 02:05 | 50 giây] - Giải pháp HUEGO:\nHUEGO chính là câu trả lời toàn diện! Chúng em xây dựng một nền tảng Web PWA siêu nhẹ, tải nhanh dưới 1,5 giây mà không bắt khách phải tải app rườm rà. Nền tảng sở hữu 3 vũ khí vượt trội: Thứ nhất là Trip Budget Calculator – công cụ độc quyền cho phép kéo thả lịch trình và tự động tính toán tổng chi phí vé, ẩm thực, xăng xe, đồng thời cảnh báo khi vượt ngân sách. Thứ hai là Audio Pass GPS 35m – khi khách bước đến gần di tích, hệ thống tự động cất giọng đọc Huế trầm ấm thuyết minh câu chuyện lịch sử với mức phí chỉ 29.000đ, rẻ hơn 20 lần thuê HDV! Và thứ ba là Bộ lọc thời tiết 1-Click – khi trời mưa, chỉ 1 chạm là lịch trình tự động chuyển sang các điểm trong nhà ấm cúng như bảo tàng, quán trà và workshop làm nón, làm hoa giấy truyền thống!")

    # ==========================================================
    # SLIDE 4: QUY MÔ THỊ TRƯỜNG TAM - SAM - SOM
    # ==========================================================
    s4 = prs.slides.add_slide(blank_layout)
    add_bg(s4)
    add_header(s4, "MARKET SIZE", "Dung Lượng Thị Trường Du Lịch TAM – SAM – SOM", "⏱️ 02:05 - 02:50 (45s)")

    # Left: 3 cards
    tam_sam_som = [
        ("TAM (TỔNG THỊ TRƯỜNG KHẢ DỤNG)", "180 TỶ Đ", C_VIOLET_LT, "3.6 triệu lượt khách đến Huế/năm × 50.000đ ngân sách tiện ích thông tin số."),
        ("SAM (THỊ TRƯỜNG MỤC TIÊU)", "36,0 TỶ Đ", C_GOLD_LT, "800.000 lượt khách tự túc Gen Z và gia đình trẻ (20% TAM) có hành vi số hóa cao."),
        ("SOM NĂM 1 (THỊ PHẦN CHIẾM LĨNH)", "360 TRIỆU Đ", C_GREEN_LT, "Thâm nhập thận trọng 1,0% SAM (8.000 giao dịch AOV 45.000đ trong năm đầu).")
    ]

    for idx, (label, val, val_color, desc) in enumerate(tam_sam_som):
        card = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8 + idx * 1.6), Inches(7.2), Inches(1.4))
        card.fill.solid()
        card.fill.fore_color.rgb = C_CARD
        card.line.color.rgb = C_BORDER

        tb = s4.shapes.add_textbox(Inches(1.0), Inches(1.9 + idx * 1.6), Inches(6.8), Inches(1.2))
        tf = tb.text_frame
        tf.word_wrap = True
        
        p = tf.paragraphs[0]
        p.text = f"{label}: {val}"
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = val_color

        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(11)
        p2.font.color.rgb = C_MUTED
        p2.space_before = Pt(4)

    # Right: Market share growth card
    right_card = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.3), Inches(1.8), Inches(4.2), Inches(4.6))
    right_card.fill.solid()
    right_card.fill.fore_color.rgb = C_CARD_HI
    right_card.line.color.rgb = C_VIOLET
    
    tf_rc = right_card.text_frame
    tf_rc.word_wrap = True
    p = tf_rc.paragraphs[0]
    p.text = "LỘ TRÌNH THÂM NHẬP THỊ PHẦN"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = C_GOLD_LT
    p.space_after = Pt(14)

    shares = [
        ("Năm 1 (Thâm nhập nền tảng):", "1,0% SAM", "➔ Doanh thu: 360 Triệu VNĐ"),
        ("Năm 2 (Mở rộng cộng đồng):", "2,2% SAM", "➔ Doanh thu: 820 Triệu VNĐ"),
        ("Năm 3 (Đạt điểm hòa vốn):", "3,5% SAM", "➔ Doanh thu: 1,45 Tỷ VNĐ"),
        ("Năm 5 (Chiếm lĩnh Cố đô):", "9,7% SAM", "➔ Doanh thu: 3,50 Tỷ VNĐ")
    ]
    for stage, pct, rev in shares:
        p_st = tf_rc.add_paragraph()
        p_st.text = f"• {stage} {pct}\n  {rev}"
        p_st.font.size = Pt(11)
        p_st.font.color.rgb = C_WHITE
        p_st.space_after = Pt(8)

    add_notes(s4, "[02:05 - 02:50 | 45 giây] - Quy mô thị trường:\nQuy mô thị trường du lịch Huế đang mở ra cơ hội cực kỳ lớn. Với 3,6 triệu lượt khách mỗi năm, tổng dung lượng thị trường tiện ích số TAM đạt 180 tỷ đồng. Trong đó, phân khúc khách tự túc trẻ và gia đình nhỏ chiếm thị trường mục tiêu SAM 36 tỷ đồng. Trong năm đầu tiên, HUEGO chỉ cần thâm nhập thận trọng 1,0% SAM, tương đương 8.000 giao dịch với giá trị đơn hàng trung bình 45.000đ là đã đạt doanh thu SOM 360 triệu đồng. Tỷ lệ này sẽ tăng trưởng lên 3,5% ở Năm 3 và đạt gần 10% ở Năm 5!")

    # ==========================================================
    # SLIDE 5: SẢN PHẨM & CÔNG NGHỆ
    # ==========================================================
    s5 = prs.slides.add_slide(blank_layout)
    add_bg(s5)
    add_header(s5, "TECH ARCHITECTURE", "Kiến Trúc PWA & PostGIS Tinh Gọn", "⏱️ 02:50 - 03:35 (45s)")

    tech_pillars = [
        ("FRONTEND LAYER", "PWA Web Siêu Tốc", C_VIOLET_LT,
         ["Tải trang < 1.5s trên mạng 4G.", "Không cần tải qua App Store / CH Play.", "Lưu cache offline bằng Service Worker."]),
        ("SPATIAL ENGINE", "PostGIS 3.4 & Leaflet", RGBColor(96, 165, 250),
         ["150+ POIs tinh chọn kèm GPS chuẩn.", "Hàm ST_DWithin quét radar 35m.", "Sai số GPS thực nghiệm < 3 mét."]),
        ("SMART ALGORITHM", "Định Tuyến & Chi Phí", C_GOLD_LT,
         ["Tối ưu thứ tự cung đường ngắn nhất.", "Định toán chi phí thực tế min-max.", "Mã hóa lưu trữ trực tiếp trên URL hash."]),
        ("DIGITAL ASSETS", "3D & Audio TTS", C_GREEN_LT,
         ["50+ Audio bài học lịch sử Cố đô.", "Mô hình 3D cổ vật nén nhẹ < 2MB.", "Tạo file PDF E-Certificate QR động."])
    ]

    for idx, (tag, title, color, items) in enumerate(tech_pillars):
        left_pos = Inches(0.8 + idx * 2.95)
        card = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left_pos, Inches(1.8), Inches(2.75), Inches(4.9))
        card.fill.solid()
        card.fill.fore_color.rgb = C_CARD
        card.line.color.rgb = C_BORDER

        tb = s5.shapes.add_textbox(left_pos + Inches(0.15), Inches(2.0), Inches(2.45), Inches(4.5))
        tf = tb.text_frame
        tf.word_wrap = True
        
        p = tf.paragraphs[0]
        p.text = tag
        p.font.size = Pt(9.5)
        p.font.bold = True
        p.font.color.rgb = color

        p2 = tf.add_paragraph()
        p2.text = title
        p2.font.size = Pt(13)
        p2.font.bold = True
        p2.font.color.rgb = C_WHITE
        p2.space_after = Pt(10)

        for item in items:
            pi = tf.add_paragraph()
            pi.text = "• " + item
            pi.font.size = Pt(10.5)
            pi.font.color.rgb = C_MUTED
            pi.space_after = Pt(6)

    add_notes(s5, "[02:50 - 03:35 | 45 giây] - Sản phẩm & Công nghệ:\nVề mặt công nghệ, chúng em lựa chọn chiến lược Tinh gọn (Lean). Thay vì ôm đồm app nặng nề, HUEGO vận hành trên nền tảng PWA siêu tốc. Cơ sở dữ liệu PostGIS không gian chuẩn hóa 150+ POIs tinh chọn, sử dụng thuật toán ST_DWithin với sai số GPS dưới 3 mét. Toàn bộ lịch trình và dự toán chi phí được mã hóa lưu trữ trực tiếp trên URL Fragment hash, giúp du khách gửi ngay cho bạn bè trong nhóm duyệt mà không cần đăng nhập tài khoản. Bên cạnh đó, mô hình 3D Cổ vật Hoàng cung được tối ưu dưới 2MB và hệ thống tạo chứng nhận PDF QR động đã hoàn thiện 100%!")

    # ==========================================================
    # SLIDE 6: MÔ HÌNH KINH DOANH
    # ==========================================================
    s6 = prs.slides.add_slide(blank_layout)
    add_bg(s6)
    add_header(s6, "BUSINESS MODEL", "Mô Hình Lean TravelTech: 3 Dòng Doanh Thu", "⏱️ 03:35 - 04:25 (50s)")

    rev_streams = [
        ("DÒNG TIỀN 1 (50% TỶ TRỌNG)", "Micro-Fee Audio Pass", "29.000đ – 49.000đ", C_VIOLET,
         ["Mở khóa cẩm nang thuyết minh chuyên sâu GPS bỏ túi.", "Biên lợi nhuận gộp kỹ thuật số > 85%.", "Miễn phí bản đồ, chỉ thu phí vi mô khi mở khóa di tích."]),
        ("DÒNG TIỀN 2 (35% TỶ TRỌNG)", "Affiliate Booking Làng Nghề", "8% – 15% / Đơn", C_GOLD,
         ["Hoa hồng đặt workshop 4 làng nghề: Tây Hồ, Thanh Tiên, Thủy Xuân, Bao La.", "Nghệ nhân tự đứng lớp và bán quà, HUEGO thu phí kết nối.", "Không ôm hàng tồn kho, không rủi ro bảo quản."]),
        ("DÒNG TIỀN 3 (15% TỶ TRỌNG)", "Local Sponsor & Banner", "500k – 1.000.000đ/tháng", C_GREEN,
         ["Gói bảo trợ thương hiệu cho khách sạn, homestay, nhà hàng lớn.", "Hiển thị ưu tiên trên bản đồ và cẩm nang số.", "Lấy nguồn thu này tài trợ miễn phí 100% quán kiệt hẻm."])
    ]

    for idx, (tag, title, price, color, bullets) in enumerate(rev_streams):
        left_pos = Inches(0.8 + idx * 4.0)
        card = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left_pos, Inches(1.8), Inches(3.7), Inches(4.9))
        card.fill.solid()
        card.fill.fore_color.rgb = C_CARD
        card.line.color.rgb = color
        card.line.width = Pt(1.5)

        tb = s6.shapes.add_textbox(left_pos + Inches(0.2), Inches(2.0), Inches(3.3), Inches(4.5))
        tf = tb.text_frame
        tf.word_wrap = True
        
        p = tf.paragraphs[0]
        p.text = tag
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = color

        p2 = tf.add_paragraph()
        p2.text = title
        p2.font.size = Pt(14)
        p2.font.bold = True
        p2.font.color.rgb = C_WHITE
        p2.space_after = Pt(8)

        # Price tag
        p_pr = tf.add_paragraph()
        p_pr.text = price
        p_pr.font.size = Pt(20)
        p_pr.font.bold = True
        p_pr.font.color.rgb = C_WHITE
        p_pr.space_after = Pt(10)

        for b in bullets:
            pb = tf.add_paragraph()
            pb.text = "• " + b
            pb.font.size = Pt(10.5)
            pb.font.color.rgb = C_MUTED
            pb.space_after = Pt(6)

    add_notes(s6, "[03:35 - 04:25 | 50 giây] - Mô hình kinh doanh:\nHUEGO hoạt động theo mô hình Lean TravelTech với triết lý: Miễn phí cho cộng đồng, thu tiền từ giá trị gia tăng số. Chúng em tuyệt đối không thu phí các mệ bán bún bò, chè hẻm để giữ chân dữ liệu bản địa nguyên bản. Nguồn thu của HUEGO đến từ 3 dòng tiền: Dòng tiền 1 chiếm 50% là Micro-fee bán vé Audio Pass GPS 29k-49k với biên lãi gộp trên 85%. Dòng tiền 2 chiếm 35% là hoa hồng Affiliate 8-15% khi khách đặt trải nghiệm tại 4 làng nghề thủ công (Tây Hồ, Thanh Tiên, Thủy Xuân, Bao La) – nghệ nhân tự dạy, HUEGO hưởng hoa hồng kết nối. Dòng tiền 3 chiếm 15% là gói bảo trợ Local Sponsor 500k-1 triệu/tháng từ các khách sạn, homestay lớn!")

    # ==========================================================
    # SLIDE 7: LỢI THẾ CẠNH TRANH (MOAT)
    # ==========================================================
    s7 = prs.slides.add_slide(blank_layout)
    add_bg(s7)
    add_header(s7, "COMPETITIVE MOAT", "Rào Cản Cạnh Tranh & Khác Biệt Hóa", "⏱️ 04:25 - 05:10 (45s)")

    # Comparison Table
    table_shape = s7.shapes.add_table(6, 5, Inches(0.8), Inches(1.8), Inches(11.7), Inches(4.8))
    table = table_shape.table
    table.columns[0].width = Inches(3.2)
    table.columns[1].width = Inches(2.1)
    table.columns[2].width = Inches(2.1)
    table.columns[3].width = Inches(2.1)
    table.columns[4].width = Inches(2.2)

    headers = ["TIÊU CHÍ SO SÁNH", "GOOGLE MAPS", "KLOOK / TRAVELOKA", "BLOG / HỘI REVIEW", "HUEGO (DỰ ÁN)"]
    for c_idx, h in enumerate(headers):
        cell = table.cell(0, c_idx)
        cell.text = h
        cell.fill.solid()
        cell.fill.fore_color.rgb = C_CARD_HI
        for p in cell.text_frame.paragraphs:
            p.font.size = Pt(10)
            p.font.bold = True
            p.font.color.rgb = C_GOLD_LT if c_idx == 4 else C_MUTED

    rows_data = [
        ("Độ sâu dữ liệu di sản Huế", "✕ Chung chung", "✕ Chỉ tour lớn", "✕ Rời rạc, trôi bài", "✓ 150+ POIs tinh chọn"),
        ("Dự toán ngân sách tự động", "✕ Không hỗ trợ", "✕ Không hỗ trợ", "✕ Tự tính thủ công", "✓ Trip Budget Calculator"),
        ("Bộ lọc thích ứng mưa Huế", "✕ Không", "✕ Không", "✕ Không", "✓ 1-Click Indoor Switch"),
        ("Audio thuyết minh GPS 35m", "✕ Không", "✕ Thuê HDV đắt đỏ", "✕ Chỉ có bài đọc chữ", "✓ Tự động phát âm thanh"),
        ("Mức chi phí người dùng", "Miễn phí (quảng cáo)", "500k – 1.000k (Đắt)", "Miễn phí (nhiễu tin)", "29.000đ (Rẻ gấp 20 lần)")
    ]

    for r_idx, r in enumerate(rows_data):
        for c_idx, val in enumerate(r):
            cell = table.cell(r_idx + 1, c_idx)
            cell.text = val
            cell.fill.solid()
            cell.fill.fore_color.rgb = RGBColor(25, 33, 56) if c_idx == 4 else C_CARD
            for p in cell.text_frame.paragraphs:
                p.font.size = Pt(10)
                if c_idx == 4:
                    p.font.bold = True
                    p.font.color.rgb = C_GREEN_LT if "✓" in val or "29" in val else C_WHITE
                elif "✓" in val:
                    p.font.color.rgb = C_GREEN_LT
                elif "✕" in val:
                    p.font.color.rgb = C_RED
                else:
                    p.font.color.rgb = C_MUTED

    add_notes(s7, "[04:25 - 05:10 | 45 giây] - Lợi thế cạnh tranh:\nSo với các đối thủ như Google Maps, Klook hay các hội nhóm review, HUEGO sở hữu bức tường phòng thủ vững chắc: Google Maps có bản đồ nhưng không hiểu lịch sử và không tính được ngân sách. Klook chỉ bán tour lớn đắt tiền. Hội nhóm review thì thông tin bị trôi và đầy bài PR ảo. HUEGO là nền tảng duy nhất sở hữu Trip Budget Calculator tự tính tiền cho dân phượt, bộ lọc Weather 1-Click thích ứng mùa mưa Huế, và gói thuyết minh tự động GPS chỉ 29.000đ!")

    # ==========================================================
    # SLIDE 8: KINH TẾ ĐƠN VỊ & HÒA VỐN
    # ==========================================================
    s8 = prs.slides.add_slide(blank_layout)
    add_bg(s8)
    add_header(s8, "UNIT ECONOMICS & P&L", "Kinh Tế Đơn Vị Vững & Điểm Hòa Vốn Thấp", "⏱️ 05:10 - 06:00 (50s)")

    # Left: Unit economics
    left_ue = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(5.6), Inches(2.3))
    left_ue.fill.solid()
    left_ue.fill.fore_color.rgb = C_CARD_HI
    left_ue.line.color.rgb = C_VIOLET
    tf_ue = left_ue.text_frame
    tf_ue.word_wrap = True
    p = tf_ue.paragraphs[0]
    p.text = "BIÊN ĐÓNG GÓP (CONTRIBUTION MARGIN): 80,0%"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_VIOLET_LT
    p2 = tf_ue.add_paragraph()
    p2.text = "36.000 VNĐ Lãi Gộp / Giao Dịch"
    p2.font.size = Pt(22)
    p2.font.bold = True
    p2.font.color.rgb = C_WHITE
    p3 = tf_ue.add_paragraph()
    p3.text = "• Giá trị đơn hàng trung bình (AOV): 45.000 VNĐ\n• Biến phí công nghệ (AVC): 9.000 VNĐ (20,0%)"
    p3.font.size = Pt(10.5)
    p3.font.color.rgb = C_MUTED

    left_bep = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(4.3), Inches(5.6), Inches(2.4))
    left_bep.fill.solid()
    left_bep.fill.fore_color.rgb = C_CARD
    left_bep.line.color.rgb = C_GOLD
    tf_bep = left_bep.text_frame
    tf_bep.word_wrap = True
    p = tf_bep.paragraphs[0]
    p.text = "ĐIỂM HÒA VỐN HOẠT ĐỘNG (BEP)"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_GOLD_LT
    p2 = tf_bep.add_paragraph()
    p2.text = "361 Giao dịch / Tháng (~12 đơn / ngày)"
    p2.font.size = Pt(20)
    p2.font.bold = True
    p2.font.color.rgb = C_WHITE
    p3 = tf_bep.add_paragraph()
    p3.text = "• Định phí vận hành hàng tháng: 13.000.000 VNĐ\n• Hòa vốn lũy kế toàn dự án: Tháng thứ 16 (Quý 2/2028)"
    p3.font.size = Pt(10.5)
    p3.font.color.rgb = C_MUTED

    # Right: Financials
    right_fin = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.8), Inches(5.7), Inches(4.9))
    right_fin.fill.solid()
    right_fin.fill.fore_color.rgb = C_CARD
    right_fin.line.color.rgb = C_BORDER
    tf_f = right_fin.text_frame
    tf_f.word_wrap = True
    p = tf_f.paragraphs[0]
    p.text = "DỰ PHÓNG TÀI CHÍNH 5 NĂM (VND)"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = C_GREEN_LT
    p.space_after = Pt(12)

    fin_data = [
        ("Năm 1:", "Doanh thu 360 Tr", "Lỗ kế hoạch (-48 Tr)"),
        ("Năm 2:", "Doanh thu 820 Tr", "Lãi ròng +165 Tr"),
        ("Năm 3:", "Doanh thu 1.450 Tr", "Lãi ròng +590 Tr"),
        ("Năm 4:", "Doanh thu 2.300 Tr", "Lãi ròng +1.080 Tr"),
        ("Năm 5:", "Doanh thu 3.500 Tr", "Lãi ròng +1.820 Tr")
    ]
    for yr, rev, prof in fin_data:
        p_yr = tf_f.add_paragraph()
        p_yr.text = f"• {yr}  {rev}  ➔  {prof}"
        p_yr.font.size = Pt(11)
        p_yr.font.color.rgb = C_WHITE
        p_yr.space_after = Pt(6)

    add_notes(s8, "[05:10 - 06:00 | 50 giây] - Kinh tế đơn vị & Tài chính:\nTính kinh tế đơn vị của HUEGO vô cùng hấp dẫn: Giá trị đơn hàng trung bình AOV đạt 45.000đ, biến phí công nghệ chỉ 9.000đ (20%), mang lại Biên đóng góp lên tới 80,0% (36.000đ/đơn)! Với chi phí định phí vận hành tinh gọn chỉ 13 triệu đồng/tháng, điểm hòa vốn hoạt động của HUEGO cực thấp: chỉ cần 361 giao dịch/tháng – tức vỏn vẹn 12 đơn mỗi ngày trên toàn TP Huế là đã hòa vốn! Dự phóng doanh thu tăng từ 360 triệu Năm 1 lên 3,5 tỷ Năm 5, và dự án sẽ chính thức hòa vốn lũy kế toàn bộ tại Tháng thứ 16!")

    # ==========================================================
    # SLIDE 9: ĐỘI NGŨ SÁNG LẬP NHÓM 4
    # ==========================================================
    s9 = prs.slides.add_slide(blank_layout)
    add_bg(s9)
    add_header(s9, "THE TEAM", "Đội Ngũ Sáng Lập Đa Năng — Nhóm 4", "⏱️ 06:00 - 06:40 (40s)")

    members = [
        ("Hoàng Đức Dương", "TRƯỞNG NHÓM • FOUNDER & CEO", C_VIOLET_LT,
         "Định hướng sản phẩm Lean, quản trị gọi vốn, phân bổ ngân sách và điều phối chiến lược tăng trưởng."),
        ("Huỳnh Thế Trung", "CO-FOUNDER & CTO", RGBColor(96, 165, 250),
         "Kiến trúc PWA Web tinh gọn, CSDL PostGIS 19 bảng, thuật toán định tuyến và tích hợp GPS Audio."),
        ("Lương Quang Hoàng Minh", "CO-FOUNDER & COO", C_GOLD_LT,
         "Khảo sát thực địa Huế, kết nối ký kết hợp tác Affiliate 4 làng nghề và thẩm định dữ liệu di sản."),
        ("Trương Hữu Anh Quốc", "CO-FOUNDER & CMO/CFO", C_GREEN_LT,
         "Marketing bản địa, phát triển cộng đồng du lịch tự túc và kiểm soát định mức ngân sách tài chính.")
    ]

    for idx, (name, role, role_color, desc) in enumerate(members):
        left_pos = Inches(0.8 + idx * 2.95)
        card = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left_pos, Inches(1.8), Inches(2.75), Inches(4.9))
        card.fill.solid()
        card.fill.fore_color.rgb = C_CARD
        card.line.color.rgb = C_BORDER

        tb = s9.shapes.add_textbox(left_pos + Inches(0.15), Inches(2.1), Inches(2.45), Inches(4.3))
        tf = tb.text_frame
        tf.word_wrap = True
        
        p = tf.paragraphs[0]
        p.text = name
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = C_WHITE
        p.space_after = Pt(4)

        p2 = tf.add_paragraph()
        p2.text = role
        p2.font.size = Pt(9.5)
        p2.font.bold = True
        p2.font.color.rgb = role_color
        p2.space_after = Pt(12)

        p3 = tf.add_paragraph()
        p3.text = desc
        p3.font.size = Pt(10.5)
        p3.font.color.rgb = C_MUTED
        p3.line_spacing = 1.2

    add_notes(s9, "[06:00 - 06:40 | 40 giây] - Đội ngũ sáng lập:\nĐứng sau HUEGO là 4 thành viên sáng lập thuộc Nhóm 4, K57 Tin học Kinh tế, ĐH Kinh tế – ĐH Huế: Em là Hoàng Đức Dương phụ trách điều hành tổng thể và mô hình Lean Startup; bạn Huỳnh Thế Trung phụ trách công nghệ CTO; bạn Lương Quang Hoàng Minh phụ trách vận hành COO và liên kết 4 làng nghề; bạn Trương Hữu Anh Quốc phụ trách Marketing và Tài chính. Nhóm đã tự bỏ 100 triệu đồng vốn ban đầu để phát triển hoàn thiện MVP, đo đạc thực tế 150 điểm di sản và thử nghiệm thành công trên 100 khách du lịch thực tế với 91% tỷ lệ hài lòng!")

    # ==========================================================
    # SLIDE 10: KÊU GỌI ĐẦU TƯ
    # ==========================================================
    s10 = prs.slides.add_slide(blank_layout)
    add_bg(s10)
    add_header(s10, "THE ASK & RUNWAY", "Kêu Gọi 500.000.000 VNĐ Vòng Hạt Giống", "⏱️ 06:40 - 07:30 (50s)")

    # Left: The Ask card
    left_ask = s10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(5.6), Inches(2.3))
    left_ask.fill.solid()
    left_ask.fill.fore_color.rgb = C_CARD_HI
    left_ask.line.color.rgb = C_GOLD
    tf_a = left_ask.text_frame
    tf_a.word_wrap = True
    p = tf_a.paragraphs[0]
    p.text = "SỐ VỐN KÊU GỌI (SEED ROUND)"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_GOLD_LT
    p2 = tf_a.add_paragraph()
    p2.text = "500.000.000 VNĐ (12,5% CP)"
    p2.font.size = Pt(24)
    p2.font.bold = True
    p2.font.color.rgb = C_WHITE
    p3 = tf_a.add_paragraph()
    p3.text = "• Định giá Pre-money: 3,50 Tỷ VNĐ (DCF NPV +2,47 Tỷ, IRR 48,5%)\n• Thời gian Runway an toàn: 18 – 24 tháng"
    p3.font.size = Pt(10.5)
    p3.font.color.rgb = C_MUTED

    left_milestones = s10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(4.3), Inches(5.6), Inches(2.4))
    left_milestones.fill.solid()
    left_milestones.fill.fore_color.rgb = C_CARD
    left_milestones.line.color.rgb = C_BORDER
    tf_m = left_milestones.text_frame
    tf_m.word_wrap = True
    p = tf_m.paragraphs[0]
    p.text = "GIẢI NGÂN THEO 3 ĐỢT GẮN KPI"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_GREEN_LT
    p.space_after = Pt(6)
    ms = [
        "Đợt 1 (200 Tr - 40%): Hoàn thiện 150 Audio Pass & Chiến dịch Ra mắt.",
        "Đợt 2 (150 Tr - 30%): Đạt 5.000 Active Users & Onboarding 15 đối tác.",
        "Đợt 3 (150 Tr - 30%): Đạt điểm hòa vốn hoạt động & Mở rộng Hội An."
    ]
    for m in ms:
        pm = tf_m.add_paragraph()
        pm.text = "• " + m
        pm.font.size = Pt(10)
        pm.font.color.rgb = C_WHITE
        pm.space_after = Pt(4)

    # Right: Fund Allocation
    right_alloc = s10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.8), Inches(5.7), Inches(4.9))
    right_alloc.fill.solid()
    right_alloc.fill.fore_color.rgb = C_CARD
    right_alloc.line.color.rgb = C_BORDER
    tf_al = right_alloc.text_frame
    tf_al.word_wrap = True
    p = tf_al.paragraphs[0]
    p.text = "KẾ HOẠCH PHÂN BỔ NGUỒN VỐN"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = C_VIOLET_LT
    p.space_after = Pt(12)

    allocs = [
        ("40% (200 Tr) — Marketing & Tăng trưởng:", "Hợp tác KOLs phượt, phủ mã QR tại homestay, nhà ga Huế."),
        ("30% (150 Tr) — Hoàn thiện Studio Audio:", "Thu âm chất lượng cao 150 điểm di sản, nâng cấp định tuyến."),
        ("20% (100 Tr) — Phát triển Đối tác:", "Ký kết liên kết Affiliate với 4 làng nghề thủ công và homestay."),
        ("10% (50 Tr) — Dự phòng:", "Duy trì máy chủ Cloud ổn định và hoàn tất pháp lý doanh nghiệp.")
    ]
    for title, desc in allocs:
        p_t = tf_al.add_paragraph()
        p_t.text = "• " + title
        p_t.font.size = Pt(11)
        p_t.font.bold = True
        p_t.font.color.rgb = C_WHITE
        p_d = tf_al.add_paragraph()
        p_d.text = "  " + desc
        p_d.font.size = Pt(10)
        p_d.font.color.rgb = C_MUTED
        p_d.space_after = Pt(6)

    add_notes(s10, "[06:40 - 07:30 | 50 giây] - Kêu gọi đầu tư 500 triệu:\nHôm nay, HUEGO trân trọng kêu gọi 500.000.000 VNĐ Vòng Hạt giống (Seed Round) đổi lấy 10% đến 15% cổ phần, tương ứng mức định giá Pre-money 3,50 tỷ VNĐ được xác lập khoa học qua DCF (NPV +2,47 tỷ, IRR 48,5%). Số vốn này đảm bảo Runway an toàn trong 18-24 tháng và được giải ngân theo 3 đợt gắn chặt với KPI tăng trưởng. Nguồn vốn sẽ phân bổ: 40% cho Marketing du lịch tự túc, 30% hoàn thiện kho Audio Pass Studio, 20% mở rộng đối tác làng nghề và 10% dự phòng. Hãy cùng HUEGO mở ra kỷ nguyên mới cho Du lịch Cố đô: Tiết kiệm hơn – Thông minh hơn – Bản địa hơn! Em xin chân thành cảm ơn!")

    # ==========================================================
    # SLIDE 11: APPENDIX 1 - Q&A DỰ PHÒNG
    # ==========================================================
    s11 = prs.slides.add_slide(blank_layout)
    add_bg(s11)
    add_header(s11, "APPENDIX • DỰ PHÒNG TRẢ LỜI CÂU HỎI 1", "Phản Biện: Tâm Lý Dùng Miễn Phí & Mùa Mưa Huế", "🎯 CÔNG THỨC T - D - K", is_gold=True)

    qa1 = [
        ("❓ Q1: Sinh viên & khách trẻ quen dùng miễn phí, sao họ chịu bỏ 29k mua Audio Pass?",
         "T (Thừa nhận): Hoàn toàn có thật. Tâm lý thích dùng miễn phí là rào cản lớn nhất của du khách Gen Z.",
         "D (Dữ liệu): Khảo sát N = 100 khách: So với phí thuê HDV 500k-1Tr, có tới 68% sẵn sàng trả 29k–49k (bằng 1 ly trà sữa) để nghe thuyết minh tự động GPS chất lượng cao.",
         "K (Khẳng định): Áp dụng Freemium: Tặng 3 điểm nghe thử miễn phí, chỉ thu tiền khi khách đã trực tiếp cảm nhận rõ sự tiện lợi vượt trội."),
        ("❓ Q2: Mùa mưa Huế kéo dài 5 tháng, du lịch đóng băng thì làm sao có doanh thu?",
         "T (Thừa nhận): Mưa dầm xứ Huế (tháng 9 đến tháng 1) là 'cơn ác mộng' đối với các tour truyền thống ngoài trời.",
         "D (Dữ liệu): Tuy nhiên, lượng tìm kiếm trải nghiệm trong nhà (Indoor) vào mùa mưa tăng vọt +180% (uống trà cung đình, bảo tàng, workshop nón lá, hoa giấy).",
         "K (Khẳng định): Bộ lọc Weather 1-Click: Tự chuyển toàn bộ lịch trình sang Indoor, đẩy mạnh Affiliate workshop làng nghề có mái che ➔ Doanh thu duy trì ổn định quanh năm!")
    ]

    for idx, (q, t, d, k) in enumerate(qa1):
        left_pos = Inches(0.8 + idx * 5.95)
        card = s11.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left_pos, Inches(1.8), Inches(5.75), Inches(4.9))
        card.fill.solid()
        card.fill.fore_color.rgb = C_CARD
        card.line.color.rgb = C_BORDER

        tb = s11.shapes.add_textbox(left_pos + Inches(0.2), Inches(2.0), Inches(5.35), Inches(4.5))
        tf = tb.text_frame
        tf.word_wrap = True
        
        p = tf.paragraphs[0]
        p.text = q
        p.font.size = Pt(12)
        p.font.bold = True
        p.font.color.rgb = C_GOLD_LT
        p.space_after = Pt(10)

        for step, text in [("T (Thừa nhận):", t[15:]), ("D (Dữ liệu):", d[12:]), ("K (Khẳng định):", k[16:])]:
            ps = tf.add_paragraph()
            ps.text = step + " " + text
            ps.font.size = Pt(10.5)
            ps.font.color.rgb = C_MUTED
            ps.space_after = Pt(8)

    add_notes(s11, "[Dự phòng Q&A 1] - Khách quen dùng miễn phí & Mùa mưa Huế:\nDạ thưa Thầy/Cô, khi trả lời câu hỏi về tâm lý dùng miễn phí: Chúng em áp dụng công thức T-D-K: Thừa nhận đây là thách thức lớn; Dữ liệu khảo sát chứng minh 68% khách sẵn sàng trả 29k-49k vì rẻ hơn 20 lần thuê HDV; Khẳng định mô hình Freemium cho trải nghiệm thử trước sẽ thuyết phục người dùng trả tiền dễ dàng.\nCòn với câu hỏi Mùa mưa Huế: Mưa dầm khiến tour ngoài trời tê liệt nhưng nhu cầu Indoor tăng 180%. Bộ lọc Weather 1-Click của HUEGO chính là giải pháp cứu cánh giúp lấp đầy các workshop làng nghề trong nhà, duy trì doanh thu quanh năm!")

    # ==========================================================
    # SLIDE 12: APPENDIX 2 - Q&A DỰ PHÒNG
    # ==========================================================
    s12 = prs.slides.add_slide(blank_layout)
    add_bg(s12)
    add_header(s12, "APPENDIX • DỰ PHÒNG TRẢ LỜI CÂU HỎI 2", "Phản Biện: Rào Cản Big Tech & Định Giá 3,5 Tỷ", "🎯 CÔNG THỨC T - D - K", is_gold=True)

    qa2 = [
        ("❓ Q3: Nếu Google Maps hay Klook làm tính năng tương tự thì HUEGO sống sao?",
         "T (Thừa nhận): Các ông lớn có tiềm lực tài chính và lượng người dùng áp đảo toàn cầu.",
         "D (Dữ liệu): Các nền tảng lớn chỉ tập trung tour lớn đại trà, không thể đi sâu vào từng kiệt hẻm ẩm thực hay tích hợp bài toán chi phí chi tiết của sinh viên Việt Nam.",
         "K (Khẳng định): 3 Bức tường bảo vệ (Moat): 1) Trip Budget Calculator độc quyền; 2) Quan hệ độc quyền với nghệ nhân 4 làng nghề; 3) Bản quyền 50+ bài audio bản địa."),
        ("❓ Q4: Dự án sinh viên mới MVP, định giá Pre-money 3,50 tỷ có bị ảo tưởng không?",
         "T (Thừa nhận): Định giá khởi nghiệp giai đoạn đầu rất nhạy cảm và dễ bị hoài nghi là thiếu thực tế.",
         "D (Dữ liệu): Định giá được tính bằng DCF 5 năm chiết khấu r = 12%: NPV đạt +2,47 tỷ, IRR đạt 48,5%. Đội ngũ đã đầu tư 100 Tr vốn tự có làm xong MVP hoàn chỉnh.",
         "K (Khẳng định): Rót 500 triệu lấy 12,5% cổ phần là mức định giá hợp lý, cam kết hòa vốn lũy kế tại Tháng thứ 16 và mang lại ROI dự phóng > 35%/năm cho Nhà đầu tư.")
    ]

    for idx, (q, t, d, k) in enumerate(qa2):
        left_pos = Inches(0.8 + idx * 5.95)
        card = s12.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left_pos, Inches(1.8), Inches(5.75), Inches(4.9))
        card.fill.solid()
        card.fill.fore_color.rgb = C_CARD
        card.line.color.rgb = C_BORDER

        tb = s12.shapes.add_textbox(left_pos + Inches(0.2), Inches(2.0), Inches(5.35), Inches(4.5))
        tf = tb.text_frame
        tf.word_wrap = True
        
        p = tf.paragraphs[0]
        p.text = q
        p.font.size = Pt(12)
        p.font.bold = True
        p.font.color.rgb = C_GOLD_LT
        p.space_after = Pt(10)

        for step, text in [("T (Thừa nhận):", t[15:]), ("D (Dữ liệu):", d[12:]), ("K (Khẳng định):", k[16:])]:
            ps = tf.add_paragraph()
            ps.text = step + " " + text
            ps.font.size = Pt(10.5)
            ps.font.color.rgb = C_MUTED
            ps.space_after = Pt(8)

    add_notes(s12, "[Dự phòng Q&A 2] - Đối thủ sao chép & Định giá 3,5 tỷ:\nDạ thưa Ban Giám khảo, nếu các ông lớn như Google Maps hay Klook làm tương tự: HUEGO có 3 rào cản độc quyền mà các ông lớn không bao giờ làm: Bộ tính ngân sách kiệt hẻm, Mạng lưới liên kết trực tiếp nghệ nhân 4 làng nghề, và Dữ liệu văn hóa địa phương thấu cảm sâu sắc.\nVề mức định giá 3,5 tỷ VNĐ: Con số này hoàn toàn dựa trên phương pháp DCF chiết khấu dòng tiền 5 năm với NPV dương 2,47 tỷ và tài sản hiện hữu là toàn bộ nền tảng MVP, 19 bảng CSDL PostGIS và 100 khách thực chứng, cam kết mang lại tỷ suất sinh lời vượt trội cho nhà đầu tư!")

    output_path = "huego_pitch_deck.pptx"
    prs.save(output_path)
    print(f"SUCCESS: PowerPoint saved to {output_path}")

if __name__ == "__main__":
    create_deck()
