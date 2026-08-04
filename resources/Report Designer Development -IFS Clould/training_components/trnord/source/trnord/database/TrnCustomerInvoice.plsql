-----------------------------------------------------------------------------
--
--  Logical unit: TrnCustomerInvoice
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
   Client_SYS.Add_To_Attr('INVOICE_AMOUNT', 0, attr_);
   Client_SYS.Add_To_Attr('UNPAID', 0, attr_);
END Prepare_Insert___;


@Override
PROCEDURE Check_Common___ (
   oldrec_ IN     trn_customer_invoice_tab%ROWTYPE,
   newrec_ IN OUT trn_customer_invoice_tab%ROWTYPE,
   indrec_ IN OUT Indicator_Rec,
   attr_   IN OUT VARCHAR2 )
IS
BEGIN
   --Add pre-processing code here
   Validate_Customer_Invoice___(newrec_);
   super(oldrec_, newrec_, indrec_, attr_);
   --Add post-processing code here
END Check_Common___;




@Override
PROCEDURE Insert___ (
   objid_      OUT    VARCHAR2,
   objversion_ OUT    VARCHAR2,
   newrec_     IN OUT trn_customer_invoice_tab%ROWTYPE,
   attr_       IN OUT VARCHAR2 )
IS
BEGIN
   --Add pre-processing code here
   objversion_ := to_char(newrec_.rowversion,'YYYYMMDDHH24MISS');
   newrec_.invoice_id := Get_Next_Invoice_Id___();
   newrec_.invoice_date := SYSDATE;
   newrec_.rowstate := NULL;
   Client_SYS.Add_To_Attr('INVOICE_ID', newrec_.invoice_id, attr_);
   Client_SYS.Add_To_Attr('INVOICE_DATE', newrec_.invoice_date, attr_);
   super(objid_, objversion_, newrec_, attr_);
   --Add post-processing code here
   Trn_Reservation_Api.Invoice_Reservation(newrec_.company_id,
                                            newrec_.branch_id,
                                            newrec_.order_id);

END Insert___;










-------------------- LU SPECIFIC PRIVATE METHODS ----------------------------


-------------------- LU SPECIFIC PROTECTED METHODS --------------------------


-------------------- LU SPECIFIC PUBLIC METHODS -----------------------------

FUNCTION Get_Next_Invoice_Id___ RETURN NUMBER
IS
   CURSOR get_invoice_id IS
      SELECT Trn_Customer_Invoice_Id_SEQ.NEXTVAL
      FROM DUAL;
   temp_ NUMBER;
BEGIN
   OPEN get_invoice_id;
   FETCH get_invoice_id INTO temp_;
   CLOSE get_invoice_id;
   RETURN temp_;
END Get_Next_Invoice_Id___;

FUNCTION Paid_In_Full___ (
   rec_ IN trn_customer_invoice_tab%ROWTYPE ) RETURN BOOLEAN
IS
BEGIN
RETURN (rec_.unpaid = 0);
END Paid_In_Full___;





PROCEDURE Validate_Customer_Invoice___ (
   newrec_ IN trn_customer_invoice_tab%ROWTYPE )
IS
BEGIN
   Trn_Cust_Invoice_Util_API.Check_Customer_Credit(newrec_.company_id,
                                                    newrec_.customer_id,
                                                    newrec_.unpaid);
END Validate_Customer_Invoice___;

PROCEDURE Create_Invoice (
   company_id_ IN VARCHAR2,
   branch_id_ IN VARCHAR2,
   invoice_id_ OUT NUMBER,
   invoice_amount_ IN NUMBER,
   customer_id_ IN NUMBER,
   order_id_ IN NUMBER )
IS
   rec_ trn_customer_invoice_tab%ROWTYPE;
   
   attr_ VARCHAR2(2000);
BEGIN

  

   --Create the invoice
   Client_SYS.Clear_Attr(attr_);
   Client_SYS.Add_To_Attr('COMPANY_ID', company_id_, attr_);
   Client_SYS.Add_To_Attr('BRANCH_ID', branch_id_, attr_);
   Client_SYS.Add_To_Attr('INVOICE_AMOUNT', invoice_amount_, attr_);
   Client_SYS.Add_To_Attr('UNPAID',invoice_amount_, attr_);
   Client_SYS.Add_To_Attr('CUSTOMER_ID', customer_id_, attr_);
   Client_SYS.Add_To_Attr('ORDER_ID', order_id_, attr_);

   New___(rec_);
  

   invoice_id_ := Client_SYS.Get_Item_Value('INVOICE_ID', attr_);
END Create_Invoice;


FUNCTION Calculate_Invoice_Total (
   company_id_ IN VARCHAR2,
   branch_id_ IN VARCHAR2,
   invoice_id_ IN NUMBER ) RETURN NUMBER
IS
   CURSOR get_total IS
      SELECT NVL(SUM(t.amount), 0)
      FROM Trn_Customer_Invoice_Item_TAB t
      WHERE t.company_id = company_id_
      AND t.branch_id = branch_id_
      AND t.invoice_id = invoice_id_;
   temp_ NUMBER;
BEGIN
   OPEN get_total;
   FETCH get_total INTO temp_;
   CLOSE get_total;
   RETURN temp_;
   RETURN NULL;
END Calculate_Invoice_Total;