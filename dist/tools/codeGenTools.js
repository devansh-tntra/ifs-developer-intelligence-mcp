import { z } from 'zod';
import { MARBLE_ENTITY_TEMPLATE, MARBLE_PROJECTION_TEMPLATE, MARBLE_CLIENT_TEMPLATE, PLSQL_PACKAGE_TEMPLATE } from '../knowledge/ifsPatterns.js';
export const codeGenTools = [
    {
        name: 'generate_plsql',
        description: 'Generate standard IFS PL/SQL business logic procedure or function block.',
        parameters: z.object({
            luName: z.string().describe('Logical Unit name (e.g. CustomerOrder)'),
            methodName: z.string().describe('Method name (e.g. Validate_Order)'),
            description: z.string().describe('Business logic requirements')
        }),
        execute: async (args) => {
            return {
                code: `
-----------------------------------------------------------------------------
-- Procedure: ${args.methodName}
-- LU:        ${args.luName}
-- Purpose:   ${args.description}
-----------------------------------------------------------------------------
PROCEDURE ${args.methodName} (
   key_ref_ IN VARCHAR2 )
IS
   lu_name_ CONSTANT VARCHAR2(30) := '${args.luName}';
BEGIN
   -- IFS Standard Validation Block
   IF key_ref_ IS NULL THEN
      Error_SYS.Record_General(lu_name_, 'NULLKEY: Key reference cannot be null.');
   END IF;

   -- Implement business logic for: ${args.description}
   NULL;
END ${args.methodName};
`
            };
        }
    },
    {
        name: 'generate_package',
        description: 'Generate complete IFS PL/SQL package header (*.api) and body (*.apy).',
        parameters: z.object({
            luName: z.string().describe('Logical Unit name (e.g. EquipmentMaintenance)'),
            component: z.string().describe('IFS Component code (e.g. EQUIP)'),
            tableName: z.string().describe('Oracle table name (e.g. EQUIPMENT_MAINTENANCE_TAB)')
        }),
        execute: async (args) => {
            const lu_key_var = `${args.luName.toLowerCase()}_id`;
            const body = PLSQL_PACKAGE_TEMPLATE
                .replace(/\{LuName\}/g, args.luName)
                .replace(/\{Component\}/g, args.component)
                .replace(/\{TableName\}/g, args.tableName)
                .replace(/\{lu_key_var\}/g, lu_key_var);
            return {
                luName: args.luName,
                packageHeader: `CREATE OR REPLACE PACKAGE ${args.luName}_API IS\n  PROCEDURE Approve_Record (${lu_key_var}_ IN VARCHAR2);\nEND ${args.luName}_API;\n/`,
                packageBody: body
            };
        }
    },
    {
        name: 'generate_cursor',
        description: 'Generate performance-optimized PL/SQL cursor with explicit FETCH loop.',
        parameters: z.object({
            cursorName: z.string().describe('Cursor name (e.g. get_pending_orders)'),
            tableName: z.string().describe('Table or view name'),
            whereClause: z.string().describe('WHERE condition')
        }),
        execute: async (args) => {
            return {
                code: `
CURSOR ${args.cursorName} IS
   SELECT rowid, state, created_date
     FROM ${args.tableName}
    WHERE ${args.whereClause};

FOR rec_ IN ${args.cursorName} LOOP
   -- Process record
   NULL;
END LOOP;
`
            };
        }
    },
    {
        name: 'generate_trigger',
        description: 'Generate Oracle table trigger adhering to IFS standards.',
        parameters: z.object({
            tableName: z.string().describe('Table name'),
            triggerName: z.string().describe('Trigger name')
        }),
        execute: async (args) => {
            return {
                code: `
CREATE OR REPLACE TRIGGER ${args.triggerName}
BEFORE INSERT OR UPDATE ON ${args.tableName}
FOR EACH ROW
BEGIN
   IF INSERTING THEN
      :new.rowversion := sysdate;
      :new.rowkey := sys_guid();
   ELSIF UPDATING THEN
      :new.rowversion := sysdate;
   END IF;
END ${args.triggerName};
/
`
            };
        }
    },
    {
        name: 'generate_function',
        description: 'Generate IFS PL/SQL getter or utility function.',
        parameters: z.object({
            functionName: z.string().describe('Function name (e.g. Get_State)'),
            returnType: z.string().describe('PL/SQL return type (e.g. VARCHAR2, NUMBER)')
        }),
        execute: async (args) => {
            return {
                code: `
FUNCTION ${args.functionName} (
   key_id_ IN VARCHAR2 ) RETURN ${args.returnType}
IS
   temp_ ${args.returnType};
BEGIN
   -- IFS Implementation
   RETURN temp_;
EXCEPTION
   WHEN no_data_found THEN
      RETURN NULL;
END ${args.functionName};
`
            };
        }
    },
    {
        name: 'generate_view',
        description: 'Generate IFS LU view (*.views) definition with column prompts and flags.',
        parameters: z.object({
            viewName: z.string().describe('View name (e.g. CUSTOMER_ORDER_JOIN)'),
            tableName: z.string().describe('Base table name')
        }),
        execute: async (args) => {
            return {
                code: `
-----------------------------------------------------------------------------
-- View: ${args.viewName}
-----------------------------------------------------------------------------

VIEW ${args.viewName} IS
   Prompt = '${args.viewName}'
SELECT
   order_no                       order_no,
   description                    description,
   rowkey                         objkey,
   to_char(rowversion,'YYYYMMDDHH24MISS') objversion,
   rowid                          objid
FROM ${args.tableName};
`
            };
        }
    },
    {
        name: 'generate_storage',
        description: 'Generate IFS static storage DDL file (*.storage).',
        parameters: z.object({
            tableName: z.string().describe('Table name (e.g. WORK_ORDER_CUSTOM_TAB)')
        }),
        execute: async (args) => {
            return {
                code: `
-----------------------------------------------------------------------------
-- Block: ${args.tableName}
-----------------------------------------------------------------------------

TABLE ${args.tableName} IS (
   order_id                       VARCHAR2(30)     NOT NULL,
   description                    VARCHAR2(200)    NULL,
   rowversion                     DATE             NOT NULL,
   rowkey                         VARCHAR2(50)     DEFAULT sys_guid() NOT NULL
);

PRIMARY KEY ${args.tableName}_PK IS ${args.tableName} (order_id);
`
            };
        }
    },
    {
        name: 'generate_entity',
        description: 'Generate IFS Marble DSL entity definition file (*.entity).',
        parameters: z.object({
            entityName: z.string().describe('Entity name (e.g. CustomerOrder)'),
            component: z.string().describe('Component name (e.g. ORDER)'),
            tableName: z.string().describe('Table name (e.g. CUSTOMER_ORDER_TAB)')
        }),
        execute: async (args) => {
            return {
                content: MARBLE_ENTITY_TEMPLATE
                    .replace(/\{EntityName\}/g, args.entityName)
                    .replace(/\{Component\}/g, args.component)
                    .replace(/\{TableName\}/g, args.tableName)
            };
        }
    },
    {
        name: 'generate_projection',
        description: 'Generate IFS Marble DSL OData projection file (*.projection).',
        parameters: z.object({
            projectionName: z.string().describe('Projection name (e.g. CustomerOrderHandling)'),
            component: z.string().describe('Component name'),
            entityName: z.string().describe('Main Entity name')
        }),
        execute: async (args) => {
            return {
                content: MARBLE_PROJECTION_TEMPLATE
                    .replace(/\{ProjectionName\}/g, args.projectionName)
                    .replace(/\{Component\}/g, args.component)
                    .replace(/\{EntityName\}/g, args.entityName)
            };
        }
    },
    {
        name: 'generate_page',
        description: 'Generate IFS Marble DSL Aurena client file (*.client / *.page).',
        parameters: z.object({
            clientName: z.string().describe('Client file name'),
            component: z.string().describe('Component name'),
            projectionName: z.string().describe('Target projection name'),
            entityName: z.string().describe('Target entity name')
        }),
        execute: async (args) => {
            return {
                content: MARBLE_CLIENT_TEMPLATE
                    .replace(/\{ClientName\}/g, args.clientName)
                    .replace(/\{Component\}/g, args.component)
                    .replace(/\{ProjectionName\}/g, args.projectionName)
                    .replace(/\{EntityName\}/g, args.entityName)
            };
        }
    },
    {
        name: 'generate_report',
        description: 'Generate IFS Operational Report dataset RDF skeleton.',
        parameters: z.object({
            reportName: z.string().describe('Report name (e.g. CUSTOMER_ORDER_REP)')
        }),
        execute: async (args) => {
            return {
                code: `
-----------------------------------------------------------------------------
-- Report RDF: ${args.reportName}
-----------------------------------------------------------------------------
DEFINE RESULT_TABLE = "INFO_SERVICES_RPT"
DEFINE RAWVIEW      = "INFO_SERVICES_RPV"
DEFINE VIEW         = "${args.reportName}"
DEFINE METHOD       = "${args.reportName}_API.Execute_Report"

PROCEDURE Execute_Report (
   report_attr_    IN VARCHAR2,
   parameter_attr_ IN VARCHAR2 )
IS
BEGIN
   -- IFS Report Data Assembler
   NULL;
END Execute_Report;
`
            };
        }
    },
    {
        name: 'generate_marble',
        description: 'Generate full Marble DSL suite (Entity, Projection, Client Page).',
        parameters: z.object({
            modelName: z.string().describe('Model name (e.g. AssetTrack)'),
            component: z.string().describe('Component (e.g. ASSET)')
        }),
        execute: async (args) => {
            return {
                entityFile: `${args.modelName}.entity`,
                projectionFile: `${args.modelName}Handling.projection`,
                clientFile: `${args.modelName}Handling.client`
            };
        }
    },
    {
        name: 'generate_sql',
        description: 'Generate Oracle DDL / DML SQL script for IFS database migration.',
        parameters: z.object({
            scriptType: z.string().describe('Script type e.g. "CREATE TABLE", "INSERT DML"'),
            tableName: z.string().describe('Table name')
        }),
        execute: async (args) => {
            return {
                sql: `-- IFS Migration SQL Script for ${args.tableName}\n-- Type: ${args.scriptType}\nPROMPT Executing DDL for ${args.tableName}...`
            };
        }
    },
    {
        name: 'generate_lov',
        description: 'Generate List of Values (LOV) definition for Marble UI.',
        parameters: z.object({
            lovName: z.string().describe('LOV selector name'),
            entityName: z.string().describe('Source entity')
        }),
        execute: async (args) => {
            return {
                code: `
selector ${args.lovName} for ${args.entityName} {
   static Code;
   static Description;
}
`
            };
        }
    },
    {
        name: 'generate_custom_field',
        description: 'Generate custom field PL/SQL evaluation expression or SQL view extension.',
        parameters: z.object({
            fieldName: z.string().describe('Custom field name'),
            dataType: z.string().describe('Data type (Text, Number, Date)')
        }),
        execute: async (args) => {
            return {
                customFieldConfig: {
                    attributeName: args.fieldName,
                    dataType: args.dataType,
                    expression: `CF_${args.fieldName.toUpperCase()}_API.Get_Value(v.objkey)`
                }
            };
        }
    },
    {
        name: 'generate_projection_action',
        description: 'Generate Projection action definition and PL/SQL body bound handler.',
        parameters: z.object({
            actionName: z.string().describe('Action name (e.g. ReleaseOrder)'),
            projectionName: z.string().describe('Projection name')
        }),
        execute: async (args) => {
            return {
                projectionDef: `action ${args.actionName} {\n   initialcheck implementation;\n   parameter KeyRef Text;\n}`,
                plsqlHandler: `PROCEDURE ${args.actionName}___ (key_ref_ IN VARCHAR2) IS\nBEGIN\n   NULL;\nEND ${args.actionName}___;`
            };
        }
    },
    {
        name: 'generate_client_command',
        description: 'Generate Aurena command definition with confirm dialog and call action.',
        parameters: z.object({
            commandName: z.string().describe('Command name (e.g. CancelOrderCommand)')
        }),
        execute: async (args) => {
            return {
                code: `
command ${args.commandName} for CustomerOrder {
   label = "Cancel Order";
   enabled = [State != "Cancelled"];
   execute {
      confirm("Are you sure you want to cancel this order?") {
         when OK {
            call CancelOrder(OrderNo);
            success("Order cancelled successfully.");
         }
      }
   }
}
`
            };
        }
    },
    {
        name: 'generate_rest_api',
        description: 'Generate cURL or OData REST API request payload for an IFS Projection.',
        parameters: z.object({
            projectionName: z.string().describe('Projection name'),
            entitySet: z.string().describe('EntitySet name')
        }),
        execute: async (args) => {
            return {
                endpoint: `/main/ifsadmin/projection/v1/${args.projectionName}.svc/${args.entitySet}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer <token>'
                },
                sampleBody: {
                    Description: 'New Record Created via REST'
                }
            };
        }
    }
];
//# sourceMappingURL=codeGenTools.js.map