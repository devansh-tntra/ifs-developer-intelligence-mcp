import { z } from 'zod';
export declare const marbleTools: ({
    name: string;
    description: string;
    parameters: z.ZodObject<{
        content: z.ZodString;
        fileType: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        fileType: string;
        content: string;
    }, {
        fileType: string;
        content: string;
    }>;
    execute: (args: {
        content: string;
        fileType: string;
    }) => Promise<{
        fileType: string;
        explanation: string;
        keyComponents: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        content: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        content: string;
    }, {
        content: string;
    }>;
    execute: (args: {
        content: string;
    }) => Promise<{
        isValid: boolean;
        errors: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        modelName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        modelName: string;
    }, {
        modelName: string;
    }>;
    execute: (args: {
        modelName: string;
    }) => Promise<{
        entityDsl: string;
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
        dependencies: string[];
    }>;
})[];
