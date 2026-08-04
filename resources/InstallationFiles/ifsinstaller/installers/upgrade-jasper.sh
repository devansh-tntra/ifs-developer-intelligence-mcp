#!/bin/bash

help_args () {
    echo
    echo
    echo Usage:  upgrade-jasper.sh 
    echo
    echo
    exit 1
}

# Check for help arguments
if [[ $1 == "?" ]] || [[ $1 == "/?" ]] || [[ $1 == "--help" ]] || [[ $1 == "/help" ]]; then	
    help_args 
fi

# Set environment variables
ANT_HOME=../../icam/mx-database/jasperdbupgrade/ant
JASPER_DB_UPGRADE_HOME=../../icam/mx-database/jasperdbupgrade

"$ANT_HOME/bin/ant" -listener com.mxi.ant.loggers.XmlLogger -buildfile "$JASPER_DB_UPGRADE_HOME/jasper-upgrade.xml" run.jasper.db.upgrades
if [ $? -ne 0 ]; then
  echo "SEVERE: The jasper upgrade process failed"
  unset ANT_HOME JASPER_DB_UPGRADE_HOME
  exit 1
else
  echo "INFO: The Jasper upgrade process completed successfully"
  unset ANT_HOME JASPER_DB_UPGRADE_HOME
  exit 0
fi
