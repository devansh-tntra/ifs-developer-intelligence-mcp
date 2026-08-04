appname WorkOrder;
component TRNMWO;
layer Core;
description "Put some useful description here ...";
version 1.0.0;
clientmodel WorkOrder;

settings {
   errorhandling Server;
   pinauthentication Disabled;
   gpstracking Disabled;
   multidevice Enabled;


   notificationhub {
      connectionstring "Endpoint=sb://aurenanativenotifications.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=N2RDluUwxOtyUVDSaJ06ImveBRoRUnHvVpnIv6IObko=";
      path "AurenaNativeTraining";
   }
}

-- Add Application Parameters
-- Add securitygroups
-- Add Document Manager
