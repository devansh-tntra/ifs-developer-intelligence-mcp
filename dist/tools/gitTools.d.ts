import { z } from 'zod';
export declare const gitTools: ({
    name: string;
    description: string;
    parameters: z.ZodObject<{
        commitHash: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        commitHash: string;
    }, {
        commitHash: string;
    }>;
    execute: (args: {
        commitHash: string;
    }) => Promise<{
        commit: string;
        summary: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        component: z.ZodString;
        taskRef: z.ZodString;
        description: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        description: string;
        component: string;
        taskRef: string;
    }, {
        description: string;
        component: string;
        taskRef: string;
    }>;
    execute: (args: {
        component: string;
        taskRef: string;
        description: string;
    }) => Promise<{
        commitMessage: string;
    }>;
} | {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        prDiff: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        prDiff: string;
    }, {
        prDiff: string;
    }>;
    execute: (args: {
        prDiff: string;
    }) => Promise<{
        recommendations: string[];
    }>;
})[];
