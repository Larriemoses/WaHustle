# setup-wahustle.ps1  — PowerShell scaffold for Windows
param(
  [string]$Root = (Join-Path (Get-Location) "wahustle")
)

$ErrorActionPreference = "Stop"

function New-Dir($p) {
  if (-not (Test-Path $p)) { New-Item -ItemType Directory -Path $p | Out-Null }
}

function Write-File($path, $content) {
  $dir = Split-Path -Parent $path
  if ($dir -and -not (Test-Path $dir)) { New-Dir $dir }
  $utf8NoBom = New-Object System.Text.UTF8Encoding $false
  [System.IO.File]::WriteAllText($path, $content, $utf8NoBom)
}

Write-Host "Creating project at: $Root"
New-Dir $Root

# root
New-Dir (Join-Path $Root ".github/workflows")
New-Dir (Join-Path $Root "apps/backend-node/src")
New-Dir (Join-Path $Root "apps/web/src")
New-Dir (Join-Path $Root "apps/web/src/components")
New-Dir (Join-Path $Root "apps/web/src/lib")
New-Dir (Join-Path $Root "apps/web/src/pages")
New-Dir (Join-Path $Root "infra/supabase")
New-Dir (Join-Path $Root "packages/shared/types")

Write-File (Join-Path $Root "README.md") @"
# WaHustle Monorepo
Scaffold created. Next: fill files with real code.
"@

Write-File (Join-Path $Root ".gitignore") @"
node_modules
dist
.env
.DS_Store
.vscode/
.idea/
"@

Write-File (Join-Path $Root "Makefile") ""
Write-File (Join-Path $Root "docker-compose.yml") @"
version: "3.9"
services: {}
"@
Write-File (Join-Path $Root ".env.example") @"
TZ=Africa/Lagos
"@

# CI
Write-File (Join-Path $Root ".github/workflows/ci.yml") @"
name: ci
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: echo 'CI stub — fill later'
"@

# backend-node
Write-File (Join-Path $Root "apps/backend-node/package.json") "{}"
Write-File (Join-Path $Root "apps/backend-node/tsconfig.json") "{}"
Write-File (Join-Path $Root "apps/backend-node/.env.example") @"
PORT=8000
WHATSAPP_VERIFY_TOKEN=
WHATSAPP_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE=
SUPABASE_ANON_KEY=
OPENAI_API_KEY=
TZ=Africa/Lagos
"@
Write-File (Join-Path $Root "apps/backend-node/Dockerfile") @"
# Will be filled with Node 20 Alpine build
"@

$backendFiles = @("server.ts","whatsapp.ts","webapi.ts","xparse.ts","xdb.ts","xai.ts","wsend.ts","worker.ts")
foreach ($f in $backendFiles) {
  Write-File (Join-Path $Root "apps/backend-node/src/$f") @"
// Placeholder — will be replaced with implementation
export {};
"
}

# web
Write-File (Join-Path $Root "apps/web/package.json") "{}"
Write-File (Join-Path $Root "apps/web/vite.config.ts") "export default {};"
Write-File (Join-Path $Root "apps/web/tailwind.config.js") "export default { content: [], theme: { extend: {} }, plugins: [] };"
Write-File (Join-Path $Root "apps/web/postcss.config.cjs") "module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };"
Write-File (Join-Path $Root "apps/web/tsconfig.json") "{}"
Write-File (Join-Path $Root "apps/web/index.html") @"
<!doctype html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><title>WaHustle</title></head><body><div id='root'></div></body></html>
"@
Write-File (Join-Path $Root "apps/web/src/main.tsx") "export {};"
Write-File (Join-Path $Root "apps/web/src/index.css") "/* tailwind directives will be added */"

# infra
Write-File (Join-Path $Root "infra/supabase/schema.sql") "-- Placeholder — tables & RPCs will be pasted here"
Write-File (Join-Path $Root "infra/supabase/seed.sql") "-- Optional seed data"

# packages/shared
Write-File (Join-Path $Root "packages/shared/README.md") "Shared package placeholder."
Write-File (Join-Path $Root "packages/shared/types/index.ts") "export {};"

Write-Host "✅ Structure created at $Root"
Write-Host "Next: we'll fill each file with real code."
