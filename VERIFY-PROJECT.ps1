$ErrorActionPreference = "Stop"
Write-Host "NEXORA CRM verification" -ForegroundColor Cyan
if (-not (Test-Path .\package.json)) { throw "package.json not found. Run this script from the folder that contains package.json." }
Write-Host "package.json: OK" -ForegroundColor Green
node -v
npm -v
Write-Host "Installing dependencies..." -ForegroundColor Cyan
npm install
Write-Host "Running TypeScript check..." -ForegroundColor Cyan
npm run typecheck
Write-Host "Running production build..." -ForegroundColor Cyan
npm run build
Write-Host "ALL CHECKS PASSED" -ForegroundColor Green
Write-Host "Start with: npm run dev" -ForegroundColor Yellow
