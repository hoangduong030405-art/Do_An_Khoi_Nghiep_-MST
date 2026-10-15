param (
    [switch]$Rebuild
)

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "       HUEGO - 1-CLICK DEMO RUNNER        " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# (1) a. Kiem tra Docker
$dockerInfo = docker ps 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Hay mo Docker Desktop roi chay lai" -ForegroundColor Red
    Read-Host "Nhan Enter de thoat..."
    exit
}

# (1) b. Chay Docker Compose va cho PostgreSQL
Write-Host "Dang khoi dong Database (PostgreSQL)..." -ForegroundColor Yellow
docker compose up -d
$retryCount = 0
$pgReady = $false
while ($retryCount -lt 15) {
    $ready = docker exec huego-postgis pg_isready -U postgres 2>&1
    if ($ready -match "accepting connections") {
        $pgReady = $true
        break
    }
    Start-Sleep -Seconds 4
    $retryCount++
}
if (-not $pgReady) {
    Write-Host "Canh bao: PostgreSQL chua san sang sau 60s, nhung van tiep tuc..." -ForegroundColor Yellow
} else {
    Write-Host "Database da san sang!" -ForegroundColor Green
}

# (1) c. Kiem tra cong 3000
$port3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($port3000) {
    Write-Host "Cong 3000 dang bi chiem, dang tat tien trinh cu..." -ForegroundColor Yellow
    $port3000 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
    Start-Sleep -Seconds 2
}

# (1) d. Build Flutter Web
Write-Host "Dang kiem tra va Build Flutter Web..." -ForegroundColor Yellow
$flutterPath = "C:\Lap_Trinh_Ung_dung\mobile\build\web\index.html"
$shouldBuild = $true
if (Test-Path $flutterPath) {
    if ($Rebuild) {
        Write-Host "Yeu cau build lai, dang tien hanh build..." -ForegroundColor Yellow
    } else {
        Write-Host "Da co ban build Flutter Web, bo qua buoc build." -ForegroundColor Green
        $shouldBuild = $false
    }
}
if ($shouldBuild) {
    Push-Location "C:\Lap_Trinh_Ung_dung\mobile"
    $env:Path += ";C:\Users\PREDATOR\flutter\bin"
    flutter build web --release --dart-define=API_BASE_URL=/api/v1 --base-href /flutter/
    Pop-Location
}

# (1) e. Chay backend
Write-Host "Dang khoi dong Backend..." -ForegroundColor Yellow
Push-Location "C:\Lap_Trinh_Ung_dung\backend"
$backendProcess = Start-Process -FilePath "npm.cmd" -ArgumentList "run", "start:dev" -PassThru -WindowStyle Minimized
Pop-Location

# Cho Backend phan hoi tren port 3000
$retryCount = 0
$backendReady = $false
while ($retryCount -lt 20) {
    $portCheck = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
    if ($portCheck) {
        $backendReady = $true
        break
    }
    Start-Sleep -Seconds 3
    $retryCount++
}

# (1) f. Chay cloudflared tunnel
Write-Host "Dang khoi tao duong ham an toan (Cloudflare Tunnel)..." -ForegroundColor Yellow
$cloudflaredLog = "$env:TEMP\cloudflared.log"
if (Test-Path $cloudflaredLog) { Remove-Item $cloudflaredLog -Force }

$cloudflaredProcess = Start-Process -FilePath "C:\Lap_Trinh_Ung_dung\cloudflared.exe" -ArgumentList "tunnel", "--url", "http://localhost:3000" -RedirectStandardError $cloudflaredLog -PassThru -WindowStyle Minimized

# Doc dia chi https://....trycloudflare.com
$tunnelUrl = $null
$retryCount = 0
while ($retryCount -lt 15) {
    if (Test-Path $cloudflaredLog) {
        $logContent = Get-Content $cloudflaredLog -Raw
        if ($logContent -match "(https://[a-zA-Z0-9-]+\.trycloudflare\.com)") {
            $tunnelUrl = $matches[1]
            break
        }
    }
    Start-Sleep -Seconds 2
    $retryCount++
}

if ($tunnelUrl) {
    $fullLink = "$tunnelUrl/flutter/"
    Set-Clipboard -Value $fullLink
    Write-Host ""
    Write-Host "=====================================================" -ForegroundColor Green
    Write-Host "✅ LINK DEMO DA SAN SANG! (Da tu dong copy vao Clipboard)" -ForegroundColor Green
    Write-Host ""
    Write-Host $fullLink -ForegroundColor Cyan
    Write-Host ""
    Write-Host "👉 Hay mo Safari tren iPhone va dan link nay vao de trai nghiem." -ForegroundColor Yellow
    Write-Host "=====================================================" -ForegroundColor Green
    Write-Host ""
    
    # Tao QR Code
    try {
        $qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=$fullLink"
        Invoke-WebRequest -Uri $qrCodeUrl -OutFile "C:\Lap_Trinh_Ung_dung\link-qr.png" -UseBasicParsing
        Write-Host "Da luu ma QR vao file C:\Lap_Trinh_Ung_dung\link-qr.png, ban co the quet bang camera dien thoai." -ForegroundColor Cyan
    } catch {
        # Bo qua neu loi
    }
} else {
    Write-Host "Khong the lay duoc duong link Cloudflare. Vui long kiem tra file log: $cloudflaredLog" -ForegroundColor Red
}

# (1) h. Giu may va tat
Write-Host ""
Write-Host "Giu may tinh mo va cac cua so nay dang chay." -ForegroundColor White -BackgroundColor DarkRed
Write-Host "Nhan phim bat ky de TAT tat ca..." -ForegroundColor Yellow

$host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") | Out-Null

Write-Host "`nDang tat cac tien trinh..." -ForegroundColor Yellow
if ($backendProcess -and -not $backendProcess.HasExited) { Stop-Process -Id $backendProcess.Id -Force }
if ($cloudflaredProcess -and -not $cloudflaredProcess.HasExited) { Stop-Process -Id $cloudflaredProcess.Id -Force }

Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
Get-Process -Name "cloudflared" -ErrorAction SilentlyContinue | Stop-Process -Force

Write-Host "Da tat thanh cong! Hen gap lai." -ForegroundColor Green
Start-Sleep -Seconds 2
