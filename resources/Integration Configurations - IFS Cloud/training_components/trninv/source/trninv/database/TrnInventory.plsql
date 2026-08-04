-----------------------------------------------------------------------------
--
--  Logical unit: TrnInventory
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
PROCEDURE Insert___ (
   objid_      OUT    VARCHAR2,
   objversion_ OUT    VARCHAR2,
   newrec_     IN OUT trn_inventory_tab%ROWTYPE,
   attr_       IN OUT VARCHAR2 )
IS
BEGIN
   --Add pre-processing code here
   newrec_.inventory_id:= Get_Inventory_Id___(newrec_);
   super(objid_, objversion_, newrec_, attr_);
   --Add post-processing code here
   Client_SYS.Add_To_Attr('INVENTORY_ID',newrec_.inventory_id,attr_);
END Insert___;




-------------------- LU SPECIFIC PRIVATE METHODS ----------------------------


-------------------- LU SPECIFIC PROTECTED METHODS --------------------------


-------------------- LU SPECIFIC PUBLIC METHODS -----------------------------

FUNCTION Get_Inventory_Id___ (
   newrec_ IN TRN_INVENTORY_TAB%ROWTYPE )RETURN NUMBER
IS
   CURSOR get_next_id_ IS
   SELECT Trn_Inventory_Id_SEQ.NEXTVAL
   FROM DUAL;
   inventory_id_ NUMBER;

BEGIN
   IF (newrec_.inventory_id IS NULL) THEN
      OPEN get_next_id_;
      LOOP 
         FETCH get_next_id_ INTO inventory_id_;
         EXIT WHEN (NOT Check_Exist___(newrec_.company_id, newrec_.branch_id, inventory_id_));
      END LOOP;
      CLOSE get_next_id_;
   ELSE
      RETURN newrec_.inventory_id;
   END IF;
   RETURN inventory_id_;
END Get_Inventory_Id___;