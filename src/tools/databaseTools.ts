import { z } from 'zod';

export const databaseTools = [
  {
    name: 'analyze_schema',
    description: 'Analyze Oracle database table or view structure for an IFS LU.',
    parameters: z.object({
      tableName: z.string().describe('Table or view name')
    }),
    execute: async (args: { tableName: string }) => {
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
    execute: async (args: { pattern: string }) => {
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
    execute: async (args: { pattern: string }) => {
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
    execute: async (args: { luName: string }) => {
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
    execute: async (args: { objectName: string }) => {
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
    execute: async (args: { columnName: string }) => {
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
    execute: async (args: { tableName: string }) => {
      return {
        tableName: args.tableName,
        referencingTables: ['CUSTOMER_ORDER_LINE_TAB']
      };
    }
  }
];
