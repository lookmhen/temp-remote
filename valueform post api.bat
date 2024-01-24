@echo off
setlocal

if "%~1" == "" (
    echo No value provided.
    exit /b 1
)

echo Received value from web : %~1


endlocal
