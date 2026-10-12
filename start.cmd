@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Install Node.js to use this local preview, or open index.html directly.
  pause
  exit /b 1
)
node serve.cjs --open
