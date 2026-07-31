import { z } from 'zod';
export declare const databaseTools: ({
    name: string;
    description: string;
    parameters: z.ZodObject<{
        task: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        task: string;
    }, {
        task: string;
    }>;
    execute: (args: {
        task: string;
    }) => Promise<{
        task: string;
        dbaScript: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        sqlQuery: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        sqlQuery: string;
    }, {
        sqlQuery: string;
    }>;
    execute: (args: {
        sqlQuery: string;
    }) => Promise<{
        query: string;
        executionPlanGuide: string;
        tuningTips: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        tableName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        tableName: string;
    }, {
        tableName: string;
    }>;
    execute: (args: {
        tableName: string;
    }) => Promise<{
        table: string;
        primaryKeys: string[];
        standardColumns: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        pattern: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        pattern: string;
    }, {
        pattern: string;
    }>;
    execute: (args: {
        pattern: string;
    }) => Promise<{
        matches: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        luName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        luName: string;
    }, {
        luName: string;
    }>;
    execute: (args: {
        luName: string;
    }) => Promise<{
        packages: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        objectName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        objectName: string;
    }, {
        objectName: string;
    }>;
    execute: (args: {
        objectName: string;
    }) => Promise<{
        object: string;
        dependencies: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        columnName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        columnName: string;
    }, {
        columnName: string;
    }>;
    execute: (args: {
        columnName: string;
    }) => Promise<{
        column: string;
        tablesContainingColumn: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        tableName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        tableName: string;
    }, {
        tableName: string;
    }>;
    execute: (args: {
        tableName: string;
    }) => Promise<{
        tableName: string;
        referencingTables: string[];
    }>;
})[];
