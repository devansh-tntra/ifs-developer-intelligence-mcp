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
	
	public partial class frmOrderReservationDetail
	{
		
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.IContainer components = null;
		
		#region Window Controls
		protected SalBackgroundText labeldfsCompanyId;
		public cDataField dfsCompanyId;
		protected SalBackgroundText labeldfnReservationId;
		public cDataField dfnReservationId;
		protected SalBackgroundText labeldfnOrderId;
        public cDataField dfnOrderId;
		#endregion
		
		#region Windows Form Designer generated code
		
		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(frmOrderReservationDetail));
            this.labeldfsCompanyId = new PPJ.Runtime.Windows.SalBackgroundText();
            this.dfsCompanyId = new Ifs.Fnd.ApplicationForms.cDataField();
            this.labeldfnReservationId = new PPJ.Runtime.Windows.SalBackgroundText();
            this.dfnReservationId = new Ifs.Fnd.ApplicationForms.cDataField();
            this.labeldfnOrderId = new PPJ.Runtime.Windows.SalBackgroundText();
            this.dfnOrderId = new Ifs.Fnd.ApplicationForms.cDataField();
            this.tblItems = new Ifs.Fnd.ApplicationForms.cChildTable();
            this.tblItems_colsCompanyId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colnReservationId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colnReservationItemId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colnOrderId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colnRowNo = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colsBranchId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colnInventoryId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colnProductId = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems_colnQuantity = new Ifs.Fnd.ApplicationForms.cColumn();
            this.tblItems.SuspendLayout();
            this.SuspendLayout();
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
            this.dfsCompanyId.NamedProperties.Put("FieldFlags", "64");
            this.dfsCompanyId.NamedProperties.Put("LovReference", "TRN_COMPANY");
            this.dfsCompanyId.NamedProperties.Put("ResizeableChildObject", "");
            this.dfsCompanyId.NamedProperties.Put("SqlColumn", "COMPANY_ID");
            this.dfsCompanyId.NamedProperties.Put("ValidateMethod", "");
            // 
            // labeldfnReservationId
            // 
            resources.ApplyResources(this.labeldfnReservationId, "labeldfnReservationId");
            this.labeldfnReservationId.Name = "labeldfnReservationId";
            // 
            // dfnReservationId
            // 
            this.dfnReservationId.DataType = PPJ.Runtime.Windows.DataType.Number;
            resources.ApplyResources(this.dfnReservationId, "dfnReservationId");
            this.dfnReservationId.Name = "dfnReservationId";
            this.dfnReservationId.NamedProperties.Put("EnumerateMethod", "");
            this.dfnReservationId.NamedProperties.Put("FieldFlags", "160");
            this.dfnReservationId.NamedProperties.Put("LovReference", "");
            this.dfnReservationId.NamedProperties.Put("ResizeableChildObject", "");
            this.dfnReservationId.NamedProperties.Put("SqlColumn", "RESERVATION_ID");
            this.dfnReservationId.NamedProperties.Put("ValidateMethod", "");
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
            this.dfnOrderId.NamedProperties.Put("FieldFlags", "288");
            this.dfnOrderId.NamedProperties.Put("LovReference", "TRN_CUSTOMER_ORDER(COMPANY_ID,BRANCH_ID)");
            this.dfnOrderId.NamedProperties.Put("ResizeableChildObject", "");
            this.dfnOrderId.NamedProperties.Put("SqlColumn", "ORDER_ID");
            this.dfnOrderId.NamedProperties.Put("ValidateMethod", "");
            // 
            // tblItems
            // 
            this.tblItems.Controls.Add(this.tblItems_colsCompanyId);
            this.tblItems.Controls.Add(this.tblItems_colnReservationId);
            this.tblItems.Controls.Add(this.tblItems_colnReservationItemId);
            this.tblItems.Controls.Add(this.tblItems_colnOrderId);
            this.tblItems.Controls.Add(this.tblItems_colnRowNo);
            this.tblItems.Controls.Add(this.tblItems_colsBranchId);
            this.tblItems.Controls.Add(this.tblItems_colnInventoryId);
            this.tblItems.Controls.Add(this.tblItems_colnProductId);
            this.tblItems.Controls.Add(this.tblItems_colnQuantity);
            resources.ApplyResources(this.tblItems, "tblItems");
            this.tblItems.Name = "tblItems";
            this.tblItems.NamedProperties.Put("DefaultOrderBy", "");
            this.tblItems.NamedProperties.Put("DefaultWhere", "");
            this.tblItems.NamedProperties.Put("LogicalUnit", "TrnReservationItem");
            this.tblItems.NamedProperties.Put("PackageName", "TRN_RESERVATION_ITEM_API");
            this.tblItems.NamedProperties.Put("ResizeableChildObject", "LLRR");
            this.tblItems.NamedProperties.Put("SourceFlags", "1");
            this.tblItems.NamedProperties.Put("ViewName", "TRN_RESERVATION_ITEM");
            this.tblItems.NamedProperties.Put("Warnings", "FALSE");
            this.tblItems.Controls.SetChildIndex(this.tblItems_colnQuantity, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colnProductId, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colnInventoryId, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colsBranchId, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colnRowNo, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colnOrderId, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colnReservationItemId, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colnReservationId, 0);
            this.tblItems.Controls.SetChildIndex(this.tblItems_colsCompanyId, 0);
            // 
            // tblItems_colsCompanyId
            // 
            resources.ApplyResources(this.tblItems_colsCompanyId, "tblItems_colsCompanyId");
            this.tblItems_colsCompanyId.Name = "tblItems_colsCompanyId";
            this.tblItems_colsCompanyId.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colsCompanyId.NamedProperties.Put("FieldFlags", "64");
            this.tblItems_colsCompanyId.NamedProperties.Put("LovReference", "");
            this.tblItems_colsCompanyId.NamedProperties.Put("ResizeableChildObject", "");
            this.tblItems_colsCompanyId.NamedProperties.Put("SqlColumn", "COMPANY_ID");
            this.tblItems_colsCompanyId.NamedProperties.Put("ValidateMethod", "");
            this.tblItems_colsCompanyId.Position = 3;
            // 
            // tblItems_colnReservationId
            // 
            this.tblItems_colnReservationId.DataType = PPJ.Runtime.Windows.DataType.Number;
            resources.ApplyResources(this.tblItems_colnReservationId, "tblItems_colnReservationId");
            this.tblItems_colnReservationId.Name = "tblItems_colnReservationId";
            this.tblItems_colnReservationId.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colnReservationId.NamedProperties.Put("FieldFlags", "64");
            this.tblItems_colnReservationId.NamedProperties.Put("LovReference", "TRN_RESERVATION(COMPANY_ID)");
            this.tblItems_colnReservationId.NamedProperties.Put("ResizeableChildObject", "");
            this.tblItems_colnReservationId.NamedProperties.Put("SqlColumn", "RESERVATION_ID");
            this.tblItems_colnReservationId.NamedProperties.Put("ValidateMethod", "");
            this.tblItems_colnReservationId.Position = 4;
            // 
            // tblItems_colnReservationItemId
            // 
            this.tblItems_colnReservationItemId.DataType = PPJ.Runtime.Windows.DataType.Number;
            resources.ApplyResources(this.tblItems_colnReservationItemId, "tblItems_colnReservationItemId");
            this.tblItems_colnReservationItemId.Name = "tblItems_colnReservationItemId";
            this.tblItems_colnReservationItemId.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colnReservationItemId.NamedProperties.Put("FieldFlags", "160");
            this.tblItems_colnReservationItemId.NamedProperties.Put("LovReference", "");
            this.tblItems_colnReservationItemId.NamedProperties.Put("ResizeableChildObject", "");
            this.tblItems_colnReservationItemId.NamedProperties.Put("SqlColumn", "RESERVATION_ITEM_ID");
            this.tblItems_colnReservationItemId.NamedProperties.Put("ValidateMethod", "");
            this.tblItems_colnReservationItemId.Position = 5;
            // 
            // tblItems_colnOrderId
            // 
            this.tblItems_colnOrderId.DataType = PPJ.Runtime.Windows.DataType.Number;
            this.tblItems_colnOrderId.Name = "tblItems_colnOrderId";
            this.tblItems_colnOrderId.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colnOrderId.NamedProperties.Put("FieldFlags", "288");
            this.tblItems_colnOrderId.NamedProperties.Put("LovReference", "");
            this.tblItems_colnOrderId.NamedProperties.Put("ResizeableChildObject", "");
            this.tblItems_colnOrderId.NamedProperties.Put("SqlColumn", "ORDER_ID");
            this.tblItems_colnOrderId.NamedProperties.Put("ValidateMethod", "");
            this.tblItems_colnOrderId.Position = 6;
            resources.ApplyResources(this.tblItems_colnOrderId, "tblItems_colnOrderId");
            // 
            // tblItems_colnRowNo
            // 
            this.tblItems_colnRowNo.DataType = PPJ.Runtime.Windows.DataType.Number;
            this.tblItems_colnRowNo.Name = "tblItems_colnRowNo";
            this.tblItems_colnRowNo.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colnRowNo.NamedProperties.Put("FieldFlags", "288");
            this.tblItems_colnRowNo.NamedProperties.Put("LovReference", "TRN_CUSTOMER_ORDER_ITEM(COMPANY_ID,BRANCH_ID,ORDER_ID)");
            this.tblItems_colnRowNo.NamedProperties.Put("ResizeableChildObject", "");
            this.tblItems_colnRowNo.NamedProperties.Put("SqlColumn", "ROW_NO");
            this.tblItems_colnRowNo.NamedProperties.Put("ValidateMethod", "");
            this.tblItems_colnRowNo.Position = 7;
            resources.ApplyResources(this.tblItems_colnRowNo, "tblItems_colnRowNo");
            // 
            // tblItems_colsBranchId
            // 
            this.tblItems_colsBranchId.Name = "tblItems_colsBranchId";
            this.tblItems_colsBranchId.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colsBranchId.NamedProperties.Put("FieldFlags", "288");
            this.tblItems_colsBranchId.NamedProperties.Put("LovReference", "");
            this.tblItems_colsBranchId.NamedProperties.Put("ResizeableChildObject", "");
            this.tblItems_colsBranchId.NamedProperties.Put("SqlColumn", "BRANCH_ID");
            this.tblItems_colsBranchId.NamedProperties.Put("ValidateMethod", "");
            this.tblItems_colsBranchId.Position = 8;
            resources.ApplyResources(this.tblItems_colsBranchId, "tblItems_colsBranchId");
            // 
            // tblItems_colnInventoryId
            // 
            this.tblItems_colnInventoryId.DataType = PPJ.Runtime.Windows.DataType.Number;
            this.tblItems_colnInventoryId.Name = "tblItems_colnInventoryId";
            this.tblItems_colnInventoryId.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colnInventoryId.NamedProperties.Put("FieldFlags", "288");
            this.tblItems_colnInventoryId.NamedProperties.Put("LovReference", "");
            this.tblItems_colnInventoryId.NamedProperties.Put("ResizeableChildObject", "");
            this.tblItems_colnInventoryId.NamedProperties.Put("SqlColumn", "INVENTORY_ID");
            this.tblItems_colnInventoryId.NamedProperties.Put("ValidateMethod", "");
            this.tblItems_colnInventoryId.Position = 9;
            resources.ApplyResources(this.tblItems_colnInventoryId, "tblItems_colnInventoryId");
            // 
            // tblItems_colnProductId
            // 
            this.tblItems_colnProductId.DataType = PPJ.Runtime.Windows.DataType.Number;
            this.tblItems_colnProductId.Name = "tblItems_colnProductId";
            this.tblItems_colnProductId.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colnProductId.NamedProperties.Put("FieldFlags", "288");
            this.tblItems_colnProductId.NamedProperties.Put("LovReference", "TRN_INVENTORY_PRODUCT(COMPANY_ID,BRANCH_ID,INVENTORY_ID)");
            this.tblItems_colnProductId.NamedProperties.Put("ResizeableChildObject", "");
            this.tblItems_colnProductId.NamedProperties.Put("SqlColumn", "PRODUCT_ID");
            this.tblItems_colnProductId.NamedProperties.Put("ValidateMethod", "");
            this.tblItems_colnProductId.Position = 10;
            resources.ApplyResources(this.tblItems_colnProductId, "tblItems_colnProductId");
            // 
            // tblItems_colnQuantity
            // 
            this.tblItems_colnQuantity.DataType = PPJ.Runtime.Windows.DataType.Number;
            this.tblItems_colnQuantity.Name = "tblItems_colnQuantity";
            this.tblItems_colnQuantity.NamedProperties.Put("EnumerateMethod", "");
            this.tblItems_colnQuantity.NamedProperties.Put("FieldFlags", "288");
            this.tblItems_colnQuantity.NamedProperties.Put("LovReference", "");
            this.tblItems_colnQuantity.NamedProperties.Put("ResizeableChildObject", "");
            this.tblItems_colnQuantity.NamedProperties.Put("SqlColumn", "QUANTITY");
            this.tblItems_colnQuantity.NamedProperties.Put("ValidateMethod", "");
            this.tblItems_colnQuantity.Position = 11;
            resources.ApplyResources(this.tblItems_colnQuantity, "tblItems_colnQuantity");
            // 
            // frmOrderReservationDetail
            // 
            resources.ApplyResources(this, "$this");
            this.Controls.Add(this.tblItems);
            this.Controls.Add(this.dfnOrderId);
            this.Controls.Add(this.dfnReservationId);
            this.Controls.Add(this.dfsCompanyId);
            this.Controls.Add(this.labeldfnOrderId);
            this.Controls.Add(this.labeldfnReservationId);
            this.Controls.Add(this.labeldfsCompanyId);
            this.Name = "frmOrderReservationDetail";
            this.NamedProperties.Put("DefaultOrderBy", "");
            this.NamedProperties.Put("DefaultWhere", "");
            this.NamedProperties.Put("LogicalUnit", "TrnReservation");
            this.NamedProperties.Put("PackageName", "TRN_RESERVATION_API");
            this.NamedProperties.Put("ParentName", "[NaturalParent]");
            this.NamedProperties.Put("ResizeableChildObject", "");
            this.NamedProperties.Put("SourceFlags", "1");
            this.NamedProperties.Put("ViewName", "TRN_RESERVATION");
            this.NamedProperties.Put("Warnings", "TRUE");
            this.WindowActions += new PPJ.Runtime.Windows.WindowActionsEventHandler(this.frmOrderReservationDetail_WindowActions);
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

        public cChildTable tblItems;
        protected cColumn tblItems_colsCompanyId;
        protected cColumn tblItems_colnReservationId;
        protected cColumn tblItems_colnReservationItemId;
        protected cColumn tblItems_colnOrderId;
        protected cColumn tblItems_colnRowNo;
        protected cColumn tblItems_colsBranchId;
        protected cColumn tblItems_colnInventoryId;
        protected cColumn tblItems_colnProductId;
        protected cColumn tblItems_colnQuantity;
		
		
	}
}
