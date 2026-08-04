SET VERIFY OFF
SET FEEDBACK OFF
SET SERVEROUT ON
--------------------------------------------------------------------------------
--	File: DeliveryRegistration.sql
--
--	Purpose: Call to this file is inlcuded in install.tem, therefore this file should always exist
--		 If not externally copied deliveryid.txt exists,
--		 this file will be created as dummy template
--
--------------------------------------------------------------------------------
PROMPT Delivery Registration Started.
-- [IFS COMPLETE BLOCK BEGINEND]
BEGIN
   Delivery_Registration_API.New('ifs-cloud-25.1.2-k5dkc3r-3.1.0-20250712T185122Z', '25.1.2', 'ifs-cloud-25.1.2-k5dkc3r-3.0.0-20250711T172021Z', NULL, '' );

END;
-- [END IFS COMPLETE BLOCK]
/
PROMPT Delivery Registration Finished.

SET SERVEROUT OFF
