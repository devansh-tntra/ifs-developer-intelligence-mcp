-----------------------------------------------------------------------------
--
--  Logical unit: TrnWorkOrder
--  Component:    TRNMWO
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
   Client_SYS.Add_to_Attr('DESCRIPTION', 'Generated from Plsql', attr_);
END Prepare_Insert___;

FUNCTION Get_Next_Order_Id___ RETURN NUMBER
IS
   CURSOR get_wo_id IS
      SELECT Trn_Work_Order_Id_SEQ.NEXTVAL
      FROM DUAL;
   temp_ NUMBER;
BEGIN
   OPEN get_wo_id;
   FETCH get_wo_id INTO temp_;
   CLOSE get_wo_id;
   RETURN temp_;
END Get_Next_Order_Id___;


@Override
PROCEDURE Insert___ (
   objid_      OUT    VARCHAR2,
   objversion_ OUT    VARCHAR2,
   newrec_     IN OUT trn_work_order_tab%ROWTYPE,
   attr_       IN OUT VARCHAR2 )
IS
BEGIN
   newrec_.work_order_no := Get_Next_Order_Id___();
   super(objid_, objversion_, newrec_, attr_);
   Client_SYS.Set_Item_Value('WORK_ORDER_NO', newrec_.work_order_no, attr_);
END Insert___;

@Override
PROCEDURE Check_Common___ (
   oldrec_ IN     trn_work_order_tab%ROWTYPE,
   newrec_ IN OUT trn_work_order_tab%ROWTYPE,
   indrec_ IN OUT Indicator_Rec,
   attr_   IN OUT VARCHAR2 )
IS
BEGIN

   super(oldrec_, newrec_, indrec_, attr_);
   IF(newrec_.creation_date > sysdate ) THEN
      Error_SYS.Record_General(lu_name_, 'CREATIONDATEERR: Creation Date of the Work Order cannot be later than the current date');
   END IF;
END Check_Common___;


-------------------- LU SPECIFIC PRIVATE METHODS ----------------------------


-------------------- LU SPECIFIC PROTECTED METHODS --------------------------


-------------------- LU SPECIFIC PUBLIC METHODS -----------------------------

FUNCTION Is_Aurena_Links_Enabled RETURN VARCHAR2
IS
   active_app_ Mobile_Application_Version_API.PUBLIC_REC := Mobile_Application_Version_API.Get_Active_App_('WorkOrderManager');
BEGIN
   RETURN Mobile_Application_Param_API.Get_Value(active_app_.app_name, active_app_.app_version, 'ENABLE_AURENA_LINKS');
END Is_Aurena_Links_Enabled;