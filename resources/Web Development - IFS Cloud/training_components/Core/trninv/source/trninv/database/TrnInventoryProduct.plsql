-----------------------------------------------------------------------------
--
--  Logical unit: TrnInventoryProduct
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
   --Add pre-processing code here
   super(attr_);
   --Add post-processing code here
    Client_SYS.Add_To_Attr('QUANTITY', 0, attr_);
   Client_SYS.Add_To_Attr('REORDER_LEVEL', 0, attr_);
   Client_SYS.Add_To_Attr('RESERVED_QUANTITY', 0, attr_);
END Prepare_Insert___;




-------------------- LU SPECIFIC PRIVATE METHODS ----------------------------


-------------------- LU SPECIFIC PROTECTED METHODS --------------------------


-------------------- LU SPECIFIC PUBLIC METHODS -----------------------------
PROCEDURE Update_Reserved_Quantity (
   company_id_ IN VARCHAR2,
   branch_id_ IN VARCHAR2,
   inventory_id_ IN NUMBER,
   product_id_ IN NUMBER,
   quantity_ IN NUMBER,
   action_ IN VARCHAR2 DEFAULT 'RESERVE' )
IS
   rec_           TRN_INVENTORY_PRODUCT_TAB%ROWTYPE;
   objid_         VARCHAR2(2000);
   objversion_    VARCHAR2(2000);
   attr_          VARCHAR2(2000);

BEGIN
   

   --Modify the exception raised.
   BEGIN
      rec_ := Lock_By_Keys___(company_id_, branch_id_, inventory_id_, product_id_);
   EXCEPTION
      WHEN OTHERS THEN
         Error_SYS.Appl_General(lu_name_,
                                'PRODUCTNOTEXIST: Product :P1 does not exit at the prefered inventory :P2.',
                                product_id_,
                                inventory_id_);
   END;

   IF action_= 'INVOICE' THEN
       rec_.Reserved_Quantity := rec_.Reserved_Quantity - quantity_;
   ELSIF action_= 'RESERVE' THEN

      IF rec_.Quantity < quantity_ THEN
         Error_SYS.Appl_General(lu_name_,
                                'INSUFFICIENTQTY: Insufficient quantity of product :P1 at prefered inventory location :P2.',
                                product_id_,
                                inventory_id_);
      END IF;
      rec_.Quantity := rec_.Quantity - quantity_;
      rec_.Reserved_Quantity := rec_.Reserved_Quantity + quantity_;

   ELSIF action_= 'UNRESERVE' THEN
      rec_.Quantity := rec_.Quantity + quantity_;
      rec_.Reserved_Quantity := rec_.Reserved_Quantity - quantity_;
   ELSE
      null;
   END IF;
   Update___(objid_, rec_, rec_, attr_, objversion_, TRUE);

END Update_Reserved_Quantity;

PROCEDURE Move_Item (
   company_id_ IN VARCHAR2,
   branch_id_ IN VARCHAR2,
   inventory_id_ IN NUMBER,
   product_id_ IN NUMBER,
   quantity_ IN NUMBER,
   direction_ IN VARCHAR2 DEFAULT 'IN' )
IS
   rec_ TRN_INVENTORY_PRODUCT_TAB%ROWTYPE;
   objid_ VARCHAR2(1000);
   objversion_ VARCHAR2(1000);
   attr_ VARCHAR2(2000);
BEGIN
   

   IF Check_Exist___(company_id_, branch_id_, inventory_id_, product_id_) THEN
      rec_ := Lock_By_Keys___(company_id_, branch_id_, inventory_id_, product_id_);
      IF (direction_ = 'IN') THEN
         rec_.quantity := rec_.quantity + quantity_;
      ELSIF (direction_ = 'OUT') THEN
         rec_.quantity := rec_.quantity - quantity_;
      END IF;
      Update___(objid_, rec_, rec_, attr_, objversion_, TRUE);
   ELSE
      IF (direction_ = 'IN') THEN
         Client_Sys.Add_To_Attr('COMPANY_ID', company_id_, attr_);
         Client_Sys.Add_To_Attr('BRANCH_ID', branch_id_, attr_);
         Client_Sys.Add_To_Attr('INVENTORY_ID', inventory_id_, attr_);
         Client_Sys.Add_To_Attr('PRODUCT_ID', product_id_, attr_);
         Client_Sys.Add_To_Attr('QUANTITY', quantity_, attr_);
         Client_Sys.Add_To_Attr('REORDER_LEVEL', 0, attr_);
         Client_Sys.Add_To_Attr('RESERVED_QUANTITY', 0, attr_);
         New___(rec_);
      ELSE
         -- Cannot move 'OUT' if the record doesn't exist
         Error_SYS.Record_Not_Exist(lu_name_);
      END IF;
   END IF;
END Move_Item;
