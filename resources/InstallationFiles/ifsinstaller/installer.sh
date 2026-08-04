#!/bin/bash

# PKG="--java"
# echo $* | grep -q 'action=' || PKG="$PKG --kubectl --helm --k8s"
# echo $* | grep -q 'action=mtinstaller\|action=delete' && PKG="$PKG --kubectl --helm --k8s"
# bash utils/verify_required_software.sh $PKG
# if ! [ $? -eq 0 ]; then
#    exit 1
# fi
java -cp .:lib/ifsinstaller.jar:lib/snakeyaml-2.0.jar:lib/ojdbc.jar ifs.installer.Installer --values version.yaml $*
