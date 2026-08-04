#!/bin/bash

help_args () {
    echo
    echo
    echo Usage:  "<classpath>" "com.jaspersoft.jasperserver.export.ImportCommand" "js-import" "--input-zip <templateLocation>" "--update"
    echo
    echo      templateLocation: Path to Maintenix report template zip file
    echo      classpath: Classpath contains jar files, configuration files and config.
    echo
    exit 1
}

# Check for help arguments
if [[ $1 == "?" ]] || [[ $1 == "/?" ]] || [[ $1 == "--help" ]] || [[ $1 == "/help" ]]; then	
    help_args 
fi

# Set environment variables
SCRIPT_DIR="$(dirname "$(realpath "$0")")"
MTX_REPORT_IMPORT_HOME="$(realpath "${SCRIPT_DIR}/../../icam/mx-database/reportimport")"
export ks="$MTX_REPORT_IMPORT_HOME/keystore"
export ksp="$MTX_REPORT_IMPORT_HOME/keystore"

java -cp "$@"

# Check for errors in the Maintenix customize command
if [ $? -ne 0 ]; then
  unset  ks ksp
  exit 1
else
  unset ks ksp
  exit 0
fi
