SET VERIFY OFF
SET FEEDBACK OFF
SET SERVEROUT ON
--------------------------------------------------------------------------------
PROMPT Pre Register APPSRV
-- [IFS COMPLETE BLOCK BEGINEND]
BEGIN
   Installation_SYS.Pre_Register('APPSRV', SUBSTR('PRE-Application Services', 1, 50), 'FALSE',  'FALSE');
   Installation_SYS.Register_Dependency('APPSRV', 'SHPORD', 'DYNAMIC');
   Installation_SYS.Register_Dependency('APPSRV', 'ADCOM', 'DYNAMIC');
   Installation_SYS.Register_Dependency('APPSRV', 'ENTERP', 'DYNAMIC');
   Installation_SYS.Register_Dependency('APPSRV', 'RCMINT', 'DYNAMIC');
   Installation_SYS.Register_Dependency('APPSRV', 'QUANCR', 'DYNAMIC');
   Installation_SYS.Register_Dependency('APPSRV', 'PROJBF', 'DYNAMIC');
   Installation_SYS.Register_Dependency('APPSRV', 'PLADES', 'DYNAMIC');
   Installation_SYS.Register_Dependency('APPSRV', 'PARTCA', 'DYNAMIC');
   Installation_SYS.Register_Dependency('APPSRV', 'MWO', 'DYNAMIC');
   Installation_SYS.Register_Dependency('APPSRV', 'MSCOM', 'DYNAMIC');
   Installation_SYS.Register_Dependency('APPSRV', 'LINAST', 'DYNAMIC');
   Installation_SYS.Register_Dependency('APPSRV', 'ESTMAN', 'DYNAMIC');
   Installation_SYS.Register_Dependency('APPSRV', 'ACCRUL', 'DYNAMIC');
   Installation_SYS.Register_Dependency('APPSRV', 'BISERV', 'STATIC');
   Installation_SYS.Register_Dependency('APPSRV', 'FNDBAS', 'STATIC');
END;
-- [END IFS COMPLETE BLOCK]
/
--------------------------------------------------------------------------------
SET SERVEROUT OFF
