@echo %verbose%

setlocal enabledelayedexpansion

if "%namespace%"=="" (
  echo SEVERE: namespace must be set
  goto exit_error
)

if "%1"=="delete" (
  goto delete
)

:: Check if namespace exists, otherwise create it
kubectl %kubeconfigFlag% get namespace %namespace% -o name > nul 2> nul

if errorlevel 1 (
  echo INFO: Creating namespace
  kubectl %kubeconfigFlag% create namespace %namespace%
  if errorlevel 1 (
    echo SEVERE: Failed to create namespace
    goto exit_error
  )
)

:: If namesapce exist but is owned by Helm, then recreate it.
kubectl %kubeconfigFlag% describe namespace %namespace% | findstr "meta.helm.sh" > nul 2> nul

if "%errorlevel%"=="0" (
  echo INFO: Recreate namespace owned by Helm
  kubectl %kubeconfigFlag% delete namespace %namespace%
  kubectl %kubeconfigFlag% create namespace %namespace%
  if errorlevel 1 (
    echo SEVERE: Failed to create namespace
    goto exit_error
  )
)

if "%1"=="create-namespace" (
  goto exit
)

if "%helmRepo%"=="" (
  echo SEVERE: helmRepo must be set
  goto exit_error
)

if "%helmUser%"=="" (
  echo SEVERE: helmUser must be set
  goto exit_error
)

if "%helmPwd%"=="" (
  echo SEVERE: helmPwd must be set
  goto exit_error
)

if "%chart%"=="" (
  echo SEVERE: Chart to use must be set
  goto exit_error
)

if not "%chartVersion%"=="" (
  set chartVersion=--version %chartVersion%
)

if %verbose%=="on" (
  set debug=--debug
)

:: find the repo type by testing the first character of the url
:: o - OCI, anyother - http
set repoType=%helmRepo:~0,1%
if "%repoType%"=="o" (
  if "%localChart%"=="true" (
    if "%depUpEnabled%"=="true" (
      echo SEVERE: Local chart is not supported with OCI repositories.
      goto :exit_error
    )
    set repoType=
  )

  goto end_repo_update
)

REM Add Helm repository and capture the output
for /f "delims=" %%a in ('helm repo add ifscloud --force-update %helmRepo% --username %helmUser% --password !helmPwd! 2^>^&1') do set "helmOutput=%%a"

REM Check for "401" error in the output
echo %helmOutput% | findstr /C:"401" >nul
if %errorlevel% equ 0 (
    echo SEVERE: Incorrect credentials. Please check the username and password.
    goto :exit_error
)
REM Check for other errors and print a message
echo %helmOutput% | findstr /C:"Error:" /C:"Failed to add" >nul
if %errorlevel% equ 0 (
    echo %helmOutput%
    goto :exit_error
)

REM Set retry count and loop label
set retryCount=0
:retryUpdate

REM Update repo
helm repo update
if errorlevel 1 (
    echo INFO: Updating repo failed. Retrying in 1 minute...
    set /a retryCount+=1

    if !retryCount! LEQ 5 (
        echo INFO: Retry attempt: !retryCount! of 5  
        ping -n 60 127.0.0.1 >nul 2>nul
        goto retryUpdate
    ) else (
        echo SEVERE: Failed to update the repo after 5 retries.
        goto exit_error
    )
)

echo INFO: Repo updated successfully.

:end_repo_update

if "%1"=="stop" (
  :: only stop if chart is installed
  for /f "tokens=*" %%a in ('helm list --namespace %namespace% --short %kubeconfigFlag%') do (
    echo INFO: Stopping deployments..
    goto stop_pods
  )
  goto exit
)

if "%localChart%"=="true" (
  echo INFO: Using local chart.
  set chartVersion=
  if "%depUpEnabled%"=="true" (
    echo INFO: Running dependency update..
    set /a retryCount=1
    :retryDependencyUpdate
    helm dep up %chart% > nul 2>nul
    if errorlevel 1 (
      echo INFO: Dependency update failed. Retrying in 1 minute...
      if !retryCount! LEQ 5 (
        echo INFO: Retry attempt: !retryCount! of 5 
        ping -n 60 127.0.0.1 >nul 2>nul
        set /a retryCount+=1
        goto retryDependencyUpdate
      ) else (
        echo SEVERE: Failed to run dependency update after 5 retries.
        goto exit_error
      )
    )
  )
) else (
  echo INFO: Using chart %chart% %chartVersion%
)

set helmArgs=%helmArgs% --reset-values
if not "%1"=="dryrun" echo INFO: Installing ifs-cloud middle tier & goto :helm
echo INFO: Doing a dry-run ..
set helmArgs=%helmArgs% --dry-run


:helm
:: Delete all the jobs
for /f "tokens=1" %%J in ('kubectl get jobs -n %namespace% --no-headers ^| findstr /v /c:"NAME"') do (
    echo INFO: Deleting job %%J...
    kubectl delete job %%J -n %NAMESPACE%
)
echo INFO: Running helm upgrade
if "%repoType%"=="o" (
  call :update_from_oci_repo retval
  if not !retval! == 0 (
    echo SEVERE: Failed to install ifs-cloud
    call mtctl start --namespace %namespace%
    goto exit_error
  )
) else (
  :: echo INFO: helm upgrade --install ifs-cloud %chart% %chartVersion% %helmConfigFlag% %debug% --timeout 15m --namespace %namespace% !helmArgs!
  helm upgrade --install ifs-cloud %chart% %chartVersion% %helmConfigFlag% %debug% --timeout 15m --namespace %namespace% !helmArgs!
  :: helm template %chart% %chartVersion% %helmConfigFlag% --debug  --timeout 15m  --namespace %namespace% %helmArgs%
  if errorlevel 1 (
    echo SEVERE: Failed to install ifs-cloud
    call mtctl start --namespace %namespace%
    goto exit_error
  )
)
if "%1"=="dryrun" (
  echo INFO: dry-run succeeded
) else (
  echo INFO: IFS Cloud installed
  call mtctl start --namespace %namespace%
  If !errorlevel! equ 0 (
      echo INFO: MTCTL start is successful
  ) else (
      echo INFO: MTCTL start Failed
  )
)
goto exit

:stop_pods
call mtctl stop --namespace %namespace%
if !errorlevel! equ 0 (
  echo INFO: Successfully stopped the running containers
) else (
  echo INFO: Failed to stop running containers
  goto exit_error
)
:: waiting default terminationGracePeriodSeconds
ping -n 30 127.0.0.1 >nul 2>nul
goto exit

:delete
echo INFO: Deleting ifs-cloud chart..
helm uninstall ifs-cloud --namespace %namespace% %helmConfigFlag% > nul 2> nul
kubectl delete ns %namespace% %kubeconfigFlag%
goto exit

:findhost
  set "url=%1"
  FOR /F "tokens=2 delims=/" %%G in ("%url%") do set "host=%%G"
  set "%~2=%host%"
  exit /B

:update_from_oci_repo
  call :findhost %helmRepo% repoHost

  echo INFO: Login to Helm registry %repoHost%...
  for /f "delims=" %%a in ('helm registry login %repoHost% -u %helmUser% -p !helmPwd! 2^>^&1') do set "helmOutput=%%a"
  echo %helmOutput% | findstr /C:"unauthorized" >nul
  if %errorlevel% equ 0 (
      echo SEVERE: Invalid username or password.
      set "%~1=1"
      exit /B
  )
  echo %helmOutput% | findstr /C:"no such host" >nul
  if %errorlevel% equ 0 (
      echo SEVERE: Repository URL %helmRepo% is invalid.
      set "%~1=1"
      exit /B
  )
  echo %helmOutput% | findstr /C:"Login Succeeded" >nul
  if not %errorlevel% equ 0 (
      echo SEVERE: Login failed.
      set "%~1=1"
      exit /B
  )
  echo INFO: Logged into registry %repoHost%.

  if %helmRepo:~-1% neq "/" (
    set helmRepo=%helmRepo%/
  )
  :: echo INFO: helm upgrade --install ifs-cloud %helmRepo%%chart% %chartVersion% %helmConfigFlag% %debug% --timeout 15m --namespace %namespace% !helmArgs!
  helm upgrade --install ifs-cloud %helmRepo%%chart% %chartVersion% %helmConfigFlag% %debug% --timeout 15m --namespace %namespace% !helmArgs!

  set "%~1=0"
  exit /B

:exit
endlocal
exit /B 0

:exit_error
endlocal
exit /B 1