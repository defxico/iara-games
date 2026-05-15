@echo off
setlocal

set "SCRIPT_DIR=%~dp0"
set "PS_SCRIPT=%SCRIPT_DIR%clean-copilot.ps1"

if not exist "%PS_SCRIPT%" (
  echo Error: clean-copilot.ps1 not found next to clean-copilot.bat.
  exit /b 1
)

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%PS_SCRIPT%" %*
exit /b %ERRORLEVEL%
