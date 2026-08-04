@echo off

setlocal
setlocal enabledelayedexpansion

if "%1"=="?" goto :args
if "%1"=="/?" goto :args
if "%1"=="--help" goto :args
if "%1"=="/help" goto :args


set ANT_HOME=../../icam/mx-database/jasperdbupgrade/ant
set JASPER_DB_UPGRADE_HOME=../../icam/mx-database/jasperdbupgrade

"%ANT_HOME%\bin\ant" -listener com.mxi.ant.loggers.XmlLogger -buildfile %JASPER_DB_UPGRADE_HOME%\jasper-upgrade.xml run.jasper.db.upgrades
if %errorlevel% neq 0 (
    goto :exit_error
) else (
    goto :end
)

:args
echo.
echo.
echo Usage:  upgrade-jasper.cmd
echo.
echo.
set errorlevel=1

:end
echo INFO: The Jasper upgrade process completed successfully.
endlocal
exit /B 0

:exit_error
echo SEVERE: The Jasper upgrade process failed.
endlocal
exit /B 1
