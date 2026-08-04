-----------------------------------------------------------------------------
--
--  Logical unit: TrnExternalCustomer
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

FUNCTION Calculate_Order_Total (
   company_id_  IN VARCHAR2,
   customer_id_ IN NUMBER ) RETURN NUMBER
IS
BEGIN
   RETURN Trn_Customer_API.Calculate_Order_Total(company_id_, customer_id_);
END Calculate_Order_Total;

FUNCTION Calculate_Invoice_Total (
   company_id_  IN VARCHAR2,
   customer_id_ IN NUMBER ) RETURN NUMBER
IS
BEGIN
   RETURN Trn_Customer_API.Calculate_Invoice_Total(company_id_, customer_id_);
END Calculate_Invoice_Total;