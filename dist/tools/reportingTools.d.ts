import { z } from 'zod';
export declare const reportingTools: ({
    name: string;
    description: string;
    parameters: z.ZodObject<{
        reportTitle: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        reportTitle: string;
    }, {
        reportTitle: string;
    }>;
    execute: (args: {
        reportTitle: string;
    }) => Promise<{
        rdlSnippet: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        reportLu: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        reportLu: string;
    }, {
        reportLu: string;
    }>;
    execute: (args: {
        reportLu: string;
    }) => Promise<{
        rdfScript: string;
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
        datasetSql: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        paramName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        paramName: string;
    }, {
        paramName: string;
    }>;
    execute: (args: {
        paramName: string;
    }) => Promise<{
        paramDef: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        layoutName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        layoutName: string;
    }, {
        layoutName: string;
    }>;
    execute: (args: {
        layoutName: string;
    }) => Promise<{
        layoutConfig: {
            layoutName: string;
            paperType: string;
            orientation: string;
        };
    }>;
})[];
