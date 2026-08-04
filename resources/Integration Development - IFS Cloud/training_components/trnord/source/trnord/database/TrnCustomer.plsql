-----------------------------------------------------------------------------
--
--  Logical unit: TrnCustomer
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
   Client_SYS.Add_To_Attr('CREDIT_LIMIT', 0, attr_);
   Client_SYS.Add_To_Attr('DISCOUNT', 0, attr_);
   Client_SYS.Add_To_Attr('ACTIVE', Fnd_Boolean_API.Decode('TRUE'), attr_);
   Client_SYS.Add_To_Attr('CUSTOMER_ID', Get_Next_Customer_Id___(), attr_);
END Prepare_Insert___;

FUNCTION Get_Next_Customer_Id___ RETURN NUMBER
IS
   CURSOR get_customer_id IS
      SELECT Trn_Customer_Id_SEQ.NEXTVAL
      FROM DUAL;
   temp_ NUMBER;
BEGIN
   OPEN get_customer_id;
   FETCH get_customer_id INTO temp_;
   CLOSE get_customer_id;
   RETURN temp_;
END Get_Next_Customer_Id___;




-------------------- LU SPECIFIC PRIVATE METHODS ----------------------------


-------------------- LU SPECIFIC PROTECTED METHODS --------------------------


-------------------- LU SPECIFIC PUBLIC METHODS -----------------------------
FUNCTION Calculate_Order_Total (
   company_id_ IN VARCHAR2,
   customer_id_ IN NUMBER ) RETURN NUMBER
IS
BEGIN
   RETURN Trn_Customer_Order_Util_API.Calculate_Total_For_Customer(company_id_, customer_id_);
END Calculate_Order_Total;
FUNCTION Calculate_Invoice_Total (
   company_id_ IN VARCHAR2,
   customer_id_ IN NUMBER ) RETURN NUMBER
IS
BEGIN
   RETURN Trn_Cust_Invoice_Util_API.Calculate_Total_For_Customer(company_id_, customer_id_);
END Calculate_Invoice_Total;
