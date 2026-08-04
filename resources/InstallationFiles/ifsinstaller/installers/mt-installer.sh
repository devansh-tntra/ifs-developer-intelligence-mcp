#!/bin/bash

if [ -z ${namespace+x} ]; then
  echo SEVERE: namespace must be set
  exit 1
fi

if [ "$1" == "delete" ]; then
  echo INFO: Deleting ifs-cloud chart..
  helm uninstall ifs-cloud --namespace ${namespace} ${kubeconfigFlag} > /dev/null 2>&1
  kubectl ${kubeconfigFlag} delete ns ${namespace}
  if [ $? -ne 0 ]; then echo SEVERE: Failed to delete namespace; exit 1; fi
  exit 0
fi

# Create namespace if it doesn't exist
kubectl ${kubeconfigFlag} get namespace ${namespace} -o name > /dev/null 2>&1
if [ $? -ne 0 ]; then 
  echo INFO: Creating namespace
  kubectl ${kubeconfigFlag} create namespace ${namespace}
  if [ $? -ne 0 ]; then echo SEVERE: Failed to create namespace; exit 1; fi
fi

# If namesapce exist but is owned by Helm, then recreate it.
kubectl ${kubeconfigFlag} describe namespace ${namespace} | grep "meta.helm.sh" > /dev/null 2>&1
if [ $? -ne 1 ]; then 
  echo INFO: Recreate namespace owned by Helm
  kubectl ${kubeconfigFlag} delete namespace ${namespace}
  kubectl ${kubeconfigFlag} create namespace ${namespace}
  if [ $? -ne 0 ]; then echo SEVERE: Failed to create namespace; exit 1; fi
fi



if [ "$1" == "create-namespace" ]; then
  exit 0
fi

if [ -z ${helmRepo+x} ]; then
  echo SEVERE: helmRepo must be set
  exit 1
fi

if [ -z ${helmUser+x} ]; then
  echo SEVERE: helmRepo must be set
  exit 1
fi

if [ -z ${helmPwd+x} ]; then
  echo SEVERE: helmRepo must be set
  exit 1
fi

if [ -n "${chartVersion}" ]; then
  chartVersion="--version ${chartVersion}"
fi

if [ "$verbose" == "on" ]; then
  debug=--debug
fi

repoType=${helmRepo:0:1}
if [ "${repoType}" != "o" ]; then
  output=$(helm repo add ifscloud --force-update ${helmRepo} --username ${helmUser} --password ${helmPwd} 2>&1)

  # Check if the command was successful
  if [ $? -ne 0 ]; then
    # If the command failed, check if it was due to incorrect credentials
    echo "$output" | grep -q "401"
    if [ $? -eq 0 ]; then
      echo "SEVERE: Incorrect credentials. Please check the username and password."
      exit 1
    else
      echo "$output"
      exit 1
    fi
  fi

  # Retry logic for helm repo update
  for attempt in {1..5}; do
    helm repo update
    if [ $? -eq 0 ]; then
      echo "INFO: Repo updated successfully"
      break
    fi
    echo "INFO: Helm repo update attempt #${attempt} failed. Retrying in 1 minute..."
    sleep 60
  done

  if [ $? -ne 0 ]; then
    echo "SEVERE: Failed to update Helm repo after 5 retries."
    exit 1
  fi
else
  if [ "${localChart}" == "true" ]; then
    if [ "${depUpEnabled}" == "true" ]; then
      echo SEVERE: Local chart is not supported with OCI repositories.
      exit 1
    fi
    repoType=
  fi
fi

nsFound=$(helm list --namespace ${namespace} --short $kubeconfigFlag)
if [ "$1" == "stop" ]; then
  if [ ! "$nsFound" == "" ]; then
    echo INFO: Stopping deployments..
    bash ./mtctl.sh stop --namespace ${namespace}
    if [ $? -eq 0 ]; then 
      echo INFO: Successfully stopped the running containers
    else
      echo INFO: Failed to stop running containers
      exit 1
    fi
    # waiting default terminationGracePeriodSeconds
    sleep 30
  fi
  exit 0
fi

# Retry Function
if [ "$localChart" == "true" ]; then
  echo "INFO: Using local chart."
  chartVersion=
  if [ "$depUpEnabled" == "true" ]; then
    echo "INFO: Running dependency update.."
    for attempt in {1..5}; do
      helm dep up ${chart} >/dev/null 2>&1
      helm_exit_status=$?  # Store exit status of helm command
      if [ $helm_exit_status -eq 0 ]; then
        echo "INFO: Dependency update succeeded"
        break
      fi
      echo "INFO: Dependency update attempt #${attempt} failed. Retrying in 1 minute..."
      sleep 60
    done
    if [ $helm_exit_status -ne 0 ]; then  # Check stored exit status after loop
      echo "SEVERE: Failed running dependency update" 
      exit 1
    fi
  fi
else
  echo "INFO: Using chart ${chart} ${chartVersion}"
fi

helmArgs="${helmArgs} --reset-values"
if [ "$1" == "dryrun" ]; then
  echo INFO: Doing a helm dry-run ..
  helmArgs="${helmArgs} --dry-run"
else
  echo INFO: Installing ifs-cloud middle tier
fi

#Delete the jobs before helm upgrade
kubectl get jobs -n "${namespace}" -o custom-columns=NAME:metadata.name --no-headers | while read -r JOB; do
    echo FINE: "Deleting job: $JOB"
    kubectl delete job "$JOB" -n "$namespace"
done

echo INFO: Running helm upgrade
if [ "${repoType}" != "o" ]; then
  helm upgrade --install ifs-cloud ${chart} ${chartVersion} ${helmConfigFlag} $debug --timeout 15m --namespace ${namespace} ${helmArgs}
  if [ $? -ne 0 ]; then echo SEVERE: Failed to install ifs-cloud; ./mtctl.sh start --namespace ${namespace}; exit 1; fi
else 
  arr=(${helmRepo//// })
  repoHost=${arr[1]}
  
  echo INFO: Login to Helm registry $repoHost...
  helmOutput=$(helm registry login $repoHost -u $helmUser -p $helmPwd 2>&1)
  # Check if the command was successful
  if [ $? -ne 0 ]; then
    echo SEVERE: Login failed.
    # If the command failed, check if it was due to incorrect credentials
    echo "$helmOutput" | grep -q "unauthorized"
    if [ $? -eq 0 ]; then
      echo "SEVERE: Invalid username or password."
    fi
    echo "$helmOutput" | grep -q "no such host"
    if [ $? -eq 0 ]; then
      echo SEVERE: Repository URL $helmRepo is invalid.
    fi
    echo $helmOutput 
    exit 1
  fi
  echo INFO: Logged into registry $repoHost.

  if [ "${helmRepo: -1}" != "/" ]; then
    helmRepo=$helmRepo/
  fi

  helm upgrade --install ifs-cloud ${helmRepo}${chart} $chartVersion $helmConfigFlag $debug --timeout 15m --namespace $namespace $helmArgs
fi

if [ "$1" == "dryrun" ]; then
  echo INFO: Dry run succeeded
else
  echo INFO:IFS Cloud installed
  bash ./mtctl.sh start --namespace ${namespace}
  if [ $? -eq 0 ]; then
    echo INFO: MTCTL start is successful
  else
    echo INFO: MTCTL start failed
  fi
fi

exit 0