const fs = require('fs');
const path = require('path');

const targetFiles = [
  path.resolve(__dirname, '..', 'web-hue4u', 'public', 'app', 'index.html'),
  path.resolve(__dirname, '..', 'backend', 'public', 'portal', 'app', 'index.html')
];

for (const filePath of targetFiles) {
  if (!fs.existsSync(filePath)) {
    console.log('Skipping (not found):', filePath);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Add QRCode library script in <head> if not present
  if (!content.includes('qrcodejs@1.0.0')) {
    content = content.replace(
      '<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>',
      '<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>\n  <script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"></script>'
    );
  }

  // 2. Add Share button in Tab Itinerary header
  const targetHeader = `<button onclick="optimizeMyItinerary()" style="background: linear-gradient(135deg, #059669, #047857); color: white; border: none; padding: 6px 12px; border-radius: 12px; font-size: 11px; font-weight: 800; cursor: pointer;">
                ⚡ Tối Ưu Thứ Tự 2-Opt
              </button>`;

  const replacementHeader = `<div style="display:flex; gap:6px;">
                <button onclick="optimizeMyItinerary()" style="background: linear-gradient(135deg, #059669, #047857); color: white; border: none; padding: 6px 10px; border-radius: 10px; font-size: 11px; font-weight: 800; cursor: pointer;">
                  ⚡ Tối Ưu
                </button>
                <button id="btnShareItinerary" onclick="openShareItineraryModal()" style="background: linear-gradient(135deg, #582C83, #3F1B63); color: #D4AF37; border: 1px solid #D4AF37; padding: 6px 10px; border-radius: 10px; font-size: 11px; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
                  🔗 Chia Sẻ
                </button>
              </div>`;

  if (content.includes(targetHeader)) {
    content = content.replace(targetHeader, replacementHeader);
  }

  // 3. Add Modal Markup before </body>
  const modalMarkup = `
  <!-- MODAL CHIA SẺ LỘ TRÌNH -->
  <div id="shareItineraryModal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.65); z-index:9999; align-items:center; justify-content:center; padding:16px; backdrop-filter:blur(4px);">
    <div style="background:white; border-radius:18px; width:100%; max-width:440px; max-height:90vh; overflow-y:auto; padding:22px; box-shadow:0 12px 36px rgba(0,0,0,0.35); font-family:inherit;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <h3 style="font-size:16px; font-weight:800; color:#582C83; display:flex; align-items:center; gap:6px;">
          🔗 Chia Sẻ Lộ Trình Cố Đô
        </h3>
        <button onclick="closeShareItineraryModal()" style="background:none; border:none; font-size:18px; cursor:pointer; color:#94A3B8;">✕</button>
      </div>

      <!-- Cảnh báo quyền riêng tư -->
      <div style="background:#FEF3C7; border-left:3px solid #D97706; padding:10px 12px; border-radius:8px; font-size:11px; color:#92400E; margin-bottom:12px; line-height:1.4;">
        ⚠️ <b>Quyền riêng tư:</b> Bất kỳ ai có liên kết đều xem được lộ trình này (không cần đăng nhập).
      </div>

      <!-- Trạng thái hiện tại -->
      <div id="shareActiveStatus" style="display:none; background:#F1F5F9; border-radius:10px; padding:10px 12px; margin-bottom:12px; font-size:11px; color:#334155;">
        <div>📊 <b>Trạng thái:</b> <span style="color:#059669; font-weight:700;">Đang hoạt động</span></div>
        <div>👀 Lượt xem: <b id="shareViewCount">0</b> • Hết hạn: <b id="shareExpiresAt">-</b></div>
      </div>

      <!-- Tùy chọn cấu hình -->
      <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:14px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <label for="shareExpirySelect" style="font-size:12px; font-weight:700; color:#334155;">Thời hạn liên kết:</label>
          <select id="shareExpirySelect" style="padding:6px 10px; border-radius:8px; border:1px solid #CBD5E1; font-size:12px;">
            <option value="7">7 ngày</option>
            <option value="30" selected>30 ngày (mặc định)</option>
            <option value="90">90 ngày</option>
          </select>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid #F1F5F9; padding-top:8px;">
          <div>
            <div style="font-size:12px; font-weight:700; color:#334155;">Kèm ghi chú của tôi</div>
            <div style="font-size:10px; color:#64748B;">Ghi chú sẽ hiển thị cho mọi người có liên kết</div>
          </div>
          <input type="checkbox" id="shareIncludeNotes" style="width:18px; height:18px; accent-color:#582C83;">
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid #F1F5F9; padding-top:8px;">
          <div>
            <div style="font-size:12px; font-weight:700; color:#334155;">Cho phép lưu bản sao</div>
            <div style="font-size:10px; color:#64748B;">Người khác có thể lưu về tài khoản họ</div>
          </div>
          <input type="checkbox" id="shareAllowCopy" checked style="width:18px; height:18px; accent-color:#582C83;">
        </div>
      </div>

      <!-- Nút tạo / cập nhật link -->
      <button id="btnGenerateShareLink" onclick="generateShareLink()" style="width:100%; min-height:44px; background:linear-gradient(135deg, #582C83, #3F1B63); color:#D4AF37; border:none; border-radius:10px; font-size:13px; font-weight:800; cursor:pointer; margin-bottom:12px;">
        ✨ Tạo Liên Kết Chia Sẻ Mới
      </button>

      <!-- Kết quả link -->
      <div id="shareResultArea" style="display:none; border-top:1px solid #E2E8F0; padding-top:12px;">
        <div style="font-size:11px; font-weight:700; color:#475569; margin-bottom:6px;">Liên kết công khai của bạn:</div>
        <div style="display:flex; gap:6px; margin-bottom:10px;">
          <input type="text" id="shareUrlInput" readonly style="flex:1; padding:8px 10px; border:1px solid #CBD5E1; border-radius:8px; font-size:12px; background:#F8FAFC; color:#0F172A;">
          <button onclick="copyShareUrl()" style="min-height:38px; padding:0 12px; background:#582C83; color:white; border:none; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer;">
            Sao chép
          </button>
        </div>

        <div style="display:flex; gap:8px; margin-bottom:10px;">
          <button onclick="shareViaApp()" style="flex:1; min-height:40px; background:#059669; color:white; border:none; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px;">
            📲 Chia sẻ qua ứng dụng
          </button>
          <button onclick="toggleQrCode()" style="min-height:40px; padding:0 12px; background:#F1F5F9; color:#334155; border:1px solid #CBD5E1; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer;">
            📱 Mã QR
          </button>
        </div>

        <!-- QR Code Canvas Display -->
        <div id="qrCodeContainer" style="display:none; text-align:center; padding:12px; background:#F8FAFC; border-radius:10px; margin-bottom:10px;">
          <div id="qrCodeCanvasWrap" style="display:flex; justify-content:center; margin-bottom:6px;"></div>
          <div style="font-size:10px; color:#64748B;">Quét mã để mở lộ trình trên điện thoại khác</div>
        </div>

        <div style="font-size:10px; color:#64748B; background:#F8FAFC; padding:8px; border-radius:6px; line-height:1.4; margin-bottom:8px;">
          🔒 <b>Lưu ý:</b> Token chỉ hiển thị <b>đúng một lần</b> này. Nếu đóng hộp thoại, bạn có thể tạo lại link mới (link cũ sẽ tự động được thu hồi).
        </div>
      </div>

      <!-- Nút Thu hồi -->
      <div id="revokeArea" style="display:none; text-align:center; margin-top:8px;">
        <button onclick="revokeShareLink()" style="background:none; border:none; color:#DC2626; font-size:11px; font-weight:700; cursor:pointer; text-decoration:underline;">
          🚫 Thu hồi liên kết này (vô hiệu hóa tức thì)
        </button>
      </div>
    </div>
  </div>
`;

  if (!content.includes('id="shareItineraryModal"')) {
    content = content.replace('</body>', `${modalMarkup}\n</body>`);
  }

  // 4. Add JS handlers before closing </script>
  const jsHandlers = `
    // --- SHARE ITINERARY CLIENT LOGIC ---
    let currentServerItineraryId = localStorage.getItem('huego_server_itinerary_id') || null;

    async function openShareItineraryModal() {
      if (!authToken || !currentUser) {
        showToast('Vui lòng đăng nhập hoặc dùng thử để chia sẻ lộ trình của bạn.');
        openAuthModal();
        return;
      }
      if (!itineraryStops || itineraryStops.length === 0) {
        showToast('Lộ trình của bạn chưa có điểm đến nào. Hãy thêm điểm trước khi chia sẻ.');
        return;
      }

      try {
        showToast('Đang đồng bộ lộ trình với máy chủ...');
        const placeIds = itineraryStops.map(s => s.id || s.slug || s.name);
        
        let exists = false;
        if (currentServerItineraryId) {
          const chk = await fetchWithAuth('/api/v1/itinerary/' + currentServerItineraryId);
          if (chk.ok) {
            exists = true;
            await fetchWithAuth('/api/v1/itinerary/' + currentServerItineraryId + '/stops', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ placeIds })
            });
          }
        }

        if (!exists) {
          const createRes = await fetchWithAuth('/api/v1/itinerary', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: 'Lộ trình Cố Đô ' + (currentUser.fullName ? 'của ' + currentUser.fullName : 'HUEGO'),
              date: new Date().toISOString().slice(0, 10),
              placeIds
            })
          });
          if (createRes.ok) {
            const itin = await createRes.json();
            currentServerItineraryId = itin.id;
            localStorage.setItem('huego_server_itinerary_id', itin.id);
          } else {
            const errData = await createRes.json();
            showToast(errData.message || 'Không thể tạo lộ trình trên máy chủ.');
            return;
          }
        }

        const statusRes = await fetchWithAuth('/api/v1/itinerary/' + currentServerItineraryId + '/share');
        if (statusRes.ok) {
          const statusData = await statusRes.json();
          if (statusData.isShared) {
            document.getElementById('shareActiveStatus').style.display = 'block';
            document.getElementById('shareViewCount').innerText = statusData.viewCount || 0;
            document.getElementById('shareExpiresAt').innerText = statusData.expiresAt ? new Date(statusData.expiresAt).toLocaleDateString('vi-VN') : '30 ngày';
            document.getElementById('shareIncludeNotes').checked = !!statusData.includeNotes;
            document.getElementById('shareAllowCopy').checked = statusData.allowCopy !== false;
            document.getElementById('revokeArea').style.display = 'block';
            document.getElementById('btnGenerateShareLink').innerText = '🔄 Cập Nhật / Tạo Link Mới';
          } else {
            document.getElementById('shareActiveStatus').style.display = 'none';
            document.getElementById('revokeArea').style.display = 'none';
            document.getElementById('btnGenerateShareLink').innerText = '✨ Tạo Liên Kết Chia Sẻ Mới';
          }
        }

        document.getElementById('shareResultArea').style.display = 'none';
        document.getElementById('qrCodeContainer').style.display = 'none';
        document.getElementById('shareItineraryModal').style.display = 'flex';
      } catch (err) {
        console.error('Lỗi khi mở modal chia sẻ:', err);
        showToast('Lỗi kết nối máy chủ chia sẻ.');
      }
    }

    function closeShareItineraryModal() {
      document.getElementById('shareItineraryModal').style.display = 'none';
    }

    async function generateShareLink() {
      const btn = document.getElementById('btnGenerateShareLink');
      btn.disabled = true;
      btn.innerText = 'Đang tạo liên kết an toàn...';

      try {
        const expiresInDays = parseInt(document.getElementById('shareExpirySelect').value, 10) || 30;
        const includeNotes = document.getElementById('shareIncludeNotes').checked;
        const allowCopy = document.getElementById('shareAllowCopy').checked;

        const res = await fetchWithAuth('/api/v1/itinerary/' + currentServerItineraryId + '/share', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ expiresInDays, includeNotes, allowCopy })
        });

        const data = await res.json();
        if (res.ok && data.shareUrl) {
          document.getElementById('shareUrlInput').value = data.shareUrl;
          document.getElementById('shareResultArea').style.display = 'block';
          document.getElementById('revokeArea').style.display = 'block';
          document.getElementById('shareActiveStatus').style.display = 'block';
          document.getElementById('shareViewCount').innerText = 0;
          document.getElementById('shareExpiresAt').innerText = data.expiresAt ? new Date(data.expiresAt).toLocaleDateString('vi-VN') : '30 ngày';

          const qrWrap = document.getElementById('qrCodeCanvasWrap');
          qrWrap.innerHTML = '';
          if (typeof QRCode !== 'undefined') {
            new QRCode(qrWrap, {
              text: data.shareUrl,
              width: 140,
              height: 140,
              colorDark: '#582C83',
              colorLight: '#FFFFFF',
              correctLevel: QRCode.CorrectLevel.M
            });
          }
          showToast('🎉 Đã tạo liên kết chia sẻ lộ trình thành công!');
        } else {
          showToast(data.message || 'Không thể tạo liên kết chia sẻ lúc này.');
        }
      } catch (err) {
        showToast('Lỗi kết nối máy chủ tạo liên kết.');
      } finally {
        btn.disabled = false;
        btn.innerText = '🔄 Cập Nhật / Tạo Link Mới';
      }
    }

    async function copyShareUrl() {
      const input = document.getElementById('shareUrlInput');
      if (!input || !input.value) return;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(input.value);
        } else {
          input.select();
          document.execCommand('copy');
        }
        showToast('📋 Đã sao chép liên kết vào bộ nhớ tạm!');
      } catch (err) {
        input.select();
        document.execCommand('copy');
        showToast('📋 Đã sao chép liên kết!');
      }
    }

    async function shareViaApp() {
      const url = document.getElementById('shareUrlInput').value;
      if (!url) return;
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Lộ trình Cố Đô Huế — HUEGO',
            text: 'Khám phá lộ trình du lịch Huế thông minh cùng tôi trên HUEGO!',
            url: url
          });
        } catch (err) {
          if (err.name !== 'AbortError') {
            console.warn('Share error:', err);
          }
        }
      } else {
        copyShareUrl();
      }
    }

    function toggleQrCode() {
      const container = document.getElementById('qrCodeContainer');
      if (container) {
        container.style.display = container.style.display === 'none' ? 'block' : 'none';
      }
    }

    async function revokeShareLink() {
      if (!confirm('Bạn có chắc chắn muốn thu hồi liên kết này? Người có liên kết cũ sẽ không thể xem được lộ trình nữa.')) return;
      try {
        const res = await fetchWithAuth('/api/v1/itinerary/' + currentServerItineraryId + '/share', {
          method: 'DELETE'
        });
        if (res.ok) {
          document.getElementById('shareActiveStatus').style.display = 'none';
          document.getElementById('shareResultArea').style.display = 'none';
          document.getElementById('revokeArea').style.display = 'none';
          document.getElementById('btnGenerateShareLink').innerText = '✨ Tạo Liên Kết Chia Sẻ Mới';
          showToast('🚫 Đã thu hồi liên kết chia sẻ.');
        } else {
          showToast('Không thể thu hồi liên kết lúc này.');
        }
      } catch (err) {
        showToast('Lỗi kết nối máy chủ thu hồi.');
      }
    }

    async function handlePendingItineraryCopy() {
      const urlParams = new URLSearchParams(window.location.search);
      const action = urlParams.get('action');
      const token = urlParams.get('token') || sessionStorage.getItem('pending_copy_token');

      if (action === 'copy_itinerary' && token) {
        sessionStorage.setItem('pending_copy_token', token);

        if (!authToken || !currentUser) {
          showToast('Vui lòng đăng nhập để lưu lộ trình được chia sẻ này vào tài khoản của bạn.');
          openAuthModal();
          return;
        }

        try {
          showToast('Đang lưu bản sao lộ trình vào tài khoản...');
          const res = await fetchWithAuth('/api/v1/shared/' + encodeURIComponent(token) + '/copy', {
            method: 'POST'
          });
          const data = await res.json();
          if (res.ok) {
            sessionStorage.removeItem('pending_copy_token');
            showToast('🎉 ' + (data.message || 'Đã lưu bản sao lộ trình thành công!'));

            if (data.newItineraryId) {
              const detailRes = await fetchWithAuth('/api/v1/itinerary/' + data.newItineraryId);
              if (detailRes.ok) {
                const itin = await detailRes.json();
                itineraryStops = itin.stops.map(s => ({
                  id: s.placeId,
                  name: s.place?.name || s.placeId,
                  desc: s.place?.address || 'Điểm đến lộ trình',
                  visited: false
                }));
                currentServerItineraryId = itin.id;
                localStorage.setItem('huego_server_itinerary_id', itin.id);
                saveItineraryState();
                renderItinerary();
              }
            }

            const itinBtn = document.querySelector('button[onclick*="tab-itinerary"]');
            if (itinBtn && typeof switchTab === 'function') {
              switchTab('tab-itinerary', itinBtn);
            }
          } else {
            showToast(data.message || 'Không thể sao chép lộ trình.');
          }
        } catch (err) {
          showToast('Lỗi kết nối khi sao chép lộ trình.');
        }
      }
    }
  `;

  if (!content.includes('function openShareItineraryModal()')) {
    content = content.replace(
      '// KHÔNG tự động gọi startGpsTracking()',
      'handlePendingItineraryCopy();\n      // KHÔNG tự động gọi startGpsTracking()'
    );
    content = content.replace(
      'function handleLoginSuccess(user, token) {',
      'function handleLoginSuccess(user, token) {\n      handlePendingItineraryCopy();'
    );
    content = content.replace(
      '</script>',
      `${jsHandlers}\n  </script>`
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully patched:', filePath);
}
