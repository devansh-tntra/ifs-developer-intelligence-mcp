-----------------------------------------------------------------------------
--
--  Logical unit: TrnCustInvoiceUtil
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


-------------------- LU SPECIFIC PRIVATE METHODS ----------------------------


-------------------- LU SPECIFIC PROTECTED METHODS --------------------------


-------------------- LU SPECIFIC PUBLIC METHODS -----------------------------
PROCEDURE Check_Customer_Credit (
   company_id_ IN VARCHAR2,
   customer_id_ IN NUMBER,
   amount_ IN NUMBER )
IS
   CURSOR get_total_unpaid IS
      SELECT SUM(t.unpaid)
      FROM Trn_Customer_Invoice_TAB t
      WHERE t.company_id = company_id_
      AND t.customer_id = customer_id_;
   total_unpaid_ NUMBER;
   credit_limit_ NUMBER;
BEGIN
   
   OPEN get_total_unpaid;
   FETCH get_total_unpaid INTO total_unpaid_;
   CLOSE get_total_unpaid;
   credit_limit_ := Trn_Customer_API.Get_Credit_Limit(company_id_,customer_id_);
   IF (credit_limit_ < total_unpaid_ + amount_) THEN
      Error_SYS.Appl_General(lu_name_,
                             'NOMORECREDIT: Credit limit of customer :P1 is insufficient to meet invoiced amount.',
                             Trn_Customer_API.Get_Name(company_id_,customer_id_));
   END IF;
END Check_Customer_Credit;



FUNCTION Calculate_Total_For_Customer (
   company_id_ IN VARCHAR2,
   customer_id_ IN NUMBER ) RETURN NUMBER
IS
   total_ NUMBER;
   CURSOR get_cust_total IS
      SELECT SUM(ORDITEM.amount)
      FROM   Trn_Customer_Invoice_TAB ORD,
             Trn_Customer_Invoice_Item_TAB ORDITEM
      WHERE  ORD.company_id = ORDITEM.company_id
      AND ORD.branch_id = ORDITEM.branch_id
      AND ORD.invoice_id = ORDITEM.invoice_id
      AND ORD.customer_id = customer_id_
      AND ORD.company_id = company_id_;
BEGIN
   OPEN get_cust_total;
   FETCH get_cust_total INTO total_;
   CLOSE get_cust_total;
   RETURN (NVL(total_,0));
END Calculate_Total_For_Customer;
