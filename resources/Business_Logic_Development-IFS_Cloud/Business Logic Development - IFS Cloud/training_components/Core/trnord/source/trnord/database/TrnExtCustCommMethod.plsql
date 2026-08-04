-----------------------------------------------------------------------------
--
--  Logical unit: TrnExtCustCommMethod
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
   Client_SYS.Add_To_Attr('CUSTOMER_COMM_ID', Get_Next_Customer_Comm_Id___(), attr_);
   Client_SYS.Add_To_Attr('DEFAULT_ADDRESS', Fnd_Boolean_API.Decode('FALSE'), attr_);
END Prepare_Insert___;

FUNCTION Get_Next_Customer_Comm_Id___ RETURN NUMBER
IS
   CURSOR get_comm_id IS
      SELECT Trn_Customer_Comm_Id_SEQ.NEXTVAL
      FROM DUAL;
   temp_ NUMBER;
BEGIN
   OPEN get_comm_id;
   FETCH get_comm_id INTO temp_;
   CLOSE get_comm_id;
   RETURN temp_;
END Get_Next_Customer_Comm_Id___;


-------------------- LU SPECIFIC PRIVATE METHODS ----------------------------


-------------------- LU SPECIFIC PROTECTED METHODS --------------------------


-------------------- LU SPECIFIC PUBLIC METHODS -----------------------------

