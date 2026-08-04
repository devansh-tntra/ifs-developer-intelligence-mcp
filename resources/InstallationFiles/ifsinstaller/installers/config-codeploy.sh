#!/bin/bash

help_args () {
    echo
    echo
    echo Usage:  config-codeploy.sh "-f <logFilePath>" "-b <bundlePath>" "-s <build.properties filepath>"
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
ANT_HOME=../../icam/mx-database/mtxdbupgrade/ant
MTX_DB_UPGRADE_HOME=../../icam/mx-database/mtxdbupgrade

# Execute the configure codeployed schema command
"$ANT_HOME/bin/ant" -listener com.mxi.ant.loggers.XmlLogger -buildfile "$MTX_DB_UPGRADE_HOME/codeployed.xml" perform.all.config
# Check for errors in the configure codeployed schema command
if [ $? -ne 0 ]; then
  echo "SEVERE: The ICAM Co-deploy configuration failed"
  unset ANT_HOME MTX_DB_UPGRADE_HOME
  exit 1
else
  echo "INFO: The ICAM Co-deploy configuration completed successfully"
  unset ANT_HOME MTX_DB_UPGRADE_HOME
  exit 0
fi
