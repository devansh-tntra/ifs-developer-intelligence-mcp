#!/bin/bash

if [ -z "${supported_jdk_versions}" ]; then
    supported_jdk_versions="11.0 14.0"
fi
if [ -z "${supported_helm_versions}" ]; then
    supported_helm_versions="3.3 3.4 3.5 3.6 3.7"
fi
if [ -z "${supported_k8s_client_versions}" ]; then
    supported_k8s_client_versions="1.19 1.20 1.21 1.22 1.24 1.25"
fi
if [ -z "${supported_k8s_server_versions}" ]; then
    supported_k8s_server_versions="1.19 1.20 1.21 1.22 1.24 1.25"
fi

compare_installed_version() {
    local _command="$2"
    _curr_ver="$(${_command} 2>&1)"
    local _result=$?
    if [ ${_result} -ne 0 ]; then
        # not installed
        return 127
    fi
    #echo "$1 - ${_curr_ver}"    
    if [ "$5" == "" ]; then
        # any version ok
        return 2
    fi
    local _title=$3
    _version_not_ok=0
    _version_ok=0
    while [ "$5" != "" ]; do
        _version=$5
        _flag=${_version:0:1}
        if [ ${_flag} == "-" ]; then
            _search_pattern=${_title}${_version:1}
            if [[ ${_curr_ver} =~ ${_search_pattern} ]]; then
                _version_not_ok=1
            fi
        else
            _search_pattern=${_title}${_version}
            if [[ ${_curr_ver} =~ ${_search_pattern} ]]; then
                _version_ok=1
            fi
        fi
        shift
    done
    if [ ${_version_not_ok} -eq 1 ]; then
        _version_ok=0
    fi
    return ${_version_ok}
}

# 
# args:
# 1. description for display purposes
#     ex: "Java JDK"
# 2. command to fetch the current installed version
#     ex: "javac.exe -version"
# 3. The start boundary text of the returned version string
#     ex: "javac " -> jdk version format is "javac x.xx.xx"
# 4. Message
# 5. List of versions to check for
#     each item in this list is checked against the installed version, and if the 
#     installed version starts with pattern given in param3 + verion, it is matched.
#     ex: 1.1 1.2.1 -> when installed version is "javac 1.1??" or "javac 1.2.1?" they 
#     are treated compatible. if a version item has a minus in front those matching 
#     versions are treated as non compatibles. 
#
check_version() {
    _app=$1
    _msg=$4
    compare_installed_version "$@"
    local _result=$?
    if [[ $_result -eq 1 ]]; then
        return 0
    elif [[ $_result -eq 2 ]]; then
        echo "$_app - found."
    elif [[ $_result -eq 127 ]]; then
        echo "$_app - not found."
        return 1 # let _return=${_return}+1
    else
        echo "$_msg"
        return 1 # let _return=${_return}+1
    fi
    return 0 
}

# main
# args
# any combination of the following args are accepted.
# repeated if so
# --jdk     check for Java JDK
# --java    check for Java JDK
# --helm    check for Helm
# --kubectl check for kubectl
# --k8s     check for Kubernetes server version
#
_return=0
_nok8s="ERROR: ###### This version of the Kubernetes cluster is deprecated. If you run a Remote Installation read the documentation on how to upgrade the Remote Kubernetes cluster. A new version of the Remote Kubernetes cluster (ifs-remote-x.x.x.zip and ifs-remote-bins-x.x.x.zip) that matches the IFS Cloud middle tier version can be downloaded through the ALE portal. ######"
_nojava="ERROR: JAVA version not supported. Supported versions are OpenJDK ${supported_jdk_versions}"
_nojdk="ERROR: JDK version not supported. Supported versions are OpenJDK ${supported_jdk_versions}"
_nohelm="ERROR: HELM version not supported. Supported versions are HELM ${supported_helm_versions}"
_nok8sc="ERROR: kubectl client version not supported. Supported versions are ${supported_k8s_client_versions}"

echo "Veryfing required client and server software"

while [ "$1" != "" ]; do
    if [ $1 = "--jdk" ]; then
        check_version "OpenJDK Development Kit" "javac -version" "javac " "$_nojdk" ${supported_jdk_versions}
        let _return=${_return}+$?
    elif [ $1 = "--java" ]; then
        check_version "OpenJDK Java Runtime Environment" "java -version" "openjdk version \"" "$_nojava" ${supported_jdk_versions}
            let _return=${_return}+$?
    elif [ $1 = "--helm" ]; then
        check_version "Helm" "helm version --short" "v"  "$_nohelm" ${supported_helm_versions}
        let _return=${_return}+$?
    elif [ $1 = "--kubectl" ]; then
        check_version "K8S Client (kubectl)" "kubectl version --short --client" "Client Version: v" "$_nok8sc" ${supported_k8s_client_versions}
        let _return=${_return}+$?
     elif [ $1 = "--k8s" ]; then
        check_version "K8S Server (kubectl)" "kubectl version --short" "Server Version: v" "$_nok8s" ${supported_k8s_server_versions}
        let _return=${_return}+$?
    fi
    shift
done
if [ ${_return} -eq 0 ]; then 
  echo Verify: ok
fi
exit ${_return}
