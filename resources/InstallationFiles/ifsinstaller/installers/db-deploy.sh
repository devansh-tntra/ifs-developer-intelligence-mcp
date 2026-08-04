#!/bin/bash
pushd `dirname $0`
LIB="$(dirname $(pwd))/lib"
CLASSPATH=$LIB/ifs-fnd-dbbuild.jar:$LIB/snakeyaml-2.0.jar:$LIB/ojdbc.jar:$LIB/databaseInstaller/org-netbeans-modules-editor-util.jar
CLASSPATH=$CLASSPATH:$LIB/databaseInstaller/org-netbeans-modules-lexer.jar:$LIB/databaseInstaller/org-openide-util.jar

java -Xmx4096m -cp $CLASSPATH -Djava.awt.headless=true -Duser.language=en -Duser.country=US ifs.fnd.dbbuild.DatabaseInstaller "$@"
if [ $? -ne 0 ]; then
  popd
  exit 1
else
  popd
  exit 0
fi
