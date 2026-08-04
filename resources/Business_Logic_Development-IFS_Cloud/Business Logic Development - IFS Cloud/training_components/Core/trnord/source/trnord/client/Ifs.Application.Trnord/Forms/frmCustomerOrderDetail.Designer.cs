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
	
	public partial class frmCustomerOrderDetail
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
		protected SalBackgroundText labelccOrderId;
		public cRecListDataField ccOrderId;
		protected SalBackgroundText labeldfdOrderDate;
		public cDataField dfdOrderDate;
		protected SalBackgroundText labeldfdDeliveryDate;
		public cDataField dfdDeliveryDate;
		protected SalBackgroundText labeldfnDiscount;
		public cDataField dfnDiscount;
		protected SalBackgroundText labeldfTotalOrderValue;
		public cDataField dfTotalOrderValue;
		protected SalBackgroundText labeldfnCustomerId;
		public cDataField dfnCustomerId;
		protected SalBackgroundText labeldfTrnCustomerName;
		public cDataField dfTrnCustomerName;
		protected SalBackgroundText labeldfTrnCustomerDiscount;
		public cDataField dfTrnCustomerDiscount;
		protected SalBackgroundText labeldfTrnCustomerActive;
		public cDataField dfTrnCustomerActive;
		protected SalBackgroundText labeldfsPreferredInventory;
		public cDataField dfsPreferredInventory;
		protected SalBackgroundText labelcmbDeliveryType;
		public cComboBox cmbDeliveryType;
		protected SalBackgroundText labeldfState;
		public cDataField dfState;
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
            this.menuTblMethods_menuReserve = new Ifs.Fnd.Windows.Forms.FndCommand(this.components);
            this.menuTblMethods_menuUnReserve = new Ifs.Fnd.Windows.Forms.FndCommand(this.components);
            this.labeldfsCompanyId = new PPJ.Runtime.Windows.SalBackgroundText();
            this.dfsCompanyId = new Ifs.Fnd.ApplicationForms.cDataField();
            this.labeldfsBranchId = new PPJ.Runtime.Windows.SalBackgroundText();
            this.dfsBranchId = new Ifs.Fnd.ApplicationForms.cDataField();
            this.labelccOrderId = new PPJ.Runtime.Windows.SalBackgroundText();
            this.ccOrderId = new Ifs.Fnd.ApplicationForms.cRecListDataField();
            this.labeldfdOrderDate = new PPJ.Runtime.Windows.SalBackgroundText();
            this.dfdOrderDate = new Ifs.Fnd.ApplicationForms.cDataField();
            this.labeldfdDeliveryDate = new PPJ.Runtime.Windows.SalBackgroundText();
            this.dfdDeliveryDate = new Ifs.Fnd.ApplicationForms.cDataField();
            this.labeldfnDiscount = new PPJ.Runtime.Windows.SalBackgroundText();
            this.dfnDiscount = new Ifs.Fnd.ApplicationForms.cDataField();
            this.labeldfTotalOrderValue = new PPJ.Runtime.Windows.SalBackgroundText();
            this.dfTotalOrderValue = new Ifs.Fnd.ApplicationForms.cDataField();
            this.labeldfnCustomerId = new PPJ.Runtime.Windows.SalBackgroundText();
            this.dfnCustomerId = new Ifs.Fnd.ApplicationForms.cDataField();
            this.labeldfTrnCustomerName = new PPJ.Runtime.Windows.SalBackgroundText();
            this.dfTrnCustomerName = new Ifs.Fnd.ApplicationForms.cDataField();
            this.labeldfTrnCustomerDiscount = new PPJ.Runtime.Windows.SalBackgroundText();
            this.dfTrnCustomerDiscount = new Ifs.Fnd.ApplicationForms.cDataField();
            this.labeldfTrnCustomerActive = new PPJ.Runtime.Windows.SalBackgroundText();
            this.dfTrnCustomerActive = new Ifs.Fnd.ApplicationForms.cDataField();
            this.labeldfsPreferredInventory = new PPJ.Runtime.Windows.SalBackgroundText();
            this.dfsPreferredInventory = new Ifs.Fnd.ApplicationForms.cDataField();
            this.labelcmbDeliveryType = new PPJ.Runtime.Windows.SalBackgroundText();
            this.cmbDeliveryType = new Ifs.Fnd.ApplicationForms.cComboBox();
            this.labeldfState = new PPJ.Runtime.Windows.SalBackgroundText();
            this.dfState = new Ifs.Fnd.ApplicationForms.cDataField();
            this.labelmlComments = new PPJ.Runtime.Windows.SalBackgroundText();
            this.mlComments = new Ifs.Fnd.ApplicationForms.cMultilineField();
            this.contextMenu = new Ifs.Fnd.Windows.Forms.FndContextMenuStrip(this.components);
            this.tsMenuItem4 = new Ifs.Fnd.Windows.Forms.FndToolStripMenuItem(this.components);
            this.commandViewRes = new Ifs.Fnd.Windows.Forms.FndCommand(this.components);
            this.tsMenuItemClose = new Ifs.Fnd.Windows.Forms.FndToolStripMenuItem(this.components);
            this.menuTblMethods = new Ifs.Fnd.Windows.Forms.FndContextMenuStrip(this.components);
            this.menuItem_Reserve = new Ifs.Fnd.Windows.Forms.FndToolStripMenuItem(this.components);
            this.menuItem_UnReserve = new Ifs.Fnd.Windows.Forms.FndToolStripMenuItem(this.components);
            this.tblItems = new Ifs.Fnd.ApplicationForms.cChildTable();
            this.tblItems___colObjstate = new PPJ.Runtime.Windows.SalTableColumn();
            this.tblItems___colObjevents = new PPJ.Runtime.Windows.SalTableColumn();
            this.tblItems_colsCompanyId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colsBranchId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colnOrderId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colnRowNo = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colnProductId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colTrnProductBrandId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colTrnProductCategoryId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colTrnProductModelId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colDescription = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colnPrice = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colnQuantity = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colTrnProductUnit = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colnAmount = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colState = new Ifs.Fnd.ApplicationForms.cColumn();
            this.contextMenu.SuspendLayout();
            this.tblItems.SuspendLayout();
            this.SuspendLayout();
            // 
            // commandManager
            // 
            this.commandManager.Commands.Add(this.commandViewRes);
            this.commandManager.ContextMenus.Add(this.contextMenu);
            // 
            // menuTblMethods_menuReserve
            // 
            this.menuTblMethods_menuReserve.Caption = "Reserve";
            this.menuTblMethods_menuReserve.Name = "menuTblMethods_menuReserve";
            this.menuTblMethods_menuReserve.Execute += new Ifs.Fnd.Windows.Forms.FndCommandExecuteHandler(this.menuItem_Reserve_Execute);
            this.menuTblMethods_menuReserve.Inquire += new Ifs.Fnd.Windows.Forms.FndCommandInquireHandler(this.menuItem_Reserve_Inquire);
            // 
            // menuTblMethods_menuUnReserve
            // 
            this.menuTblMethods_menuUnReserve.Caption = "UnReserve";
            this.menuTblMethods_menuUnReserve.Name = "menuTblMethods_menuUnReserve";
            this.menuTblMethods_menuUnReserve.Execute += new Ifs.Fnd.Windows.Forms.FndCommandExecuteHandler(this.menuItem_UnReserve_Execute);
            this.menuTblMethods_menuUnReserve.Inquire += new Ifs.Fnd.Windows.Forms.FndCommandInquireHandler(this.menuItem_UnReserve_Inquire);
            // 
            // labeldfsCompanyId
            // 
            this.labeldfsCompanyId.AutoSize = true;
            this.labeldfsCompanyId.Font = new System.Drawing.Font("Tahoma", 8.25F);
            this.labeldfsCompanyId.Location = new System.Drawing.Point(141, 14);
            this.labeldfsCompanyId.Name = "labeldfsCompanyId";
            this.labeldfsCompanyId.Size = new System.Drawing.Size(69, 13);
            this.labeldfsCompanyId.TabIndex = 0;
            this.labeldfsCompanyId.Text = "Company Id:";
            this.labeldfsCompanyId.Visible = false;
            // 
            // dfsCompanyId
            // 
            this.dfsCompanyId.Location = new System.Drawing.Point(144, 14);
            this.dfsCompanyId.MaxLength = 20;
            this.dfsCompanyId.Name = "dfsCompanyId";
            this.dfsCompanyId.NamedProperties.Put("EnumerateMethod", "");
            this.dfsCompanyId.NamedProperties.Put("FieldFlags", "67");
            this.dfsCompanyId.NamedProperties.Put("LovReference", "");
            this.dfsCompanyId.NamedProperties.Put("SqlColumn", "COMPANY_ID");
            this.dfsCompanyId.Size = new System.Drawing.Size(90, 21);
            this.dfsCompanyId.TabIndex = 1;
            this.dfsCompanyId.Visible = false;
            // 
            // labeldfsBranchId
            // 
            this.labeldfsBranchId.AutoSize = true;
            this.labeldfsBranchId.Font = new System.Drawing.Font("Tahoma", 8.25F);
            this.labeldfsBranchId.Location = new System.Drawing.Point(9, 8);
            this.labeldfsBranchId.Name = "labeldfsBranchId";
            this.labeldfsBranchId.Size = new System.Drawing.Size(57, 13);
            this.labeldfsBranchId.TabIndex = 2;
            this.labeldfsBranchId.Text = "Branch Id:";
            // 
            // dfsBranchId
            // 
            this.dfsBranchId.Location = new System.Drawing.Point(12, 25);
            this.dfsBranchId.MaxLength = 20;
            this.dfsBranchId.Name = "dfsBranchId";
            this.dfsBranchId.NamedProperties.Put("EnumerateMethod", "");
            this.dfsBranchId.NamedProperties.Put("FieldFlags", "67");
            this.dfsBranchId.NamedProperties.Put("LovReference", "TRN_BRANCH(COMPANY_ID)");
            this.dfsBranchId.NamedProperties.Put("ResizeableChildObject", "");
            this.dfsBranchId.NamedProperties.Put("SqlColumn", "BRANCH_ID");
            this.dfsBranchId.NamedProperties.Put("ValidateMethod", "");
            this.dfsBranchId.Size = new System.Drawing.Size(120, 21);
            this.dfsBranchId.TabIndex = 3;
            // 
            // labelccOrderId
            // 
            this.labelccOrderId.AutoSize = true;
            this.labelccOrderId.Font = new System.Drawing.Font("Tahoma", 8.25F);
            this.labelccOrderId.Location = new System.Drawing.Point(147, 8);
            this.labelccOrderId.Name = "labelccOrderId";
            this.labelccOrderId.Size = new System.Drawing.Size(52, 13);
            this.labelccOrderId.TabIndex = 4;
            this.labelccOrderId.Text = "Order Id:";
            // 
            // ccOrderId
            // 
            this.ccOrderId.Location = new System.Drawing.Point(150, 25);
            this.ccOrderId.Name = "ccOrderId";
            this.ccOrderId.NamedProperties.Put("DataType", "3");
            this.ccOrderId.NamedProperties.Put("EnumerateMethod", "");
            this.ccOrderId.NamedProperties.Put("FieldFlags", "163");
            this.ccOrderId.NamedProperties.Put("LovReference", "");
            this.ccOrderId.NamedProperties.Put("ResizeableChildObject", "");
            this.ccOrderId.NamedProperties.Put("SqlColumn", "ORDER_ID");
            this.ccOrderId.NamedProperties.Put("ValidateMethod", "");
            this.ccOrderId.NamedProperties.Put("XDataLength", "");
            this.ccOrderId.TabIndex = 5;
            this.ccOrderId.WindowActions += new PPJ.Runtime.Windows.WindowActionsEventHandler(this.ccOrderId_WindowActions);
            // 
            // labeldfdOrderDate
            // 
            this.labeldfdOrderDate.AutoSize = true;
            this.labeldfdOrderDate.Font = new System.Drawing.Font("Tahoma", 8.25F);
            this.labeldfdOrderDate.Location = new System.Drawing.Point(285, 8);
            this.labeldfdOrderDate.Name = "labeldfdOrderDate";
            this.labeldfdOrderDate.Size = new System.Drawing.Size(65, 13);
            this.labeldfdOrderDate.TabIndex = 6;
            this.labeldfdOrderDate.Text = "Order Date:";
            // 
            // dfdOrderDate
            // 
            this.dfdOrderDate.DataType = PPJ.Runtime.Windows.DataType.DateTime;
            this.dfdOrderDate.Format = "d";
            this.dfdOrderDate.Location = new System.Drawing.Point(288, 25);
            this.dfdOrderDate.Name = "dfdOrderDate";
            this.dfdOrderDate.NamedProperties.Put("EnumerateMethod", "");
            this.dfdOrderDate.NamedProperties.Put("FieldFlags", "291");
            this.dfdOrderDate.NamedProperties.Put("LovReference", "");
            this.dfdOrderDate.NamedProperties.Put("SqlColumn", "ORDER_DATE");
            this.dfdOrderDate.Size = new System.Drawing.Size(120, 21);
            this.dfdOrderDate.TabIndex = 7;
            // 
            // labeldfdDeliveryDate
            // 
            this.labeldfdDeliveryDate.AutoSize = true;
            this.labeldfdDeliveryDate.Font = new System.Drawing.Font("Tahoma", 8.25F);
            this.labeldfdDeliveryDate.Location = new System.Drawing.Point(423, 8);
            this.labeldfdDeliveryDate.Name = "labeldfdDeliveryDate";
            this.labeldfdDeliveryDate.Size = new System.Drawing.Size(76, 13);
            this.labeldfdDeliveryDate.TabIndex = 8;
            this.labeldfdDeliveryDate.Text = "Delivery Date:";
            // 
            // dfdDeliveryDate
            // 
            this.dfdDeliveryDate.DataType = PPJ.Runtime.Windows.DataType.DateTime;
            this.dfdDeliveryDate.Format = "d";
            this.dfdDeliveryDate.Location = new System.Drawing.Point(426, 25);
            this.dfdDeliveryDate.Name = "dfdDeliveryDate";
            this.dfdDeliveryDate.NamedProperties.Put("EnumerateMethod", "");
            this.dfdDeliveryDate.NamedProperties.Put("FieldFlags", "295");
            this.dfdDeliveryDate.NamedProperties.Put("LovReference", "");
            this.dfdDeliveryDate.NamedProperties.Put("SqlColumn", "DELIVERY_DATE");
            this.dfdDeliveryDate.Size = new System.Drawing.Size(120, 21);
            this.dfdDeliveryDate.TabIndex = 9;
            // 
            // labeldfnDiscount
            // 
            this.labeldfnDiscount.AutoSize = true;
            this.labeldfnDiscount.Font = new System.Drawing.Font("Tahoma", 8.25F);
            this.labeldfnDiscount.Location = new System.Drawing.Point(561, 8);
            this.labeldfnDiscount.Name = "labeldfnDiscount";
            this.labeldfnDiscount.Size = new System.Drawing.Size(52, 13);
            this.labeldfnDiscount.TabIndex = 10;
            this.labeldfnDiscount.Text = "Discount:";
            // 
            // dfnDiscount
            // 
            this.dfnDiscount.DataType = PPJ.Runtime.Windows.DataType.Number;
            this.dfnDiscount.Location = new System.Drawing.Point(564, 25);
            this.dfnDiscount.Name = "dfnDiscount";
            this.dfnDiscount.NamedProperties.Put("EnumerateMethod", "");
            this.dfnDiscount.NamedProperties.Put("FieldFlags", "295");
            this.dfnDiscount.NamedProperties.Put("LovReference", "");
            this.dfnDiscount.NamedProperties.Put("SqlColumn", "DISCOUNT");
            this.dfnDiscount.Size = new System.Drawing.Size(120, 21);
            this.dfnDiscount.TabIndex = 11;
            // 
            // labeldfTotalOrderValue
            // 
            this.labeldfTotalOrderValue.AutoSize = true;
            this.labeldfTotalOrderValue.Font = new System.Drawing.Font("Tahoma", 8.25F);
            this.labeldfTotalOrderValue.Location = new System.Drawing.Point(699, 8);
            this.labeldfTotalOrderValue.Name = "labeldfTotalOrderValue";
            this.labeldfTotalOrderValue.Size = new System.Drawing.Size(95, 13);
            this.labeldfTotalOrderValue.TabIndex = 12;
            this.labeldfTotalOrderValue.Text = "Total Order Value:";
            // 
            // dfTotalOrderValue
            // 
            this.dfTotalOrderValue.DataType = PPJ.Runtime.Windows.DataType.Number;
            this.dfTotalOrderValue.Location = new System.Drawing.Point(702, 25);
            this.dfTotalOrderValue.Name = "dfTotalOrderValue";
            this.dfTotalOrderValue.NamedProperties.Put("EnumerateMethod", "");
            this.dfTotalOrderValue.NamedProperties.Put("FieldFlags", "288");
            this.dfTotalOrderValue.NamedProperties.Put("LovReference", "");
            this.dfTotalOrderValue.NamedProperties.Put("ResizeableChildObject", "");
            this.dfTotalOrderValue.NamedProperties.Put("SqlColumn", "ORDER_TOTAL");
            this.dfTotalOrderValue.NamedProperties.Put("ValidateMethod", "");
            this.dfTotalOrderValue.Size = new System.Drawing.Size(120, 21);
            this.dfTotalOrderValue.TabIndex = 13;
            // 
            // labeldfnCustomerId
            // 
            this.labeldfnCustomerId.AutoSize = true;
            this.labeldfnCustomerId.Font = new System.Drawing.Font("Tahoma", 8.25F);
            this.labeldfnCustomerId.Location = new System.Drawing.Point(9, 59);
            this.labeldfnCustomerId.Name = "labeldfnCustomerId";
            this.labeldfnCustomerId.Size = new System.Drawing.Size(70, 13);
            this.labeldfnCustomerId.TabIndex = 14;
            this.labeldfnCustomerId.Text = "Customer Id:";
            // 
            // dfnCustomerId
            // 
            this.dfnCustomerId.DataType = PPJ.Runtime.Windows.DataType.Number;
            this.dfnCustomerId.Location = new System.Drawing.Point(12, 76);
            this.dfnCustomerId.Name = "dfnCustomerId";
            this.dfnCustomerId.NamedProperties.Put("EnumerateMethod", "");
            this.dfnCustomerId.NamedProperties.Put("FieldFlags", "291");
            this.dfnCustomerId.NamedProperties.Put("LovReference", "TRN_EXTERNAL_CUSTOMER(COMPANY_ID)");
            this.dfnCustomerId.NamedProperties.Put("ParentName", "ccOrderId");
            this.dfnCustomerId.NamedProperties.Put("ResizeableChildObject", "");
            this.dfnCustomerId.NamedProperties.Put("SqlColumn", "CUSTOMER_ID");
            this.dfnCustomerId.NamedProperties.Put("ValidateMethod", "");
            this.dfnCustomerId.Size = new System.Drawing.Size(120, 21);
            this.dfnCustomerId.TabIndex = 15;
            // 
            // labeldfTrnCustomerName
            // 
            this.labeldfTrnCustomerName.AutoSize = true;
            this.labeldfTrnCustomerName.Font = new System.Drawing.Font("Tahoma", 8.25F);
            this.labeldfTrnCustomerName.Location = new System.Drawing.Point(147, 59);
            this.labeldfTrnCustomerName.Name = "labeldfTrnCustomerName";
            this.labeldfTrnCustomerName.Size = new System.Drawing.Size(38, 13);
            this.labeldfTrnCustomerName.TabIndex = 16;
            this.labeldfTrnCustomerName.Text = "Name:";
            // 
            // dfTrnCustomerName
            // 
            this.dfTrnCustomerName.Location = new System.Drawing.Point(150, 76);
            this.dfTrnCustomerName.MaxLength = 2000;
            this.dfTrnCustomerName.Name = "dfTrnCustomerName";
            this.dfTrnCustomerName.NamedProperties.Put("EnumerateMethod", "");
            this.dfTrnCustomerName.NamedProperties.Put("FieldFlags", "304");
            this.dfTrnCustomerName.NamedProperties.Put("LovReference", "");
            this.dfTrnCustomerName.NamedProperties.Put("ParentName", "dfnCustomerId");
            this.dfTrnCustomerName.NamedProperties.Put("ResizeableChildObject", "");
            this.dfTrnCustomerName.NamedProperties.Put("SqlColumn", "TRN_CUSTOMER_API.Get_Name(company_id,CUSTOMER_ID)");
            this.dfTrnCustomerName.NamedProperties.Put("ValidateMethod", "");
            this.dfTrnCustomerName.Size = new System.Drawing.Size(396, 21);
            this.dfTrnCustomerName.TabIndex = 17;
            // 
            // labeldfTrnCustomerDiscount
            // 
            this.labeldfTrnCustomerDiscount.AutoSize = true;
            this.labeldfTrnCustomerDiscount.Font = new System.Drawing.Font("Tahoma", 8.25F);
            this.labeldfTrnCustomerDiscount.Location = new System.Drawing.Point(9, 109);
            this.labeldfTrnCustomerDiscount.Name = "labeldfTrnCustomerDiscount";
            this.labeldfTrnCustomerDiscount.Size = new System.Drawing.Size(52, 13);
            this.labeldfTrnCustomerDiscount.TabIndex = 18;
            this.labeldfTrnCustomerDiscount.Text = "Discount:";
            // 
            // dfTrnCustomerDiscount
            // 
            this.dfTrnCustomerDiscount.DataType = PPJ.Runtime.Windows.DataType.Number;
            this.dfTrnCustomerDiscount.Location = new System.Drawing.Point(12, 126);
            this.dfTrnCustomerDiscount.Name = "dfTrnCustomerDiscount";
            this.dfTrnCustomerDiscount.NamedProperties.Put("EnumerateMethod", "");
            this.dfTrnCustomerDiscount.NamedProperties.Put("FieldFlags", "304");
            this.dfTrnCustomerDiscount.NamedProperties.Put("LovReference", "");
            this.dfTrnCustomerDiscount.NamedProperties.Put("ParentName", "dfnCustomerId");
            this.dfTrnCustomerDiscount.NamedProperties.Put("ResizeableChildObject", "");
            this.dfTrnCustomerDiscount.NamedProperties.Put("SqlColumn", "TRN_CUSTOMER_API.Get_Discount(company_id,CUSTOMER_ID)");
            this.dfTrnCustomerDiscount.NamedProperties.Put("ValidateMethod", "");
            this.dfTrnCustomerDiscount.Size = new System.Drawing.Size(90, 21);
            this.dfTrnCustomerDiscount.TabIndex = 19;
            // 
            // labeldfTrnCustomerActive
            // 
            this.labeldfTrnCustomerActive.AutoSize = true;
            this.labeldfTrnCustomerActive.Font = new System.Drawing.Font("Tahoma", 8.25F);
            this.labeldfTrnCustomerActive.Location = new System.Drawing.Point(129, 109);
            this.labeldfTrnCustomerActive.Name = "labeldfTrnCustomerActive";
            this.labeldfTrnCustomerActive.Size = new System.Drawing.Size(41, 13);
            this.labeldfTrnCustomerActive.TabIndex = 20;
            this.labeldfTrnCustomerActive.Text = "Active:";
            // 
            // dfTrnCustomerActive
            // 
            this.dfTrnCustomerActive.Location = new System.Drawing.Point(132, 126);
            this.dfTrnCustomerActive.MaxLength = 2000;
            this.dfTrnCustomerActive.Name = "dfTrnCustomerActive";
            this.dfTrnCustomerActive.NamedProperties.Put("EnumerateMethod", "");
            this.dfTrnCustomerActive.NamedProperties.Put("FieldFlags", "304");
            this.dfTrnCustomerActive.NamedProperties.Put("LovReference", "");
            this.dfTrnCustomerActive.NamedProperties.Put("ParentName", "dfnCustomerId");
            this.dfTrnCustomerActive.NamedProperties.Put("ResizeableChildObject", "");
            this.dfTrnCustomerActive.NamedProperties.Put("SqlColumn", "TRN_CUSTOMER_API.Get_Active(company_id,CUSTOMER_ID)");
            this.dfTrnCustomerActive.NamedProperties.Put("ValidateMethod", "");
            this.dfTrnCustomerActive.Size = new System.Drawing.Size(90, 21);
            this.dfTrnCustomerActive.TabIndex = 21;
            // 
            // labeldfsPreferredInventory
            // 
            this.labeldfsPreferredInventory.AutoSize = true;
            this.labeldfsPreferredInventory.Font = new System.Drawing.Font("Tahoma", 8.25F);
            this.labeldfsPreferredInventory.Location = new System.Drawing.Point(9, 160);
            this.labeldfsPreferredInventory.Name = "labeldfsPreferredInventory";
            this.labeldfsPreferredInventory.Size = new System.Drawing.Size(151, 13);
            this.labeldfsPreferredInventory.TabIndex = 22;
            this.labeldfsPreferredInventory.Text = "Preferred Inventory Location:";
            // 
            // dfsPreferredInventory
            // 
            this.dfsPreferredInventory.Location = new System.Drawing.Point(12, 176);
            this.dfsPreferredInventory.MaxLength = 2000;
            this.dfsPreferredInventory.Name = "dfsPreferredInventory";
            this.dfsPreferredInventory.NamedProperties.Put("EnumerateMethod", "");
            this.dfsPreferredInventory.NamedProperties.Put("FieldFlags", "304");
            this.dfsPreferredInventory.NamedProperties.Put("LovReference", "");
            this.dfsPreferredInventory.NamedProperties.Put("ParentName", "dfnCustomerId");
            this.dfsPreferredInventory.NamedProperties.Put("ResizeableChildObject", "");
            this.dfsPreferredInventory.NamedProperties.Put("SqlColumn", "Trn_External_Customer_API.Get_Preferred_Inventory_Id(COMPANY_ID, CUSTOMER_ID)");
            this.dfsPreferredInventory.NamedProperties.Put("ValidateMethod", "");
            this.dfsPreferredInventory.Size = new System.Drawing.Size(210, 21);
            this.dfsPreferredInventory.TabIndex = 23;
            // 
            // labelcmbDeliveryType
            // 
            this.labelcmbDeliveryType.AutoSize = true;
            this.labelcmbDeliveryType.Font = new System.Drawing.Font("Tahoma", 8.25F);
            this.labelcmbDeliveryType.Location = new System.Drawing.Point(561, 59);
            this.labelcmbDeliveryType.Name = "labelcmbDeliveryType";
            this.labelcmbDeliveryType.Size = new System.Drawing.Size(77, 13);
            this.labelcmbDeliveryType.TabIndex = 24;
            this.labelcmbDeliveryType.Text = "Delivery Type:";
            // 
            // cmbDeliveryType
            // 
            this.cmbDeliveryType.Location = new System.Drawing.Point(564, 76);
            this.cmbDeliveryType.MaxLength = 200;
            this.cmbDeliveryType.Name = "cmbDeliveryType";
            this.cmbDeliveryType.NamedProperties.Put("EnumerateMethod", "TRN_ORDER_DEL_TYPE_API.Enumerate");
            this.cmbDeliveryType.NamedProperties.Put("FieldFlags", "295");
            this.cmbDeliveryType.NamedProperties.Put("LovReference", "");
            this.cmbDeliveryType.NamedProperties.Put("ResizeableChildObject", "");
            this.cmbDeliveryType.NamedProperties.Put("SqlColumn", "DELIVERY_TYPE");
            this.cmbDeliveryType.NamedProperties.Put("ValidateMethod", "");
            this.cmbDeliveryType.Size = new System.Drawing.Size(120, 21);
            this.cmbDeliveryType.TabIndex = 25;
            // 
            // labeldfState
            // 
            this.labeldfState.AutoSize = true;
            this.labeldfState.Font = new System.Drawing.Font("Tahoma", 8.25F);
            this.labeldfState.Location = new System.Drawing.Point(699, 59);
            this.labeldfState.Name = "labeldfState";
            this.labeldfState.Size = new System.Drawing.Size(37, 13);
            this.labeldfState.TabIndex = 26;
            this.labeldfState.Text = "State:";
            // 
            // dfState
            // 
            this.dfState.Location = new System.Drawing.Point(702, 76);
            this.dfState.MaxLength = 4000;
            this.dfState.Name = "dfState";
            this.dfState.NamedProperties.Put("EnumerateMethod", "");
            this.dfState.NamedProperties.Put("FieldFlags", "304");
            this.dfState.NamedProperties.Put("LovReference", "");
            this.dfState.NamedProperties.Put("ParentName", "ccOrderId");
            this.dfState.NamedProperties.Put("ResizeableChildObject", "");
            this.dfState.NamedProperties.Put("SqlColumn", "STATE");
            this.dfState.NamedProperties.Put("ValidateMethod", "");
            this.dfState.Size = new System.Drawing.Size(120, 21);
            this.dfState.TabIndex = 27;
            // 
            // labelmlComments
            // 
            this.labelmlComments.AutoSize = true;
            this.labelmlComments.Font = new System.Drawing.Font("Tahoma", 8.25F);
            this.labelmlComments.Location = new System.Drawing.Point(261, 109);
            this.labelmlComments.Name = "labelmlComments";
            this.labelmlComments.Size = new System.Drawing.Size(61, 13);
            this.labelmlComments.TabIndex = 28;
            this.labelmlComments.Text = "Comments:";
            // 
            // mlComments
            // 
            this.mlComments.Location = new System.Drawing.Point(264, 126);
            this.mlComments.MaxLength = 2000;
            this.mlComments.Name = "mlComments";
            this.mlComments.NamedProperties.Put("EnumerateMethod", "");
            this.mlComments.NamedProperties.Put("FieldFlags", "310");
            this.mlComments.NamedProperties.Put("LovReference", "");
            this.mlComments.NamedProperties.Put("ParentName", "[NaturalParent]");
            this.mlComments.NamedProperties.Put("ResizeableChildObject", "LLRL");
            this.mlComments.NamedProperties.Put("SqlColumn", "COMMENTS");
            this.mlComments.NamedProperties.Put("ValidateMethod", "");
            this.mlComments.ScrollBars = System.Windows.Forms.ScrollBars.Vertical;
            this.mlComments.Size = new System.Drawing.Size(558, 71);
            this.mlComments.TabIndex = 29;
            this.mlComments.WordWrap = true;
            // 
            // contextMenu
            // 
            this.contextMenu.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.tsMenuItem4});
            this.contextMenu.Name = "contextMenu1";
            this.contextMenu.Size = new System.Drawing.Size(169, 26);
            // 
            // tsMenuItem4
            // 
            this.tsMenuItem4.Command = this.commandViewRes;
            this.tsMenuItem4.Name = "tsMenuItem4";
            this.tsMenuItem4.Size = new System.Drawing.Size(168, 22);
            this.tsMenuItem4.Text = "View Reservations";
            // 
            // commandViewRes
            // 
            this.commandViewRes.Caption = "View Reservations";
            this.commandViewRes.Name = "commandViewRes";
            this.commandViewRes.Execute += new Ifs.Fnd.Windows.Forms.FndCommandExecuteHandler(this.commandViewRes_Execute);
            this.commandViewRes.Inquire += new Ifs.Fnd.Windows.Forms.FndCommandInquireHandler(this.commandViewRes_Inquire);
            // 
            // tsMenuItemClose
            // 
            this.tsMenuItemClose.Name = "tsMenuItemClose";
            this.tsMenuItemClose.Size = new System.Drawing.Size(173, 22);
            this.tsMenuItemClose.Text = "Close";
            // 
            // menuTblMethods
            // 
            this.menuTblMethods.Name = "menuTblMethods";
            this.menuTblMethods.Size = new System.Drawing.Size(61, 4);
            // 
            // menuItem_Reserve
            // 
            this.menuItem_Reserve.Name = "menuItem_Reserve";
            // 
            // menuItem_UnReserve
            // 
            this.menuItem_UnReserve.Name = "menuItem_UnReserve";
            // 
            // tblItems
            // 
            this.tblItems.Controls.Add(this.tblItems___colObjstate);
            this.tblItems.Controls.Add(this.tblItems___colObjevents);
            this.tblItems.Controls.Add(this.tblItems_colsCompanyId);
            this.tblItems.Controls.Add(this.tblItems_colsBranchId);
            this.tblItems.Controls.Add(this.tblItems_colnOrderId);
            this.tblItems.Controls.Add(this.tblItems_colnRowNo);
            this.tblItems.Controls.Add(this.tblItems_colnProductId);
            this.tblItems.Controls.Add(this.tblItems_colTrnProductBrandId);
            this.tblItems.Controls.Add(this.tblItems_colTrnProductCategoryId);
            this.tblItems.Controls.Add(this.tblItems_colTrnProductModelId);
            this.tblItems.Controls.Add(this.tblItems_colDescription);
            this.tblItems.Controls.Add(this.tblItems_colnPrice);
            this.tblItems.Controls.Add(this.tblItems_colnQuantity);
            this.tblItems.Controls.Add(this.tblItems_colTrnProductUnit);
            this.tblItems.Controls.Add(this.tblItems_colnAmount);
            this.tblItems.Controls.Add(this.tblItems_colState);
            this.tblItems.Location = new System.Drawing.Point(12, 210);
            this.tblItems.Name = "tblItems";
            this.tblItems.NamedProperties.Put("DefaultOrderBy", "");
            this.tblItems.NamedProperties.Put("DefaultWhere", "");
            this.tblItems.NamedProperties.Put("LogicalUnit", "TrnCustomerOrderItem");
            this.tblItems.NamedProperties.Put("PackageName", "TRN_CUSTOMER_ORDER_ITEM_API");
            this.tblItems.NamedProperties.Put("ResizeableChildObject", "LLRR");
            this.tblItems.NamedProperties.Put("SourceFlags", "8641");
            this.tblItems.NamedProperties.Put("ViewName", "TRN_CUSTOMER_ORDER_ITEM");
            this.tblItems.NamedProperties.Put("Warnings", "FALSE");
            this.tblItems.Size = new System.Drawing.Size(810, 168);
            this.tblItems.TabIndex = 30;
            this.tblItems.Controls.SetChildIndex(this.tblItems_colState, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colnAmount, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colTrnProductUnit, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colnQuantity, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colnPrice, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colDescription, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colTrnProductModelId, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colTrnProductCategoryId, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colTrnProductBrandId, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colnProductId, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colnRowNo, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colnOrderId, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colsBranchId, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colsCompanyId, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems___colObjevents, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems___colObjstate, 0);
            // 
            // tblItems___colObjstate
            // 
            this.tblItems___colObjstate.Enabled = false;
            this.tblItems___colObjstate.Name = "tblItems___colObjstate";
            this.tblItems___colObjstate.Position = 3;
            this.tblItems___colObjstate.Title = "(Untitled)";
            this.tblItems___colObjstate.Visible = false;
            this.tblItems___colObjstate.WindowActions += new PPJ.Runtime.Windows.WindowActionsEventHandler(this.tblItems_colObjstate_WindowActions);
            // 
            // tblItems___colObjevents
            // 
            this.tblItems___colObjevents.Enabled = false;
            this.tblItems___colObjevents.Name = "tblItems___colObjevents";
            this.tblItems___colObjevents.Position = 4;
            this.tblItems___colObjevents.Title = "(Untitled)";
            this.tblItems___colObjevents.Visible = false;
            this.tblItems___colObjevents.WindowActions += new PPJ.Runtime.Windows.WindowActionsEventHandler(this.tblItems_colObjevents_WindowActions);
            // 
            // tblItems_colsCompanyId
            // 
            this.tblItems_colsCompanyId.Enabled = false;
            this.tblItems_colsCompanyId.Name = "tblItems_colsCompanyId";
            this.tblItems_colsCompanyId.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colsCompanyId.NamedProperties.Put("FieldFlags", "67");
            this.tblItems_colsCompanyId.NamedProperties.Put("LovReference", "");
            this.tblItems_colsCompanyId.NamedProperties.Put("SqlColumn", "COMPANY_ID");
            this.tblItems_colsCompanyId.Position = 5;
            this.tblItems_colsCompanyId.Title = "Company Id";
            this.tblItems_colsCompanyId.Visible = false;
            // 
            // tblItems_colsBranchId
            // 
            this.tblItems_colsBranchId.Enabled = false;
            this.tblItems_colsBranchId.Name = "tblItems_colsBranchId";
            this.tblItems_colsBranchId.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colsBranchId.NamedProperties.Put("FieldFlags", "67");
            this.tblItems_colsBranchId.NamedProperties.Put("LovReference", "");
            this.tblItems_colsBranchId.NamedProperties.Put("SqlColumn", "BRANCH_ID");
            this.tblItems_colsBranchId.Position = 6;
            this.tblItems_colsBranchId.Title = "Branch Id";
            this.tblItems_colsBranchId.Visible = false;
            // 
            // tblItems_colnOrderId
            // 
            this.tblItems_colnOrderId.DataType = PPJ.Runtime.Windows.DataType.Number;
            this.tblItems_colnOrderId.Enabled = false;
            this.tblItems_colnOrderId.Name = "tblItems_colnOrderId";
            this.tblItems_colnOrderId.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colnOrderId.NamedProperties.Put("FieldFlags", "67");
            this.tblItems_colnOrderId.NamedProperties.Put("LovReference", "TRN_CUSTOMER_ORDER(COMPANY_ID,BRANCH_ID)");
            this.tblItems_colnOrderId.NamedProperties.Put("ResizeableChildObject", "");
            this.tblItems_colnOrderId.NamedProperties.Put("SqlColumn", "ORDER_ID");
            this.tblItems_colnOrderId.NamedProperties.Put("ValidateMethod", "");
            this.tblItems_colnOrderId.Position = 7;
            this.tblItems_colnOrderId.Title = "Order Id";
            this.tblItems_colnOrderId.Visible = false;
            // 
            // tblItems_colnRowNo
            // 
            this.tblItems_colnRowNo.DataType = PPJ.Runtime.Windows.DataType.Number;
            this.tblItems_colnRowNo.Enabled = false;
            this.tblItems_colnRowNo.Name = "tblItems_colnRowNo";
            this.tblItems_colnRowNo.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colnRowNo.NamedProperties.Put("FieldFlags", "163");
            this.tblItems_colnRowNo.NamedProperties.Put("LovReference", "");
            this.tblItems_colnRowNo.NamedProperties.Put("SqlColumn", "ROW_NO");
            this.tblItems_colnRowNo.Position = 8;
            this.tblItems_colnRowNo.Title = "Row No";
            this.tblItems_colnRowNo.Visible = false;
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
            this.tblItems_colnProductId.Position = 9;
            this.tblItems_colnProductId.Title = "Product Id";
            this.tblItems_colnProductId.WindowActions += new PPJ.Runtime.Windows.WindowActionsEventHandler(this.tblItems_colnProductId_WindowActions);
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
            this.tblItems_colTrnProductBrandId.Position = 10;
            this.tblItems_colTrnProductBrandId.Title = "Brand Id";
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
            this.tblItems_colTrnProductCategoryId.Position = 11;
            this.tblItems_colTrnProductCategoryId.Title = "Category Id";
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
            this.tblItems_colTrnProductModelId.Position = 12;
            this.tblItems_colTrnProductModelId.Title = "Model Id";
            // 
            // tblItems_colDescription
            // 
            this.tblItems_colDescription.Name = "tblItems_colDescription";
            this.tblItems_colDescription.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colDescription.NamedProperties.Put("FieldFlags", "310");
            this.tblItems_colDescription.NamedProperties.Put("LovReference", "");
            this.tblItems_colDescription.NamedProperties.Put("SqlColumn", "DESCRIPTION");
            this.tblItems_colDescription.Position = 13;
            this.tblItems_colDescription.Title = "Description";
            this.tblItems_colDescription.Width = 100;
            // 
            // tblItems_colnPrice
            // 
            this.tblItems_colnPrice.DataType = PPJ.Runtime.Windows.DataType.Number;
            this.tblItems_colnPrice.Name = "tblItems_colnPrice";
            this.tblItems_colnPrice.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colnPrice.NamedProperties.Put("FieldFlags", "295");
            this.tblItems_colnPrice.NamedProperties.Put("LovReference", "");
            this.tblItems_colnPrice.NamedProperties.Put("SqlColumn", "PRICE");
            this.tblItems_colnPrice.Position = 14;
            this.tblItems_colnPrice.Title = "Price";
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
            this.tblItems_colnQuantity.Position = 15;
            this.tblItems_colnQuantity.Title = "Quantity";
            this.tblItems_colnQuantity.WindowActions += new PPJ.Runtime.Windows.WindowActionsEventHandler(this.tblItems_colnQuantity_WindowActions);
            // 
            // tblItems_colTrnProductUnit
            // 
            this.tblItems_colTrnProductUnit.Name = "tblItems_colTrnProductUnit";
            this.tblItems_colTrnProductUnit.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colTrnProductUnit.NamedProperties.Put("FieldFlags", "304");
            this.tblItems_colTrnProductUnit.NamedProperties.Put("LovReference", "");
            this.tblItems_colTrnProductUnit.NamedProperties.Put("ParentName", "tblItems.tblItems_colnProductId");
            this.tblItems_colTrnProductUnit.NamedProperties.Put("ResizeableChildObject", "");
            this.tblItems_colTrnProductUnit.NamedProperties.Put("SqlColumn", "TRN_PRODUCT_API.Get_Unit(company_id,PRODUCT_ID)");
            this.tblItems_colTrnProductUnit.NamedProperties.Put("ValidateMethod", "");
            this.tblItems_colTrnProductUnit.Position = 16;
            this.tblItems_colTrnProductUnit.Title = "Unit";
            // 
            // tblItems_colnAmount
            // 
            this.tblItems_colnAmount.DataType = PPJ.Runtime.Windows.DataType.Number;
            this.tblItems_colnAmount.Name = "tblItems_colnAmount";
            this.tblItems_colnAmount.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colnAmount.NamedProperties.Put("FieldFlags", "292");
            this.tblItems_colnAmount.NamedProperties.Put("LovReference", "");
            this.tblItems_colnAmount.NamedProperties.Put("ResizeableChildObject", "");
            this.tblItems_colnAmount.NamedProperties.Put("SqlColumn", "AMOUNT");
            this.tblItems_colnAmount.NamedProperties.Put("ValidateMethod", "");
            this.tblItems_colnAmount.Position = 17;
            this.tblItems_colnAmount.Title = "Amount";
            // 
            // tblItems_colState
            // 
            this.tblItems_colState.Name = "tblItems_colState";
            this.tblItems_colState.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colState.NamedProperties.Put("FieldFlags", "310");
            this.tblItems_colState.NamedProperties.Put("LovReference", "");
            this.tblItems_colState.NamedProperties.Put("SqlColumn", "STATE");
            this.tblItems_colState.Position = 18;
            this.tblItems_colState.Title = "State";
            // 
            // frmCustomerOrderDetail
            // 
            this.ClientSize = new System.Drawing.Size(838, 390);
            this.ContextMenuStrip = this.contextMenu;
            this.Controls.Add(this.tblItems);
            this.Controls.Add(this.mlComments);
            this.Controls.Add(this.dfState);
            this.Controls.Add(this.cmbDeliveryType);
            this.Controls.Add(this.dfsPreferredInventory);
            this.Controls.Add(this.dfTrnCustomerActive);
            this.Controls.Add(this.dfTrnCustomerDiscount);
            this.Controls.Add(this.dfTrnCustomerName);
            this.Controls.Add(this.dfnCustomerId);
            this.Controls.Add(this.dfTotalOrderValue);
            this.Controls.Add(this.dfnDiscount);
            this.Controls.Add(this.dfdDeliveryDate);
            this.Controls.Add(this.dfdOrderDate);
            this.Controls.Add(this.ccOrderId);
            this.Controls.Add(this.dfsBranchId);
            this.Controls.Add(this.dfsCompanyId);
            this.Controls.Add(this.labelmlComments);
            this.Controls.Add(this.labeldfState);
            this.Controls.Add(this.labelcmbDeliveryType);
            this.Controls.Add(this.labeldfsPreferredInventory);
            this.Controls.Add(this.labeldfTrnCustomerActive);
            this.Controls.Add(this.labeldfTrnCustomerDiscount);
            this.Controls.Add(this.labeldfTrnCustomerName);
            this.Controls.Add(this.labeldfnCustomerId);
            this.Controls.Add(this.labeldfTotalOrderValue);
            this.Controls.Add(this.labeldfnDiscount);
            this.Controls.Add(this.labeldfdDeliveryDate);
            this.Controls.Add(this.labeldfdOrderDate);
            this.Controls.Add(this.labelccOrderId);
            this.Controls.Add(this.labeldfsBranchId);
            this.Controls.Add(this.labeldfsCompanyId);
            this.Name = "frmCustomerOrderDetail";
            this.NamedProperties.Put("DefaultOrderBy", "");
            this.NamedProperties.Put("DefaultWhere", "COMPANY_ID = :Global.COMPANY_ID");
            this.NamedProperties.Put("LogicalUnit", "TrnCustomerOrder");
            this.NamedProperties.Put("PackageName", "TRN_CUSTOMER_ORDER_API");
            this.NamedProperties.Put("ParentName", "[NaturalParent]");
            this.NamedProperties.Put("ResizeableChildObject", "");
            this.NamedProperties.Put("SourceFlags", "8641");
            this.NamedProperties.Put("ViewName", "TRN_CUSTOMER_ORDER");
            this.NamedProperties.Put("Warnings", "TRUE");
            this.contextMenu.ResumeLayout(false);
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

        protected Ifs.Fnd.Windows.Forms.FndContextMenuStrip contextMenu;
        protected Ifs.Fnd.Windows.Forms.FndCommand commandViewRes;
        protected Ifs.Fnd.Windows.Forms.FndToolStripMenuItem tsMenuItem4;
        protected Ifs.Fnd.Windows.Forms.FndToolStripMenuItem tsMenuItemClose;
		
		

        public Fnd.Windows.Forms.FndCommand menuTblMethods_menuReserve;
        public Fnd.Windows.Forms.FndCommand menuTblMethods_menuUnReserve;
        protected Fnd.Windows.Forms.FndContextMenuStrip menuTblMethods;
        protected Fnd.Windows.Forms.FndToolStripMenuItem menuItem_Reserve;
        protected Fnd.Windows.Forms.FndToolStripMenuItem menuItem_UnReserve;
        public cChildTable tblItems;
        protected SalTableColumn tblItems___colObjstate;
        protected SalTableColumn tblItems___colObjevents;
        protected cColumn tblItems_colsCompanyId;
        protected cColumn tblItems_colsBranchId;
        protected cColumn tblItems_colnOrderId;
        protected cColumn tblItems_colnRowNo;
        protected cColumn tblItems_colnProductId;
        protected cColumn tblItems_colTrnProductBrandId;
        protected cColumn tblItems_colTrnProductCategoryId;
        protected cColumn tblItems_colTrnProductModelId;
        protected cColumn tblItems_colDescription;
        protected cColumn tblItems_colnPrice;
        protected cColumn tblItems_colnQuantity;
        protected cColumn tblItems_colTrnProductUnit;
        protected cColumn tblItems_colnAmount;
        protected cColumn tblItems_colState;
	}
}
