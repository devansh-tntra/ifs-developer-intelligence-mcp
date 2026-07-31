import { z } from 'zod';
export declare const reviewTools: ({
    name: string;
    description: string;
    parameters: z.ZodObject<{
        code: z.ZodString;
        fileType: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        fileType?: string | undefined;
    }, {
        code: string;
        fileType?: string | undefined;
    }>;
    execute: (args: {
        code: string;
        fileType?: string;
    }) => Promise<{
        qualityScore: string;
        issues: string[];
        suggestions: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        code: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        code: string;
    }, {
        code: string;
    }>;
    execute: (args: {
        code: string;
    }) => Promise<{
        potentialBugs: string[];
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
        originalSql: string;
        optimizationAdvice: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        code: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        code: string;
    }, {
        code: string;
    }>;
    execute: (args: {
        code: string;
    }) => Promise<{
        recommendedPattern: string;
        codeSnippet: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        code: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        code: string;
    }, {
        code: string;
    }>;
    execute: (args: {
        code: string;
    }) => Promise<{
        unusedVariables: string[];
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
        duplicateSummary: string;
    }>;
})[];
