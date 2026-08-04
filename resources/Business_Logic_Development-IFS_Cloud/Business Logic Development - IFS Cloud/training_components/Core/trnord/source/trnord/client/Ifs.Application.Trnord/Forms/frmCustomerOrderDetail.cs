#region Copyright (c) IFS Research & Development
// ======================================================================================================
//
//                 IFS Research & Development
//
//  This program is protected by copyright law and by international
//  conventions. All licensing, renting, lending or copying (including
//  for private use), and all other use of the program, which is not
//  explicitly permitted by IFS, is a violation of the rights
//  of IFS. Such violations will be reported to the
//  appropriate authorities.
//
//  VIOLATIONS OF ANY COPYRIGHT IS PUNISHABLE BY LAW AND CAN LEAD
//  TO UP TO TWO YEARS OF IMPRISONMENT AND LIABILITY TO PAY DAMAGES.
// ======================================================================================================
#endregion
#region History
#endregion

using System;
using System.Text;
using System.Drawing;
using System.Diagnostics;
using System.Collections;
using System.Windows.Forms;
using System.ComponentModel;
using Ifs.Fnd.ApplicationForms;
using PPJ.Runtime;
using PPJ.Runtime.Sql;
using PPJ.Runtime.Vis;
using PPJ.Runtime.Windows;
using PPJ.Runtime.Windows.QO;
using Ifs.Fnd.Windows.Forms;

namespace Ifs.Application.Trnord
{

    /// <summary>
    /// </summary>
    [FndWindowRegistration("TRN_CUSTOMER_ORDER", "TrnCustomerOrder", FndWindowRegistrationFlags.HomePage)]
    [FndWindowRegistration("TRN_CUSTOMER_ORDER_ITEM", "TrnCustomerOrderItem")]
    public partial class frmCustomerOrderDetail : cFormWindow
    {
        #region Window Variables
        public SalNumber nInventoryId = 0;
        public SalString sQuery = "";
        public SalNumber nResult = 0;
        #endregion

                
        #region Constructors/Destructors

        /// <summary>
        /// Default Constructor.
        /// </summary>
        public frmCustomerOrderDetail()
        {
            // This call is required by the Windows Form Designer.
            InitializeComponent();
        }
        #endregion

        #region System Methods/Properties

        /// <summary>
        /// Returns the object instance associated with the window handle.
        /// </summary>
        /// <param name="handle"></param>
        /// <returns></returns>
        public new static frmCustomerOrderDetail FromHandle(SalWindowHandle handle)
        {
            return ((frmCustomerOrderDetail)SalWindow.FromHandle(handle, typeof(frmCustomerOrderDetail)));
        }
        #endregion

        #region Methods

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public new SalBoolean FrameStartupUser()
        {
            #region Actions
            using (new SalContext(this))
            {
                SetWindowTitle();
                return ((cFormWindow)this).FrameStartupUser();
            }
            #endregion
        }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public virtual SalNumber SetWindowTitle()
        {
            #region Local Variables
            SalArray<SalString> sItems = new SalArray<SalString>();
            #endregion

            #region Actions
            using (new SalContext(this))
            {
                UserGlobalValueGet("COMPANY_ID", ref sItems.GetArray(0)[0]);
                Sal.SetWindowText(i_hWndFrame, Ifs.Fnd.ApplicationForms.Int.TranslateConstantWithParams(Properties.Resources.TEXT_CustomerOrderDetails, sItems));
            }

            return 0;
            #endregion
        }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public virtual SalNumber SetWindowTitleExt()
        {
            #region Local Variables
            SalArray<SalString> sItems = new SalArray<SalString>();
            #endregion

            #region Actions
            using (new SalContext(this))
            {
                UserGlobalValueGet("COMPANY_ID", ref sItems.GetArray(0)[0]);
                sItems[1] = ccOrderId.i_sMyValue;
                Sal.SetWindowText(i_hWndFrame, Ifs.Fnd.ApplicationForms.Int.TranslateConstantWithParams(Properties.Resources.TEXT_CustomerOrderDetailsExt, sItems));
            }

            return 0;
            #endregion
        }

        ///// <summary>
        ///// </summary>
        ///// <param name="nWhat"></param>
        ///// <param name="sMethod"></param>
        ///// <returns></returns>
        public new SalNumber UserMethod(SalNumber nWhat, SalString sMethod)
        {
            #region Actions
            using (new SalContext(this))
            {
                if (sMethod == "invoice")
                {
                    return UM_Invoice(nWhat);
                }
                else if (sMethod == "viewreservations")
                {
                    return UM_ViewReservations(nWhat);
                }
                return 0;
            }
            #endregion
        }

        /// <summary>
        /// </summary>
        /// <param name="nWhat"></param>
        /// <returns></returns>
        public virtual SalNumber UM_Invoice(SalNumber nWhat)
        {
            #region Actions
            using (new SalContext(this))
            {
                switch (nWhat)
                {
                    case Ifs.Fnd.ApplicationForms.Const.METHOD_Inquire:
                        if (Sal.SendMsg(i_hWndFrame, Ifs.Fnd.ApplicationForms.Const.PM_DataSourceCreateWindow, Ifs.Fnd.ApplicationForms.Const.METHOD_Inquire, ((SalString)Pal.GetActiveInstanceName("frmCustomerInvoiceDetail")).ToHandle()))
                        {
                            return Sal.SendMsg(i_hWndFrame, Ifs.Fnd.ApplicationForms.Const.PM_DataRecordStateEvent, Ifs.Fnd.ApplicationForms.Const.METHOD_Inquire, ((SalString)"Invoice").ToHandle());
                        }
                        break;

                    case Ifs.Fnd.ApplicationForms.Const.METHOD_Execute:
                        this.PostMessage(Ifs.Fnd.ApplicationForms.Const.PM_DataRecordStateEvent, Ifs.Fnd.ApplicationForms.Const.METHOD_Execute, ((SalString)"Invoice").ToHandle());
                        this.PostMessage( Ifs.Fnd.ApplicationForms.Const.PM_DataSourceCreateWindow, Ifs.Fnd.ApplicationForms.Const.METHOD_Execute, ((SalString)Pal.GetActiveInstanceName("frmCustomerInvoiceDetail")).ToHandle());
                        break;
                }
            }

            return 0;
            #endregion
        }

        /// <summary>
        /// </summary>
        /// <param name="nWhat"></param>
        /// <returns></returns>
        public virtual SalNumber UM_ViewReservations(SalNumber nWhat)
        {
            #region Actions
            using (new SalContext(this))
            {
                switch (nWhat)
                {
                    case Ifs.Fnd.ApplicationForms.Const.METHOD_Inquire:
                        if (Sal.SendMsg(i_hWndFrame, Ifs.Fnd.ApplicationForms.Const.PM_DataSourceClear, Ifs.Fnd.ApplicationForms.Const.METHOD_Inquire, Sys.lParam))
                        {
                            if (!(Sal.SendMsg(i_hWndFrame, Ifs.Fnd.ApplicationForms.Const.PM_DataSourceIsDirty, Ifs.Fnd.ApplicationForms.Const.METHOD_Inquire, Sys.lParam)))
                            {
                                if (DataRecordStateGet() != "Invoiced")
                                {
                                    return Sal.SendMsg(i_hWndFrame, Ifs.Fnd.ApplicationForms.Const.PM_DataSourceCreateWindow, Ifs.Fnd.ApplicationForms.Const.METHOD_Inquire, ((SalString)Pal.GetActiveInstanceName("frmOrderReservationDetail")).ToHandle());
                                }
                            }
                        }
                        return 0;

                    case Ifs.Fnd.ApplicationForms.Const.METHOD_Execute:
                        Ifs.Fnd.ApplicationForms.Int.PostMessage(i_hWndFrame, Ifs.Fnd.ApplicationForms.Const.PM_DataSourceCreateWindow, Ifs.Fnd.ApplicationForms.Const.METHOD_Execute, Pal.GetActiveInstanceName("frmOrderReservationDetail"));
                        break;
                }
                return 0;
            }
            #endregion
        }

        /// <summary>
        /// Applications and the framework call the DataSourcePrepareKeyTransfer
        /// function to initialize data transfer with all keys of the data source.
        /// COMMENTS:
        /// DataSourcePrepareKeyTransfer is typically called before a window is
        /// created.
        /// </summary>
        /// <param name="sWindowName">
        /// Window name
        /// Intendend receiver window of the data transfer. When overriding DataSourcePrepareKeyTransfer,
        /// applications can use this parameter to initialize data transfer in different ways for
        /// different receiver windows.
        /// </param>
        /// <returns></returns>
        public new SalNumber DataSourcePrepareKeyTransfer(SalString sWindowName)
        {
            #region Local Variables
            SalArray<SalString> sItems = new SalArray<SalString>();
            #endregion

            #region Actions
            using (new SalContext(this))
            {
                ((cFormWindow)this).DataSourcePrepareKeyTransfer(sWindowName);
                if (sWindowName == Pal.GetActiveInstanceName("frmCustomerInvoiceDetail"))
                {
                    sItems[0] = nInventoryId.ToString(0);
                    Ifs.Fnd.ApplicationForms.Var.DataTransfer.ItemAdd("INVOICE_ID", sItems);
                }
            }

            return 0;
            #endregion
        }

        /// <summary>
        /// Applications override the DataRecordToFormUser function to
        /// take care of object attributes not handled by the framework.
        /// COMMENTS:
        /// Overriding the DataRecordToFormUser function is useful when
        /// an application is using instance or window variables (instead
        /// of invisible data items) to hold information. For instance,
        /// DataRecordToFormUser can be used to put default values into these
        /// varibles.
        /// </summary>
        /// <param name="lsServerAttr">
        /// Server attributes
        /// Object attributes sent from the server to the client. Although it is possible
        /// for applications to modify the attributes, doing so is not recommended.
        /// </param>
        /// <param name="bMarkAsEdited">
        /// Server attributes
        /// Object attributes sent from the server to the client. Although it is possible
        /// for applications to modify the attributes, doing so is not recommended.
        /// </param>
        /// <returns></returns>
        public new SalNumber DataRecordToFormUser(ref SalString lsServerAttr, ref SalBoolean bMarkAsEdited)
        {
            #region Actions
            using (new SalContext(this))
            {
                nInventoryId = Ifs.Fnd.ApplicationForms.Int.PalAttrGetNumber("INVOICE_ID", lsServerAttr);
            }

            return 0;
            #endregion
        }
        #endregion

        #region Window Actions

        /// <summary>
        /// Window Actions
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">An <see ref="PPJ.Runtime.WindowActionsEventArgs"/> that contains the event data.</param>
        private void ccOrderId_WindowActions(object sender, WindowActionsEventArgs e)
        {
            #region Actions
            switch (e.ActionType)
            {
                case Ifs.Fnd.ApplicationForms.Const.PM_DataItemPopulate:
                    this.ccOrderId_OnPM_DataItemPopulate(sender, e);
                    break;
            }
            #endregion
        }

        /// <summary>
        /// PM_DataItemPopulate event handler.
        /// </summary>
        /// <param name="message"></param>
        private void ccOrderId_OnPM_DataItemPopulate(object sender, WindowActionsEventArgs e)
        {
            #region Actions
            e.Handled = true;
            this.SetWindowTitleExt();
            e.Return = Sal.SendClassMessage(Ifs.Fnd.ApplicationForms.Const.PM_DataItemPopulate, Sys.lParam, Sys.wParam);
            return;
            #endregion
        }
        #endregion

        #region Late Bind Methods

        /// <summary>
        /// Virtual wrapper replacement for late-bound (..) calls.
        /// </summary>
        public override SalNumber vrtDataRecordToFormUser(ref SalString lsServerAttr, ref SalBoolean bMarkAsEdited)
        {
            return this.DataRecordToFormUser(ref lsServerAttr, ref bMarkAsEdited);
        }

        /// <summary>
        /// Virtual wrapper replacement for late-bound (..) calls.
        /// </summary>
        public override SalNumber vrtDataSourcePrepareKeyTransfer(SalString sWindowName)
        {
            return this.DataSourcePrepareKeyTransfer(sWindowName);
        }

        /// <summary>
        /// Virtual wrapper replacement for late-bound (..) calls.
        /// </summary>
        public override SalBoolean vrtFrameStartupUser()
        {
            return this.FrameStartupUser();
        }

        /// <summary>
        /// Virtual wrapper replacement for late-bound (..) calls.
        /// </summary>
        public override SalNumber vrtUserMethod(SalNumber nWhat, SalString sMethod)
        {
            return this.UserMethod(nWhat, sMethod);
        }
        #endregion

        #region ChildTable-tblItems

        #region Window Variables
        public SalString sInfo = "";
        #endregion

        #region Methods

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public SalNumber tblItems_GetDefaultPrice()
        {
            #region Actions
            using (new SalContext(tblItems))
            {
                using (SignatureHints hints = SignatureHints.NewContext())
                {
                    // SignatureParseError! Trn_Product_API.Get_Price not found in dictionary
                    DbPLSQLBlock(cSessionManager.c_hSql, ":i_hWndFrame.frmCustomerOrderDetail.tblItems.colnPrice := \r\n" +
                        "   &AO.Trn_Product_API.Get_Price( :i_hWndFrame.frmCustomerOrderDetail.tblItems.colsCompanyId , \r\n" +
                        "                                                             :i_hWndFrame.frmCustomerOrderDetail.tblItems.colnProductId)");
                }
                tblItems_CalculateAmount();
            }

            return 0;
            #endregion
        }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public SalNumber tblItems_CalculateAmount()
        {
            #region Actions
            using (new SalContext(tblItems))
            {
                if (Sal.IsNull(this.dfTotalOrderValue))
                {
                    tblItems_colnAmount.Number = tblItems_colnPrice.Number * tblItems_colnQuantity.Number;
                    this.dfTotalOrderValue.Number = tblItems_colnAmount.Number;
                }
                else
                {
                    this.dfTotalOrderValue.Number = this.dfTotalOrderValue.Number - tblItems_colnAmount.Number;
                    tblItems_colnAmount.Number = tblItems_colnPrice.Number * tblItems_colnQuantity.Number;
                    this.dfTotalOrderValue.Number = this.dfTotalOrderValue.Number + tblItems_colnAmount.Number;
                }
            }

            return 0;
            #endregion
        }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public SalBoolean tblItems_CheckAvailability()
        {
            #region Actions
            using (new SalContext(tblItems))
            {
                if (!(Sal.IsNull(this.dfsPreferredInventory)))
                {
                    using (SignatureHints hints = SignatureHints.NewContext())
                    {
                        // SignatureParseError! Trn_Inventory_Product_API.Check_Available not found in dictionary
                        DbPLSQLBlock(cSessionManager.c_hSql, "&AO.Trn_Inventory_Product_API.Check_Available(\r\n" +
                            "   :i_hWndFrame.frmCustomerOrderDetail.tblItems.sInfo,\r\n" +
                            "   :i_hWndFrame.frmCustomerOrderDetail.tblItems.colsCompanyId ,\r\n" +
                            "   :i_hWndFrame.frmCustomerOrderDetail.tblItems.colsBranchId ,\r\n" +
                            "   :i_hWndFrame.frmCustomerOrderDetail.dfsPreferredInventory, \r\n" +
                            "   :i_hWndFrame.frmCustomerOrderDetail.tblItems.colnProductId, \r\n" +
                            "   :i_hWndFrame.frmCustomerOrderDetail.tblItems.colnQuantity)");
                    }
                    return HandleSqlWarnings(sInfo);
                }
                else
                {
                    Ifs.Fnd.ApplicationForms.Int.AlertBox(Properties.Resources.TEXT_ERROR_InventoryNotAvaialbe, Ifs.Fnd.ApplicationForms.Properties.Resources.CAPTION_Warning, Ifs.Fnd.ApplicationForms.Const.WARNING_Ok);
                    return true;
                }
            }
            #endregion
        }
        #endregion

        #region Window Actions

        /// <summary>
        /// Window Actions
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">An <see ref="PPJ.Runtime.WindowActionsEventArgs"/> that contains the event data.</param>
        private void tblItems_colObjstate_WindowActions(object sender, WindowActionsEventArgs e)
        {
            #region Actions
            switch (e.ActionType)
            {
                case Sys.SAM_Create:
                    e.Handled = true;
                    Sal.SendMsg(this, Ifs.Fnd.ApplicationForms.Const.AM_DataSourceAttachObjstate, Sal.WindowHandleToNumber(tblItems___colObjstate), ("i_hWndFrame." + Ifs.Fnd.ApplicationForms.Int.QualifiedItemNameGet(tblItems___colObjstate)).ToHandle());
                    break;
            }
            #endregion
        }

        /// <summary>
        /// Window Actions
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">An <see ref="PPJ.Runtime.WindowActionsEventArgs"/> that contains the event data.</param>
        private void tblItems_colObjevents_WindowActions(object sender, WindowActionsEventArgs e)
        {
            #region Actions
            switch (e.ActionType)
            {
                case Sys.SAM_Create:
                    e.Handled = true;
                    Sal.SendMsg(this, Ifs.Fnd.ApplicationForms.Const.AM_DataSourceAttachObjevents, Sal.WindowHandleToNumber(tblItems___colObjevents), ("i_hWndFrame." + Ifs.Fnd.ApplicationForms.Int.QualifiedItemNameGet(tblItems___colObjevents)).ToHandle());
                    break;
            }
            #endregion
        }

        /// <summary>
        /// Window Actions
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">An <see ref="PPJ.Runtime.WindowActionsEventArgs"/> that contains the event data.</param>
        private void tblItems_colnProductId_WindowActions(object sender, WindowActionsEventArgs e)
        {
            #region Actions
            switch (e.ActionType)
            {
                case Ifs.Fnd.ApplicationForms.Const.PM_DataItemLovDone:
                    e.Handled = true;
                    this.tblItems_GetDefaultPrice();
                    break;

                case Ifs.Fnd.ApplicationForms.Const.PM_DataItemValidate:
                    this.tblItems_colnProductId_OnPM_DataItemValidate(sender, e);
                    break;
            }
            #endregion
        }

        /// <summary>
        /// PM_DataItemValidate event handler.
        /// </summary>
        /// <param name="message"></param>
        private void tblItems_colnProductId_OnPM_DataItemValidate(object sender, WindowActionsEventArgs e)
        {
            #region Actions
            e.Handled = true;
            this.tblItems_GetDefaultPrice();
            e.Return = Sys.VALIDATE_Ok;
            return;
            #endregion
        }

        /// <summary>
        /// Window Actions
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">An <see ref="PPJ.Runtime.WindowActionsEventArgs"/> that contains the event data.</param>
        private void tblItems_colnPrice_WindowActions(object sender, WindowActionsEventArgs e)
        {
            #region Actions
            switch (e.ActionType)
            {
                case Ifs.Fnd.ApplicationForms.Const.PM_DataItemValidate:
                    this.tblItems_colnPrice_OnPM_DataItemValidate(sender, e);
                    break;
            }
            #endregion
        }

        /// <summary>
        /// PM_DataItemValidate event handler.
        /// </summary>
        /// <param name="message"></param>
        private void tblItems_colnPrice_OnPM_DataItemValidate(object sender, WindowActionsEventArgs e)
        {
            #region Actions
            e.Handled = true;
            this.tblItems_CalculateAmount();
            e.Return = Sys.VALIDATE_Ok;
            return;
            #endregion
        }

        /// <summary>
        /// Window Actions
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">An <see ref="PPJ.Runtime.WindowActionsEventArgs"/> that contains the event data.</param>
        private void tblItems_colnQuantity_WindowActions(object sender, WindowActionsEventArgs e)
        {
            #region Actions
            switch (e.ActionType)
            {
                case Ifs.Fnd.ApplicationForms.Const.PM_DataItemValidate:
                    this.tblItems_colnQuantity_OnPM_DataItemValidate(sender, e);
                    break;
            }
            #endregion
        }

        /// <summary>
        /// PM_DataItemValidate event handler.
        /// </summary>
        /// <param name="message"></param>
        private void tblItems_colnQuantity_OnPM_DataItemValidate(object sender, WindowActionsEventArgs e)
        {
            #region Actions
            e.Handled = true;
            if (this.tblItems_CheckAvailability())
            {
                this.tblItems_CalculateAmount();
                e.Return = Sys.VALIDATE_Ok;
                return;
            }
            e.Return = Sys.VALIDATE_Cancel;
            return;
            #endregion
        }
        #endregion


        #endregion

        


        #region FrmMenuEvents

        private void commandViewRes_Execute(object sender, Ifs.Fnd.Windows.Forms.FndCommandExecuteEventArgs e)
        {
            this.PostMessage(Ifs.Fnd.ApplicationForms.Const.PM_UserMethod, Ifs.Fnd.ApplicationForms.Const.METHOD_Execute, ((SalString)"viewreservations").ToHandle());

        }

        private void commandViewRes_Inquire(object sender, Ifs.Fnd.Windows.Forms.FndCommandInquireEventArgs e)
        {
            Ifs.Fnd.Windows.Forms.FndCommand command = (Ifs.Fnd.Windows.Forms.FndCommand)sender;


            if (this.SendMessage(Ifs.Fnd.ApplicationForms.Const.PM_UserMethod, Ifs.Fnd.ApplicationForms.Const.METHOD_Inquire, ((SalString)"viewreservations").ToHandle()))
            {
                command.Enabled = true;
            }
            else
            {
                command.Enabled = false;

            }


        }

        #endregion

        #region Event Handlers

private void menuItem_Reserve_Inquire(object sender, Ifs.Fnd.Windows.Forms.FndCommandInquireEventArgs e)
{
                    ((FndCommand)sender).Enabled = Sal.SendMsg(i_hWndSelf, Ifs.Fnd.ApplicationForms.Const.PM_DataRecordStateEvent, Ifs.Fnd.ApplicationForms.Const.METHOD_Inquire, ((SalString)"Reserve").ToHandle());
}

private void menuItem_Reserve_Execute(object sender, Ifs.Fnd.Windows.Forms.FndCommandExecuteEventArgs e)
{
                    Ifs.Fnd.ApplicationForms.Int.PostMessage(i_hWndSelf, Ifs.Fnd.ApplicationForms.Const.PM_DataRecordStateEvent, Ifs.Fnd.ApplicationForms.Const.METHOD_Execute, "Reserve");
}

private void menuItem_UnReserve_Inquire(object sender, Ifs.Fnd.Windows.Forms.FndCommandInquireEventArgs e)
{
                    ((FndCommand)sender).Enabled = Sal.SendMsg(i_hWndSelf, Ifs.Fnd.ApplicationForms.Const.PM_DataRecordStateEvent, Ifs.Fnd.ApplicationForms.Const.METHOD_Inquire, ((SalString)"Unreserve").ToHandle());
}

private void menuItem_UnReserve_Execute(object sender, Ifs.Fnd.Windows.Forms.FndCommandExecuteEventArgs e)
{
                    Ifs.Fnd.ApplicationForms.Int.PostMessage(i_hWndSelf, Ifs.Fnd.ApplicationForms.Const.PM_DataRecordStateEvent, Ifs.Fnd.ApplicationForms.Const.METHOD_Execute, "Unreserve");
}

#endregion








    }
}
