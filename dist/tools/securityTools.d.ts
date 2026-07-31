import { z } from 'zod';
export declare const securityTools: ({
    name: string;
    description: string;
    parameters: z.ZodObject<{
        targetName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        targetName: string;
    }, {
        targetName: string;
    }>;
    execute: (args: {
        targetName: string;
    }) => Promise<{
        target: string;
        requiredGrants: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        projectionName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        projectionName: string;
    }, {
        projectionName: string;
    }>;
    execute: (args: {
        projectionName: string;
    }) => Promise<{
        projection: string;
        securityRules: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        objectName: z.ZodString;
        roleName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        objectName: string;
        roleName: string;
    }, {
        objectName: string;
        roleName: string;
    }>;
    execute: (args: {
        objectName: string;
        roleName: string;
    }) => Promise<{
        sql: string;
    }>;
})[];
