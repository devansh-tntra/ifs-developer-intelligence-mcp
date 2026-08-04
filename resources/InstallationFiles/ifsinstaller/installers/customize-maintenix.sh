#!/bin/bash

help_args () {
    echo
    echo
    echo Usage:  customize-maintenix.sh "-f <logFilePath>" "-b <bundlePath>" "-s <build.properties filepath>"
    echo
    echo "      logFilePath    Path to log file"
    echo "      bundlePath     Path to bundle folder containing liquibase customize files"
    echo "      build.properties filepath     Path to build.properties file"
    echo
    exit 1
}

# Check for help arguments
if [[ $1 == "?" ]] || [[ $1 == "/?" ]] || [[ $1 == "--help" ]] || [[ $1 == "/help" ]]; then	
    help_args 
fi

# Set environment variables
LIB=../../icam/mx-database/mtxdbcustomize/lib
CLASSPATH=$LIB/*
MTX_DB_CUSTOMIZE_HOME=../../icam/mx-database/mtxdbcustomize

# Execute the Maintenix customize command
java -cp "$CLASSPATH" com.mxi.mx.am.db.installer.Main -v "$@"

# Check for errors in the Maintenix customize command
if [ $? -ne 0 ]; then
  echo "SEVERE: The Maintenix customize process failed"
  unset LIB CLASSPATH MTX_DB_CUSTOMIZE_HOME
  exit 1
else
  echo "INFO: The Maintenix customize process completed successfully"
  unset LIB CLASSPATH MTX_DB_CUSTOMIZE_HOME
  exit 0
fi
