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
   --Add pre-processing code here
   
   super(attr_);
   --Add post-processing code here
   Client_SYS.Add_To_Attr('COUNTRY_ID','<DEF>',attr_);
   Client_SYS.Add_To_Attr('COUNTRY','<DEF>',attr_);
END Prepare_Insert___;

@Override
PROCEDURE Raise_Record_Exist___ (
   rec_ IN trn_country_tab%ROWTYPE )
IS
BEGIN
   --Add pre-processing code here
   Error_SYS.Record_General(lu_name_,'CTRYERR: The Trn Country [:P1] already exists', rec_.country_id);
   super(rec_);
   --Add post-processing code here
END Raise_Record_Exist___;






-------------------- LU SPECIFIC PRIVATE METHODS ----------------------------


-------------------- LU SPECIFIC PROTECTED METHODS --------------------------


-------------------- LU SPECIFIC PUBLIC METHODS -----------------------------


