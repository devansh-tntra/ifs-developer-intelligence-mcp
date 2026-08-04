-----------------------------------------------------------------------------
--
--  Logical unit: TrnInventoryCommMethod
--  Component:    TRNINV
--
--  IFS Developer Studio Template Version 3.0
--
--  Date    Sign    History
--  ------  ------  ---------------------------------------------------------
-----------------------------------------------------------------------------

layer Core;

-------------------- PUBLIC DECLARATIONS ------------------------------------


-------------------- PRIVATE DECLARATIONS -----------------------------------


-------------------- LU SPECIFIC IMPLEMENTATION METHODS ---------------------

@Override
PROCEDURE Prepare_Insert___ (
   attr_ IN OUT VARCHAR2 )
IS
BEGIN
   super(attr_);
   Client_SYS.Add_To_Attr(
      'COMMUNICATION_TYPE', 
      Trn_Communication_Type_API.Decode(Trn_Communication_Type_API.DB_POSTAL),
      attr_
      );
   Client_SYS.Add_To_Attr(
      'DEFAULT_ADDRESS', 
      Fnd_Boolean_API.Decode(Fnd_Boolean_API.DB_FALSE),
      attr_
      );
END Prepare_Insert___;

@Override
PROCEDURE Insert___ (
   objid_      OUT    VARCHAR2,
   objversion_ OUT    VARCHAR2,
   newrec_     IN OUT trn_inventory_comm_method_tab%ROWTYPE,
   attr_       IN OUT VARCHAR2 )
IS
BEGIN
   newrec_.inventory_comm_id := Trn_Inv_Comm_Id_SEQ.NEXTVAL;
   super(objid_, objversion_, newrec_, attr_);
   Client_SYS.Add_To_Attr('INVENTORY_COMM_ID',newrec_.inventory_comm_id,attr_);
END Insert___;
-------------------- LU SPECIFIC PRIVATE METHODS ----------------------------


-------------------- LU SPECIFIC PROTECTED METHODS --------------------------


-------------------- LU SPECIFIC PUBLIC METHODS -----------------------------

