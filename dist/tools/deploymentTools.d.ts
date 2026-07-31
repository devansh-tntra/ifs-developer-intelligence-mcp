import { z } from 'zod';
export declare const deploymentTools: ({
    name: string;
    description: string;
    parameters: z.ZodObject<{
        projectName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        projectName: string;
    }, {
        projectName: string;
    }>;
    execute: (args: {
        projectName: string;
    }) => Promise<{
        projectName: string;
        buildCommands: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        deliveryPath: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        deliveryPath: string;
    }, {
        deliveryPath: string;
    }>;
    execute: (args: {
        deliveryPath: string;
    }) => Promise<{
        status: string;
        checkedFiles: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        logContent: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        logContent: string;
    }, {
        logContent: string;
    }>;
    execute: (args: {
        logContent: string;
    }) => Promise<{
        errorCount: number;
        errors: string[];
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        targetEnv: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        targetEnv: string;
    }, {
        targetEnv: string;
    }>;
    execute: (args: {
        targetEnv: string;
    }) => Promise<{
        targetEnv: string;
        checklist: string[];
    }>;
})[];
