@echo off

setlocal
setlocal enabledelayedexpansion

if "%1"=="?" goto :args
if "%1"=="/?" goto :args
if "%1"=="--help" goto :args
if "%1"=="/help" goto :args


set LIB=../../icam/mx-database/mtxdbupgrade/lib
set CLASSPATH=%LIB%/*

java -cp %CLASSPATH% com.mxi.mx.am.db.installer.Main %*

if %errorlevel% neq 0 (
    goto :exit_error
) else (
    goto :end
)



:args
echo.
echo.
echo Usage:  upgrade-maintenix.cmd "-f <logFilePath>" "-b <bundlePath>" "-s <build.properties filepath>"
echo.
echo       logFilePath    Path to log file
echo       bundlePath     Path to bundle folder containing liquibase upgrade files
echo       build.properties filepath    Path to build.properties file
echo.
set errorlevel=1

:end
echo INFO: The Maintenix upgrade process completed successfully.
endlocal
exit /B 0

:exit_error
echo SEVERE: The Maintenix upgrade process failed.
endlocal
exit /B 1
