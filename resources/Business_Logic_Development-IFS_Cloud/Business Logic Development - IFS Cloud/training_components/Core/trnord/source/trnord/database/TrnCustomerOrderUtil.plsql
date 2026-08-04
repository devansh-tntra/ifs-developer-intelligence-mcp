-----------------------------------------------------------------------------
--
--  Logical unit: TrnCustomerOrderUtil
--  Component:    TRNORD
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


-------------------- LU SPECIFIC PRIVATE METHODS ----------------------------


-------------------- LU SPECIFIC PROTECTED METHODS --------------------------


-------------------- LU SPECIFIC PUBLIC METHODS -----------------------------

FUNCTION Calculate_Total_For_Customer (
   company_id_ IN VARCHAR2,
   customer_id_ IN NUMBER ) RETURN NUMBER
IS
   total_ NUMBER;
   CURSOR get_cust_total IS
      SELECT SUM(oi.amount)
      FROM   Trn_Customer_Order_TAB o,
             Trn_Customer_Order_Item_TAB oi
      WHERE  o.company_id = oi.company_id
      AND o.branch_id = oi.branch_id
      AND o.order_id = oi.order_id
      AND o.customer_id = customer_id_
      AND o.company_id = company_id_;
BEGIN
   OPEN get_cust_total;
   FETCH get_cust_total INTO total_;
   CLOSE get_cust_total;
   RETURN (NVL(total_,0));
END Calculate_Total_For_Customer;



PROCEDURE Get_Top_Customers (
   order_amounts_ OUT VARCHAR2,
   customer_labels_ OUT VARCHAR2,
   items_ IN NUMBER DEFAULT 6 )
IS
   default_company_id_ VARCHAR2(20) := User_Profile_Sys.Get_Default('COMPANY_ID', USER);

   CURSOR top_customers_cur IS
      WITH
         customer_total AS
            (SELECT a.customer_id,
                    SUM(b.amount) Order_total
             FROM trn_customer_order_tab a,
                  trn_customer_order_item_tab b
             WHERE to_char(a.order_date,'yyyy')=to_char(SYSDATE,'yyyy')
             AND a.company_id = b.company_id
             AND a.branch_id = b.branch_id
             AND a.order_id = b.order_id
             AND a.company_id = default_company_id_
             GROUP BY a.customer_id),
         all_rank AS
            (SELECT customer_id, Order_total
             FROM customer_total
             ORDER BY order_total desc)
      SELECT customer_id, Order_total
      FROM all_rank
      WHERE ROWNUM < items_;

BEGIN
   

   FOR rec_ IN top_customers_cur LOOP
      customer_labels_ := customer_labels_ || TO_CHAR(rec_.customer_id) || Client_SYS.field_separator_;
      order_amounts_ := order_amounts_ || TO_CHAR(rec_.Order_total) || Client_SYS.field_separator_;
   END LOOP;
END Get_Top_Customers;

PROCEDURE Get_Top_Products (
   order_quantity_ OUT VARCHAR2,
   product_label_ OUT VARCHAR2,
   items_ IN NUMBER DEFAULT 6 )
IS
      default_company_id_ VARCHAR2(20) := User_Profile_Sys.Get_Default('COMPANY_ID', USER);

      CURSOR top_products_cur IS
      WITH
         product_total AS
            (SELECT oi.product_id Product_id,
                    SUM(oi.quantity) Order_quantity
             FROM trn_customer_order_item oi,
                  trn_customer_order_tab o
             WHERE to_char(o.order_date,'yyyy')=to_char(SYSDATE,'yyyy')
                   AND oi.order_id=o.order_id
                   AND oi.company_id= o.company_id
                   AND oi.branch_id=o.branch_id
                   AND o.company_id=default_company_id_
             GROUP BY product_id),
         all_rank AS
            (SELECT Product_id, Order_quantity
             FROM product_total
             ORDER BY Order_quantity desc)
      SELECT Product_id, Order_quantity
      FROM all_rank
      WHERE ROWNUM<items_;


BEGIN

   
   FOR rec_ IN top_products_cur LOOP
      product_label_ := product_label_ || TO_CHAR(rec_.Product_id) || Client_SYS.field_separator_;
      order_quantity_ := order_quantity_ || TO_CHAR(rec_.Order_quantity) || Client_SYS.field_separator_;
   END LOOP;

END Get_Top_Products;

   
PROCEDURE Get_Top_Branches (
   order_amounts_ OUT VARCHAR2,
   branch_label_ OUT VARCHAR2,
   items_ IN NUMBER DEFAULT 6 )
IS
   default_company_id_ VARCHAR2(20) := User_Profile_Sys.Get_Default('COMPANY_ID', USER);

   CURSOR top_branches_cur IS
      WITH
         branch_total AS
            (SELECT a.branch_id,
                    SUM(b.amount) Order_total
             FROM trn_customer_order_tab a,
                  trn_customer_order_item_tab b
             WHERE to_char(a.order_date,'yyyy')=to_char(SYSDATE,'yyyy')
             AND a.company_id = b.company_id
             AND a.branch_id = b.branch_id
             AND a.order_id = b.order_id
             AND a.company_id=default_company_id_      
             GROUP BY a.branch_id),
         all_rank AS
            (SELECT branch_id, Order_total
             FROM branch_total
             ORDER BY Order_total desc)
      SELECT branch_id, Order_total
      FROM all_rank
      WHERE ROWNUM <items_;

BEGIN

 

   FOR rec_ IN top_branches_cur LOOP
      branch_label_ := branch_label_ || TO_CHAR(rec_.branch_id) || Client_SYS.field_separator_;
      order_amounts_ := order_amounts_ || TO_CHAR(rec_.Order_total) || Client_SYS.field_separator_;
   END LOOP;

END Get_Top_Branches;


   
FUNCTION Get_Country_Total (
   order_amounts_ OUT VARCHAR2,
   country_label_ OUT VARCHAR2 ) RETURN NUMBER
IS
   count_   NUMBER:=0;
   default_company_id_ VARCHAR2(20) := User_Profile_Sys.Get_Default('COMPANY_ID', USER);

   CURSOR country_order_total_cur IS
         SELECT b.country_id Country_id ,SUM(order_total) Order_total
         FROM trn_customer_order o,
              trn_branch_tab b
         WHERE o.branch_id = b.branch_id
            AND to_char(o.order_date,'yyyy')=to_char(SYSDATE,'yyyy')
            AND Country_id IN
                     (SELECT DISTINCT country_id FROM trn_branch)
            AND b.company_id = default_company_id_
         GROUP BY Country_id
         ORDER BY Order_total desc;

BEGIN

  

   FOR rec_ IN country_order_total_cur LOOP
      country_label_ := country_label_ || TO_CHAR(rec_.Country_id) || Client_SYS.field_separator_;
      order_amounts_ := order_amounts_ || TO_CHAR(rec_.Order_total) || Client_SYS.field_separator_;
      count_ := count_+1;
   END LOOP;
   
   RETURN count_;

END Get_Country_Total;


   
FUNCTION Get_Total_Order_Monthly (
   time_label_ OUT VARCHAR2,
   order_amounts_ OUT VARCHAR2,
   year_ IN VARCHAR2 ) RETURN NUMBER
IS
   count_   NUMBER:=0;
   default_company_id_ VARCHAR2(20) := User_Profile_Sys.Get_Default('COMPANY_ID', USER);

   CURSOR total_order_monthly_cur IS
      WITH
         sales AS
            (SELECT 'JAN' Time_period, 0 Order_total FROM dual UNION ALL
             SELECT 'FEB' Time_period, 0 Order_total FROM dual UNION ALL
             SELECT 'MAR' Time_period, 0 Order_total FROM dual UNION ALL
             SELECT 'APR' Time_period, 0 Order_total FROM dual UNION ALL
             SELECT 'MAY' Time_period, 0 Order_total FROM dual UNION ALL
             SELECT 'JUN' Time_period, 0 Order_total FROM dual UNION ALL
             SELECT 'JUL' Time_period, 0 Order_total FROM dual UNION ALL
             SELECT 'AUG' Time_period, 0 Order_total FROM dual UNION ALL
             SELECT 'SEP' Time_period, 0 Order_total FROM dual UNION ALL
             SELECT 'OCT' Time_period, 0 Order_total FROM dual UNION ALL
             SELECT 'NOV' Time_period, 0 Order_total FROM dual UNION ALL
             SELECT 'DEC' Time_period, 0 Order_total FROM dual UNION ALL
             SELECT UPPER(To_Char(a.order_date,'mon')) Time_period,
                    SUM(b.amount) Order_total
             FROM trn_customer_order_tab a,
                  trn_customer_order_item_tab b
             WHERE to_char(order_date,'yyyy')= year_
             AND a.company_id = b.company_id
             AND a.branch_id = b.branch_id
             AND a.order_id = b.order_id
             AND a.company_id= default_company_id_
             GROUP BY UPPER(To_Char(a.order_date,'mon'))),
         monthly_sales AS
            (SELECT Time_period, 
                    SUM(Order_total) Order_total
             FROM sales
             GROUP BY Time_period)
      SELECT Time_period, Order_total
      FROM monthly_sales
      ORDER BY TO_DATE(LOWER(Time_period), 'mon');

BEGIN
   

   FOR rec_ IN total_order_monthly_cur LOOP
        time_label_ := time_label_ || TO_CHAR(rec_.Time_period) || Client_SYS.field_separator_;
        order_amounts_ := order_amounts_ || TO_CHAR(rec_.Order_total) || Client_SYS.field_separator_;
        count_ := count_+1;
   END LOOP;

   RETURN count_;
END Get_Total_Order_Monthly;


   
FUNCTION Get_Total_Order_Annually (
   time_label_ OUT VARCHAR2,
   order_amounts_ OUT VARCHAR2 ) RETURN NUMBER
IS
   count_   NUMBER:=0;
   default_company_id_ VARCHAR2(20) := User_Profile_Sys.Get_Default('COMPANY_ID', USER);

   CURSOR total_order_annually_cur IS
      SELECT To_Char(a.order_date,'yyyy') 
             Time_period,SUM(b.amount) Order_total
      FROM trn_customer_order_tab a,
           trn_customer_order_item_tab b
      WHERE a.company_id = b.company_id
      AND a.branch_id = b.branch_id
      AND a.order_id = b.order_id  
      AND a.company_id=default_company_id_
      GROUP BY To_Char(order_date,'yyyy')
      ORDER BY To_Char(order_date,'yyyy');
BEGIN
   

   FOR rec_ IN total_order_annually_cur LOOP
         time_label_ := time_label_ || TO_CHAR(rec_.Time_period) || Client_SYS.field_separator_;
         order_amounts_ := order_amounts_ || TO_CHAR(rec_.Order_total) || Client_SYS.field_separator_;
         count_ := count_+1;
   END LOOP;

   RETURN count_;
END Get_Total_Order_Annually;


   
PROCEDURE Get_Year_Enum (
   year_ OUT VARCHAR2 )
IS
   all_years_   VARCHAR2(2000);
   default_company_id_ VARCHAR2(20) := User_Profile_Sys.Get_Default('COMPANY_ID', USER);

   CURSOR get_order_year_cur IS
      SELECT DISTINCT to_char(order_date,'yyyy')Year
      FROM trn_customer_order_tab
      WHERE company_id = default_company_id_
      ORDER BY Year;
BEGIN
   

   FOR rec_ IN get_order_year_cur LOOP
      all_years_ := all_years_ || rec_.Year || '^';
   END LOOP;

   year_ := Domain_SYS.Enumerate_(all_years_);
END Get_Year_Enum;
