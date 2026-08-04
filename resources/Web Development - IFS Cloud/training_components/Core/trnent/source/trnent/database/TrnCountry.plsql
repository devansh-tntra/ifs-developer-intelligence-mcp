-----------------------------------------------------------------------------
--
--  Logical unit: TrnCountry
--  Component:    TRNENT
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
   super(attr_);
   Client_SYS.Add_To_Attr('COUNTRY_ID', '<DEF>', attr_);
   Client_SYS.Add_To_Attr('COUNTRY_NAME', '<DEF>', attr_);
END Prepare_Insert___;

@Override
PROCEDURE Raise_Record_Exist___ (
   rec_ IN trn_country_tab%ROWTYPE )
IS
BEGIN
   Error_SYS.Record_General(lu_name_, 'RECORDEXISTS: The Trn Country :P1 already exists', rec_.country_id);
   super(rec_);

END Raise_Record_Exist___;


-------------------- LU SPECIFIC PRIVATE METHODS ----------------------------


-------------------- LU SPECIFIC PROTECTED METHODS --------------------------


-------------------- LU SPECIFIC PUBLIC METHODS -----------------------------

