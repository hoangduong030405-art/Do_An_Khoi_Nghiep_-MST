import os
import sys
import base64
import json

sys.stdout.reconfigure(encoding='utf-8')

# Prepare Base64 backgrounds
bgs_base64 = {}
for i in range(1, 13):
    path = f'scratch/heritage_web_bgs/bg_{i}.jpg'
    with open(path, 'rb') as f:
        bgs_base64[i] = f"data:image/jpeg;base64,{base64.b64encode(f.read()).decode('utf-8')}"

# Slide data definition for HTML with percentage coordinates
# PDF is 1440 x 810. To convert (x, y, w, h) to %:
# x% = x / 14.4, y% = y / 8.1, w% = w / 14.4, h% = h / 8.1
def pct(x, y, w, h):
    return f"left: {x/14.4:.2f}%; top: {y/8.1:.2f}%; width: {w/14.4:.2f}%; height: {h/8.1:.2f}%;"

slides = [
    # SLIDE 1
    {
        "id": 1,
        "bg": bgs_base64[1],
        "html": f"""
        <div class="pos-box" style="{pct(550, 48, 340, 50)} display: flex; align-items: center; justify-content: center;">
            <span style="color: #ffffff; font-weight: 700; font-size: 1.15vw; letter-spacing: 1px;">BÀI THUYẾT TRÌNH KHỞI NGHIỆP ĐỔI MỚI SÁNG TẠO</span>
        </div>
        <div class="pos-box" style="{pct(80, 140, 1280, 190)} text-align: center;">
            <h1 style="color: #0d72ce; font-size: 5vw; font-weight: 800; margin: 0; letter-spacing: 4px; text-shadow: 0 2px 10px rgba(13,114,206,0.15);">H U E G O</h1>
            <p style="color: #1a2b4c; font-size: 1.45vw; font-weight: 700; margin: 8px 0 0 0; letter-spacing: 0.5px;">CẨM NANG SỐ & CÔNG CỤ LẬP LỊCH TRÌNH DU LỊCH TỰ TÚC THÔNG MINH</p>
        </div>
        <div class="pos-box" style="{pct(350, 555, 740, 80)} text-align: center;">
            <span style="font-family: 'Segoe Print', cursive, sans-serif; color: #d97706; font-size: 2.2vw; font-weight: 700;">Đồng hành cùng Di sản Cố đô Huế</span>
        </div>
        <div class="pos-box" style="{pct(150, 675, 1140, 80)} text-align: center;">
            <p style="color: #0f172a; font-size: 1.15vw; font-weight: 700; margin: 0;">NHÓM 4: Hoàng Đức Dương (Leader) • Huỳnh Thế Trung • Lương Quang Hoàng Minh • Trương Hữu Anh Quốc</p>
            <p style="color: #475569; font-size: 1.0vw; margin: 4px 0 0 0;">Khoa Hệ thống Thông tin Kinh tế – Trường Đại học Kinh tế, Đại học Huế</p>
        </div>
        """,
        "notes": "[0:00 - 0:35] Hoàng Đức Dương: Kính chào Quý Thầy Cô và Hội đồng Ban Giám khảo. Em là Hoàng Đức Dương, đại diện Nhóm 4 Khoa HTTT Kinh tế. Hôm nay, nhóm xin trình bày dự án khởi nghiệp công nghệ du lịch: 'HUEGO – Cẩm nang số và công cụ lập lịch trình du lịch tự túc thông minh Cố đô Huế'. Chúng em đến đây để giải quyết bài toán lớn của du lịch Huế và kêu gọi 500 triệu VNĐ vòng Seed Round."
    },

    # SLIDE 2
    {
        "id": 2,
        "bg": bgs_base64[2],
        "html": f"""
        <div class="pos-box" style="{pct(52, 45, 880, 110)}">
            <h2 style="color: #1a2b4c; font-size: 3.3vw; font-weight: 800; margin: 0;">GIỚI THIỆU CHUNG</h2>
        </div>
        <div class="pos-box" style="{pct(52, 185, 880, 270)} font-size: 1.25vw; line-height: 1.55; color: #0f172a;">
            <p style="margin: 0 0 12px 0;">Huế là trung tâm văn hóa di sản hàng đầu Việt Nam, thu hút hàng triệu du khách mỗi năm. Tuy nhiên, du khách tự túc vẫn đang đối mặt với nhiều rào cản về việc tìm kiếm thông tin chính thống và tối ưu hành trình.</p>
            <p style="margin: 0 0 12px 0; color: #0d72ce; font-weight: 700;">HUEGO ra đời với định vị là "Trợ lý du lịch số thông minh", kết hợp thuật toán tối ưu lộ trình theo ngân sách, thuyết minh tự động GPS Audio Pass và trợ lý thích ứng thời tiết thực tế.</p>
            <p style="margin: 0;">Mục tiêu: Đem lại trải nghiệm khám phá Huế tiện lợi, cá nhân hóa, tiết kiệm chi phí và mang đậm chiều sâu di sản.</p>
        </div>
        """,
        "notes": "[0:35 - 1:15] Dương: Huế sở hữu kho tàng di sản khổng lồ nhưng trải nghiệm du lịch tự túc hiện nay còn manh mún. HUEGO sinh ra không chỉ là một app du lịch, mà là một 'Trợ lý số bản địa thông minh', giúp du khách giải quyết trọn vẹn từ khâu lên ngân sách, chọn quán ăn chuẩn vị, nghe thuyết minh di sản tự động đến linh hoạt đổi lịch khi trời mưa Huế."
    },

    # SLIDE 3
    {
        "id": 3,
        "bg": bgs_base64[3],
        "html": f"""
        <div class="pos-box" style="{pct(250, 70, 940, 110)} text-align: center;">
            <h2 style="color: #1a2b4c; font-size: 3.3vw; font-weight: 800; margin: 0;">VẤN ĐỀ THỊ TRƯỜNG</h2>
        </div>
        <div class="pos-box" style="{pct(80, 215, 1280, 130)} font-size: 1.15vw; line-height: 1.6; color: #0f172a;">
            <p style="margin: 0 0 8px 0;">• <strong style="color: #0d72ce;">72%</strong> du khách tự túc gặp khó khăn khi tìm kiếm thông tin văn hóa chính thống và tối ưu thứ tự tham quan các di tích tại Huế.</p>
            <p style="margin: 0 0 8px 0;">• <strong style="color: #0d72ce;">71%</strong> e ngại phát sinh chi phí, bị 'chặt chém' dịch vụ ăn uống và di chuyển do thiếu công cụ dự toán ngân sách minh bạch.</p>
            <p style="margin: 0;">• <strong style="color: #0d72ce;">62%</strong> du khách hoàn toàn bị động khi thời tiết mưa dầm đặc trưng của Cố Đô làm đảo lộn kế hoạch tham quan ngoài trời.</p>
        </div>
        """,
        "notes": "[1:15 - 2:00] Dương: Khảo sát thực tế của nhóm chỉ ra 3 nỗi đau nhức nhối: Thứ nhất, 72% khách tự túc đi Huế như đi trong sương mù, không biết sắp xếp thứ tự Đại Nội và các Lăng thế nào cho tiện đường. Thứ hai, 71% lo bị chặt chém vì thiếu bảng giá minh bạch. Thứ ba, mưa Huế nổi tiếng làm hỏng lịch trình ngoài trời. Đây chính là khoảng trống thị trường khổng lồ."
    },

    # SLIDE 4
    {
        "id": 4,
        "bg": bgs_base64[4],
        "html": f"""
        <div class="pos-box" style="{pct(680, 75, 710, 110)} text-align: right;">
            <h2 style="color: #1a2b4c; font-size: 3.3vw; font-weight: 800; margin: 0;">GIẢI PHÁP HUEGO</h2>
        </div>
        <div class="pos-box" style="{pct(1040, 475, 360, 290)} font-size: 1.05vw; line-height: 1.45; color: #0f172a;">
            <p style="margin: 0 0 4px 0;"><strong style="color: #0d72ce; font-size: 1.15vw;">1. Lập ngân sách 1-Click:</strong><br>Tự động tính chi phí thực tế và đề xuất lịch trình tối ưu cung đường.</p>
            <p style="margin: 8px 0 4px 0;"><strong style="color: #0d72ce; font-size: 1.15vw;">2. Audio Pass GPS:</strong><br>Tự động thuyết minh di sản đa ngôn ngữ ngay khi bước vào di tích.</p>
            <p style="margin: 8px 0 0 0;"><strong style="color: #0d72ce; font-size: 1.15vw;">3. Trợ lý thời tiết Cố Đô:</strong><br>Tự động đổi điểm đến trong nhà (bảo tàng, ẩm thực) khi trời mưa.</p>
        </div>
        """,
        "notes": "[2:00 - 2:50] Huỳnh Thế Trung: Về mặt công nghệ, em là Huỳnh Thế Trung - CTO. HUEGO mang đến 3 giải pháp đột phá: Một là bộ tính toán ngân sách 1-Click, nhập số tiền là có ngay lộ trình tối ưu. Hai là Audio Pass GPS định vị chính xác, tự động phát thuyết minh như có hướng dẫn viên riêng. Ba là thuật toán Dynamic Weather Routing thích ứng mưa nắng tức thì."
    },

    # SLIDE 5
    {
        "id": 5,
        "bg": bgs_base64[5],
        "html": f"""
        <div class="pos-box" style="{pct(52, 45, 360, 260)}">
            <h2 style="color: #1a2b4c; font-size: 4.2vw; font-weight: 800; line-height: 1.05; margin: 0;">THỊ<br>TRƯỜNG</h2>
            <h3 style="color: #0d72ce; font-size: 2.8vw; font-weight: 800; margin: 8px 0 0 0;">MỤC TIÊU</h3>
        </div>
        <div class="pos-box" style="{pct(52, 530, 420, 250)} font-size: 0.95vw; line-height: 1.4; color: #0f172a;">
            <p style="margin: 0 0 6px 0;"><strong style="color: #0d72ce; font-size: 1.05vw;">• TAM (Tổng thị trường tiềm năng):</strong><br>180 Tỷ VNĐ / năm (Dựa trên 2,5 triệu lượt khách du lịch tự túc đến Huế).</p>
            <p style="margin: 0 0 6px 0;"><strong style="color: #0d72ce; font-size: 1.05vw;">• SAM (Thị trường khả dụng):</strong><br>36 Tỷ VNĐ (20% du khách sẵn sàng chi trả ứng dụng du lịch số).</p>
            <p style="margin: 0;"><strong style="color: #0d72ce; font-size: 1.05vw;">• SOM (Thị trường mục tiêu năm 1):</strong><br>360 Triệu VNĐ (Chiếm 1% thị phần với 8.000 giao dịch dịch vụ).</p>
        </div>
        """,
        "notes": "[2:50 - 3:35] Lương Quang Hoàng Minh: Em là Hoàng Minh - COO. Dung lượng thị trường Huế cực kỳ hấp dẫn: TAM đạt 180 Tỷ VNĐ từ 2,5 triệu khách tự túc hàng năm. Với mục tiêu thực tế nhắm vào giới trẻ Gen Z và khách quốc tế, SAM là 36 Tỷ VNĐ. Năm đầu tiên, HUEGO chỉ cần chiếm 1% SOM, tương đương 360 Triệu VNĐ với 8.000 giao dịch là hoàn toàn khả thi."
    },

    # SLIDE 6
    {
        "id": 6,
        "bg": bgs_base64[6],
        "html": f"""
        <div class="pos-box" style="{pct(52, 35, 360, 260)}">
            <h2 style="color: #1a2b4c; font-size: 4.0vw; font-weight: 800; line-height: 1.05; margin: 0;">MÔ HÌNH<br>DOANH</h2>
            <h3 style="color: #0d72ce; font-size: 3.5vw; font-weight: 800; margin: 4px 0 0 0;">THU</h3>
        </div>
        <div class="pos-box" style="{pct(1070, 475, 330, 290)} font-size: 0.95vw; line-height: 1.4; color: #0f172a;">
            <p style="margin: 0 0 8px 0;"><strong style="color: #0d72ce; font-size: 1.05vw;">1. Affiliate Booking (10-15%):</strong><br>Hoa hồng từ đặt bàn ăn uống, vé tham quan, trải nghiệm và lưu trú.</p>
            <p style="margin: 0 0 8px 0;"><strong style="color: #0d72ce; font-size: 1.05vw;">2. Audio Pass Freemium:</strong><br>Bán gói thuyết minh sâu 29k - 59k/tuyến điểm di tích Cố Đô.</p>
            <p style="margin: 0;"><strong style="color: #0d72ce; font-size: 1.05vw;">3. Local Merchant (B2B):</strong><br>Phí đăng ký hiển thị ưu tiên cho quán ăn, đặc sản Huế (199k - 499k/tháng).</p>
        </div>
        """,
        "notes": "[3:35 - 4:20] Trương Hữu Anh Quốc: Em là Anh Quốc - CFO. HUEGO không phụ thuộc vào một nguồn thu duy nhất mà xây dựng 3 trụ cột doanh thu vững chắc: B2C qua bán Audio Pass GPS từ 29k; B2B2C qua phí hoa hồng Affiliate 10-15% kết nối trực tiếp nhà hàng và vé thắng cảnh; và B2B từ gói Local Merchant dành cho các hộ kinh doanh đặc sản Huế muốn tiếp cận du khách chuẩn tệp."
    },

    # SLIDE 7
    {
        "id": 7,
        "bg": bgs_base64[7],
        "html": f"""
        <div class="pos-box" style="{pct(1050, 45, 340, 400)} text-align: right;">
            <h2 style="color: #1a2b4c; font-size: 4.2vw; font-weight: 800; line-height: 1.05; margin: 0;">ĐỘI<br>NGŨ<br>SÁNG<br>LẬP</h2>
            <h3 style="color: #0d72ce; font-size: 2.5vw; font-weight: 800; margin: 6px 0 0 0;">NHÓM 4</h3>
        </div>
        <div class="pos-box" style="{pct(52, 275, 360, 110)} font-size: 0.9vw; line-height: 1.35; color: #0f172a;">
            <strong style="color: #1a2b4c; font-size: 1.05vw;">Hoàng Đức Dương – Leader / CEO</strong><br>
            Quản trị chiến lược dự án, phát triển quan hệ đối tác văn hóa & điều phối tổng thể.
        </div>
        <div class="pos-box" style="{pct(52, 420, 360, 130)} font-size: 0.9vw; line-height: 1.35; color: #0f172a;">
            <strong style="color: #0d72ce; font-size: 1.05vw;">Huỳnh Thế Trung – CTO</strong><br>
            Kiến trúc công nghệ Web/App, phát triển thuật toán định vị GPS Audio Pass và công cụ lập lịch trình.
        </div>
        <div class="pos-box" style="{pct(52, 595, 360, 150)} font-size: 0.9vw; line-height: 1.35; color: #0f172a;">
            <strong style="color: #0f172a; font-size: 1.05vw;">Minh (COO) & Quốc (CMO/CFO)</strong><br>
            Quản trị nội dung di sản số, triển khai chiến dịch tiếp thị sinh viên và kế hoạch tài chính – dòng tiền.
        </div>
        """,
        "notes": "[4:20 - 5:10] Dương: Sức mạnh của HUEGO đến từ sự bổ trợ hoàn hảo của 4 thành viên Khoa HTTT Kinh tế: Em đảm nhiệm điều hành và liên kết đối tác địa phương; Trung chịu trách nhiệm kiến trúc kỹ thuật phần mềm; Minh vận hành nội dung chuẩn hóa văn hóa di sản; và Quốc phụ trách tài chính và tiếp thị tăng trưởng."
    },

    # SLIDE 8
    {
        "id": 8,
        "bg": bgs_base64[8],
        "html": f"""
        <div class="pos-box" style="{pct(250, 35, 940, 110)} text-align: center;">
            <h2 style="color: #1a2b4c; font-size: 3.0vw; font-weight: 800; margin: 0;">HIỆU QUẢ TÀI CHÍNH & ĐIỂM HÒA VỐN</h2>
        </div>
        <div class="pos-box" style="{pct(60, 645, 1320, 130)} font-size: 1.05vw; line-height: 1.5; color: #0f172a;">
            <p style="margin: 0 0 6px 0;">• <strong style="color: #0d72ce;">Kinh tế đơn vị (Unit Economics):</strong> Đơn giá trung bình (AOV): 45.000đ | Chi phí biến đổi (AVC): 9.000đ | <strong>Biên đóng góp (Contribution Margin): 80%</strong>.</p>
            <p style="margin: 0 0 6px 0;">• <strong style="color: #1a2b4c;">Định phí vận hành (TFC):</strong> 13.000.000đ/tháng (Chi phí hạ tầng Cloud Server, Google Maps/Mapbox API, nội dung di sản và hành chính).</p>
            <p style="margin: 0;">• <strong style="color: #d97706;">Điểm hòa vốn (BEP): 361 giao dịch/tháng</strong> (chỉ cần 12 đơn/ngày) — HUEGO đạt mốc hòa vốn tự chủ dòng tiền từ tháng thứ 4.</p>
        </div>
        """,
        "notes": "[5:10 - 6:00] Quốc: Về bức tranh tài chính, HUEGO là mô hình cực kỳ tinh gọn: Với mỗi giao dịch 45k, chi phí biến đổi chỉ 9k cho server và cổng thanh toán, mang lại biên đóng góp lên tới 80%. Định phí mỗi tháng chỉ 13 triệu VNĐ. Do đó, điểm hòa vốn chỉ là 361 đơn/tháng — tương đương 12 đơn mỗi ngày. Đây là con số cực kỳ an toàn trên thị trường 2,5 triệu lượt khách."
    },

    # SLIDE 9
    {
        "id": 9,
        "bg": bgs_base64[9],
        "html": f"""
        <div class="pos-box" style="{pct(400, 520, 640, 90)} text-align: center;">
            <h2 style="color: #1a2b4c; font-size: 2.8vw; font-weight: 800; margin: 0;">KÊU GỌI ĐẦU TƯ (SEED ROUND)</h2>
        </div>
        <div class="pos-box" style="{pct(60, 645, 1320, 130)} font-size: 1.1vw; line-height: 1.55; color: #0f172a; text-align: center;">
            <p style="margin: 0 0 6px 0;">• <strong style="color: #0d72ce;">Kêu gọi 500 Triệu VNĐ</strong> đổi lấy 10% - 15% cổ phần (Định giá doanh nghiệp Pre-money: 3,5 Tỷ VNĐ).</p>
            <p style="margin: 0 0 6px 0;">• <strong style="color: #1a2b4c;">Phân bổ nguồn vốn:</strong> 40% Nâng cấp sản phẩm & GPS Audio Pass | 35% Tiếp thị du khách & Merchant | 25% Chi phí vận hành năm 1.</p>
            <p style="margin: 0;">• <strong style="color: #d97706;">Cam kết 12 tháng:</strong> 8.000 giao dịch thành công, doanh thu 360 Triệu VNĐ, trở thành cẩm nang du lịch tự túc số 1 tại Huế.</p>
        </div>
        """,
        "notes": "[6:00 - 6:50] Dương: Để hiện thực hóa mục tiêu, HUEGO kêu gọi 500 triệu VNĐ cho 10-15% cổ phần, tương ứng mức định giá Pre-money 3,5 Tỷ VNĐ. Nguồn vốn được phân bổ minh bạch: 40% hoàn thiện sản phẩm công nghệ, 35% truyền thông tại điểm đến và 25% vận hành. Chúng em cam kết cột mốc 8.000 giao dịch và tự chủ hoàn toàn dòng tiền trong 12 tháng tới."
    },

    # SLIDE 10
    {
        "id": 10,
        "bg": bgs_base64[10],
        "html": f"""
        <div class="pos-box" style="{pct(550, 65, 340, 40)} text-align: center;">
            <span style="color: #ffffff; font-weight: 700; font-size: 1.15vw; letter-spacing: 1px;">HUEGO | PHIÊN PHẢN BIỆN Q&A</span>
        </div>
        <div class="pos-box" style="{pct(150, 560, 1140, 160)} text-align: center; color: #ffffff;">
            <h3 style="font-size: 1.7vw; font-weight: 800; margin: 0 0 10px 0; letter-spacing: 0.5px;">KÍNH MỜI QUÝ THẦY CÔ VÀ BAN GIÁM KHẢO ĐẶT CÂU HỎI CHO NHÓM 4!</h3>
            <p style="font-size: 1.15vw; margin: 0 0 6px 0; opacity: 0.95;">Khoa Hệ thống Thông tin Kinh tế – Trường Đại học Kinh tế, Đại học Huế</p>
            <p style="font-size: 1.05vw; margin: 0; color: #f59e0b; font-weight: 700;">Website dự án: http://localhost:3000 | Hotline: 0905.xxx.xxx</p>
        </div>
        """,
        "notes": "[6:50 - 7:15] Dương: Chúng em xin chân thành cảm ơn Quý Thầy Cô và Hội đồng Ban Giám khảo đã lắng nghe. HUEGO tin rằng di sản Cố Đô Huế xứng đáng có một cẩm nang số xứng tầm để lan tỏa giá trị đến du khách trong và ngoài nước. Sau đây, Nhóm 4 xin sẵn sàng bước vào phiên phản biện Q&A!"
    },

    # SLIDE 11 (Appendix 1)
    {
        "id": 11,
        "bg": bgs_base64[11],
        "html": f"""
        <div class="pos-box" style="{pct(52, 40, 940, 80)}">
            <h2 style="color: #1a2b4c; font-size: 2.3vw; font-weight: 800; margin: 0;">PHỤ LỤC Q&A 1: CẠNH TRANH VỚI KLOOK & TRAVELOKA</h2>
        </div>
        <div class="pos-box" style="{pct(52, 135, 900, 390)} font-size: 1.05vw; line-height: 1.45; color: #0f172a;">
            <p style="color: #d97706; font-weight: 700; margin: 0 0 8px 0; font-size: 1.15vw;">Câu hỏi: "Nếu Klook hay Traveloka đưa tính năng tương tự vào Huế thì HUEGO cạnh tranh ra sao?"</p>
            <p style="margin: 0 0 6px 0;"><strong style="color: #0d72ce;">1. THỪA NHẬN (Concede):</strong> OTA lớn áp đảo về vốn, thương hiệu và mảng vé máy bay, khách sạn 4-5 sao.</p>
            <p style="margin: 0 0 6px 0;"><strong style="color: #0d72ce;">2. DỮ LIỆU (Data):</strong> Huế chiếm &lt; 2% doanh thu OTA cả nước. Họ không thể cử nhân sự bản địa đi thu thập dữ liệu ngách từng quán bún bò hay thu âm audio guide độc quyền từng lăng tẩm.</p>
            <p style="margin: 0;"><strong style="color: #0d72ce;">3. KHẲNG ĐỊNH (Affirm):</strong> HUEGO sở hữu con hào bản địa (Hyper-local Moat), liên kết chặt chẽ quán ăn địa phương và dẫn đầu phân khúc On-trip cẩm nang số chuyên sâu tại Huế.</p>
        </div>
        """,
        "notes": "[Phụ lục Q&A 1] Dương / Trung: Trả lời giảng viên theo công thức T - D - K: 1. Thừa nhận OTA lớn mạnh về vốn và vé máy bay. 2. Dữ liệu chứng minh Huế quá nhỏ (<2%) để OTA lớn cử đội ngũ bản địa xây cẩm nang ngách. 3. Khẳng định HUEGO phòng thủ bằng dữ liệu bản địa độc quyền và chi phí vận hành tinh gọn."
    },

    # SLIDE 12 (Appendix 2)
    {
        "id": 12,
        "bg": bgs_base64[12],
        "html": f"""
        <div class="pos-box" style="{pct(150, 35, 1140, 80)} text-align: center;">
            <h2 style="color: #1a2b4c; font-size: 2.3vw; font-weight: 800; margin: 0;">PHỤ LỤC Q&A 2: TÍNH KHẢ THI VÀ RUNWAY CỦA VỐN 500 TRIỆU</h2>
        </div>
        <div class="pos-box" style="{pct(60, 615, 1320, 165)} font-size: 1.0vw; line-height: 1.45; color: #0f172a;">
            <p style="color: #d97706; font-weight: 700; margin: 0 0 4px 0; font-size: 1.1vw;">Câu hỏi: "500 triệu có quá ít để triển khai công nghệ và sống sót qua năm đầu không?"</p>
            <p style="margin: 0 0 4px 0;"><strong>1. THỪA NHẬN:</strong> 500 triệu không đủ cho mô hình 'đốt tiền' quảng cáo hay trợ giá người dùng như Grab.</p>
            <p style="margin: 0 0 4px 0;"><strong>2. DỮ LIỆU:</strong> HUEGO vận hành Lean TravelTech: Định phí chỉ 13 triệu/tháng, biên đóng góp 80%. Số vốn 500 triệu đảm bảo thời gian sống sót (Runway) lên tới 18 - 24 tháng kể cả khi doanh thu bằng 0.</p>
            <p style="margin: 0;"><strong style="color: #0d72ce;">3. KHẲNG ĐỊNH:</strong> HUEGO chỉ cần 12 đơn/ngày (361 đơn/tháng) trên 2,5 triệu khách du lịch là đã hoàn toàn tự chủ dòng tiền mà không cần gọi vốn thêm.</p>
        </div>
        """,
        "notes": "[Phụ lục Q&A 2] Quốc / Dương: Trả lời giảng viên theo công thức T - D - K: 1. Thừa nhận 500 triệu không đủ nếu đốt tiền. 2. Dữ liệu chứng minh định phí chỉ 13 triệu/tháng, đảm bảo Runway 18-24 tháng an toàn tuyệt đối. 3. Khẳng định mốc 12 đơn/ngày là đạt hòa vốn tự sinh tồn."
    }
]

# Generate HTML
html_slides_markup = ""
notes_dict = {}

for s in slides:
    notes_dict[s["id"]] = s["notes"]
    html_slides_markup += f"""
    <div class="slide" id="slide-{s['id']}" style="background-image: url('{s['bg']}');">
        {s['html']}
    </div>
    """

html_template = f"""<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HUEGO – Pitch Deck Gọi Vốn Cố Đô Huế (Chuẩn Mẫu Canva)</title>
    <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;600;700;800&family=Noto+Sans:wght@400;600;700;800&family=Playfair+Display:ital,wght@0,600;0,800;1,600&display=swap" rel="stylesheet">
    <style>
        * {{
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            user-select: none;
        }}
        body {{
            background-color: #0b0f19;
            font-family: 'Lexend', 'Noto Sans', 'Segoe UI', sans-serif;
            overflow: hidden;
            height: 100vh;
            width: 100vw;
            display: flex;
            align-items: center;
            justify-content: center;
        }}
        .deck-container {{
            position: relative;
            width: 100vw;
            height: 56.25vw; /* 16:9 ratio */
            max-height: 100vh;
            max-width: 177.78vh; /* 16:9 ratio */
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
            overflow: hidden;
            background: #ffffff;
        }}
        .slide {{
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.4s ease-in-out;
        }}
        .slide.active {{
            opacity: 1;
            pointer-events: auto;
        }}
        .pos-box {{
            position: absolute;
            z-index: 10;
        }}
        
        /* Floating Control Bar */
        .controls-dock {{
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(15, 23, 42, 0.85);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            padding: 8px 18px;
            border-radius: 9999px;
            display: flex;
            align-items: center;
            gap: 14px;
            z-index: 1000;
            box-shadow: 0 10px 25px rgba(0,0,0,0.4);
            color: #f8fafc;
        }}
        .btn-ctrl {{
            background: none;
            border: none;
            color: #f8fafc;
            font-size: 14px;
            font-weight: 600;
            padding: 6px 14px;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 6px;
        }}
        .btn-ctrl:hover {{
            background: rgba(255, 255, 255, 0.18);
            transform: translateY(-1px);
        }}
        .counter-badge {{
            font-size: 13px;
            font-weight: 700;
            color: #38bdf8;
            padding: 2px 8px;
            background: rgba(56, 189, 248, 0.15);
            border-radius: 12px;
        }}
        
        /* Speaker Notes Modal */
        .notes-modal {{
            position: fixed;
            bottom: 85px;
            left: 50%;
            transform: translateX(-50%);
            width: 780px;
            max-width: 90vw;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(16px);
            border: 1px solid #38bdf8;
            border-radius: 16px;
            padding: 20px 24px;
            color: #f8fafc;
            z-index: 1001;
            box-shadow: 0 20px 40px rgba(0,0,0,0.6);
            display: none;
            line-height: 1.6;
            font-size: 15px;
        }}
        .notes-modal.show {{
            display: block;
        }}
        .notes-title {{
            color: #38bdf8;
            font-weight: 700;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 8px;
            display: flex;
            justify-content: space-between;
        }}
        
        /* Print Styles */
        @media print {{
            body {{
                background: none;
                overflow: visible;
                height: auto;
            }}
            .deck-container {{
                position: static;
                width: 100% !important;
                height: auto !important;
                box-shadow: none;
                overflow: visible;
            }}
            .slide {{
                position: relative !important;
                width: 100vw !important;
                height: 56.25vw !important;
                opacity: 1 !important;
                page-break-after: always;
                display: block !important;
            }}
            .controls-dock, .notes-modal {{
                display: none !important;
            }}
        }}
    </style>
</head>
<body>

    <div class="deck-container" id="deckContainer">
        {html_slides_markup}
    </div>

    <!-- Floating Dock -->
    <div class="controls-dock">
        <button class="btn-ctrl" onclick="prevSlide()">◀ Trước</button>
        <span class="counter-badge" id="slideCounter">1 / 12</span>
        <button class="btn-ctrl" onclick="nextSlide()">Sau ▶</button>
        <span style="opacity: 0.3;">|</span>
        <button class="btn-ctrl" onclick="toggleNotes()">📝 Kịch bản (N)</button>
        <button class="btn-ctrl" onclick="toggleFullscreen()">⛶ Fullscreen (F)</button>
    </div>

    <!-- Notes Modal -->
    <div class="notes-modal" id="notesModal">
        <div class="notes-title">
            <span>🎤 KỊCH BẢN THUYẾT TRÌNH (SPEAKER NOTES)</span>
            <span style="cursor: pointer; color: #94a3b8;" onclick="toggleNotes()">✕ Đóng</span>
        </div>
        <div id="notesContent">Loading notes...</div>
    </div>

    <script>
        const totalSlides = 12;
        let currentSlide = 1;
        const notesData = {json.dumps(notes_dict, ensure_ascii=False)};

        function updateSlide() {{
            document.querySelectorAll('.slide').forEach((s, idx) => {{
                s.classList.toggle('active', (idx + 1) === currentSlide);
            }});
            document.getElementById('slideCounter').innerText = currentSlide + ' / ' + totalSlides;
            document.getElementById('notesContent').innerText = notesData[currentSlide] || "Không có ghi chú cho slide này.";
        }}

        function nextSlide() {{
            if (currentSlide < totalSlides) {{
                currentSlide++;
                updateSlide();
            }}
        }}

        function prevSlide() {{
            if (currentSlide > 1) {{
                currentSlide--;
                updateSlide();
            }}
        }}

        function toggleNotes() {{
            const modal = document.getElementById('notesModal');
            modal.classList.toggle('show');
        }}

        function toggleFullscreen() {{
            if (!document.fullscreenElement) {{
                document.documentElement.requestFullscreen().catch(err => {{}});
            }} else {{
                if (document.exitFullscreen) {{
                    document.exitFullscreen();
                }}
            }}
        }}

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {{
            if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {{
                e.preventDefault();
                nextSlide();
            }} else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {{
                e.preventDefault();
                prevSlide();
            }} else if (e.key.toLowerCase() === 'n') {{
                toggleNotes();
            }} else if (e.key.toLowerCase() === 'f') {{
                toggleFullscreen();
            }} else if (e.key === 'Home') {{
                currentSlide = 1;
                updateSlide();
            }} else if (e.key === 'End') {{
                currentSlide = totalSlides;
                updateSlide();
            }}
        }});

        // Click left/right edge to navigate
        document.getElementById('deckContainer').addEventListener('click', (e) => {{
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            if (clickX > rect.width * 0.75) {{
                nextSlide();
            }} else if (clickX < rect.width * 0.25) {{
                prevSlide();
            }}
        }});

        // Initialize
        updateSlide();
    </script>
</body>
</html>
"""

with open(r'C:\Lap_Trinh_Ung_dung\huego_pitch_deck.html', 'w', encoding='utf-8') as f:
    f.write(html_template)

print("Saved standalone huego_pitch_deck.html successfully!")
