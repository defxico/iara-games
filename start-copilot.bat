@echo off
setlocal

REM Windows launcher wrapper for start-copilot.ps1.
REM Keep this .bat file in the same folder as start-copilot.ps1.

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-copilot.ps1" %*

exit /b %ERRORLEVEL%
