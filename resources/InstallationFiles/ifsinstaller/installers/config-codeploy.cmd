@echo off

setlocal
setlocal enabledelayedexpansion

if "%1"=="?" goto :args
if "%1"=="/?" goto :args
if "%1"=="--help" goto :args
if "%1"=="/help" goto :args


set ANT_HOME=../../icam/mx-database/mtxdbupgrade/ant
set MTX_DB_UPGRADE_HOME=../../icam/mx-database/mtxdbupgrade

goto :execute_codeployed


:args
echo.
echo.
echo Usage:  config-codeploy.cmd "-f <logFilePath>" "-b <bundlePath>" "-s <build.properties filepath>"
echo.
echo       logFilePath    Path to log file
echo       bundlePath     Path to bundle folder containing liquibase upgrade files
echo       build.properties filepath    Path to build.properties file
echo.
set errorlevel=1

:end
echo INFO: The ICAM Co-deploy configuration completed successfully.
endlocal
exit /B 0

:exit_error
echo SEVERE: The ICAM Co-deploy configuration failed.
endlocal
exit /B 1

:execute_codeployed
"%ANT_HOME%\bin\ant" -listener com.mxi.ant.loggers.XmlLogger -buildfile %MTX_DB_UPGRADE_HOME%\codeployed.xml perform.all.config
if %errorlevel% neq 0 (
    goto :exit_error
) else (
    goto :end
)
