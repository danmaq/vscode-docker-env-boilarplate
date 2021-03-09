@echo off

whoami /groups | Find "High Mandatory Level" > NUL
if not errorlevel 1 goto RUN
echo セットアップの継続には、管理者権限が必要です。
cd "%~dp0.."
timeout /T 3 /NOBREAK
powershell -Command Start-Process -Verb runas "%~0"
exit /b %ERRORLEVEL%

:RUN
powershell -NoProfile -ExecutionPolicy Unrestricted "scripts\.init\windows.ps1"
