# -*- coding: utf-8 -*-
import os, sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.chart.data import CategoryChartData
from pptx.enum.chart import XL_CHART_TYPE, XL_LEGEND_POSITION, XL_LABEL_POSITION
from pptx.oxml.ns import qn

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from deckkit import *  # noqa
from notes import NOTES

BASE = os.path.dirname(os.path.abspath(__file__))
A = os.path.join(BASE, "assets")
TEMPLATE = r"C:\Users\PREDATOR\Downloads\Xanh Dương Trắng và Đen Cổ Điển Du lịch Việt Nam Cố Đô Huế Bài Thuyết Trình.pptx"
OUT = os.path.join(BASE, "HUEGO_16_Slide_Thuyet_Trinh.pptx")

prs = Presentation(TEMPLATE)
# drop all template slides, keep master/theme
sldIdLst = prs.slides._sldIdLst
for sldId in list(sldIdLst):
    rId = sldId.get(qn("r:id"))
    prs.part.drop_rel(rId)
    sldIdLst.remove(sldId)

BLANK = prs.slide_layouts[6]


def new_slide():
    return prs.slides.add_slide(BLANK)


def source(path):
    return os.path.join(A, path)


# =====================================================================
# 01 — COVER
# =====================================================================
s = new_slide()
pic_cover(s, source("image1.jpeg"), 0, 0, 20, 11.25)
# monument cutout, stretched as in the original template cover
pic(s, source("image2.png"), 0, 3.30, 20, 7.95)
gradient_stops(s, 0, 0, 20, 11.25,
               [(0.0, 0.05), (0.28, 0.14), (0.45, 0.36),
                (0.62, 0.62), (0.80, 0.82), (1.0, 0.93)])

rect(s, 0.9, 0.62, 0.115, 0.115, fill=GOLD)
txt(s, 1.14, 0.48, 4.0, 0.34,
    [{"runs": [("HUEGO", {"size": 14, "bold": True, "color": WHITE, "tracking": 0.18})]}],
    anchor="m")
txt(s, 11.4, 0.48, 7.7, 0.34,
    [{"runs": [("ĐỒ ÁN KHỞI NGHIỆP ĐỔI MỚI SÁNG TẠO · 2026",
                {"size": 10.5, "color": "D9E6EE", "font": LABEL, "tracking": 0.16})], "align": "r"}],
    anchor="m")

txt(s, 0.9, 1.30, 18.2, 0.4,
    [{"runs": [("CẨM NANG SỐ & CÔNG CỤ LẬP LỊCH TRÌNH DU LỊCH TỰ TÚC THÔNG MINH",
                {"size": 11.5, "color": "D6E8F2", "font": LABEL, "tracking": 0.22})], "align": "c"}],
    anchor="m")
txt(s, 0.9, 1.72, 18.2, 3.6,
    [{"runs": [("HUEGO", {"size": 295, "font": DISPLAY, "color": WHITE, "tracking": -0.025})],
      "align": "c", "line": 0.82}], anchor="t")

txt(s, 1.2, 5.62, 17.6, 0.7,
    [{"runs": [("Cẩm nang số & công cụ lập lịch trình du lịch tự túc thông minh Cố đô Huế",
                {"size": 21, "color": WHITE, "font": LIGHT})], "align": "c", "line": 1.1}])
txt(s, 1.2, 6.42, 17.6, 0.6,
    [{"runs": [("Chạm văn hóa – Tự do khám phá – Tiết kiệm chi phí",
                {"size": 27, "color": "F0D9A8", "font": SERIF, "italic": True})], "align": "c"}])

hline(s, 1.2, 8.18, 17.6, color="A9BCC6", thickness=0.01)
meta = [
    ("GIẢNG VIÊN HƯỚNG DẪN", "ThS. Trần Thái Hòa"),
    ("HỌC PHẦN", "Đồ án Khởi nghiệp ĐMST\nKhoa HTTT Kinh tế – ĐH Kinh tế, ĐH Huế"),
    ("NHÓM THỰC HIỆN", "Hoàng Đức Dương · Trương Hữu Anh Quốc\nHuỳnh Thế Trung · Lương Quang Hoàng Minh"),
]
xs = [1.2, 7.1, 12.2]
ws = [5.4, 4.8, 6.6]
for (k, v), x, w in zip(meta, xs, ws):
    txt(s, x, 8.38, w, 0.26,
        [{"runs": [(k, {"size": 8.5, "color": "C9DCE6", "font": LABEL, "tracking": 0.16})]}])
    txt(s, x, 8.66, w, 0.8,
        [{"runs": [(v, {"size": 10.5, "color": WHITE})], "line": 1.22}])
txt(s, 15.4, 10.62, 3.7, 0.3,
    [{"runs": [("16 SLIDE · 08 PHÚT", {"size": 9, "color": "C9DCE6", "font": LABEL,
                                       "tracking": 0.14})], "align": "r"}], anchor="m")

# =====================================================================
# 02 — PROBLEM
# =====================================================================
s = new_slide()
page(s, 2, "01 / Vấn đề")
pic_cover(s, source("image13.jpeg"), 13.15, 1.12, 5.95, 9.15)
rect(s, 13.15, 9.28, 5.95, 0.99, fill=INK, alpha=0.72)
txt(s, 13.45, 9.42, 5.35, 0.7,
    [{"runs": [("Du khách tự túc trên cầu Trường Tiền – TP. Huế",
                {"size": 10, "color": WHITE, "font": LABEL, "tracking": 0.06})]}], anchor="m")

eyebrow(s, 1.18, "Nỗi đau của khách FIT")
headline(s, ["4,2 TRIỆU LƯỢT KHÁCH", "CHỈ Ở LẠI 1,85 NGÀY"],
         0.9, 1.52, 11.7, max_pt=72, min_pt=40)
txt(s, 0.9, 3.68, 11.2, 0.9,
    [{"runs": [("Khảo sát 100 du khách tự túc theo The Mom Test — ngân sách 2–3,5 triệu/chuyến 3N2Đ — phơi ra 4 rào cản:",
                {"size": 14.5, "color": GRAY})], "line": 1.25}])

pains = [
    ("72%", "Đi di tích “cưỡi ngựa xem hoa”",
     "Thuê HDV riêng 500.000 – 1.000.000đ/buổi, vượt quá túi tiền sinh viên."),
    ("69%", "Vỡ lịch trình vì mưa Huế",
     "Mưa dầm tháng 9 – tháng 1 phá hỏng toàn bộ kế hoạch ngoài trời."),
    ("66%", "Sợ review ảo & chặt chém",
     "Khó tìm quán gia truyền trong kiệt hẻm đúng giá, đúng vị."),
    ("61%", "Thiếu công cụ tính chi phí",
     "Lịch trình rời rạc, dễ phát sinh chi tiêu vượt ngân sách."),
]
pos = [(0.9, 4.55), (6.55, 4.55), (0.9, 7.25), (6.55, 7.25)]
for (num, title, desc), (x, y) in zip(pains, pos):
    txt(s, x, y, 1.85, 0.95,
        [{"runs": [(num, {"size": 46, "font": DISPLAY, "color": BLUE})]}], anchor="b")
    txt(s, x + 1.78, y + 0.02, 3.7, 0.95,
        [{"runs": [(title, {"size": 14, "bold": True, "color": INK})], "line": 1.05}], anchor="b")
    txt(s, x, y + 1.08, 5.4, 0.8,
        [{"runs": [(desc, {"size": 11.5, "color": GRAY})], "line": 1.25}])
    hline(s, x, y + 1.01, 5.3, color=GRAY_LIGHT, thickness=0.012)

txt(s, 0.9, 9.82, 11.4, 0.35,
    [{"runs": [("Nguồn: khảo sát thực địa N = 100 · phương pháp The Mom Test · tháng 10/2026",
                {"size": 9.5, "color": GRAY_MID, "italic": True})]}])

# =====================================================================
# 03 — SOLUTION
# =====================================================================
s = new_slide()
page(s, 3, "02 / Giải pháp")
eyebrow(s, 1.18, "Nền tảng Web/PWA")
headline(s, ["MỘT NỀN TẢNG WEB/PWA.", "BỐN VIÊN GẠCH CHO", "CHUYẾN ĐI TỰ TÚC."],
         0.9, 1.5, 11.2, max_pt=62, min_pt=40)
txt(s, 0.9, 4.12, 11.3, 0.7,
    [{"runs": [("Smart Self-Guided Itinerary Planner — mở dưới 1,5 giây, không cần cài app nặng máy.",
                {"size": 14.5, "color": GRAY})], "line": 1.25}])

features = [
    ("01", "Cẩm nang 150+ POIs tinh chọn",
     "Toạ độ GPS thực địa cho di tích, quán kiệt hẻm và 4 làng nghề."),
    ("02", "Kéo–thả lịch trình & dự toán ngân sách",
     "Tối ưu cung đường ngắn nhất, tự động cộng chi phí từng ngày."),
    ("03", "Lọc thời tiết Nắng/Mưa 1-Click",
     "Mưa đến, lộ trình tự chuyển sang điểm trong nhà & workshop ấm cúng."),
    ("04", "HUEGO Audio Pass 29k – 49k",
     "Tự phát thuyết minh giọng Huế khi bước vào bán kính GPS 35m."),
]
y = 4.72
for num, title, desc in features:
    txt(s, 0.9, y, 0.62, 0.55, [{"runs": [(num, {"size": 19, "font": LABEL, "bold": True,
                                                   "color": GOLD})]}], anchor="m")
    txt(s, 1.55, y - 0.03, 10.4, 0.38,
        [{"runs": [(title, {"size": 16, "bold": True, "color": INK})]}], anchor="m")
    txt(s, 1.55, y + 0.36, 10.4, 0.4,
        [{"runs": [(desc, {"size": 11.5, "color": GRAY})], "line": 1.15}])
    hline(s, 0.9, y + 0.86, 11.0, color=GRAY_LIGHT, thickness=0.008)
    y += 1.24

# proof strip
rect(s, 0.9, 9.72, 11.1, 0.62, fill=BLUE_PALE, radius=0.08)
txt(s, 1.1, 9.72, 10.7, 0.62,
    [{"runs": [("Thử nghiệm MVP:  ", {"size": 10.5, "bold": True, "color": BLUE}),
               ("91% hài lòng  ·  68% sẵn sàng trả phí Audio Pass  ·  N = 100 khách",
                {"size": 10.5, "color": INK})]}], anchor="m")

# phone mockup
PX, PY, PW, PH = 14.45, 1.35, 4.25, 8.45
rect(s, PX, PY, PW, PH, fill=INK, radius=0.48, shadow=True)
rect(s, PX + 0.11, PY + 0.11, PW - 0.22, PH - 0.22, fill=PAPER, radius=0.4)
rect(s, PX + 1.55, PY + 0.2, 1.15, 0.16, fill=INK, radius=0.08)
txt(s, PX + 0.3, PY + 0.2, 1.0, 0.18,
    [{"runs": [("9:41", {"size": 8, "bold": True, "color": INK})]}], anchor="m")
txt(s, PX + 2.9, PY + 0.2, 1.1, 0.18,
    [{"runs": [("5G  ▮▮", {"size": 7, "color": GRAY})], "align": "r"}], anchor="m")

HX, HY, HW = PX + 0.11, PY + 0.42, PW - 0.22
rect(s, HX, HY, HW, 0.95, fill=BLUE)
txt(s, HX + 0.2, HY + 0.12, 2.2, 0.3,
    [{"runs": [("HUEGO", {"size": 15, "font": DISPLAY, "color": WHITE, "tracking": 0.02})]}])
txt(s, HX + 0.2, HY + 0.44, 2.4, 0.24,
    [{"runs": [("Cố đô Huế · Khách tự túc", {"size": 7.5, "color": "D8ECF6"})]}])
rect(s, HX + HW - 0.95, HY + 0.16, 0.78, 0.3, fill=GOLD, radius=0.15)
txt(s, HX + HW - 0.95, HY + 0.16, 0.78, 0.3,
    [{"runs": [("0 GP", {"size": 8, "bold": True, "color": WHITE})], "align": "c"}], anchor="m")

rect(s, HX + 0.16, HY + 0.62, HW - 0.32, 0.4, fill=WHITE, radius=0.18)
txt(s, HX + 0.3, HY + 0.62, HW - 0.5, 0.4,
    [{"runs": [("⌕  Tìm điểm đến, quán ăn...", {"size": 8, "color": GRAY})]}], anchor="m")

MY = HY + 1.02
rect(s, HX, MY, HW, 3.15, fill="EDE7D8")
# map grid + river
for i in range(1, 4):
    hline(s, HX, MY + i * 0.78, HW, color="DED6C3", thickness=0.006)
for i in range(1, 4):
    vline(s, HX + i * 1.0, MY, 3.15, color="DED6C3", thickness=0.006)
river = rect(s, HX + 0.25, MY + 1.55, HW - 0.5, 0.5, fill="9FC6D8", alpha=0.8, rot=-14)
pins = [(0.62, 0.55, "1", BLUE), (1.55, 0.95, "2", BLUE), (2.65, 0.62, "3", GOLD),
        (0.95, 1.95, "4", GOLD), (2.15, 2.25, "5", BLUE), (3.15, 1.55, "6", BLUE)]
for dx, dy, n, col in pins:
    circle(s, HX + dx, MY + dy, 0.3, col, line=WHITE, lw=1.5)
    txt(s, HX + dx, MY + dy, 0.3, 0.3,
        [{"runs": [(n, {"size": 7, "bold": True, "color": WHITE})], "align": "c"}], anchor="m")

CY = MY + 3.25
rect(s, HX + 0.12, CY, HW - 0.24, 2.55, fill=WHITE, radius=0.2, shadow=True)
txt(s, HX + 0.3, CY + 0.14, HW - 0.55, 0.3,
    [{"runs": [("Đại Nội Huế", {"size": 12.5, "bold": True, "color": INK})]}])
txt(s, HX + 0.3, CY + 0.44, HW - 0.55, 0.24,
    [{"runs": [("Điểm xuất phát · Bán kính 150m", {"size": 7.5, "color": GRAY})]}])
txt(s, HX + 0.3, CY + 0.68, HW - 0.55, 0.24,
    [{"runs": [("★ 4.8     +25 GP     Miễn phí", {"size": 8, "bold": True, "color": GOLD})]}])
rect(s, HX + 0.3, CY + 1.02, 1.55, 0.36, fill=BLUE, radius=0.16)
txt(s, HX + 0.3, CY + 1.02, 1.55, 0.36,
    [{"runs": [("Chỉ đường", {"size": 8, "bold": True, "color": WHITE})], "align": "c"}], anchor="m")
rect(s, HX + 1.95, CY + 1.02, HW - 2.25, 0.36, fill=GOLD_LIGHT, radius=0.16)
txt(s, HX + 1.95, CY + 1.02, HW - 2.25, 0.36,
    [{"runs": [("+ Lịch trình", {"size": 8, "bold": True, "color": GOLD})], "align": "c"}], anchor="m")
txt(s, HX + 0.3, CY + 1.5, HW - 0.55, 0.5,
    [{"runs": [("Lộ trình tối ưu: Đại Nội → Thiên Mụ → Cầu Tràng Tiền",
                {"size": 7.5, "color": GRAY})], "line": 1.1}])

txt(s, 14.2, 9.95, 4.75, 0.35,
    [{"runs": [("MVP đã chạy thật · ảnh chụp giao diện",
                {"size": 9, "color": GRAY_MID, "italic": True})], "align": "c"}])

# =====================================================================
# 04 — 3D MUSEUM & GAMIFICATION (dark)
# =====================================================================
s = new_slide()
pic_cover(s, source("image14.jpeg"), 0, 0, 20, 11.25)
rect(s, 0, 0, 20, 11.25, fill="0B0906", alpha=0.62)
gradient_overlay(s, 0, 0, 20, 11.25, 0.12, 0.5)

rect(s, 0.9, 0.57, 0.105, 0.105, fill=GOLD)
txt(s, 1.12, 0.44, 3.0, 0.32,
    [{"runs": [("HUEGO", {"size": 12, "bold": True, "color": WHITE, "tracking": 0.16})]}], anchor="m")
txt(s, 11.4, 0.44, 7.7, 0.32,
    [{"runs": [("03 / TRẢI NGHIỆM SỐ ĐỘC BẢN", {"size": 10, "color": "CFC7B8",
                                                  "font": LABEL, "bold": True, "tracking": 0.16})], "align": "r"}],
    anchor="m")
hline(s, 0.9, 0.95, 18.2, color="5B5346")
hline(s, 0.9, 10.62, 18.2, color="5B5346")
txt(s, 0.9, 10.7, 10.0, 0.28,
    [{"runs": [("Chạm văn hóa – Tự do khám phá – Tiết kiệm chi phí",
                {"size": 9, "color": "CFC7B8", "font": LABEL})]}], anchor="m")
txt(s, 15.5, 10.7, 3.6, 0.28,
    [{"runs": [("04 / 16", {"size": 9, "color": "CFC7B8", "font": LABEL, "tracking": 0.12})], "align": "r"}],
    anchor="m")

eyebrow(s, 1.18, "Bảo tàng 3D · Green Points · E-Certificate", color="E4C98B")
headline(s, ["DI SẢN KHÔNG CHỈ ĐỂ NHÌN.", "MÀ ĐỂ CHẠM, XOAY", "& SƯU TẦM."],
         0.9, 1.5, 11.6, max_pt=58, min_pt=38, color=WHITE)

cards = [
    ("BẢO TÀNG CỔ VẬT 3D",
     "Xoay 360° 10 bảo vật Hoàng cung — Ngai vàng, Cửu Đỉnh, Mũ Bình thiên — bằng WebGL, mỗi mô hình .glb < 2MB."),
    ("GREEN POINTS",
     "Quét QR tích 10 – 50 điểm xanh mỗi điểm đến; khuyến khích đi bộ, đạp xe, ghé quán hẻm và 4 làng nghề."),
    ("E-CERTIFICATE",
     "Đủ 150 điểm → chứng nhận “Đại sứ Di sản Xanh Cố đô” có QR xác thực, chia sẻ MXH và ưu đãi 10% workshop."),
]
y = 4.45
for title, desc in cards:
    rect(s, 0.9, y, 11.5, 1.2, fill="0A0805", alpha=0.7, radius=0.05)
    rect(s, 0.9, y, 0.06, 1.2, fill=GOLD)
    txt(s, 1.22, y + 0.14, 10.9, 0.3,
        [{"runs": [(title, {"size": 13, "bold": True, "color": "F2D9A6",
                            "font": LABEL, "tracking": 0.14})]}])
    txt(s, 1.22, y + 0.47, 10.85, 0.7,
        [{"runs": [(desc, {"size": 12.5, "color": "E8E4DA"})], "line": 1.22}])
    y += 1.3

# certificate
CERT_W = 4.55
CERT_H = CERT_W * 1650 / 1279
cert_y = 1.45
rect(s, 14.1, cert_y - 0.08, CERT_W + 0.16, CERT_H + 0.16, fill=WHITE, alpha=0.16, radius=0.02)
pic(s, source("certificate.png"), 14.18, cert_y, CERT_W, CERT_H)
txt(s, 14.1, cert_y + CERT_H + 0.1, CERT_W + 0.2, 0.3,
    [{"runs": [("Chứng nhận điện tử có mã QR xác thực", {"size": 9, "color": "E8E4DA"})], "align": "c"}])
txt(s, 14.1, 8.0, CERT_W + 0.25, 1.0,
    [{"runs": [("“Mỗi lượt quét QR là một lần di sản được kể lại.”",
                {"size": 16, "color": "F2D9A6", "font": SERIF, "italic": True})],
      "align": "c", "line": 1.15}])
txt(s, 14.1, 9.12, CERT_W + 0.25, 0.35,
    [{"runs": [("10 BẢO VẬT  ·  150 GREEN POINTS  ·  4 LÀNG NGHỀ",
                {"size": 8, "color": "D8D2C6", "font": LABEL, "tracking": 0.1})], "align": "c"}])

chips = ["Chatbot AI Mệ Huế tư vấn bằng phương ngữ", "Chia sẻ lịch trình 1 chạm qua link #d="]
x = 0.9
for c in chips:
    w = 0.18 + text_width_pt(c, BODY, False, 10) / 72.0
    rect(s, x, 8.62, w, 0.42, fill="0A0805", alpha=0.5, radius=0.21, line="6B6252", lw=0.75)
    txt(s, x, 8.62, w, 0.42,
        [{"runs": [(c, {"size": 10, "color": WHITE})], "align": "c"}], anchor="m")
    x += w + 0.2

# =====================================================================
# 05 — TECHNOLOGY
# =====================================================================
s = new_slide()
page(s, 5, "04 / Công nghệ", bg=CREAM)
eyebrow(s, 1.18, "Kiến trúc & dữ liệu không gian")
headline(s, ["TINH GỌN TRÊN MẶT TIỀN.", "CHẮC CHẮN Ở TẦNG DỮ LIỆU."],
         0.9, 1.5, 12.6, max_pt=60, min_pt=40)

txt(s, 0.9, 3.22, 12.4, 0.6,
    [{"runs": [("Một kiến trúc đủ nhẹ để mở tức thì, đủ chắc để chạy offline trong lăng tẩm.",
                {"size": 14.5, "color": GRAY})]}])

layers = [
    ("01 · CLIENT", "Web / PWA", "Tải trang < 1,5s  ·  Offline Cache  ·  LocalStorage"),
    ("02 · SERVICES", "Bộ xử lý thông minh",
     "Geofencing 35m  ·  Weather-Adaptive 1-Click  ·  Itinerary Optimizer  ·  Audio Pass"),
]
y = 3.85
for lab, title, desc in layers:
    txt(s, 0.9, y, 6.0, 0.28,
        [{"runs": [(lab, {"size": 9.5, "bold": True, "color": BLUE, "font": LABEL, "tracking": 0.16})]}])
    rect(s, 0.9, y + 0.32, 12.3, 1.15, fill=WHITE, line=GRAY_LIGHT, lw=0.9, radius=0.06)
    txt(s, 1.15, y + 0.42, 3.5, 0.4,
        [{"runs": [(title, {"size": 17, "bold": True, "color": INK})]}])
    txt(s, 1.15, y + 0.82, 11.8, 0.4,
        [{"runs": [(desc, {"size": 10.5, "color": GRAY})]}])
    y += 1.6

arrow_down(s, 6.75, 6.98, 0.32, 0.28, color=GRAY_MID)
y = 7.05
txt(s, 0.9, y, 6.0, 0.28,
    [{"runs": [("03 · DATA", {"size": 9.5, "bold": True, "color": BLUE, "font": LABEL, "tracking": 0.16})]}])
rect(s, 0.9, y + 0.32, 12.3, 2.5, fill=WHITE, line=GRAY_LIGHT, lw=0.9, radius=0.06)
txt(s, 1.15, y + 0.44, 5.4, 0.4,
    [{"runs": [("PostGIS · 19 bảng chuẩn hoá", {"size": 17, "bold": True, "color": INK})]}])
rect(s, 1.15, y + 0.95, 5.7, 1.4, fill=BLUE_PALE, radius=0.05)
txt(s, 1.3, y + 1.02, 5.4, 0.28,
    [{"runs": [("4A · KHÔNG GIAN & NỘI DUNG", {"size": 8.5, "bold": True, "color": BLUE, "font": LABEL, "tracking": 0.1})]}])
txt(s, 1.3, y + 1.3, 5.4, 0.95,
    [{"runs": [("150+ địa điểm GPS · ẩm thực kiệt hẻm · 10 cổ vật 3D · nhãn thời tiết Nắng/Mưa",
                {"size": 9.5, "color": INK})], "line": 1.2}])
rect(s, 7.05, y + 0.95, 5.9, 1.4, fill=GOLD_LIGHT, radius=0.05)
txt(s, 7.2, y + 1.02, 5.6, 0.28,
    [{"runs": [("4B · NGƯỜI DÙNG & GIAO DỊCH", {"size": 8.5, "bold": True, "color": "8A6420", "font": LABEL, "tracking": 0.1})]}])
txt(s, 7.2, y + 1.3, 5.6, 0.95,
    [{"runs": [("Lịch trình kéo–thả · sổ cái điểm xanh · chứng nhận điện tử · đối soát hoa hồng Affiliate",
                {"size": 9.5, "color": INK})], "line": 1.2}])

# right metrics
metrics = [("< 1,5s", "Tải trang lần đầu"), ("19", "Bảng dữ liệu chuẩn hoá"),
           ("35m", "Bán kính kích hoạt GPS"), ("< 300ms", "Độ trễ thuyết minh")]
y = 3.95
for big, lab in metrics:
    txt(s, 14.1, y, 4.8, 0.75,
        [{"runs": [(big, {"size": 40, "font": DISPLAY, "color": BLUE})]}], anchor="b")
    txt(s, 14.1, y + 0.78, 4.8, 0.3,
        [{"runs": [(lab, {"size": 10.5, "color": GRAY, "font": LABEL, "tracking": 0.06})]}])
    hline(s, 14.1, y + 1.12, 4.9, color="D5CFC1", thickness=0.008)
    y += 1.4

txt(s, 14.1, 9.78, 4.9, 0.7,
    [{"runs": [("Vào lăng tẩm mất sóng 4G: bản đồ và lịch trình vẫn chạy nhờ lưu đệm ngoại tuyến.",
                {"size": 9.5, "color": GRAY, "italic": True})], "line": 1.2}])

# =====================================================================
# 06 — MARKET
# =====================================================================
s = new_slide()
page(s, 6, "05 / Thị trường")
eyebrow(s, 1.18, "TAM – SAM – SOM")
headline(s, ["KHÔNG ĐÁNH CẢ 4,2 TRIỆU.", "CHỈ CẦN 680.000 NGƯỜI ĐÚNG."],
         0.9, 1.5, 13.6, max_pt=58, min_pt=40)

bars = [
    ("TAM · Toàn thị trường", "4,2 TRIỆU", "lượt khách đến Huế / năm", 11.6, BLUE_DARK, 4.55),
    ("SAM · Khách tự túc FIT", "1,89 TRIỆU", "lượt khách / năm", 7.3, BLUE, 6.15),
    ("SOM · Beachhead", "680.000", "khách 18–35 tuổi / năm", 3.35, GOLD, 7.75),
]
for lab, big, small, w, col, y in bars:
    txt(s, 0.9, y - 0.42, 8.0, 0.3,
        [{"runs": [(lab.upper(), {"size": 9.5, "bold": True, "color": GRAY, "font": LABEL,
                                  "tracking": 0.14})]}])
    rect(s, 0.9, y, w, 1.05, fill=col, radius=0.04)
    txt(s, 1.1, y + 0.08, w - 0.3, 0.55,
        [{"runs": [(big, {"size": 28, "font": DISPLAY, "color": WHITE})]}], anchor="m")
    txt(s, 1.1, y + 0.62, w - 0.3, 0.3,
        [{"runs": [(small, {"size": 10, "color": "EAF2F6"})]}], anchor="m")

txt(s, 0.9, 9.05, 11.7, 0.7,
    [{"runs": [("Beachhead: Gen Z, sinh viên & Millennials trẻ 18–35 tuổi — nhóm nhạy giá, đi tự túc và dùng di động thành thạo.",
                {"size": 11, "color": GRAY})], "line": 1.2}])

# SOM card
rect(s, 13.25, 4.15, 5.85, 5.9, fill=CREAM, radius=0.05)
txt(s, 13.55, 4.36, 5.2, 0.3,
    [{"runs": [("SOM · TÍNH TỪ DƯỚI LÊN", {"size": 9.5, "bold": True, "color": BLUE,
                                            "font": LABEL, "tracking": 0.14})]}])
txt(s, 13.55, 4.65, 5.2, 0.5,
    [{"runs": [("AOV = 45.000đ / giao dịch", {"size": 12, "bold": True, "color": INK})]}])
rows = [
    ("NĂM 1 · 2027", "45.000 người dùng", "8.000 GD", "360 tr"),
    ("NĂM 2 · 2028", "95.000 người dùng", "17.333 GD", "780 tr"),
    ("NĂM 3 · 2029", "180.000 người dùng", "32.222 GD", "1.450 tr"),
]
y = 5.2
for year, users, gd, rev in rows:
    hline(s, 13.55, y, 5.25, color="D5CFC1", thickness=0.008)
    txt(s, 13.55, y + 0.12, 5.2, 0.26,
        [{"runs": [(year, {"size": 8.5, "bold": True, "color": GRAY, "font": LABEL, "tracking": 0.12})]}])
    txt(s, 13.55, y + 0.4, 3.3, 0.55,
        [{"runs": [(rev, {"size": 27, "font": DISPLAY, "color": BLUE})]}], anchor="m")
    txt(s, 13.55, y + 0.95, 5.2, 0.3,
        [{"runs": [(users + "  →  " + gd, {"size": 9.5, "color": GRAY})]}])
    y += 1.42
hline(s, 13.55, 9.55, 5.25, color="D5CFC1", thickness=0.008)
txt(s, 13.55, 9.62, 5.2, 0.3,
    [{"runs": [("TỔNG 3 NĂM", {"size": 8.5, "bold": True, "color": GRAY, "font": LABEL, "tracking": 0.12}),
               ("     2.590 triệu VNĐ", {"size": 11, "bold": True, "color": GOLD})]}])
txt(s, 13.55, 9.92, 5.2, 0.25,
    [{"runs": [("Đơn vị doanh thu: triệu VNĐ", {"size": 8, "color": GRAY_MID, "italic": True})]}])

# =====================================================================
# 07 — BUSINESS MODEL
# =====================================================================
s = new_slide()
page(s, 7, "06 / Mô hình kinh doanh")
eyebrow(s, 1.18, "Business Model Canvas tinh gọn")
headline(s, ["PIVOT KHỎI PHẦN NẶNG.", "SỐNG BẰNG PHẦN MỀM."],
         0.9, 1.5, 12.4, max_pt=64, min_pt=44)

# removed
txt(s, 0.9, 3.72, 5.5, 0.3,
    [{"runs": [("ĐÃ LOẠI BỎ KHỎI MÔ HÌNH", {"size": 9.5, "bold": True, "color": RED,
                                             "font": LABEL, "tracking": 0.14})]}])
removed = [
    ("Tour ghép tự tổ chức", "450k – 550k/khách · gánh nặng vận hành, giấy phép lữ hành"),
    ("Xưởng đóng hộp quà", "320k/hộp · kho bãi, ẩm mốc mùa mưa, định phí cao"),
]
x = 0.9
for title, note in removed:
    w = 8.85
    rect(s, x, 4.05, w, 0.82, fill="F7EDE9", radius=0.05)
    txt(s, x + 0.22, 4.12, w - 0.4, 0.3,
        [{"runs": [("✕  ", {"size": 11, "bold": True, "color": RED}),
                   (title, {"size": 12, "bold": True, "color": "7A2E1E", "strike": True})]}])
    txt(s, x + 0.45, 4.44, w - 0.6, 0.3,
        [{"runs": [(note, {"size": 9.5, "color": GRAY})]}])
    x += 9.05

# revenue
txt(s, 0.9, 5.2, 7.0, 0.3,
    [{"runs": [("3 NGUỒN DOANH THU", {"size": 9.5, "bold": True, "color": BLUE,
                                       "font": LABEL, "tracking": 0.14})]}])
# stacked bar
BX, BY, BW, BH = 0.9, 5.55, 18.2, 0.5
rect(s, BX, BY, BW * 0.55, BH, fill=BLUE)
rect(s, BX + BW * 0.55, BY, BW * 0.35, BH, fill=GOLD)
rect(s, BX + BW * 0.90, BY, BW * 0.10, BH, fill=GRAY_MID)
txt(s, BX + 0.15, BY, BW * 0.55 - 0.3, BH,
    [{"runs": [("AUDIO PASS · 55%", {"size": 11, "bold": True, "color": WHITE, "font": LABEL,
                                     "tracking": 0.1})]}], anchor="m")
txt(s, BX + BW * 0.55 + 0.15, BY, BW * 0.35 - 0.3, BH,
    [{"runs": [("AFFILIATE · 35%", {"size": 11, "bold": True, "color": WHITE, "font": LABEL,
                                    "tracking": 0.1})]}], anchor="m")
txt(s, BX + BW * 0.90, BY, BW * 0.10, BH,
    [{"runs": [("10%", {"size": 11, "bold": True, "color": WHITE, "font": LABEL})], "align": "c"}],
    anchor="m")

streams = [
    ("55%", "Micro-fee Audio Pass", "29.000 – 49.000đ/chuyến mở khoá thuyết minh GPS."),
    ("35%", "Affiliate Booking", "Hoa hồng 8–15%: vé di tích, xe buýt, homestay, workshop 4 làng nghề Tây Hồ – Thanh Tiên – Thủy Xuân – Bao La."),
    ("10%", "Local Sponsor", "Gói tài trợ hiển thị 500k – 1 triệu/tháng cho khách sạn, nhà hàng lớn."),
]
y = 6.32
for pct, title, desc in streams:
    txt(s, 0.9, y, 1.45, 0.65,
        [{"runs": [(pct, {"size": 30, "font": DISPLAY, "color": BLUE})]}], anchor="m")
    txt(s, 2.35, y - 0.02, 2.3, 0.35,
        [{"runs": [(title, {"size": 13.5, "bold": True, "color": INK})]}])
    txt(s, 4.75, y - 0.02, 14.2, 0.62,
        [{"runs": [(desc, {"size": 10.5, "color": GRAY})], "line": 1.15}])
    hline(s, 0.9, y + 0.82, 18.2, color=GRAY_LIGHT, thickness=0.008)
    y += 1.02

rect(s, 0.9, 9.55, 18.2, 0.72, fill=BLUE_PALE, radius=0.05)
txt(s, 1.12, 9.55, 17.8, 0.72,
    [{"runs": [("PHỄU MIỄN PHÍ 100%:  ", {"size": 10, "bold": True, "color": BLUE, "font": LABEL, "tracking": 0.1}),
               ("cẩm nang, lập lịch trình, dự toán ngân sách cho du khách — và miễn phí trọn đời cho quán bún bò, chè hẻm của các mệ.",
                {"size": 10, "color": INK})]}], anchor="m")

# =====================================================================
# 08 — COMPETITION
# =====================================================================
s = new_slide()
page(s, 8, "07 / Cạnh tranh", bg=CREAM)
eyebrow(s, 1.18, "Lợi thế & bài học thị trường")
headline(s, ["KHÔNG ĐỐT TIỀN ĐẤU OTA.", "THẮNG Ở NGÁCH SIÊU BẢN ĐỊA."],
         0.9, 1.5, 15.4, max_pt=60, min_pt=40)

COLS = [("Tiêu chí", 0.9, 4.55), ("HUEGO", 5.45, 3.35), ("Google Maps / Review", 8.8, 3.35),
        ("Tour / OTA", 12.15, 3.35), ("Thuê HDV riêng", 15.5, 3.6)]
for name, x, w in COLS:
    if name == "HUEGO":
        rect(s, x, 3.95, w, 0.5, fill=BLUE, radius=0.03)
        txt(s, x, 3.95, w, 0.5,
            [{"runs": [(name, {"size": 10.5, "bold": True, "color": WHITE, "font": LABEL,
                               "tracking": 0.12})], "align": "c"}], anchor="m")
    else:
        txt(s, x, 3.95, w, 0.5,
            [{"runs": [(name.upper(), {"size": 9, "bold": True, "color": GRAY, "font": LABEL,
                                        "tracking": 0.1})], "align": "c" if x > 1 else "l"}], anchor="m")

rows = [
    ("Dữ liệu tinh chọn, không quảng cáo ảo", "✓", "~", "~", "✓"),
    ("Dự toán ngân sách theo ngày", "✓", "✕", "✕", "✕"),
    ("Lọc thời tiết Nắng / Mưa", "✓", "✕", "✕", "✕"),
    ("Tự do 100% giờ giấc", "✓", "✓", "✕", "✓"),
    ("Chi phí thuyết minh", "29k", "0", "gộp tour", "500k–1tr"),
]
y = 4.52
for i, (label, a, b, c, d) in enumerate(rows):
    if i % 2 == 0:
        rect(s, 0.9, y, 18.2, 0.62, fill=WHITE, alpha=0.65)
    txt(s, 1.05, y, 4.4, 0.62, [{"runs": [(label, {"size": 10.5, "color": INK})]}], anchor="m")
    for val, x, w in [(a, 5.45, 3.35), (b, 8.8, 3.35), (c, 12.15, 3.35), (d, 15.5, 3.6)]:
        col = BLUE if val == "✓" else (GRAY_MID if val in ("~", "0") else RED)
        if val in ("29k", "gộp tour", "500k–1tr", "0"):
            col = INK if val == "29k" else GRAY
        txt(s, x, y, w, 0.62,
            [{"runs": [(val, {"size": 13 if val in ("✓", "✕", "~") else 10.5,
                               "bold": val in ("✓", "✕", "29k"), "color": col})], "align": "c"}],
            anchor="m")
    hline(s, 0.9, y + 0.62, 18.2, color=GRAY_LIGHT, thickness=0.006)
    y += 0.62

# case study
rect(s, 0.9, 8.1, 8.9, 2.15, fill=WHITE, radius=0.05)
txt(s, 1.12, 8.22, 8.4, 0.3,
    [{"runs": [("BÀI HỌC TỪ VNTRIP & LUXSTAY", {"size": 9, "bold": True, "color": RED,
                                                 "font": LABEL, "tracking": 0.14})]}])
txt(s, 1.12, 8.55, 8.4, 1.0,
    [{"runs": [("Vntrip từng được định giá ~1.000 tỷ đồng, chi mạnh marketing nhưng vẫn chỉ chiếm phần nhỏ thị phần trước Agoda, Booking.com. Luxstay rút khỏi du lịch sau đại dịch.",
                {"size": 10.5, "color": INK})], "line": 1.22}])
txt(s, 1.12, 9.55, 8.4, 0.5,
    [{"runs": [("→ Bài học: không đốt tiền mua thị phần đại trà.", {"size": 11, "bold": True, "color": RED})]}])

rect(s, 10.0, 8.1, 9.1, 2.15, fill=INK, radius=0.05)
txt(s, 10.25, 8.22, 8.6, 0.3,
    [{"runs": [("CHIẾN LƯỢC CỦA HUEGO", {"size": 9, "bold": True, "color": "E4C98B",
                                          "font": LABEL, "tracking": 0.14})]}])
txt(s, 10.25, 8.55, 8.6, 1.0,
    [{"runs": [("Không đốt tiền chạy quảng cáo đại trà đối đầu OTA ngoại. Không ôm hàng tồn kho. Tập trung sâu vào ngách siêu bản địa Huế với định phí cực thấp.",
                {"size": 10.5, "color": WHITE})], "line": 1.22}])
txt(s, 10.25, 9.6, 8.6, 0.4,
    [{"runs": [("ĐỊNH PHÍ THẤP  ·  NGÁCH BẢN ĐỊA  ·  KHÔNG TỒN KHO",
                {"size": 8.5, "color": "E4C98B", "font": LABEL, "tracking": 0.12})]}])

# =====================================================================
# 09 — UNIT ECONOMICS
# =====================================================================
s = new_slide()
page(s, 9, "08 / Kinh tế đơn vị")
eyebrow(s, 1.18, "Unit Economics")
headline(s, ["80% BIÊN ĐÓNG GÓP.", "HÒA VỐN CHỈ 12 GIAO DỊCH/NGÀY."],
         0.9, 1.5, 15.4, max_pt=60, min_pt=40)

kpis = [("AOV", "45.000đ", "Doanh thu / giao dịch"),
        ("AVC", "9.000đ", "Biến phí · 20% (cổng TT, CDN)"),
        ("CM", "36.000đ", "Biên đóng góp · 80%"),
        ("FC", "13.000.000đ", "Định phí vận hành / tháng")]
x = 0.9
for lab, big, note in kpis:
    rect(s, x, 3.85, 4.3, 1.7, fill=CREAM if lab != "CM" else BLUE_PALE, radius=0.05)
    txt(s, x + 0.25, 3.98, 3.8, 0.25,
        [{"runs": [(lab, {"size": 9, "bold": True, "color": BLUE, "font": LABEL, "tracking": 0.18})]}])
    txt(s, x + 0.25, 4.2, 3.85, 0.62,
        [{"runs": [(big, {"size": 29 if lab != "FC" else 25, "font": DISPLAY, "color": INK})]}], anchor="m")
    txt(s, x + 0.25, 4.88, 3.8, 0.55,
        [{"runs": [(note, {"size": 9.5, "color": GRAY})], "line": 1.1}])
    x += 4.62

# break-even formula
rect(s, 0.9, 5.95, 18.2, 1.85, fill=INK, radius=0.05)
txt(s, 1.2, 6.1, 5.4, 0.3,
    [{"runs": [("SẢN LƯỢNG HÒA VỐN", {"size": 9.5, "bold": True, "color": "E4C98B",
                                       "font": LABEL, "tracking": 0.16})]}])
txt(s, 1.2, 6.42, 4.6, 0.55,
    [{"runs": [("13.000.000", {"size": 30, "font": DISPLAY, "color": WHITE})]}])
txt(s, 5.55, 6.42, 0.6, 0.55,
    [{"runs": [("÷", {"size": 26, "color": "E4C98B"})], "align": "c"}], anchor="m")
txt(s, 6.05, 6.42, 3.4, 0.55,
    [{"runs": [("36.000", {"size": 30, "font": DISPLAY, "color": WHITE})]}])
txt(s, 9.15, 6.42, 0.7, 0.55,
    [{"runs": [("=", {"size": 26, "color": "E4C98B"})], "align": "c"}], anchor="m")
txt(s, 9.7, 6.35, 4.3, 0.65,
    [{"runs": [("361 GD/tháng", {"size": 34, "font": DISPLAY, "color": "E4C98B"})]}], anchor="m")
txt(s, 1.2, 7.08, 11.6, 0.45,
    [{"runs": [("≈ 12 giao dịch/ngày  →  doanh thu hòa vốn chỉ 16,25 triệu VNĐ/tháng",
                {"size": 12.5, "color": "E8E2D6"})]}])
txt(s, 14.0, 6.18, 4.9, 0.35,
    [{"runs": [("CAC 18.000đ  ·  LTV 72.000đ", {"size": 9.5, "color": "CFC7B8"})]}])
txt(s, 14.0, 6.55, 4.9, 0.8,
    [{"runs": [("LTV / CAC = 4,0×", {"size": 30, "font": DISPLAY, "color": WHITE})]}])
txt(s, 14.0, 7.28, 4.9, 0.3,
    [{"runs": [("Chuẩn lành mạnh > 3,0×", {"size": 9, "color": "CFC7B8"})]}])

# FC breakdown + note
txt(s, 0.9, 8.15, 8.5, 0.3,
    [{"runs": [("CẤU TRÚC ĐỊNH PHÍ 13 TRIỆU/THÁNG", {"size": 9, "bold": True, "color": GRAY,
                                                       "font": LABEL, "tracking": 0.14})]}])
fc = [("Server Cloud", "3,0 tr"), ("Marketing số", "6,0 tr"),
      ("Quản lý & tên miền", "2,5 tr"), ("Khấu hao", "1,5 tr")]
x = 0.9
for name, val in fc:
    txt(s, x, 8.5, 3.9, 0.3, [{"runs": [(name, {"size": 10, "color": GRAY})]}])
    txt(s, x, 8.8, 3.9, 0.45, [{"runs": [(val, {"size": 18, "font": DISPLAY, "color": INK})]}])
    x += 4.55
hline(s, 0.9, 9.5, 18.2, color=GRAY_LIGHT, thickness=0.008)
txt(s, 0.9, 9.65, 18.2, 0.7,
    [{"runs": [("Vì sao hòa vốn thấp?  ", {"size": 10, "bold": True, "color": BLUE}),
               ("Mô hình phần mềm: không tồn kho, không hướng dẫn viên, không văn phòng — mỗi giao dịch thêm chỉ tốn 9.000đ biến phí.",
                {"size": 10, "color": GRAY})]}])

# =====================================================================
# 10 — FINANCIALS
# =====================================================================
s = new_slide()
page(s, 10, "09 / Tài chính")
eyebrow(s, 1.18, "Dự phóng 2027 – 2031")
headline(s, ["360 TRIỆU → 3,5 TỶ.", "HOÀN VỐN THÁNG 16."],
         0.9, 1.5, 12.8, max_pt=66, min_pt=44)

chart_data = CategoryChartData()
chart_data.categories = ["2027", "2028", "2029", "2031"]
chart_data.add_series("Doanh thu", (360, 780, 1450, 3500))
chart_data.add_series("Lợi nhuận ròng", (85, 280, 590, 1650))
gf = s.shapes.add_chart(XL_CHART_TYPE.COLUMN_CLUSTERED, Inches(0.9), Inches(3.95),
                        Inches(12.9), Inches(6.0), chart_data)
ch = gf.chart
ch.font.name = BODY
ch.font.size = Pt(10)
ch.font.color.rgb = C(INK)
ch.has_legend = True
ch.legend.position = XL_LEGEND_POSITION.BOTTOM
ch.legend.include_in_layout = False
ch.legend.font.size = Pt(10)
plot = ch.plots[0]
plot.gap_width = 65
plot.overlap = -8
ser1, ser2 = plot.series[0], plot.series[1]
for ser, col in ((ser1, BLUE), (ser2, GOLD)):
    ser.format.fill.solid()
    ser.format.fill.fore_color.rgb = C(col)
    ser.format.line.fill.background()
    dl = ser.data_labels
    dl.show_value = True
    dl.number_format = "#,##0"
    dl.number_format_is_linked = False
    dl.font.size = Pt(9)
    dl.font.bold = True
    dl.font.color.rgb = C(col)
    dl.position = XL_LABEL_POSITION.OUTSIDE_END

va = ch.value_axis
va.maximum_scale = 4000
va.minimum_scale = 0
va.major_unit = 1000
va.has_major_gridlines = True
va.major_gridlines.format.line.color.rgb = C("E3DFD4")
va.major_gridlines.format.line.width = Pt(0.6)
va.tick_labels.number_format = "#,##0"
va.tick_labels.number_format_is_linked = False
va.tick_labels.font.size = Pt(9)
va.tick_labels.font.color.rgb = C(GRAY)
va.format.line.fill.background()
ca = ch.category_axis
ca.tick_labels.font.size = Pt(12)
ca.tick_labels.font.bold = True
ca.format.line.color.rgb = C(GRAY_LIGHT)
ca.has_major_gridlines = False

txt(s, 0.95, 10.2, 12.8, 0.3,
    [{"runs": [("Đơn vị: triệu VNĐ · Năm 4 tăng trưởng theo lộ trình mở rộng vùng, không đưa vào biểu đồ để giữ đúng dữ liệu gốc.",
                {"size": 8, "color": GRAY_MID, "italic": True})]}])

kpis = [("NPV", "+2.476,5 tr", "Suất chiết khấu 12%"),
        ("IRR", "48,5%", "Tỷ suất hoàn vốn nội bộ"),
        ("ROS năm 5", "47,14%", "Lợi nhuận / doanh thu"),
        ("Hòa vốn lũy kế", "Tháng 16", "Quý 2/2028")]
y = 4.05
for lab, big, note in kpis:
    txt(s, 14.35, y, 4.7, 0.28,
        [{"runs": [(lab.upper(), {"size": 8.5, "bold": True, "color": GRAY, "font": LABEL,
                                  "tracking": 0.14})]}])
    txt(s, 14.35, y + 0.28, 4.7, 0.6,
        [{"runs": [(big, {"size": 28, "font": DISPLAY, "color": BLUE})]}], anchor="m")
    txt(s, 14.35, y + 0.9, 4.7, 0.28,
        [{"runs": [(note, {"size": 9, "color": GRAY})]}])
    hline(s, 14.35, y + 1.2, 4.75, color=GRAY_LIGHT, thickness=0.008)
    y += 1.42

# =====================================================================
# 11 — SEED ROUND (dark)
# =====================================================================
s = new_slide()
page(s, 11, "10 / Gọi vốn", dark=True, bg=BLUE_DEEP)
# subtle decorative arcs
circle(s, 15.4, -2.6, 8.0, None, line="123D4E", lw=1.2)
circle(s, 16.4, -1.6, 6.0, None, line="123D4E", lw=1.2)

eyebrow(s, 1.18, "Seed round · 500 triệu VNĐ", color="E4C98B")
headline(s, ["500 TRIỆU ĐỔI 10–15%.", "GIẢI NGÂN THEO KPI."],
         0.9, 1.5, 12.4, max_pt=60, min_pt=40, color=WHITE)

chips = [("PRE-MONEY", "3,5 tỷ"), ("POST-MONEY", "4,0 tỷ"), ("RUNWAY", "18–24 tháng")]
x = 0.9
for lab, val in chips:
    w = 2.55
    rect(s, x, 3.55, w, 0.72, fill=WHITE, alpha=0.08, radius=0.05)
    txt(s, x + 0.18, 3.62, w - 0.3, 0.22,
        [{"runs": [(lab, {"size": 7.5, "bold": True, "color": "A9C3D0", "font": LABEL, "tracking": 0.14})]}])
    txt(s, x + 0.18, 3.83, w - 0.3, 0.36,
        [{"runs": [(val, {"size": 15, "bold": True, "color": WHITE})]}])
    x += 2.7

# doughnut
cd = CategoryChartData()
cd.categories = ["Công nghệ & thuật toán", "Tăng trưởng người dùng", "Audio & đối tác bản địa",
                 "Pháp lý, bản quyền", "Dự phòng"]
cd.add_series("Phân bổ", (0.30, 0.26, 0.24, 0.12, 0.08))
gfd = s.shapes.add_chart(XL_CHART_TYPE.DOUGHNUT, Inches(0.85), Inches(4.55),
                         Inches(5.5), Inches(5.5), cd)
chd = gfd.chart
chd.has_legend = False
chd.font.name = BODY
chd.font.size = Pt(9)
chd.font.color.rgb = C(WHITE)
try:
    chd.format.fill.background()
except Exception:
    pass
try:
    chd.plots[0].format.fill.background()
except Exception:
    pass
hole = chd._chartSpace.find(".//" + qn("c:holeSize"))
if hole is not None:
    hole.set("val", "64")
dcols = [BLUE, GOLD, "6FA9C4", "8C8577", "3D5B6B"]
for i, col in enumerate(dcols):
    pt = chd.plots[0].series[0].points[i]
    pt.format.fill.solid()
    pt.format.fill.fore_color.rgb = C(col)
    pt.format.line.color.rgb = C(BLUE_DEEP)
    pt.format.line.width = Pt(2)
txt(s, 2.25, 6.78, 2.7, 0.5,
    [{"runs": [("500", {"size": 34, "font": DISPLAY, "color": WHITE})], "align": "c"}], anchor="m")
txt(s, 2.25, 7.28, 2.7, 0.25,
    [{"runs": [("TRIỆU VNĐ", {"size": 8, "bold": True, "color": "A9C3D0", "font": LABEL,
                              "tracking": 0.18})], "align": "c"}], anchor="m")

# legend
alloc = [("30%", "150 tr", "Công nghệ & thuật toán", BLUE),
         ("26%", "130 tr", "Tăng trưởng người dùng", GOLD),
         ("24%", "120 tr", "Audio & đối tác bản địa", "6FA9C4"),
         ("12%", "60 tr", "Pháp lý, bản quyền", "8C8577"),
         ("8%", "40 tr", "Dự phòng", "3D5B6B")]
y = 4.55
for pct, amt, name, col in alloc:
    rect(s, 6.55, y + 0.07, 0.16, 0.16, fill=col)
    txt(s, 6.85, y, 0.85, 0.32, [{"runs": [(pct, {"size": 13, "bold": True, "color": WHITE})]}])
    txt(s, 7.65, y, 1.0, 0.32, [{"runs": [(amt, {"size": 10, "color": "A9C3D0"})]}], anchor="m")
    txt(s, 8.55, y, 4.2, 0.32, [{"runs": [(name, {"size": 9.5, "color": "E8E2D6"})]}], anchor="m")
    hline(s, 6.55, y + 0.4, 6.1, color="1C4658", thickness=0.006)
    y += 0.5

txt(s, 6.55, 7.25, 6.0, 0.6,
    [{"runs": [("Vốn điều lệ sáng lập 100 triệu đã góp đủ — MVP hoàn thành 7 phase trong 14 tuần.",
                {"size": 9.5, "color": "A9C3D0", "italic": True})], "line": 1.2}])

# tranches
txt(s, 13.2, 4.45, 5.9, 0.3,
    [{"runs": [("LỘ TRÌNH GIẢI NGÂN 3 ĐỢT", {"size": 9, "bold": True, "color": "E4C98B",
                                              "font": LABEL, "tracking": 0.14})]}])
tranches = [("ĐỢT 1 · 40%", "200 tr", "Ký hợp đồng"),
            ("ĐỢT 2 · 40%", "200 tr", "Tháng 6 · đạt 10.000 MAU"),
            ("ĐỢT 3 · 20%", "100 tr", "Tháng 12 · vượt BEP 3 tháng liên tiếp")]
y = 4.8
for lab, amt, kpi in tranches:
    rect(s, 13.2, y, 5.9, 1.32, fill=WHITE, alpha=0.07, radius=0.05)
    rect(s, 13.2, y, 0.05, 1.32, fill=GOLD)
    txt(s, 13.45, y + 0.14, 2.4, 0.24,
        [{"runs": [(lab, {"size": 8, "bold": True, "color": "A9C3D0", "font": LABEL, "tracking": 0.12})]}])
    txt(s, 13.45, y + 0.38, 2.0, 0.5,
        [{"runs": [(amt, {"size": 22, "font": DISPLAY, "color": WHITE})]}])
    txt(s, 15.55, y + 0.3, 3.3, 0.75,
        [{"runs": [(kpi, {"size": 9.5, "color": "E8E2D6"})], "line": 1.2}], anchor="m")
    y += 1.48

# =====================================================================
# 12 — TEAM & ROADMAP
# =====================================================================
s = new_slide()
page(s, 12, "11 / Đội ngũ & lộ trình")
eyebrow(s, 1.18, "Founding team · 30–60–90 · ESG")
headline(s, ["BỐN NGƯỜI. BA NĂNG LỰC.", "MỘT NGÁCH ĐỦ SÂU."],
         0.9, 1.5, 13.2, max_pt=62, min_pt=42)

team = [
    ("Q", "Trương Hữu Anh Quốc", "Founder & CEO", "40%", "Chiến lược, điều phối chung & đối ngoại"),
    ("D", "Hoàng Đức Dương", "Co-Founder & CTO", "25%", "Web/PWA, PostGIS & thuật toán cốt lõi"),
    ("M", "Lương Quang Hoàng Minh", "Co-Founder & CMO/CFO", "20%", "Tiếp thị số, khảo sát & quản trị tài chính"),
    ("T", "Huỳnh Thế Trung", "Co-Founder & COO", "15%", "150+ POIs, Affiliate 4 làng nghề & homestay"),
]
x = 0.9
for initial, name, role, eq, desc in team:
    rect(s, x, 3.9, 4.3, 2.55, fill=CREAM, radius=0.05)
    circle(s, x + 0.25, 4.12, 0.8, BLUE)
    txt(s, x + 0.25, 4.12, 0.8, 0.8,
        [{"runs": [(initial, {"size": 24, "font": DISPLAY, "color": WHITE})], "align": "c"}], anchor="m")
    txt(s, x + 3.35, 4.18, 0.8, 0.3,
        [{"runs": [(eq, {"size": 13, "bold": True, "color": GOLD})], "align": "r"}])
    txt(s, x + 1.2, 4.16, 2.2, 0.55,
        [{"runs": [(name, {"size": 12, "bold": True, "color": INK})], "line": 1.05}], anchor="m")
    txt(s, x + 0.25, 5.08, 3.85, 0.28,
        [{"runs": [(role.upper(), {"size": 8.5, "bold": True, "color": BLUE, "font": LABEL,
                                   "tracking": 0.1})]}])
    txt(s, x + 0.25, 5.45, 3.85, 0.65,
        [{"runs": [(desc, {"size": 11.5, "color": GRAY})], "line": 1.25}])
    txt(s, x + 0.25, 5.86, 2.0, 0.24,
        [{"runs": [("TỶ LỆ CỔ PHẦN", {"size": 7.5, "bold": True, "color": GRAY_MID,
                                      "font": LABEL, "tracking": 0.12})]}])
    rect(s, x + 0.25, 6.14, 3.8, 0.055, fill="DEDAD0")
    rect(s, x + 0.25, 6.14, 3.8 * int(eq.strip("%")) / 40.0, 0.055, fill=GOLD)
    x += 4.62

# 30-60-90
txt(s, 0.9, 6.98, 6.0, 0.3,
    [{"runs": [("LỘ TRÌNH 30 – 60 – 90 NGÀY SAU DEMO DAY", {"size": 9, "bold": True,
                                                              "color": GRAY, "font": LABEL,
                                                              "tracking": 0.14})]}])
steps = [("30", "Ký Affiliate 4 làng nghề"), ("60", "Đặt QR tại 50 homestay bờ Nam sông Hương"),
         ("90", "50 bài Audio bản quyền · vượt hòa vốn tháng 01/2027")]
x = 0.9
for num, desc in steps:
    txt(s, x, 7.3, 0.85, 0.55,
        [{"runs": [(num, {"size": 26, "font": DISPLAY, "color": BLUE})]}], anchor="m")
    txt(s, x + 0.78, 7.3, 4.8, 0.6,
        [{"runs": [(desc, {"size": 10, "color": INK})], "line": 1.15}], anchor="m")
    x += 6.1

# ESG
rect(s, 0.9, 8.25, 18.2, 1.0, fill=INK, radius=0.05)
txt(s, 1.15, 8.35, 2.0, 0.3,
    [{"runs": [("CAM KẾT ESG", {"size": 8.5, "bold": True, "color": "E4C98B",
                                 "font": LABEL, "tracking": 0.14})]}])
txt(s, 1.15, 8.62, 17.6, 0.5,
    [{"runs": [("Giao thông xanh  ·  Số hóa giảm rác thải giấy  ·  Sinh kế trực tiếp cho nghệ nhân  ·  Miễn phí 100% quán gia truyền kiệt hẻm",
                {"size": 10, "color": WHITE})]}])
txt(s, 0.9, 9.48, 18.2, 0.5,
    [{"runs": [("4 cổ đông sáng lập cam kết đồng hành tối thiểu 36 tháng.",
                {"size": 10, "color": GRAY, "italic": True})]}])

# =====================================================================
# 13 — CONCLUSION
# =====================================================================
s = new_slide()
page(s, 13, "12 / Kết luận")
eyebrow(s, 1.18, "Tính khả thi & kiến nghị")
headline(s, ["KHẢ THI TRÊN CẢ BỐN TRỤC."], 0.9, 1.5, 17.8, max_pt=72, min_pt=48)

pillars = [
    ("01", "THỊ TRƯỜNG", "Đúng nỗi đau của 72% khách tự túc.", "91% hài lòng · N = 100"),
    ("02", "CÔNG NGHỆ", "Làm chủ Web/PWA, PostGIS 19 bảng, GPS 35m & bảo tàng 3D.", "MVP đã chạy thật"),
    ("03", "TÀI CHÍNH", "Biên đóng góp 80%, BEP 361 GD/tháng.", "Hoàn vốn tháng 16"),
    ("04", "XÃ HỘI", "Giữ gìn văn hóa kiệt hẻm & 4 làng nghề Cố đô.", "Sinh kế bền vững"),
]
x = 0.9
for num, title, desc, metric in pillars:
    txt(s, x, 3.55, 1.0, 0.5,
        [{"runs": [(num, {"size": 15, "bold": True, "color": GOLD, "font": LABEL,
                          "tracking": 0.1})]}])
    hline(s, x, 4.08, 4.15, color=GRAY_LIGHT, thickness=0.012)
    txt(s, x, 4.22, 4.15, 0.4,
        [{"runs": [(title, {"size": 16, "bold": True, "color": INK})]}])
    txt(s, x, 4.7, 4.1, 1.5,
        [{"runs": [(desc, {"size": 11.5, "color": GRAY})], "line": 1.25}])
    txt(s, x, 5.55, 4.1, 0.4,
        [{"runs": [(metric, {"size": 12, "bold": True, "color": BLUE})]}])
    x += 4.62

rect(s, 0.9, 6.55, 18.2, 3.25, fill=INK, radius=0.05)
txt(s, 1.25, 6.88, 8.0, 0.3,
    [{"runs": [("KIẾN NGHỊ HỢP TÁC", {"size": 9, "bold": True, "color": "E4C98B",
                                       "font": LABEL, "tracking": 0.16})]}])
recs = [("Sở Du lịch & Trung tâm BTDT Cố đô Huế",
         "Tích hợp dữ liệu mở (Open Data) và cơ chế Sandbox đặt mã QR cẩm nang tại điểm công cộng."),
        ("Trường ĐH Kinh tế, ĐH Huế",
         "Tiếp tục bảo trợ chuyên môn và kết nối vườn ươm khởi nghiệp quốc gia.")]
x = 1.25
for title, desc in recs:
    txt(s, x, 7.38, 8.3, 0.45,
        [{"runs": [(title, {"size": 16.5, "bold": True, "color": WHITE})]}])
    txt(s, x, 7.88, 8.2, 1.0,
        [{"runs": [(desc, {"size": 12.5, "color": "D8D2C6"})], "line": 1.3}])
    x += 8.6
vline(s, 9.28, 7.38, 1.3, color="423B2F", thickness=0.012)

hline(s, 1.25, 8.85, 17.5, color="423B2F", thickness=0.012)
txt(s, 1.25, 8.99, 17.5, 0.4,
    [{"runs": [("Cam kết của nhóm: ", {"size": 11.5, "color": "E4C98B"}),
               ("4 cổ đông sáng lập đồng hành tối thiểu 36 tháng.", {"size": 11.5, "color": "D8D2C6"})]}])

# =====================================================================
# 14 — THANK YOU
# =====================================================================
s = new_slide()
pic_cover(s, source("image1.jpeg"), 0, 0, 20, 11.25)
# gate cutout: keep source aspect, crop the bottom so the peak sits at y≈4.3
gate = pic(s, source("image15.png"), 0, 3.26, 20, 7.99)
gate.crop_bottom = 0.401

txt(s, 0.9, 0.55, 5.0, 0.35,
    [{"runs": [("HUEGO", {"size": 14, "bold": True, "color": WHITE, "tracking": 0.18})]}], anchor="m")
txt(s, 11.0, 0.55, 8.1, 0.35,
    [{"runs": [("HỎI & ĐÁP · PHỤ LỤC 15 – 16", {"size": 10, "color": "D6E8F2",
                                                  "font": LABEL, "tracking": 0.16})], "align": "r"}], anchor="m")

txt(s, 0.9, 0.92, 18.2, 3.0,
    [{"runs": [("CẢM ƠN", {"size": 240, "font": DISPLAY, "color": WHITE, "tracking": -0.03})],
      "align": "c", "line": 0.8}], anchor="t")
txt(s, 0.9, 3.58, 18.2, 0.45,
    [{"runs": [("Thầy cô & Hội đồng đã lắng nghe", {"size": 21, "color": WHITE, "font": LIGHT})],
      "align": "c"}], anchor="m")
txt(s, 0.9, 4.05, 18.2, 0.45,
    [{"runs": [("Chạm văn hóa – Tự do khám phá – Tiết kiệm chi phí",
                {"size": 24, "color": "F0D9A8", "font": SERIF, "italic": True})], "align": "c"}], anchor="m")

gradient_stops(s, 0, 9.2, 20, 2.05,
               [(0.0, 0.0), (0.55, 0.22), (1.0, 0.55)])

rect(s, 0, 10.02, 20, 1.23, fill=INK, alpha=0.74)
hline(s, 0, 10.02, 20, color=GOLD, thickness=0.014)
txt(s, 0.9, 10.16, 8.6, 0.28,
    [{"runs": [("NHÓM DỰ ÁN HUEGO · LỚP K57 TIN HỌC KINH TẾ",
                {"size": 8.5, "color": "C9DCE6", "font": LABEL, "tracking": 0.14})]}], anchor="m")
txt(s, 0.9, 10.44, 8.0, 0.45,
    [{"runs": [("contact@huego.vn", {"size": 19, "color": WHITE, "bold": True})]}], anchor="m")
txt(s, 9.6, 10.16, 9.5, 0.28,
    [{"runs": [("KHOA HTTT KINH TẾ – ĐH KINH TẾ, ĐH HUẾ",
                {"size": 8.5, "color": "C9DCE6", "font": LABEL, "tracking": 0.14})], "align": "r"}], anchor="m")
txt(s, 9.6, 10.44, 9.5, 0.4,
    [{"runs": [("Đồ án Khởi nghiệp Đổi mới Sáng tạo · GVHD: ThS. Trần Thái Hòa",
                {"size": 10, "color": "D6E4EC"})], "align": "r"}], anchor="m")

# =====================================================================
# Q&A slides
# =====================================================================
def qa_slide(number, part, range_label, title_lines, qas):
    s = new_slide()
    page(s, number, f"Phụ lục Q&A · {part} / 02", bg=CREAM)
    eyebrow(s, 1.18, f"Phản biện · {range_label}", color=RED)
    headline(s, title_lines, 0.9, 1.5, 17.6, max_pt=48, min_pt=30)
    positions = [(0.9, 3.5), (10.1, 3.5), (0.9, 6.75), (10.1, 6.75)]
    for (q, a), (x, y) in zip(qas, positions):
        rect(s, x, y, 8.9, 3.0, fill=WHITE, radius=0.03)
        rect(s, x, y, 0.06, 3.0, fill=RED)
        txt(s, x + 0.3, y + 0.19, 0.75, 0.45,
            [{"runs": [(q[0].zfill(2), {"size": 17, "bold": True, "color": RED,
                                        "font": LABEL, "tracking": 0.04})]}], anchor="m")
        txt(s, x + 1.05, y + 0.18, 7.55, 0.72,
            [{"runs": [(q[1], {"size": 15.5, "bold": True, "color": INK})], "line": 1.12}])
        txt(s, x + 0.3, y + 0.98, 8.3, 1.9,
            [{"runs": [(a, {"size": 15.5, "color": "4F4A41"})], "line": 1.32}])


qa_slide(15, "01", "CÂU 1 – 4", ["MÔ HÌNH KINH DOANH,", "DOANH THU & ĐỐI TÁC"], [
    (("1", "Gen Z quen dùng miễn phí, liệu có trả 29k – 49k cho Audio Pass?"),
     "Thuê HDV riêng tại điểm tốn 500k – 1M/buổi, gấp ~20 lần. Khảo sát N = 100 cho thấy 68% sẵn sàng trả 29k – 49k vì chỉ bằng một ly trà sữa cho cả chuyến đi. Ứng dụng miễn phí bản đồ, lập lịch trình và 3 điểm nghe thử trước khi mở khoá qua VietQR/MoMo trong 10 giây."),
    (("2", "Tại sao không tự tổ chức tour ghép hoặc bán hộp quà lưu niệm?"),
     "Tự làm tour và đóng hộp quà đẩy định phí lên >37 triệu/tháng, cần giấy phép lữ hành ký quỹ 100 – 250 triệu, rủi ro ẩm mốc mùa mưa và xung đột với tâm lý thích tự do. Mô hình nền tảng Affiliate giữ định phí 13 triệu/tháng và biên đóng góp 80%."),
    (("3", "Làm sao thuyết phục các mệ bán bún bò hẻm và nghệ nhân lớn tuổi hợp tác?"),
     "HUEGO miễn phí 100% trọn đời cho quán ăn kiệt hẻm — nhóm tự đến đo GPS, chụp ảnh. Với 4 làng nghề: không đóng phí cố định, nghệ nhân tự đón khách tại xưởng và trích 10% khi có đơn thành công, đối soát vào ngày 05 hàng tháng."),
    (("4", "Vì sao dự phóng doanh thu Năm 5 lên tới 3,5 tỷ VNĐ?"),
     "Hai năm đầu tập trung làm chủ thị trường Huế (45.000 → 95.000 MAU). Từ Năm 3, nhờ bảng provinces thiết kế sẵn trong PostGIS, HUEGO mở rộng ra Hội An, Đà Nẵng, Quảng Trị — nâng 32.222 GD (Năm 3) lên 77.778 GD (Năm 5), tương ứng 300.000 – 400.000 MAU toàn vùng."),
])

qa_slide(16, "02", "CÂU 5 – 8", ["KỸ THUẬT, MÙA MƯA HUẾ", "& TÀI CHÍNH ĐẦU TƯ"], [
    (("5", "Mùa mưa dầm tháng 9 – 1 vắng khách, dự án sống bằng gì?"),
     "Theo Stress Test Kịch bản 3, khách giảm 35% còn 433 GD/tháng; với định phí 13 triệu và BEP 361 GD, dự án vẫn lãi ròng +2,54 triệu/tháng. Thuật toán Weather-Adaptive 1-Click điều hướng khách sang workshop hoa giấy Thanh Tiên, nón Tây Hồ, bảo tàng và quán trà trong nhà."),
    (("6", "Sóng 4G yếu trong lăng tẩm hoặc GPS lệch trong kiệt hẻm thì xử lý thế nào?"),
     "PWA Offline Cache & LocalStorage lưu sẵn lịch trình và dữ liệu cẩm nang vào bộ nhớ trình duyệt. Kết hợp thuật toán bù trễ toạ độ (Dead Reckoning) và nới bán kính Geofencing lên 35 – 50m giúp thuyết minh chạy mượt, không ngắt quãng."),
    (("7", "Điểm hòa vốn lũy kế Tháng 16 (Q2/2028) được tính trên khoản vốn nào?"),
     "Tính trên 100 triệu vốn điều lệ sáng lập: lợi nhuận ròng Năm 1 đạt 85 triệu, cộng dòng tiền ròng và khấu hao thu hồi trong 4 tháng đầu Năm 2. Khoản 500 triệu vòng Seed là vốn mở rộng quy mô, runway 18 – 24 tháng, hoàn vốn đầu Năm 3 khi lợi nhuận lũy kế đạt 955 triệu."),
    (("8", "Vì sao định giá Pre-money 3,5 tỷ trong khi NPV 5 năm chỉ 2,48 tỷ?"),
     "NPV +2.476,5 triệu chỉ là giá trị hiện tại ròng của dòng tiền 5 năm đầu (2027 – 2031), chưa cộng Giá trị kết thúc (Terminal Value) từ Năm 6. Định giá còn dựa trên tài sản đã có: Web/PWA, 19 bảng PostGIS, 150+ POIs, 10 cổ vật 3D, 50 bài Audio và tiềm năng mở rộng Hội An, Đà Nẵng."),
])

for sl, note in zip(prs.slides, NOTES):
    if note:
        sl.notes_slide.notes_text_frame.text = note

prs.save(OUT)
print("saved", OUT, os.path.getsize(OUT))