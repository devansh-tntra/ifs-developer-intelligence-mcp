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
	
	public partial class tbwCustomerInvoiceOverview
	{
		
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.IContainer components = null;
		
		#region Window Controls
		public cColumn colsCompanyId;
		public cColumn colsBranchId;
		public cColumn colnInvoiceId;
		public cColumn coldInvoiceDate;
		public cColumn coldDueDate;
		public cColumn colnInvoiceAmount;
		public cColumn colnUnpaid;
		public cLookupColumn colsPaymentTerms;
		public cColumn colnCustomerId;
		public cColumn colTrnCustomerName;
		public cColumn colTrnCustomerCreditLimit;
		public cColumn colnOrderId;
		public cColumn colTrnCustomerOrderDeliveryTyp;
		public cColumn colComments;
		#endregion
		
		#region Windows Form Designer generated code
		
		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(tbwCustomerInvoiceOverview));
            this.menuTbwMethods_menuView_Customer_Invoice_Details___ = new Ifs.Fnd.Windows.Forms.FndCommand(this.components);
            this.colsCompanyId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.colsBranchId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.colnInvoiceId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.coldInvoiceDate = new Ifs.Fnd.ApplicationForms.cColumn();
            this.coldDueDate = new Ifs.Fnd.ApplicationForms.cColumn();
            this.colnInvoiceAmount = new Ifs.Fnd.ApplicationForms.cColumn();
            this.colnUnpaid = new Ifs.Fnd.ApplicationForms.cColumn();
            this.colsPaymentTerms = new Ifs.Fnd.ApplicationForms.cLookupColumn();
            this.colnCustomerId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.colTrnCustomerName = new Ifs.Fnd.ApplicationForms.cColumn();
            this.colTrnCustomerCreditLimit = new Ifs.Fnd.ApplicationForms.cColumn();
            this.colnOrderId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.colTrnCustomerOrderDeliveryTyp = new Ifs.Fnd.ApplicationForms.cColumn();
            this.colComments = new Ifs.Fnd.ApplicationForms.cColumn();
            this.menuTbwMethods = new Ifs.Fnd.Windows.Forms.FndContextMenuStrip(this.components);
            this.menuItem_View = new Ifs.Fnd.Windows.Forms.FndToolStripMenuItem(this.components);
            this.menuTbwMethods.SuspendLayout();
            this.SuspendLayout();
            // 
            // commandManager
            // 
            this.commandManager.Commands.Add(this.menuTbwMethods_menuView_Customer_Invoice_Details___);
            this.commandManager.ContextMenus.Add(this.menuTbwMethods);
            // 
            // menuTbwMethods_menuView_Customer_Invoice_Details___
            // 
            resources.ApplyResources(this.menuTbwMethods_menuView_Customer_Invoice_Details___, "menuTbwMethods_menuView_Customer_Invoice_Details___");
            this.menuTbwMethods_menuView_Customer_Invoice_Details___.Name = "menuTbwMethods_menuView_Customer_Invoice_Details___";
            this.menuTbwMethods_menuView_Customer_Invoice_Details___.Execute += new Ifs.Fnd.Windows.Forms.FndCommandExecuteHandler(this.menuItem_View_Execute);
            this.menuTbwMethods_menuView_Customer_Invoice_Details___.Inquire += new Ifs.Fnd.Windows.Forms.FndCommandInquireHandler(this.menuItem_View_Inquire);
            // 
            // colsCompanyId
            // 
            resources.ApplyResources(this.colsCompanyId, "colsCompanyId");
            this.colsCompanyId.MaxLength = 20;
            this.colsCompanyId.Name = "colsCompanyId";
            this.colsCompanyId.NamedProperties.Put("EnumerateMethod", "");
            this.colsCompanyId.NamedProperties.Put("FieldFlags", "67");
            this.colsCompanyId.NamedProperties.Put("LovReference", "");
            this.colsCompanyId.NamedProperties.Put("ParentName", "[NaturalParent]");
            this.colsCompanyId.NamedProperties.Put("SqlColumn", "COMPANY_ID");
            this.colsCompanyId.Position = 3;
            // 
            // colsBranchId
            // 
            this.colsBranchId.MaxLength = 20;
            this.colsBranchId.Name = "colsBranchId";
            this.colsBranchId.NamedProperties.Put("EnumerateMethod", "");
            this.colsBranchId.NamedProperties.Put("FieldFlags", "67");
            this.colsBranchId.NamedProperties.Put("LovReference", "TRN_BRANCH(COMPANY_ID)");
            this.colsBranchId.NamedProperties.Put("ParentName", "[NaturalParent]");
            this.colsBranchId.NamedProperties.Put("ResizeableChildObject", "");
            this.colsBranchId.NamedProperties.Put("SqlColumn", "BRANCH_ID");
            this.colsBranchId.NamedProperties.Put("ValidateMethod", "");
            this.colsBranchId.Position = 4;
            resources.ApplyResources(this.colsBranchId, "colsBranchId");
            // 
            // colnInvoiceId
            // 
            this.colnInvoiceId.DataType = PPJ.Runtime.Windows.DataType.Number;
            this.colnInvoiceId.Name = "colnInvoiceId";
            this.colnInvoiceId.NamedProperties.Put("EnumerateMethod", "");
            this.colnInvoiceId.NamedProperties.Put("FieldFlags", "163");
            this.colnInvoiceId.NamedProperties.Put("LovReference", "");
            this.colnInvoiceId.NamedProperties.Put("ParentName", "[NaturalParent]");
            this.colnInvoiceId.NamedProperties.Put("SqlColumn", "INVOICE_ID");
            this.colnInvoiceId.Position = 5;
            resources.ApplyResources(this.colnInvoiceId, "colnInvoiceId");
            // 
            // coldInvoiceDate
            // 
            this.coldInvoiceDate.DataType = PPJ.Runtime.Windows.DataType.DateTime;
            this.coldInvoiceDate.Format = "d";
            this.coldInvoiceDate.Name = "coldInvoiceDate";
            this.coldInvoiceDate.NamedProperties.Put("EnumerateMethod", "");
            this.coldInvoiceDate.NamedProperties.Put("FieldFlags", "295");
            this.coldInvoiceDate.NamedProperties.Put("LovReference", "");
            this.coldInvoiceDate.NamedProperties.Put("ParentName", "[NaturalParent]");
            this.coldInvoiceDate.NamedProperties.Put("SqlColumn", "INVOICE_DATE");
            this.coldInvoiceDate.Position = 6;
            resources.ApplyResources(this.coldInvoiceDate, "coldInvoiceDate");
            // 
            // coldDueDate
            // 
            this.coldDueDate.DataType = PPJ.Runtime.Windows.DataType.DateTime;
            this.coldDueDate.Format = "d";
            this.coldDueDate.Name = "coldDueDate";
            this.coldDueDate.NamedProperties.Put("EnumerateMethod", "");
            this.coldDueDate.NamedProperties.Put("FieldFlags", "294");
            this.coldDueDate.NamedProperties.Put("LovReference", "");
            this.coldDueDate.NamedProperties.Put("ParentName", "[NaturalParent]");
            this.coldDueDate.NamedProperties.Put("SqlColumn", "DUE_DATE");
            this.coldDueDate.Position = 7;
            resources.ApplyResources(this.coldDueDate, "coldDueDate");
            // 
            // colnInvoiceAmount
            // 
            this.colnInvoiceAmount.DataType = PPJ.Runtime.Windows.DataType.Number;
            this.colnInvoiceAmount.Name = "colnInvoiceAmount";
            this.colnInvoiceAmount.NamedProperties.Put("EnumerateMethod", "");
            this.colnInvoiceAmount.NamedProperties.Put("FieldFlags", "295");
            this.colnInvoiceAmount.NamedProperties.Put("LovReference", "");
            this.colnInvoiceAmount.NamedProperties.Put("ParentName", "[NaturalParent]");
            this.colnInvoiceAmount.NamedProperties.Put("SqlColumn", "INVOICE_AMOUNT");
            this.colnInvoiceAmount.Position = 8;
            resources.ApplyResources(this.colnInvoiceAmount, "colnInvoiceAmount");
            // 
            // colnUnpaid
            // 
            this.colnUnpaid.DataType = PPJ.Runtime.Windows.DataType.Number;
            this.colnUnpaid.Name = "colnUnpaid";
            this.colnUnpaid.NamedProperties.Put("EnumerateMethod", "");
            this.colnUnpaid.NamedProperties.Put("FieldFlags", "295");
            this.colnUnpaid.NamedProperties.Put("LovReference", "");
            this.colnUnpaid.NamedProperties.Put("ParentName", "[NaturalParent]");
            this.colnUnpaid.NamedProperties.Put("SqlColumn", "UNPAID");
            this.colnUnpaid.Position = 9;
            resources.ApplyResources(this.colnUnpaid, "colnUnpaid");
            // 
            // colsPaymentTerms
            // 
            this.colsPaymentTerms.MaxLength = 200;
            this.colsPaymentTerms.Name = "colsPaymentTerms";
            this.colsPaymentTerms.NamedProperties.Put("EnumerateMethod", "TRN_INVOICE_PAY_TERMS_API.Enumerate");
            this.colsPaymentTerms.NamedProperties.Put("FieldFlags", "294");
            this.colsPaymentTerms.NamedProperties.Put("LovReference", "");
            this.colsPaymentTerms.NamedProperties.Put("ParentName", "[NaturalParent]");
            this.colsPaymentTerms.NamedProperties.Put("ResizeableChildObject", "");
            this.colsPaymentTerms.NamedProperties.Put("SqlColumn", "PAYMENT_TERMS");
            this.colsPaymentTerms.NamedProperties.Put("ValidateMethod", "");
            this.colsPaymentTerms.Position = 10;
            resources.ApplyResources(this.colsPaymentTerms, "colsPaymentTerms");
            // 
            // colnCustomerId
            // 
            this.colnCustomerId.DataType = PPJ.Runtime.Windows.DataType.Number;
            this.colnCustomerId.Name = "colnCustomerId";
            this.colnCustomerId.NamedProperties.Put("EnumerateMethod", "");
            this.colnCustomerId.NamedProperties.Put("FieldFlags", "295");
            this.colnCustomerId.NamedProperties.Put("LovReference", "TRN_EXTERNAL_CUSTOMER(COMPANY_ID)");
            this.colnCustomerId.NamedProperties.Put("ParentName", "[NaturalParent]");
            this.colnCustomerId.NamedProperties.Put("ResizeableChildObject", "");
            this.colnCustomerId.NamedProperties.Put("SqlColumn", "CUSTOMER_ID");
            this.colnCustomerId.NamedProperties.Put("ValidateMethod", "");
            this.colnCustomerId.Position = 11;
            resources.ApplyResources(this.colnCustomerId, "colnCustomerId");
            // 
            // colTrnCustomerName
            // 
            this.colTrnCustomerName.MaxLength = 2000;
            this.colTrnCustomerName.Name = "colTrnCustomerName";
            this.colTrnCustomerName.NamedProperties.Put("EnumerateMethod", "");
            this.colTrnCustomerName.NamedProperties.Put("FieldFlags", "304");
            this.colTrnCustomerName.NamedProperties.Put("LovReference", "");
            this.colTrnCustomerName.NamedProperties.Put("ParentName", "colnCustomerId");
            this.colTrnCustomerName.NamedProperties.Put("ResizeableChildObject", "");
            this.colTrnCustomerName.NamedProperties.Put("SqlColumn", "TRN_CUSTOMER_API.Get_Name(company_id,CUSTOMER_ID)");
            this.colTrnCustomerName.NamedProperties.Put("ValidateMethod", "");
            this.colTrnCustomerName.Position = 12;
            resources.ApplyResources(this.colTrnCustomerName, "colTrnCustomerName");
            // 
            // colTrnCustomerCreditLimit
            // 
            this.colTrnCustomerCreditLimit.MaxLength = 2000;
            this.colTrnCustomerCreditLimit.Name = "colTrnCustomerCreditLimit";
            this.colTrnCustomerCreditLimit.NamedProperties.Put("EnumerateMethod", "");
            this.colTrnCustomerCreditLimit.NamedProperties.Put("FieldFlags", "304");
            this.colTrnCustomerCreditLimit.NamedProperties.Put("LovReference", "");
            this.colTrnCustomerCreditLimit.NamedProperties.Put("ParentName", "colnCustomerId");
            this.colTrnCustomerCreditLimit.NamedProperties.Put("ResizeableChildObject", "");
            this.colTrnCustomerCreditLimit.NamedProperties.Put("SqlColumn", "TRN_CUSTOMER_API.Get_Credit_Limit(company_id,CUSTOMER_ID)");
            this.colTrnCustomerCreditLimit.NamedProperties.Put("ValidateMethod", "");
            this.colTrnCustomerCreditLimit.Position = 13;
            resources.ApplyResources(this.colTrnCustomerCreditLimit, "colTrnCustomerCreditLimit");
            // 
            // colnOrderId
            // 
            this.colnOrderId.DataType = PPJ.Runtime.Windows.DataType.Number;
            this.colnOrderId.Name = "colnOrderId";
            this.colnOrderId.NamedProperties.Put("EnumerateMethod", "");
            this.colnOrderId.NamedProperties.Put("FieldFlags", "295");
            this.colnOrderId.NamedProperties.Put("LovReference", "TRN_CUSTOMER_ORDER(COMPANY_ID,BRANCH_ID)");
            this.colnOrderId.NamedProperties.Put("ParentName", "[NaturalParent]");
            this.colnOrderId.NamedProperties.Put("ResizeableChildObject", "");
            this.colnOrderId.NamedProperties.Put("SqlColumn", "ORDER_ID");
            this.colnOrderId.NamedProperties.Put("ValidateMethod", "");
            this.colnOrderId.Position = 14;
            resources.ApplyResources(this.colnOrderId, "colnOrderId");
            // 
            // colTrnCustomerOrderDeliveryTyp
            // 
            this.colTrnCustomerOrderDeliveryTyp.MaxLength = 2000;
            this.colTrnCustomerOrderDeliveryTyp.Name = "colTrnCustomerOrderDeliveryTyp";
            this.colTrnCustomerOrderDeliveryTyp.NamedProperties.Put("EnumerateMethod", "");
            this.colTrnCustomerOrderDeliveryTyp.NamedProperties.Put("FieldFlags", "304");
            this.colTrnCustomerOrderDeliveryTyp.NamedProperties.Put("LovReference", "");
            this.colTrnCustomerOrderDeliveryTyp.NamedProperties.Put("ParentName", "colnOrderId");
            this.colTrnCustomerOrderDeliveryTyp.NamedProperties.Put("ResizeableChildObject", "");
            this.colTrnCustomerOrderDeliveryTyp.NamedProperties.Put("SqlColumn", "TRN_CUSTOMER_ORDER_API.Get_Delivery_Type(company_id,branch_id,ORDER_ID)");
            this.colTrnCustomerOrderDeliveryTyp.NamedProperties.Put("ValidateMethod", "");
            this.colTrnCustomerOrderDeliveryTyp.Position = 15;
            resources.ApplyResources(this.colTrnCustomerOrderDeliveryTyp, "colTrnCustomerOrderDeliveryTyp");
            // 
            // colComments
            // 
            this.colComments.MaxLength = 2000;
            this.colComments.Name = "colComments";
            this.colComments.NamedProperties.Put("EnumerateMethod", "");
            this.colComments.NamedProperties.Put("FieldFlags", "310");
            this.colComments.NamedProperties.Put("LovReference", "");
            this.colComments.NamedProperties.Put("ParentName", "[NaturalParent]");
            this.colComments.NamedProperties.Put("SqlColumn", "COMMENTS");
            this.colComments.Position = 16;
            resources.ApplyResources(this.colComments, "colComments");
            // 
            // menuTbwMethods
            // 
            this.menuTbwMethods.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.menuItem_View});
            this.menuTbwMethods.Name = "menuTbwMethods";
            resources.ApplyResources(this.menuTbwMethods, "menuTbwMethods");
            // 
            // menuItem_View
            // 
            this.menuItem_View.Command = this.menuTbwMethods_menuView_Customer_Invoice_Details___;
            this.menuItem_View.Name = "menuItem_View";
            resources.ApplyResources(this.menuItem_View, "menuItem_View");
            this.menuItem_View.Text = "View Customer Invoice Details...";
            // 
            // tbwCustomerInvoiceOverview
            // 
            resources.ApplyResources(this, "$this");
            this.Controls.Add(this.colsCompanyId);
            this.Controls.Add(this.colsBranchId);
            this.Controls.Add(this.colnInvoiceId);
            this.Controls.Add(this.coldInvoiceDate);
            this.Controls.Add(this.coldDueDate);
            this.Controls.Add(this.colnInvoiceAmount);
            this.Controls.Add(this.colnUnpaid);
            this.Controls.Add(this.colsPaymentTerms);
            this.Controls.Add(this.colnCustomerId);
            this.Controls.Add(this.colTrnCustomerName);
            this.Controls.Add(this.colTrnCustomerCreditLimit);
            this.Controls.Add(this.colnOrderId);
            this.Controls.Add(this.colTrnCustomerOrderDeliveryTyp);
            this.Controls.Add(this.colComments);
            this.Name = "tbwCustomerInvoiceOverview";
            this.NamedProperties.Put("DefaultOrderBy", "");
            this.NamedProperties.Put("DefaultWhere", "COMPANY_ID = :Global.Company_Id");
            this.NamedProperties.Put("LogicalUnit", "TrnCustomerInvoice");
            this.NamedProperties.Put("PackageName", "TRN_CUSTOMER_INVOICE_API");
            this.NamedProperties.Put("ParentName", "[NaturalParent]");
            this.NamedProperties.Put("ResizeableChildObject", "");
            this.NamedProperties.Put("SourceFlags", "449");
            this.NamedProperties.Put("ViewName", "TRN_CUSTOMER_INVOICE");
            this.NamedProperties.Put("Warnings", "FALSE");
            this.Controls.SetChildIndex(this.colComments, 0);
            this.Controls.SetChildIndex(this.colTrnCustomerOrderDeliveryTyp, 0);
            this.Controls.SetChildIndex(this.colnOrderId, 0);
            this.Controls.SetChildIndex(this.colTrnCustomerCreditLimit, 0);
            this.Controls.SetChildIndex(this.colTrnCustomerName, 0);
            this.Controls.SetChildIndex(this.colnCustomerId, 0);
            this.Controls.SetChildIndex(this.colsPaymentTerms, 0);
            this.Controls.SetChildIndex(this.colnUnpaid, 0);
            this.Controls.SetChildIndex(this.colnInvoiceAmount, 0);
            this.Controls.SetChildIndex(this.coldDueDate, 0);
            this.Controls.SetChildIndex(this.coldInvoiceDate, 0);
            this.Controls.SetChildIndex(this.colnInvoiceId, 0);
            this.Controls.SetChildIndex(this.colsBranchId, 0);
            this.Controls.SetChildIndex(this.colsCompanyId, 0);
            this.Controls.SetChildIndex(this.@__colObjversion, 0);
            this.Controls.SetChildIndex(this.@__colObjid, 0);
            this.menuTbwMethods.ResumeLayout(false);
            this.ResumeLayout(false);

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

        public Fnd.Windows.Forms.FndCommand menuTbwMethods_menuView_Customer_Invoice_Details___;
        protected Fnd.Windows.Forms.FndContextMenuStrip menuTbwMethods;
        protected Fnd.Windows.Forms.FndToolStripMenuItem menuItem_View;
	}
}
