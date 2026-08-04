@echo off
pushd "%~dp0"
REM set PKG=--java
REM echo %* | findstr /C:"action=" >nul 2>nul
REM IF %ERRORLEVEL% NEQ 0 set PKG=%PKG% --kubectl --helm --k8s
REM echo %* | findstr /C:"action=mtinstaller" /C:"action=delete" >nul 2>nul
REM IF %ERRORLEVEL% EQU 0 set PKG=%PKG% --kubectl --helm --k8s
REM CALL utils\verify_required_software.cmd %PKG%
REM IF %ERRORLEVEL% NEQ 0 EXIT /B 1
java -cp .;lib/ifsinstaller.jar;lib/snakeyaml-2.0.jar;lib/ojdbc.jar ifs.installer.Installer --values version.yaml %*
popd
