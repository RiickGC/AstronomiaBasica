
# Script de Deploy Unificado - Astronomia Básica
# Autor: Antigravity
# Data: 2025-12-14

$HUB_DIR = "d:\AstronomiaBasica\hub"
$EBOOK_DIR = "d:\AstronomiaBasica\ebook"

Write-Host "🚀 Iniciando processo de Deploy Unificado..." -ForegroundColor Cyan

# 1. Build do HUB
Write-Host "`n📦 Compilando HUB..." -ForegroundColor Yellow
Set-Location $HUB_DIR
npm run build
if ($LASTEXITCODE -ne 0) { Write-Error "Falha no build do HUB"; exit 1 }

# 2. Build do EBOOK (Site Principal)
Write-Host "`n📦 Compilando EBOOK..." -ForegroundColor Yellow
Set-Location $EBOOK_DIR
npm run build
if ($LASTEXITCODE -ne 0) { Write-Error "Falha no build do EBOOK"; exit 1 }

# 3. Integração (Copiar HUB para dentro do EBOOK)
Write-Host "`n🔗 Integrando projetos..." -ForegroundColor Yellow
$DEST_HUB = "$EBOOK_DIR\dist\hub"

if (Test-Path $DEST_HUB) {
    Remove-Item -Recurse -Force $DEST_HUB
}
New-Item -ItemType Directory -Force -Path $DEST_HUB | Out-Null

Copy-Item -Recurse -Force "$HUB_DIR\dist\*" $DEST_HUB
Write-Host "✅ Hub copiado para $DEST_HUB" -ForegroundColor Green

# 4. Deploy no Firebase
Write-Host "`n🔥 Enviando para o Firebase..." -ForegroundColor Cyan
Set-Location $EBOOK_DIR
firebase deploy --only hosting,functions

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ DEPLOY CONCLUÍDO COM SUCESSO!" -ForegroundColor Green
    Write-Host "Acesse: https://astronomiabasica.web.app"
} else {
    Write-Error "`n❌ Falha no deploy."
}
