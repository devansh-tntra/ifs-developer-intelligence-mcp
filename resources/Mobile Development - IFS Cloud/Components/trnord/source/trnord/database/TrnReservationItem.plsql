-----------------------------------------------------------------------------
--
--  Logical unit: TrnReservationItem
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
PROCEDURE Insert___ (
   objid_      OUT    VARCHAR2,
   objversion_ OUT    VARCHAR2,
   newrec_     IN OUT trn_reservation_item_tab%ROWTYPE,
   attr_       IN OUT VARCHAR2 )
IS
BEGIN
   --Add pre-processing code here
   objversion_ := to_char(newrec_.rowversion,'YYYYMMDDHH24MISS');
   newrec_.reservation_item_id := Get_Next_Res_Item_Id___();
   Client_SYS.Add_To_Attr('RESERVATION_ITEM_ID', newrec_.reservation_item_id, attr_);
  
   super(objid_, objversion_, newrec_, attr_);
   --Add post-processing code here
END Insert___;


FUNCTION Get_Next_Res_Item_Id___ RETURN NUMBER
IS
   CURSOR get_reservation_item_id IS
      SELECT Trn_Reservation_Item_Id_SEQ.NEXTVAL
      FROM DUAL;
   temp_ NUMBER;
BEGIN
   OPEN get_reservation_item_id;
   FETCH get_reservation_item_id INTO temp_;
   CLOSE get_reservation_item_id;
   RETURN temp_;
END Get_Next_Res_Item_Id___;

-------------------- LU SPECIFIC PRIVATE METHODS ----------------------------


-------------------- LU SPECIFIC PROTECTED METHODS --------------------------


-------------------- LU SPECIFIC PUBLIC METHODS -----------------------------
PROCEDURE Create_Reservation_Item (
   company_id_ IN VARCHAR2,
   branch_id_ IN VARCHAR2,
   reservation_id_ IN NUMBER,
   inventory_id_ IN NUMBER,
   product_id_ IN NUMBER,
   order_id_ IN NUMBER,
   row_no_ IN NUMBER,
   quantity_ IN NUMBER )
IS
   rec_           TRN_RESERVATION_ITEM_TAB%ROWTYPE;
   objid_         VARCHAR2(2000);
   objversion_    VARCHAR2(2000);
   attr_          VARCHAR2(2000);


BEGIN
   

   rec_.company_id := company_id_;
   rec_.reservation_id := reservation_id_;
   rec_.quantity := quantity_;
   rec_.branch_id := branch_id_;
   rec_.inventory_id := inventory_id_;
   rec_.product_id := product_id_;
   rec_.order_id := order_id_;
   rec_.row_no := row_no_;
   rec_.quantity := quantity_;
   Insert___(objid_, objversion_, rec_, attr_);
END Create_Reservation_Item;


PROCEDURE Remove_Reservation_Item (
   company_id_ IN VARCHAR2,
   branch_id_ IN VARCHAR2,
   inventory_id_ IN NUMBER,
   product_id_ IN NUMBER,
   order_id_ IN NUMBER,
   row_no_ IN NUMBER,
   quantity_ IN NUMBER )
IS
   rec_ Trn_Reservation_Item_Tab%ROWTYPE;
   objid_ VARCHAR2(2000);
   objversion_ VARCHAR2(2000);

   CURSOR Get_Reservation IS
      SELECT *
      FROM Trn_Reservation_Item_Tab t
      WHERE t.company_id = company_id_
      AND t.branch_id = branch_id_
      AND t.order_id = order_id_
      AND t.row_no = row_no_
      FOR UPDATE NOWAIT;

BEGIN
   

   OPEN Get_Reservation;
   FETCH Get_Reservation INTO rec_;
   IF Get_Reservation%FOUND THEN
      Get_Id_Version_By_Keys___(objid_,
                                objversion_,
                                rec_.company_id,
                                rec_.reservation_id,
                                rec_.reservation_item_id);
      Check_Delete___(rec_);
      Delete___ (objid_, rec_);
   END IF;
   CLOSE Get_Reservation;


END Remove_Reservation_Item;
