@echo off

whoami /groups | Find "High Mandatory Level" > NUL
if not errorlevel 1 goto RUN
echo �Z�b�g�A�b�v�̌p���ɂ́A�Ǘ��Ҍ������K�v�ł��B
cd "%~dp0.."
timeout /T 3 /NOBREAK
powershell -Command Start-Process -Verb runas "%~0"
exit /b %ERRORLEVEL%

:RUN
powershell -NoProfile -ExecutionPolicy Unrestricted "scripts\.init\windows.ps1"
