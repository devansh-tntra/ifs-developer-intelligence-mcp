@echo off

setlocal
setlocal enabledelayedexpansion

if "%1"=="?" goto :args
if "%1"=="/?" goto :args
if "%1"=="--help" goto :args
if "%1"=="/help" goto :args


set MTX_REPORT_IMPORT_HOME=../../icam/mx-database/reportimport
set ks=%MTX_REPORT_IMPORT_HOME%/keystore
set ksp=%MTX_REPORT_IMPORT_HOME%/keystore

java -cp %*

if %errorlevel% neq 0 (
    goto :exit_error
) else (
    goto :end
)

:end
endlocal
exit /B 0

:exit_error
endlocal
exit /B 1

:args
echo.
echo.
echo Usage:  report-import.cmd "<classpath>" "com.jaspersoft.jasperserver.export.ImportCommand" "js-import" "--input-zip <templateLocation>" "--update"
echo.
echo       templateLocation: Path to Maintenix report template zip file
echo       classpath: Classpath contains jar files, configuration files and config.
echo.
set errorlevel=1



