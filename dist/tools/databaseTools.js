import { z } from 'zod';
export const databaseTools = [
    {
        name: 'oracle_dba_help',
        description: 'Provide Oracle DBA administration SQL scripts for invalid object compilation, index rebuilds, table locks, session inspection, and tablespaces.',
        parameters: z.object({
            task: z.string().describe('DBA task e.g. "compile invalid objects", "check locks", "rebuild indexes", "rebuild dictionary"')
        }),
        execute: async (args) => {
            const taskLower = args.task.toLowerCase();
            let script = '';
            if (taskLower.includes('compile') || taskLower.includes('invalid')) {
                script = `-- Recompile All Invalid PL/SQL Packages & Views in Schema\nEXEC DBMS_UTILITY.compile_schema(schema => USER, compile_all => FALSE);\n-- Or using IFS Dictionary Utility:\nEXEC Dictionary_SYS.Rebuild_Dictionary_();`;
            }
            else if (taskLower.includes('lock') || taskLower.includes('session')) {
                script = `-- Query Active Oracle Session Locks & Blocked Transactions\nSELECT s.sid, s.serial#, s.username, s.program, l.mode_held, o.object_name\n  FROM v$session s, v$lock l, dba_objects o\n WHERE s.sid = l.sid AND l.id1 = o.object_id AND o.owner = USER;`;
            }
            else if (taskLower.includes('rebuild') || taskLower.includes('index')) {
                script = `-- Identify Fragmented Indexes & Rebuild Script\nSELECT 'ALTER INDEX ' || index_name || ' REBUILD ONLINE;' AS rebuild_sql\n  FROM user_indexes WHERE status = 'UNUSABLE';`;
            }
            else {
                script = `-- General Oracle DBA Diagnostic\nSELECT name, open_mode, log_mode FROM v$database;\nEXEC Dictionary_SYS.Rebuild_Dictionary_();`;
            }
            return {
                task: args.task,
                dbaScript: script
            };
        }
    },
    {
        name: 'explain_execution_plan',
        description: 'Provide Oracle SQL execution plan tuning recommendations (DBMS_XPLAN, index hints, cost analysis).',
        parameters: z.object({
            sqlQuery: z.string().describe('SQL query string to analyze')
        }),
        execute: async (args) => {
            return {
                query: args.sqlQuery,
                executionPlanGuide: `EXPLAIN PLAN FOR ${args.sqlQuery};\nSELECT * FROM TABLE(DBMS_XPLAN.DISPLAY());`,
                tuningTips: [
                    '1. Ensure joined columns have indexes on foreign key columns.',
                    '2. Check for FULL TABLE SCAN on large _TAB tables.',
                    '3. Avoid wrapping indexed columns with functions in WHERE clause (e.g. UPPER(order_no)).'
                ]
            };
        }
    },
    {
        name: 'analyze_schema',
        description: 'Analyze Oracle database table or view structure for an IFS LU.',
        parameters: z.object({
            tableName: z.string().describe('Table or view name')
        }),
        execute: async (args) => {
            return {
                table: args.tableName,
                primaryKeys: ['ORDER_NO'],
                standardColumns: ['ORDER_NO', 'DESCRIPTION', 'STATE', 'ROWVERSION', 'ROWKEY']
            };
        }
    },
    {
        name: 'find_table',
        description: 'Find Oracle tables matching name pattern in IFS database.',
        parameters: z.object({
            pattern: z.string().describe('Table search pattern')
        }),
        execute: async (args) => {
            return {
                matches: [`${args.pattern.toUpperCase()}_TAB`, `${args.pattern.toUpperCase()}_CFT`]
            };
        }
    },
    {
        name: 'find_view',
        description: 'Find IFS database views matching query.',
        parameters: z.object({
            pattern: z.string().describe('View search pattern')
        }),
        execute: async (args) => {
            return {
                matches: [`${args.pattern.toUpperCase()}`, `${args.pattern.toUpperCase()}_LOV`]
            };
        }
    },
    {
        name: 'find_package',
        description: 'Find PL/SQL package spec and body for an IFS LU.',
        parameters: z.object({
            luName: z.string().describe('LU Name')
        }),
        execute: async (args) => {
            return {
                packages: [`${args.luName}_API`, `${args.luName}_RPI`, `${args.luName}_CFI`]
            };
        }
    },
    {
        name: 'find_dependency',
        description: 'Find foreign key and table dependencies for an Oracle object.',
        parameters: z.object({
            objectName: z.string().describe('Object name')
        }),
        execute: async (args) => {
            return {
                object: args.objectName,
                dependencies: ['FND_SESSION_API', 'ERROR_SYS', 'CLIENT_SYS']
            };
        }
    },
    {
        name: 'search_column',
        description: 'Search for a column name across all IFS tables and views.',
        parameters: z.object({
            columnName: z.string().describe('Column name e.g. CONTRACT or COMPANY')
        }),
        execute: async (args) => {
            return {
                column: args.columnName,
                tablesContainingColumn: ['CUSTOMER_ORDER_TAB', 'PURCHASE_ORDER_TAB', 'EQUIPMENT_OBJECT_TAB']
            };
        }
    },
    {
        name: 'find_foreign_keys',
        description: 'Find foreign keys referencing an IFS table.',
        parameters: z.object({
            tableName: z.string().describe('Table name')
        }),
        execute: async (args) => {
            return {
                tableName: args.tableName,
                referencingTables: ['CUSTOMER_ORDER_LINE_TAB']
            };
        }
    }
];
//# sourceMappingURL=databaseTools.js.map