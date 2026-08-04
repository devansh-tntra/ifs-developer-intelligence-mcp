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
    [FndWindowRegistration("TRN_CUSTOMER_INVOICE", "TrnCustomerInvoice", FndWindowRegistrationFlags.HomePage)]
    [FndWindowRegistration("TRN_CUSTOMER_INVOICE_ITEM", "TrnCustomerInvoice")]
    public partial class frmCustomerInvoiceDetail : cFormWindow
    {

        #region Constructors/Destructors

        /// <summary>
        /// Default Constructor.
        /// </summary>
        public frmCustomerInvoiceDetail()
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
        public new static frmCustomerInvoiceDetail FromHandle(SalWindowHandle handle)
        {
            return ((frmCustomerInvoiceDetail)SalWindow.FromHandle(handle, typeof(frmCustomerInvoiceDetail)));
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
                Sal.SetWindowText(i_hWndFrame, Ifs.Fnd.ApplicationForms.Int.TranslateConstantWithParams(Properties.Resources.TEXT_CustomerInvoiceDetails, sItems));
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
                sItems[1] = ccInvoiceId.i_sMyValue;
                Sal.SetWindowText(i_hWndFrame, Ifs.Fnd.ApplicationForms.Int.TranslateConstantWithParams(Properties.Resources.TEXT_CustomerInvoiceDetailsExt, sItems));
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
        private void ccInvoiceId_WindowActions(object sender, WindowActionsEventArgs e)
        {
            #region Actions
            switch (e.ActionType)
            {
                case Ifs.Fnd.ApplicationForms.Const.PM_DataItemPopulate:
                    this.ccInvoiceId_OnPM_DataItemPopulate(sender, e);
                    break;
            }
            #endregion
        }

        /// <summary>
        /// PM_DataItemPopulate event handler.
        /// </summary>
        /// <param name="message"></param>
        private void ccInvoiceId_OnPM_DataItemPopulate(object sender, WindowActionsEventArgs e)
        {
            #region Actions
            e.Handled = true;
            this.SetWindowTitleExt();
            e.Return = Sal.SendClassMessage(Ifs.Fnd.ApplicationForms.Const.PM_DataItemPopulate, Sys.lParam, Sys.wParam);
            return;
            #endregion
        }

        /// <summary>
        /// Window Actions
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">An <see ref="PPJ.Runtime.WindowActionsEventArgs"/> that contains the event data.</param>
        private void dfnOrderId_WindowActions(object sender, WindowActionsEventArgs e)
        {
            #region Actions
            switch (e.ActionType)
            {
                case Ifs.Fnd.ApplicationForms.Const.PM_DataItemLovUserWhere:
                    this.dfnOrderId_OnPM_DataItemLovUserWhere(sender, e);
                    break;
            }
            #endregion
        }

        /// <summary>
        /// PM_DataItemLovUserWhere event handler.
        /// </summary>
        /// <param name="message"></param>
        private void dfnOrderId_OnPM_DataItemLovUserWhere(object sender, WindowActionsEventArgs e)
        {
            #region Actions
            e.Handled = true;
            if (!(Sal.IsNull(this.dfnCustomerId)))
            {
                e.Return = ((SalString)"CUSTOMER_ID = :i_hWndFrame.frmCustomerInvoiceDetail.dfnCustomerId").ToHandle();
                return;
            }
            #endregion
        }

        /// <summary>
        /// Window Actions
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">An <see ref="PPJ.Runtime.WindowActionsEventArgs"/> that contains the event data.</param>
        private void dfnCustomerId_WindowActions(object sender, WindowActionsEventArgs e)
        {
            #region Actions
            switch (e.ActionType)
            {
                case Ifs.Fnd.ApplicationForms.Const.PM_DataItemLovUserWhere:
                    this.dfnCustomerId_OnPM_DataItemLovUserWhere(sender, e);
                    break;
            }
            #endregion
        }

        /// <summary>
        /// PM_DataItemLovUserWhere event handler.
        /// </summary>
        /// <param name="message"></param>
        private void dfnCustomerId_OnPM_DataItemLovUserWhere(object sender, WindowActionsEventArgs e)
        {
            #region Actions
            e.Handled = true;
            if (!(Sal.IsNull(this.dfnOrderId)))
            {
                e.Return = ((SalString)"CUSTOMER_ID IN (SELECT CUSTOMER_ID \r\n" +
                "                                 FROM &AO.Trn_Customer_Order \r\n" +
                "                                 WHERE COMPANY_ID = :i_hWndFrame.frmCustomerInvoiceDetail.dfsCompanyId \r\n" +
                "                                  AND BRANCH_ID = :i_hWndFrame.frmCustomerInvoiceDetail.dfsBranchId\r\n" +
                "                                  AND ORDER_ID = :i_hWndFrame.frmCustomerInvoiceDetail.dfnCustomerId)").ToHandle();
                return;
            }
            #endregion
        }
        #endregion

        #region Late Bind Methods

        /// <summary>
        /// Virtual wrapper replacement for late-bound (..) calls.
        /// </summary>
        public override SalBoolean vrtFrameStartupUser()
        {
            return this.FrameStartupUser();
        }
        #endregion

        #region ChildTable-tblItams


        #region Methods

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public SalNumber tblItems_UpdateTotals()
        {
            #region Actions
            using (new SalContext(tblItems))
            {
               this.dfnInvoiceAmount.Number = this.dfnInvoiceAmount.Number - tblItems_colnAmount.Number;
               tblItems_colnAmount.Number = tblItems_colnPrice.Number * tblItems_colnQuantity.Number;
               this.dfnInvoiceAmount.Number = this.dfnInvoiceAmount.Number + tblItems_colnAmount.Number;
               tblItems_colnAmount.EditDataItemSetEdited();
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
            this.tblItems_UpdateTotals();
            e.Return = Sys.VALIDATE_Ok;
            return;
            #endregion
        }

        /// <summary>
        /// Window Actions
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">An <see ref="PPJ.Runtime.WindowActionsEventArgs"/> that contains the event data.</param>
        private void colnQuantity_WindowActions(object sender, WindowActionsEventArgs e)
        {
            #region Actions
            switch (e.ActionType)
            {
                case Ifs.Fnd.ApplicationForms.Const.PM_DataItemValidate:
                    this.colnQuantity_OnPM_DataItemValidate(sender, e);
                    break;
            }
            #endregion
        }

        /// <summary>
        /// PM_DataItemValidate event handler.
        /// </summary>
        /// <param name="message"></param>
        private void colnQuantity_OnPM_DataItemValidate(object sender, WindowActionsEventArgs e)
        {
            #region Actions
            e.Handled = true;
            this.tblItems_UpdateTotals();
            e.Return = Sys.VALIDATE_Ok;
            return;
            #endregion
        }
        #endregion

        #endregion

        

        #region Event Handlers

        private void menuItem_Pay_Inquire(object sender, Ifs.Fnd.Windows.Forms.FndCommandInquireEventArgs e)
        {
            ((FndCommand)sender).Enabled = ((bool)Sal.SendMsg(i_hWndFrame, Ifs.Fnd.ApplicationForms.Const.PM_DataRecordStateEvent, Ifs.Fnd.ApplicationForms.Const.METHOD_Inquire, ((SalString)"Pay").ToHandle())) && (dfnInvoiceAmount.Number == dfnUnpaid.Number);
        }

        private void menuItem_Pay_Execute(object sender, Ifs.Fnd.Windows.Forms.FndCommandExecuteEventArgs e)
        {
            Ifs.Fnd.ApplicationForms.Int.PostMessage(i_hWndFrame, Ifs.Fnd.ApplicationForms.Const.PM_DataRecordStateEvent, Ifs.Fnd.ApplicationForms.Const.METHOD_Execute, "Pay");
        }

        #endregion


    }
}
