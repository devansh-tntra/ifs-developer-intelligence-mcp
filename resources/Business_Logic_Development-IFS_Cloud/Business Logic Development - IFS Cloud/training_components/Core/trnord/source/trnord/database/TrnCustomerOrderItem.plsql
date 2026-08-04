-----------------------------------------------------------------------------
--
--  Logical unit: TrnCustomerOrderItem
--  Component:    TRNORD
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

   Client_SYS.Add_To_Attr('PRICE', 0, attr_);
   Client_SYS.Add_To_Attr('QUANTITY', 0, attr_);

   Client_SYS.Add_To_Attr('ROW_NO', Get_Next_Row_No___(), attr_);
END Prepare_Insert___;


@Override
PROCEDURE Check_Common___ (
   oldrec_ IN     trn_customer_order_item_tab%ROWTYPE,
   newrec_ IN OUT trn_customer_order_item_tab%ROWTYPE,
   indrec_ IN OUT Indicator_Rec,
   attr_   IN OUT VARCHAR2 )
IS
BEGIN
   --Add pre-processing code here
   newrec_.amount := newrec_.price * newrec_.quantity;
   super(oldrec_, newrec_, indrec_, attr_);
   --Add post-processing code here
END Check_Common___;



FUNCTION Get_Next_Row_No___ RETURN NUMBER
IS
   CURSOR get_cusomter_id IS
      SELECT Trn_Cust_Order_Row_No_SEQ.NEXTVAL
      FROM DUAL;
   temp_ NUMBER;
BEGIN
   OPEN get_cusomter_id;
   FETCH get_cusomter_id INTO temp_;
   CLOSE get_cusomter_id;

   RETURN temp_;
END Get_Next_Row_No___;

PROCEDURE Reserve_Item___ (
   rec_  IN OUT trn_customer_order_item_tab%ROWTYPE,
   attr_ IN OUT VARCHAR2 )
IS
    inventory_id_ NUMBER;
BEGIN


   inventory_id_ := Trn_Customer_Order_API.Get_Preferred_Inventory(rec_.company_id,
                                                                   rec_.branch_id,
                                                                   rec_.order_id);
   Trn_Reservation_API.Create_Reservation(rec_.company_id,
                                           rec_.branch_id,
                                           rec_.order_id,
                                           rec_.row_no,
                                           rec_.product_id,
                                           inventory_id_,
                                           rec_.quantity);
   Trn_Inventory_Product_API.Update_Reserved_Quantity(rec_.company_id,
                                                      rec_.branch_id,
                                                      inventory_id_,
                                                      rec_.product_id,
                                                      rec_.quantity,
                                                       'RESERVE');


END Reserve_Item___;

PROCEDURE Remove_Reserved_Item___ (
   rec_  IN OUT trn_customer_order_item_tab%ROWTYPE,
   attr_ IN OUT VARCHAR2 )
IS
   inventory_id_ NUMBER;
BEGIN
 

   inventory_id_ := Trn_Customer_Order_API.Get_Preferred_Inventory(rec_.company_id,
                                                                   rec_.branch_id,
                                                                   rec_.order_id);
   Trn_Reservation_Item_API.Remove_Reservation_Item(rec_.company_id,
                                                    rec_.branch_id,
                                                    inventory_id_,
                                                    rec_.product_id,
                                                    rec_.order_id,
                                                    rec_.row_no,
                                                    rec_.quantity);
   Trn_Inventory_Product_API.Update_Reserved_Quantity(rec_.company_id,
                                                      rec_.branch_id,
                                                      inventory_id_,
                                                      rec_.product_id,
                                                      rec_.quantity,
                                                       'UNRESERVE');

END Remove_Reserved_Item___;







-------------------- LU SPECIFIC PRIVATE METHODS ----------------------------


-------------------- LU SPECIFIC PROTECTED METHODS --------------------------


-------------------- LU SPECIFIC PUBLIC METHODS -----------------------------

PROCEDURE Invoice (
   company_id_ IN VARCHAR2,
   branch_id_ IN VARCHAR2,
   order_id_ IN NUMBER,
   row_no_ IN NUMBER )
IS
   objid_ VARCHAR2(2000);
   objversion_ VARCHAR2(2000);
   info_ VARCHAR2(2000);
   attr_ VARCHAR2(2000);

   inventory_id_ VARCHAR2(2000);
   rec_ trn_customer_order_item_tab%ROWTYPE;
BEGIN
   

   Get_Id_Version_By_Keys___(objid_, objversion_, company_id_, branch_id_, order_id_, row_no_);
   Invoice__(info_, objid_, objversion_, attr_, 'DO');

   inventory_id_ := Trn_Customer_Order_API.Get_Preferred_Inventory(company_id_,
                                                                   branch_id_,
                                                                   order_id_);
   rec_ := Get_Object_By_Keys___(company_id_, branch_id_, order_id_, row_no_);
   Trn_Inventory_Product_API.Update_Reserved_Quantity(company_id_,
                                                      branch_id_,
                                                      inventory_id_,
                                                      rec_.product_id,
                                                      rec_.quantity,
                                                       'INVOICE');

END Invoice;