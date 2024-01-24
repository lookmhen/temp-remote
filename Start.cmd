@echo off
cd %~dp0
call cleartemp-venv\Scripts\activate.bat
cmd /c "python app.py"
@pause