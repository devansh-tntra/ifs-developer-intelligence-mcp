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

namespace Ifs.Application.Trnord
{
	
	public partial class frmCustomerInvoiceDetail
	{
		
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.IContainer components = null;
		
		#region Window Controls
		protected SalBackgroundText labeldfsCompanyId;
		public cDataField dfsCompanyId;
		protected SalBackgroundText labeldfsBranchId;
		public cDataField dfsBranchId;
		protected SalBackgroundText labelccInvoiceId;
		public cRecListDataField ccInvoiceId;
		protected SalBackgroundText labeldfdInvoiceDate;
		public cDataField dfdInvoiceDate;
		protected SalBackgroundText labeldfdDueDate;
		public cDataField dfdDueDate;
		protected SalBackgroundText labeldfnInvoiceAmount;
		public cDataField dfnInvoiceAmount;
		protected SalBackgroundText labeldfnOrderId;
		public cDataField dfnOrderId;
		protected SalBackgroundText labeldfTrnCustomerOrderDeliveryType;
		public cDataField dfTrnCustomerOrderDeliveryType;
		protected SalBackgroundText labeldfnUnpaid;
		public cDataField dfnUnpaid;
		protected SalBackgroundText labelcmbPaymentTerms;
		public cComboBox cmbPaymentTerms;
		protected SalBackgroundText labeldfnCustomerId;
		public cDataField dfnCustomerId;
		protected SalBackgroundText labeldfTrnCustomerName;
		public cDataField dfTrnCustomerName;
		protected SalBackgroundText labeldfTrnCustomerCreditLimit;
		public cDataField dfTrnCustomerCreditLimit;
		protected SalBackgroundText labelmlComments;
        public cMultilineField mlComments;
		#endregion
		
		#region Windows Form Designer generated code
		
		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(frmCustomerInvoiceDetail));
            this.menuFrmMethods_menuPay___ = new Ifs.Fnd.Windows.Forms.FndCommand(this.components);
            this.labeldfsCompanyId = new PPJ.Runtime.Windows.SalBackgroundText();
            this.dfsCompanyId = new Ifs.Fnd.ApplicationForms.cDataField();
            this.labeldfsBranchId = new PPJ.Runtime.Windows.SalBackgroundText();
            this.dfsBranchId = new Ifs.Fnd.ApplicationForms.cDataField();
            this.labelccInvoiceId = new PPJ.Runtime.Windows.SalBackgroundText();
            this.ccInvoiceId = new Ifs.Fnd.ApplicationForms.cRecListDataField();
            this.labeldfdInvoiceDate = new PPJ.Runtime.Windows.SalBackgroundText();
            this.dfdInvoiceDate = new Ifs.Fnd.ApplicationForms.cDataField();
            this.labeldfdDueDate = new PPJ.Runtime.Windows.SalBackgroundText();
            this.dfdDueDate = new Ifs.Fnd.ApplicationForms.cDataField();
            this.labeldfnInvoiceAmount = new PPJ.Runtime.Windows.SalBackgroundText();
            this.dfnInvoiceAmount = new Ifs.Fnd.ApplicationForms.cDataField();
            this.labeldfnOrderId = new PPJ.Runtime.Windows.SalBackgroundText();
            this.dfnOrderId = new Ifs.Fnd.ApplicationForms.cDataField();
            this.labeldfTrnCustomerOrderDeliveryType = new PPJ.Runtime.Windows.SalBackgroundText();
            this.dfTrnCustomerOrderDeliveryType = new Ifs.Fnd.ApplicationForms.cDataField();
            this.labeldfnUnpaid = new PPJ.Runtime.Windows.SalBackgroundText();
            this.dfnUnpaid = new Ifs.Fnd.ApplicationForms.cDataField();
            this.labelcmbPaymentTerms = new PPJ.Runtime.Windows.SalBackgroundText();
            this.cmbPaymentTerms = new Ifs.Fnd.ApplicationForms.cComboBox();
            this.labeldfnCustomerId = new PPJ.Runtime.Windows.SalBackgroundText();
            this.dfnCustomerId = new Ifs.Fnd.ApplicationForms.cDataField();
            this.labeldfTrnCustomerName = new PPJ.Runtime.Windows.SalBackgroundText();
            this.dfTrnCustomerName = new Ifs.Fnd.ApplicationForms.cDataField();
            this.labeldfTrnCustomerCreditLimit = new PPJ.Runtime.Windows.SalBackgroundText();
            this.dfTrnCustomerCreditLimit = new Ifs.Fnd.ApplicationForms.cDataField();
            this.labelmlComments = new PPJ.Runtime.Windows.SalBackgroundText();
            this.mlComments = new Ifs.Fnd.ApplicationForms.cMultilineField();
            this.menuFrmMethods = new Ifs.Fnd.Windows.Forms.FndContextMenuStrip(this.components);
            this.menuItem_Pay = new Ifs.Fnd.Windows.Forms.FndToolStripMenuItem(this.components);
            this.tblItems = new Ifs.Fnd.ApplicationForms.cChildTable();
            this.tblItems_colsCompanyId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colsBranchId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colnInvoiceId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colnItemNo = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colnProductId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colTrnProductBrandId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colTrnProductCategoryId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colTrnProductModelId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colDescription = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colnPrice = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colnQuantity = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colTrnProductUnit = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colnAmount = new Ifs.Fnd.ApplicationForms.cColumn();
            this.menuFrmMethods.SuspendLayout();
            this.tblItems.SuspendLayout();
            this.SuspendLayout();
            // 
            // commandManager
            // 
            this.commandManager.Commands.Add(this.menuFrmMethods_menuPay___);
            this.commandManager.ContextMenus.Add(this.menuFrmMethods);
            // 
            // menuFrmMethods_menuPay___
            // 
            resources.ApplyResources(this.menuFrmMethods_menuPay___, "menuFrmMethods_menuPay___");
            this.menuFrmMethods_menuPay___.Name = "menuFrmMethods_menuPay___";
            this.menuFrmMethods_menuPay___.Execute += new Ifs.Fnd.Windows.Forms.FndCommandExecuteHandler(this.menuItem_Pay_Execute);
            this.menuFrmMethods_menuPay___.Inquire += new Ifs.Fnd.Windows.Forms.FndCommandInquireHandler(this.menuItem_Pay_Inquire);
            // 
            // labeldfsCompanyId
            // 
            resources.ApplyResources(this.labeldfsCompanyId, "labeldfsCompanyId");
            this.labeldfsCompanyId.Name = "labeldfsCompanyId";
            // 
            // dfsCompanyId
            // 
            resources.ApplyResources(this.dfsCompanyId, "dfsCompanyId");
            this.dfsCompanyId.Name = "dfsCompanyId";
            this.dfsCompanyId.NamedProperties.Put("EnumerateMethod", "");
            this.dfsCompanyId.NamedProperties.Put("FieldFlags", "67");
            this.dfsCompanyId.NamedProperties.Put("LovReference", "");
            this.dfsCompanyId.NamedProperties.Put("SqlColumn", "COMPANY_ID");
            // 
            // labeldfsBranchId
            // 
            resources.ApplyResources(this.labeldfsBranchId, "labeldfsBranchId");
            this.labeldfsBranchId.Name = "labeldfsBranchId";
            // 
            // dfsBranchId
            // 
            resources.ApplyResources(this.dfsBranchId, "dfsBranchId");
            this.dfsBranchId.Name = "dfsBranchId";
            this.dfsBranchId.NamedProperties.Put("EnumerateMethod", "");
            this.dfsBranchId.NamedProperties.Put("FieldFlags", "67");
            this.dfsBranchId.NamedProperties.Put("LovReference", "TRN_BRANCH(COMPANY_ID)");
            this.dfsBranchId.NamedProperties.Put("ResizeableChildObject", "");
            this.dfsBranchId.NamedProperties.Put("SqlColumn", "BRANCH_ID");
            this.dfsBranchId.NamedProperties.Put("ValidateMethod", "");
            // 
            // labelccInvoiceId
            // 
            resources.ApplyResources(this.labelccInvoiceId, "labelccInvoiceId");
            this.labelccInvoiceId.Name = "labelccInvoiceId";
            // 
            // ccInvoiceId
            // 
            resources.ApplyResources(this.ccInvoiceId, "ccInvoiceId");
            this.ccInvoiceId.Name = "ccInvoiceId";
            this.ccInvoiceId.NamedProperties.Put("DataType", "3");
            this.ccInvoiceId.NamedProperties.Put("EnumerateMethod", "");
            this.ccInvoiceId.NamedProperties.Put("FieldFlags", "163");
            this.ccInvoiceId.NamedProperties.Put("LovReference", "");
            this.ccInvoiceId.NamedProperties.Put("ResizeableChildObject", "");
            this.ccInvoiceId.NamedProperties.Put("SqlColumn", "INVOICE_ID");
            this.ccInvoiceId.NamedProperties.Put("ValidateMethod", "");
            this.ccInvoiceId.NamedProperties.Put("XDataLength", "");
            this.ccInvoiceId.WindowActions += new PPJ.Runtime.Windows.WindowActionsEventHandler(this.ccInvoiceId_WindowActions);
            // 
            // labeldfdInvoiceDate
            // 
            resources.ApplyResources(this.labeldfdInvoiceDate, "labeldfdInvoiceDate");
            this.labeldfdInvoiceDate.Name = "labeldfdInvoiceDate";
            // 
            // dfdInvoiceDate
            // 
            this.dfdInvoiceDate.DataType = PPJ.Runtime.Windows.DataType.DateTime;
            this.dfdInvoiceDate.Format = "d";
            resources.ApplyResources(this.dfdInvoiceDate, "dfdInvoiceDate");
            this.dfdInvoiceDate.Name = "dfdInvoiceDate";
            this.dfdInvoiceDate.NamedProperties.Put("EnumerateMethod", "");
            this.dfdInvoiceDate.NamedProperties.Put("FieldFlags", "295");
            this.dfdInvoiceDate.NamedProperties.Put("LovReference", "");
            this.dfdInvoiceDate.NamedProperties.Put("SqlColumn", "INVOICE_DATE");
            // 
            // labeldfdDueDate
            // 
            resources.ApplyResources(this.labeldfdDueDate, "labeldfdDueDate");
            this.labeldfdDueDate.Name = "labeldfdDueDate";
            // 
            // dfdDueDate
            // 
            this.dfdDueDate.DataType = PPJ.Runtime.Windows.DataType.DateTime;
            this.dfdDueDate.Format = "d";
            resources.ApplyResources(this.dfdDueDate, "dfdDueDate");
            this.dfdDueDate.Name = "dfdDueDate";
            this.dfdDueDate.NamedProperties.Put("EnumerateMethod", "");
            this.dfdDueDate.NamedProperties.Put("FieldFlags", "294");
            this.dfdDueDate.NamedProperties.Put("LovReference", "");
            this.dfdDueDate.NamedProperties.Put("SqlColumn", "DUE_DATE");
            // 
            // labeldfnInvoiceAmount
            // 
            resources.ApplyResources(this.labeldfnInvoiceAmount, "labeldfnInvoiceAmount");
            this.labeldfnInvoiceAmount.Name = "labeldfnInvoiceAmount";
            // 
            // dfnInvoiceAmount
            // 
            this.dfnInvoiceAmount.DataType = PPJ.Runtime.Windows.DataType.Number;
            resources.ApplyResources(this.dfnInvoiceAmount, "dfnInvoiceAmount");
            this.dfnInvoiceAmount.Name = "dfnInvoiceAmount";
            this.dfnInvoiceAmount.NamedProperties.Put("EnumerateMethod", "");
            this.dfnInvoiceAmount.NamedProperties.Put("FieldFlags", "295");
            this.dfnInvoiceAmount.NamedProperties.Put("LovReference", "");
            this.dfnInvoiceAmount.NamedProperties.Put("SqlColumn", "INVOICE_AMOUNT");
            // 
            // labeldfnOrderId
            // 
            resources.ApplyResources(this.labeldfnOrderId, "labeldfnOrderId");
            this.labeldfnOrderId.Name = "labeldfnOrderId";
            // 
            // dfnOrderId
            // 
            this.dfnOrderId.DataType = PPJ.Runtime.Windows.DataType.Number;
            resources.ApplyResources(this.dfnOrderId, "dfnOrderId");
            this.dfnOrderId.Name = "dfnOrderId";
            this.dfnOrderId.NamedProperties.Put("EnumerateMethod", "");
            this.dfnOrderId.NamedProperties.Put("FieldFlags", "295");
            this.dfnOrderId.NamedProperties.Put("LovReference", "TRN_CUSTOMER_ORDER(COMPANY_ID,BRANCH_ID)");
            this.dfnOrderId.NamedProperties.Put("ResizeableChildObject", "");
            this.dfnOrderId.NamedProperties.Put("SqlColumn", "ORDER_ID");
            this.dfnOrderId.NamedProperties.Put("ValidateMethod", "");
            this.dfnOrderId.WindowActions += new PPJ.Runtime.Windows.WindowActionsEventHandler(this.dfnOrderId_WindowActions);
            // 
            // labeldfTrnCustomerOrderDeliveryType
            // 
            resources.ApplyResources(this.labeldfTrnCustomerOrderDeliveryType, "labeldfTrnCustomerOrderDeliveryType");
            this.labeldfTrnCustomerOrderDeliveryType.Name = "labeldfTrnCustomerOrderDeliveryType";
            // 
            // dfTrnCustomerOrderDeliveryType
            // 
            resources.ApplyResources(this.dfTrnCustomerOrderDeliveryType, "dfTrnCustomerOrderDeliveryType");
            this.dfTrnCustomerOrderDeliveryType.Name = "dfTrnCustomerOrderDeliveryType";
            this.dfTrnCustomerOrderDeliveryType.NamedProperties.Put("EnumerateMethod", "");
            this.dfTrnCustomerOrderDeliveryType.NamedProperties.Put("FieldFlags", "304");
            this.dfTrnCustomerOrderDeliveryType.NamedProperties.Put("LovReference", "");
            this.dfTrnCustomerOrderDeliveryType.NamedProperties.Put("ParentName", "dfnOrderId");
            this.dfTrnCustomerOrderDeliveryType.NamedProperties.Put("ResizeableChildObject", "");
            this.dfTrnCustomerOrderDeliveryType.NamedProperties.Put("SqlColumn", "TRN_CUSTOMER_ORDER_API.Get_Delivery_Type(company_id,branch_id,ORDER_ID)");
            this.dfTrnCustomerOrderDeliveryType.NamedProperties.Put("ValidateMethod", "");
            // 
            // labeldfnUnpaid
            // 
            resources.ApplyResources(this.labeldfnUnpaid, "labeldfnUnpaid");
            this.labeldfnUnpaid.Name = "labeldfnUnpaid";
            // 
            // dfnUnpaid
            // 
            this.dfnUnpaid.DataType = PPJ.Runtime.Windows.DataType.Number;
            resources.ApplyResources(this.dfnUnpaid, "dfnUnpaid");
            this.dfnUnpaid.Name = "dfnUnpaid";
            this.dfnUnpaid.NamedProperties.Put("EnumerateMethod", "");
            this.dfnUnpaid.NamedProperties.Put("FieldFlags", "295");
            this.dfnUnpaid.NamedProperties.Put("LovReference", "");
            this.dfnUnpaid.NamedProperties.Put("SqlColumn", "UNPAID");
            // 
            // labelcmbPaymentTerms
            // 
            resources.ApplyResources(this.labelcmbPaymentTerms, "labelcmbPaymentTerms");
            this.labelcmbPaymentTerms.Name = "labelcmbPaymentTerms";
            // 
            // cmbPaymentTerms
            // 
            resources.ApplyResources(this.cmbPaymentTerms, "cmbPaymentTerms");
            this.cmbPaymentTerms.Name = "cmbPaymentTerms";
            this.cmbPaymentTerms.NamedProperties.Put("DataType", "7");
            this.cmbPaymentTerms.NamedProperties.Put("EnumerateMethod", "TRN_INVOICE_PAY_TERMS_API.Enumerate");
            this.cmbPaymentTerms.NamedProperties.Put("FieldFlags", "294");
            this.cmbPaymentTerms.NamedProperties.Put("LovReference", "");
            this.cmbPaymentTerms.NamedProperties.Put("ResizeableChildObject", "");
            this.cmbPaymentTerms.NamedProperties.Put("SqlColumn", "PAYMENT_TERMS");
            this.cmbPaymentTerms.NamedProperties.Put("ValidateMethod", "");
            // 
            // labeldfnCustomerId
            // 
            resources.ApplyResources(this.labeldfnCustomerId, "labeldfnCustomerId");
            this.labeldfnCustomerId.Name = "labeldfnCustomerId";
            // 
            // dfnCustomerId
            // 
            this.dfnCustomerId.DataType = PPJ.Runtime.Windows.DataType.Number;
            resources.ApplyResources(this.dfnCustomerId, "dfnCustomerId");
            this.dfnCustomerId.Name = "dfnCustomerId";
            this.dfnCustomerId.NamedProperties.Put("EnumerateMethod", "");
            this.dfnCustomerId.NamedProperties.Put("FieldFlags", "295");
            this.dfnCustomerId.NamedProperties.Put("LovReference", "TRN_CUSTOMER(COMPANY_ID)");
            this.dfnCustomerId.NamedProperties.Put("ResizeableChildObject", "");
            this.dfnCustomerId.NamedProperties.Put("SqlColumn", "CUSTOMER_ID");
            this.dfnCustomerId.NamedProperties.Put("ValidateMethod", "");
            this.dfnCustomerId.WindowActions += new PPJ.Runtime.Windows.WindowActionsEventHandler(this.dfnCustomerId_WindowActions);
            // 
            // labeldfTrnCustomerName
            // 
            resources.ApplyResources(this.labeldfTrnCustomerName, "labeldfTrnCustomerName");
            this.labeldfTrnCustomerName.Name = "labeldfTrnCustomerName";
            // 
            // dfTrnCustomerName
            // 
            resources.ApplyResources(this.dfTrnCustomerName, "dfTrnCustomerName");
            this.dfTrnCustomerName.Name = "dfTrnCustomerName";
            this.dfTrnCustomerName.NamedProperties.Put("EnumerateMethod", "");
            this.dfTrnCustomerName.NamedProperties.Put("FieldFlags", "304");
            this.dfTrnCustomerName.NamedProperties.Put("LovReference", "");
            this.dfTrnCustomerName.NamedProperties.Put("ParentName", "dfnCustomerId");
            this.dfTrnCustomerName.NamedProperties.Put("ResizeableChildObject", "");
            this.dfTrnCustomerName.NamedProperties.Put("SqlColumn", "TRN_CUSTOMER_API.Get_Name(company_id,CUSTOMER_ID)");
            this.dfTrnCustomerName.NamedProperties.Put("ValidateMethod", "");
            // 
            // labeldfTrnCustomerCreditLimit
            // 
            resources.ApplyResources(this.labeldfTrnCustomerCreditLimit, "labeldfTrnCustomerCreditLimit");
            this.labeldfTrnCustomerCreditLimit.Name = "labeldfTrnCustomerCreditLimit";
            // 
            // dfTrnCustomerCreditLimit
            // 
            resources.ApplyResources(this.dfTrnCustomerCreditLimit, "dfTrnCustomerCreditLimit");
            this.dfTrnCustomerCreditLimit.Name = "dfTrnCustomerCreditLimit";
            this.dfTrnCustomerCreditLimit.NamedProperties.Put("EnumerateMethod", "");
            this.dfTrnCustomerCreditLimit.NamedProperties.Put("FieldFlags", "304");
            this.dfTrnCustomerCreditLimit.NamedProperties.Put("LovReference", "");
            this.dfTrnCustomerCreditLimit.NamedProperties.Put("ParentName", "dfnCustomerId");
            this.dfTrnCustomerCreditLimit.NamedProperties.Put("ResizeableChildObject", "");
            this.dfTrnCustomerCreditLimit.NamedProperties.Put("SqlColumn", "TRN_CUSTOMER_API.Get_Credit_Limit(company_id,CUSTOMER_ID)");
            this.dfTrnCustomerCreditLimit.NamedProperties.Put("ValidateMethod", "");
            // 
            // labelmlComments
            // 
            resources.ApplyResources(this.labelmlComments, "labelmlComments");
            this.labelmlComments.Name = "labelmlComments";
            // 
            // mlComments
            // 
            resources.ApplyResources(this.mlComments, "mlComments");
            this.mlComments.Name = "mlComments";
            this.mlComments.NamedProperties.Put("EnumerateMethod", "");
            this.mlComments.NamedProperties.Put("FieldFlags", "310");
            this.mlComments.NamedProperties.Put("LovReference", "");
            this.mlComments.NamedProperties.Put("ParentName", "[NaturalParent]");
            this.mlComments.NamedProperties.Put("ResizeableChildObject", "LLRL");
            this.mlComments.NamedProperties.Put("SqlColumn", "COMMENTS");
            this.mlComments.NamedProperties.Put("ValidateMethod", "");
            // 
            // menuFrmMethods
            // 
            this.menuFrmMethods.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.menuItem_Pay});
            this.menuFrmMethods.Name = "menuFrmMethods";
            resources.ApplyResources(this.menuFrmMethods, "menuFrmMethods");
            // 
            // menuItem_Pay
            // 
            this.menuItem_Pay.Command = this.menuFrmMethods_menuPay___;
            this.menuItem_Pay.Name = "menuItem_Pay";
            resources.ApplyResources(this.menuItem_Pay, "menuItem_Pay");
            this.menuItem_Pay.Text = "Pay...";
            // 
            // tblItems
            // 
            this.tblItems.Controls.Add(this.tblItems_colsCompanyId);
            this.tblItems.Controls.Add(this.tblItems_colsBranchId);
            this.tblItems.Controls.Add(this.tblItems_colnInvoiceId);
            this.tblItems.Controls.Add(this.tblItems_colnItemNo);
            this.tblItems.Controls.Add(this.tblItems_colnProductId);
            this.tblItems.Controls.Add(this.tblItems_colTrnProductBrandId);
            this.tblItems.Controls.Add(this.tblItems_colTrnProductCategoryId);
            this.tblItems.Controls.Add(this.tblItems_colTrnProductModelId);
            this.tblItems.Controls.Add(this.tblItems_colDescription);
            this.tblItems.Controls.Add(this.tblItems_colnPrice);
            this.tblItems.Controls.Add(this.tblItems_colnQuantity);
            this.tblItems.Controls.Add(this.tblItems_colTrnProductUnit);
            this.tblItems.Controls.Add(this.tblItems_colnAmount);
            resources.ApplyResources(this.tblItems, "tblItems");
            this.tblItems.Name = "tblItems";
            this.tblItems.NamedProperties.Put("DefaultOrderBy", "");
            this.tblItems.NamedProperties.Put("DefaultWhere", "COMPANY_ID = :Global.Company_Id");
            this.tblItems.NamedProperties.Put("LogicalUnit", "TrnCustomerInvoiceItem");
            this.tblItems.NamedProperties.Put("PackageName", "TRN_CUSTOMER_INVOICE_ITEM_API");
            this.tblItems.NamedProperties.Put("ResizeableChildObject", "LLRR");
            this.tblItems.NamedProperties.Put("ViewName", "TRN_CUSTOMER_INVOICE_ITEM");
            this.tblItems.NamedProperties.Put("Warnings", "FALSE");
            this.tblItems.Controls.SetChildIndex(this.tblItems_colnAmount, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colTrnProductUnit, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colnQuantity, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colnPrice, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colDescription, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colTrnProductModelId, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colTrnProductCategoryId, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colTrnProductBrandId, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colnProductId, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colnItemNo, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colnInvoiceId, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colsBranchId, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colsCompanyId, 0);
            // 
            // tblItems_colsCompanyId
            // 
            resources.ApplyResources(this.tblItems_colsCompanyId, "tblItems_colsCompanyId");
            this.tblItems_colsCompanyId.Name = "tblItems_colsCompanyId";
            this.tblItems_colsCompanyId.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colsCompanyId.NamedProperties.Put("FieldFlags", "67");
            this.tblItems_colsCompanyId.NamedProperties.Put("LovReference", "");
            this.tblItems_colsCompanyId.NamedProperties.Put("SqlColumn", "COMPANY_ID");
            this.tblItems_colsCompanyId.Position = 3;
            // 
            // tblItems_colsBranchId
            // 
            resources.ApplyResources(this.tblItems_colsBranchId, "tblItems_colsBranchId");
            this.tblItems_colsBranchId.Name = "tblItems_colsBranchId";
            this.tblItems_colsBranchId.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colsBranchId.NamedProperties.Put("FieldFlags", "67");
            this.tblItems_colsBranchId.NamedProperties.Put("LovReference", "");
            this.tblItems_colsBranchId.NamedProperties.Put("SqlColumn", "BRANCH_ID");
            this.tblItems_colsBranchId.Position = 4;
            // 
            // tblItems_colnInvoiceId
            // 
            this.tblItems_colnInvoiceId.DataType = PPJ.Runtime.Windows.DataType.Number;
            resources.ApplyResources(this.tblItems_colnInvoiceId, "tblItems_colnInvoiceId");
            this.tblItems_colnInvoiceId.Name = "tblItems_colnInvoiceId";
            this.tblItems_colnInvoiceId.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colnInvoiceId.NamedProperties.Put("FieldFlags", "67");
            this.tblItems_colnInvoiceId.NamedProperties.Put("LovReference", "TRN_CUSTOMER_INVOICE(COMPANY_ID,BRANCH_ID)");
            this.tblItems_colnInvoiceId.NamedProperties.Put("ResizeableChildObject", "");
            this.tblItems_colnInvoiceId.NamedProperties.Put("SqlColumn", "INVOICE_ID");
            this.tblItems_colnInvoiceId.NamedProperties.Put("ValidateMethod", "");
            this.tblItems_colnInvoiceId.Position = 5;
            // 
            // tblItems_colnItemNo
            // 
            this.tblItems_colnItemNo.DataType = PPJ.Runtime.Windows.DataType.Number;
            resources.ApplyResources(this.tblItems_colnItemNo, "tblItems_colnItemNo");
            this.tblItems_colnItemNo.Name = "tblItems_colnItemNo";
            this.tblItems_colnItemNo.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colnItemNo.NamedProperties.Put("FieldFlags", "163");
            this.tblItems_colnItemNo.NamedProperties.Put("LovReference", "");
            this.tblItems_colnItemNo.NamedProperties.Put("SqlColumn", "ITEM_NO");
            this.tblItems_colnItemNo.Position = 6;
            // 
            // tblItems_colnProductId
            // 
            this.tblItems_colnProductId.DataType = PPJ.Runtime.Windows.DataType.Number;
            this.tblItems_colnProductId.Name = "tblItems_colnProductId";
            this.tblItems_colnProductId.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colnProductId.NamedProperties.Put("FieldFlags", "295");
            this.tblItems_colnProductId.NamedProperties.Put("LovReference", "TRN_PRODUCT(COMPANY_ID)");
            this.tblItems_colnProductId.NamedProperties.Put("ResizeableChildObject", "");
            this.tblItems_colnProductId.NamedProperties.Put("SqlColumn", "PRODUCT_ID");
            this.tblItems_colnProductId.NamedProperties.Put("ValidateMethod", "");
            this.tblItems_colnProductId.Position = 7;
            resources.ApplyResources(this.tblItems_colnProductId, "tblItems_colnProductId");
            // 
            // tblItems_colTrnProductBrandId
            // 
            this.tblItems_colTrnProductBrandId.Name = "tblItems_colTrnProductBrandId";
            this.tblItems_colTrnProductBrandId.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colTrnProductBrandId.NamedProperties.Put("FieldFlags", "304");
            this.tblItems_colTrnProductBrandId.NamedProperties.Put("LovReference", "");
            this.tblItems_colTrnProductBrandId.NamedProperties.Put("ParentName", "tblItems.tblItems_colnProductId");
            this.tblItems_colTrnProductBrandId.NamedProperties.Put("ResizeableChildObject", "");
            this.tblItems_colTrnProductBrandId.NamedProperties.Put("SqlColumn", "TRN_PRODUCT_API.Get_Brand_Id(company_id,PRODUCT_ID)");
            this.tblItems_colTrnProductBrandId.NamedProperties.Put("ValidateMethod", "");
            this.tblItems_colTrnProductBrandId.Position = 8;
            resources.ApplyResources(this.tblItems_colTrnProductBrandId, "tblItems_colTrnProductBrandId");
            // 
            // tblItems_colTrnProductCategoryId
            // 
            this.tblItems_colTrnProductCategoryId.Name = "tblItems_colTrnProductCategoryId";
            this.tblItems_colTrnProductCategoryId.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colTrnProductCategoryId.NamedProperties.Put("FieldFlags", "304");
            this.tblItems_colTrnProductCategoryId.NamedProperties.Put("LovReference", "");
            this.tblItems_colTrnProductCategoryId.NamedProperties.Put("ParentName", "tblItems.tblItems_colnProductId");
            this.tblItems_colTrnProductCategoryId.NamedProperties.Put("ResizeableChildObject", "");
            this.tblItems_colTrnProductCategoryId.NamedProperties.Put("SqlColumn", "TRN_PRODUCT_API.Get_Category_Id(company_id,PRODUCT_ID)");
            this.tblItems_colTrnProductCategoryId.NamedProperties.Put("ValidateMethod", "");
            this.tblItems_colTrnProductCategoryId.Position = 9;
            resources.ApplyResources(this.tblItems_colTrnProductCategoryId, "tblItems_colTrnProductCategoryId");
            // 
            // tblItems_colTrnProductModelId
            // 
            this.tblItems_colTrnProductModelId.Name = "tblItems_colTrnProductModelId";
            this.tblItems_colTrnProductModelId.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colTrnProductModelId.NamedProperties.Put("FieldFlags", "304");
            this.tblItems_colTrnProductModelId.NamedProperties.Put("LovReference", "");
            this.tblItems_colTrnProductModelId.NamedProperties.Put("ParentName", "tblItems.tblItems_colnProductId");
            this.tblItems_colTrnProductModelId.NamedProperties.Put("ResizeableChildObject", "");
            this.tblItems_colTrnProductModelId.NamedProperties.Put("SqlColumn", "TRN_PRODUCT_API.Get_Model_Id(company_id,PRODUCT_ID)");
            this.tblItems_colTrnProductModelId.NamedProperties.Put("ValidateMethod", "");
            this.tblItems_colTrnProductModelId.Position = 10;
            resources.ApplyResources(this.tblItems_colTrnProductModelId, "tblItems_colTrnProductModelId");
            // 
            // tblItems_colDescription
            // 
            this.tblItems_colDescription.Name = "tblItems_colDescription";
            this.tblItems_colDescription.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colDescription.NamedProperties.Put("FieldFlags", "310");
            this.tblItems_colDescription.NamedProperties.Put("LovReference", "");
            this.tblItems_colDescription.NamedProperties.Put("SqlColumn", "DESCRIPTION");
            this.tblItems_colDescription.Position = 11;
            resources.ApplyResources(this.tblItems_colDescription, "tblItems_colDescription");
            // 
            // tblItems_colnPrice
            // 
            this.tblItems_colnPrice.DataType = PPJ.Runtime.Windows.DataType.Number;
            this.tblItems_colnPrice.Name = "tblItems_colnPrice";
            this.tblItems_colnPrice.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colnPrice.NamedProperties.Put("FieldFlags", "295");
            this.tblItems_colnPrice.NamedProperties.Put("LovReference", "");
            this.tblItems_colnPrice.NamedProperties.Put("SqlColumn", "PRICE");
            this.tblItems_colnPrice.Position = 12;
            resources.ApplyResources(this.tblItems_colnPrice, "tblItems_colnPrice");
            this.tblItems_colnPrice.WindowActions += new PPJ.Runtime.Windows.WindowActionsEventHandler(this.tblItems_colnPrice_WindowActions);
            // 
            // tblItems_colnQuantity
            // 
            this.tblItems_colnQuantity.DataType = PPJ.Runtime.Windows.DataType.Number;
            this.tblItems_colnQuantity.Name = "tblItems_colnQuantity";
            this.tblItems_colnQuantity.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colnQuantity.NamedProperties.Put("FieldFlags", "295");
            this.tblItems_colnQuantity.NamedProperties.Put("LovReference", "");
            this.tblItems_colnQuantity.NamedProperties.Put("SqlColumn", "QUANTITY");
            this.tblItems_colnQuantity.Position = 13;
            resources.ApplyResources(this.tblItems_colnQuantity, "tblItems_colnQuantity");
            // 
            // tblItems_colTrnProductUnit
            // 
            this.tblItems_colTrnProductUnit.Name = "tblItems_colTrnProductUnit";
            this.tblItems_colTrnProductUnit.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colTrnProductUnit.NamedProperties.Put("FieldFlags", "304");
            this.tblItems_colTrnProductUnit.NamedProperties.Put("LovReference", "");
            this.tblItems_colTrnProductUnit.NamedProperties.Put("ParentName", "tblItems.tblItems_colnItemNo");
            this.tblItems_colTrnProductUnit.NamedProperties.Put("ResizeableChildObject", "");
            this.tblItems_colTrnProductUnit.NamedProperties.Put("SqlColumn", "TRN_PRODUCT_API.Get_Unit(company_id,PRODUCT_ID)");
            this.tblItems_colTrnProductUnit.NamedProperties.Put("ValidateMethod", "");
            this.tblItems_colTrnProductUnit.Position = 14;
            resources.ApplyResources(this.tblItems_colTrnProductUnit, "tblItems_colTrnProductUnit");
            // 
            // tblItems_colnAmount
            // 
            this.tblItems_colnAmount.DataType = PPJ.Runtime.Windows.DataType.Number;
            this.tblItems_colnAmount.Name = "tblItems_colnAmount";
            this.tblItems_colnAmount.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colnAmount.NamedProperties.Put("FieldFlags", "295");
            this.tblItems_colnAmount.NamedProperties.Put("LovReference", "");
            this.tblItems_colnAmount.NamedProperties.Put("SqlColumn", "AMOUNT");
            this.tblItems_colnAmount.Position = 15;
            resources.ApplyResources(this.tblItems_colnAmount, "tblItems_colnAmount");
            // 
            // frmCustomerInvoiceDetail
            // 
            resources.ApplyResources(this, "$this");
            this.Controls.Add(this.tblItems);
            this.Controls.Add(this.mlComments);
            this.Controls.Add(this.dfTrnCustomerCreditLimit);
            this.Controls.Add(this.dfTrnCustomerName);
            this.Controls.Add(this.dfnCustomerId);
            this.Controls.Add(this.cmbPaymentTerms);
            this.Controls.Add(this.dfnUnpaid);
            this.Controls.Add(this.dfTrnCustomerOrderDeliveryType);
            this.Controls.Add(this.dfnOrderId);
            this.Controls.Add(this.dfnInvoiceAmount);
            this.Controls.Add(this.dfdDueDate);
            this.Controls.Add(this.dfdInvoiceDate);
            this.Controls.Add(this.ccInvoiceId);
            this.Controls.Add(this.dfsBranchId);
            this.Controls.Add(this.dfsCompanyId);
            this.Controls.Add(this.labelmlComments);
            this.Controls.Add(this.labeldfTrnCustomerCreditLimit);
            this.Controls.Add(this.labeldfTrnCustomerName);
            this.Controls.Add(this.labeldfnCustomerId);
            this.Controls.Add(this.labelcmbPaymentTerms);
            this.Controls.Add(this.labeldfnUnpaid);
            this.Controls.Add(this.labeldfTrnCustomerOrderDeliveryType);
            this.Controls.Add(this.labeldfnOrderId);
            this.Controls.Add(this.labeldfnInvoiceAmount);
            this.Controls.Add(this.labeldfdDueDate);
            this.Controls.Add(this.labeldfdInvoiceDate);
            this.Controls.Add(this.labelccInvoiceId);
            this.Controls.Add(this.labeldfsBranchId);
            this.Controls.Add(this.labeldfsCompanyId);
            this.Name = "frmCustomerInvoiceDetail";
            this.NamedProperties.Put("DefaultOrderBy", "");
            this.NamedProperties.Put("DefaultWhere", "COMPANY_ID = :Global.Company_Id");
            this.NamedProperties.Put("LogicalUnit", "TrnCustomerInvoice");
            this.NamedProperties.Put("PackageName", "TRN_CUSTOMER_INVOICE_API");
            this.NamedProperties.Put("ParentName", "[NaturalParent]");
            this.NamedProperties.Put("ResizeableChildObject", "");
            this.NamedProperties.Put("SourceFlags", "8641");
            this.NamedProperties.Put("ViewName", "TRN_CUSTOMER_INVOICE");
            this.NamedProperties.Put("Warnings", "TRUE");
            this.menuFrmMethods.ResumeLayout(false);
            this.tblItems.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }
		#endregion
		
		#region System Methods/Properties
		
		/// <summary>
		/// Release global reference.
		/// </summary>
		/// <param name="disposing"></param>
		protected override void Dispose(bool disposing)
		{
			if (disposing && (components != null)) 
			{
				components.Dispose();
			}
			base.Dispose(disposing);
		}
		#endregion
		
		

        public Fnd.Windows.Forms.FndCommand menuFrmMethods_menuPay___;
        protected Fnd.Windows.Forms.FndContextMenuStrip menuFrmMethods;
        protected Fnd.Windows.Forms.FndToolStripMenuItem menuItem_Pay;
        public cChildTable tblItems;
        protected cColumn tblItems_colsCompanyId;
        protected cColumn tblItems_colsBranchId;
        protected cColumn tblItems_colnInvoiceId;
        protected cColumn tblItems_colnItemNo;
        protected cColumn tblItems_colnProductId;
        protected cColumn tblItems_colTrnProductBrandId;
        protected cColumn tblItems_colTrnProductCategoryId;
        protected cColumn tblItems_colTrnProductModelId;
        protected cColumn tblItems_colDescription;
        protected cColumn tblItems_colnPrice;
        protected cColumn tblItems_colnQuantity;
        protected cColumn tblItems_colTrnProductUnit;
        protected cColumn tblItems_colnAmount;
	}
}
