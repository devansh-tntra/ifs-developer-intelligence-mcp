-----------------------------------------------------------------------------
--
--  Logical unit: TrnProduct
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
FUNCTION Get_Next_Product_Id___ RETURN NUMBER
IS
   CURSOR get_product_id IS
      SELECT Trn_Product_Id_SEQ.NEXTVAL
      FROM DUAL;
   temp_ NUMBER;
BEGIN
   OPEN get_product_id;
   FETCH get_product_id INTO temp_;
   CLOSE get_product_id;
   RETURN temp_;
END Get_Next_Product_Id___;

-------------------- LU SPECIFIC PRIVATE METHODS ----------------------------


-------------------- LU SPECIFIC PROTECTED METHODS --------------------------


-------------------- LU SPECIFIC PUBLIC METHODS -----------------------------

