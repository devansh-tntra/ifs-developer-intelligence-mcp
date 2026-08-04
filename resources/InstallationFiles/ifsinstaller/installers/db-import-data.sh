#!/bin/bash

pushd `dirname $0`
LIB="$(dirname $(pwd))/lib"
CLASSPATH=$LIB/ifs-fnd-import.jar:$LIB/ojdbc.jar

java -Xmx4096m -cp $CLASSPATH -Djava.awt.headless=true -Duser.language=en -Duser.country=US ifs.fnd.dataimport.DataImport "$@"
if [ $? -ne 0 ]; then
  popd
  exit 1
else
  popd
  exit 0
fi
