-----------------------------------------------------------------------------
--
--  Logical unit: TrnInventoryProdUtil
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
PROCEDURE Move_Items (
   company_id_               IN VARCHAR2,
   source_branch_id_         IN VARCHAR2,
   source_inventory_id_      IN NUMBER,
   source_product_id_        IN NUMBER,
   destination_branch_id_    IN VARCHAR2,
   destination_inventory_id_ IN NUMBER,
   quantity_                 IN NUMBER )
IS
BEGIN

   Trn_Inventory_Product_API.Move_Item(company_id_,
                                       source_branch_id_,
                                       source_inventory_id_,
                                       source_product_id_,
                                       quantity_,
                                       'OUT');
   Trn_Inventory_Product_API.Move_Item(company_id_,
                                       destination_branch_id_,
                                       destination_inventory_id_,
                                       source_product_id_,
                                       quantity_,
                                       'IN');
END Move_Items;
