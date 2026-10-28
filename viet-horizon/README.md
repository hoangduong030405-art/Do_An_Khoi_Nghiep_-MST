# HUEGO — Du Lịch Cố Đô 3D | Khám Phá Di Sản Số Hoàng Gia Huế
### Luxury 3D Scroll-Driven Storytelling Experience (Awwwards / FWA Standard)

Website giới thiệu ứng dụng du lịch số dạng single-page cuộn trang (scroll-driven 3D flight), đưa du khách vào một "chuyến bay" điện ảnh lướt qua các danh thắng hoàng gia của Cố Đô Huế: **Dòng Sông Hương & Cầu Tràng Tiền**, **Tháp Phước Duyên (Chùa Thiên Mụ) & Đêm Hoa Đăng**, **Quần thể Lăng tẩm Triều Nguyễn (Khải Định, Tự Đức) & Đồi Vọng Cảnh**, bộ sưu tập trải nghiệm số HUEGO và **Thiên Cầu Di Sản Số**.

---

## 1. TECH STACK

- **Core**: Vite + Vanilla JS (ES Modules)
- **3D Graphics Engine**: Three.js (r160+)
- **Post-Processing**: `EffectComposer`, `RenderPass`, `UnrealBloomPass` hoàng kim, và Custom `FilmGrain & Vignette ShaderPass`
- **Smooth Scroll**: Lenis (`lenis`)
- **Animation & Timelines**: GSAP + ScrollTrigger
- **Custom GLSL Shaders**:
  - `water.vert.glsl` & `water.frag.glsl`: Sóng nước Sông Hương êm đềm với phản xạ Fresnel góc nhìn & ánh hoàng hôn tím vàng Cố Đô.
  - `lantern.vert.glsl` & `lantern.frag.glsl`: 2,200 đốm sáng hoa đăng sen hồng & đom đóm bờ sông lơ lửng (tối ưu 60fps).
  - `fog.vert.glsl` & `fog.frag.glsl`: Sương mù thể tích lơ lửng thung lũng đồi thông và lăng tẩm hoàng gia.
  - `planeCurve.vert.glsl` & `planeCurve.frag.glsl`: Uốn cong lưới ảnh 3D và tách dải màu quang sai (RGB chromatic aberration) theo vận tốc cuộn trang.
  - `postEffect.js`: Hạt nhiễu phim 35mm và hiệu ứng Vignette điện ảnh.
- **Styling**: CSS thuần hiện đại (CSS Custom Properties, Fluid Typography `clamp()`, Sub-pixel antialiasing).

---

## 2. CÁC PHÂN ĐOẠN TRẢI NGHIỆM CỐ ĐÔ HUẾ

1. **Hero**: Vòm trời Cố Đô Huế nhìn từ trên mây, hướng về Núi Ngự Bình và Kỳ Đài Kinh Thành.
2. **Điểm đến #1: Sông Hương**: Lướt sát mặt nước lam ngọc êm đềm, phản chiếu ráng chiều hoàng hôn và cầu Tràng Tiền.
3. **Điểm đến #2: Tháp Phước Duyên & Hoa Đăng**: Không gian đêm sông Hương lung linh với hơn 2.200 đóa hoa đăng ngũ sắc bập bềnh và tiếng chuông chùa Thiên Mụ.
4. **Điểm đến #3: Quần Thể Lăng Tẩm & Đồi Vọng Cảnh**: Kiến trúc lăng Khải Định, Tự Đức, Minh Mạng giữa đồi thông xanh ngát và làn sương mờ ảo.
5. **Trải Nghiệm Số HUEGO (Gallery 3D)**: Thẻ 3D uốn cong theo tốc độ cuộn:
   - *VR Hoàng Thành 3D*
   - *Ca Huế Sông Hương Trên Thuyền Rồng*
   - *Bảo Tàng Cổ Vật Triều Nguyễn 360°*
   - *Bản Đồ Ẩm Thực Cung Đình & Dân Gian*
6. **Số Liệu Ứng Dụng HUEGO**: 99.8% hài lòng, 150+ di tích số hóa 3D, 500K+ lượt tải app.
7. **CTA Cuối**: Thiên Cầu Di Sản Số Triều Nguyễn xoay đa trục với các cung bay ánh sáng và nút tải App HUEGO (iOS & Android).
8. **Footer**: Thông tin nền tảng du lịch số và tọa độ Kinh thành Huế.

---

## 3. CÁCH CHẠY DỰ ÁN

```bash
cd viet-horizon
npm run dev
```
Trang web sẵn sàng tại: `http://localhost:5188/`
