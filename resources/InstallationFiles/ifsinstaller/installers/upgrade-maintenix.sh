#!/bin/bash

help_args () {
    echo
    echo
    echo Usage:  upgrade-maintenix.sh "-f <logFilePath>" "-b <bundlePath>" "-s <build.properties filepath>"
    echo
    echo "      logFilePath    Path to log file"
    echo "      bundlePath     Path to bundle folder containing liquibase upgrade files"
    echo "      build.properties filepath     Path to build.properties file"
    echo
    exit 1
}

# Check for help arguments
if [[ $1 == "?" ]] || [[ $1 == "/?" ]] || [[ $1 == "--help" ]] || [[ $1 == "/help" ]]; then	
    help_args 
fi

# Set environment variables
LIB=../../icam/mx-database/mtxdbupgrade/lib
CLASSPATH=$LIB/*

# Execute the Maintenix upgrade command
java -cp "$CLASSPATH" com.mxi.mx.am.db.installer.Main -v "$@"

# Check for errors in the Maintenix upgrade command
if [ $? -ne 0 ]; then
  echo "SEVERE: The Maintenix upgrade process failed"
  unset LIB CLASSPATH 
  exit 1
else
  echo "INFO: The Maintenix upgrade process completed successfully"
  unset LIB CLASSPATH
fi
