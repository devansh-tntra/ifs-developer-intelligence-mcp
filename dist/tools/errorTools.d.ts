import { z } from 'zod';
export declare const errorTools: ({
    name: string;
    description: string;
    parameters: z.ZodObject<{
        errorCode: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        errorCode: string;
    }, {
        errorCode: string;
    }>;
    execute: (args: {
        errorCode: string;
    }) => Promise<import("../types/ifs.js").OracleErrorDetail | {
        errorCode: string;
        title: string;
        standardCause: string;
        remediationSteps: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        messageKey: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        messageKey: string;
    }, {
        messageKey: string;
    }>;
    execute: (args: {
        messageKey: string;
    }) => Promise<{
        messageKey: string;
        type: string;
        explanation: string;
        remediation: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        stackTrace: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        stackTrace: string;
    }, {
        stackTrace: string;
    }>;
    execute: (args: {
        stackTrace: string;
    }) => Promise<{
        rootCauseLine: string;
        allMatchedErrors: string[];
        totalLinesParsed: number;
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        errorContext: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        errorContext: string;
    }, {
        errorContext: string;
    }>;
    execute: (args: {
        errorContext: string;
    }) => Promise<{
        suggestedFixes: string[];
    }>;
})[];
