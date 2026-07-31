import { z } from 'zod';
export declare const integrationTools: ({
    name: string;
    description: string;
    parameters: z.ZodObject<{
        endpoint: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        endpoint: string;
    }, {
        endpoint: string;
    }>;
    execute: (args: {
        endpoint: string;
    }) => Promise<{
        curlExample: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        entitySet: z.ZodString;
        filterField: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        entitySet: string;
        filterField: string;
    }, {
        entitySet: string;
        filterField: string;
    }>;
    execute: (args: {
        entitySet: string;
        filterField: string;
    }) => Promise<{
        query: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        transformerName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        transformerName: string;
    }, {
        transformerName: string;
    }>;
    execute: (args: {
        transformerName: string;
    }) => Promise<{
        xsltTemplate: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        processorName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        processorName: string;
    }, {
        processorName: string;
    }>;
    execute: (args: {
        processorName: string;
    }) => Promise<{
        code: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        ruleName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        ruleName: string;
    }, {
        ruleName: string;
    }>;
    execute: (args: {
        ruleName: string;
    }) => Promise<{
        configXml: string;
    }>;
})[];
