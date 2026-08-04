-----------------------------------------------------------------------------
--
--  Logical unit: TrnProductServiceUtil
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


-------------------- LU SPECIFIC PRIVATE METHODS ----------------------------


-------------------- LU SPECIFIC PROTECTED METHODS --------------------------


-------------------- LU SPECIFIC PUBLIC METHODS -----------------------------


-------------------- LU  NEW METHODS -------------------------------------

FUNCTION Get_Query_Products_Final_Struct_Arr (
   company_id_ IN VARCHAR2) RETURN Query_Products_Final_Struct_Arr
IS
   return_arr_ Query_Products_Final_Struct_Arr := Query_Products_Final_Struct_Arr();
   CURSOR get_attributes IS
   SELECT company_id,
   product_id,
   description,
   price
   FROM TRN_PRODUCT
   WHERE company_id = company_id_
   ORDER BY product_id ASC;
BEGIN
   FOR rec_ IN get_attributes LOOP
      return_arr_.extend;
      return_arr_(return_arr_.last).company_id := rec_.company_id;
      return_arr_(return_arr_.last).product_id := rec_.product_id;
      return_arr_(return_arr_.last).description := rec_.description;
      return_arr_(return_arr_.last).price := rec_.price;
   END LOOP;
   RETURN return_arr_;
END Get_Query_Products_Final_Struct_Arr;


PROCEDURE Create_Product (
   product_rec_ IN Receive_Product_Struct_Rec)
IS
   newrec_ Receive_Product_Struct_Rec;
BEGIN
   newrec_ := product_rec_;
   Create_Receive_Product_Struct_Rec___(newrec_);
END Create_Product;


PROCEDURE Create_Products (
   products_ IN Receive_Product_Struct_Arr)
IS
   newrec_ Receive_Product_Struct_Rec;
BEGIN
   IF (products_.count > 0) THEN
      FOR index_ IN products_.first..products_.count LOOP
         newrec_ := products_(index_);
         Create_Receive_Product_Struct_Rec___(newrec_);
      END LOOP;
   END IF;
END Create_Products;