@echo off
chcp 65001 >nul
echo Dang tat cac tien trinh huego demo...
powershell -Command "Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }"
powershell -Command "Get-Process -Name 'cloudflared' -ErrorAction SilentlyContinue | Stop-Process -Force"
echo Da tat thanh cong!
pause
