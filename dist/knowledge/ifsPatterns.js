export const MARBLE_ENTITY_TEMPLATE = `
-----------------------------------------------------------------------------
-- Entity:       {EntityName}
-- Component:    {Component}
-- Architecture: IFS Cloud Marble DSL Entity Model
-----------------------------------------------------------------------------

entity {EntityName} {
   from = "{TableName}";

   attribute {EntityName}Id Text {
      label = "{EntityName} ID";
      maxlength = 30;
      format = uppercase;
      editable = [ETag = null];
   }
   attribute Description Text {
      label = "Description";
      maxlength = 200;
   }
   attribute CreatedDate Timestamp {
      label = "Created Date";
      editable = [false];
   }
   attribute State Text {
      label = "Status";
      maxlength = 20;
      editable = [false];
   }

   keys {
      key {EntityName}Id;
   }
}
`;
export const MARBLE_PROJECTION_TEMPLATE = `
-----------------------------------------------------------------------------
-- Projection:   {ProjectionName}
-- Component:    {Component}
-- Architecture: IFS Cloud Aurena OData Projection
-----------------------------------------------------------------------------

projection {ProjectionName};
component {Component};
layer Core;

description "Projection for managing {EntityName} data";

-------------------------------- MAIN ENTITIES ------------------------------
entityset {EntityName}Set for {EntityName};

------------------------------ ENTITY OVERRIDES -----------------------------
@Override
entity {EntityName} {
   crud = Create, Read, Update, Delete;
}

---------------------------------- ACTIONS ----------------------------------
action Approve{EntityName} {
   initialcheck implementation;
   parameter {EntityName}Id Text;
}
`;
export const MARBLE_CLIENT_TEMPLATE = `
-----------------------------------------------------------------------------
-- Client:       {ClientName}
-- Component:    {Component}
-- Architecture: IFS Cloud Aurena UX Client
-----------------------------------------------------------------------------

client {ClientName};
component {Component};
layer Core;
projection {ProjectionName};

-------------------------------- MAIN PAGES ---------------------------------
page Form using {EntityName}Set {
   label = "{EntityName} Details";
   selector {EntityName}Selector;
   group {EntityName}MainGroup;
   command ApproveCommand;
}

--------------------------------- GROUPS ------------------------------------
group {EntityName}MainGroup for {EntityName} {
   label = "General Information";
   field {EntityName}Id;
   field Description;
   field CreatedDate;
   field State;
}

-------------------------------- SELECTORS ----------------------------------
selector {EntityName}Selector for {EntityName} {
   label = "${'{'}{EntityName}Id${'}'} - ${'{'}Description${'}'}";
   field {EntityName}Id;
   field Description;
}

--------------------------------- COMMANDS ----------------------------------
command ApproveCommand for {EntityName} {
   label = "Approve";
   enabled = [State = "Planned"];
   execute {
      call Approve{EntityName}({EntityName}Id);
      success("Approved successfully!");
   }
}
`;
export const PLSQL_PACKAGE_TEMPLATE = `
-----------------------------------------------------------------------------
-- Package Body: {LuName}_API
-- Component:    {Component}
-- Architecture: IFS Cloud Logical Unit Business Logic
-----------------------------------------------------------------------------

PROMPT Creating {LuName}_API body...

CREATE OR REPLACE PACKAGE BODY {LuName}_API IS

-----------------------------------------------------------------------------
-- PRIVATE DECLARATIONS
-----------------------------------------------------------------------------

lu_name_ CONSTANT VARCHAR2(30) := '{LuName}';

-----------------------------------------------------------------------------
-- IMPLEMENTATION METHODS
-----------------------------------------------------------------------------

@Override
PROCEDURE Prepare_Insert___ (
   attr_ IN OUT VARCHAR2 )
IS
BEGIN
   super(attr_);
   Client_SYS.Add_To_Attr('CREATED_DATE', sysdate, attr_);
   Client_SYS.Add_To_Attr('STATE', 'Planned', attr_);
END Prepare_Insert___;

@Override
PROCEDURE Check_Insert___ (
   newrec_ IN OUT {TableName}%ROWTYPE,
   indrec_ IN OUT Indicator_Rec,
   attr_   IN OUT VARCHAR2 )
IS
BEGIN
   super(newrec_, indrec_, attr_);
   IF newrec_.description IS NULL THEN
      Error_SYS.Record_General(lu_name_, 'NODESC: Description must not be empty.');
   END IF;
END Check_Insert___;

-----------------------------------------------------------------------------
-- PUBLIC METHODS
-----------------------------------------------------------------------------

PROCEDURE Approve_Record (
   {lu_key_var}_ IN VARCHAR2 )
IS
   rec_ {TableName}%ROWTYPE;
BEGIN
   rec_ := Get_Object_By_Keys___({lu_key_var}_);
   IF rec_.state != 'Planned' THEN
      Error_SYS.Record_General(lu_name_, 'CANNOTAPPROVE: Only planned records can be approved.');
   END IF;
   
   UPDATE {TableName}_tab
      SET state = 'Approved'
    WHERE rowid = rec_.rowid;
END Approve_Record;

END {LuName}_API;
/
SHOW ERRORS
`;
//# sourceMappingURL=ifsPatterns.js.map