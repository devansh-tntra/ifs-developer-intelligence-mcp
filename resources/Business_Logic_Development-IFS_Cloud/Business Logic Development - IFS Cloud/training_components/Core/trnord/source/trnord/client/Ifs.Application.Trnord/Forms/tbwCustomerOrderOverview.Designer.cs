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
	
	public partial class tbwCustomerOrderOverview
	{
		
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.IContainer components = null;
		
		#region Window Controls
		public cColumn colsCompanyId;
		public cColumn colsBranchId;
		public cColumn colTrnBranchCountryId;
		public cColumn colTrnBranchAreaId;
		public cColumn colnOrderId;
		public cColumn coldOrderDate;
		public cColumn coldDeliveryDate;
		public cLookupColumn colsDeliveryType;
		public cColumn colnDiscount;
		public cColumn colnCustomerId;
		public cColumn colTrnCustomerName;
		public cColumn colTrnCustomerDiscount;
		public cColumn colTrnCustomerActive;
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(tbwCustomerOrderOverview));
            this.menuTbwMethods_menuView_Customer_Order_Details___ = new Ifs.Fnd.Windows.Forms.FndCommand(this.components);
            this.menuTbwMethods_menuView_Customer_Invoice_Details___ = new Ifs.Fnd.Windows.Forms.FndCommand(this.components);
            this.colsCompanyId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.colsBranchId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.colTrnBranchCountryId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.colTrnBranchAreaId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.colnOrderId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.coldOrderDate = new Ifs.Fnd.ApplicationForms.cColumn();
            this.coldDeliveryDate = new Ifs.Fnd.ApplicationForms.cColumn();
            this.colsDeliveryType = new Ifs.Fnd.ApplicationForms.cLookupColumn();
            this.colnDiscount = new Ifs.Fnd.ApplicationForms.cColumn();
            this.colnCustomerId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.colTrnCustomerName = new Ifs.Fnd.ApplicationForms.cColumn();
            this.colTrnCustomerDiscount = new Ifs.Fnd.ApplicationForms.cColumn();
            this.colTrnCustomerActive = new Ifs.Fnd.ApplicationForms.cColumn();
            this.colComments = new Ifs.Fnd.ApplicationForms.cColumn();
            this.menuTbwMethods = new Ifs.Fnd.Windows.Forms.FndContextMenuStrip(this.components);
            this.menuItem_View = new Ifs.Fnd.Windows.Forms.FndToolStripMenuItem(this.components);
            this.menuItem_View_1 = new Ifs.Fnd.Windows.Forms.FndToolStripMenuItem(this.components);
            this.menuTbwMethods.SuspendLayout();
            this.SuspendLayout();
            // 
            // commandManager
            // 
            this.commandManager.Commands.Add(this.menuTbwMethods_menuView_Customer_Order_Details___);
            this.commandManager.Commands.Add(this.menuTbwMethods_menuView_Customer_Invoice_Details___);
            this.commandManager.ContextMenus.Add(this.menuTbwMethods);
            // 
            // menuTbwMethods_menuView_Customer_Order_Details___
            // 
            resources.ApplyResources(this.menuTbwMethods_menuView_Customer_Order_Details___, "menuTbwMethods_menuView_Customer_Order_Details___");
            this.menuTbwMethods_menuView_Customer_Order_Details___.Name = "menuTbwMethods_menuView_Customer_Order_Details___";
            this.menuTbwMethods_menuView_Customer_Order_Details___.Execute += new Ifs.Fnd.Windows.Forms.FndCommandExecuteHandler(this.menuItem_View_Execute);
            this.menuTbwMethods_menuView_Customer_Order_Details___.Inquire += new Ifs.Fnd.Windows.Forms.FndCommandInquireHandler(this.menuItem_View_Inquire);
            // 
            // menuTbwMethods_menuView_Customer_Invoice_Details___
            // 
            resources.ApplyResources(this.menuTbwMethods_menuView_Customer_Invoice_Details___, "menuTbwMethods_menuView_Customer_Invoice_Details___");
            this.menuTbwMethods_menuView_Customer_Invoice_Details___.Name = "menuTbwMethods_menuView_Customer_Invoice_Details___";
            this.menuTbwMethods_menuView_Customer_Invoice_Details___.Execute += new Ifs.Fnd.Windows.Forms.FndCommandExecuteHandler(this.menuItem_View_1_Execute);
            this.menuTbwMethods_menuView_Customer_Invoice_Details___.Inquire += new Ifs.Fnd.Windows.Forms.FndCommandInquireHandler(this.menuItem_View_1_Inquire);
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
            // colTrnBranchCountryId
            // 
            this.colTrnBranchCountryId.MaxLength = 2000;
            this.colTrnBranchCountryId.Name = "colTrnBranchCountryId";
            this.colTrnBranchCountryId.NamedProperties.Put("EnumerateMethod", "");
            this.colTrnBranchCountryId.NamedProperties.Put("FieldFlags", "304");
            this.colTrnBranchCountryId.NamedProperties.Put("LovReference", "");
            this.colTrnBranchCountryId.NamedProperties.Put("ParentName", "colsBranchId");
            this.colTrnBranchCountryId.NamedProperties.Put("ResizeableChildObject", "");
            this.colTrnBranchCountryId.NamedProperties.Put("SqlColumn", "TRN_BRANCH_API.Get_Country_Id(company_id,BRANCH_ID)");
            this.colTrnBranchCountryId.NamedProperties.Put("ValidateMethod", "");
            this.colTrnBranchCountryId.Position = 5;
            resources.ApplyResources(this.colTrnBranchCountryId, "colTrnBranchCountryId");
            // 
            // colTrnBranchAreaId
            // 
            this.colTrnBranchAreaId.MaxLength = 2000;
            this.colTrnBranchAreaId.Name = "colTrnBranchAreaId";
            this.colTrnBranchAreaId.NamedProperties.Put("EnumerateMethod", "");
            this.colTrnBranchAreaId.NamedProperties.Put("FieldFlags", "304");
            this.colTrnBranchAreaId.NamedProperties.Put("LovReference", "");
            this.colTrnBranchAreaId.NamedProperties.Put("ParentName", "colsBranchId");
            this.colTrnBranchAreaId.NamedProperties.Put("ResizeableChildObject", "");
            this.colTrnBranchAreaId.NamedProperties.Put("SqlColumn", "TRN_BRANCH_API.Get_Area_Id(company_id,BRANCH_ID)");
            this.colTrnBranchAreaId.NamedProperties.Put("ValidateMethod", "");
            this.colTrnBranchAreaId.Position = 6;
            resources.ApplyResources(this.colTrnBranchAreaId, "colTrnBranchAreaId");
            // 
            // colnOrderId
            // 
            this.colnOrderId.DataType = PPJ.Runtime.Windows.DataType.Number;
            this.colnOrderId.Name = "colnOrderId";
            this.colnOrderId.NamedProperties.Put("EnumerateMethod", "");
            this.colnOrderId.NamedProperties.Put("FieldFlags", "163");
            this.colnOrderId.NamedProperties.Put("LovReference", "");
            this.colnOrderId.NamedProperties.Put("ParentName", "[NaturalParent]");
            this.colnOrderId.NamedProperties.Put("SqlColumn", "ORDER_ID");
            this.colnOrderId.Position = 7;
            resources.ApplyResources(this.colnOrderId, "colnOrderId");
            // 
            // coldOrderDate
            // 
            this.coldOrderDate.DataType = PPJ.Runtime.Windows.DataType.DateTime;
            this.coldOrderDate.Format = "d";
            this.coldOrderDate.Name = "coldOrderDate";
            this.coldOrderDate.NamedProperties.Put("EnumerateMethod", "");
            this.coldOrderDate.NamedProperties.Put("FieldFlags", "291");
            this.coldOrderDate.NamedProperties.Put("LovReference", "");
            this.coldOrderDate.NamedProperties.Put("ParentName", "[NaturalParent]");
            this.coldOrderDate.NamedProperties.Put("SqlColumn", "ORDER_DATE");
            this.coldOrderDate.Position = 8;
            resources.ApplyResources(this.coldOrderDate, "coldOrderDate");
            // 
            // coldDeliveryDate
            // 
            this.coldDeliveryDate.DataType = PPJ.Runtime.Windows.DataType.DateTime;
            this.coldDeliveryDate.Format = "d";
            this.coldDeliveryDate.Name = "coldDeliveryDate";
            this.coldDeliveryDate.NamedProperties.Put("EnumerateMethod", "");
            this.coldDeliveryDate.NamedProperties.Put("FieldFlags", "295");
            this.coldDeliveryDate.NamedProperties.Put("LovReference", "");
            this.coldDeliveryDate.NamedProperties.Put("ParentName", "[NaturalParent]");
            this.coldDeliveryDate.NamedProperties.Put("SqlColumn", "DELIVERY_DATE");
            this.coldDeliveryDate.Position = 9;
            resources.ApplyResources(this.coldDeliveryDate, "coldDeliveryDate");
            // 
            // colsDeliveryType
            // 
            this.colsDeliveryType.MaxLength = 200;
            this.colsDeliveryType.Name = "colsDeliveryType";
            this.colsDeliveryType.NamedProperties.Put("EnumerateMethod", "TRN_ORDER_DEL_TYPE_API.Enumerate");
            this.colsDeliveryType.NamedProperties.Put("FieldFlags", "295");
            this.colsDeliveryType.NamedProperties.Put("LovReference", "");
            this.colsDeliveryType.NamedProperties.Put("ParentName", "[NaturalParent]");
            this.colsDeliveryType.NamedProperties.Put("ResizeableChildObject", "");
            this.colsDeliveryType.NamedProperties.Put("SqlColumn", "DELIVERY_TYPE");
            this.colsDeliveryType.NamedProperties.Put("ValidateMethod", "");
            this.colsDeliveryType.Position = 10;
            resources.ApplyResources(this.colsDeliveryType, "colsDeliveryType");
            // 
            // colnDiscount
            // 
            this.colnDiscount.DataType = PPJ.Runtime.Windows.DataType.Number;
            this.colnDiscount.Name = "colnDiscount";
            this.colnDiscount.NamedProperties.Put("EnumerateMethod", "");
            this.colnDiscount.NamedProperties.Put("FieldFlags", "295");
            this.colnDiscount.NamedProperties.Put("LovReference", "");
            this.colnDiscount.NamedProperties.Put("ParentName", "[NaturalParent]");
            this.colnDiscount.NamedProperties.Put("SqlColumn", "DISCOUNT");
            this.colnDiscount.Position = 11;
            resources.ApplyResources(this.colnDiscount, "colnDiscount");
            // 
            // colnCustomerId
            // 
            this.colnCustomerId.DataType = PPJ.Runtime.Windows.DataType.Number;
            this.colnCustomerId.Name = "colnCustomerId";
            this.colnCustomerId.NamedProperties.Put("EnumerateMethod", "");
            this.colnCustomerId.NamedProperties.Put("FieldFlags", "291");
            this.colnCustomerId.NamedProperties.Put("LovReference", "TRN_CUSTOMER(COMPANY_ID)");
            this.colnCustomerId.NamedProperties.Put("ParentName", "[NaturalParent]");
            this.colnCustomerId.NamedProperties.Put("ResizeableChildObject", "");
            this.colnCustomerId.NamedProperties.Put("SqlColumn", "CUSTOMER_ID");
            this.colnCustomerId.NamedProperties.Put("ValidateMethod", "");
            this.colnCustomerId.Position = 12;
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
            this.colTrnCustomerName.Position = 13;
            resources.ApplyResources(this.colTrnCustomerName, "colTrnCustomerName");
            // 
            // colTrnCustomerDiscount
            // 
            this.colTrnCustomerDiscount.MaxLength = 2000;
            this.colTrnCustomerDiscount.Name = "colTrnCustomerDiscount";
            this.colTrnCustomerDiscount.NamedProperties.Put("EnumerateMethod", "");
            this.colTrnCustomerDiscount.NamedProperties.Put("FieldFlags", "304");
            this.colTrnCustomerDiscount.NamedProperties.Put("LovReference", "");
            this.colTrnCustomerDiscount.NamedProperties.Put("ParentName", "colnCustomerId");
            this.colTrnCustomerDiscount.NamedProperties.Put("ResizeableChildObject", "");
            this.colTrnCustomerDiscount.NamedProperties.Put("SqlColumn", "TRN_CUSTOMER_API.Get_Discount(company_id,CUSTOMER_ID)");
            this.colTrnCustomerDiscount.NamedProperties.Put("ValidateMethod", "");
            this.colTrnCustomerDiscount.Position = 14;
            resources.ApplyResources(this.colTrnCustomerDiscount, "colTrnCustomerDiscount");
            // 
            // colTrnCustomerActive
            // 
            this.colTrnCustomerActive.MaxLength = 2000;
            this.colTrnCustomerActive.Name = "colTrnCustomerActive";
            this.colTrnCustomerActive.NamedProperties.Put("EnumerateMethod", "");
            this.colTrnCustomerActive.NamedProperties.Put("FieldFlags", "304");
            this.colTrnCustomerActive.NamedProperties.Put("LovReference", "");
            this.colTrnCustomerActive.NamedProperties.Put("ParentName", "colnCustomerId");
            this.colTrnCustomerActive.NamedProperties.Put("ResizeableChildObject", "");
            this.colTrnCustomerActive.NamedProperties.Put("SqlColumn", "TRN_CUSTOMER_API.Get_Active(company_id,CUSTOMER_ID)");
            this.colTrnCustomerActive.NamedProperties.Put("ValidateMethod", "");
            this.colTrnCustomerActive.Position = 15;
            resources.ApplyResources(this.colTrnCustomerActive, "colTrnCustomerActive");
            // 
            // colComments
            // 
            this.colComments.MaxLength = 2000;
            this.colComments.Name = "colComments";
            this.colComments.NamedProperties.Put("EnumerateMethod", "");
            this.colComments.NamedProperties.Put("FieldFlags", "310");
            this.colComments.NamedProperties.Put("LovReference", "");
            this.colComments.NamedProperties.Put("ParentName", "[NaturalParent]");
            this.colComments.NamedProperties.Put("ResizeableChildObject", "");
            this.colComments.NamedProperties.Put("SqlColumn", "COMMENTS");
            this.colComments.NamedProperties.Put("ValidateMethod", "");
            this.colComments.Position = 16;
            resources.ApplyResources(this.colComments, "colComments");
            // 
            // menuTbwMethods
            // 
            this.menuTbwMethods.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.menuItem_View,
            this.menuItem_View_1});
            this.menuTbwMethods.Name = "menuTbwMethods";
            resources.ApplyResources(this.menuTbwMethods, "menuTbwMethods");
            // 
            // menuItem_View
            // 
            this.menuItem_View.Command = this.menuTbwMethods_menuView_Customer_Order_Details___;
            this.menuItem_View.Name = "menuItem_View";
            resources.ApplyResources(this.menuItem_View, "menuItem_View");
            this.menuItem_View.Text = "View Customer Order Details...";
            // 
            // menuItem_View_1
            // 
            this.menuItem_View_1.Command = this.menuTbwMethods_menuView_Customer_Invoice_Details___;
            this.menuItem_View_1.Name = "menuItem_View_1";
            resources.ApplyResources(this.menuItem_View_1, "menuItem_View_1");
            this.menuItem_View_1.Text = "View Customer Invoice Details...";
            // 
            // tbwCustomerOrderOverview
            // 
            resources.ApplyResources(this, "$this");
            this.Controls.Add(this.colsCompanyId);
            this.Controls.Add(this.colsBranchId);
            this.Controls.Add(this.colTrnBranchCountryId);
            this.Controls.Add(this.colTrnBranchAreaId);
            this.Controls.Add(this.colnOrderId);
            this.Controls.Add(this.coldOrderDate);
            this.Controls.Add(this.coldDeliveryDate);
            this.Controls.Add(this.colsDeliveryType);
            this.Controls.Add(this.colnDiscount);
            this.Controls.Add(this.colnCustomerId);
            this.Controls.Add(this.colTrnCustomerName);
            this.Controls.Add(this.colTrnCustomerDiscount);
            this.Controls.Add(this.colTrnCustomerActive);
            this.Controls.Add(this.colComments);
            this.Name = "tbwCustomerOrderOverview";
            this.NamedProperties.Put("DefaultOrderBy", "");
            this.NamedProperties.Put("DefaultWhere", "COMPANY_ID = :Global.COMPANY_ID");
            this.NamedProperties.Put("LogicalUnit", "TrnCustomerOrder");
            this.NamedProperties.Put("PackageName", "TRN_CUSTOMER_ORDER_API");
            this.NamedProperties.Put("ParentName", "[NaturalParent]");
            this.NamedProperties.Put("ResizeableChildObject", "");
            this.NamedProperties.Put("SourceFlags", "449");
            this.NamedProperties.Put("ViewName", "TRN_CUSTOMER_ORDER");
            this.NamedProperties.Put("Warnings", "FALSE");
            this.Controls.SetChildIndex(this.colComments, 0);
            this.Controls.SetChildIndex(this.colTrnCustomerActive, 0);
            this.Controls.SetChildIndex(this.colTrnCustomerDiscount, 0);
            this.Controls.SetChildIndex(this.colTrnCustomerName, 0);
            this.Controls.SetChildIndex(this.colnCustomerId, 0);
            this.Controls.SetChildIndex(this.colnDiscount, 0);
            this.Controls.SetChildIndex(this.colsDeliveryType, 0);
            this.Controls.SetChildIndex(this.coldDeliveryDate, 0);
            this.Controls.SetChildIndex(this.coldOrderDate, 0);
            this.Controls.SetChildIndex(this.colnOrderId, 0);
            this.Controls.SetChildIndex(this.colTrnBranchAreaId, 0);
            this.Controls.SetChildIndex(this.colTrnBranchCountryId, 0);
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

        public Fnd.Windows.Forms.FndCommand menuTbwMethods_menuView_Customer_Order_Details___;
        public Fnd.Windows.Forms.FndCommand menuTbwMethods_menuView_Customer_Invoice_Details___;
        protected Fnd.Windows.Forms.FndContextMenuStrip menuTbwMethods;
        protected Fnd.Windows.Forms.FndToolStripMenuItem menuItem_View;
        protected Fnd.Windows.Forms.FndToolStripMenuItem menuItem_View_1;
	}
}
