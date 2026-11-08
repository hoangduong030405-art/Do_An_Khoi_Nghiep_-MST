@echo off
title HUEGO Web - Nen tang Du lich Co Do Hue
color 0E
echo ======================================================================
echo           DANG KHOI CHAY HE THONG HUEGO - DU LICH CO DO HUE
echo ======================================================================
echo.
cd /d "C:\Lap_Trinh_Ung_dung\web-hue4u"
echo [*] Da chuyen den thu muc: %CD%
echo [*] Dang khoi dong may chu Node.js tren cong 3100...
echo [*] Trinh duyet se tu dong mo trang web ngay sau day!
echo.
start "" "http://localhost:3100"
node server.js
pause
