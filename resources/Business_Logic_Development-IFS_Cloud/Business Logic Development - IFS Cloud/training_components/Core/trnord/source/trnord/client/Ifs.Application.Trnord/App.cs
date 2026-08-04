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
	
	/// <summary>
	/// -------------------------------------------------------------------------
	/// 		IFS Research & Development
	/// 
	/// This program is protected by copyright law and by international
	/// conventions. All licensing, renting, lending or copying (including
	/// for private use), and all other use of the program, which is not
	/// expressively permitted by IFS Research & Development (IFS), is a
	/// violation of the rights of IFS. Such violations will be reported
	/// to the appropriate authorities.
	/// 
	/// VIOLATIONS OF ANY COPYRIGHT IS PUNISHABLE BY LAW AND CAN LEAD
	/// TO UP TO TWO YEARS OF IMPRISONMENT AND LIABILITY TO PAY DAMAGES.
	/// -------------------------------------------------------------------------
	/// Category:		IFS Application
	/// File:		Starter.app
	/// Purpose:		Foundation1 starter application file.
	/// -------------------------------------------------------------------------
	/// </summary>
	public class App : SalApplication
	{
		#region Global References
		/// <summary>
		/// Application reference to an instance of tbwCustomerOrderOverview
		/// </summary>
		[ThreadStatic]
		public static tbwCustomerOrderOverview tbwCustomerOrderOverview;
		
		/// <summary>
		/// Application reference to an instance of frmCustomerOrderDetail
		/// </summary>
		[ThreadStatic]
		public static frmCustomerOrderDetail frmCustomerOrderDetail;
		
		/// <summary>
		/// Application reference to an instance of tbwCustomerInvoiceOverview
		/// </summary>
		[ThreadStatic]
		public static tbwCustomerInvoiceOverview tbwCustomerInvoiceOverview;
		
		/// <summary>
		/// Application reference to an instance of frmCustomerInvoiceDetail
		/// </summary>
		[ThreadStatic]
		public static frmCustomerInvoiceDetail frmCustomerInvoiceDetail;
		
		/// <summary>
		/// Application reference to an instance of frmOrderReservationDetail
		/// </summary>
		[ThreadStatic]
		public static frmOrderReservationDetail frmOrderReservationDetail;
		#endregion
	}
}
