@echo off
pushd %~dp0
setlocal

set LIB=../lib
set CLASSPATH=%LIB%/ifs-fnd-dbbuild.jar;%LIB%/snakeyaml-2.0.jar;%LIB%/ojdbc.jar;%LIB%/databaseInstaller/org-netbeans-modules-editor-util.jar
set CLASSPATH=%CLASSPATH%;%LIB%/databaseInstaller/org-netbeans-modules-lexer.jar;%LIB%/databaseInstaller/org-openide-util.jar

java -Xmx4096m -cp %CLASSPATH% -Duser.language=en -Duser.country=US ifs.fnd.dbbuild.DatabaseInstaller %*
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
