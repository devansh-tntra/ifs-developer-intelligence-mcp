-----------------------------------------------------------------------------
--
--  Logical unit: TrnCustomerOrder
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
   Client_SYS.Add_To_Attr('ORDER_DATE', SYSDATE, attr_);
   Client_SYS.Add_To_Attr('DISCOUNT', 0, attr_);
   Client_SYS.Add_To_Attr('ORDER_ID', Get_Next_Order_Id___(), attr_);
END Prepare_Insert___;

@Override
PROCEDURE Check_Insert___ (
   newrec_ IN OUT trn_customer_order_tab%ROWTYPE,
   indrec_ IN OUT Indicator_Rec,
   attr_   IN OUT VARCHAR2 )
IS
BEGIN
   --Add pre-processing code here
   IF (Trn_Customer_API.Get_Active(newrec_.company_id, newrec_.customer_id)
       != Fnd_Boolean_API.Decode('TRUE') ) THEN
      Error_SYS.Appl_General(Trn_Customer_Order_API.lu_name_,
                             'NOTVALIDINSERT: Insert is not allowed because customer :P1 is not valid. You may change customer status in customer general data form. ',
                             newrec_.customer_id);
   END IF;
   Validate_Customer_Order___(newrec_);
   super(newrec_, indrec_, attr_);
   --Add post-processing code here
END Check_Insert___;

@Override
PROCEDURE Unpack___ (
   newrec_ IN OUT trn_customer_order_tab%ROWTYPE,
   indrec_ IN OUT Indicator_Rec,
   attr_   IN OUT VARCHAR2 )
IS
BEGIN
   --Add pre-processing code here
   IF (newrec_.rowstate != 'Opened') THEN
      Error_SYS.System_General('CANNOTUPDATE: Cannot perform any modifications at :P1 stage', newrec_.rowstate);
   END IF;
   super(newrec_, indrec_, attr_);
   --Add post-processing code here
END Unpack___;


PROCEDURE Validate_Customer_Order___ (
   customer_order_ IN TRN_CUSTOMER_ORDER_TAB%ROWTYPE )
IS
BEGIN
   IF (customer_order_.order_date > customer_order_.delivery_date) THEN
      Error_SYS.Record_General(lu_name_,
                              'INVALIDDELDATE: Delivery date must be after the order date.');
   END IF;

   IF (customer_order_.discount > Trn_Customer_API.Get_Discount(customer_order_.company_id, customer_order_.customer_id)) THEN
      Error_SYS.Item_General(lu_name_, 'DISCOUNT',
                              'INVALIDDISCOUNT: Discount percentage for the order cannot exceed the discount percentage for the customer.');
   END IF;
END Validate_Customer_Order___;

FUNCTION Get_Next_Order_Id___ RETURN NUMBER
IS
   CURSOR get_customer_id IS
      SELECT Trn_Customer_Order_Id_SEQ.NEXTVAL
      FROM DUAL;
   temp_ NUMBER;
BEGIN
   OPEN get_customer_id;
   FETCH get_customer_id INTO temp_;
   CLOSE get_customer_id;
   RETURN temp_;
END Get_Next_Order_Id___;




FUNCTION Check_Order_Lines___ (
   rec_ IN trn_customer_order_tab%ROWTYPE ) RETURN BOOLEAN
IS
BEGIN
RETURN TRUE;
END Check_Order_Lines___;

PROCEDURE Close_Order_Lines___ (
   rec_  IN OUT trn_customer_order_tab%ROWTYPE,
   attr_ IN OUT VARCHAR2 )
IS
BEGIN

NULL;
END Close_Order_Lines___;









-------------------- LU SPECIFIC PRIVATE METHODS ----------------------------


-------------------- LU SPECIFIC PROTECTED METHODS --------------------------


-------------------- LU SPECIFIC PUBLIC METHODS -----------------------------
FUNCTION Calculate_Order_Total (
   company_id_ IN VARCHAR2,
   branch_id_ IN VARCHAR2,
   order_id_ IN NUMBER ) RETURN NUMBER
IS
   CURSOR get_total IS
      SELECT NVL(SUM(t.amount), 0)
      FROM Trn_Customer_Order_Item_TAB t
      WHERE t.company_id = company_id_
      AND t.branch_id = branch_id_
      AND t.order_id = order_id_;
   temp_ NUMBER;
BEGIN
   OPEN get_total;
   FETCH get_total INTO temp_;
   CLOSE get_total;
   RETURN temp_;
END Calculate_Order_Total;

FUNCTION Get_Preferred_Inventory (
   company_id_ IN VARCHAR2,
   branch_id_ IN VARCHAR2,
   order_id_ IN NUMBER ) RETURN NUMBER
IS
   rec_ trn_customer_order_tab%ROWTYPE;
BEGIN
   rec_ := Get_Object_By_Keys___(company_id_, branch_id_, order_id_);
   RETURN Trn_External_Customer_API.Get_Preferred_Inventory_Id(company_id_, rec_.customer_id);
END Get_Preferred_Inventory;
