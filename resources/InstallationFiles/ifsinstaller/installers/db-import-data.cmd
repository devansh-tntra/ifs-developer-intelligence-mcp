@echo off
pushd %~dp0
setlocal

set LIB=../lib
set CLASSPATH=%LIB%/ifs-fnd-import.jar;%LIB%/ojdbc.jar

java -Xmx4096m -cp %CLASSPATH% -Duser.language=en -Duser.country=US ifs.fnd.dataimport.DataImport %*
if %errorlevel% neq 0 (
    goto :exit_error
) else (
    goto :end
)

:end
endlocal
popd
exit /B 0

:exit_error
endlocal
popd
exit /B 1