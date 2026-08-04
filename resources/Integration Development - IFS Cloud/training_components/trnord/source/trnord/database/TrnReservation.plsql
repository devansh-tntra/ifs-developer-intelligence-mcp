-----------------------------------------------------------------------------
--
--  Logical unit: TrnReservation
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
   newrec_     IN OUT trn_reservation_tab%ROWTYPE,
   attr_       IN OUT VARCHAR2 )
IS
BEGIN
   --Add pre-processing code here
    objversion_ := to_char(newrec_.rowversion,'YYYYMMDDHH24MISS');
   newrec_.reservation_id := Get_Next_Reservation_Id___();
   Client_SYS.Add_To_Attr('RESERVATION_ID', newrec_.reservation_id, attr_);
  
   super(objid_, objversion_, newrec_, attr_);
   --Add post-processing code here
END Insert___;

FUNCTION Get_Next_Reservation_Id___ RETURN NUMBER
IS
   CURSOR get_reservation_id IS
      SELECT Trn_Reservation_Id_SEQ.NEXTVAL
      FROM DUAL;
   temp_ NUMBER;
BEGIN
   OPEN get_reservation_id;
   FETCH get_reservation_id INTO temp_;
   CLOSE get_reservation_id;
   RETURN temp_;
END Get_Next_Reservation_Id___;



-------------------- LU SPECIFIC PRIVATE METHODS ----------------------------


-------------------- LU SPECIFIC PROTECTED METHODS --------------------------


-------------------- LU SPECIFIC PUBLIC METHODS -----------------------------

PROCEDURE Create_Reservation (
   company_id_ IN VARCHAR2,
   branch_id_ IN VARCHAR2,
   order_id_ IN NUMBER,
   row_no_ IN NUMBER,
   product_id_ IN NUMBER,
   inventory_id_ IN NUMBER,
   quantity_ IN NUMBER )
IS
   CURSOR get_reservation_id IS
      SELECT reservation_id
      FROM TRN_RESERVATION_TAB
      WHERE company_id = company_id_
      AND branch_id = branch_id_
      AND order_id = order_id_;
   reservation_id_    NUMBER;
   rec_               TRN_RESERVATION_TAB%ROWTYPE;
   objid_             VARCHAR2(2000);
   objversion_        VARCHAR2(2000);
   attr_              VARCHAR2(2000);
BEGIN
   
   OPEN get_reservation_id;
   FETCH get_reservation_id INTO reservation_id_;
   IF get_reservation_id%FOUND THEN
      null;
   ELSE
      rec_.company_id := company_id_;
      rec_.branch_id := branch_id_;
      rec_.order_id := order_id_;
      Insert___(objid_, objversion_, rec_, attr_);
      reservation_id_ := Client_SYS.Get_Item_Value('RESERVATION_ID', attr_);
   END IF;
   CLOSE get_reservation_id;
   Trn_Reservation_Item_Api.Create_Reservation_Item(company_id_,
                                                     branch_id_,
                                                     reservation_id_,
                                                     inventory_id_,
                                                     product_id_,
                                                     order_id_,
                                                     row_no_,
                                                     quantity_);
END Create_Reservation;


PROCEDURE Invoice_Reservation (
   company_id_ IN VARCHAR2,
   branch_id_ IN VARCHAR2,
   order_id_ IN NUMBER )
IS
   
   CURSOR get_gerservation_id IS
      SELECT Reservation_Id
      FROM TRN_RESERVATION_TAB
      WHERE Company_Id = company_id_
      AND Branch_Id = branch_id_
      AND Order_Id = order_id_;

   rec_              TRN_RESERVATION_TAB%ROWTYPE;
   objid_            VARCHAR2(2000);
   objversion_       VARCHAR2(2000);
   reservation_id_   NUMBER;

BEGIN
  

   OPEN get_gerservation_id;
   FETCH get_gerservation_id INTO reservation_id_;
   IF get_gerservation_id%FOUND THEN
      Get_Id_Version_By_Keys___(objid_, objversion_, company_id_, reservation_id_);
      rec_ := Lock_By_Id___(objid_, objversion_);
      Delete___(objid_, rec_);
   END IF;
   CLOSE get_gerservation_id;
END Invoice_Reservation;

PROCEDURE Remove_Reservation (
   company_id_ IN VARCHAR2,
   reservation_id_ IN NUMBER,
   row_id_ IN VARCHAR2 )
IS
remrec_ TRN_RESERVATION_TAB%ROWTYPE;
   objid_  TRN_RESERVATION.objid%TYPE;
BEGIN
   
   objid_ := row_id_;
   remrec_ := Lock_By_Keys___(company_id_,reservation_id_);
   Check_Delete___(remrec_);
   Delete___(objid_, remrec_);
END Remove_Reservation;