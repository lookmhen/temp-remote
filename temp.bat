@echo off
title Remote-Delete-Temp
color 0b
chcp 65001

setlocal

if "%~1" == "" (
    echo No value provided.
    exit /b 1
)

echo Received value from web : %~1


endlocal
set comname=%~1
echo %comname% >> clearlist.csv
for /F "tokens=*" %%A in ('dir/b \\%comname%\C$\Users\*.*') do (

echo [91m
rem ลบtemp--------------------------------------------
echo y | rd /s \\%comname%\C$\Users\%%A\AppData\Local\Temp\
rem ลบtemp--------------------------------------------

echo [33m
rem ลบjava jre temp-------------------------------------
echo y | del /s \\%comname%\C$\Users\%%A\AppData\LocalLow\Sun\Java\Deployment\cache\6.0
rem ลบjava jre temp-------------------------------------

echo [93m
rem ลบmail--------------------------------------------
echo y | del /s \\%comname%\C$\Users\%%A\AppData\Local\Microsoft\Outlook\*.ost
echo y | del /s \\%comname%\C$\Users\%%A\AppData\Local\Microsoft\Outlook\*.tmp
rem ลบmail--------------------------------------------

echo [32m
rem temp powerpoint--------------------------------------------
echo y | rd /s \\%comname%\C$\Users\%%A\AppData\Roaming\Microsoft\PowerPoint\
rem temp powerpoint--------------------------------------------
echo [36m
rem ลบtemp acrobat reader--------------------------------------------
echo y | rmdir /s \\%comname%\C$\Users\%%A\AppData\Local\Adobe
echo y | rmdir /s \\%comname%\C$\Users\%%A\AppData\LocalLow\Adobe
echo y | rmdir /s \\%comname%\C$\%%A\AppData\Roaming\Adobe
rem ลบtemp acrobat reader--------------------------------------------

echo [94m
rem ลบtemp teams--------------------------------------------
echo y | del /s \\%comname%\C$\Users\%%A\AppData\Roaming\Microsoft\Teams\Cache\*.*
echo y | del /s \\%comname%\C$\Users\%%A\AppData\Roaming\Microsoft\Teams\blob_storage\*.*
echo y | del /s \\%comname%\C$\Users\%%A\AppData\Roaming\Microsoft\Teams\databases\*.*
echo y | del /s \\%comname%\C$\Users\%%A\AppData\Roaming\Microsoft\Teams\GPUCache\*.*
echo y | del /s \\%comname%\C$\Users\%%A\AppData\Roaming\Microsoft\Teams\IndexedDB\*.*
echo y | del /s \\%comname%\C$\Users\%%A\AppData\Roaming\Microsoft\Teams\Local Storage\*.*
echo y | del /s \\%comname%\C$\Users\%%A\AppData\Roaming\Microsoft\Teams\tmp\*.*
rem ลบtemp teams--------------------------------------------

echo [96m
rem ลบtemp IE
echo y | del /s \\%comname%\C$\Users\%%A\AppData\Local\Microsoft\Windows\INetCache
rem ลบtemp IE


)
rem ลบถังขยะทุกuser---
echo y | rd /s \\%comname%\C$\$recycle.bin
echo y | rd /s \\%comname%\D$\$recycle.bin
rem ลบถังขยะทุกuser---


title Cleartemp on Web
