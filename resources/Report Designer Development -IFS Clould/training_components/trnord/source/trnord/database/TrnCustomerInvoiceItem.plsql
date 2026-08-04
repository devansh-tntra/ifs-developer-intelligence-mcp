-----------------------------------------------------------------------------
--
--  Logical unit: TrnCustomerInvoiceItem
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
END Prepare_Insert___;

@Override
PROCEDURE Insert___ (
   objid_      OUT    VARCHAR2,
   objversion_ OUT    VARCHAR2,
   newrec_     IN OUT trn_customer_invoice_item_tab%ROWTYPE,
   attr_       IN OUT VARCHAR2 )
IS
BEGIN
   --Add pre-processing code here
   objversion_ := to_char(newrec_.rowversion,'YYYYMMDDHH24MISS');
   newrec_.item_no := Get_Next_Invoice_Item_No___();
   newrec_.amount := newrec_.quantity * newrec_.price;
   Client_SYS.Add_To_Attr('ITEM_NO', newrec_.item_no, attr_);
   Client_SYS.Add_To_Attr('AMOUNT', newrec_.amount, attr_);
   
   super(objid_, objversion_, newrec_, attr_);
   --Add post-processing code here
END Insert___;

@Override
PROCEDURE Update___ (
   objid_      IN     VARCHAR2,
   oldrec_     IN     trn_customer_invoice_item_tab%ROWTYPE,
   newrec_     IN OUT trn_customer_invoice_item_tab%ROWTYPE,
   attr_       IN OUT VARCHAR2,
   objversion_ IN OUT VARCHAR2,
   by_keys_    IN     BOOLEAN DEFAULT FALSE )
IS
BEGIN
   --Add pre-processing code here
   objversion_ := to_char(newrec_.rowversion,'YYYYMMDDHH24MISS');
   newrec_.amount := newrec_.quantity * newrec_.price;
   Client_SYS.Add_To_Attr('AMOUNT', newrec_.amount, attr_);
   
   super(objid_, oldrec_, newrec_, attr_, objversion_, by_keys_);
   --Add post-processing code here
END Update___;

FUNCTION Get_Next_Invoice_Item_No___ RETURN NUMBER
IS
   CURSOR get_next_id IS
      SELECT Trn_Cust_Invoice_Item_Id_SEQ.NEXTVAL
      FROM DUAL;
   next_id_ NUMBER;
BEGIN
   OPEN get_next_id;
   FETCH get_next_id INTO next_id_;
   CLOSE get_next_id;
   RETURN next_id_;
END Get_Next_Invoice_Item_No___;



PROCEDURE Reduce_Inventory_Product___ (
   company_id_ IN VARCHAR2,
   branch_id_ IN VARCHAR2,
   invoice_id_ IN NUMBER,
   product_id_ IN NUMBER,
   quantity_ IN NUMBER )
IS
   customer_id_ NUMBER;
   inventory_id_ NUMBER;
BEGIN
   

   customer_id_ := Trn_Customer_Invoice_API.Get_Customer_Id(company_id_,
                                           branch_id_,
                                           invoice_id_);
   inventory_id_ := Trn_External_Customer_API.Get_Preferred_Inventory_Id(company_id_,
                                                                         customer_id_);

   Trn_Inventory_Product_API.Move_Item(company_id_,
                                        branch_id_,
                                        inventory_id_,
                                        product_id_,
                                        quantity_,
                                        'OUT');
END Reduce_Inventory_Product___;





-------------------- LU SPECIFIC PRIVATE METHODS ----------------------------


-------------------- LU SPECIFIC PROTECTED METHODS --------------------------


-------------------- LU SPECIFIC PUBLIC METHODS -----------------------------
PROCEDURE Create_Invoice_Item (
   company_id_ IN VARCHAR2,
   branch_id_ IN VARCHAR2,
   invoice_id_ IN NUMBER,
   item_no_ OUT NUMBER,
   product_id_ IN NUMBER,
   price_ IN NUMBER,
   quantity_ IN NUMBER )
IS
   rec_  trn_customer_invoice_item_tab%ROWTYPE;
   attr_ VARCHAR2(2000);
BEGIN
   

   Client_SYS.Add_To_Attr('COMPANY_ID', company_id_, attr_);
   Client_SYS.Add_To_Attr('BRANCH_ID', branch_id_, attr_);
   Client_SYS.Add_To_Attr('INVOICE_ID', invoice_id_, attr_);
   Client_SYS.Add_To_Attr('PRODUCT_ID', product_id_, attr_);
   Client_SYS.Add_To_Attr('PRICE', price_, attr_);
   Client_SYS.Add_To_Attr('QUANTITY', quantity_, attr_);

  New___(rec_);

   item_no_ := Client_SYS.Get_Item_Value('ITEM_NO', attr_);
END Create_Invoice_Item;
